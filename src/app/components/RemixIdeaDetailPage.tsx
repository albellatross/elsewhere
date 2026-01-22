import { useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Sparkles, Key, Eye, EyeOff, Check, AlertTriangle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GenerationAnimation } from './figma/GenerationAnimation';
import GeneratingLottie from './GeneratingLottie';
import { remixIdeas, remixIdeasMap } from './remixIdeasConfig';
import { useScrollAssist } from '../hooks/useScrollAssist';
import { useGenderDetector } from '../hooks/useGenderDetector';
import svgPathsFigma from "../../imports/svg-pike97bdu9";
import svgPaths from "../../imports/svg-lxjhel9141";
import svgPathsImage from "../../imports/svg-xmejrywrxw";
import { supabase } from '../../services/supabase';
import { fetchVariantDetails, type VariantDetailsResponse } from '../services/config';

type RemixIdeaDetailPageProps = {
  ideaId: string;
  onClose: () => void;
  onSelectIdea?: (ideaId: string) => void;
};

type Stage = 'upload' | 'remixing' | 'result';

interface HistoryImage {
  id: string;
  imageUrl: string;
  timestamp: number;
}

type DetectedGender = 'male' | 'female' | 'unknown' | null;

const inferAzureDeployment = (url: string): string => {
  if (!/azure\.com/i.test(url)) return '';
  try {
    const sanitized = url.replace(/\?.*$/, '');
    const match = sanitized.match(/\/deployments\/([^/]+)/i);
    return match ? decodeURIComponent(match[1]) : '';
  } catch (error) {
    console.warn('Failed to infer Azure deployment from URL', error);
    return '';
  }
};

export default function RemixIdeaDetailPage({ ideaId, onClose, onSelectIdea }: RemixIdeaDetailPageProps) {
  const idea = remixIdeasMap[ideaId];
  const [stage, setStage] = useState<Stage>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageHistory, setImageHistory] = useState<HistoryImage[]>([]);
  const [currentHistoryId, setCurrentHistoryId] = useState<string | null>(null);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [deploymentId, setDeploymentId] = useState('');
  const [apiType, setApiType] = useState<'auto' | 'flux' | 'openai'>('auto');
  const [showApiKey, setShowApiKey] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [variantDetail, setVariantDetail] = useState<VariantDetailsResponse | null>(null);
  const [isSyncingConfig, setIsSyncingConfig] = useState(false);
  const [configSyncError, setConfigSyncError] = useState<string | null>(null);
  const [detectedGender, setDetectedGender] = useState<DetectedGender>(null);
  const [genderConfidence, setGenderConfidence] = useState<number | null>(null);
  const isGenerating = stage === 'remixing';
  const canGenerate = !!uploadedImage;
  const { detectGender } = useGenderDetector();
  const currentVariantKey = idea?.variantKey ?? 'a_moment_in_zootopia';
  const shouldDetectGender = currentVariantKey === 'step_into_a_character';
  const genderConfidencePercent = genderConfidence !== null ? Math.round(genderConfidence * 100) : null;
  const trimmedApiKey = apiKey.trim();
  const trimmedApiUrl = apiUrl.trim();
  const normalizedApiUrl = trimmedApiUrl ? normalizeApiUrl(trimmedApiUrl) : '';
  const trimmedDeploymentId = deploymentId.trim();
  const isAzureEndpoint = /azure\.com/i.test(normalizedApiUrl || trimmedApiUrl);
  const inferredDeploymentId = isAzureEndpoint ? inferAzureDeployment(normalizedApiUrl || trimmedApiUrl) : '';
  const effectiveDeploymentId = trimmedDeploymentId || inferredDeploymentId;
  const hasApiCredentials = trimmedApiKey !== '' && trimmedApiUrl !== '';
  const isDeploymentReady = !isAzureEndpoint || effectiveDeploymentId !== '';
  const isConnectionReady = hasApiCredentials && isDeploymentReady;
  const connectionContainerClasses = isConnectionReady
    ? 'bg-green-50 border-green-200'
    : 'bg-amber-50 border-amber-200';
  const connectionIconClasses = isConnectionReady ? 'text-green-600' : 'text-amber-500';
  const connectionTextClasses = isConnectionReady ? 'text-green-800' : 'text-amber-800';
  let connectionLabel = '';
  if (!hasApiCredentials) {
    connectionLabel = '尚未配置 API，请先点击下方「API key」按钮。';
  } else if (!isDeploymentReady) {
    connectionLabel = 'Azure deployment name missing. Please fill it in through API settings.';
  } else {
    connectionLabel = isAzureEndpoint ? 'Azure API configured' : '外部服务已配置';
  }
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { scrollContainerRef, triggerScrollAssist } = useScrollAssist();
  const progressStartRef = useRef<number | null>(null);
  const progressRafRef = useRef<number | null>(null);
  const TARGET_PROGRESS_DURATION = 45000; // ms to reach 95%

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const savedGlobalApiKey = localStorage.getItem('global_api_key');
    const savedGlobalApiUrl = localStorage.getItem('global_api_url');
    const savedGlobalDeploymentId = localStorage.getItem('global_api_deployment_id');
    const savedGlobalApiType = localStorage.getItem('global_api_type') as 'auto' | 'flux' | 'openai' | null;

    if (savedGlobalApiKey) setApiKey(savedGlobalApiKey);
    if (savedGlobalApiUrl) setApiUrl(savedGlobalApiUrl);
    if (savedGlobalDeploymentId) setDeploymentId(savedGlobalDeploymentId);
    if (savedGlobalApiType) setApiType(savedGlobalApiType);
  }, []);

  useEffect(() => {
    if (stage !== 'remixing') {
      if (progressRafRef.current !== null) {
        cancelAnimationFrame(progressRafRef.current);
        progressRafRef.current = null;
      }
      progressStartRef.current = null;
      return;
    }

    progressStartRef.current = performance.now();
    setProgress(0);

    const tick = () => {
      if (stage !== 'remixing') return;
      const start = progressStartRef.current ?? performance.now();
      const elapsed = performance.now() - start;
      const nextProgress = Math.min(95, (elapsed / TARGET_PROGRESS_DURATION) * 95);
      setProgress(nextProgress);
      progressRafRef.current = requestAnimationFrame(tick);
    };

    progressRafRef.current = requestAnimationFrame(tick);

    return () => {
      if (progressRafRef.current !== null) {
        cancelAnimationFrame(progressRafRef.current);
        progressRafRef.current = null;
      }
    };
  }, [stage, TARGET_PROGRESS_DURATION]);

  useEffect(() => {
    setStage('upload');
    setUploadedImage(null);
    setUploadedFile(null);
    setGeneratedImage(null);
    setProgress(0);
    setGenerationError(null);
    setErrorMessage(null);
    setImageHistory([]);
    setCurrentHistoryId(null);
    setShowApiModal(false);
    setDetectedGender(null);
    setGenderConfidence(null);
    setVariantDetail(null);
    setConfigSyncError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (progressRafRef.current !== null) {
      cancelAnimationFrame(progressRafRef.current);
      progressRafRef.current = null;
    }
    progressStartRef.current = null;
  }, [ideaId]);

  useEffect(() => {
    if (!idea) return;
    let cancelled = false;

    const syncVariantDetails = async () => {
      setIsSyncingConfig(true);
      setConfigSyncError(null);
      const details = await fetchVariantDetails('templates', currentVariantKey);
      if (cancelled) return;
      if (!details) {
        setVariantDetail(null);
        setConfigSyncError('Failed to load latest template details. Using cached copy.');
      } else {
        setVariantDetail(details);
      }
      setIsSyncingConfig(false);
    };

    void syncVariantDetails();
    const intervalId = window.setInterval(syncVariantDetails, 60000);
    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [idea, currentVariantKey]);

  if (!idea) return null;
  const displayDescription = variantDetail?.variant?.description || idea.description;
  const referenceImages = (variantDetail?.references || []).filter((ref) => !!ref?.public_url);

  const runGenderDetection = useCallback(async (file: File) => {
    if (!shouldDetectGender) return;
    try {
      const { gender, confidence } = await detectGender(file);
      setDetectedGender(gender ?? 'unknown');
      setGenderConfidence(Number.isFinite(confidence) ? confidence : null);
    } catch (error) {
      console.warn('性别识别失败，忽略继续生成', error);
      setDetectedGender('unknown');
      setGenderConfidence(null);
    }
  }, [detectGender, shouldDetectGender]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setGeneratedImage(null);
      setStage('upload');
      setProgress(0);
      setGenerationError(null);
    };
    reader.readAsDataURL(file);
    setUploadedFile(file);
    setDetectedGender(null);
    setGenderConfidence(null);
    void runGenderDetection(file);
  };

  const handleGenerate = () => {
    if (!uploadedImage) {
      fileInputRef.current?.click();
      return;
    }
    if (!uploadedFile) {
      setGenerationError('上传失败，请换一张照片再试。');
      return;
    }
    void generateImage(uploadedFile);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    setGeneratedImage(null);
    setStage('upload');
    setProgress(0);
    setGenerationError(null);
    setDetectedGender(null);
    setGenderConfidence(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `remix-${idea.id}-${Date.now()}.png`;
    link.click();
  };

  const handleOpenOtherIdea = (targetId: string) => {
    if (!targetId || targetId === idea.id) return;
    if (onSelectIdea) {
      onSelectIdea(targetId);
    } else {
      window.location.hash = targetId;
    }
  };

  const fileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read image'));
      reader.readAsDataURL(file);
    });
  };

  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
  };

  const resolveReferenceBlob = async (source: string): Promise<Blob | null> => {
    try {
      if (!source) return null;
      if (source.startsWith('data:')) {
        const mimeMatch = source.match(/data:([^;]+);/);
        const mimeType = mimeMatch?.[1] || 'image/png';
        const base64 = source.split('base64,')[1] || '';
        if (!base64) return null;
        return base64ToBlob(base64, mimeType);
      }
      if (/^https?:/i.test(source)) {
        const res = await fetch(source);
        if (!res.ok) return null;
        return res.blob();
      }
      const sanitized = source.includes('base64,') ? source.split('base64,')[1] : source;
      if (!sanitized) return null;
      return base64ToBlob(sanitized, 'image/png');
    } catch (error) {
      console.error('Failed to resolve reference image', error);
      return null;
    }
  };

  function normalizeApiUrl(rawUrl: string) {
    let url = rawUrl.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }

    if (url.includes('azure.com')) {
      url = url.replace(/\/open(\/|$)/, '/openai$1');
      if (!url.includes('/openai')) {
        url = `${url.replace(/\/+$/, '')}/openai`;
      }
    }

    return url.replace(/\/+$/, '');
  }

  const attachImageToRequest = async (
    planRequest: any,
    file: File
  ): Promise<{ headers: Record<string, string>; body: BodyInit }> => {
    const headers: Record<string, string> = { ...(planRequest.headers || {}) };
    const bodyData = { ...(planRequest.body_data || {}) };
    const referenceImages = Array.isArray(bodyData.reference_images)
      ? bodyData.reference_images.filter(Boolean)
      : [];

    if (bodyData._attach_image_base64) {
      const base64DataUrl = await fileToBase64(file);
      const payload = { ...bodyData };
      delete payload._attach_image_base64;
      if (referenceImages.length > 0) {
        payload.reference_images = referenceImages;
      }
      payload.input_image = base64DataUrl.includes('base64,') ? base64DataUrl.split('base64,')[1] : base64DataUrl;
      headers['Content-Type'] = 'application/json';
      return { headers, body: JSON.stringify(payload) };
    }

    if (bodyData._attach_image || planRequest.body_type === 'multipart/form-data') {
      const formData = new FormData();
      const editField = planRequest.url.includes('/images/edits') ? 'image[]' : 'image';
      formData.append(editField, file, file.name || 'image.png');

      if (editField === 'image[]' && referenceImages.length > 0) {
        for (let i = 0; i < referenceImages.length; i++) {
          const blob = await resolveReferenceBlob(referenceImages[i]);
          if (!blob) continue;
          formData.append('image[]', blob, `reference_${i + 1}.png`);
        }
      }

      Object.entries(bodyData).forEach(([key, value]) => {
        if (key.startsWith('_')) return;
        if (key === 'reference_images') return;
        if (value === undefined || value === null) return;
        formData.append(key, String(value));
      });
      delete headers['Content-Type'];
      return { headers, body: formData };
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    return { headers, body: JSON.stringify(bodyData) };
  };

  const generateImage = async (file: File) => {
    let normalizedUrl = '';
    let deploymentTrimmed = '';
    let inferredDeployment = '';
    let effectiveDeployment = '';
    let usedAzureWithoutDeployment = false;

    setStage('remixing');
    setGenerationError(null);

    try {
      const apiKeyTrimmed = apiKey.trim();
      const apiUrlTrimmed = apiUrl.trim();

      if (!apiKeyTrimmed || !apiUrlTrimmed) {
        setStage('upload');
        setGenerationError('请先填写 API Key 和服务地址，然后再尝试生成。');
        setShowApiModal(true);
        return;
      }

      normalizedUrl = normalizeApiUrl(apiUrlTrimmed);
      deploymentTrimmed = deploymentId.trim();
      inferredDeployment = inferAzureDeployment(normalizedUrl);
      const isAzureProvider = normalizedUrl.includes('azure.com');
      effectiveDeployment = deploymentTrimmed || inferredDeployment;

      if (isAzureProvider && !effectiveDeployment) {
        setStage('upload');
        setGenerationError('Azure deployment name is required. Please update it under API settings.');
        setShowApiModal(true);
        usedAzureWithoutDeployment = true;
        return;
      }

      const providerKey = (apiType === 'flux' || normalizedUrl.includes('flux')) ? 'flux_dev' : 'chatgpt_image';
      const variantKey = currentVariantKey;
      const planUserInputs: Record<string, unknown> = {
        photo: 'data:image/png;base64,placeholder'
      };

      if (detectedGender) {
        planUserInputs.gender = detectedGender;
      }
      if (genderConfidence !== null) {
        planUserInputs.gender_confidence = genderConfidence;
      }

      const { data: planData, error: planError } = await supabase.functions.invoke('generate-image', {
        body: {
          feature_key: 'templates',
          variant_key: variantKey,
          provider_key: providerKey,
          return_payload_only: true,
          user_inputs: planUserInputs,
          provider_base_url_override: normalizedUrl,
          provider_deployment_id_override: effectiveDeployment || undefined
        }
      });

      if (planError) throw planError;
      if (!planData) throw new Error('Failed to retrieve generation plan.');
      if (planData.error) throw new Error(planData.error);

      const planRequest = planData.request || planData.data?.request || planData;
      if (!planRequest?.url) throw new Error('Generation plan missing request payload.');

      const { headers: initialHeaders, body } = await attachImageToRequest(planRequest, file);
      const headers: Record<string, string> = { ...initialHeaders };

      if (headers['Authorization']) {
        headers['Authorization'] = headers['Authorization'].includes('Bearer ')
          ? `Bearer ${apiKeyTrimmed}`
          : headers['Authorization'].replace('CLIENT_SIDE_KEY', apiKeyTrimmed);
      }
      if (headers['api-key']) headers['api-key'] = apiKeyTrimmed;
      if (headers['x-key']) headers['x-key'] = apiKeyTrimmed;
      if (headers['User-Agent']) delete headers['User-Agent'];

      const response = await fetch(planRequest.url, {
        method: planRequest.method || 'POST',
        headers,
        body
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Generation failed (${response.status}): ${errText}`);
      }

      const json = await response.json();
      let imageUrl: string | null = null;
      if (json.data?.[0]?.url) imageUrl = json.data[0].url;
      else if (json.data?.[0]?.b64_json) imageUrl = `data:image/png;base64,${json.data[0].b64_json}`;
      else if (json.image) imageUrl = json.image.startsWith('data:') ? json.image : `data:image/png;base64,${json.image}`;
      else if (Array.isArray(json.images) && typeof json.images[0] === 'string') {
        const value = json.images[0];
        imageUrl = value.startsWith('http') ? value : `data:image/png;base64,${value}`;
      } else if (Array.isArray(json.output) && typeof json.output[0] === 'string') {
        const value = json.output[0];
        imageUrl = value.startsWith('http') ? value : `data:image/png;base64,${value}`;
      } else if (json.url) imageUrl = json.url;

      if (!imageUrl) {
        throw new Error('Provider returned no image payload.');
      }

      setGeneratedImage(imageUrl);
      setProgress(100);
      setStage('result');

      const historyItem: HistoryImage = {
        id: Date.now().toString(),
        imageUrl,
        timestamp: Date.now(),
      };
      setImageHistory((prev) => [historyItem, ...prev]);
      setCurrentHistoryId(historyItem.id);
      triggerScrollAssist();
    } catch (err: any) {
      setStage('upload');
      setProgress(0);
      let message = err?.message || '生成图像时遇到未知错误。';

      const looksLikeAzure = normalizedUrl.includes('.azure.com');
      const missingDeployment = !effectiveDeployment;
      if (looksLikeAzure && missingDeployment && /resource not found/i.test(message)) {
        message = 'Azure returned 404. Please confirm the deployment name in API settings (for example gpt-image-1.5).';
        usedAzureWithoutDeployment = true;
      }

      setGenerationError(message);
      if (usedAzureWithoutDeployment) {
        setShowApiModal(true);
      }
      console.error('Remix generation failed:', err);
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.25 }}
      className="fixed inset-0 bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f5] z-[9999] overflow-hidden flex flex-col"
    >
      {/* Top Header */}
      <div className="sticky top-0 z-10 flex-shrink-0 bg-white/80 backdrop-blur-xl border-b border-[#e5e5e5] shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 md:py-4">
          <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-black/5 active:bg-black/10 transition-all flex items-center justify-center group"
            >
              <X className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-90" />
            </button>
            <div className="hidden md:flex h-8 items-center justify-center w-px bg-[#e5e5e5]" />
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="font-sans font-bold text-base md:text-xl text-[#050505] truncate tracking-tight">
                  {idea.title}
                </h1>
              </div>
              <p className="font-sans font-normal text-xs text-[#666] truncate">
                {displayDescription}
              </p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                setErrorMessage(null);
                setShowApiModal(true);
              }}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-white border border-[#e5e5e5] rounded-xl hover:bg-[#fafafa] hover:border-[#d4d4d4] hover:shadow-sm active:scale-[0.98] transition-all"
            >
              <Key className="w-4 h-4 text-[#666]" />
              <span className="font-sans font-semibold text-sm text-[#050505]">API key</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
        {/* Left Control Panel */}
        <div 
          ref={scrollContainerRef}
          className="w-full lg:w-[420px] xl:w-[480px] bg-white overflow-visible lg:overflow-y-auto lg:h-full border-b lg:border-b-0 lg:border-r border-[#e5e5e5]"
        >
          <div className="p-5 md:p-8">
            <div className="flex flex-col gap-10 max-w-md lg:max-w-none mx-auto">
              {/* 1. PHOTO INPUT */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1.5 pl-2">
                  <div className="w-6 h-6">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 28 28">
                      <path d={svgPathsFigma.p8fd1770} fill="#242424" />
                    </svg>
                  </div>
                  <ol className="font-sans font-semibold text-sm text-[#050505] uppercase list-decimal" start={1}>
                    <li className="list-inside ms-1"><span>photo input</span></li>
                  </ol>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                  id="remix-photo-upload"
                />
                <label
                  htmlFor="remix-photo-upload"
                  className="relative h-40 md:h-48 border-2 border-dashed border-[#d4d4d4] rounded-2xl bg-[#fafafa] flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:bg-white hover:border-[#8b5cf6]/50 hover:shadow-md group overflow-hidden"
                >
                  {uploadedImage ? (
                    <div className="relative w-full h-full">
                      <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-contain" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-sm font-semibold">Change Photo</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="w-4 h-4 text-[#666]" />
                      </div>
                      <div className="flex flex-col gap-1.5 text-center px-6">
                        <p className="font-sans font-semibold text-sm text-[#050505]">Upload your photo</p>
                        <p className="font-sans font-medium text-xs text-[#999]">Selfies or portraits work best</p>
                      </div>
                    </>
                  )}
                </label>
                {referenceImages.length ? (
                  <div className="px-2">
                    {configSyncError ? (
                      <p className="font-sans text-[10px] text-[#999]">{configSyncError}</p>
                    ) : null}
                    {isSyncingConfig ? (
                      <p className="font-sans text-[10px] text-[#999]">Syncing…</p>
                    ) : null}
                  </div>
                ) : null}
              </div>

              {/* 2. Generate */}
              <div className="flex flex-col gap-2 pt-6 pb-10">
                <p className="font-sans font-normal text-[10px] text-black">
                  * Ready to generate a compliant ID photo
                </p>
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg ${connectionContainerClasses}`}>
                    {isConnectionReady ? (
                      <Check className={`w-4 h-4 ${connectionIconClasses}`} />
                    ) : (
                      <AlertTriangle className={`w-4 h-4 ${connectionIconClasses}`} />
                    )}
                    <span className={`font-sans text-xs ${connectionTextClasses}`}>
                      {connectionLabel}
                    </span>
                  </div>
                </div>

                <motion.button
                  onClick={handleGenerate}
                  disabled={!canGenerate || isGenerating}
                  className={`h-11 md:h-12 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl active:scale-[0.98] ${isGenerating
                    ? 'gap-2 bg-gradient-to-r from-[#f4edff] via-[#eadfff] to-[#e0d4ff] cursor-wait'
                    : canGenerate
                      ? 'gap-2.5 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#6d28d9]'
                      : 'gap-2.5 bg-[#d4d4d4] cursor-not-allowed'
                    }`}
                  animate={canGenerate && !isGenerating ? {
                    boxShadow: [
                      '0 8px 22px -6px rgba(139, 92, 246, 0.22)',
                      '0 8px 26px -6px rgba(139, 92, 246, 0.28)',
                      '0 8px 22px -6px rgba(139, 92, 246, 0.22)'
                    ]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-[25px] h-[25px] flex items-center justify-center">
                        <GeneratingLottie size={6.2} />
                      </div>
                      <motion.span
                        initial={{ opacity: 0.25 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        className="font-sans font-semibold text-sm md:text-base text-[#5b21b6]"
                      >
                        Generating
                      </motion.span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                        <path d={svgPathsFigma.p1a8c2ac0} fill="white" fillOpacity="0.9" />
                      </svg>
                      <span className="font-sans font-semibold text-sm md:text-base text-white">
                        Generate
                      </span>
                    </>
                  )}
                </motion.button>
                {generationError && (
                  <p className="font-sans text-xs text-red-500 px-2">
                    {generationError}
                  </p>
                )}
              </div>

              {/* 3. Other Ideas */}
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-1.5 pl-2">
                  <div className="w-6 h-6">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 28 28">
                      <path d={svgPathsFigma.p3f6d3580} fill="#242424" />
                    </svg>
                  </div>
                  <ol className="font-sans font-semibold text-sm text-[#050505] uppercase list-decimal" start={3}>
                    <li className="list-inside ms-1"><span>Other Ideas</span></li>
                  </ol>
                </div>
                <div className="grid grid-cols-2 gap-3 px-2">
                  {remixIdeas.filter(i => i.id !== idea.id).slice(0, 2).map(other => (
                    <div 
                      key={other.id} 
                      className="group cursor-pointer"
                      onClick={() => {
                        handleOpenOtherIdea(other.id);
                      }}
                    >
                      <div className="aspect-[3/4] rounded-xl overflow-hidden border border-[#eee] relative">
                        <img src={other.image} className="size-full object-cover group-hover:scale-110 transition-transform" alt={other.title} />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        <p className="absolute bottom-2 left-2 right-2 text-[10px] font-bold text-white leading-tight truncate">{other.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Area - Match template layout */}
        <div className="flex-1 bg-gradient-to-br from-[#fafafa] to-[#f0f0f0] overflow-visible lg:overflow-hidden lg:h-full">
          <div className="h-full p-4 md:p-6 lg:p-8 flex items-center justify-center">
            <div className="w-full max-w-md flex flex-col gap-4 md:gap-5">
              {/* Preview Area */}
              <div className="relative w-full border-2 border-dashed border-[#d4d4d4] rounded-2xl bg-white/50 backdrop-blur-sm shadow-inner p-4 md:p-6 lg:p-8 flex items-center justify-center">
                <div 
                  className="relative w-full max-w-md rounded-xl overflow-hidden bg-gradient-to-br from-[#fafafa] to-[#f5f5f5]"
                  style={{ aspectRatio: 1024 / 1536, minHeight: '400px' }}
                >
                  {generatedImage && (
                    <div className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-300 ${isGenerating ? 'blur-md scale-105' : ''}`}>
                      <img
                        src={generatedImage}
                        alt="Generated Remix"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  <AnimatePresence>
                    {isGenerating && (
                      <motion.div
                        key="remix-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 w-full h-full z-10"
                      >
                        <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />
                        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center gap-5 px-4">
                          <div className="relative w-32 h-32">
                            <motion.div
                              animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed]"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                              className="absolute inset-3 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed]"
                            />
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0"
                            >
                              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-white/50" />
                            </motion.div>
                            <motion.div
                              animate={{ rotate: -360 }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0"
                            >
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#c4b5fd] shadow-md shadow-[#c4b5fd]/50" />
                            </motion.div>
                            <div className="absolute inset-0 flex items-center justify-center scale-125">
                              <GenerationAnimation />
                            </div>
                          </div>

                          <div className="flex flex-col items-center gap-3 text-center max-w-[320px]">
                            <p className="font-sans font-semibold text-lg md:text-xl text-[#050505]">
                              Remixing Reality...
                            </p>
                            <div className="w-48 h-1.5 bg-black/5 rounded-full overflow-hidden border border-black/5">
                              <motion.div 
                                className="h-full bg-[#8b5cf6]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!generatedImage && !isGenerating && (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[#f5f5f5] flex items-center justify-center">
                        <svg className="w-7 h-7 text-[#999]" fill="none" viewBox="0 0 32 32">
                          <path d={svgPathsImage.pfa36100} fill="currentColor" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1.5 text-center">
                        <p className="font-sans font-semibold text-sm md:text-base text-[#050505]">
                          Image Preview
                        </p>
                        <p className="font-sans font-normal text-xs md:text-sm text-[#999]">
                          Your remix will appear here
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={!generatedImage || isGenerating}
                  className={`flex-1 max-w-[140px] h-11 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] ${
                    generatedImage && !isGenerating
                      ? 'bg-white border-2 border-[#e5e5e5] hover:bg-[#fafafa] hover:border-[#d4d4d4]'
                      : 'bg-[#f5f5f5] border-2 border-[#e5e5e5] cursor-not-allowed'
                  }`}
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-[#999]/30 border-t-[#999] rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 14.5 14.5">
                      <path d={svgPaths.p22b6d800} fill="#050505" />
                    </svg>
                  )}
                  <span className="font-sans font-semibold text-sm text-[#050505]">
                    {isGenerating ? 'Generating...' : 'Regenerate'}
                  </span>
                </button>

                <button
                  onClick={handleDownload}
                  disabled={!generatedImage}
                  className={`flex-1 max-w-[140px] h-11 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] ${
                    generatedImage
                      ? 'bg-[#333] hover:bg-[#222]'
                      : 'bg-[#d4d4d4] cursor-not-allowed'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 10 13">
                    <path d={svgPaths.p2f9c1e00} fill="white" />
                  </svg>
                  <span className="font-sans font-semibold text-sm text-white">
                    Download
                  </span>
                </button>
              </div>

              {/* History */}
              {imageHistory.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="w-full"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="font-sans font-semibold text-sm text-[#050505]">
                      History ({imageHistory.length})
                    </h3>
                    <button
                      onClick={() => setImageHistory([])}
                      className="font-sans font-medium text-xs text-[#999] hover:text-[#666] transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  
                  <div className="relative w-full overflow-x-auto scrollbar-hide px-3 py-2">
                    <div className="flex gap-2.5 pb-2">
                      {imageHistory.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => {
                            setGeneratedImage(item.imageUrl);
                            setCurrentHistoryId(item.id);
                            setStage('result');
                          }}
                          className={`relative flex-shrink-0 w-[72px] h-[96px] rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105 bg-[#fafafa] ${
                            currentHistoryId === item.id
                              ? 'ring-3 ring-[#333] ring-offset-2 ring-offset-white shadow-lg'
                              : 'hover:shadow-md'
                          }`}
                        >
                          <img 
                            src={item.imageUrl} 
                            alt={`History ${new Date(item.timestamp).toLocaleTimeString()}`}
                            className="w-full h-full object-cover"
                          />
                          
                          {currentHistoryId === item.id && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="absolute top-1 right-1 w-4 h-4 bg-[#333] rounded-full flex items-center justify-center shadow-lg"
                            >
                              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 9">
                                <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </motion.div>
                          )}
                          
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-1.5 py-1">
                            <p className="font-sans font-medium text-[9px] text-white truncate">
                              {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* API Key 配置弹窗 */}
      <AnimatePresence>
        {showApiModal && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
            onClick={() => setShowApiModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* 弹窗头部 */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#333] flex items-center justify-center">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-sans font-bold text-lg text-[#050505]">
                      API Configuration
                    </h2>
                    <p className="font-sans font-normal text-xs text-[#666]">
                      Connect your AI image generation service
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowApiModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-black/5 active:bg-black/10 transition-all flex items-center justify-center group"
                >
                  <X className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-90" />
                </button>
              </div>

              {/* 弹窗内容 */}
              <div className="px-6 py-5 flex flex-col gap-5">
                {/* API Endpoint 输入 */}
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-semibold text-sm text-[#050505]">
                    API Endpoint URL
                  </label>
                  <input
                    type="text"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    placeholder="https://api.example.com"
                    className="w-full h-11 px-4 bg-white border border-[#d4d4d4] rounded-xl font-sans text-sm text-[#050505] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#333] focus:border-transparent transition-all"
                  />
                  <p className="font-sans font-normal text-xs text-[#666]">
                    Your API service endpoint URL
                  </p>
                </div>

                {/* API Key 输入 */}
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-semibold text-sm text-[#050505]">
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Your API Key"
                      className="w-full h-11 px-4 pr-12 bg-white border border-[#d4d4d4] rounded-xl font-sans text-sm text-[#050505] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#333] focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-[#666] hover:text-[#333] transition-colors"
                    >
                      {showApiKey ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="font-sans font-normal text-xs text-[#999]">
                    Your API key will be stored locally and never shared
                  </p>
                </div>

                {/* 错误信息 */}
                {errorMessage && (
                  <p className="font-sans font-normal text-xs text-red-500">
                    {errorMessage}
                  </p>
                )}
              </div>

              {/* 弹窗底部按钮 */}
              <div className="flex items-center gap-3 px-6 py-4 bg-[#fafafa] border-t border-[#e5e5e5]">
                <button
                  onClick={() => {
                    setShowApiModal(false);
                    setShowApiKey(false);
                  }}
                  className="flex-1 h-11 bg-white border border-[#d4d4d4] rounded-xl font-sans font-semibold text-sm text-[#050505] hover:bg-[#f5f5f5] hover:border-[#c4c4c4] active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('global_api_key', apiKey);
                    localStorage.setItem('global_api_url', apiUrl);
                    localStorage.setItem('global_api_deployment_id', deploymentId);
                    localStorage.setItem('global_api_type', apiType);
                    setShowApiModal(false);
                    setShowApiKey(false);
                    setErrorMessage(null);
                  }}
                  className="flex-1 h-11 bg-[#333] rounded-xl font-sans font-semibold text-sm text-white hover:bg-[#222] active:scale-[0.98] transition-all shadow-lg"
                >
                  Save Configuration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

