/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrsrProvider } from './context/BrsrContext';
import { Header } from './components/Header';
import { WorkspaceToolbar } from './components/WorkspaceToolbar';
import { Dashboard } from './components/Dashboard';
import { DisclosuresView } from './components/DisclosuresView';
import { BrsrCore } from './components/BrsrCore';
import { ValueChain } from './components/ValueChain';
import { EvidenceAndAudit } from './components/EvidenceAndAudit';
import { GlossaryModal } from './components/GlossaryModal';
import { ReportExportModal } from './components/ReportExportModal';

function MainLayout() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [initialSubSection, setInitialSubSection] = useState<string>('sectionA');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleNavigateTab = (tab: string, subSection?: string) => {
    setActiveTab(tab);
    if (subSection) {
      setInitialSubSection(subSection);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100/70 text-neutral-900 flex flex-col font-sans">
      
      {/* 1. Universal Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => handleNavigateTab(tab)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
      />

      {/* 2. Workspace Toolbar & Role Simulation */}
      <WorkspaceToolbar />

      {/* 3. Main Workspace Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard onNavigateTab={handleNavigateTab} />
        )}

        {activeTab === 'disclosures' && (
          <DisclosuresView initialSubSection={initialSubSection} />
        )}

        {activeTab === 'brsr_core' && (
          <BrsrCore />
        )}

        {activeTab === 'value_chain' && (
          <ValueChain />
        )}

        {activeTab === 'evidence_audit' && (
          <EvidenceAndAudit />
        )}
      </main>

      {/* 4. Quiet Statutory Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-12 py-6 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <p className="font-semibold text-neutral-700">SEBI Business Responsibility and Sustainability Reporting (BRSR) Portal</p>
            <p className="text-[11px] text-neutral-400">Aligned with SEBI Circular No. SEBI/HO/CFD/CMD-2/P/CIR/2021/562 and NGRBC Guidelines</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className="text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              Glossary & Guide
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsExportOpen(true)}
              className="text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              Download Report
            </button>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">Security: MCA-21 Encrypted</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <GlossaryModal isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
      <ReportExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />

    </div>
  );
}

export default function App() {
  return (
    <BrsrProvider>
      <MainLayout />
    </BrsrProvider>
  );
}
