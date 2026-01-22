
import React, { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../../../services/supabase';
import { Check, X, Pencil, Copy } from 'lucide-react';

interface ReferenceAsset {
    id: string;
    key?: string;
    public_url: string;
    name: string;
    role?: string;
    adjustment_strength?: number;
}

interface ReferenceAssetCardProps {
    asset: ReferenceAsset;
    onRemove: () => void;
    onUpdate: (updates: Partial<ReferenceAsset>) => void;
}

export function ReferenceAssetCard({ asset, onRemove, onUpdate }: ReferenceAssetCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editKey, setEditKey] = useState(asset.key || '');
    const [editName, setEditName] = useState(asset.name || '');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!editKey.trim()) return;
        setSaving(true);
        try {
            const { error } = await supabase
                .from('reference_assets')
                .update({ key: editKey.trim(), name: editName.trim() })
                .eq('id', asset.id);

            if (error) throw error;

            onUpdate({ key: editKey.trim(), name: editName.trim() });
            setIsEditing(false);
            toast.success('Asset updated');
        } catch (e: any) {
            toast.error('Update failed: ' + e.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <div className="mb-2 px-1.5 py-1 bg-purple-50 rounded border border-purple-100 flex flex-col gap-1 group/key relative">
                {!isEditing ? (
                    <>
                        <div className="flex items-center justify-between">
                            <code className="text-[9px] text-purple-700 font-mono truncate max-w-[100px]" title={asset.key || 'No Key'}>
                                {asset.key || 'No Key'}
                            </code>
                            <div className="flex items-center gap-1 opacity-0 group-hover/key:opacity-100 transition">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(asset.key || '');
                                        toast.success('Key copied');
                                    }}
                                    className="text-purple-600 hover:text-purple-800"
                                    title="Copy Key"
                                >
                                    <Copy className="w-3 h-3" />
                                </button>
                                <button
                                    onClick={() => {
                                        setEditKey(asset.key || '');
                                        setEditName(asset.name || '');
                                        setIsEditing(true);
                                    }}
                                    className="text-purple-600 hover:text-purple-800"
                                    title="Edit Key/Name"
                                >
                                    <Pencil className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                        {/* Show Name Snippet */}
                        <div className="text-[8px] text-gray-400 truncate px-0.5" title={asset.name}>
                            {asset.name}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col gap-1 z-20 bg-white p-1 rounded shadow-sm border border-purple-200 absolute top-0 left-0 right-0">
                        <input
                            value={editKey}
                            onChange={(e) => setEditKey(e.target.value)}
                            className="text-[9px] border border-gray-200 rounded px-1 py-0.5 w-full font-mono mb-1"
                            placeholder="Key (e.g. official_ref_01)"
                            autoFocus
                        />
                        <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="text-[9px] border border-gray-200 rounded px-1 py-0.5 w-full mb-1"
                            placeholder="File Name"
                        />
                        <div className="flex justify-end gap-1">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="text-gray-400 hover:text-gray-600 text-[9px]"
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-purple-600 text-white px-2 py-0.5 rounded text-[9px] hover:bg-purple-700"
                                disabled={saving}
                            >
                                {saving ? '...' : 'Save'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
