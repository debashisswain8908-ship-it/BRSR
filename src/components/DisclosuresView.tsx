import React, { useState } from 'react';
import { SectionA } from './SectionA';
import { SectionB } from './SectionB';
import { SectionC } from './SectionC';
import { Building2, ShieldCheck, Leaf } from 'lucide-react';
import { useBrsr } from '../context/BrsrContext';

interface DisclosuresViewProps {
  initialSubSection?: string;
}

export const DisclosuresView: React.FC<DisclosuresViewProps> = ({ initialSubSection = 'sectionA' }) => {
  const [activeSub, setActiveSub] = useState<'sectionA' | 'sectionB' | 'sectionC'>(() => {
    if (initialSubSection === 'sectionB') return 'sectionB';
    if (initialSubSection === 'sectionC' || initialSubSection.startsWith('p')) return 'sectionC';
    return 'sectionA';
  });

  const { completionStats } = useBrsr();

  return (
    <div className="space-y-6">
      
      {/* 3 Main Parts Segmented Navigation Bar */}
      <div className="bg-white rounded-xl border border-neutral-200 p-2 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          
          <button
            onClick={() => setActiveSub('sectionA')}
            className={`p-3 rounded-lg text-left transition-all cursor-pointer flex items-center justify-between border ${
              activeSub === 'sectionA'
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Building2 className={`w-4 h-4 ${activeSub === 'sectionA' ? 'text-emerald-400' : 'text-emerald-800'}`} />
              <div>
                <p className="text-xs font-bold leading-tight">Section A: General</p>
                <p className={`text-[10px] ${activeSub === 'sectionA' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  Entity, workforce, CSR
                </p>
              </div>
            </div>
            <span className={`text-xs font-mono font-bold tabular-nums ${activeSub === 'sectionA' ? 'text-emerald-400' : 'text-neutral-900'}`}>
              {completionStats.sectionAPercent}%
            </span>
          </button>

          <button
            onClick={() => setActiveSub('sectionB')}
            className={`p-3 rounded-lg text-left transition-all cursor-pointer flex items-center justify-between border ${
              activeSub === 'sectionB'
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className={`w-4 h-4 ${activeSub === 'sectionB' ? 'text-emerald-400' : 'text-emerald-800'}`} />
              <div>
                <p className="text-xs font-bold leading-tight">Section B: Management</p>
                <p className={`text-[10px] ${activeSub === 'sectionB' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  Governance & 9 policies
                </p>
              </div>
            </div>
            <span className={`text-xs font-mono font-bold tabular-nums ${activeSub === 'sectionB' ? 'text-emerald-400' : 'text-neutral-900'}`}>
              {completionStats.sectionBPercent}%
            </span>
          </button>

          <button
            onClick={() => setActiveSub('sectionC')}
            className={`p-3 rounded-lg text-left transition-all cursor-pointer flex items-center justify-between border ${
              activeSub === 'sectionC'
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Leaf className={`w-4 h-4 ${activeSub === 'sectionC' ? 'text-emerald-400' : 'text-emerald-800'}`} />
              <div>
                <p className="text-xs font-bold leading-tight">Section C: Principles</p>
                <p className={`text-[10px] ${activeSub === 'sectionC' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  NGRBC Principles P1 to P9
                </p>
              </div>
            </div>
            <span className={`text-xs font-mono font-bold tabular-nums ${activeSub === 'sectionC' ? 'text-emerald-400' : 'text-neutral-900'}`}>
              {completionStats.sectionCPercent}%
            </span>
          </button>

        </div>
      </div>

      {/* Active Section Content */}
      {activeSub === 'sectionA' && <SectionA />}
      {activeSub === 'sectionB' && <SectionB />}
      {activeSub === 'sectionC' && <SectionC initialPrinciple={initialSubSection.startsWith('p') ? initialSubSection : 'p6'} />}

    </div>
  );
};
