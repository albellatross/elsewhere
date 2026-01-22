
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserApp from './UserApp';
import AdminLayout from './admin/AdminLayout';
import DashboardPage from './admin/pages/DashboardPage';
import FeaturesPage from './admin/pages/FeaturesPage';
import ProvidersPage from './admin/pages/ProvidersPage';
import LogsPage from './admin/pages/LogsPage';
import PromptLibraryPage from './admin/pages/PromptLibraryPage';
import AdminCosPlayPreviewPage from './admin/pages/Prompts/AdminCosPlayPreviewPage';
import AssetsPage from './admin/pages/AssetsPage';

export default function App() {
    return (
        <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="features" element={<FeaturesPage />} />
                <Route path="prompts" element={<PromptLibraryPage />} />
                <Route path="prompts/cosplay-preview" element={<AdminCosPlayPreviewPage />} />
                <Route path="assets" element={<AssetsPage />} />
                <Route path="providers" element={<ProvidersPage />} />
                <Route path="logs" element={<LogsPage />} />
            </Route>

            {/* Main User App - Catch all others */}
            <Route path="*" element={<UserApp />} />
        </Routes>
    );
}
