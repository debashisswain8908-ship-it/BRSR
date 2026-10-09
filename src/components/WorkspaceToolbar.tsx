import React, { useState } from 'react';
import { useBrsr } from '../context/BrsrContext';
import { UserRole, ReportStatus } from '../types/brsr';
import { 
  ShieldCheck, 
  UserCheck, 
  Calendar, 
  Lock, 
  RotateCcw, 
  UploadCloud, 
  Database,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';

const ROLE_DETAILS: Record<UserRole, { label: string; department: string; desc: string }> = {
  esg_lead: {
    label: 'ESG Lead / Admin',
    department: 'Sustainability Secretariat',
    desc: 'Full editing access across all sections, assignees, and submission workflows.',
  },
  finance: {
    label: 'Finance Team',
    department: 'Corporate Accounts & Treasury',
    desc: 'Can edit Turnover, Capital Allocation, CSR 2% spend, and Procurement numbers.',
  },
  hr: {
    label: 'HR & People Team',
    department: 'Human Resources & Safety',
    desc: 'Authorized to update permanent/contractual workforce, diversity %, wages, POSH, and safety.',
  },
  operations: {
    label: 'Operations & EHS Team',
    department: 'Plant Operations & Environmental Health',
    desc: 'Authorized to log energy, Scope 1/2 GHG emissions, water withdrawal, and waste recycling.',
  },
  auditor: {
    label: 'Statutory Auditor (KPMG)',
    department: 'Third-Party Assurance',
    desc: 'View-only with authority to add assurance comments, verify evidence, and stamp BRSR Core.',
  },
  board: {
    label: 'Board / Management',
    department: 'CSR & ESG Board Committee',
    desc: 'High-level executive review with authority to grant final approval for SEBI submission.',
  },
};

export const WorkspaceToolbar: React.FC = () => {
  const {
    report,
    activeRole,
    setActiveRole,
    reportingYear,
    setReportingYear,
    setReportStatus,
    resetToDefaults,
    exportJsonBackup,
    importJsonBackup,
  } = useBrsr();

  const [showRoleInfo, setShowRoleInfo] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const success = importJsonBackup(text);
        if (success) {
          alert('BRSR Data Snapshot imported successfully.');
        } else {
          alert('Invalid BRSR JSON schema.');
        }
      };
      reader.readAsText(file);
    }
  };

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case 'Draft': return 'bg-neutral-100 text-neutral-700 border-neutral-300';
      case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Under Review': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Auditor Assured': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Board Approved': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Submitted to SEBI/Stock Exchanges': return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold';
      default: return 'bg-neutral-100 text-neutral-700 border-neutral-300';
    }
  };

  return (
    <div className="bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Left: Entity & Year Context */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-neutral-200 shadow-xs">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <label htmlFor="reporting-year-select" className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Reporting Year:</label>
              <select
                id="reporting-year-select"
                value={reportingYear}
                onChange={(e) => setReportingYear(e.target.value)}
                className="text-xs font-semibold text-neutral-900 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="FY 2025-26">FY 2025-26 (Current Period)</option>
                <option value="FY 2024-25">FY 2024-25 (Audited Past Year)</option>
                <option value="FY 2023-24">FY 2023-24 (Historical Baseline)</option>
              </select>
            </div>

            {/* Workflow Status */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowStatusModal(true)}
                className={`text-xs px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-colors cursor-pointer ${getStatusColor(report.status)}`}
                title="Click to advance or change submission status"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Workflow: <strong>{report.status}</strong></span>
              </button>
            </div>

            {/* Security Badge */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>SEBI MCA-21 Vault</span>
              <span>·</span>
              <span className="tabular-nums">CIN: {report.sectionA.company.cin}</span>
            </div>
          </div>

          {/* Right: Role-Based Access Switcher & Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Simulated Role Switcher */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-neutral-200 shadow-xs">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <label htmlFor="active-role-select" className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Role:</label>
              <select
                id="active-role-select"
                value={activeRole}
                onChange={(e) => setActiveRole(e.target.value as UserRole)}
                className="text-xs font-medium text-neutral-900 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="esg_lead">ESG Lead / Admin (Full Access)</option>
                <option value="finance">Finance Team (Turnover, CSR, CapEx)</option>
                <option value="hr">HR Team (Workforce, Diversity, POSH)</option>
                <option value="operations">Operations / EHS (Energy, Water, GHG)</option>
                <option value="auditor">Statutory Auditor (View & Assure)</option>
                <option value="board">Board / Director (Sign-off & Approve)</option>
              </select>
              <button
                onClick={() => setShowRoleInfo(!showRoleInfo)}
                className="text-xs text-neutral-400 hover:text-neutral-700 cursor-pointer p-0.5"
                title="View role permissions"
              >
                ⓘ
              </button>
            </div>

            {/* Quick Actions: Snapshot & Reset */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-neutral-200">
              <button
                onClick={exportJsonBackup}
                title="Download JSON Snapshot"
                className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors cursor-pointer"
              >
                <Database className="w-3.5 h-3.5" />
              </button>

              <label
                title="Upload JSON Backup"
                className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors cursor-pointer"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              </label>

              <button
                onClick={() => {
                  if (confirm('Reset all values to default reference disclosures?')) {
                    resetToDefaults();
                  }
                }}
                title="Reset to default company baseline"
                className="p-1.5 text-neutral-600 hover:text-amber-700 hover:bg-neutral-100 rounded transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Role explanation drawer if active */}
        {showRoleInfo && (
          <div className="mt-3 p-3 bg-white rounded-lg border border-neutral-200 text-xs text-neutral-600 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-neutral-900">
                Active Role: {ROLE_DETAILS[activeRole].label} ({ROLE_DETAILS[activeRole].department})
              </p>
              <p className="mt-0.5 text-neutral-600">
                {ROLE_DETAILS[activeRole].desc}
              </p>
            </div>
            <button
              onClick={() => setShowRoleInfo(false)}
              className="text-neutral-400 hover:text-neutral-700 font-semibold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Status Transition Dialog */}
        {showStatusModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-neutral-200">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <h3 className="text-base font-bold text-neutral-900">BRSR Regulatory Filing Workflow</h3>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="text-neutral-400 hover:text-neutral-600 text-sm font-semibold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <p className="text-neutral-600 mb-3">
                  Current Stage: <strong className="text-neutral-900">{report.status}</strong>. Select the next statutory workflow stage:
                </p>

                {(['Draft', 'In Progress', 'Under Review', 'Auditor Assured', 'Board Approved', 'Submitted to SEBI/Stock Exchanges'] as ReportStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setReportStatus(st);
                      setShowStatusModal(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg border flex items-center justify-between transition-colors cursor-pointer ${
                      report.status === st 
                        ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-900' 
                        : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <div>
                      <p className="font-semibold">{st}</p>
                      <p className="text-[11px] text-neutral-500">
                        {st === 'Draft' && 'Initial preparation and quantitative entry'}
                        {st === 'In Progress' && 'Departmental inputs from Finance, HR and Operations'}
                        {st === 'Under Review' && 'Internal ESG committee review and cross-field validation'}
                        {st === 'Auditor Assured' && 'Third-party assurance on BRSR Core 9 KPIs completed'}
                        {st === 'Board Approved' && 'Formal resolution passed by the Board of Directors'}
                        {st === 'Submitted to SEBI/Stock Exchanges' && 'Final statutory annual disclosure published with MCA'}
                      </p>
                    </div>
                    {report.status === st && <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
