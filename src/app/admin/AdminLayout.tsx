
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Layers, Settings, Database, Image as ImageIcon, FileText } from 'lucide-react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster } from '../components/ui/sonner';

export default function AdminLayout() {
    const location = useLocation();

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/features', label: 'Features', icon: Layers },
        { path: '/admin/prompts', label: 'Prompt Library', icon: FileText },
        { path: '/admin/assets', label: 'Reference Assets', icon: ImageIcon },
        { path: '/admin/providers', label: 'Providers', icon: Database },
        { path: '/admin/logs', label: 'Logs', icon: Settings },
    ];

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex h-screen bg-gray-100 font-sans text-gray-900">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200">
                    <div className="p-6">
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">Antigravity<span className="text-purple-600">Admin</span></h1>
                    </div>
                    <nav className="px-4 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            const isSub = location.pathname.startsWith(item.path) && item.path !== '/admin';

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive || isSub
                                        ? 'bg-purple-50 text-purple-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {navItems.find(i => i.path === location.pathname)?.label || 'Console'}
                        </h2>
                        <div className="flex items-center gap-4">
                            <button className="text-sm font-medium text-gray-500 hover:text-gray-900">Logout</button>
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">A</div>
                        </div>
                    </header>
                    <div className="p-8">
                        <Outlet />
                    </div>
                </main>

            </div>
            <Toaster />
        </DndProvider >
    );
}


