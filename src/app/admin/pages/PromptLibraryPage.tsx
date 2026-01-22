import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../../services/supabase';
import { Save, Plus, ChevronRight, Layers, Image as ImageIcon, Box, GripVertical, Pencil, Check, X, Trash, Copy } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { toast } from 'sonner';
import AssetPickerModal from '../components/AssetPickerModal';
import { ReferenceAssetCard } from '../components/ReferenceAssetCard';

// Types
interface Feature {
    id: string;
    key: string;
    name: string;
    section: string;
}

interface Variant {
    id: string;
    feature_id: string;
    key: string;
    name: string;
}

interface PromptConfig {
    id?: string;
    prompt_template: string;
    negative_prompt: string;
    params_json: any;
    version: number;
}

interface ReferenceAsset {
    id: string;
    key?: string; // Semantic key for code referencing
    public_url: string;
    name: string;
    role?: string;
    adjustment_strength?: number;
}

export default function PromptLibraryPage() {
    // State
    const [features, setFeatures] = useState<Feature[]>([]);
    const [variants, setVariants] = useState<Variant[]>([]);

    const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

    const [promptConfig, setPromptConfig] = useState<PromptConfig>({
        prompt_template: '',
        negative_prompt: '',
        params_json: {},
        version: 1,
    });

    const [linkedAssets, setLinkedAssets] = useState<ReferenceAsset[]>([]);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showAssetPicker, setShowAssetPicker] = useState(false);

    // Initial Load
    useEffect(() => {
        loadFeatures();
    }, []);

    // Load Variants when Feature Selected
    useEffect(() => {
        if (selectedFeatureId) {
            loadVariants(selectedFeatureId);
        } else {
            setVariants([]);
        }
    }, [selectedFeatureId]);

    // Load Config when Variant Selected
    useEffect(() => {
        if (selectedVariant) {
            loadVariantConfig(selectedVariant.id);
        }
    }, [selectedVariant]);

    async function loadFeatures() {
        const { data } = await supabase.from('features').select('*').order('section').order('sort_order');
        if (data) setFeatures(data);
    }

    async function loadVariants(featureId: string) {
        const { data } = await supabase.from('variants').select('*').eq('feature_id', featureId).order('sort_order');
        if (data) setVariants(data);
    }

    async function loadVariantConfig(variantId: string) {
        setLoading(true);
        try {
            // 1. Get Prompt
            const { data: prompt } = await supabase
                .from('prompts')
                .select('*')
                .eq('variant_id', variantId)
                .eq('is_active', true)
                .order('version', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (prompt) {
                setPromptConfig(prompt);
            } else {
                setPromptConfig({
                    prompt_template: '',
                    negative_prompt: '',
                    params_json: {},
                    version: 0
                });
            }

            // 2. Get References
            const { data: refMaps } = await supabase
                .from('variant_reference_map')
                .select('reference_assets(id, key, public_url, name), role, adjustment_strength')
                .eq('variant_id', variantId);

            if (refMaps) {
                const assets = refMaps.map((r: any) => ({
                    ...r.reference_assets,
                    role: r.role,
                    adjustment_strength: r.adjustment_strength
                }));
                setLinkedAssets(assets);
            } else {
                setLinkedAssets([]);
            }

        } finally {
            setLoading(false);
        }
    }

    // DnD Handlers
    const moveVariant = (dragIndex: number, hoverIndex: number) => {
        const dragVariant = variants[dragIndex];
        const newVariants = [...variants];
        newVariants.splice(dragIndex, 1);
        newVariants.splice(hoverIndex, 0, dragVariant);
        setVariants(newVariants);
    };

    // Rename Logic
    const [editingVariantId, setEditingVariantId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');

    const startRenaming = (v: Variant) => {
        setEditingVariantId(v.id);
        setEditingName(v.name);
    };

    const cancelRenaming = () => {
        setEditingVariantId(null);
        setEditingName('');
    };

    const saveRename = async () => {
        if (!editingVariantId || !editingName.trim()) return;

        const oldName = variants.find(v => v.id === editingVariantId)?.name;
        if (editingName === oldName) {
            cancelRenaming();
            return;
        }

        try {
            const { error } = await supabase
                .from('variants')
                .update({ name: editingName })
                .eq('id', editingVariantId);

            if (error) throw error;

            setVariants(variants.map(v => v.id === editingVariantId ? { ...v, name: editingName } : v));
            if (selectedVariant?.id === editingVariantId) {
                setSelectedVariant({ ...selectedVariant, name: editingName });
            }

            toast.success('Renamed successfully');
            cancelRenaming();
        } catch (e: any) {
            toast.error('Rename failed: ' + e.message);
        }
    };

    const deleteVariant = async (v: Variant) => {
        if (!confirm(`Are you sure you want to delete variant "${v.name}"?\nThis cannot be undone.`)) return;

        try {
            const { error } = await supabase.from('variants').delete().eq('id', v.id);
            if (error) throw error;

            const newVariants = variants.filter(item => item.id !== v.id);
            setVariants(newVariants);

            if (selectedVariant?.id === v.id) {
                setSelectedVariant(null);
            }
            toast.success('Variant deleted');
        } catch (e: any) {
            toast.error('Delete failed: ' + e.message);
        }
    };

    const saveVariantOrder = async () => {
        // Update sort_order for all variants in the list
        // We must include all required fields for upsert (INSERT ... ON CONFLICT) to work
        // or use individual UPDATEs. Since we have all data in 'variants', we can just
        // map the full objects with updated sort_order.
        const updates = variants.map((v, index) => ({
            ...v,
            sort_order: index + 1
        }));

        try {
            const { error } = await supabase.from('variants').upsert(updates);
            if (error) throw error;
        } catch (err: any) {
            console.error('Error saving order', err);
            toast.error('Failed to save order');
        }
    };

    const handleSave = async () => {
        if (!selectedVariant) return;
        setSaving(true);
        try {
            // 1. Create New Prompt Version
            const nextVersion = (promptConfig.version || 0) + 1;
            const { error: promptError } = await supabase.from('prompts').insert({
                variant_id: selectedVariant.id,
                prompt_template: promptConfig.prompt_template,
                negative_prompt: promptConfig.negative_prompt,
                params_json: promptConfig.params_json,
                version: nextVersion,
                is_active: true
            });

            if (promptError) throw promptError;

            // 2. Update References (Full Replace Logic or differential?)
            // For simplicity: Delete old maps, insert new maps? 
            // Better: Since maps are M2M, and `variant_reference_map` doesn't strictly have versions (it's per variant), 
            // we should update it. Note: If we want versioned references, they should link to prompt_id, not variant_id.
            // Requirement says "Reference Assets... associated to prompt/scene".
            // Our schema links `variant_reference_map` to `variant`.
            // So we update the current state.

            // Delete existing
            await supabase.from('variant_reference_map').delete().eq('variant_id', selectedVariant.id);

            // Insert new
            if (linkedAssets.length > 0) {
                const toInsert = linkedAssets.map(a => ({
                    variant_id: selectedVariant.id,
                    reference_asset_id: a.id,
                    role: a.role || 'style',
                    adjustment_strength: a.adjustment_strength !== undefined ? a.adjustment_strength : 0.6
                }));
                await supabase.from('variant_reference_map').insert(toInsert);
            }

            toast.success(`Saved Version ${nextVersion}`, {
                style: { backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' }
            });

            // Refresh
            loadVariantConfig(selectedVariant.id);

        } catch (e: any) {
            toast.error('Error: ' + e.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Sidebar */}
            <div className="w-1/4 border-r border-gray-100 flex flex-col bg-gray-50">
                <div className="p-4 border-b border-gray-100 font-medium text-gray-700">
                    Features
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {features.map(f => (
                        <div key={f.id}>
                            <button
                                onClick={() => setSelectedFeatureId(f.id)}
                                className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center justify-between ${selectedFeatureId === f.id ? 'bg-white shadow-sm text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <span className="flex items-center gap-2">
                                    <Box className="w-3.5 h-3.5" />
                                    {f.name}
                                </span>
                                {selectedFeatureId === f.id && <ChevronRight className="w-3 h-3" />}
                            </button>

                            {selectedFeatureId === f.id && (
                                <div className="ml-4 mt-1 pl-2 border-l border-gray-200 space-y-1">
                                    {variants.map((v, index) => (
                                        <SortableVariant
                                            key={v.id}
                                            variant={v}
                                            index={index}
                                            isSelected={selectedVariant?.id === v.id}
                                            onClick={() => setSelectedVariant(v)}
                                            moveVariant={moveVariant}
                                            onDrop={saveVariantOrder}

                                            // Rename props
                                            isEditing={editingVariantId === v.id}
                                            editingName={editingName}
                                            onEditChange={setEditingName}
                                            onStartEdit={() => startRenaming(v)}
                                            onCancelEdit={cancelRenaming}
                                            onSaveEdit={saveRename}

                                            // Delete prop
                                            onDelete={() => deleteVariant(v)}
                                        />
                                    ))}

                                    {/* Add Variant Button */}
                                    <button
                                        onClick={async () => {
                                            const name = prompt('New Variant Name (e.g. Official Submission):');
                                            if (!name) return;
                                            const key = prompt('New Variant Key (e.g. official_submission):');
                                            if (!key) return;

                                            try {
                                                const { error } = await supabase.from('variants').insert({
                                                    feature_id: f.id,
                                                    name,
                                                    key: key.toLowerCase().replace(/\s+/g, '_'),
                                                    sort_order: variants.length + 1
                                                });
                                                if (error) throw error;
                                                loadVariants(f.id); // Refresh
                                            } catch (err: any) {
                                                toast.error('Error creating variant: ' + err.message);
                                            }
                                        }}
                                        className="w-full text-left px-3 py-1.5 text-xs rounded-md text-purple-600 hover:bg-purple-50 flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Add Variant
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Editor */}
            <div className="flex-1 flex flex-col h-full bg-white relative">
                {!selectedVariant ? (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        <p>Select a variant to edit prompt.</p>
                    </div>
                ) : (
                    <>
                        {/* Toolbar */}
                        <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-white">
                            <div>
                                <h2 className="font-semibold text-gray-800">{selectedVariant.name}</h2>
                                <p className="text-xs text-gray-500">v{promptConfig.version} • {selectedVariant.key}</p>
                            </div>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition shadow-lg shadow-gray-200"
                            >
                                <Save className="w-4 h-4" />
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>

                        {/* Editor Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            {/* Prompt Section */}
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <Layers className="w-4 h-4 text-purple-600" />
                                    <h3 className="text-sm font-semibold text-gray-800">Prompt Template</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 mb-1 block">Positive Prompt (Handlebars supported)</label>
                                        <textarea
                                            value={promptConfig.prompt_template}
                                            onChange={e => setPromptConfig({ ...promptConfig, prompt_template: e.target.value })}
                                            className="w-full h-32 p-3 text-sm font-mono border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none bg-gray-50/50"
                                            placeholder="A photo of {{product_name}}, high quality..."
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 mb-1 block">Negative Prompt</label>
                                        <textarea
                                            value={promptConfig.negative_prompt || ''}
                                            onChange={e => setPromptConfig({ ...promptConfig, negative_prompt: e.target.value })}
                                            className="w-full h-20 p-3 text-sm font-mono border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none bg-gray-50/50"
                                            placeholder="low quality, blurry..."
                                        />
                                    </div>

                                    {/* Parameter Overrides */}
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 mb-1 block flex justify-between">
                                                <span>Image Strength (Denoising)</span>
                                                <span className="text-gray-400">{promptConfig.params_json?.strength || 0.35}</span>
                                            </label>
                                            <input
                                                type="range"
                                                min="0.1" max="1.0" step="0.05"
                                                value={promptConfig.params_json?.strength || 0.35}
                                                onChange={e => setPromptConfig({
                                                    ...promptConfig,
                                                    params_json: { ...promptConfig.params_json, strength: parseFloat(e.target.value) }
                                                })}
                                                className="w-full accent-purple-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            />
                                            <p className="text-[10px] text-gray-400 mt-1">
                                                Lower = Closer to original. Higher = More creative.
                                            </p>
                                        </div>
                                    </div>


                                </div>
                            </section>

                            {/* References Section */}
                            <section>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4 text-purple-600" />
                                        <h3 className="text-sm font-semibold text-gray-800">Reference Assets</h3>
                                    </div>
                                    <button
                                        className="text-xs text-purple-600 hover:underline"
                                        onClick={() => setShowAssetPicker(true)}
                                    >
                                        + Link Asset
                                    </button>
                                </div>

                                {linkedAssets.length === 0 ? (
                                    <div className="p-4 border border-dashed border-gray-200 rounded-lg text-center text-xs text-gray-400">
                                        No linked references
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-4 gap-4">
                                        {linkedAssets.map((asset, i) => (
                                            <div key={i} className="bg-white rounded-lg overflow-hidden group border border-gray-200 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                                                {/* Image Area - Fixed height, contain fit */}
                                                <div className="relative h-48 bg-gray-100 border-b border-gray-100">
                                                    <img
                                                        src={asset.public_url}
                                                        className="w-full h-full object-contain p-2"
                                                        alt={asset.name}
                                                    />
                                                    <button
                                                        onClick={() => setLinkedAssets(linkedAssets.filter((_, idx) => idx !== i))}
                                                        className="absolute top-1 right-1 bg-white/90 text-red-500 hover:text-red-700 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm border border-gray-200 z-10"
                                                        title="Remove Asset"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                {/* Asset Controls - Natural height */}
                                                <div className="p-3 bg-white flex flex-col gap-3">
                                                    <ReferenceAssetCard
                                                        asset={asset}
                                                        onRemove={() => setLinkedAssets(linkedAssets.filter((_, idx) => idx !== i))}
                                                        onUpdate={(updated) => {
                                                            const newAssets = [...linkedAssets];
                                                            newAssets[i] = { ...asset, ...updated };
                                                            setLinkedAssets(newAssets);
                                                        }}
                                                    />

                                                    <div>
                                                        <div className="flex justify-between items-center mb-1.5">
                                                            <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                                                Strength
                                                            </label>
                                                            <span className="text-[10px] font-mono text-gray-600">
                                                                {asset.adjustment_strength || 0.6}
                                                            </span>
                                                        </div>
                                                        <input
                                                            type="range"
                                                            min="0" max="2.0" step="0.1"
                                                            value={asset.adjustment_strength !== undefined ? asset.adjustment_strength : 0.6}
                                                            onChange={(e) => {
                                                                const val = parseFloat(e.target.value);
                                                                const newAssets = [...linkedAssets];
                                                                newAssets[i] = { ...newAssets[i], adjustment_strength: val };
                                                                setLinkedAssets(newAssets);
                                                            }}
                                                            className="w-full accent-purple-600 h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer block hover:bg-gray-200 transition-colors"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* Params Section */}


                        </div>
                    </>
                )}
            </div>

            {loading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                    <span className="text-sm font-medium text-purple-600">Loading...</span>
                </div>
            )}

            {showAssetPicker && (
                <AssetPickerModal
                    onClose={() => setShowAssetPicker(false)}
                    onSelect={(asset) => {
                        // Check if already linked
                        if (linkedAssets.find(a => a.id === asset.id)) {
                            toast.warning('Asset already linked');
                            return;
                        }
                        setLinkedAssets([...linkedAssets, {
                            id: asset.id,
                            public_url: asset.public_url,
                            name: asset.name,
                            role: 'style' // default role
                        }]);
                        setShowAssetPicker(false);
                    }}
                />
            )}
        </div>
    );
}

const ItemType = 'VARIANT';

interface SortableVariantProps {
    variant: Variant;
    index: number;
    isSelected: boolean;
    onClick: () => void;
    moveVariant: (dragIndex: number, hoverIndex: number) => void;
    onDrop: () => void;

    // Edit Props
    isEditing: boolean;
    editingName: string;
    onEditChange: (val: string) => void;
    onStartEdit: () => void;
    onCancelEdit: () => void;
    onSaveEdit: () => void;

    // Delete
    onDelete: () => void;
}

function SortableVariant({
    variant, index, isSelected, onClick, moveVariant, onDrop,
    isEditing, editingName, onEditChange, onStartEdit, onCancelEdit, onSaveEdit, onDelete
}: SortableVariantProps) {
    const ref = React.useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<
        { index: number; id: string; type: string },
        void,
        { handlerId: string | symbol | null }
    >({
        accept: ItemType,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: { index: number; id: string; type: string }, monitor) {
            if (!ref.current) {
                return
            }
            // Disable reordering if this item is being edited
            if (isEditing) {
                return;
            }

            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            moveVariant(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
        drop() {
            onDrop();
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        canDrag: !isEditing, // Disable dragging if editing
        item: () => {
            return { id: variant.id, index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref))

    const opacity = isDragging ? 0 : 1;

    // Handle Edit Mode
    if (isEditing) {
        return (
            <div
                ref={ref}
                style={{ opacity }}
                data-handler-id={handlerId}
                className={`w-full px-3 py-1.5 rounded-md flex items-center gap-2 bg-purple-50 border border-purple-200`}
            >
                <GripVertical className="w-3 h-3 text-purple-300" />
                <input
                    autoFocus
                    value={editingName}
                    onChange={e => onEditChange(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') onSaveEdit();
                        if (e.key === 'Escape') onCancelEdit();
                    }}
                    className="flex-1 min-w-0 bg-white border border-purple-300 rounded px-1.5 py-0.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button onMouseDown={onSaveEdit} className="text-green-600 hover:bg-green-100 p-1 rounded">
                    <Check className="w-3 h-3" />
                </button>
                <button onMouseDown={onCancelEdit} className="text-red-500 hover:bg-red-100 p-1 rounded">
                    <X className="w-3 h-3" />
                </button>
            </div>
        )
    }

    return (
        <div
            ref={ref}
            data-handler-id={handlerId}
            style={{ opacity }}
            onClick={onClick}
            className={`cursor-pointer w-full text-left px-3 py-1.5 text-xs rounded-md flex items-center gap-2 group ${isSelected ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-500 hover:bg-gray-100'}`}
        >
            <GripVertical className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 cursor-grab" />
            <span className="truncate flex-1">{variant.name}</span>

            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onStartEdit();
                    }}
                    className={`p-1 hover:bg-purple-200 rounded text-purple-600 mr-1`}
                    title="Rename Variant"
                >
                    <Pencil className="w-3 h-3" />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className={`p-1 hover:bg-red-100 rounded text-red-500`}
                    title="Delete Variant"
                >
                    <Trash className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}
