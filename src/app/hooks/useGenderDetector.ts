import { useCallback, useMemo, useRef, useState } from 'react';
import type { FaceGender, Human } from '@vladmandic/human';

type GenderLabel = 'male' | 'female' | 'unknown';

type DetectionResult = {
  gender: GenderLabel;
  confidence: number;
};

type DetectorState = {
  detectGender: (source: File | string) => Promise<DetectionResult>;
  isDetecting: boolean;
  error: string | null;
};

const MODEL_BASE = 'https://cdn.jsdelivr.net/npm/@vladmandic/human-models@3.3.0/dist/';

const fallbackResult: DetectionResult = { gender: 'unknown', confidence: 0 };

async function loadImageElement(source: File | string): Promise<HTMLImageElement> {
  const url = source instanceof File ? URL.createObjectURL(source) : source;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (source instanceof File) URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (event) => {
      if (source instanceof File) URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for gender detection'));
    };
    img.src = url;
  });
}

export function useGenderDetector(): DetectorState {
  const humanRef = useRef<Human | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHuman = useCallback(async () => {
    if (humanRef.current) return humanRef.current;
    if (typeof window === 'undefined') {
      throw new Error('Gender detection is only available in the browser.');
    }

    const { Human } = await import('@vladmandic/human');
    const human = new Human({
      modelBasePath: MODEL_BASE,
      cacheSensitivity: 0,
      face: {
        enabled: true,
        detector: { rotation: true, minConfidence: 0.2, maxDetected: 1 },
        mesh: false,
        iris: false,
        attention: { enabled: false },
        description: false,
        emotion: false
      },
      body: { enabled: false },
      hand: { enabled: false },
      gesture: { enabled: false },
      object: { enabled: false }
    });

    await human.load();
    await human.warmup();

    humanRef.current = human;
    return human;
  }, []);

  const detectGender = useCallback(async (source: File | string): Promise<DetectionResult> => {
    setIsDetecting(true);
    setError(null);

    try {
      if (!source) return fallbackResult;
      const human = await loadHuman();
      const imageElement = await loadImageElement(source);
      const result = await human.detect(imageElement, { skipTime: true });
      const face = result.face?.[0];
      if (!face) {
        return fallbackResult;
      }

      const gender = (face.gender as FaceGender | undefined)?.gender ?? 'unknown';
      const confidence = (face.gender as FaceGender | undefined)?.score ?? 0;

      if (gender !== 'male' && gender !== 'female') {
        return { gender: 'unknown', confidence };
      }

      return { gender, confidence };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gender detection failed.';
      setError(message);
      return fallbackResult;
    } finally {
      setIsDetecting(false);
    }
  }, [loadHuman]);

  return useMemo(() => ({ detectGender, isDetecting, error }), [detectGender, isDetecting, error]);
}
