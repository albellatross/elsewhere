
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import { Edit2, Plus } from 'lucide-react';
import FeatureConfigModal from '../components/FeatureConfigModal';

interface Feature {
    id: string; // Added id field
    key: string;
    section: string;
    name: string;
    description: string;
    is_active: boolean;
}

export default function FeaturesPage() {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeatures();
    }, []);

    async function fetchFeatures() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('features')
                .select('*')
                .order('section');

            if (error) {
                console.error('Error fetching features:', error);
                alert('Error fetching features: ' + error.message);
            } else {
                setFeatures(data || []);
            }
        } finally {
            setLoading(false);
        }
    }

    const handleToggleStatus = async (feature: Feature) => {
        try {
            const { error } = await supabase
                .from('features')
                .update({ is_active: !feature.is_active })
                .eq('key', feature.key);

            if (error) throw error;

            // Optimistic update
            setFeatures(features.map(f =>
                f.key === feature.key ? { ...f, is_active: !f.is_active } : f
            ));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newFeature, setNewFeature] = useState({ name: '', key: '', section: 'Create', description: '' });

    const handleCreateFeature = async () => {
        if (!newFeature.name || !newFeature.key) {
            alert('Name and Key are required');
            return;
        }

        try {
            const { error } = await supabase.from('features').insert({
                name: newFeature.name,
                key: newFeature.key.toLowerCase().replace(/\s+/g, '_'),
                section: newFeature.section,
                description: newFeature.description,
                is_active: true
            });

            if (error) throw error;

            setShowCreateModal(false);
            setNewFeature({ name: '', key: '', section: 'Create', description: '' });
            fetchFeatures(); // Refresh list
        } catch (err: any) {
            alert('Error creating feature: ' + err.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Feature Management</h3>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                    <Plus className="w-4 h-4" />
                    Add Feature
                </button>
            </div>

            {/* Create Feature Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Feature</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Feature Name</label>
                                <input
                                    type="text"
                                    value={newFeature.name}
                                    onChange={e => setNewFeature({ ...newFeature, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="e.g. ID Photo"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Feature Key (Unique)</label>
                                <input
                                    type="text"
                                    value={newFeature.key}
                                    onChange={e => setNewFeature({ ...newFeature, key: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="e.g. id_photo"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                                <select
                                    value={newFeature.section}
                                    onChange={e => setNewFeature({ ...newFeature, section: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                                >
                                    <option value="Create">Create</option>
                                    <option value="Templates">Templates</option>
                                    <option value="Tools">Tools</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={newFeature.description}
                                    onChange={e => setNewFeature({ ...newFeature, description: e.target.value })}
                                    className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                                    placeholder="Brief description..."
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateFeature}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
                            >
                                Create Feature
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-900 font-medium">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Section</th>
                            <th className="px-6 py-4">Key</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {features.map((feature) => (
                            <tr key={feature.key} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{feature.name}</div>
                                    <div className="text-xs text-gray-500">{feature.description}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {feature.section}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-gray-500">{feature.key}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleToggleStatus(feature)}
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${feature.is_active
                                            ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                                            }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${feature.is_active ? 'bg-green-600' : 'bg-gray-400'}`} />
                                        {feature.is_active ? 'Active' : 'Disabled'}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => setSelectedFeature(feature)}
                                        className="text-gray-400 hover:text-purple-600 transition p-1 hover:bg-purple-50 rounded-md"
                                        title="Configure Feature"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {features.length === 0 && !loading && (
                            <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">No features found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedFeature && (
                <FeatureConfigModal
                    feature={selectedFeature}
                    onClose={() => setSelectedFeature(null)}
                />
            )}
        </div>
    );
}
