import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLottie } from 'lottie-react';
import { useScrollAssist } from '../hooks/useScrollAssist';
import { GenerationAnimation } from './figma/GenerationAnimation';
import { ImageWithFallback } from './figma/ImageWithFallback';
import GeneratingLottie from './GeneratingLottie';
import { useEdgeGeneration } from '../hooks/useEdgeGeneration';
import { supabase } from '../../services/supabase';
import { supabaseUrl as fallbackSupabaseUrl, supabaseAnonKey as fallbackSupabaseAnonKey } from '../services/config';
import { X, Upload, Key, Eye, EyeOff, Coffee, Soup, MessageCircle, Wind, Sparkles, PartyPopper, Camera, UtensilsCrossed, Sunrise, Armchair } from 'lucide-react';
import svgPaths from "../../imports/svg-lxjhel9141";
import svgPathsFigma from "../../imports/svg-pike97bdu9";
import svgPathsImage from "../../imports/svg-xmejrywrxw";
import alertAnimation from "@ainimation/Alert.json";

type IDPhotoDetailPageProps = {
  onClose: () => void;
};

type BackgroundColor = 'none' | 'blue' | 'red' | 'white' | 'grey' | 'black';
type PhotoPurpose = 'professional' | 'official' | null;

const photoPurposeOfficialUrl = `${import.meta.env.BASE_URL}photo-purpose-official.png`;
const photoPurposeProfessionalUrl = `${import.meta.env.BASE_URL}photo-purpose-professional.png`;

// 有趣的等待提示文案
const waitingMessages = [
  { text: "Crafting your perfect photo..." },
  { text: "Time for a coffee break" },
  { text: "Perfect time to grab some ramen" },
  { text: "Go ahead and chat with a friend" },
  { text: "Stretch a bit, stay relaxed" },
  { text: "Take a deep breath and unwind" },
  { text: "Check out the view outside" },
  { text: "What's for dinner tonight?" },
  { text: "AI is working its magic" },
  { text: "Almost there, worth the wait!" }
];

interface HistoryImage {
  id: string;
  imageUrl: string;
  timestamp: number;
  purpose: PhotoPurpose;
  bgColor: BackgroundColor;
}

// 动态图标组件
const AnimatedIcon = ({ iconType }: { iconType: string }) => {
  const iconProps = { className: "w-12 h-12", strokeWidth: 2.5 };

  switch (iconType) {
    case "camera":
      // 📷 相机：镜头呼吸缩放
      return (
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Camera {...iconProps} />
        </motion.div>
      );
    case "coffee":
      // ☕ 咖啡：上下漂浮 + 轻微倾斜
      return (
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [-3, 3, -3]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Coffee {...iconProps} />
        </motion.div>
      );
    case "noodles":
      // 🍜 拉面：碗旋转摇摆 + 轻微缩放
      return (
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Soup {...iconProps} />
        </motion.div>
      );
    case "chat":
      // 💬 聊天：多段弹跳缩放
      return (
        <motion.div
          animate={{
            scale: [1, 1.18, 1, 1.1, 1],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MessageCircle {...iconProps} />
        </motion.div>
      );
    case "stretch":
      // 🛋️ 躺椅：横向拉伸 + 纵向压缩（放松伸展效果）
      return (
        <motion.div
          animate={{
            scaleX: [1, 1.12, 1],
            scaleY: [1, 0.92, 1],
            rotate: [-2, 2, -2]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Armchair {...iconProps} />
        </motion.div>
      );
    case "breathe":
      // 🌬️ 呼吸：整体呼吸缩放
      return (
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Wind {...iconProps} />
        </motion.div>
      );
    case "window":
      // 🌅 日出：轻微旋转 + 缩放
      return (
        <motion.div
          animate={{
            rotate: [0, 4, -4, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sunrise {...iconProps} />
        </motion.div>
      );
    case "food":
      // 🍴 餐具：交叉摆动
      return (
        <motion.div
          animate={{
            rotate: [0, -10, 10, 0],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <UtensilsCrossed {...iconProps} />
        </motion.div>
      );
    case "magic":
      // ✨ 魔法：旋转 + 闪烁缩放
      return (
        <motion.div
          animate={{
            rotate: [0, 18, -18, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles {...iconProps} />
        </motion.div>
      );
    case "celebrate":
      // 🎉 庆祝：爆炸式旋转 + 缩放
      return (
        <motion.div
          animate={{
            rotate: [0, 25, -25, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <PartyPopper {...iconProps} />
        </motion.div>
      );
    default:
      return <Camera {...iconProps} />;
  }
};

export default function IDPhotoDetailPage({ onClose }: IDPhotoDetailPageProps) {
  const { generate: generateImageEdge, loading: edgeLoading } = useEdgeGeneration();
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [photoPurpose, setPhotoPurpose] = useState<PhotoPurpose>(null);
  const [backgroundColor, setBackgroundColor] = useState<BackgroundColor>('none');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [imageAspectRatio, setImageAspectRatio] = useState<number>(3 / 4); // 默认 3:4
  const [imageHistory, setImageHistory] = useState<HistoryImage[]>([]);
  const [currentHistoryId, setCurrentHistoryId] = useState<string | null>(null);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [safetyErrorMessage, setSafetyErrorMessage] = useState('');
  const [deploymentId, setDeploymentId] = useState('');
  const [showConsole, setShowConsole] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [fluxGuidanceScale, setFluxGuidanceScale] = useState(7.5);  // 引导强度
  const [apiType, setApiType] = useState<'auto' | 'flux' | 'openai'>('auto'); // API 类型选择
  const [variantCatalog, setVariantCatalog] = useState<Array<{ key: string; name: string }>>([]);
  const [promptCatalog, setPromptCatalog] = useState<Record<string, { prompt_template?: string; negative_prompt?: string; params_json?: any }>>({});
  const [lastConfigSyncAt, setLastConfigSyncAt] = useState<number | null>(null);
  const [hasManualBackgroundSelection, setHasManualBackgroundSelection] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { scrollContainerRef, triggerScrollAssist } = useScrollAssist();
  const warningLottieOptions = {
    animationData: alertAnimation,
    loop: true,
    autoplay: true
  };
  const { View: WarningLottieView } = useLottie(warningLottieOptions, {
    style: { width: "100%", height: "100%" }
  });

  // API 版本固定值
  const apiVersion = '2025-04-01-preview';

  // 添加日志函数
  const addLog = (message: string, data?: any) => {
    const timestamp = new Date().toLocaleTimeString();
    let logMessage = `[${timestamp}] ${message}`;
    if (data !== undefined) {
      logMessage += `\n${typeof data === 'object' ? JSON.stringify(data, null, 2) : data}`;
    }
    setConsoleLogs(prev => [...prev, logMessage]);
    console.log(message, data); // 同时输出到浏览器控制台
  };

  // 清空日志
  const clearLogs = () => {
    setConsoleLogs([]);
  };

  const syncVariantPrompts = async () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackSupabaseUrl;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackSupabaseAnonKey;
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

    try {
      const variantsResp = await fetch(
        `${supabaseUrl}/functions/v1/config?type=variants&feature_key=create_id_photo`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${supabaseAnonKey}`,
            apikey: supabaseAnonKey
          }
        }
      );
      const variantsData = await variantsResp.json();
      if (!variantsResp.ok || !variantsData?.data) {
        addLog('⚠️ Config sync failed (variants).');
        return null;
      }

      const variants = variantsData.data as Array<{ key: string; name: string }>;
      setVariantCatalog(variants);

      const detailsResults = await Promise.all(
        variants.map(async (variant) => {
          const detailsResp = await fetch(
            `${supabaseUrl}/functions/v1/config?type=details&feature_key=create_id_photo&variant_key=${variant.key}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${supabaseAnonKey}`,
                apikey: supabaseAnonKey
              }
            }
          );
          const detailsData = await detailsResp.json();
          if (!detailsResp.ok) return null;
          return { key: variant.key, prompt: detailsData?.data?.prompt };
        })
      );

      const nextPromptCatalog: Record<string, { prompt_template?: string; negative_prompt?: string; params_json?: any }> = {};
      detailsResults.forEach((item) => {
        if (item?.key) {
          nextPromptCatalog[item.key] = item.prompt || {};
        }
      });
      setPromptCatalog(nextPromptCatalog);
      setLastConfigSyncAt(Date.now());
      addLog(`✅ Synced variants/prompts (${variants.length})`);
      return { variants, prompts: nextPromptCatalog };
    } catch (err) {
      addLog('⚠️ Config sync failed (network).');
      return null;
    }
  };

  const resolveVariantKey = (
    purpose: PhotoPurpose,
    bg: BackgroundColor,
    catalog: Array<{ key: string; name: string }>
  ) => {
    const fallbackKey =
      purpose && bg && bg !== 'none'
        ? `${purpose}_${bg}`
        : (bg === 'none' ? 'blank_background' : (purpose || 'default'));

    if (!catalog.length) return fallbackKey;

    const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, ' ');
    const purposeName = purpose === 'official' ? 'official' : 'professional';
    const bgName = bg === 'none' ? 'blank' : bg;

    // Otherwise, look for specific background variants
    const byName = catalog.find((v) => {
      const name = normalize(v.name || '');
      // Ensure it matches BOTH purpose and background
      return name.includes(purposeName) && name.includes(bgName);
    });

    if (byName?.key) return byName.key;

    // Final Fallbacks
    const byKey = catalog.find((v) => v.key === fallbackKey)
      || catalog.find((v) => v.key === purpose)
      || catalog.find((v) => v.key.includes(bgName));
    return byKey?.key || fallbackKey;
  };

  // 在生成过程中轮播等待消息
  useEffect(() => {
    if (isGenerating) {
      setCurrentMessageIndex(0); // 重置到第一条消息
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % waitingMessages.length);
      }, 3000); // 每3秒切换一次消息

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  useEffect(() => {
    syncVariantPrompts();
    const interval = setInterval(syncVariantPrompts, 30000); // ⚡️ Reduce polling frequency to lighten load
    return () => clearInterval(interval);
  }, []);

  // 从 localStorage 加载 API 配置和自定义 prompt
  useEffect(() => {
    const savedGlobalApiKey = localStorage.getItem('global_api_key');
    const savedGlobalApiUrl = localStorage.getItem('global_api_url');
    const savedGlobalDeploymentId = localStorage.getItem('global_api_deployment_id');
    const savedGlobalApiType = localStorage.getItem('global_api_type') as 'auto' | 'flux' | 'openai' | null;
    const savedApiKey = localStorage.getItem('idphoto_api_key');
    const savedApiUrl = localStorage.getItem('idphoto_api_url');
    const savedDeploymentId = localStorage.getItem('idphoto_deployment_id');
    const savedApiType = localStorage.getItem('idphoto_api_type') as 'auto' | 'flux' | 'openai' | null;

    const resolvedApiKey = savedGlobalApiKey ?? savedApiKey ?? '';
    const resolvedApiUrl = savedGlobalApiUrl ?? savedApiUrl ?? '';
    const resolvedDeploymentId = savedGlobalDeploymentId ?? savedDeploymentId ?? '';
    const resolvedApiType = savedGlobalApiType ?? savedApiType ?? null;

    if (resolvedApiKey) setApiKey(resolvedApiKey);
    if (resolvedApiUrl) setApiUrl(resolvedApiUrl);
    if (resolvedDeploymentId) setDeploymentId(resolvedDeploymentId);
    if (resolvedApiType) setApiType(resolvedApiType);

    if (!savedGlobalApiKey && savedApiKey) localStorage.setItem('global_api_key', savedApiKey);
    if (!savedGlobalApiUrl && savedApiUrl) localStorage.setItem('global_api_url', savedApiUrl);
    if (!savedGlobalDeploymentId && savedDeploymentId) {
      localStorage.setItem('global_api_deployment_id', savedDeploymentId);
    }
    if (!savedGlobalApiType && savedApiType) localStorage.setItem('global_api_type', savedApiType);


    const savedFluxGuidanceScale = localStorage.getItem('idphoto_flux_guidance_scale');
    if (savedFluxGuidanceScale) setFluxGuidanceScale(parseFloat(savedFluxGuidanceScale));
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file); // ✅ Critical: Enable storage upload path
      const reader = new FileReader();
      reader.onload = async (e) => {
        const rawBase64 = e.target?.result as string;
        setUploadedImage(rawBase64); // Show preview (raw or resized is fine for display)

        setGeneratedImage(null);
        setErrorMessage(null);
        setTimeout(triggerScrollAssist, 300);
      };
      reader.readAsDataURL(file);
    }
  };

  // ... (keeping other methods) ...

  // 客户端图片处理函数 (Keep your existing helpers)

  // Update in handleGenerate logic
  // ...

  // Skipping to line 577 in your file (Generation logic)

  // Handle Image Upload to Storage to bypass payload limits
  let photoStoragePath = undefined;
  let photoBase64: string | null | undefined = uploadedImage; // ✅ Typed correctly to allow null/undefined assignment




  // 获取背景颜色的简单描述（用于 prompt）
  const getBackgroundColorName = (color: BackgroundColor): string => {
    const colorNames = {
      none: 'original',
      blue: 'light blue (#E6F0FF)',
      red: 'light coral (#FF907F)',
      white: 'white (#FFFFFF)',
      grey: 'light gray (#EDEDED)',
      black: 'dark gray (#3D3D3D)'
    };
    return colorNames[color];
  };

  // 获取背景颜色的详细描述（用于添加到 prompt）
  const getBackgroundInstruction = (): string => {
    // ✨ 如果选择"空"，不添加任何背景指令
    if (backgroundColor === 'none') {
      return '';
    }

    const backgroundColorName = getBackgroundColorName(backgroundColor);

    // ✨ 区分两种用途的背景处理方式
    if (photoPurpose === 'official') {
      // Official Submission: 完全改变背景为纯色
      let backgroundInstruction = '';
      if (backgroundColor === 'blue') {
        backgroundInstruction = 'Use a plain, solid light blue background with no texture, no gradient, and no shadows.';
      } else if (backgroundColor === 'white') {
        backgroundInstruction = 'Use a plain, solid white background with no texture, no gradient, and no shadows. Ensure sufficient contrast between the subject and the background.';
      } else if (backgroundColor === 'grey') {
        backgroundInstruction = 'Use a plain, solid neutral gray background with no texture, no gradient, and no shadows. The gray should be balanced and neutral, not dark or stylized.';
      }

      return `Change background to solid ${backgroundColorName}. ${backgroundInstruction}`;
    } else {
      // Professional Use: 更有影响力的背景风格迁移，而不只是简单滤镜
      let backgroundInstruction = '';
      if (backgroundColor === 'blue') {
        backgroundInstruction = 'Change background to a professional abstract dark blue studio background. High-end corporate headshot style with soft focus blue lighting accents.';
      } else if (backgroundColor === 'white') {
        backgroundInstruction = 'Change background to a bright, modern, high-key studio background. Clean, white, and professional workspace atmosphere.';
      } else if (backgroundColor === 'grey') {
        backgroundInstruction = 'Change background to a sophisticated textured grey studio background. Professional, neutral, and high-quality portrait style.';
      } else if (backgroundColor === 'red') {
        backgroundInstruction = 'Change background to a warm, professional abstract background with terracotta or soft red tones. Modern creative professional style.';
      } else if (backgroundColor === 'black') {
        backgroundInstruction = 'Change background to a dramatic dark grey or black studio background. Elegant, cinematic lighting for a premium professional look.';
      }

      return `${backgroundInstruction} The background should look high-quality and photographic, not flat.`;
    }
  };

  /**
   * ⚡️ Optimization: Compress and resize image before upload
   * Using 768x1152 for 2:3 Portrait ratio to match 1024x1536 generation size.
   */
  const compressImage = async (imageSrc: string, maxWidth = 768, maxHeight = 1152): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error("Canvas context failed"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Compression failed"));
        }, 'image/jpeg', 0.5); // ⚡️ SPEED OPTIMIZATION: 0.5 quality is ideal for AI feature extraction speed
      };
      img.onerror = (e) => reject(new Error("Failed to load image for compression"));
      img.src = imageSrc;
    });
  };

  const blobToDataUrl = (blob: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to convert image'));
      reader.readAsDataURL(blob);
    });
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !photoPurpose) return;

    setIsGenerating(true);
    setErrorMessage(null);
    clearLogs();

    const now = Date.now();
    const needsSync = !lastConfigSyncAt || now - lastConfigSyncAt > 60000 || variantCatalog.length === 0;
    let activeVariantCatalog = variantCatalog;
    let activePromptCatalog = promptCatalog;
    if (needsSync) {
      addLog('🔄 Syncing latest strength/prompts from backend...');
      const refreshed = await syncVariantPrompts();
      if (refreshed) {
        activeVariantCatalog = refreshed.variants;
        activePromptCatalog = refreshed.prompts;
      }
    } else {
      const lastSync = lastConfigSyncAt ?? now;
      const secondsSinceSync = ((now - lastSync) / 1000).toFixed(1);
      addLog(`⚡ Using cached variant config (synced ${secondsSinceSync}s ago)`);
    }

    let compressedBlob: Blob | null = null;
    let requestSnapshot: any = null;
    let apiUrlSnapshot = '';
    let deploymentIdSnapshot = '';
    let apiKeySnapshot = '';

    try {
      addLog('🚀 Starting optimized generation...');

      const apiKeyToUse = apiKey;
      const rawApiUrl = apiUrl;
      const savedDeploymentId = deploymentId;
      apiKeySnapshot = apiKeyToUse;

      const currentApiType = apiType !== 'auto'
        ? apiType
        : (rawApiUrl?.includes('flux') ? 'flux' : 'openai');

      if (!apiKeyToUse || !rawApiUrl) {
        throw new Error("Missing API Configuration. Please set API Key and URL in the API Key modal.");
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackSupabaseUrl;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackSupabaseAnonKey;
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase 未配置：请设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY，或使用部署提供的默认值。');
      }

      let apiUrlToUse = rawApiUrl.trim();
      if (!/^https?:\/\//i.test(apiUrlToUse)) {
        apiUrlToUse = `https://${apiUrlToUse}`;
      }
      const urlWithoutQuery = apiUrlToUse.split('?')[0];
      let derivedDeploymentId: string | null = null;
      const deploymentMatch = urlWithoutQuery.match(/\/deployments\/([^/]+)/i);
      if (deploymentMatch?.[1]) {
        derivedDeploymentId = deploymentMatch[1];
      } else {
        const fluxMatch = urlWithoutQuery.match(/\/(flux-[^/]+)/i);
        if (fluxMatch?.[1]) {
          derivedDeploymentId = fluxMatch[1];
        }
      }
      const deploymentIdToUse = savedDeploymentId || derivedDeploymentId || '';
      deploymentIdSnapshot = deploymentIdToUse;
      if (apiUrlToUse.includes('azure.com')) {
        apiUrlToUse = apiUrlToUse.replace(/\/open(\/|$)/, '/openai$1');
        if (!apiUrlToUse.includes('/openai')) {
          apiUrlToUse = `${apiUrlToUse.replace(/\/+$/, '')}/openai`;
        }
        if (!apiUrlToUse.includes('/deployments/') && !deploymentIdToUse) {
          throw new Error('Azure API URL must include /openai/deployments/{deployment} since no Deployment Name is configured.');
        }
      }

      const baseVariantKey = photoPurpose || 'default';
      const backgroundVariantKey = resolveVariantKey(photoPurpose, backgroundColor, activeVariantCatalog);
      const variantKey = baseVariantKey;

      // ⚡️ Strictly use backend configuration, no built-in refined instructions
      const backgroundPrompt = hasManualBackgroundSelection
        ? (activePromptCatalog[backgroundVariantKey]?.prompt_template || "")
        : (activePromptCatalog[variantKey]?.prompt_template || "");

      // ⚡️ 获取后端配置的强度数值 (Params JSON)
      const variantConfig = activePromptCatalog[variantKey];
      const backendStrength = variantConfig?.params_json?.strength;

      // 优先使用后端数值，如果没有则根据用途设定默认值
      const finalStrength = backendStrength !== undefined
        ? backendStrength
        : (photoPurpose === 'official' ? 0.15 : 0.42);

      const providerKey = currentApiType === 'flux' ? 'flux_dev' : 'chatgpt_image';

      addLog(`🎯 Requesting Variant: "${variantKey}" (Strength: ${finalStrength})`);

      const requestPayload = {
        feature_key: 'create_id_photo',
        variant_key: variantKey,
        provider_key: providerKey,
        return_payload_only: true,
        user_inputs: {
          purpose: photoPurpose,
          background_color: backgroundColor,
          // ⚡️ SPEED & QUALITY OPTIMIZATION: 
          // Use the detailed background instructions and use 'background_prompt' 
          // to match the backend's automatic appending logic.
          background_prompt: backgroundPrompt,
          strength: finalStrength,
          guidance_scale: fluxGuidanceScale,
          reference_strength: 0.6,
          // Hint backend to generate image-to-image plan when a photo is uploaded.
          photo: uploadedImage ? "data:image/png;base64,placeholder" : undefined
        },
        provider_base_url_override: apiUrlToUse || undefined,
        provider_deployment_id_override: deploymentIdToUse || undefined
      };
      requestSnapshot = requestPayload;
      apiUrlSnapshot = apiUrlToUse;

      addLog('🤖 Fetching plan & preparing image (optimized for speed)...');

      const planPromise = supabase.functions.invoke('generate-image', {
        body: requestPayload
      });
      const imageBlobPromise = compressImage(uploadedImage);

      const [planResult, imageBlob] = await Promise.all([planPromise, imageBlobPromise]);
      compressedBlob = imageBlob;

      const { data: planData, error: planError } = planResult;

      if (planError || !planData) {
        throw planError || new Error('Variant not found');
      }

      if (planData?.error) {
        throw new Error(planData.error);
      }

      const planRequest = planData?.request
        || planData?.data?.request
        || (planData?.url ? planData : null);

      if (!planRequest?.url) {
        addLog('⚠️ Plan response missing request payload:', planData);
        throw new Error('Backend did not return a valid request plan.');
      }

      const serverPrompt = planData.server_prompt || planRequest.body_data?.prompt;
      if (!serverPrompt) throw new Error("Backend failed to return a prompt.");
      addLog(`📝 Prompt received: ${serverPrompt.substring(0, 50)}...`);

      // Ensure correct API version for GPT-image edits, even if backend isn't updated yet.
      if (planRequest.url.includes('/images/edits') && deploymentIdToUse.toLowerCase().includes('gpt-image')) {
        planRequest.url = planRequest.url.replace(/api-version=[^&]+/, 'api-version=2025-04-01-preview');
      }

      const headers: Record<string, string> = { ...(planRequest.headers || {}) };
      if (headers['Authorization']) headers['Authorization'] = `Bearer ${apiKeyToUse}`;
      if (headers['api-key']) headers['api-key'] = apiKeyToUse;
      if (headers['x-key']) headers['x-key'] = apiKeyToUse;
      if (headers['User-Agent']) delete headers['User-Agent'];
      if (planRequest.url.includes('azure.com') && !headers['api-key']) {
        headers['api-key'] = apiKeyToUse;
      }

      let body: BodyInit;
      const bodyData = { ...(planRequest.body_data || {}) };

      if (bodyData._attach_image_base64) {
        // Flux expects base64
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(imageBlob);
        });
        const base64Data = await base64Promise;
        bodyData.input_image = base64Data.split('base64,')[1];
        delete bodyData._attach_image_base64;
        body = JSON.stringify(bodyData);
        headers['Content-Type'] = 'application/json';
      } else if (bodyData._attach_image || planRequest.body_type === 'multipart/form-data') {
        const formData = new FormData();
        const isAzureEdits = planRequest.url.includes('azure.com') && planRequest.url.includes('/images/edits');
        const imageFieldName = isAzureEdits ? 'image[]' : 'image';

        // Use compressed blob
        formData.append(imageFieldName, imageBlob, 'image.jpg');

        Object.entries(bodyData).forEach(([key, value]) => {
          if (value === undefined || value === null) return;
          if (key.startsWith('_')) return;
          formData.append(key, String(value));
        });
        if (isAzureEdits && deploymentIdToUse) {
          formData.append('model', deploymentIdToUse);
          const portraitSize = activePromptCatalog[variantKey]?.params_json?.size || '1024x1536';
          formData.append('size', portraitSize);
          formData.append('n', '1');
        }
        delete headers['Content-Type'];
        body = formData;
      } else {
        body = JSON.stringify(bodyData);
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';
      }

      addLog('⚡ Executing client-side request with backend prompt/refs...');

      // ⚡️ SPEED OPTIMIZATION: Add timeout to prevent "5 minute" hangs
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout

      try {
        const resp = await fetch(planRequest.url, {
          method: planRequest.method || 'POST',
          headers,
          body,
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!resp.ok) {
          const errText = await resp.text();
          if (resp.status === 404) {
            const match = planRequest.url.match(/\/deployments\/([^/]+)/i);
            const deploymentName = match?.[1];
            if (deploymentName) {
              throw new Error(
                `API Error 404: Deployment "${deploymentName}" not found. In Azure, deployment name is custom and may not equal the model name. Please use the actual deployment name in your URL.`
              );
            }
          }
          throw new Error(`API Error ${resp.status}: ${errText}`);
        }

        const data = await resp.json();
        let imageUrl = '';
        if (data.data?.[0]?.url) imageUrl = data.data[0].url;
        else if (data.data?.[0]?.b64_json) imageUrl = `data:image/png;base64,${data.data[0].b64_json}`;
        else if (data.image) imageUrl = data.image.startsWith('data:') ? data.image : `data:image/png;base64,${data.image}`;
        else if (data.url) imageUrl = data.url;
        else throw new Error("No image data in response");

        setGeneratedImage(imageUrl);
        addLog('✅ Generation successful!');

        const newHistoryItem: HistoryImage = {
          id: Date.now().toString(),
          imageUrl: imageUrl,
          timestamp: Date.now(),
          purpose: photoPurpose,
          bgColor: backgroundColor
        };
        setImageHistory(prev => [newHistoryItem, ...prev]);
        setCurrentHistoryId(newHistoryItem.id);

      } catch (err: any) {
        if (err.name === 'AbortError') {
          throw new Error('Request timed out (2 minutes). The AI provider is taking too long. Please try again or check your API settings.');
        }
        throw err;
      }

    } catch (e: any) {
      console.error(e);
      const message = e?.message || 'Generation failed';
      if (message === 'Failed to fetch') {
        try {
          if (compressedBlob && requestSnapshot && apiKeySnapshot) {
            addLog('⚠️ CORS blocked. Retrying via backend proxy with your API key...');
            const dataUrl = await blobToDataUrl(compressedBlob);
            const backendPayload = {
              ...requestSnapshot,
              return_payload_only: false,
              provider_api_key_override: apiKeySnapshot,
              provider_base_url_override: apiUrlSnapshot || undefined,
              provider_deployment_id_override: deploymentIdSnapshot || undefined,
              user_inputs: {
                ...requestSnapshot.user_inputs,
                photo: dataUrl
              }
            };
            const backendImageUrl = await generateImageEdge(backendPayload);
            if (backendImageUrl) {
              setGeneratedImage(backendImageUrl);
              addLog('✅ Generation successful (backend proxy).');
              setErrorMessage(null);
              return;
            }
          }
        } catch (fallbackErr) {
          console.error('Backend proxy failed:', fallbackErr);
        }
        const hint = '网络请求失败：浏览器被 CORS 拦截，已尝试后端代理仍失败。请检查 API Key/URL 或稍后重试。';
        setErrorMessage(hint);
        addLog('❌ Error:', hint);
        return;
      }
      if (message.includes('moderation_blocked') || message.includes('safety system')) {
        setSafetyErrorMessage('Content blocked by safety policy. Please try a different photo.');
        setShowSafetyModal(true);
        setErrorMessage(null);
        return;
      }
      setErrorMessage(message);
      addLog('❌ Error:', message);
    } finally {
      setIsGenerating(false);
      setTimeout(triggerScrollAssist, 500);
    }
  };

  // 客户端图片处理函数：添加背景色或色调
  const processImageWithBackground = (imageData: string, bgColor: BackgroundColor, purpose: PhotoPurpose): Promise<string> => {
    console.log('🔧 processImageWithBackground called');
    console.log('🔧 imageData exists:', !!imageData);
    console.log('🔧 imageData length:', imageData?.length);
    console.log('🔧 bgColor:', bgColor);
    console.log('🔧 purpose:', purpose);

    // ✨ 如果选择"空"，直接返回原图
    if (bgColor === 'none') {
      console.log('✅ No background change requested, returning original image');
      return Promise.resolve(imageData);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        console.log('✅ Image loaded successfully');
        console.log('✅ Image dimensions:', img.width, 'x', img.height);
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas not supported'));
            return;
          }

          // 设置画布尺寸为标准证件照尺寸 (2:3 Portrait)
          canvas.width = 1024;
          canvas.height = 1536;

          const bgColors: Record<Exclude<BackgroundColor, 'none'>, string> = {
            blue: '#E6F0FF',
            red: '#FF907F',
            white: '#FFFFFF',
            grey: '#EDEDED',
            black: '#3D3D3D'
          };

          if (purpose === 'official') {
            // Official: 替换背景为纯色
            ctx.fillStyle = bgColors[bgColor as Exclude<BackgroundColor, 'none'>];
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            console.log('✅ Background replaced with solid color:', bgColors[bgColor as Exclude<BackgroundColor, 'none'>]);

            // 计算图片居中位置和缩放
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.85;
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;
            console.log('✅ Drawing image at:', { x, y, scale });

            // 绘制图片
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          } else {
            // Professional: 保留原图，添加色调滤镜
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;

            // 绘制原图
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            console.log('✅ Original image drawn, applying color tone...');

            // 添加色调叠加层
            ctx.globalCompositeOperation = 'overlay';
            ctx.fillStyle = bgColors[bgColor as Exclude<BackgroundColor, 'none'>];
            ctx.globalAlpha = 0.15; // 15% 透明度的色调
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            console.log('✅ Color tone applied:', bgColors[bgColor as Exclude<BackgroundColor, 'none'>], 'at 15% opacity');
          }

          // 转换为 base64
          const result = canvas.toDataURL('image/png');
          console.log('✅ Result generated, length:', result.length);
          resolve(result);
        } catch (err) {
          console.error('❌ Error in processImageWithBackground:', err);
          reject(err);
        }
      };
      img.onerror = (err) => {
        console.error('❌ Failed to load image:', err);
        reject(new Error('Failed to load image'));
      };
      img.src = imageData;
    });
  };

  const handleReset = () => {
    setUploadedImage(null);
    setPhotoPurpose(null);
    setBackgroundColor('none');
    setGeneratedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    // 创下载链接
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'id-photo.png';
    link.click();
  };

  // 切换到历史图片
  const handleSelectHistory = (historyItem: HistoryImage) => {
    setGeneratedImage(historyItem.imageUrl);
    setCurrentHistoryId(historyItem.id);
  };

  // 下载特定历史图片
  const handleDownloadHistory = (historyItem: HistoryImage, event: React.MouseEvent) => {
    event.stopPropagation(); // 防止触发选择
    const link = document.createElement('a');
    link.href = historyItem.imageUrl;
    link.download = `id-photo-${new Date(historyItem.timestamp).toISOString().slice(0, 19).replace(/:/g, '-')}.png`;
    link.click();
  };

  const backgroundColors = {
    none: { fill: '#f9f9f9', stroke: '#B3B3B3', gradient: 'url(#gradient-white)' },
    blue: { fill: '#E6F0FF', stroke: '#B3B3B3', gradient: 'url(#gradient-blue)' },
    red: { fill: '#FF907F', stroke: '#B3B3B3', gradient: 'url(#gradient-red)' },
    white: { fill: '#FFFFFF', stroke: '#B3B3B3', gradient: 'url(#gradient-white)' },
    grey: { fill: '#EDEDED', stroke: '#B3B3B3', gradient: 'url(#gradient-grey)' },
    black: { fill: '#3D3D3D', stroke: '#B3B3B3', gradient: 'url(#gradient-black)' },
  };

  const canGenerate = uploadedImage && photoPurpose;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.25
      }}
      className="fixed inset-0 bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f5] z-[9999] overflow-hidden flex flex-col"
    >
      {/* 顶部标题栏 */}
      <div className="sticky top-0 z-10 flex-shrink-0 bg-white/80 backdrop-blur-xl border-b border-[#e5e5e5] shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 md:py-4">
          <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
            {/* 关闭按��� */}
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-black/5 active:bg-black/10 transition-all flex items-center justify-center group"
              aria-label="Close"
            >
              <X className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-90" />
            </button>

            {/* 分隔线 - 隐藏在小屏幕 */}
            <div className="hidden md:flex h-8 items-center justify-center w-px bg-[#e5e5e5]" />

            {/* 标题 */}
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <h1 className="font-sans font-bold text-base md:text-xl text-[#050505] truncate tracking-tight">
                ID Photo
              </h1>
              <p className="font-sans font-normal text-xs text-[#666] truncate">
                Clean, compliant photos for official use.
              </p>
            </div>
          </div>

          {/* 顶部按钮组 */}
          <div className="hidden lg:flex items-center gap-3">
            {/* API Key 按钮 */}
            <button
              onClick={() => setShowApiModal(true)}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-white border border-[#e5e5e5] rounded-xl hover:bg-[#fafafa] hover:border-[#d4d4d4] hover:shadow-sm active:scale-[0.98] transition-all"
            >
              <Key className="w-4 h-4 text-[#666]" />
              <span className="font-sans font-semibold text-sm text-[#050505]">
                API key
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
        {/* 左侧控制面板 */}
        <div
          ref={scrollContainerRef}
          className="w-full lg:w-[420px] xl:w-[480px] bg-white overflow-visible lg:overflow-y-auto lg:h-full border-b lg:border-b-0 lg:border-r border-[#e5e5e5]"
        >
          <div className="p-3 sm:p-3.5 md:p-4 lg:p-5">
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 max-w-md lg:max-w-none mx-auto">
              {/* 1. PHOTO INPUT */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1.5 pl-2">
                  <div className="w-6 h-6">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 28 28">
                      <path d={svgPathsFigma.p8fd1770} fill="#242424" />
                    </svg>
                  </div>
                  <ol className="font-sans font-semibold text-sm text-[#050505] uppercase list-decimal" start={1}>
                    <li className="list-inside ms-1">
                      <span>photo input</span>
                    </li>
                  </ol>
                </div>

                {/* 上传区域 */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="relative h-28 sm:h-32 md:h-36 lg:h-40 border-2 border-dashed border-[#d4d4d4] rounded-2xl bg-white/50 backdrop-blur-sm shadow-inner flex flex-col items-center justify-center gap-4 cursor-pointer transition-all group"
                >
                  {uploadedImage ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="w-7 h-7">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 32 32">
                          <path d={svgPathsFigma.p3e164e00} fill="#242424" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1.5 text-center">
                        <p className="font-sans font-semibold text-sm text-[#050505]">
                          Upload Photo
                        </p>
                        <p className="font-sans font-medium text-xs text-[#999]">
                          Face should be clearly visible
                        </p>
                      </div>
                    </>
                  )}
                </label>
              </div>

              {/* 2. PHOTO PURPOSE */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1.5 pl-2">
                  <div className="w-6 h-6">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 28 28">
                      <path d={svgPathsFigma.p1f995572} fill="#242424" />
                    </svg>
                  </div>
                  <ol className="font-sans font-semibold text-sm text-[#050505] uppercase list-decimal" start={2}>
                    <li className="list-inside ms-1">
                      <span>Photo Purpose</span>
                    </li>
                  </ol>
                </div>

                {/* 照片用途选项 */}
                <div className="w-[70%] mx-auto">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-3.5 sm:gap-y-4 md:gap-y-4.5 w-full mx-auto justify-items-stretch">
                    {/* Official submission */}
                    <button
                      onClick={() => {
                        setPhotoPurpose('official');
                        setBackgroundColor('white'); // 默认选择白色
                        setHasManualBackgroundSelection(false);
                        triggerScrollAssist();
                      }}
                      className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden transition-all group ${photoPurpose === 'official'
                        ? 'ring-[3px] ring-[#333] ring-offset-2 ring-offset-white shadow-lg'
                        : 'hover:shadow-lg hover:scale-[1.02]'
                        }`}
                    >
                      <ImageWithFallback
                        src={photoPurposeOfficialUrl}
                        alt="Official submission"
                        className={`absolute inset-0 w-full h-full max-w-none object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[1px] ${photoPurpose === 'official' ? 'scale-[1.06]' : ''}`}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute border-[2.5px] border-solid border-white inset-0 rounded-2xl pointer-events-none"
                      />

                      {/* Hover 信息遮罩 */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center px-4 text-center">
                        <p className="font-sans font-bold text-sm text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          Official Submission
                        </p>
                        <p className="font-sans font-medium text-[11px] text-white/85 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                          Strict, neutral, compliance-focused
                        </p>
                      </div>

                      {/* 选中标记 */}
                      {photoPurpose === 'official' && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-[#333] rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>

                    {/* Professional use */}
                    <button
                      onClick={() => {
                        setPhotoPurpose('professional');
                        setBackgroundColor('none'); // 默认选择"空"选项
                        setHasManualBackgroundSelection(false);
                        triggerScrollAssist();
                      }}
                      className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden transition-all group ${photoPurpose === 'professional'
                        ? 'ring-[3px] ring-[#333] ring-offset-2 ring-offset-white shadow-lg'
                        : 'hover:shadow-lg hover:scale-[1.02]'
                        }`}
                    >
                      <ImageWithFallback
                        src={photoPurposeProfessionalUrl}
                        alt="Professional use"
                        className={`absolute inset-0 w-full h-full max-w-none object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[1px] ${photoPurpose === 'professional' ? 'scale-[1.06]' : ''}`}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute border-[2.5px] border-solid border-white inset-0 rounded-2xl pointer-events-none"
                      />

                      {/* Hover 信息遮罩 */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center px-4 text-center">
                        <p className="font-sans font-bold text-sm text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          Professional Use
                        </p>
                        <p className="font-sans font-medium text-[11px] text-white/85 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                          Polished, confident, workplace-ready
                        </p>
                      </div>

                      {/* 选中标记 */}
                      {photoPurpose === 'professional' && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-[#333] rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. BACKGROUND */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1.5 pl-2">
                  <div className="w-6 h-6">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 28 28">
                      <path d={svgPathsFigma.p3f6d3580} fill="#242424" />
                    </svg>
                  </div>
                  <ol className="font-sans font-semibold text-sm text-[#050505] uppercase list-decimal" start={3}>
                    <li className="list-inside ms-1">
                      <span>background</span>
                    </li>
                  </ol>
                </div>

                {/* 颜色选择 */}
                <div className="flex gap-4 items-center justify-center py-2">
                  {/* Professional Use 时显示"空"选项 */}
                  {photoPurpose === 'professional' && (
                    <button
                      onClick={() => {
                        setBackgroundColor('none');
                        setHasManualBackgroundSelection(true);
                        triggerScrollAssist();
                      }}
                      className={`relative w-11 h-11 md:w-12 md:h-12 shrink-0 transition-all duration-300 rounded-full overflow-hidden ${backgroundColor === 'none'
                        ? 'ring-[3px] ring-[#333] ring-offset-2 ring-offset-white'
                        : 'hover:scale-110 active:scale-95'
                        }`}
                    >
                      <div
                        className="w-full h-full rounded-full transition-all duration-300 border-[1.5px] border-[#d4d4d4] flex items-center justify-center"
                        style={{ backgroundColor: '#f9f9f9' }}
                      >
                        {/* 斜杠图标表示"无" */}
                        <svg className="w-6 h-6 text-[#ff9999]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M-6 30L30 -6" />
                        </svg>
                      </div>

                      {/* 选中标记 */}
                      {backgroundColor === 'none' && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", duration: 0.4, bounce: 0.5 }}
                          className="absolute inset-1 rounded-full flex items-center justify-center pointer-events-none"
                        >
                          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#333]">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </motion.div>
                      )}
                    </button>
                  )}

                  {/* 颜色选项 - 始终��示 */}
                  {(['white', 'grey', 'blue'] as BackgroundColor[]).map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setBackgroundColor(color);
                        setHasManualBackgroundSelection(true);
                        triggerScrollAssist();
                      }}
                      className={`relative w-11 h-11 md:w-12 md:h-12 shrink-0 transition-all duration-300 rounded-full overflow-hidden ${backgroundColor === color
                        ? 'ring-[3px] ring-[#333] ring-offset-2 ring-offset-white'
                        : 'hover:scale-110 active:scale-95'
                        }`}
                    >
                      <div
                        className="w-full h-full rounded-full transition-all duration-300 border-[1.5px] border-[#d4d4d4]"
                        style={{ backgroundColor: backgroundColors[color].fill }}
                      />

                      {/* 选中标记 */}
                      {backgroundColor === color && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", duration: 0.4, bounce: 0.5 }}
                          className="absolute inset-1 rounded-full flex items-center justify-center pointer-events-none"
                        >
                          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#333]">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate 按钮 */}
              <div className="flex flex-col gap-2 pt-6 pb-10">
                <p className="font-sans font-normal text-[10px] text-black">
                  * Ready to generate a compliant ID photo
                </p>

                {/* 错误提示 */}
                {errorMessage && (
                  <div className={`p-3 border rounded-xl ${errorMessage.startsWith('Demo Mode')
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-red-50 border-red-200'
                    }`}>
                    <p className={`font-sans font-normal text-xs whitespace-pre-line ${errorMessage.startsWith('Demo Mode')
                      ? 'text-blue-600'
                      : 'text-red-600'
                      }`}>
                      {errorMessage}
                    </p>
                  </div>
                )}

                {/* API 状态指示器 */}
                {!apiKey || !apiUrl ? (
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                    <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="font-sans text-xs text-amber-800">
                      Demo Mode: Only changing background
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-lg">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-sans text-xs text-green-800">
                        Azure AI Connected
                      </span>
                    </div>
                  </div>
                )}

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
              </div>
            </div>
          </div>
        </div>

        {/* 右侧预览区域 */}
        <div className="flex-1 bg-gradient-to-br from-[#fafafa] to-[#f0f0f0] overflow-visible lg:overflow-hidden lg:h-full">
          <div className="h-full p-4 md:p-6 lg:p-8 flex items-center justify-center">
            <div className="w-full max-w-md flex flex-col gap-4 md:gap-5 origin-center scale-[0.9] sm:scale-[0.95] lg:scale-100">
              {/* 预览区域 */}
              <div className="relative w-full border-2 border-dashed border-[#d4d4d4] rounded-2xl bg-white/50 backdrop-blur-sm shadow-inner p-4 md:p-6 lg:p-8 flex items-center justify-center">
                {/* Portrait 比例的照片容器 - 固定 1024:1536 比例 */}
                <div
                  className="relative w-full max-w-md rounded-xl overflow-hidden bg-gradient-to-br from-[#fafafa] to-[#f5f5f5]"
                  style={{ aspectRatio: 1024 / 1536, minHeight: '400px' }}
                >
                  {/* 背景图片层 - 始终显示已生成的图片 */}
                  {generatedImage && (
                    <div
                      className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-300 ${isGenerating ? 'blur-md scale-105' : ''}`}
                    >
                      <img
                        src={generatedImage}
                        alt="Generated ID Photo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  {/* 加载动画层 - 叠加显示 */}
                  <AnimatePresence>
                    {isGenerating && (
                      <motion.div
                        key="generating-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 w-full h-full z-10"
                      >
                        {/* 白色半透明遮罩 */}
                        <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />

                        {/* 动画内容 */}
                        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center gap-6 px-4">
                          {/* 简洁有趣的加载动画 */}
                          <div className="relative w-32 h-32">
                            {/* 主圆环 - 轻盈呼吸效果 */}
                            <motion.div
                              animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.15, 0.3, 0.15]
                              }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed]"
                            />

                            {/* 第二层呼吸圆环 */}
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.2, 0.4, 0.2]
                              }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                              className="absolute inset-3 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed]"
                            />

                            {/* 顺时针旋转的光点 */}
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0"
                            >
                              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-white/50" />
                            </motion.div>

                            {/* 逆时针旋转的光点 */}
                            <motion.div
                              animate={{ rotate: -360 }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0"
                            >
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#c4b5fd] shadow-md shadow-[#c4b5fd]/50" />
                            </motion.div>

                            {/* 中心发光核心 - 带独特动画的图标 */}
                            <div className="absolute inset-0 flex items-center justify-center scale-125">
                              <GenerationAnimation />
                            </div>
                          </div>

                          {/* 轮播文字提示 */}
                          <div className="flex flex-col gap-3 text-center max-w-[320px]">
                            <AnimatePresence mode="wait">
                              <motion.p
                                key={currentMessageIndex}
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                                transition={{
                                  duration: 0.6,
                                  ease: [0.16, 1, 0.3, 1]
                                }}
                                className="font-sans font-semibold text-lg md:text-xl text-[#050505] min-h-[70px] flex items-center justify-center px-4"
                              >
                                {waitingMessages[currentMessageIndex].text}
                              </motion.p>
                            </AnimatePresence>
                          </div>

                          {/* 跳动的点 - 进度指示 */}
                          <div className="flex gap-2.5">
                            {[0, 1, 2, 3].map((i) => (
                              <motion.div
                                key={i}
                                animate={{
                                  y: [0, -10, 0],
                                  scale: [1, 1.3, 1]
                                }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: i * 0.15,
                                  ease: "easeInOut"
                                }}
                                className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] shadow-lg"
                              />
                            ))}
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 占位符层 - 无图片且未生成时显示 */}
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
                          Your generated photo will appear here
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center justify-center gap-3">
                {/* Regenerate 按钮 */}
                <button
                  onClick={handleGenerate}
                  disabled={!generatedImage || isGenerating}
                  className={`flex-1 max-w-[140px] h-11 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] ${generatedImage && !isGenerating
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

                {/* Download 按钮 */}
                <button
                  onClick={handleDownload}
                  disabled={!generatedImage}
                  className={`flex-1 max-w-[140px] h-11 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] ${generatedImage
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

              {/* 历史图片区域 */}
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

                  {/* 横向滚动的缩略图���表 - Portrait 比例 */}
                  <div className="relative w-full overflow-x-auto scrollbar-hide px-3 py-2">
                    <div className="flex gap-2.5 pb-2">
                      {imageHistory.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => handleSelectHistory(item)}
                          className={`relative flex-shrink-0 w-[72px] h-[96px] rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105 bg-[#fafafa] ${currentHistoryId === item.id
                            ? 'ring-3 ring-[#333] ring-offset-2 ring-offset-white shadow-lg'
                            : 'hover:shadow-md'
                            }`}
                        >
                          {/* 缩略图 */}
                          <img
                            src={item.imageUrl}
                            alt={`History ${new Date(item.timestamp).toLocaleTimeString()}`}
                            className="w-full h-full object-cover"
                          />

                          {/* 选中标记 */}
                          {currentHistoryId === item.id && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="absolute top-1 right-1 w-4 h-4 bg-[#333] rounded-full flex items-center justify-center shadow-lg"
                            >
                              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 9">
                                <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </motion.div>
                          )}

                          {/* 时间标签 */}
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
                    onChange={(e) => {
                      const newUrl = e.target.value;
                      setApiUrl(newUrl);

                      // 🧠 Smart Auto-Extraction: Try to find deployment name in URL
                      if (newUrl.includes('/deployments/')) {
                        const match = newUrl.match(/\/deployments\/([^\/]+)/);
                        if (match && match[1]) {
                          setDeploymentId(match[1]);
                        }
                      }
                    }}
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
                    // 验证配置
                    const isAzureService = apiUrl.includes('.cognitiveservices.azure.com') || apiUrl.includes('.openai.azure.com');
                    // Relaxed validation: check if deploymentId is present OR if URL looks complete (contains /deployments/)
                    const hasDeploymentInUrl = apiUrl.includes('/deployments/');

                    if (isAzureService && !deploymentId.trim() && !hasDeploymentInUrl) {
                      setErrorMessage('Please enter Deployment Name OR paste the full Azure URL');
                      return;
                    }

                    // 保存 API 配置到 localStorage（全局）
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

      {/* 安全警告：顶部轻提示 - Premium Style */}
      <AnimatePresence>
        {showSafetyModal && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[10000] w-fit max-w-[95vw] min-w-[320px]"
            onClick={() => setShowSafetyModal(false)}
            role="button"
          >
            <div className="bg-[#f7eded]/80 backdrop-blur-2xl border border-[#e6d0d0]/80 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-[24px] px-6 py-4 flex items-center gap-4 relative overflow-hidden">
              {/* Subtle accent background */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#d9a8a8]/90" />

              <div className="w-[40px] h-[40px] flex items-center justify-center">
                {WarningLottieView}
              </div>

              <div className="flex flex-col">
                <span className="font-nord font-bold text-[15px] text-gray-900 tracking-tight leading-none mb-1">
                  Safety Alert
                </span>
                <p className="font-sans font-medium text-[13px] text-gray-500 leading-tight">
                  {safetyErrorMessage}
                </p>
              </div>

              <div className="ml-4 pl-4 border-l border-gray-100/80">
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 调试控制台 */}
      <AnimatePresence>
        {showConsole && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 w-[500px] max-w-[calc(100vw-2rem)] bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden z-[10001] border border-[#333]"
          >
            {/* 控制台头部 */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-[#333]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                <span className="font-sans font-semibold text-xs text-white">
                  Console Log
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#333] text-[10px] font-bold text-white">
                  {consoleLogs.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearLogs}
                  className="px-3 py-1 rounded-lg bg-[#333] hover:bg-[#444] text-xs font-semibold text-white transition-all"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowConsole(false)}
                  className="w-6 h-6 rounded-lg hover:bg-[#444] flex items-center justify-center transition-all"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* 控制台内容 */}
            <div className="h-[400px] overflow-y-auto p-4 font-mono text-xs text-[#d4d4d4] space-y-2">
              {consoleLogs.length === 0 ? (
                <div className="text-[#666] italic">No logs yet...</div>
              ) : (
                consoleLogs.map((log, index) => (
                  <div key={index} className="whitespace-pre-wrap break-words border-b border-[#333]/50 pb-2">
                    {log}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}