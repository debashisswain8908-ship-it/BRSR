import React, { useState } from 'react';
import { HelpCircle, Search, BookOpen, Layers, RefreshCw, ShieldCheck, Database, CheckCircle2 } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GLOSSARY_ITEMS = [
  {
    term: 'Scope 1 GHG Emissions',
    category: 'Environment / Climate',
    definition: 'Direct greenhouse gas emissions that occur from sources that are controlled or owned by an organization (e.g., emissions associated with fuel combustion in boilers, furnaces, vehicles, or captive power generators). Measured in Metric Tonnes of CO2 equivalent (MT CO2e).',
    sebiContext: 'Mandatory under BRSR Principle 6 Essential Indicators and BRSR Core Attribute 1.',
  },
  {
    term: 'Scope 2 GHG Emissions',
    category: 'Environment / Climate',
    definition: 'Indirect greenhouse gas emissions associated with the purchase of electricity, steam, heat, or cooling. Although Scope 2 emissions physically occur at the facility where they are generated, they are accounted for in an organization’s GHG inventory because they result from the entity’s energy use.',
    sebiContext: 'Mandatory under BRSR Principle 6 Essential Indicators and BRSR Core Attribute 1.',
  },
  {
    term: 'Scope 3 GHG Emissions',
    category: 'Value Chain / Climate',
    definition: 'All other indirect emissions that occur in an organization’s value chain, including both upstream (supplier extraction, transport, packaging) and downstream (product usage, end-of-life disposal).',
    sebiContext: 'Voluntary under Principle 6 Leadership Indicator; increasingly required for Tier-1 value chain partners under BRSR Core.',
  },
  {
    term: 'BRSR Core',
    category: 'Regulatory Mandate',
    definition: 'A subset of the BRSR framework consisting of 9 Key Performance Indicators (KPIs) introduced by SEBI for which top listed entities must mandatorily obtain reasonable third-party assurance.',
    sebiContext: 'Specified in SEBI Circular SEBI/HO/CFD/CFD-SEC-2/P/CIR/2023/122.',
  },
  {
    term: 'NGRBC',
    category: 'Regulatory Framework',
    definition: 'National Guidelines on Responsible Business Conduct released by the Ministry of Corporate Affairs (MCA), Government of India. Comprises nine foundational principles governing ethical, environmental, social, and economic business behavior.',
    sebiContext: 'Forms the architectural backbone of Section C of the SEBI BRSR portal.',
  },
  {
    term: 'LTIFR (Lost Time Injury Frequency Rate)',
    category: 'Health & Safety',
    definition: 'A standard safety calculation measuring the number of lost-time injuries occurring in a workplace per 1,000,000 person-hours worked over the reporting period. Formula: (Number of Lost Time Injuries × 1,000,000) ÷ Total Hours Worked.',
    sebiContext: 'BRSR Core Key Performance Indicator 5.',
  },
  {
    term: 'Extended Producer Responsibility (EPR)',
    category: 'Circular Economy',
    definition: 'A policy approach where manufacturers are given significant financial or physical responsibility for the treatment or disposal of post-consumer products (notably plastic packaging, e-waste, and batteries).',
    sebiContext: 'Reported under Principle 2 (Sustainable Goods & Services).',
  },
  {
    term: 'Zero Liquid Discharge (ZLD)',
    category: 'Water Conservation',
    definition: 'A water treatment process in which all industrial wastewater is purified and recycled, leaving zero discharge of effluent into local streams, rivers, or public sewer systems.',
    sebiContext: 'Principle 6 Essential Indicator for high-water-intensity manufacturing sectors.',
  },
  {
    term: 'MSMED Act 45-Day Payment Rule',
    category: 'Supply Chain Fairness',
    definition: 'Section 15 of the Micro, Small and Medium Enterprises Development Act, 2006, mandates that buyer entities must make payments to registered MSME suppliers within agreed terms, which cannot exceed 45 calendar days from the date of acceptance.',
    sebiContext: 'BRSR Core KPI 8 (Customer & Supplier Fairness).',
  },
  {
    term: 'Aspirational Districts',
    category: 'Inclusive Development',
    definition: 'Districts identified by NITI Aayog (Government of India) characterized by lower socio-economic indicators, where focused CSR capital and public interventions are encouraged to accelerate regional development.',
    sebiContext: 'Section A (CSR Details) and Principle 8 (Inclusive Growth).',
  },
];

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'glossary' | 'how_updates_work'>('how_updates_work');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = GLOSSARY_ITEMS.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col border border-neutral-200">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-800" />
            <div>
              <h3 className="text-base font-bold text-neutral-900">SEBI BRSR Guidance & System Guide</h3>
              <p className="text-xs text-neutral-500">Official definitions, statutory metrics, and data update workflows</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 font-bold text-lg cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 px-5 pt-2 text-xs">
          <button
            onClick={() => setActiveTab('how_updates_work')}
            className={`px-4 py-2 font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'how_updates_work'
                ? 'border-emerald-800 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            How Data Updates & Calculations Work
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-4 py-2 font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'glossary'
                ? 'border-emerald-800 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Glossary & Definitions ({GLOSSARY_ITEMS.length})
          </button>
        </div>

        {/* Tab 1: How Data Updates Work */}
        {activeTab === 'how_updates_work' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-neutral-700">
            
            {/* Step 1: Real-time UI Inputs */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                <RefreshCw className="w-4 h-4 text-emerald-700" />
                <span>1. Reactive Form Inputs & Instant State Synchronization</span>
              </div>
              <p className="leading-relaxed text-neutral-600">
                Whenever you type or modify any input field in <strong>Section A (General)</strong>, <strong>Section B (Governance)</strong>, <strong>Section C (P1–P9)</strong>, or <strong>Value Chain</strong>:
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-600 pl-1">
                <li>Changes update the React state in real time without full-page reloads.</li>
                <li>Changes automatically sync to browser <code className="bg-neutral-200 px-1 py-0.5 rounded text-[11px] font-mono">localStorage</code> under <code className="bg-neutral-200 px-1 py-0.5 rounded text-[11px] font-mono">sebi_brsr_portal_data_v1</code>, preserving your progress across reloads and sessions.</li>
              </ul>
            </div>

            {/* Step 2: Auto-Calculation Engine */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                <Layers className="w-4 h-4 text-emerald-700" />
                <span>2. Automated Statutory Intensities & Formulas Engine</span>
              </div>
              <p className="leading-relaxed text-neutral-600">
                SEBI BRSR requires intensity normalization per unit of revenue. The portal recalculates all denominators on the fly:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                <div className="p-2 bg-white rounded border border-neutral-200">
                  <span className="font-bold text-neutral-800 font-sans block">GHG Intensity:</span>
                  <code>(Scope 1 + Scope 2 MT) ÷ Turnover (₹ Cr)</code>
                </div>
                <div className="p-2 bg-white rounded border border-neutral-200">
                  <span className="font-bold text-neutral-800 font-sans block">Energy Intensity:</span>
                  <code>(Renewable + Non-Renewable GJ) ÷ Turnover</code>
                </div>
                <div className="p-2 bg-white rounded border border-neutral-200">
                  <span className="font-bold text-neutral-800 font-sans block">Water Intensity:</span>
                  <code>Total Water Withdrawn (KL) ÷ Turnover</code>
                </div>
                <div className="p-2 bg-white rounded border border-neutral-200">
                  <span className="font-bold text-neutral-800 font-sans block">Waste Circularity %:</span>
                  <code>(Recycled Waste ÷ Total Generated) × 100</code>
                </div>
              </div>
            </div>

            {/* Step 3: Role-Based Access Control (RBAC) */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>3. Role-Based Permissions & Guardrails</span>
              </div>
              <p className="leading-relaxed text-neutral-600">
                Switching the active persona in the top toolbar controls what fields you can edit:
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-600 pl-1">
                <li><strong>ESG Lead / Admin:</strong> Unrestricted master editing, configuration, and review access.</li>
                <li><strong>Finance Team:</strong> Can edit Turnover, Payroll expenditure, CSR 2% spend, and Procurement values.</li>
                <li><strong>HR Team:</strong> Can edit Workforce counts, diversity figures, wages, POSH cases, and safety LTIFR.</li>
                <li><strong>Operations / EHS:</strong> Can edit Energy, GHG emissions (Scope 1/2), Water, and Waste metrics.</li>
                <li><strong>Statutory Auditor (KPMG):</strong> View-only, with authority to verify evidence and affix the digital assurance stamp.</li>
                <li><strong>Board / Director:</strong> High-level executive review with authority to grant final board sign-off.</li>
              </ul>
            </div>

            {/* Step 4: Audit Trail */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                <Database className="w-4 h-4 text-emerald-700" />
                <span>4. Immutable Timestamped Audit Trail & Snapshot Backup</span>
              </div>
              <p className="leading-relaxed text-neutral-600">
                Every time any metric is updated, the system records:
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-600 pl-1">
                <li>Exact Indian Standard Time (IST) timestamp.</li>
                <li>User identity & role.</li>
                <li>Section and field identifier.</li>
                <li>Previous value versus newly entered value.</li>
              </ul>
              <p className="text-neutral-500 text-[11px] pt-1">
                You can download the complete audit trail as a CSV or export/import full JSON data snapshots using the Database icons in the top bar.
              </p>
            </div>

          </div>
        )}

        {/* Tab 2: Glossary */}
        {activeTab === 'glossary' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search terms: Scope 1, BRSR Core, LTIFR, EPR, MSME, ZLD..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-none bg-white"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              {filtered.length === 0 ? (
                <p className="text-center text-neutral-500 py-8">No matching terms found.</p>
              ) : (
                filtered.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-neutral-900 text-sm">{item.term}</h4>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-neutral-700 leading-relaxed">{item.definition}</p>
                    <div className="pt-2 text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                      <span>SEBI Regulatory Anchor:</span>
                      <span className="text-neutral-600 font-normal">{item.sebiContext}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 flex justify-between items-center bg-neutral-50 rounded-b-xl text-xs">
          <span className="text-neutral-500">
            SEBI (LODR) Regulations & MCA NGRBC Guidelines
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
