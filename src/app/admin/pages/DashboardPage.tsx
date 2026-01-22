
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import { Activity, Users, Image as ImageIcon, Zap } from 'lucide-react';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalGenerations: 0,
        successRate: 0,
        activeFeatures: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    async function fetchStats() {
        // 1. Logs Stats
        const { count: totalLogs } = await supabase.from('generation_logs').select('*', { count: 'exact', head: true });

        // 2. Success Rate (simplified: last 100 logs)
        const { data: recentLogs } = await supabase.from('generation_logs').select('status').limit(100);
        const successCount = recentLogs?.filter(l => l.status === 'success').length || 0;
        const rate = recentLogs?.length ? (successCount / recentLogs.length) * 100 : 0;

        // 3. Active Features
        const { count: activeFeats } = await supabase.from('features').select('*', { count: 'exact', head: true }).eq('is_active', true);

        setStats({
            totalGenerations: totalLogs || 0,
            successRate: Math.round(rate),
            activeFeatures: activeFeats || 0
        });
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Dashboard Overview</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <ImageIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Generations</p>
                        <h4 className="text-2xl font-bold text-gray-900">{stats.totalGenerations}</h4>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Success Rate (Last 100)</p>
                        <h4 className="text-2xl font-bold text-gray-900">{stats.successRate}%</h4>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Active Features</p>
                        <h4 className="text-2xl font-bold text-gray-900">{stats.activeFeatures}</h4>
                    </div>
                </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h4 className="font-semibold text-purple-900 mb-2">Welcome to Antigravity Admin</h4>
                <p className="text-sm text-purple-700">
                    Manage your AI generation pipelines, monitor usage, and configure provider settings from this central console.
                </p>
            </div>
        </div>
    );
}


