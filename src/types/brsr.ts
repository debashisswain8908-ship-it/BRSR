export type UserRole = 
  | 'esg_lead' 
  | 'finance' 
  | 'hr' 
  | 'operations' 
  | 'auditor' 
  | 'board';

export type ReportStatus = 
  | 'Draft' 
  | 'In Progress' 
  | 'Under Review' 
  | 'Auditor Assured' 
  | 'Board Approved' 
  | 'Submitted to SEBI/Stock Exchanges';

export interface CompanyProfile {
  cin: string;
  name: string;
  reportingYear: string;
  yearOfIncorporation: number;
  registeredOffice: string;
  corporateOffice: string;
  email: string;
  telephone: string;
  website: string;
  financialYearStart: string;
  financialYearEnd: string;
  stockExchanges: string[];
  paidUpCapitalCrores: number;
  turnoverCrores: number;
  netWorthCrores: number;
  reportingBoundary: 'Standalone' | 'Consolidated';
  brsrOfficerName: string;
  brsrOfficerDesignation: string;
  brsrOfficerEmail: string;
  industrySector: string;
}

export interface EmployeeData {
  totalPermanentEmployees: number;
  femalePermanentEmployees: number;
  totalContractualEmployees: number;
  femaleContractualEmployees: number;
  totalPermanentWorkers: number;
  femalePermanentWorkers: number;
  totalContractualWorkers: number;
  femaleContractualWorkers: number;
  differentlyAbledEmployees: number;
  differentlyAbledWorkers: number;
  employeeTurnoverRatePercent: number;
  femaleTurnoverRatePercent: number;
  totalPayrollCrores: number;
  femalePayrollCrores: number;
  medianRemunerationRatioMaleToFemale: number;
}

export interface CSRData {
  avgNetProfit3YearsCrores: number;
  csrObligationPercent: number; // 2%
  prescribedCSRAmountCrores: number;
  actualCSRSpentCrores: number;
  spentInAspirationalDistrictsCrores: number;
  csrProjectsCount: number;
}

export interface GrievanceData {
  investorComplaintsReceived: number;
  investorComplaintsResolved: number;
  workerComplaintsReceived: number;
  workerComplaintsResolved: number;
  customerComplaintsReceived: number;
  customerComplaintsResolved: number;
  poshComplaintsReceived: number;
  poshComplaintsResolved: number;
}

export interface SectionAData {
  company: CompanyProfile;
  employees: EmployeeData;
  csr: CSRData;
  grievances: GrievanceData;
  topProducts: Array<{
    name: string;
    nicCode: string;
    turnoverSharePercent: number;
  }>;
  operationalLocations: {
    nationalPlants: number;
    nationalOffices: number;
    internationalPlants: number;
    internationalOffices: number;
  };
}

export interface PrinciplePolicyStatus {
  hasPolicy: boolean;
  approvedByBoard: boolean;
  policyWebLink: string;
  translatedToProcedures: boolean;
  assignedDirector: string;
  reviewFrequency: 'Quarterly' | 'Half-Yearly' | 'Annually';
}

export interface SectionBData {
  directorResponsible: string;
  directorDin: string;
  governanceCommittee: string;
  policies: Record<number, PrinciplePolicyStatus>; // Principles 1-9
  independentAssurance: boolean;
  assuranceProvider: string;
  assuranceScope: 'BRSR Core' | 'Comprehensive BRSR' | 'None';
  assuranceStandard: string;
}

export interface Principle1Data {
  // Ethics, Transparency & Accountability
  disciplinaryActionsFined: number;
  antiCorruptionTrainingsConducted: number;
  kmpCoveredPercent: number;
  employeesCoveredPercent: number;
  conflictOfInterestCases: number;
  monetaryPenaltiesIncurredINR: number;
  nonMonetaryPenalties: number;
  whistleblowerComplaintsReceived: number;
  whistleblowerComplaintsResolved: number;
}

export interface Principle2Data {
  // Sustainable Goods & Services
  rdSpendOnSustainabilityCrores: number;
  rdSpendPercentTurnover: number;
  lifeCycleAssessmentConducted: boolean;
  turnoverCoveredByLCAPercent: number;
  recycledMaterialInputPercent: number;
  eprApplicable: boolean;
  eprTargetMetPercent: number;
  reclaimTakeBackProgramInPlace: boolean;
}

export interface Principle3Data {
  // Employee Well-being
  healthInsuranceCoverageEmployeesPercent: number;
  healthInsuranceCoverageWorkersPercent: number;
  accidentInsuranceCoverageEmployeesPercent: number;
  maternityBenefitsCoveredPercent: number;
  paternityBenefitsCoveredPercent: number;
  dayCareFacilitiesAvailable: boolean;
  fatalitiesCount: number;
  highConsequenceInjuriesCount: number;
  ltifrScore: number; // Lost Time Injury Frequency Rate
  safetyTrainingHoursPerEmployee: number;
  poshCommitteesFormed: boolean;
}

export interface Principle4Data {
  // Stakeholder Responsiveness
  vulnerableGroupsConsulted: boolean;
  formalStakeholderConsultationFrequency: 'Quarterly' | 'Half-Yearly' | 'Annually';
  keyStakeholdersIdentified: string[];
  boardInputFromStakeholders: boolean;
}

export interface Principle5Data {
  // Human Rights
  humanRightsPolicyInPlace: boolean;
  employeesTrainedOnHumanRightsPercent: number;
  workersTrainedOnHumanRightsPercent: number;
  minimumWagePaidCompliancePercent: number;
  childLaborInstances: number;
  forcedLaborInstances: number;
  humanRightsDueDiligenceConducted: boolean;
}

export interface Principle6Data {
  // Environment (BRSR Core pillar)
  renewableEnergyGJ: number;
  nonRenewableEnergyGJ: number;
  totalEnergyGJ: number;
  energyIntensityPerCroreTurnover: number; // auto-calculated
  waterWithdrawalSurfaceKL: number;
  waterWithdrawalGroundKL: number;
  waterWithdrawalMunicipalKL: number;
  waterWithdrawalRecycledKL: number;
  totalWaterWithdrawalKL: number;
  waterIntensityPerCroreTurnover: number; // auto-calculated
  waterDischargedKL: number;
  scope1EmissionsMTCO2e: number;
  scope2EmissionsMTCO2e: number;
  totalScope1And2MTCO2e: number;
  ghgIntensityPerCroreTurnover: number; // auto-calculated
  scope3EmissionsMTCO2e: number;
  hazardousWasteGeneratedMT: number;
  nonHazardousWasteGeneratedMT: number;
  plasticWasteGeneratedMT: number;
  eWasteGeneratedMT: number;
  totalWasteGeneratedMT: number;
  wasteRecycledOrReusedMT: number;
  wasteIntensityPerCroreTurnover: number; // auto-calculated
  zeroLiquidDischargeOperating: boolean;
}

export interface Principle7Data {
  // Responsible Policy Advocacy
  tradeAssociationMemberships: string[];
  publicPolicyAdvocacyDocumented: boolean;
  advocacyConductedDirectly: boolean;
}

export interface Principle8Data {
  // Inclusive Growth
  localProcurementPercent: number; // % sourcing within district/state
  msmeProcurementPercent: number; // % sourcing from MSMEs
  socialImpactAssessmentProjects: number;
  rehabilitationResettlementCases: number;
  jobsCreatedTier2Tier3Locations: number;
  aspirationalDistrictBeneficiaries: number;
}

export interface Principle9Data {
  // Consumer Value
  consumerDataBreachesCount: number;
  customerCyberComplaintsCount: number;
  productRecallInstancesVoluntary: number;
  productRecallInstancesMandatory: number;
  ecoLabelingPercentageProducts: number;
  customerSatisfactionSurveyScore: number; // Out of 100
}

export interface SectionCData {
  p1: Principle1Data;
  p2: Principle2Data;
  p3: Principle3Data;
  p4: Principle4Data;
  p5: Principle5Data;
  p6: Principle6Data;
  p7: Principle7Data;
  p8: Principle8Data;
  p9: Principle9Data;
}

export interface ValueChainPartner {
  id: string;
  name: string;
  category: 'Critical Raw Material' | 'Logistics' | 'Packaging' | 'Component Provider';
  annualSpendCrores: number;
  msmeRegistered: boolean;
  codeOfConductSigned: boolean;
  esgAuditCompleted: boolean;
  paymentWithin45Days: boolean;
  scope3Reported: boolean;
  emissionsEstimateMTCO2e: number;
}

export interface ValueChainData {
  totalTier1SuppliersCount: number;
  evaluatedForESGPercent: number;
  totalProcurementSpendCrores: number;
  msmeSpendCrores: number;
  averagePaymentDaysToMSME: number;
  valueChainCodeOfConductAdopted: boolean;
  partners: ValueChainPartner[];
}

export interface BrsrDocument {
  id: string;
  name: string;
  category: 'Policy' | 'Assurance Report' | 'Board Approval' | 'Audit Evidence' | 'Emission Certificate';
  principleTag: string; // e.g. "Section B", "P6 - Environment", "P3 - Safety"
  uploadedBy: string;
  uploadedAt: string;
  fileSize: string;
  status: 'Verified' | 'Pending Review' | 'Flagged';
  notes: string;
}

export interface AuditTrailEntry {
  id: string;
  timestamp: string;
  userName: string;
  userRole: UserRole;
  section: string;
  fieldId: string;
  fieldName: string;
  previousValue: string;
  newValue: string;
  action: 'edit' | 'approval' | 'verify' | 'status_change' | 'document_upload';
}

export interface ValidationError {
  id: string;
  section: 'Section A' | 'Section B' | 'Section C' | 'BRSR Core' | 'Value Chain';
  fieldId: string;
  fieldName: string;
  severity: 'error' | 'warning';
  message: string;
  isEssential: boolean;
}

export interface FullBrsrReport {
  id: string;
  reportingYear: string;
  status: ReportStatus;
  lastUpdated: string;
  sectionA: SectionAData;
  sectionB: SectionBData;
  sectionC: SectionCData;
  valueChain: ValueChainData;
  documents: BrsrDocument[];
  auditTrail: AuditTrailEntry[];
}
