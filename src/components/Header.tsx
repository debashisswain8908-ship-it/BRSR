import React from 'react';
import { Download } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExport: () => void;
  onOpenGlossary: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
  onOpenGlossary,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="text-lg font-bold tracking-tight text-neutral-900 group-hover:text-emerald-700 transition-colors whitespace-nowrap">
                SEBI BRSR Online Portal
              </span>
            </button>
            <span className="hidden sm:inline-block text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
              SEBI / NGRBC Compliant
            </span>
          </div>

          {/* Zone 2: Clean 4-5 Single-line Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'dashboard' ? 'text-emerald-700 font-semibold' : ''
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('disclosures')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'disclosures' ? 'text-emerald-700 font-semibold' : ''
              }`}
            >
              Disclosures (Sec A-C)
            </button>
            <button
              onClick={() => setActiveTab('brsr_core')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'brsr_core' ? 'text-emerald-700 font-semibold' : ''
              }`}
            >
              BRSR Core (9 KPIs)
            </button>
            <button
              onClick={() => setActiveTab('value_chain')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'value_chain' ? 'text-emerald-700 font-semibold' : ''
              }`}
            >
              Value Chain
            </button>
            <button
              onClick={() => setActiveTab('evidence_audit')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'evidence_audit' ? 'text-emerald-700 font-semibold' : ''
              }`}
            >
              Evidence & Audit
            </button>
            <button
              onClick={onOpenGlossary}
              className="text-neutral-500 hover:text-neutral-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Glossary & Help
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenExport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
