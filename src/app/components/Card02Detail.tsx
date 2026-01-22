import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useScrollAssist } from '../hooks/useScrollAssist';
import { GenerationAnimation } from './figma/GenerationAnimation';
import { ImageWithFallback } from './figma/ImageWithFallback';
import GeneratingLottie from './GeneratingLottie';
import { supabase } from '../../services/supabase';
import { X, Upload, Key, Eye, EyeOff, Coffee, Soup, MessageCircle, Wind, Sparkles, PartyPopper, Camera, UtensilsCrossed, Sunrise, Armchair } from 'lucide-react';
import svgPaths from "../../imports/svg-lxjhel9141";
import svgPathsFigma from "../../imports/svg-pike97bdu9";
import svgPathsImage from "../../imports/svg-xmejrywrxw";

type IDPhotoDetailPageProps = {
  onClose: () => void;
};

type BackgroundColor = 'none' | 'blue' | 'red' | 'white' | 'grey' | 'black';
type PhotoPurpose = 'professional' | 'official' | 'studio' | 'outdoor' | null;

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

export default function Card02Detail({ onClose }: IDPhotoDetailPageProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { scrollContainerRef, triggerScrollAssist } = useScrollAssist();
  
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

  // 从 localStorage 加载 API 配置和自定义 prompt
  useEffect(() => {
    const savedGlobalApiKey = localStorage.getItem('global_api_key');
    const savedGlobalApiUrl = localStorage.getItem('global_api_url');
    const savedGlobalDeploymentId = localStorage.getItem('global_api_deployment_id');
    const savedGlobalApiType = localStorage.getItem('global_api_type') as 'auto' | 'flux' | 'openai' | null;
    const savedApiKey = localStorage.getItem('pet_api_key');
    const savedApiUrl = localStorage.getItem('pet_api_url');
    const savedDeploymentId = localStorage.getItem('pet_deployment_id');
    const savedApiType = localStorage.getItem('pet_api_type') as 'auto' | 'flux' | 'openai' | null;
    
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


    const savedFluxGuidanceScale = localStorage.getItem('pet_flux_guidance_scale');
    if (savedFluxGuidanceScale) setFluxGuidanceScale(parseFloat(savedFluxGuidanceScale));
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setGeneratedImage(null);
        setErrorMessage(null);
        // 触发滚动辅助
        setTimeout(triggerScrollAssist, 300);
      };
      reader.readAsDataURL(file);
    }
  };

  

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

  // 构建简洁的 Flux 图生图 prompt
  // ✨ Flux 模型需要简短、描述性的 prompt，而非长指令
  const buildPrompt = (): string => {
    const backgroundInstruction = getBackgroundInstruction();
    return `Professional ID photo of the person in the input image. ${backgroundInstruction} Clean, professional studio lighting. Preserve all facial features and identity.`;
  };

  /**
   * ⚡️ Optimization: Compress and resize image before upload
   */
  const compressImage = async (imageSrc: string, maxWidth = 1024, maxHeight = 1024): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width; width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height; height = maxHeight;
          }
        }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error("Canvas context failed")); return; }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) resolve(blob); else reject(new Error("Compression failed"));
        }, 'image/jpeg', 0.8);
      };
      img.onerror = (e) => reject(new Error("Failed to load image for compression"));
      img.src = imageSrc;
    });
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !photoPurpose) return;
    
    setIsGenerating(true);
    setErrorMessage(null);
    
    try {
      addLog('🚀 Starting optimized generation...');
      
      // ✅ Fix: Define validReferenceImages before use
      const validReferenceImages: string[] = [];
      const purposeImages: Record<string, string> = {
        official: photoPurposeOfficialUrl,
        professional: photoPurposeProfessionalUrl
      };
      
      if (photoPurpose && purposeImages[photoPurpose]) {
        validReferenceImages.push(purposeImages[photoPurpose]);
      }

      const imageBlob = await compressImage(uploadedImage);
      
      // Convert compressed blob to base64 for Flux/JSON APIs
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const res = reader.result as string;
          resolve(res.includes('base64,') ? res.split('base64,')[1] : res);
        };
        reader.readAsDataURL(imageBlob);
      });
      const compressedBase64 = await base64Promise;

      // 如果没有配置 API，直接使用 Demo Mode
      if (!apiKey || !apiUrl) {
        console.log('⚠️⚠️⚠️ Using Demo Mode (no API configured)...');
        console.log('API Key exists:', !!apiKey);
        console.log('API URL exists:', !!apiUrl);
        addLog('⚠️ Demo Mode - API not configured');
        addLog('⚠️ This is NOT using Azure AI - only changing background color');
        console.log('�� Uploaded image exists:', !!uploadedImage);
        console.log('📸 Uploaded image length:', uploadedImage?.length);
        console.log('🎨 Background color:', backgroundColor);
        addLog('📸 Uploaded image', uploadedImage?.substring(0, 50));
        await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟处理时间
        
        const processedImage = await processImageWithBackground(uploadedImage, backgroundColor, photoPurpose);
        console.log('✅ Processed image generated:', !!processedImage);
        console.log('✅ Processed image length:', processedImage?.length);
        setGeneratedImage(processedImage);
        setErrorMessage(null); // 清除任何错误信��
        return;
      }
      
      console.log('✅✅✅ API IS CONFIGURED - Using real Azure AI');
      console.log('API Key (first 20 chars):', apiKey.substring(0, 20) + '...');
      console.log('API URL:', apiUrl);
      addLog('🚀 Starting image generation with API');
      addLog('✅ API Key configured - Using real Azure AI');
      addLog('📸 Photo purpose', photoPurpose);
      addLog('🎨 Background color', backgroundColor);
      
      // ✨ 添加背景处理模式说明
      if (backgroundColor === 'none') {
        addLog('🎯 Background Mode: NONE - Will keep original background unchanged');
      } else if (photoPurpose === 'official') {
        addLog('🎯 Background Mode: REPLACE - Will change to solid color background');
      } else {
        addLog('🎯 Background Mode: COLOR TONE - Will add color grading while keeping existing background');
      }
      
      // 🔄 尝试从后端获取动态 Prompt (Supabase Edge Function)
      let finalPrompt = buildPrompt();
      try {
        const featureKey = 'create_id_photo';
        const variantKey = photoPurpose || 'default';
        
        addLog(`🔄 Syncing latest prompt from backend for ${featureKey}/${variantKey}...`);
        
        const { data: planData, error: planError } = await supabase.functions.invoke('generate-image', {
          body: {
            feature_key: featureKey,
            variant_key: variantKey,
            provider_key: 'chatgpt_image',
            return_payload_only: true,
            user_inputs: {
              purpose: photoPurpose,
              background_color: backgroundColor
            }
          }
        });

        if (planData?.request?.body_data?.prompt) {
          finalPrompt = planData.request.body_data.prompt;
          addLog('✅ Backend prompt resolved successfully');
          
          // 如果后端返回了参考图片，也同步更新
          if (planData.request.body_data.reference_images && Array.isArray(planData.request.body_data.reference_images)) {
            addLog(`🖼️ Backend provided ${planData.request.body_data.reference_images.length} reference images`);
            // 将后端参考图合并到有效参考图中
            planData.request.body_data.reference_images.forEach((url: string) => {
              if (!validReferenceImages.includes(url)) {
                validReferenceImages.push(url);
              }
            });
          }
        }
      } catch (err) {
        addLog('⚠️ Backend prompt sync failed, using local fallback');
        console.error('Backend sync error:', err);
      }

      const prompt = finalPrompt;
      addLog('📝 Final prompt used:', prompt);
      
      addLog('📝 Prompt length', prompt.length + ' characters');

      // 构建完整的 Azure API URL
      const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
      
      // 检测 Azure 服务类型
      const isAzureOpenAI = baseUrl.includes('.openai.azure.com');
      const isAzureCognitiveServices = baseUrl.includes('.cognitiveservices.azure.com');
      const isAzureAIServices = baseUrl.includes('.services.ai.azure.com');
      const isAzureEndpoint = isAzureOpenAI || isAzureCognitiveServices || isAzureAIServices;
      
      // 检测用户是否已经提供了完整的端点 URL（包含 /v1/ 或 /openai/）
      const hasEndpoint = baseUrl.includes('/v1/') || baseUrl.includes('/openai/');
      
      console.log('=== SERVICE DETECTION DEBUG ===');
      console.log('Base URL:', baseUrl);
      console.log('Has Endpoint Path:', hasEndpoint);
      console.log('isAzureOpenAI:', isAzureOpenAI);
      console.log('isAzureCognitiveServices:', isAzureCognitiveServices);
      console.log('isAzureAIServices:', isAzureAIServices);
      console.log('isAzureEndpoint:', isAzureEndpoint);
      console.log('================================');
      
      let fullApiUrl: string;
      let useMultipartFormData = false;
      
      // 🔧 如果用户已提供完整 URL，优先使用（避免重复拼接）
      if (hasEndpoint) {
        fullApiUrl = baseUrl;
        
        // 更新 API 版本参数（如果 URL 中已包含旧版本）
        if (fullApiUrl.includes('api-version=')) {
          fullApiUrl = fullApiUrl.replace(/api-version=[^&]+/, `api-version=${apiVersion}`);
          addLog('✅ Using complete API URL with updated API version:', apiVersion);
        } else {
          addLog('✅ Using complete API URL as provided');
        }
        
        // 图片编辑逻辑 - 只对完整 URL 且为 DALL-E 2 时修改
        if (uploadedImage && fullApiUrl.includes('/images/generations')) {
          const isDallE2 = deploymentId && deploymentId.toLowerCase().includes('dall-e-2');
          const isGptImage = deploymentId && deploymentId.toLowerCase().includes('gpt-image');
          const isDallE3 = deploymentId && deploymentId.toLowerCase().includes('dall-e-3');
          
          if (isDallE2 || isGptImage) {
            // DALL-E 2 和 gpt-image 都使用 /images/edits
            fullApiUrl = fullApiUrl.replace('/images/generations', '/images/edits');
            useMultipartFormData = true;
            addLog('🔄 Changed endpoint to /images/edits for ' + (isDallE2 ? 'DALL-E 2' : 'gpt-image'));
          } else if (isDallE3) {
            // DALL-E 3：不支持图生图
            addLog('⚠️ WARNING: DALL-E 3 does not support image-to-image generation');
            addLog('⚠️ Falling back to text-to-image mode (uploaded image will be ignored)');
          } else {
            // 其他模型同样改用 edits 端点，Azure 不再接受 multipart generations
            fullApiUrl = fullApiUrl.replace('/images/generations', '/images/edits');
            useMultipartFormData = true;
            addLog('🔄 Using image-to-image via /images/edits endpoint (auto-mapped)');
          }
        }
      } else if (isAzureCognitiveServices && deploymentId) {
        // Azure Cognitive Services (gpt-image-1.5, dall-e-2, dall-e-3)
        const encodedDeployment = encodeURIComponent(deploymentId);
        
        if (uploadedImage) {
          const isDallE2 = deploymentId.toLowerCase().includes('dall-e-2');
          const isGptImage = deploymentId.toLowerCase().includes('gpt-image');
          const isDallE3 = deploymentId.toLowerCase().includes('dall-e-3');
          
          if (isDallE2) {
            // DALL-E 2：使用 /images/edits 端点 + multipart 格式
            fullApiUrl = `${baseUrl}/openai/deployments/${encodedDeployment}/images/edits?api-version=${apiVersion}`;
            useMultipartFormData = true;
            addLog('🔄 Using DALL-E 2 image editing via /images/edits endpoint (multipart)');
          } else if (isGptImage) {
            // gpt-image：使用 /images/edits 端点 + multipart 格式（支持图生图）
            fullApiUrl = `${baseUrl}/openai/deployments/${encodedDeployment}/images/edits?api-version=${apiVersion}`;
            useMultipartFormData = true;
            addLog('🔄 Using gpt-image image editing via /images/edits endpoint (multipart)');
          } else if (isDallE3) {
            // DALL-E 3：不支持图生图，回退到文生图
            fullApiUrl = `${baseUrl}/openai/deployments/${encodedDeployment}/images/generations?api-version=${apiVersion}`;
            addLog('⚠️ WARNING: DALL-E 3 does not support image-to-image generation');
            addLog('⚠️ Falling back to text-to-image mode (uploaded image will be ignored)');
          } else {
            // 其他模型默认也改用 edits 端点，避免 multipart generations 被拒绝
            fullApiUrl = `${baseUrl}/openai/deployments/${encodedDeployment}/images/edits?api-version=${apiVersion}`;
            useMultipartFormData = true;
            addLog('🔄 Using image-to-image via /images/edits endpoint (auto-mapped)');
          }
        } else {
          // 文生图：使用 generations 端点
          fullApiUrl = `${baseUrl}/openai/deployments/${encodedDeployment}/images/generations?api-version=${apiVersion}`;
          addLog('➕ Using Azure Cognitive Services text-to-image endpoint');
        }
      } else if (isAzureAIServices) {
        // Azure AI Services (Flux 等第三方模型)
        // ✨ Flux 图生图使用 /v1/flux-2-pro 端点
        if (uploadedImage) {
          // 图生图：使用 Flux 2 Pro 端点
          fullApiUrl = `${baseUrl}/v1/flux-2-pro`;
          addLog('🔄 Using Flux image-to-image endpoint: /v1/flux-2-pro');
        } else {
          // 文生图：使用标准生成端点
          fullApiUrl = `${baseUrl}/v1/images/generations`;
          addLog('➕ Using text-to-image endpoint: /v1/images/generations');
        }
      } else if (isAzureOpenAI && deploymentId) {
        // Azure OpenAI 服务 - 标准格式
        if (uploadedImage) {
          // 图生图：使用 edits 端点和 multipart
          fullApiUrl = `${baseUrl}/openai/deployments/${encodeURIComponent(deploymentId)}/images/edits?api-version=${apiVersion}`;
          useMultipartFormData = true;
          addLog('🔄 Using Azure OpenAI image edits endpoint');
        } else {
          // 文生图：使用 generations 端点
          fullApiUrl = `${baseUrl}/openai/deployments/${encodeURIComponent(deploymentId)}/images/generations?api-version=${apiVersion}`;
          addLog('➕ Using Azure OpenAI text-to-image endpoint');
        }
      } else if ((isAzureOpenAI || isAzureCognitiveServices) && !deploymentId) {
        // Azure 但没有 deployment ID，提示用户
        throw new Error('Deployment Name is required for Azure OpenAI services. Please configure it in API settings.');
      } else {
        // 其他 API (OpenAI 或自定义)
        fullApiUrl = `${baseUrl}/v1/images/generations`;
      }

      if (useMultipartFormData && fullApiUrl.includes('/images/generations')) {
        // Azure 近期开始拒绝 multipart generations，请自动切换至 edits。
        fullApiUrl = fullApiUrl.replace('/images/generations', '/images/edits');
        addLog('🔄 Auto-switched multipart request to /images/edits to satisfy provider requirements');
      }

      // 构建请求头
      const headers: Record<string, string> = {};
      
      // multipart/form-data 不需要设置 Content-Type（浏览器会自动设置）
      if (!useMultipartFormData) {
        headers['Content-Type'] = 'application/json';
      }
      
      // Azure Cognitive Services 和 OpenAI 使用 Bearer token
      if (isAzureCognitiveServices || isAzureOpenAI) {
        headers['Authorization'] = `Bearer ${apiKey}`;
        addLog('🔑 Using Bearer authentication');
      } else if (isAzureAIServices) {
        // Azure AI Services 使用 api-key
        headers['api-key'] = apiKey;
        addLog('🔑 Using api-key authentication');
      } else {
        // 默认使用 Bearer
        headers['Authorization'] = `Bearer ${apiKey}`;
      }

      console.log('=== DETAILED API DEBUG INFO ===');
      console.log('Original Base URL:', apiUrl);
      console.log('Processed Base URL:', baseUrl);
      console.log('Full API URL:', fullApiUrl);
      console.log('Use Multipart:', useMultipartFormData);
      console.log('Has Uploaded Image:', !!uploadedImage);
      console.log('API Key (first 10 chars):', apiKey.substring(0, 10) + '...');
      console.log('API Key (last 5 chars):', '...' + apiKey.substring(apiKey.length - 5));
      console.log('Deployment ID:', deploymentId || 'N/A');
      console.log('Service Type:', 
        isAzureAIServices ? 'Azure AI Services (Flux)' :
        isAzureOpenAI ? 'Azure OpenAI' : 
        isAzureCognitiveServices ? 'Azure Cognitive Services (gpt-image-1.5)' : 
        'Other'
      );
      console.log('Detection Results:', {
        isAzureOpenAI,
        isAzureCognitiveServices,
        isAzureAIServices,
        isAzureEndpoint,
        hasEndpoint
      });
      console.log('Request Headers:', headers);
      console.log('================================');
      
      addLog('🌐 Full API URL', fullApiUrl);
      addLog('📋 Deployment ID', deploymentId || 'Not configured');
      addLog('����� API Version', apiVersion);
      addLog('🔧 Use Multipart', useMultipartFormData ? 'Yes' : 'No');
      
      // 显示当前策略
      if (uploadedImage) {
        const isGptImage = deploymentId && deploymentId.toLowerCase().includes('gpt-image');
        const isDallE2 = deploymentId && deploymentId.toLowerCase().includes('dall-e-2');
        
        if (isDallE2) {
          addLog('📝 Strategy', 'DALL-E 2 Image Editing (multipart format)');
        } else if (isGptImage) {
          addLog('📝 Strategy', 'gpt-image Image-to-Image (multipart format)');
        }
      }
      
      let response: Response;
      
      // 根据是否使用 multipart 格式，使用不同的请求方式
      if (useMultipartFormData && uploadedImage) {
        // ✅ Azure OpenAI / Cognitive Services 图片编辑格式 (DALL-E 2)
        const modelName = deploymentId || 'image editing model';
        addLog('🔧 Using multipart/form-data for image editing (' + modelName + ')');
        
        // ⚡️ OPTIMIZATION: Use already compressed imageBlob
        const mimeType = imageBlob.type || 'image/jpeg';
        
        // 创建 FormData
        const formData = new FormData();
        const isGptImage = deploymentId && deploymentId.toLowerCase().includes('gpt-image');
        
        // gpt-image 使用 image[]（数组格式），DALL-E 2 使用 image
        if (isGptImage) {
          formData.append('image[]', imageBlob, 'main_photo.jpg');  // 主图：第一张图片（优先保留）
          addLog('📷 Main photo added as first image (will be preserved)');
          
          // 添加参考图片到 gpt-image 请求（仅作为风格参考）
          if (validReferenceImages.length > 0) {
            addLog(`🖼️ Adding ${validReferenceImages.length} reference images (style guidance only)`);
            addLog(`💡 Note: Main photo takes priority, references only provide style hints`);
            for (let i = 0; i < validReferenceImages.length; i++) {
              const refImg = validReferenceImages[i];
              if (refImg) {
                // ✨ 修复：只有当它是 data URL 或 base64 时才尝试解码
                if (refImg.startsWith('data:') || !refImg.startsWith('http')) {
                  try {
                    const refBase64Data = refImg.includes('base64,') 
                      ? refImg.split('base64,')[1] 
                      : refImg;
                    const refMimeType = refImg.match(/data:([^;]+);/)?.[1] || 'image/png';
                    const refByteCharacters = atob(refBase64Data);
                    const refByteNumbers = new Array(refByteCharacters.length);
                    for (let j = 0; j < refByteCharacters.length; j++) {
                      refByteNumbers[j] = refByteCharacters.charCodeAt(j);
                    }
                    const refByteArray = new Uint8Array(refByteNumbers);
                    const refBlob = new Blob([refByteArray], { type: refMimeType });
                    
                    formData.append('image[]', refBlob, `style_reference_${i + 1}.png`);
                    addLog(`  ✅ Style reference ${i + 1} (Base64): ${refBlob.size} bytes`);
                  } catch (e) {
                    addLog(`  ⚠️ Failed to decode reference image ${i + 1}, skipping...`);
                  }
                } else {
                  // 如果是网络 URL，由于 multipart 无法直接带 URL，
                  // 在 gpt-image 策略下我们暂时跳过
                  addLog(`  ℹ️ Style reference ${i + 1} is a URL (skipped for multipart)`);
                }
              }
            }
          }
          
          formData.append('model', deploymentId);  // gpt-image 需要明确指定 model
          formData.append('quality', 'high');  // high 或 standard
        } else {
          formData.append('image', imageBlob, 'image.png');  // DALL-E 2 使用 image
          
          // DALL-E 2 不支持多图输入，但可以在 prompt 中说明参考图
          if (validReferenceImages.length > 0) {
            addLog(`⚠️ DALL-E 2 does not support multiple images`);
            addLog(`💡 ${validReferenceImages.length} reference images available but not sent`);
          }
        }
        
        formData.append('prompt', prompt);
        formData.append('size', '1024x1536');
        formData.append('n', '1');
        
        console.log('=== MULTIPART REQUEST DEBUG ===');
        console.log('Model:', isGptImage ? deploymentId : 'DALL-E 2');
        console.log('Image parameter name:', isGptImage ? 'image[]' : 'image');
        console.log('Image blob size:', imageBlob.size, 'bytes');
        console.log('Image MIME type:', mimeType);
        console.log('Reference images count:', validReferenceImages.length);
        console.log('Prompt:', prompt);
        console.log('Size: 1024x1536');
        if (isGptImage) {
          console.log('Model parameter:', deploymentId);
          console.log('Quality: high');
          console.log('Total images in image[]:', 1 + validReferenceImages.length);
        }
        console.log('================================');
        
        addLog('📷 Image converted to Blob', imageBlob.size + ' bytes');
        addLog('📝 Prompt', prompt);
        addLog('🎨 Background color', backgroundColor);
        if (isGptImage) {
          addLog('🤖 Model (gpt-image)', deploymentId);
          addLog('📝 Image parameter', 'image[] (array format)');
          addLog('✨ Quality', 'high');
          if (validReferenceImages.length > 0) {
            addLog('🖼️ Total images', `${1 + validReferenceImages.length} (1 main + ${validReferenceImages.length} reference)`);
          }
        }
        
        // ⚡️ SPEED OPTIMIZATION: Add timeout to prevent "5 minute" hangs
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout

        try {
          // 发送 multipart 请求
          response = await fetch(fullApiUrl, {
            method: 'POST',
            headers: headers,  // 不包含 Content-Type，让浏览器自动设置
            body: formData,
            signal: controller.signal
          });
          clearTimeout(timeoutId);
        } catch (err: any) {
          if (err.name === 'AbortError') {
            throw new Error('Request timed out (2 minutes). The AI provider is taking too long. Please try again or check your API settings.');
          }
          throw err;
        }
        
      } else {
        // 决定使用哪种 JSON API 格式
        let requestBody: any;
        let useFluxFormat = false;
        
        if (apiType === 'flux') {
          useFluxFormat = true;
          addLog('🎯 User selected Flux API format');
        } else if (apiType === 'openai') {
          useFluxFormat = false;
          addLog('🎯 User selected OpenAI API format');
        } else {
          // auto 模式：根据 URL 自动检测
          useFluxFormat = isAzureAIServices || (hasEndpoint && !isAzureOpenAI && !isAzureCognitiveServices);
          addLog('🎯 Auto-detected API format:', useFluxFormat ? 'Flux' : 'OpenAI');
        }
        
        if (useFluxFormat) {
          // Azure AI Services (Flux) - 使用 Flux 特定的参数格式
          // Flux 支持 image-to-image 生成
          
          // ⚡️ OPTIMIZATION: Use already compressed base64
          const base64Image = compressedBase64;
          const trimmedDeploymentId = deploymentId?.trim() || '';
          const fluxModelFallback = 'Flux.1-schnell';
          const isFluxModelName = trimmedDeploymentId ? /flux/i.test(trimmedDeploymentId) : false;
          const resolvedFluxModel = isFluxModelName ? trimmedDeploymentId : fluxModelFallback;
          if (trimmedDeploymentId && !isFluxModelName) {
            addLog(`⚠️ Deployment name "${trimmedDeploymentId}" is not a Flux model. Using default Flux.1-schnell.`);
          }
          const isSchnell = resolvedFluxModel.toLowerCase().includes('schnell');
          
          console.log('=== IMAGE DATA DEBUG ===');
          console.log('Original image length:', uploadedImage ? uploadedImage.length : 'N/A');
          console.log('Compressed Base64 length:', base64Image.length);
          console.log('========================');
          
          addLog('📷 Compressed image data prepared for API');
          addLog('Base64 length', base64Image.length);
          
          // Flux 图生图请求体
          // Flux API 使用 input_image 参数（不是 image）
          
          requestBody = {
            model: resolvedFluxModel,  // Default to Flux.1-schnell when invalid
            prompt: prompt,
            input_image: base64Image,  // ✅ Flux API 使用 input_image 参数（主图 - 优先保留）
            // ⚡️ SPEED OPTIMIZATION: 768x1024 is faster than 896x1152
            width: 768,
            height: 1024,
            num_inference_steps: isSchnell ? 4 : 20,  // ⚡️ Schnell needs only 4 steps
            guidance_scale: isSchnell ? 1.0 : fluxGuidanceScale, 
            strength: photoPurpose === 'professional' ? 0.38 : 0.15,
            seed: Math.floor(Math.random() * 1000000)
          };
          console.log('=== FLUX IMAGE-TO-IMAGE REQUEST ===');
          console.log('Model:', requestBody.model);
          console.log('Prompt length:', prompt.length);
          console.log('Full Prompt:', prompt);  // 显示完整 prompt
          console.log('input_image parameter exists:', 'input_image' in requestBody);
          console.log('Image data length:', base64Image.length);
          console.log('Image first 100 chars:', base64Image.substring(0, 100));
          console.log('Main image strength:', requestBody.strength, photoPurpose === 'professional' ? '(professional: 0.38 for noticeable enhancement)' : '(official: 0.15 for background replacement)');
          console.log('Guidance scale:', requestBody.guidance_scale);
          console.log('Background color:', backgroundColor);
          console.log('Full request body:', JSON.stringify({
            ...requestBody,
            input_image: '[BASE64_DATA_' + base64Image.length + '_BYTES]',
            prompt: prompt  // 显示完整 prompt
          }, null, 2));
          console.log('===================================');
          
          addLog('🔧 Flux Image-to-Image Request');
          addLog('🤖 Model', requestBody.model);
          addLog('📝 Prompt', prompt);  // 添加完整 prompt 到日志
          addLog('📊 input_image base64 length', base64Image.length);
          addLog('📷 Main photo (primary)', 'Strength: ' + requestBody.strength + (photoPurpose === 'professional' ? ' (Professional: noticeable enhancement)' : ' (Official: background replacement)'));
          addLog('💪 Main image strength', requestBody.strength + (photoPurpose === 'professional' ? ' (Professional: noticeable enhancement)' : ' (Official: background replacement)'));
          addLog('🎯 Guidance scale', requestBody.guidance_scale);
          addLog('🎨 Background', backgroundColor);
          
        } else {
          // OpenAI / Azure Cognitive Services format
          // ⚠️ gpt-image 不支持图生图，只支持文生图
          
          addLog('📝 Using text-only prompt');
          
          requestBody = {
            prompt: prompt,
            n: 1,
            size: "1024x1024" // ⚡️ Speed Optimization: 1024x1536 -> 1024x1024
          };
          
          // Add model parameter only if it's a valid OpenAI model name
          const validOpenAIModels = ['dall-e-2', 'dall-e-3', 'gpt-image-1', 'gpt-image-1.5', 'gpt-image-1-mini'];
          if (deploymentId && validOpenAIModels.includes(deploymentId.toLowerCase())) {
            requestBody.model = deploymentId;
            addLog('🤖 Using model', deploymentId);
          } else if (deploymentId) {
            addLog('⚠️ Invalid model name ignored:', deploymentId);
            addLog('💡 Valid models: dall-e-2, dall-e-3, gpt-image-1, gpt-image-1-mini');
          }
          
          addLog('🔧 OpenAI/Azure Text-to-Image Request');
          addLog('📝 Prompt', prompt);
        }
        
        console.log('=== REQUEST BODY (DETAILED) ===');
        console.log(JSON.stringify(requestBody, null, 2));
        console.log('Image base64 length:', requestBody.image ? requestBody.image.length : 'N/A');
        console.log('================================');
        
        // ⚡️ SPEED OPTIMIZATION: Add timeout to prevent "5 minute" hangs
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout

        try {
          // 调用 Azure AI API 生成图片 (JSON 格式)
          response = await fetch(fullApiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
            signal: controller.signal
          });
          clearTimeout(timeoutId);
        } catch (err: any) {
          if (err.name === 'AbortError') {
            throw new Error('Request timed out (2 minutes). The AI provider is taking too long. Please try again or check your API settings.');
          }
          throw err;
        }
      }

      console.log('Azure API Response Status:', response.status);
      console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('=== API ERROR DETAILS ===');
        console.error('Status:', response.status, response.statusText);
        console.error('Response Body:', errorText);
        console.error('========================');
        
        // 尝试解析错误信息
        let errorDetail = '';
        let errorCode = '';
        try {
          const errorJson = JSON.parse(errorText);
          errorDetail = errorJson.error?.message || errorJson.message || errorText;
          errorCode = errorJson.error?.code || '';
        } catch {
          errorDetail = errorText;
        }
        
        addLog('❌ API Error', `${response.status}: ${errorDetail}`);
        addLog('🔍 Failed URL', fullApiUrl);
        
        // 检测安全审核被拒绝的错误
        if (errorCode === 'moderation_blocked' || (response.status === 400 && errorDetail.includes('safety system'))) {
          let safetyMessage = 'Your image or request was rejected by the content safety system. This may happen if:\n\n';
          safetyMessage += '• The uploaded photo contains inappropriate content\n';
          if (validReferenceImages.length > 0) {
            safetyMessage += `• One or more of the ${validReferenceImages.length} reference images violates safety policies\n`;
            safetyMessage += '• The combination of images triggers safety checks\n\n';
            safetyMessage += '💡 Suggestion: Try removing all reference images first, then add them back one by one to identify which image is causing the issue.';
          } else {
            safetyMessage += '• The image violates safety policies\n\n';
            safetyMessage += '💡 Suggestion: Please try a different photo.';
          }
          throw new Error('SAFETY_BLOCKED: ' + safetyMessage);
        }
        
        // 提供更详细的错误提示
        let friendlyError = `API request failed (${response.status}): ${errorDetail}`;
        if (response.status === 404) {
          friendlyError += `\n\n🔍 Troubleshooting:\n`;
          friendlyError += `\n1. Failed URL: ${fullApiUrl}`;
          friendlyError += `\n2. Deployment Name: "${deploymentId}"`;
          friendlyError += `\n3. API Version: "${apiVersion}"`;
          
          // 检测是否是 gpt-image 模型
          const isGptImage = deploymentId && deploymentId.toLowerCase().includes('gpt-image');
          
          if (false && isGptImage) {  // Disabled: gpt-image now supports image-to-image
            friendlyError += `\n\n⚠️ IMPORTANT: gpt-image models do NOT support image-to-image!`;
            friendlyError += `\n   - gpt-image-1.5, gpt-image-1, etc. only support text-to-image`;
            friendlyError += `\n   - If you uploaded an image, it was ignored`;
            friendlyError += `\n\n💡 For image-to-image (ID photo background change):`;
            friendlyError += `\n   ✓ Use DALL-E 2 (supports /images/edits)`;
            friendlyError += `\n   ✓ Use Azure AI Services with Flux models`;
            friendlyError += `\n   ✓ Configure correct deployment name in settings`;
          }
          
          // 检测常见错误
          if (deploymentId && deploymentId.includes(' ')) {
            friendlyError += `\n\n❌ ERROR: Deployment name contains spaces!`;
            friendlyError += `\n   Current: "${deploymentId}"`;
            friendlyError += `\n   Try: "${deploymentId.replace(/ /g, '-')}"`;
          }
          
          if (deploymentId && deploymentId.toLowerCase().includes('chatgpt')) {
            friendlyError += `\n\n❌ ERROR: Wrong model type!`;
            friendlyError += `\n   Image models: "gpt-image-1.5", "dall-e-2", "dall-e-3"`;
            friendlyError += `\n   NOT "chatgpt-..."`;
          }
          
          friendlyError += `\n\n✅ Solutions:`;
          friendlyError += `\n   1. Open Azure Portal → Cognitive Services`;
          friendlyError += `\n   2. Copy EXACT deployment name (case-sensitive)`;
          friendlyError += `\n   3. Try different API versions in Settings`;
          friendlyError += `\n   4. Verify your subscription supports this model`;
        }
        
        throw new Error(friendlyError);
      }

      const data = await response.json();
      console.log('=== FULL API RESPONSE ===');
      console.log('Azure API Response Data:', JSON.stringify(data, null, 2));
      console.log('========================');
      addLog('✅ API Response received', JSON.stringify(data).substring(0, 200));
      
      // 处理返回的图片 - Azure OpenAI DALL-E 格式
      let imageUrl: string;
      
      if (data.data && data.data[0]) {
        if (data.data[0].url) {
          imageUrl = data.data[0].url;
          addLog('📥 Image URL received from data.data[0].url');
        } else if (data.data[0].b64_json) {
          imageUrl = `data:image/png;base64,${data.data[0].b64_json}`;
          addLog('📥 Base64 image received from data.data[0].b64_json');
        } else {
          throw new Error('Unexpected API response format');
        }
      } else if (data.url) {
        imageUrl = data.url;
        addLog('📥 Image URL received from data.url');
      } else if (data.image) {
        imageUrl = data.image.startsWith('data:') ? data.image : `data:image/png;base64,${data.image}`;
        addLog('📥 Image received from data.image');
      } else {
        addLog('❌ No image found in API response', data);
        throw new Error('Could not find image in API response');
      }
      
      // 添加到历史记录
      const newHistoryItem: HistoryImage = {
        id: Date.now().toString(),
        imageUrl: imageUrl,
        timestamp: Date.now(),
        purpose: photoPurpose,
        bgColor: backgroundColor
      };
      setImageHistory(prev => [newHistoryItem, ...prev]);
      setCurrentHistoryId(newHistoryItem.id);
      
      setGeneratedImage(imageUrl);
      setErrorMessage(null); // 清除错误信息
    } catch (error) {
      console.error('Error generating image:', error);
      
      // 检测安全审核被拒绝的错误
      if (error instanceof Error && error.message.startsWith('SAFETY_BLOCKED:')) {
        const safetyMessage = error.message.replace('SAFETY_BLOCKED: ', '');
        setSafetyErrorMessage(safetyMessage);
        setShowSafetyModal(true);
        addLog('🚫 Content blocked by safety system');
        setIsGenerating(false);
        return;
      }
      
      // 如果 API 调用失败，自动 fallback 到 Demo Mode
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.log('API failed, switching to Demo Mode...');
        try {
          await new Promise(resolve => setTimeout(resolve, 1500));
          const processedImage = await processImageWithBackground(uploadedImage!, backgroundColor, photoPurpose);
          
          // 添加到历史记录
          const newHistoryItem: HistoryImage = {
            id: Date.now().toString(),
            imageUrl: processedImage,
            timestamp: Date.now(),
            purpose: photoPurpose,
            bgColor: backgroundColor
          };
          setImageHistory(prev => [newHistoryItem, ...prev]);
          setCurrentHistoryId(newHistoryItem.id);
          
          setGeneratedImage(processedImage);
          setErrorMessage(null); // Demo Mode 成功，不显示错误
          return;
        } catch (demoError) {
          console.error('Demo mode failed:', demoError);
          setErrorMessage('Failed to process image. Please try again.');
          return;
        }
      }
      
      // 其他类型的错误
      let errorMsg = 'Failed to generate image. ';
      
      if (error instanceof Error) {
        errorMsg += error.message;
      } else {
        errorMsg += 'Unknown error occurred';
      }
      
      setErrorMessage(errorMsg);
    } finally {
      setIsGenerating(false);
      // 成功生成后触发滚动辅助，展示可能出现的历史记录或操作按钮
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
                Product Visuals
              </h1>
              <p className="font-sans font-normal text-xs text-[#666] truncate">
                Clean, compelling images that sell.
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

                {/* 照片用途选项 - 2x2 网格 */}
                <div className="w-[70%] mx-auto">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-3.5 sm:gap-y-4 md:gap-y-4.5 w-full mx-auto justify-items-stretch">
                  {/* Official submission */}
                  <button
                    onClick={() => {
                      setPhotoPurpose('official');
                      setBackgroundColor('white'); // 默认选择白色
                      triggerScrollAssist();
                    }}
                    className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden transition-all group ${
                      photoPurpose === 'official' 
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
                      triggerScrollAssist();
                    }}
                    className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden transition-all group ${
                      photoPurpose === 'professional' 
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

                  {/* Studio portrait */}
                  <button
                    onClick={() => {
                      setPhotoPurpose('studio');
                      setBackgroundColor('grey');
                      triggerScrollAssist();
                    }}
                    className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden transition-all group md:-translate-y-1 ${
                      photoPurpose === 'studio' 
                        ? 'ring-[3px] ring-[#333] ring-offset-2 ring-offset-white shadow-lg' 
                        : 'hover:shadow-lg hover:scale-[1.02]'
                    }`}
                  >
                    <img 
                      src={imgImage1} 
                      alt="Studio portrait" 
                      className={`absolute inset-0 w-full h-[124.49%] max-w-none object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[1px] ${photoPurpose === 'studio' ? 'scale-[1.06]' : ''} translate-y-[-4px]`} 
                      style={{ top: '1.83%' }}
                    />
                    <div 
                      aria-hidden="true" 
                      className="absolute border-[2.5px] border-solid border-white inset-0 rounded-2xl pointer-events-none" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center px-4 text-center">
                      <p className="font-sans font-extrabold text-base text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        Studio Portrait
                      </p>
                      <p className="font-sans font-medium text-[11px] text-white/85 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        Soft light, calm companion vibe
                      </p>
                    </div>
                    {photoPurpose === 'studio' && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-[#333] rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>

                  {/* Outdoor portrait */}
                  <button
                    onClick={() => {
                      setPhotoPurpose('outdoor');
                      setBackgroundColor('blue');
                      triggerScrollAssist();
                    }}
                    className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden transition-all group md:-translate-y-1 ${
                      photoPurpose === 'outdoor' 
                        ? 'ring-[3px] ring-[#333] ring-offset-2 ring-offset-white shadow-lg' 
                        : 'hover:shadow-lg hover:scale-[1.02]'
                    }`}
                  >
                    <img 
                      src={imgImage2} 
                      alt="Outdoor portrait" 
                      className={`absolute inset-0 w-full h-[124.49%] max-w-none object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[1px] ${photoPurpose === 'outdoor' ? 'scale-[1.06]' : ''} translate-y-[-4px]`} 
                      style={{ top: '0.5%' }}
                    />
                    <div 
                      aria-hidden="true" 
                      className="absolute border-[2.5px] border-solid border-white inset-0 rounded-2xl pointer-events-none" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center px-4 text-center">
                      <p className="font-sans font-extrabold text-base text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        Outdoor Portrait
                      </p>
                      <p className="font-sans font-medium text-[11px] text-white/85 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        Natural light, playful energy
                      </p>
                    </div>
                    {photoPurpose === 'outdoor' && (
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
                      onClick={() => setBackgroundColor('none')}
                      className={`relative w-11 h-11 md:w-12 md:h-12 shrink-0 transition-all duration-300 rounded-full overflow-hidden ${
                        backgroundColor === 'none' 
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
                      onClick={() => setBackgroundColor(color)}
                      className={`relative w-11 h-11 md:w-12 md:h-12 shrink-0 transition-all duration-300 rounded-full overflow-hidden ${
                        backgroundColor === color 
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
                  <div className={`p-3 border rounded-xl ${
                    errorMessage.startsWith('Demo Mode') 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <p className={`font-sans font-normal text-xs whitespace-pre-line ${
                      errorMessage.startsWith('Demo Mode')
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
            <div className="w-full max-w-md flex flex-col gap-4 md:gap-5">
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

                {/* Download 按钮 */}
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
                          className={`relative flex-shrink-0 w-[72px] h-[96px] rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105 bg-[#fafafa] ${
                            currentHistoryId === item.id
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
                                <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                    // 验证配置
                    const isAzureService = apiUrl.includes('.cognitiveservices.azure.com') || apiUrl.includes('.openai.azure.com');
                    if (isAzureService && !deploymentId.trim()) {
                      setErrorMessage('Deployment Name is required for Azure services (e.g., gpt-image-1.5)');
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

      {/* 安全警告弹窗 */}
      <AnimatePresence>
        {showSafetyModal && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
            onClick={() => setShowSafetyModal(false)}
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
              <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#e5e5e5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-sans font-bold text-lg text-red-600">
                      Content Safety Alert
                    </h2>
                    <p className="font-sans font-normal text-xs text-[#666]">
                      Request blocked by safety system
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSafetyModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] active:bg-[#e5e5e5] transition-all flex items-center justify-center group"
                >
                  <X className="w-5 h-5 text-[#666] transition-transform group-hover:scale-110 group-hover:rotate-90" />
                </button>
              </div>

              {/* 弹窗内容 */}
              <div className="px-6 py-6 flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <p className="font-sans text-sm text-[#333] leading-relaxed">
                    {safetyErrorMessage}
                  </p>
                  
                  <div className="mt-2 p-4 bg-red-50 border border-red-100 rounded-xl">
                    <p className="font-sans font-semibold text-sm text-[#050505] mb-2">
                      💡 Tips:
                    </p>
                    <ul className="font-sans text-xs text-[#666] space-y-1.5 list-disc list-inside">
                      <li>Make sure your photo is a clear portrait</li>
                      <li>Avoid images with inappropriate content</li>
                      <li>Use professional-looking photos</li>
                      <li>Try a different image if this continues</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 弹窗底部按钮 */}
              <div className="flex items-center gap-3 px-6 py-4 bg-[#fafafa] border-t border-[#e5e5e5]">
                <button
                  onClick={() => setShowSafetyModal(false)}
                  className="flex-1 h-11 bg-[#050505] rounded-xl font-sans font-semibold text-sm text-white hover:bg-[#333] active:scale-[0.98] transition-all"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </div>
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