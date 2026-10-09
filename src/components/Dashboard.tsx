import React from 'react';
import { useBrsr } from '../context/BrsrContext';
import { 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Droplet, 
  Recycle, 
  Users, 
  ArrowRight,
  ShieldCheck,
  FileText,
  AlertCircle
} from 'lucide-react';

interface DashboardProps {
  onNavigateTab: (tab: string, subSection?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigateTab }) => {
  const { report, calculatedMetrics, completionStats, validationErrors } = useBrsr();
  const comp = report.sectionA.company;

  const errorsList = validationErrors.filter(e => e.severity === 'error');
  const warningsList = validationErrors.filter(e => e.severity === 'warning');

  return (
    <div className="space-y-6">
      
      {/* 1. Company Profile Hero Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-6 border-b border-neutral-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-800" />
              <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
                {comp.name}
              </h1>
            </div>
            <p className="text-xs text-neutral-500">
              CIN: <span className="font-mono text-neutral-700 font-semibold">{comp.cin}</span> · Sector: <span className="text-neutral-700 font-medium">{comp.industrySector}</span> · Incorporated: <span className="tabular-nums text-neutral-700 font-medium">{comp.yearOfIncorporation}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="text-right">
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">Reporting Boundary</p>
              <p className="text-sm font-semibold text-neutral-800">{comp.reportingBoundary}</p>
            </div>
            <div className="h-8 w-px bg-neutral-200 mx-1 hidden sm:block" />
            <div className="text-right">
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">Turnover (FY)</p>
              <p className="text-sm font-bold text-neutral-900 tabular-nums">
                ₹{comp.turnoverCrores.toLocaleString('en-IN', { minimumFractionDigits: 2 })} Cr
              </p>
            </div>
          </div>
        </div>

        {/* Quick Profile Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-xs">
          <div>
            <span className="text-neutral-400 block font-medium">Stock Exchanges</span>
            <span className="font-semibold text-neutral-800">{comp.stockExchanges.join(', ')}</span>
          </div>
          <div>
            <span className="text-neutral-400 block font-medium">Designated BRSR Officer</span>
            <span className="font-semibold text-neutral-800">{comp.brsrOfficerName}</span>
            <span className="text-[11px] text-neutral-500 block truncate">{comp.brsrOfficerDesignation}</span>
          </div>
          <div>
            <span className="text-neutral-400 block font-medium">Paid-Up Capital</span>
            <span className="font-semibold text-neutral-800 tabular-nums">₹{comp.paidUpCapitalCrores} Cr</span>
          </div>
          <div>
            <span className="text-neutral-400 block font-medium">Corporate Office</span>
            <span className="font-semibold text-neutral-800 truncate block" title={comp.corporateOffice}>{comp.corporateOffice}</span>
          </div>
        </div>
      </div>

      {/* 2. Overall Reporting Completion Meter & Section Breakdown */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-neutral-900">BRSR Regulatory Disclosure Completion</h2>
            <p className="text-xs text-neutral-500">
              SEBI Circular SEBI/HO/CFD/CMD-2/P/CIR/2021/562 & BRSR Core Compliance Tracking
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-emerald-800 tabular-nums">
              {completionStats.overallPercent}%
            </span>
            <span className="text-xs text-neutral-500 block font-medium">Overall Preparedness</span>
          </div>
        </div>

        {/* Primary progress bar */}
        <div className="w-full bg-neutral-100 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-emerald-700 h-full rounded-full transition-all duration-500"
            style={{ width: `${completionStats.overallPercent}%` }}
          />
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
          
          <button
            onClick={() => onNavigateTab('disclosures', 'sectionA')}
            className="text-left p-3.5 rounded-lg border border-neutral-200 hover:border-emerald-600 hover:bg-neutral-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-neutral-700">Section A</span>
              <span className="font-mono font-bold text-neutral-900 tabular-nums">{completionStats.sectionAPercent}%</span>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium">General Disclosures</p>
            <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-2.5">
              <div className="bg-neutral-800 h-full rounded-full" style={{ width: `${completionStats.sectionAPercent}%` }} />
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('disclosures', 'sectionB')}
            className="text-left p-3.5 rounded-lg border border-neutral-200 hover:border-emerald-600 hover:bg-neutral-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-neutral-700">Section B</span>
              <span className="font-mono font-bold text-neutral-900 tabular-nums">{completionStats.sectionBPercent}%</span>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium">Management & Process</p>
            <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-2.5">
              <div className="bg-neutral-800 h-full rounded-full" style={{ width: `${completionStats.sectionBPercent}%` }} />
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('disclosures', 'sectionC')}
            className="text-left p-3.5 rounded-lg border border-neutral-200 hover:border-emerald-600 hover:bg-neutral-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-neutral-700">Section C</span>
              <span className="font-mono font-bold text-neutral-900 tabular-nums">{completionStats.sectionCPercent}%</span>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium">Principle Performance (P1-P9)</p>
            <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-2.5">
              <div className="bg-neutral-800 h-full rounded-full" style={{ width: `${completionStats.sectionCPercent}%` }} />
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('brsr_core')}
            className="text-left p-3.5 rounded-lg border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-emerald-900">BRSR Core</span>
              <span className="font-mono font-bold text-emerald-900 tabular-nums">{completionStats.brsrCorePercent}%</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-medium">9 Assurance KPIs (SEBI)</p>
            <div className="w-full bg-emerald-200 rounded-full h-1.5 mt-2.5">
              <div className="bg-emerald-700 h-full rounded-full" style={{ width: `${completionStats.brsrCorePercent}%` }} />
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('value_chain')}
            className="text-left p-3.5 rounded-lg border border-neutral-200 hover:border-emerald-600 hover:bg-neutral-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-neutral-700">Value Chain</span>
              <span className="font-mono font-bold text-neutral-900 tabular-nums">{completionStats.valueChainPercent}%</span>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium">Tier-1 Suppliers & MSMEs</p>
            <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-2.5">
              <div className="bg-neutral-800 h-full rounded-full" style={{ width: `${completionStats.valueChainPercent}%` }} />
            </div>
          </button>

        </div>
      </div>

      {/* 3. Auto-Calculated ESG Intensity Metrics (BRSR Statutory Formulae) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-neutral-900">Statutory Intensity & Performance KPIs</h2>
            <p className="text-xs text-neutral-500">
              Automatically calculated using SEBI formulas normalized against Turnover (₹{comp.turnoverCrores} Cr)
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Auto-Calculated Engine Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Tile 1: GHG Intensity */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">GHG Intensity</span>
              <TrendingUp className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
                {calculatedMetrics.ghgIntensityPerCrore}
              </span>
              <span className="text-xs text-neutral-500 ml-1">MT CO2e / ₹ Cr</span>
            </div>
            <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
              <span>Total Scope 1+2: <strong className="tabular-nums font-mono">{calculatedMetrics.totalScope1And2MTCO2e.toLocaleString('en-IN')} MT</strong></span>
              <button onClick={() => onNavigateTab('disclosures', 'p6')} className="text-emerald-700 hover:underline font-medium">
                P6 Data →
              </button>
            </div>
          </div>

          {/* Tile 2: Energy Intensity */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Energy Intensity</span>
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
                {calculatedMetrics.energyIntensityPerCrore}
              </span>
              <span className="text-xs text-neutral-500 ml-1">GJ / ₹ Cr</span>
            </div>
            <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
              <span>Renewable Share: <strong className="tabular-nums font-mono text-emerald-800">{calculatedMetrics.renewableSharePercent}%</strong></span>
              <span className="tabular-nums">{calculatedMetrics.totalEnergyGJ.toLocaleString('en-IN')} GJ Total</span>
            </div>
          </div>

          {/* Tile 3: Water Intensity */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Water Intensity</span>
              <Droplet className="w-4 h-4 text-sky-600" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
                {calculatedMetrics.waterIntensityPerCrore}
              </span>
              <span className="text-xs text-neutral-500 ml-1">KL / ₹ Cr</span>
            </div>
            <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
              <span>Recycled / Reused: <strong className="tabular-nums font-mono">{calculatedMetrics.waterRecycledPercent}%</strong></span>
              <span>{report.sectionC.p6.zeroLiquidDischargeOperating ? 'ZLD Operating' : 'Non-ZLD'}</span>
            </div>
          </div>

          {/* Tile 4: Waste Circularity */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Waste Recycled</span>
              <Recycle className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
                {calculatedMetrics.wasteRecycledPercent}%
              </span>
              <span className="text-xs text-neutral-500 ml-1">Circularity Ratio</span>
            </div>
            <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
              <span>Total Waste: <strong className="tabular-nums font-mono">{calculatedMetrics.totalWasteGeneratedMT} MT</strong></span>
              <span className="tabular-nums">Intensity: {calculatedMetrics.wasteIntensityPerCrore} MT/Cr</span>
            </div>
          </div>

          {/* Tile 5: Gender Diversity & Equity */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Gender Diversity</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
                {calculatedMetrics.genderDiversityEmployeePercent}%
              </span>
              <span className="text-xs text-neutral-500 ml-1">Female Employees</span>
            </div>
            <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
              <span>Female Wage Share: <strong className="tabular-nums font-mono">{calculatedMetrics.femaleWageSharePercent}%</strong></span>
              <span className="tabular-nums">Ratio: {report.sectionA.employees.medianRemunerationRatioMaleToFemale}</span>
            </div>
          </div>

          {/* Tile 6: MSME Sourcing & Compliance */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">MSME Sourcing & Dues</span>
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
                {calculatedMetrics.msmeProcurementSharePercent}%
              </span>
              <span className="text-xs text-neutral-500 ml-1">Procurement Spend</span>
            </div>
            <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
              <span>Avg MSME Payment: <strong className={`tabular-nums font-mono ${report.valueChain.averagePaymentDaysToMSME > 45 ? 'text-amber-700' : 'text-emerald-800'}`}>{report.valueChain.averagePaymentDaysToMSME} Days</strong></span>
              <span>Statutory Max: 45d</span>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Split Grid: Validation Engine vs Pending Disclosures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Validation Engine Panel */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-neutral-900">Pre-Filing Data Validation Engine</h3>
            </div>
            <span className="text-xs text-neutral-500 tabular-nums">
              {errorsList.length} Errors · {warningsList.length} Warnings
            </span>
          </div>

          <div className="mt-4 space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {validationErrors.length === 0 ? (
              <div className="p-4 bg-emerald-50 rounded-lg text-emerald-900 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>All SEBI unit checks, cross-field integrity checks, and mathematical rules passed successfully!</span>
              </div>
            ) : (
              validationErrors.map((err) => (
                <div 
                  key={err.id} 
                  className={`p-3 rounded-lg border text-xs flex items-start justify-between gap-3 ${
                    err.severity === 'error' 
                      ? 'border-red-200 bg-red-50/50 text-red-900' 
                      : 'border-amber-200 bg-amber-50/40 text-amber-900'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        err.severity === 'error' ? 'bg-red-200 text-red-900' : 'bg-amber-200 text-amber-900'
                      }`}>
                        {err.severity}
                      </span>
                      <span className="font-semibold text-neutral-900">{err.fieldName}</span>
                      <span className="text-neutral-400">· {err.section}</span>
                    </div>
                    <p className="text-neutral-700 text-[11px] leading-relaxed">{err.message}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (err.section.includes('Section A')) onNavigateTab('disclosures', 'sectionA');
                      else if (err.section.includes('Section B')) onNavigateTab('disclosures', 'sectionB');
                      else if (err.section.includes('Section C')) onNavigateTab('disclosures', 'sectionC');
                      else if (err.section.includes('Value Chain')) onNavigateTab('value_chain');
                      else onNavigateTab('brsr_core');
                    }}
                    className="text-xs text-neutral-700 hover:text-emerald-800 font-semibold shrink-0 cursor-pointer p-1"
                  >
                    Resolve →
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Disclosures & Assurance Milestones */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-800" />
              <h3 className="text-sm font-bold text-neutral-900">Pending Disclosures & Assurance Milestones</h3>
            </div>
            <span className="text-xs text-neutral-500 tabular-nums">
              {completionStats.pendingDisclosuresCount} Action Items
            </span>
          </div>

          <div className="mt-4 space-y-2.5 max-h-72 overflow-y-auto pr-1 text-xs">
            
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-neutral-800">Assurance Report Verification</span>
                <p className="text-[11px] text-neutral-500">Attach KPMG reasonable assurance statement on BRSR Core</p>
              </div>
              <button 
                onClick={() => onNavigateTab('evidence_audit')}
                className="text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
              >
                Vault →
              </button>
            </div>

            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-neutral-800">Principle 2: Life Cycle Assessment (LCA)</span>
                <p className="text-[11px] text-neutral-500">64% of turnover covered; verify top product certifications</p>
              </div>
              <button 
                onClick={() => onNavigateTab('disclosures', 'p2')}
                className="text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
              >
                View P2 →
              </button>
            </div>

            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-neutral-800">Value Chain Code of Conduct</span>
                <p className="text-[11px] text-neutral-500">78.5% Tier-1 suppliers audited; target is 85% for FY26</p>
              </div>
              <button 
                onClick={() => onNavigateTab('value_chain')}
                className="text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
              >
                Suppliers →
              </button>
            </div>

            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-neutral-800">Board CSR Committee Resolution</span>
                <p className="text-[11px] text-neutral-500">Requires formal digital sign-off by Board / Director role</p>
              </div>
              <button 
                onClick={() => onNavigateTab('disclosures', 'sectionB')}
                className="text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
              >
                Sec B →
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
