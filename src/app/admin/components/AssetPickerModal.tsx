import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import { Upload, Trash2, Search, Image as ImageIcon, X, Check } from 'lucide-react';

interface Asset {
    id: string;
    name: string;
    public_url: string;
    storage_path: string;
    created_at: string;
}

interface AssetPickerModalProps {
    onClose: () => void;
    onSelect: (asset: Asset) => void;
}

export default function AssetPickerModal({ onClose, onSelect }: AssetPickerModalProps) {
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

        setUploading(true);
        const newAssets: Asset[] = [];
        const files = Array.from(e.target.files);

        try {
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `references/${fileName}`;

                // 1. Upload to Storage
                const { error: uploadError } = await supabase.storage
                    .from('admin-assets')
                    .upload(filePath, file);

                if (uploadError) {
                    console.error(`Failed to upload ${file.name}:`, uploadError);
                    continue; // Skip this file but try others
                }

                // 2. Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('admin-assets')
                    .getPublicUrl(filePath);

                // 3. Insert to DB
                const { data, error: dbError } = await supabase
                    .from('reference_assets')
                    .insert({
                        name: file.name,
                        storage_path: filePath,
                        public_url: publicUrl,
                        tags_json: []
                    })
                    .select()
                    .single();

                if (dbError) {
                    console.error(`Failed to save db record for ${file.name}:`, dbError);
                } else if (data) {
                    newAssets.push(data);
                }
            }

            setAssets(prev => [...newAssets, ...prev]);

            if (newAssets.length < files.length) {
                alert(`Uploaded ${newAssets.length} of ${files.length} images.`);
            }
        } catch (error: any) {
            console.error('Upload process error:', error);
            alert('Upload process error: ' + error.message);
        } finally {
            setUploading(false);
            // Reset input value to allow re-uploading same files if needed
            e.target.value = '';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Select Reference Asset</h3>
                        <p className="text-xs text-gray-500">Pick an image to link to this variant.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                    <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        <input
                            type="text"
                            placeholder="Search assets..."
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none w-64"
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            id="modal-asset-upload"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleFileUpload}
                            disabled={uploading}
                        />
                        <label
                            htmlFor="modal-asset-upload"
                            className={`flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition cursor-pointer text-sm ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {uploading ? (
                                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Upload className="w-4 h-4" />
                            )}
                            {uploading ? 'Uploading...' : 'Upload New'}
                        </label>
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {loading ? (
                        <div className="flex justify-center py-12">Loading assets...</div>
                    ) : assets.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>No assets found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {assets.map((asset) => (
                                <button
                                    key={asset.id}
                                    onClick={() => onSelect(asset)}
                                    className="group relative aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all text-left"
                                >
                                    <img
                                        src={asset.public_url}
                                        alt={asset.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                                        <p className="text-white text-xs truncate font-medium">{asset.name}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
