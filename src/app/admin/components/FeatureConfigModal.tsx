import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import { X, Save, Plus, Trash, Image as ImageIcon } from 'lucide-react';

interface FeatureConfigModalProps {
    feature: { key: string; name: string };
    onClose: () => void;
}

interface Configuration {
    id?: string;
    feature_key: string;
    variant_key: string;
    prompt_template: string;
    negative_prompt?: string;
    config_json: any;
    reference_image_urls: string[];
    version: number;
    is_active: boolean;
}

export default function FeatureConfigModal({ feature, onClose }: FeatureConfigModalProps) {
    const [config, setConfig] = useState<Configuration>({
        feature_key: feature.key,
        variant_key: 'default',
        prompt_template: '',
        config_json: {},
        reference_image_urls: [],
        version: 1,
        is_active: true
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'prompt' | 'params' | 'refs'>('prompt');
    const [jsonError, setJsonError] = useState<string | null>(null);

    useEffect(() => {
        fetchConfig();
    }, [feature.key]);

    async function fetchConfig() {
        try {
            setLoading(true);
            // Fetch the latest active configuration
            const { data, error } = await supabase
                .from('configurations')
                .select('*')
                .eq('feature_key', feature.key)
                .eq('is_active', true)
                .order('version', { ascending: false })
                .limit(1)
                .single();

            if (data) {
                setConfig(data);
            } else {
                // Init with defaults if not found
                setConfig(prev => ({ ...prev, feature_key: feature.key }));
            }
        } catch (err) {
            console.log('No existing config found, starting fresh.');
        } finally {
            setLoading(false);
        }
    }

    const handleSave = async () => {
        try {
            setSaving(true);

            // 1. Get current max version
            const { data: maxVerData } = await supabase
                .from('configurations')
                .select('version')
                .eq('feature_key', feature.key)
                .order('version', { ascending: false })
                .limit(1)
                .single();

            const nextVersion = (maxVerData?.version || 0) + 1;

            // 2. Insert new config
            const newConfig = {
                ...config,
                id: undefined, // Let DB generate ID
                created_at: undefined,
                version: nextVersion,
                is_active: true
            };

            const { error } = await supabase
                .from('configurations')
                .insert(newConfig);

            if (error) throw error;

            // 3. Optional: Set previous active configs to inactive? 
            // Current Edge Function logic selects "order by version desc limit 1", so strictly speaking we don't need to disable old ones, 
            // but it keeps it clean.
            await supabase
                .from('configurations')
                .update({ is_active: false })
                .eq('feature_key', feature.key)
                .lt('version', nextVersion);

            alert('Configuration saved successfully! Version ' + nextVersion);
            onClose();
        } catch (err: any) {
            alert('Error saving config: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const updateRefImage = (index: number, val: string) => {
        const newRefs = [...config.reference_image_urls];
        newRefs[index] = val;
        setConfig({ ...config, reference_image_urls: newRefs });
    };

    const removeRefImage = (index: number) => {
        const newRefs = config.reference_image_urls.filter((_, i) => i !== index);
        setConfig({ ...config, reference_image_urls: newRefs });
    };

    const addRefImage = () => {
        setConfig({ ...config, reference_image_urls: [...config.reference_image_urls, ''] });
    };

    const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        try {
            const parsed = JSON.parse(val);
            setConfig({ ...config, config_json: parsed });
            setJsonError(null);
        } catch (err) {
            setJsonError("Invalid JSON");
            // We still iterate the state config_json? No, better to keep a local string state for editing
            // But for simplicity let's just assume valid JSON or just store as string until save?
            // Actually, let's just edit it as string
        }
    };

    const [jsonString, setJsonString] = useState("{}");
    useEffect(() => {
        if (config.config_json) setJsonString(JSON.stringify(config.config_json, null, 2));
    }, [config.config_json]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Configure: {feature.name}</h3>
                        <p className="text-xs text-gray-500 font-mono">{feature.key} • v{config.version}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 px-6">
                    <button
                        onClick={() => setActiveTab('prompt')}
                        className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'prompt' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Prompts
                    </button>
                    <button
                        onClick={() => setActiveTab('refs')}
                        className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'refs' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Reference Images
                    </button>

                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-white">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">Loading configuration...</div>
                    ) : (
                        <div className="space-y-6">
                            {/* PROMPTS TAB */}
                            {activeTab === 'prompt' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Prompt Template</label>
                                        <p className="text-xs text-gray-400 mb-2">Use {'{{variable}}'} for dynamic replacements.</p>
                                        <textarea
                                            value={config.prompt_template || ''}
                                            onChange={(e) => setConfig({ ...config, prompt_template: e.target.value })}
                                            className="w-full h-40 p-3 border border-gray-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                                            placeholder="Enter prompt template..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Negative Prompt</label>
                                        <textarea
                                            value={config.negative_prompt || ''}
                                            onChange={(e) => setConfig({ ...config, negative_prompt: e.target.value })}
                                            className="w-full h-20 p-3 border border-gray-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                                            placeholder="Enter negative prompt..."
                                        />
                                    </div>
                                </div>
                            )}

                            {/* REFS TAB */}
                            {activeTab === 'refs' && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium text-gray-700">Reference Images</label>
                                        <button onClick={addRefImage} className="text-xs flex items-center gap-1 text-purple-600 font-medium hover:underline">
                                            <Plus className="w-3 h-3" /> Add Image
                                        </button>
                                    </div>

                                    {config.reference_image_urls.length === 0 && (
                                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                            <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                            <p className="text-sm text-gray-500">No reference images.</p>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        {config.reference_image_urls.map((url, idx) => (
                                            <div key={idx} className="flex gap-3 items-start">
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 border border-gray-200 overflow-hidden">
                                                    {url ? <img src={url} alt="Ref" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon className="w-6 h-6" /></div>}
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        value={url}
                                                        onChange={(e) => updateRefImage(idx, e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                                <button onClick={() => removeRefImage(idx)} className="p-2 text-gray-400 hover:text-red-500 transition">
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}


                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || !!jsonError}
                        className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition shadow-lg shadow-gray-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save Configuration'}
                    </button>
                </div>
            </div>
        </div>
    );
}
