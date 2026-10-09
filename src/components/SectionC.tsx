import React, { useState } from 'react';
import { useBrsr } from '../context/BrsrContext';
import { 
  Leaf, 
  ShieldCheck, 
  Heart, 
  Users, 
  UserCheck, 
  Scale, 
  HelpCircle, 
  CheckCircle2, 
  TrendingUp, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface SectionCProps {
  initialPrinciple?: string;
}

export const SectionC: React.FC<SectionCProps> = ({ initialPrinciple = 'p6' }) => {
  const { report, updatePrincipleData, canEdit, calculatedMetrics } = useBrsr();
  const [selectedPrinciple, setSelectedPrinciple] = useState<string>(initialPrinciple);
  const [filterType, setFilterType] = useState<'all' | 'essential' | 'leadership'>('all');

  const p1 = report.sectionC.p1;
  const p2 = report.sectionC.p2;
  const p3 = report.sectionC.p3;
  const p4 = report.sectionC.p4;
  const p5 = report.sectionC.p5;
  const p6 = report.sectionC.p6;
  const p7 = report.sectionC.p7;
  const p8 = report.sectionC.p8;
  const p9 = report.sectionC.p9;

  const isOps = canEdit('operations');
  const isHr = canEdit('hr');
  const isFinance = canEdit('finance');
  const isEsg = canEdit('esg_lead');

  const PRINCIPLES = [
    { id: 'p1', num: 1, title: 'P1: Ethics & Accountability', icon: ShieldCheck, summary: 'Integrity, anti-corruption, regulatory fines' },
    { id: 'p2', num: 2, title: 'P2: Sustainable Goods & Services', icon: Leaf, summary: 'R&D spend, LCA, recycled inputs, EPR' },
    { id: 'p3', num: 3, title: 'P3: Employee Well-being', icon: Heart, summary: 'Health insurance, safety LTIFR, fatalities' },
    { id: 'p4', num: 4, title: 'P4: Stakeholder Responsiveness', icon: Users, summary: 'Consultation with marginalized groups' },
    { id: 'p5', num: 5, title: 'P5: Human Rights', icon: Scale, summary: 'Statutory minimum wage, child labor, due diligence' },
    { id: 'p6', num: 6, title: 'P6: Environment (BRSR Core)', icon: Leaf, summary: 'GHG emissions, energy, water footprint, waste' },
    { id: 'p7', num: 7, title: 'P7: Public Policy Advocacy', icon: UserCheck, summary: 'Trade chamber affiliations, policy stances' },
    { id: 'p8', num: 8, title: 'P8: Inclusive Growth', icon: TrendingUp, summary: 'Local & MSME procurement, aspirational districts' },
    { id: 'p9', num: 9, title: 'P9: Consumer Value', icon: HelpCircle, summary: 'Customer privacy, product recalls, eco-labels' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header with Essential vs Leadership filter */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-neutral-900">Section C: Principle-wise Performance Disclosures</h2>
            <p className="text-xs text-neutral-500">
              The 9 National Guidelines on Responsible Business Conduct (NGRBC) with SEBI Essential & Leadership metrics.
            </p>
          </div>

          {/* Interactive Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg shrink-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filterType === 'all' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Indicators
            </button>
            <button
              onClick={() => setFilterType('essential')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filterType === 'essential' ? 'bg-emerald-800 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Essential (Mandatory)
            </button>
            <button
              onClick={() => setFilterType('leadership')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filterType === 'leadership' ? 'bg-purple-800 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Leadership (Voluntary)
            </button>
          </div>
        </div>
      </div>

      {/* Principle Tabs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
        {PRINCIPLES.map((p) => {
          const isSelected = selectedPrinciple === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPrinciple(p.id)}
              className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                isSelected 
                  ? 'border-emerald-700 bg-emerald-50/60 font-semibold text-emerald-950 shadow-xs' 
                  : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold">P{p.num}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />}
              </div>
              <p className="text-[11px] truncate mt-1 text-neutral-600 font-medium">{p.title.split(':')[1]}</p>
            </button>
          );
        })}
      </div>

      {/* Active Principle Form Panel */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
        
        {/* ============================================================== */}
        {/* PRINCIPLE 1: ETHICS, TRANSPARENCY & ACCOUNTABILITY */}
        {/* ============================================================== */}
        {selectedPrinciple === 'p1' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Principle 1: Ethics, Transparency & Accountability</h3>
                <p className="text-xs text-neutral-500">Businesses should conduct and govern themselves with integrity.</p>
              </div>
              <span className="text-xs text-neutral-500">NGRBC Principle 1</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Essential Indicator */}
              {(filterType === 'all' || filterType === 'essential') && (
                <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">Anti-Corruption Coverage of KMPs</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      Essential
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Percentage of Key Managerial Personnel covered by anti-bribery training.</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      disabled={!isEsg}
                      value={p1.kmpCoveredPercent}
                      onChange={(e) => updatePrincipleData('p1', { kmpCoveredPercent: Number(e.target.value) })}
                      className="w-24 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                    />
                    <span className="text-neutral-500 font-medium">% KMP Covered (100% statutory requirement)</span>
                  </div>
                </div>
              )}

              {/* Essential Indicator */}
              {(filterType === 'all' || filterType === 'essential') && (
                <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">Regulatory Monetary Penalties</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      Essential
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Total fines/penalties imposed by regulatory authorities (SEBI, RBI, MCA, NCLT).</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      disabled={!isFinance}
                      value={p1.monetaryPenaltiesIncurredINR}
                      onChange={(e) => updatePrincipleData('p1', { monetaryPenaltiesIncurredINR: Number(e.target.value) })}
                      className="w-28 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                    />
                    <span className="text-neutral-500 font-medium">INR (Total fines incurred)</span>
                  </div>
                </div>
              )}

              {/* Essential Indicator */}
              {(filterType === 'all' || filterType === 'essential') && (
                <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">Whistleblower Complaints</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      Essential
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Vigil mechanism reports received and addressed during the financial year.</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[11px] text-neutral-400 block">Received</span>
                      <input
                        type="number"
                        disabled={!isEsg}
                        value={p1.whistleblowerComplaintsReceived}
                        onChange={(e) => updatePrincipleData('p1', { whistleblowerComplaintsReceived: Number(e.target.value) })}
                        className="w-full px-2 py-1 border border-neutral-300 rounded tabular-nums bg-white"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-400 block">Resolved</span>
                      <input
                        type="number"
                        disabled={!isEsg}
                        value={p1.whistleblowerComplaintsResolved}
                        onChange={(e) => updatePrincipleData('p1', { whistleblowerComplaintsResolved: Number(e.target.value) })}
                        className="w-full px-2 py-1 border border-neutral-300 rounded tabular-nums bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Leadership Indicator */}
              {(filterType === 'all' || filterType === 'leadership') && (
                <div className="p-4 rounded-lg border border-purple-200 bg-purple-50/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-950">Conflict of Interest Disclosures</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                      Leadership
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Disclosures related to conflicts of interest among Directors and KMPs.</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      disabled={!isEsg}
                      value={p1.conflictOfInterestCases}
                      onChange={(e) => updatePrincipleData('p1', { conflictOfInterestCases: Number(e.target.value) })}
                      className="w-20 px-3 py-1.5 border border-neutral-300 rounded tabular-nums bg-white"
                    />
                    <span className="text-neutral-500">Reported Cases</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PRINCIPLE 2: SUSTAINABLE GOODS & SERVICES */}
        {/* ============================================================== */}
        {selectedPrinciple === 'p2' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Principle 2: Sustainable & Safe Goods & Services</h3>
                <p className="text-xs text-neutral-500">Life cycle assessment (LCA), eco-friendly R&D, and recycled input materials.</p>
              </div>
              <span className="text-xs text-neutral-500">NGRBC Principle 2</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Essential Indicator: R&D Spend */}
              {(filterType === 'all' || filterType === 'essential') && (
                <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">R&D and CapEx for Sustainability</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      Essential
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Investments in clean tech, energy-efficiency, and circular product designs.</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      disabled={!isFinance}
                      value={p2.rdSpendOnSustainabilityCrores}
                      onChange={(e) => updatePrincipleData('p2', { rdSpendOnSustainabilityCrores: Number(e.target.value) })}
                      className="w-28 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                    />
                    <span className="text-neutral-500 font-medium">₹ Crores ({p2.rdSpendPercentTurnover}% of Turnover)</span>
                  </div>
                </div>
              )}

              {/* Essential Indicator: LCA */}
              {(filterType === 'all' || filterType === 'essential') && (
                <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">Life Cycle Assessment (LCA) Coverage</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      Essential
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Cradle-to-grave or cradle-to-gate environmental impact assessments.</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      disabled={!isOps}
                      value={p2.turnoverCoveredByLCAPercent}
                      onChange={(e) => updatePrincipleData('p2', { turnoverCoveredByLCAPercent: Number(e.target.value) })}
                      className="w-24 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                    />
                    <span className="text-neutral-500 font-medium">% of Total Turnover Covered</span>
                  </div>
                </div>
              )}

              {/* Essential Indicator: Recycled input */}
              {(filterType === 'all' || filterType === 'essential') && (
                <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">Recycled / Reused Input Materials</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      Essential
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Percentage of recycled or remanufactured inputs used in production.</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      disabled={!isOps}
                      value={p2.recycledMaterialInputPercent}
                      onChange={(e) => updatePrincipleData('p2', { recycledMaterialInputPercent: Number(e.target.value) })}
                      className="w-24 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                    />
                    <span className="text-neutral-500 font-medium">% of Total Raw Materials</span>
                  </div>
                </div>
              )}

              {/* Leadership Indicator: EPR */}
              {(filterType === 'all' || filterType === 'leadership') && (
                <div className="p-4 rounded-lg border border-purple-200 bg-purple-50/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-950">Extended Producer Responsibility (EPR)</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                      Leadership
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Statutory EPR compliance for plastic, e-waste, and battery waste streams.</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      disabled={!isOps}
                      value={p2.eprTargetMetPercent}
                      onChange={(e) => updatePrincipleData('p2', { eprTargetMetPercent: Number(e.target.value) })}
                      className="w-24 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                    />
                    <span className="text-neutral-500 font-medium">% Statutory Target Fulfilled</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PRINCIPLE 3: EMPLOYEE WELL-BEING & SAFETY */}
        {/* ============================================================== */}
        {selectedPrinciple === 'p3' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Principle 3: Employee Well-being & Safety</h3>
                <p className="text-xs text-neutral-500">Health insurance, safety metrics (LTIFR), parental leave, and POSH committees.</p>
              </div>
              <span className="text-xs text-neutral-500">NGRBC Principle 3</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Essential Indicator: Health Insurance */}
              {(filterType === 'all' || filterType === 'essential') && (
                <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">Health & Accident Insurance Coverage</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      Essential
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Percentage of employees and on-site workers covered by medical insurance.</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      disabled={!isHr}
                      value={p3.healthInsuranceCoverageEmployeesPercent}
                      onChange={(e) => updatePrincipleData('p3', { healthInsuranceCoverageEmployeesPercent: Number(e.target.value) })}
                      className="w-24 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                    />
                    <span className="text-neutral-500 font-medium">% Employees Covered</span>
                  </div>
                </div>
              )}

              {/* Essential Indicator: LTIFR (BRSR CORE) */}
              {(filterType === 'all' || filterType === 'essential') && (
                <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">Lost Time Injury Frequency Rate (LTIFR)</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      BRSR Core Mandatory
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Number of lost time injuries per 1,000,000 person-hours worked.</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.01"
                      disabled={!isHr}
                      value={p3.ltifrScore}
                      onChange={(e) => updatePrincipleData('p3', { ltifrScore: Number(e.target.value) })}
                      className="w-24 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                    />
                    <span className="text-neutral-500 font-medium">Rate per Million Man-Hours</span>
                  </div>
                </div>
              )}

              {/* Essential Indicator: Fatalities */}
              {(filterType === 'all' || filterType === 'essential') && (
                <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">Workplace Fatalities Count</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      Essential
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Number of work-related fatal incidents (Employees + Workers).</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      disabled={!isHr}
                      value={p3.fatalitiesCount}
                      onChange={(e) => updatePrincipleData('p3', { fatalitiesCount: Number(e.target.value) })}
                      className="w-20 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                    />
                    <span className="text-neutral-500 font-medium">Fatal Incidents (Target: 0)</span>
                  </div>
                </div>
              )}

              {/* Leadership Indicator: Training Hours */}
              {(filterType === 'all' || filterType === 'leadership') && (
                <div className="p-4 rounded-lg border border-purple-200 bg-purple-50/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-950">Safety Training Hours</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                      Leadership
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Average hours of health & safety training delivered per employee.</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.5"
                      disabled={!isHr}
                      value={p3.safetyTrainingHoursPerEmployee}
                      onChange={(e) => updatePrincipleData('p3', { safetyTrainingHoursPerEmployee: Number(e.target.value) })}
                      className="w-24 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                    />
                    <span className="text-neutral-500 font-medium">Hours / Employee / Year</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PRINCIPLE 4: STAKEHOLDER RESPONSIVENESS */}
        {/* ============================================================== */}
        {selectedPrinciple === 'p4' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Principle 4: Stakeholder Responsiveness</h3>
                <p className="text-xs text-neutral-500">Identification and formal consultation with vulnerable and marginalized groups.</p>
              </div>
              <span className="text-xs text-neutral-500">NGRBC Principle 4</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900">Consultation with Vulnerable Groups</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                    Essential
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">Whether entity regularly consults local disadvantaged communities.</p>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 font-semibold text-neutral-800">
                    <input
                      type="radio"
                      checked={p4.vulnerableGroupsConsulted}
                      onChange={() => updatePrincipleData('p4', { vulnerableGroupsConsulted: true })}
                      disabled={!isEsg}
                    />
                    Yes, Formally Conducted
                  </label>
                  <label className="flex items-center gap-1.5 font-semibold text-neutral-800">
                    <input
                      type="radio"
                      checked={!p4.vulnerableGroupsConsulted}
                      onChange={() => updatePrincipleData('p4', { vulnerableGroupsConsulted: false })}
                      disabled={!isEsg}
                    />
                    No
                  </label>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-purple-200 bg-purple-50/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-950">Stakeholder Inputs into Board Strategy</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                    Leadership
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">Evidence that stakeholder feedback influenced capital allocation.</p>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-800 font-bold">✓ Integrated into FY26 Annual Plan</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PRINCIPLE 5: HUMAN RIGHTS */}
        {/* ============================================================== */}
        {selectedPrinciple === 'p5' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Principle 5: Human Rights & Fair Labor</h3>
                <p className="text-xs text-neutral-500">Statutory minimum wages, zero-tolerance child labor, and due diligence audits.</p>
              </div>
              <span className="text-xs text-neutral-500">NGRBC Principle 5</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900">Minimum Wage Compliance</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                    Essential
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">Percentage of employees & workers paid at or above statutory minimum wages.</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    disabled={!isHr}
                    value={p5.minimumWagePaidCompliancePercent}
                    onChange={(e) => updatePrincipleData('p5', { minimumWagePaidCompliancePercent: Number(e.target.value) })}
                    className="w-24 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                  />
                  <span className="text-neutral-500 font-medium">% Compliance (Mandated: 100%)</span>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900">Child Labor / Forced Labor Instances</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                    Essential
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">Reported cases in company operations or contractor facilities.</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    disabled={!isHr}
                    value={p5.childLaborInstances}
                    onChange={(e) => updatePrincipleData('p5', { childLaborInstances: Number(e.target.value) })}
                    className="w-20 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                  />
                  <span className="text-neutral-500 font-medium">Cases (Target: 0)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PRINCIPLE 6: ENVIRONMENT (BRSR CORE PILLAR) */}
        {/* ============================================================== */}
        {selectedPrinciple === 'p6' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Principle 6: Environment Protection & Climate Action</h3>
                <p className="text-xs text-neutral-500">
                  Comprehensive GHG footprint, energy consumption, water withdrawal, and circular waste metrics with auto-calculated intensities.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 shrink-0">
                BRSR Core Mandatory Pillar
              </span>
            </div>

            {/* Auto-Calculated Live Summary Banner */}
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[11px] text-emerald-800 block font-semibold">GHG Scope 1+2 Intensity</span>
                <span className="text-lg font-black text-emerald-950 font-mono tabular-nums">
                  {calculatedMetrics.ghgIntensityPerCrore}
                </span>
                <span className="text-[10px] text-emerald-700 block">MT CO2e / ₹ Cr</span>
              </div>
              <div>
                <span className="text-[11px] text-emerald-800 block font-semibold">Energy Intensity</span>
                <span className="text-lg font-black text-emerald-950 font-mono tabular-nums">
                  {calculatedMetrics.energyIntensityPerCrore}
                </span>
                <span className="text-[10px] text-emerald-700 block">GJ / ₹ Cr ({calculatedMetrics.renewableSharePercent}% RE)</span>
              </div>
              <div>
                <span className="text-[11px] text-emerald-800 block font-semibold">Water Intensity</span>
                <span className="text-lg font-black text-emerald-950 font-mono tabular-nums">
                  {calculatedMetrics.waterIntensityPerCrore}
                </span>
                <span className="text-[10px] text-emerald-700 block">KL / ₹ Cr</span>
              </div>
              <div>
                <span className="text-[11px] text-emerald-800 block font-semibold">Waste Recycled Ratio</span>
                <span className="text-lg font-black text-emerald-950 font-mono tabular-nums">
                  {calculatedMetrics.wasteRecycledPercent}%
                </span>
                <span className="text-[10px] text-emerald-700 block">{calculatedMetrics.wasteIntensityPerCrore} MT/Cr</span>
              </div>
            </div>

            {/* Energy Disclosures */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>1. Energy Footprint (GJ)</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">Essential</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-500 font-semibold mb-1">Renewable Energy (GJ) *</label>
                  <input
                    type="number"
                    disabled={!isOps}
                    value={p6.renewableEnergyGJ}
                    onChange={(e) => updatePrincipleData('p6', { renewableEnergyGJ: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded font-bold tabular-nums"
                  />
                  <span className="text-[10px] text-neutral-400 mt-0.5 block">Solar, Wind, Biomass</span>
                </div>

                <div>
                  <label className="block text-neutral-500 font-semibold mb-1">Non-Renewable Energy (GJ) *</label>
                  <input
                    type="number"
                    disabled={!isOps}
                    value={p6.nonRenewableEnergyGJ}
                    onChange={(e) => updatePrincipleData('p6', { nonRenewableEnergyGJ: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded font-bold tabular-nums"
                  />
                  <span className="text-[10px] text-neutral-400 mt-0.5 block">Grid Electricity, Diesel, Gas</span>
                </div>

                <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                  <span className="text-[11px] text-neutral-400 block font-semibold">Total Energy (Auto-Sum)</span>
                  <span className="text-base font-bold text-neutral-900 font-mono tabular-nums">
                    {calculatedMetrics.totalEnergyGJ.toLocaleString('en-IN')} GJ
                  </span>
                  <span className="text-[10px] text-emerald-800 block mt-1">
                    Intensity: {calculatedMetrics.energyIntensityPerCrore} GJ / ₹ Cr
                  </span>
                </div>
              </div>
            </div>

            {/* GHG Emissions */}
            <div className="space-y-3 pt-3 border-t border-neutral-100">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>2. Greenhouse Gas (GHG) Emissions (MT CO2e)</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">Essential</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-500 font-semibold mb-1">Scope 1 Direct (MT CO2e) *</label>
                  <input
                    type="number"
                    step="0.1"
                    disabled={!isOps}
                    value={p6.scope1EmissionsMTCO2e}
                    onChange={(e) => updatePrincipleData('p6', { scope1EmissionsMTCO2e: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded font-bold tabular-nums"
                  />
                  <span className="text-[10px] text-neutral-400 mt-0.5 block">DG sets, boilers, fleet</span>
                </div>

                <div>
                  <label className="block text-neutral-500 font-semibold mb-1">Scope 2 Indirect (MT CO2e) *</label>
                  <input
                    type="number"
                    step="0.1"
                    disabled={!isOps}
                    value={p6.scope2EmissionsMTCO2e}
                    onChange={(e) => updatePrincipleData('p6', { scope2EmissionsMTCO2e: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded font-bold tabular-nums"
                  />
                  <span className="text-[10px] text-neutral-400 mt-0.5 block">Purchased electricity</span>
                </div>

                <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                  <span className="text-[11px] text-neutral-400 block font-semibold">Total Scope 1+2 (Auto-Sum)</span>
                  <span className="text-base font-bold text-neutral-900 font-mono tabular-nums">
                    {calculatedMetrics.totalScope1And2MTCO2e.toLocaleString('en-IN')} MT
                  </span>
                  <span className="text-[10px] text-emerald-800 block mt-1">
                    Intensity: {calculatedMetrics.ghgIntensityPerCrore} MT / ₹ Cr
                  </span>
                </div>
              </div>

              {/* Leadership Scope 3 */}
              {(filterType === 'all' || filterType === 'leadership') && (
                <div className="p-3 bg-purple-50/20 rounded border border-purple-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-purple-950">Scope 3 Value Chain Emissions (MT CO2e)</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-1.5 py-0.2 rounded ml-2">
                      Leadership
                    </span>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Purchased goods, business travel, downstream logistics.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      disabled={!isOps}
                      value={p6.scope3EmissionsMTCO2e}
                      onChange={(e) => updatePrincipleData('p6', { scope3EmissionsMTCO2e: Number(e.target.value) })}
                      className="w-28 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                    />
                    <span className="text-neutral-500 font-medium">MT CO2e</span>
                  </div>
                </div>
              )}
            </div>

            {/* Water Footprint */}
            <div className="space-y-3 pt-3 border-t border-neutral-100">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>3. Water Footprint & Withdrawal (Kilo Litres - KL)</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">Essential</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-500 font-semibold mb-1">Surface Water (KL)</label>
                  <input
                    type="number"
                    disabled={!isOps}
                    value={p6.waterWithdrawalSurfaceKL}
                    onChange={(e) => updatePrincipleData('p6', { waterWithdrawalSurfaceKL: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 border border-neutral-300 rounded tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 font-semibold mb-1">Groundwater (KL)</label>
                  <input
                    type="number"
                    disabled={!isOps}
                    value={p6.waterWithdrawalGroundKL}
                    onChange={(e) => updatePrincipleData('p6', { waterWithdrawalGroundKL: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 border border-neutral-300 rounded tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 font-semibold mb-1">Municipal Water (KL)</label>
                  <input
                    type="number"
                    disabled={!isOps}
                    value={p6.waterWithdrawalMunicipalKL}
                    onChange={(e) => updatePrincipleData('p6', { waterWithdrawalMunicipalKL: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 border border-neutral-300 rounded tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 font-semibold mb-1">Recycled / Reused (KL)</label>
                  <input
                    type="number"
                    disabled={!isOps}
                    value={p6.waterWithdrawalRecycledKL}
                    onChange={(e) => updatePrincipleData('p6', { waterWithdrawalRecycledKL: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 border border-neutral-300 rounded tabular-nums"
                  />
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded border border-neutral-200 text-xs flex items-center justify-between">
                <span>Total Water Withdrawal: <strong className="font-mono tabular-nums">{calculatedMetrics.totalWaterWithdrawalKL.toLocaleString('en-IN')} KL</strong></span>
                <span>Water Intensity: <strong className="font-mono tabular-nums text-emerald-800">{calculatedMetrics.waterIntensityPerCrore} KL / ₹ Cr</strong></span>
                <span>Zero Liquid Discharge (ZLD): <strong className="text-emerald-800">{p6.zeroLiquidDischargeOperating ? 'Active' : 'No'}</strong></span>
              </div>
            </div>

            {/* Waste Management */}
            <div className="space-y-3 pt-3 border-t border-neutral-100">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>4. Waste Generation & Circularity (Metric Tonnes - MT)</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">Essential</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-500 font-semibold mb-1">Hazardous Waste (MT)</label>
                  <input
                    type="number"
                    step="0.1"
                    disabled={!isOps}
                    value={p6.hazardousWasteGeneratedMT}
                    onChange={(e) => updatePrincipleData('p6', { hazardousWasteGeneratedMT: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 border border-neutral-300 rounded tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 font-semibold mb-1">Non-Hazardous (MT)</label>
                  <input
                    type="number"
                    step="0.1"
                    disabled={!isOps}
                    value={p6.nonHazardousWasteGeneratedMT}
                    onChange={(e) => updatePrincipleData('p6', { nonHazardousWasteGeneratedMT: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 border border-neutral-300 rounded tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 font-semibold mb-1">Plastic Waste (MT)</label>
                  <input
                    type="number"
                    step="0.1"
                    disabled={!isOps}
                    value={p6.plasticWasteGeneratedMT}
                    onChange={(e) => updatePrincipleData('p6', { plasticWasteGeneratedMT: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 border border-neutral-300 rounded tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 font-semibold mb-1">Recycled/Reused (MT) *</label>
                  <input
                    type="number"
                    step="0.1"
                    disabled={!isOps}
                    value={p6.wasteRecycledOrReusedMT}
                    onChange={(e) => updatePrincipleData('p6', { wasteRecycledOrReusedMT: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 border border-neutral-300 rounded font-bold tabular-nums"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* PRINCIPLE 7: RESPONSIBLE POLICY ADVOCACY */}
        {/* ============================================================== */}
        {selectedPrinciple === 'p7' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Principle 7: Responsible Public Policy Advocacy</h3>
                <p className="text-xs text-neutral-500">Industry chamber affiliations and transparent public policy positions.</p>
              </div>
              <span className="text-xs text-neutral-500">NGRBC Principle 7</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30">
                <span className="font-bold text-neutral-900 block mb-2">Trade Association Affiliations (Essential)</span>
                <div className="flex flex-wrap gap-2">
                  {p7.tradeAssociationMemberships.map((m, idx) => (
                    <span key={idx} className="bg-white border border-neutral-200 px-3 py-1 rounded text-neutral-800 font-medium">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PRINCIPLE 8: INCLUSIVE GROWTH */}
        {/* ============================================================== */}
        {selectedPrinciple === 'p8' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Principle 8: Inclusive Growth & Social Development</h3>
                <p className="text-xs text-neutral-500">Local procurement, MSME enablement, and development in Aspirational Districts.</p>
              </div>
              <span className="text-xs text-neutral-500">NGRBC Principle 8</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900">MSME Sourcing Share</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                    BRSR Core Mandatory
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">Percentage of total procurement spend sourced from registered MSMEs.</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    disabled={!isFinance}
                    value={p8.msmeProcurementPercent}
                    onChange={(e) => updatePrincipleData('p8', { msmeProcurementPercent: Number(e.target.value) })}
                    className="w-24 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                  />
                  <span className="text-neutral-500 font-medium">% of Total Procurement</span>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900">Jobs in Tier 2/3 Locations</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                    BRSR Core
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">Direct employment created in small towns and semi-urban centers.</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    disabled={!isHr}
                    value={p8.jobsCreatedTier2Tier3Locations}
                    onChange={(e) => updatePrincipleData('p8', { jobsCreatedTier2Tier3Locations: Number(e.target.value) })}
                    className="w-28 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                  />
                  <span className="text-neutral-500 font-medium">New Direct Jobs Created</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PRINCIPLE 9: CONSUMER VALUE */}
        {/* ============================================================== */}
        {selectedPrinciple === 'p9' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Principle 9: Consumer Value & Data Privacy</h3>
                <p className="text-xs text-neutral-500">Customer feedback, cybersecurity complaints, product recalls, and eco-labeling.</p>
              </div>
              <span className="text-xs text-neutral-500">NGRBC Principle 9</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900">Data Privacy & Cyber Complaints</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                    BRSR Core Mandatory
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">Complaints received regarding breaches of customer privacy.</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    disabled={!isEsg}
                    value={p9.customerCyberComplaintsCount}
                    onChange={(e) => updatePrincipleData('p9', { customerCyberComplaintsCount: Number(e.target.value) })}
                    className="w-20 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                  />
                  <span className="text-neutral-500 font-medium">Complaints (Zero data breaches)</span>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900">Customer Satisfaction Score</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                    Leadership
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">Independent customer satisfaction survey rating.</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    disabled={!isEsg}
                    value={p9.customerSatisfactionSurveyScore}
                    onChange={(e) => updatePrincipleData('p9', { customerSatisfactionSurveyScore: Number(e.target.value) })}
                    className="w-24 px-3 py-1.5 border border-neutral-300 rounded font-bold tabular-nums bg-white"
                  />
                  <span className="text-neutral-500 font-medium">Out of 100 Index Points</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
