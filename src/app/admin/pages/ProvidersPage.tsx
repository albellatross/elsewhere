
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import { Save, Eye, EyeOff, Plus, Trash2, Key } from 'lucide-react';

interface ProviderConfig {
    provider_name: string;
    api_key: string;
    base_url?: string;
    is_active: boolean;
    model_id?: string;
}

export default function ProvidersPage() {
    const [providers, setProviders] = useState<ProviderConfig[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

    useEffect(() => {
        fetchProviders();
    }, []);

    async function fetchProviders() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('provider_configs')
                .select('*')
                .order('provider_name');

            if (error) {
                console.error('Error fetching providers:', error);
            } else {
                setProviders(data || []);
            }
        } finally {
            setLoading(false);
        }
    }

    const handleUpdate = async (provider: ProviderConfig) => {
        try {
            setSaving(true);
            const { error } = await supabase
                .from('provider_configs')
                .upsert({
                    provider_name: provider.provider_name,
                    api_key: provider.api_key,
                    base_url: provider.base_url,
                    is_active: provider.is_active,
                    model_id: provider.model_id
                });

            if (error) throw error;
            alert('Provider settings saved successfully!');
        } catch (err: any) {
            alert('Error saving provider: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const toggleShowKey = (name: string) => {
        setShowKeys(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const handleChange = (name: string, field: keyof ProviderConfig, value: any) => {
        setProviders(prev => prev.map(p =>
            p.provider_name === name ? { ...p, [field]: value } : p
        ));
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Provider Settings</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm">
                    <Plus className="w-4 h-4" />
                    Add Provider
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading providers...</div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {providers.map((provider) => (
                        <div key={provider.provider_name} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold border ${provider.is_active ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                                        {provider.provider_name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-lg">{provider.provider_name}</h4>
                                        <p className="text-sm text-gray-500">
                                            Status: <span className={provider.is_active ? "text-green-600 font-medium" : "text-gray-400"}>{provider.is_active ? 'Active' : 'Inactive'}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Toggle Active Switch */}
                                    <button
                                        onClick={() => handleChange(provider.provider_name, 'is_active', !provider.is_active)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${provider.is_active ? 'bg-purple-600' : 'bg-gray-200'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${provider.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">API Key</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Key className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type={showKeys[provider.provider_name] ? "text" : "password"}
                                            value={provider.api_key}
                                            onChange={(e) => handleChange(provider.provider_name, 'api_key', e.target.value)}
                                            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-mono text-gray-800"
                                            placeholder="sk-..."
                                        />
                                        <button
                                            onClick={() => toggleShowKey(provider.provider_name)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showKeys[provider.provider_name] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Model ID</label>
                                    <input
                                        type="text"
                                        value={provider.model_id || ''}
                                        onChange={(e) => handleChange(provider.provider_name, 'model_id', e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        placeholder="e.g. dall-e-3"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Base URL (Optional)</label>
                                    <input
                                        type="text"
                                        value={provider.base_url || ''}
                                        onChange={(e) => handleChange(provider.provider_name, 'base_url', e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        placeholder="https://api.openai.com/v1"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleUpdate(provider)}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 active:bg-purple-800 transition shadow-sm hover:shadow text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-4 h-4" />
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    ))}

                    {providers.length === 0 && (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No providers configured yet.</p>
                            <button className="mt-4 text-purple-600 font-medium hover:underline" onClick={() => {/* Add default providers logic if needed */ }}>
                                Initialize Defaults
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
