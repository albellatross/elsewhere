import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import { Upload, Trash2, Search, Image as ImageIcon } from 'lucide-react';

interface Asset {
    id: string;
    name: string;
    public_url: string;
    storage_path: string;
    tags_json: string[];
    created_at: string;
}

export default function AssetsPage() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchAssets();
    }, []);

    async function fetchAssets() {
        setLoading(true);
        const { data, error } = await supabase
            .from('reference_assets')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setAssets(data);
        }
        setLoading(false);
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        try {
            setUploading(true);
            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `references/${fileName}`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('admin-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('admin-assets')
                .getPublicUrl(filePath);

            // 3. Insert to DB
            const { error: dbError } = await supabase
                .from('reference_assets')
                .insert({
                    name: file.name,
                    storage_path: filePath,
                    public_url: publicUrl,
                    tags_json: []
                });

            if (dbError) throw dbError;

            await fetchAssets();
        } catch (error: any) {
            console.error('Upload failed:', error);
            alert('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string, path: string) => {
        if (!confirm('Are you sure? This might break variants using this asset.')) return;

        try {
            // Delete from DB first
            const { error } = await supabase.from('reference_assets').delete().eq('id', id);
            if (error) throw error;

            // Delete from Storage
            await supabase.storage.from('admin-assets').remove([path]);

            setAssets(assets.filter(a => a.id !== id));
        } catch (error: any) {
            alert('Delete failed: ' + error.message);
        }
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">Reference Assets</h3>
                    <p className="text-sm text-gray-500">Manage reference images for style transfer and controls.</p>
                </div>
                <div>
                    <input
                        type="file"
                        id="asset-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                    />
                    <label
                        htmlFor="asset-upload"
                        className={`flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {uploading ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Upload className="w-4 h-4" />
                        )}
                        {uploading ? 'Uploading...' : 'Upload Asset'}
                    </label>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-gray-200 p-6">
                {loading ? (
                    <div className="flex justify-center py-12">Loading...</div>
                ) : assets.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No assets found. Upload one to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {assets.map((asset) => (
                            <div key={asset.id} className="group relative aspect-square bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                                <img
                                    src={asset.public_url}
                                    alt={asset.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                    <p className="text-white text-xs truncate mb-2">{asset.name}</p>
                                    <button
                                        onClick={() => handleDelete(asset.id, asset.storage_path)}
                                        className="self-end p-1.5 bg-red-500/80 text-white rounded hover:bg-red-600 transition"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
