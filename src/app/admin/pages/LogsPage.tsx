
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import { Clock, CheckCircle, XCircle, Search } from 'lucide-react';

interface Log {
    id: string;
    feature_key: string;
    provider_name?: string;
    status: string;
    created_at: string;
    metadata?: any;
    error_message?: string;
    duration_ms?: number;
}

export default function LogsPage() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLogs();

        // Real-time subscription
        const subscription = supabase
            .channel('logs_changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'generation_logs' }, payload => {
                setLogs(prev => [payload.new as Log, ...prev]);
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    async function fetchLogs() {
        try {
            const { data, error } = await supabase
                .from('generation_logs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) throw error;
            setLogs(data || []);
        } catch (err) {
            console.error('Error fetching logs:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Generation Logs</h3>
                <button onClick={() => fetchLogs()} className="text-sm text-gray-500 hover:text-gray-900">
                    Refresh
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading logs...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-900 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Time</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Feature</th>
                                    <th className="px-6 py-4">Provider</th>
                                    <th className="px-6 py-4">Duration</th>
                                    <th className="px-6 py-4">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {new Date(log.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {log.status === 'success' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                                    <CheckCircle className="w-3 h-3" /> Success
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200" title={log.error_message}>
                                                    <XCircle className="w-3 h-3" /> {log.status}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {log.feature_key}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {log.provider_name || '-'}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs">
                                            {log.duration_ms ? `${log.duration_ms}ms` : '-'}
                                        </td>
                                        <td className="px-6 py-4 max-w-xs truncate text-xs font-mono text-gray-400">
                                            {log.error_message || JSON.stringify(log.metadata)}
                                        </td>
                                    </tr>
                                ))}
                                {logs.length === 0 && (
                                    <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">No logs found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
