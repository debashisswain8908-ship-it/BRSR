import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  FullBrsrReport,
  UserRole,
  ReportStatus,
  ValidationError,
  CompanyProfile,
  EmployeeData,
  CSRData,
  GrievanceData,
  PrinciplePolicyStatus,
  SectionCData,
  ValueChainPartner,
  BrsrDocument,
  AuditTrailEntry,
} from '../types/brsr';
import { INITIAL_BRSR_REPORT } from '../data/defaultBrsrData';
import { computeCalculatedMetrics, computeCompletionStats, CalculatedMetrics, CompletionStats } from '../utils/calculations';
import { runBrsrValidations } from '../utils/validation';

interface BrsrContextType {
  report: FullBrsrReport;
  activeRole: UserRole;
  reportingYear: string;
  validationErrors: ValidationError[];
  calculatedMetrics: CalculatedMetrics;
  completionStats: CompletionStats;
  setActiveRole: (role: UserRole) => void;
  setReportingYear: (year: string) => void;
  updateCompany: (company: Partial<CompanyProfile>) => void;
  updateEmployees: (employees: Partial<EmployeeData>) => void;
  updateCSR: (csr: Partial<CSRData>) => void;
  updateGrievances: (grievances: Partial<GrievanceData>) => void;
  updatePolicy: (principleId: number, policy: Partial<PrinciplePolicyStatus>) => void;
  updatePrincipleData: <K extends keyof SectionCData>(principleKey: K, data: Partial<SectionCData[K]>) => void;
  updateValueChainSummary: (summary: { totalTier1SuppliersCount?: number; evaluatedForESGPercent?: number; msmeSpendCrores?: number; averagePaymentDaysToMSME?: number }) => void;
  addValueChainPartner: (partner: Omit<ValueChainPartner, 'id'>) => void;
  removeValueChainPartner: (partnerId: string) => void;
  addDocument: (doc: Omit<BrsrDocument, 'id' | 'uploadedAt'>) => void;
  deleteDocument: (docId: string) => void;
  verifyDocument: (docId: string) => void;
  setReportStatus: (status: ReportStatus) => void;
  canEdit: (sectionCategory: 'company' | 'finance' | 'hr' | 'operations' | 'governance' | 'auditor' | 'board' | 'esg_lead') => boolean;
  resetToDefaults: () => void;
  exportJsonBackup: () => void;
  importJsonBackup: (jsonData: string) => boolean;
}

const BrsrContext = createContext<BrsrContextType | undefined>(undefined);

const STORAGE_KEY = 'sebi_brsr_portal_data_v1';
const ROLE_NAMES: Record<UserRole, string> = {
  esg_lead: 'Dr. Ananya Sen (Chief Sustainability Officer)',
  finance: 'Ramanathan Iyer (Finance Controller)',
  hr: 'Meera Deshmukh (Head HR & People)',
  operations: 'Kailash Joshi (VP Operations & EHS)',
  auditor: 'Rohan Mehta (Statutory ESG Auditor - KPMG)',
  board: 'Rajeshwar Sharma (Independent Director & ESG Chair)',
};

export const BrsrProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [report, setReport] = useState<FullBrsrReport>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_BRSR_REPORT;
  });

  const [activeRole, setActiveRole] = useState<UserRole>('esg_lead');
  const [reportingYear, setReportingYearState] = useState<string>(report.reportingYear);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(report));
    } catch {
      // Storage unavailable or quota exceeded
    }
  }, [report]);

  const addAuditLog = (
    section: string,
    fieldId: string,
    fieldName: string,
    previousValue: string,
    newValue: string,
    action: AuditTrailEntry['action'] = 'edit'
  ) => {
    const newEntry: AuditTrailEntry = {
      id: `at-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST ' + new Date().toLocaleDateString('en-IN'),
      userName: ROLE_NAMES[activeRole],
      userRole: activeRole,
      section,
      fieldId,
      fieldName,
      previousValue: String(previousValue),
      newValue: String(newValue),
      action,
    };

    setReport(prev => ({
      ...prev,
      lastUpdated: new Date().toLocaleDateString('en-IN') + ' ' + new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
      auditTrail: [newEntry, ...prev.auditTrail.slice(0, 99)],
    }));
  };

  const setReportingYear = (year: string) => {
    setReportingYearState(year);
    setReport(prev => ({
      ...prev,
      reportingYear: year,
      sectionA: {
        ...prev.sectionA,
        company: {
          ...prev.sectionA.company,
          reportingYear: year,
        },
      },
    }));
    addAuditLog('System', 'reportingYear', 'Reporting Financial Year', report.reportingYear, year, 'status_change');
  };

  const updateCompany = (companyUpdates: Partial<CompanyProfile>) => {
    setReport(prev => {
      const updated = { ...prev.sectionA.company, ...companyUpdates };
      return {
        ...prev,
        sectionA: {
          ...prev.sectionA,
          company: updated,
        },
      };
    });
    const key = Object.keys(companyUpdates)[0] || 'details';
    addAuditLog('Section A - Company', key, 'Company Information Updated', 'Previous Details', 'Updated Details', 'edit');
  };

  const updateEmployees = (employeeUpdates: Partial<EmployeeData>) => {
    setReport(prev => ({
      ...prev,
      sectionA: {
        ...prev.sectionA,
        employees: {
          ...prev.sectionA.employees,
          ...employeeUpdates,
        },
      },
    }));
    const key = Object.keys(employeeUpdates)[0] || 'data';
    addAuditLog('Section A - Employees', key, 'Employee & Diversity Metrics', 'Previous Figure', 'Updated Figure', 'edit');
  };

  const updateCSR = (csrUpdates: Partial<CSRData>) => {
    setReport(prev => ({
      ...prev,
      sectionA: {
        ...prev.sectionA,
        csr: {
          ...prev.sectionA.csr,
          ...csrUpdates,
        },
      },
    }));
    addAuditLog('Section A - CSR', 'csr', 'CSR Spend & Allocations', 'Prior', 'Updated', 'edit');
  };

  const updateGrievances = (grievanceUpdates: Partial<GrievanceData>) => {
    setReport(prev => ({
      ...prev,
      sectionA: {
        ...prev.sectionA,
        grievances: {
          ...prev.sectionA.grievances,
          ...grievanceUpdates,
        },
      },
    }));
    addAuditLog('Section A - Grievances', 'grievances', 'Stakeholder Grievances Log', 'Prior', 'Updated', 'edit');
  };

  const updatePolicy = (principleId: number, policyUpdates: Partial<PrinciplePolicyStatus>) => {
    setReport(prev => {
      const existing = prev.sectionB.policies[principleId] || {
        hasPolicy: false,
        approvedByBoard: false,
        policyWebLink: '',
        translatedToProcedures: false,
        assignedDirector: '',
        reviewFrequency: 'Annually',
      };
      return {
        ...prev,
        sectionB: {
          ...prev.sectionB,
          policies: {
            ...prev.sectionB.policies,
            [principleId]: {
              ...existing,
              ...policyUpdates,
            },
          },
        },
      };
    });
    addAuditLog('Section B - Policy', `principle_${principleId}`, `Policy for Principle P${principleId}`, 'Prior', 'Updated Policy', 'edit');
  };

  const updatePrincipleData = <K extends keyof SectionCData>(principleKey: K, dataUpdates: Partial<SectionCData[K]>) => {
    setReport(prev => ({
      ...prev,
      sectionC: {
        ...prev.sectionC,
        [principleKey]: {
          ...prev.sectionC[principleKey],
          ...dataUpdates,
        },
      },
    }));
    const key = Object.keys(dataUpdates)[0] || 'data';
    addAuditLog(`Section C - ${principleKey.toUpperCase()}`, key, `Metric updated in ${principleKey.toUpperCase()}`, 'Previous', 'Updated', 'edit');
  };

  const updateValueChainSummary = (summary: { totalTier1SuppliersCount?: number; evaluatedForESGPercent?: number; msmeSpendCrores?: number; averagePaymentDaysToMSME?: number }) => {
    setReport(prev => ({
      ...prev,
      valueChain: {
        ...prev.valueChain,
        ...summary,
      },
    }));
    addAuditLog('Value Chain', 'summary', 'Supplier & Value Chain KPI update', 'Previous', 'Updated', 'edit');
  };

  const addValueChainPartner = (partner: Omit<ValueChainPartner, 'id'>) => {
    const newPartner: ValueChainPartner = {
      ...partner,
      id: `vc-${Date.now()}`,
    };
    setReport(prev => ({
      ...prev,
      valueChain: {
        ...prev.valueChain,
        partners: [newPartner, ...prev.valueChain.partners],
      },
    }));
    addAuditLog('Value Chain', 'partner_add', `Added supplier: ${partner.name}`, '-', partner.name, 'edit');
  };

  const removeValueChainPartner = (partnerId: string) => {
    setReport(prev => ({
      ...prev,
      valueChain: {
        ...prev.valueChain,
        partners: prev.valueChain.partners.filter(p => p.id !== partnerId),
      },
    }));
    addAuditLog('Value Chain', 'partner_remove', 'Removed Tier-1 supplier record', partnerId, 'Removed', 'edit');
  };

  const addDocument = (doc: Omit<BrsrDocument, 'id' | 'uploadedAt'>) => {
    const newDoc: BrsrDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setReport(prev => ({
      ...prev,
      documents: [newDoc, ...prev.documents],
    }));
    addAuditLog('Evidence Vault', 'document_upload', `Uploaded evidence: ${doc.name}`, '-', doc.name, 'document_upload');
  };

  const deleteDocument = (docId: string) => {
    const existing = report.documents.find(d => d.id === docId);
    setReport(prev => ({
      ...prev,
      documents: prev.documents.filter(d => d.id !== docId),
    }));
    addAuditLog('Evidence Vault', 'document_delete', `Removed evidence: ${existing?.name || docId}`, existing?.name || '', 'Deleted', 'edit');
  };

  const verifyDocument = (docId: string) => {
    setReport(prev => ({
      ...prev,
      documents: prev.documents.map(d => (d.id === docId ? { ...d, status: 'Verified' as const } : d)),
    }));
    addAuditLog('Evidence Vault', 'document_verify', 'Auditor verified evidence document', 'Pending', 'Verified', 'verify');
  };

  const setReportStatus = (status: ReportStatus) => {
    const prevStatus = report.status;
    setReport(prev => ({
      ...prev,
      status,
    }));
    addAuditLog('Workflow Status', 'status', 'BRSR Submission Stage Changed', prevStatus, status, 'status_change');
  };

  const canEdit = (sectionCategory: 'company' | 'finance' | 'hr' | 'operations' | 'governance' | 'auditor' | 'board' | 'esg_lead'): boolean => {
    if (activeRole === 'esg_lead') return true; // ESG Lead has universal administrative access
    if (activeRole === 'auditor') return sectionCategory === 'auditor'; // Auditor can only verify/sign
    if (activeRole === 'board') return sectionCategory === 'board'; // Board can only sign-off
    if (activeRole === 'finance') return sectionCategory === 'finance' || sectionCategory === 'company';
    if (activeRole === 'hr') return sectionCategory === 'hr';
    if (activeRole === 'operations') return sectionCategory === 'operations';
    return false;
  };

  const resetToDefaults = () => {
    setReport(INITIAL_BRSR_REPORT);
    setReportingYearState(INITIAL_BRSR_REPORT.reportingYear);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BRSR_REPORT));
    } catch {
      // ignore
    }
  };

  const exportJsonBackup = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SEBI_BRSR_${report.sectionA.company.cin}_${report.reportingYear.replace(' ', '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importJsonBackup = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.sectionA && parsed.sectionB && parsed.sectionC) {
        setReport(parsed);
        setReportingYearState(parsed.reportingYear || 'FY 2025-26');
        return true;
      }
    } catch {
      // invalid
    }
    return false;
  };

  const validationErrors = useMemo(() => runBrsrValidations(report), [report]);
  const calculatedMetrics = useMemo(() => computeCalculatedMetrics(report), [report]);
  const completionStats = useMemo(() => computeCompletionStats(report), [report]);

  return (
    <BrsrContext.Provider
      value={{
        report,
        activeRole,
        reportingYear,
        validationErrors,
        calculatedMetrics,
        completionStats,
        setActiveRole,
        setReportingYear,
        updateCompany,
        updateEmployees,
        updateCSR,
        updateGrievances,
        updatePolicy,
        updatePrincipleData,
        updateValueChainSummary,
        addValueChainPartner,
        removeValueChainPartner,
        addDocument,
        deleteDocument,
        verifyDocument,
        setReportStatus,
        canEdit,
        resetToDefaults,
        exportJsonBackup,
        importJsonBackup,
      }}
    >
      {children}
    </BrsrContext.Provider>
  );
};

export const useBrsr = () => {
  const context = useContext(BrsrContext);
  if (!context) {
    throw new Error('useBrsr must be used within a BrsrProvider');
  }
  return context;
};
