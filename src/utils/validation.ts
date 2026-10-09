import { FullBrsrReport, ValidationError } from '../types/brsr';

export function runBrsrValidations(report: FullBrsrReport): ValidationError[] {
  const errors: ValidationError[] = [];

  // Section A - Company Profile Checks
  const comp = report.sectionA.company;
  if (!comp.cin || comp.cin.trim().length < 10) {
    errors.push({
      id: 'err-cin',
      section: 'Section A',
      fieldId: 'company.cin',
      fieldName: 'Corporate Identity Number (CIN)',
      severity: 'error',
      message: 'Valid 21-character SEBI/MCA Corporate Identity Number (CIN) is mandatory.',
      isEssential: true,
    });
  }

  if (comp.turnoverCrores <= 0) {
    errors.push({
      id: 'err-turnover',
      section: 'Section A',
      fieldId: 'company.turnoverCrores',
      fieldName: 'Total Turnover (INR Crores)',
      severity: 'error',
      message: 'Turnover must be greater than zero for BRSR intensity denominators.',
      isEssential: true,
    });
  }

  if (!comp.brsrOfficerName || comp.brsrOfficerName.trim() === '') {
    errors.push({
      id: 'err-officer',
      section: 'Section A',
      fieldId: 'company.brsrOfficerName',
      fieldName: 'BRSR / Sustainability Officer Name',
      severity: 'warning',
      message: 'Designation and contact of the designated BRSR Officer must be specified.',
      isEssential: true,
    });
  }

  // Section A - Employee & Worker Checks
  const emp = report.sectionA.employees;
  if (emp.totalPermanentEmployees < 0) {
    errors.push({
      id: 'err-emp-neg',
      section: 'Section A',
      fieldId: 'employees.totalPermanentEmployees',
      fieldName: 'Permanent Employees',
      severity: 'error',
      message: 'Employee count cannot be negative.',
      isEssential: true,
    });
  }

  if (emp.femalePermanentEmployees > emp.totalPermanentEmployees) {
    errors.push({
      id: 'err-female-emp-exceed',
      section: 'Section A',
      fieldId: 'employees.femalePermanentEmployees',
      fieldName: 'Female Permanent Employees',
      severity: 'error',
      message: 'Female employee count cannot exceed total permanent employees.',
      isEssential: true,
    });
  }

  if (emp.femalePayrollCrores > emp.totalPayrollCrores) {
    errors.push({
      id: 'err-female-payroll-exceed',
      section: 'Section A',
      fieldId: 'employees.femalePayrollCrores',
      fieldName: 'Female Employee Payroll',
      severity: 'error',
      message: 'Female payroll cannot exceed total payroll expenditure.',
      isEssential: true,
    });
  }

  if (emp.employeeTurnoverRatePercent > 100 || emp.employeeTurnoverRatePercent < 0) {
    errors.push({
      id: 'err-turnover-rate',
      section: 'Section A',
      fieldId: 'employees.employeeTurnoverRatePercent',
      fieldName: 'Employee Turnover Rate (%)',
      severity: 'error',
      message: 'Turnover rate percentage must be between 0% and 100%.',
      isEssential: false,
    });
  }

  // Section B - Governance & Assurance
  const secB = report.sectionB;
  const missingPolicies: number[] = [];
  for (let p = 1; p <= 9; p++) {
    if (!secB.policies[p] || !secB.policies[p].hasPolicy) {
      missingPolicies.push(p);
    }
  }

  if (missingPolicies.length > 0) {
    errors.push({
      id: 'err-missing-policies',
      section: 'Section B',
      fieldId: 'policies',
      fieldName: 'NGRBC Principle Policies',
      severity: 'warning',
      message: `Entity is missing documented policies for NGRBC Principle(s): ${missingPolicies.map(p => `P${p}`).join(', ')}.`,
      isEssential: true,
    });
  }

  if (!secB.independentAssurance) {
    errors.push({
      id: 'err-assurance',
      section: 'Section B',
      fieldId: 'independentAssurance',
      fieldName: 'BRSR Core Independent Assurance',
      severity: 'warning',
      message: 'Top 1000 listed entities are mandated by SEBI to obtain independent assurance on BRSR Core.',
      isEssential: true,
    });
  }

  // Section C - Principle 1 (Ethics)
  const p1 = report.sectionC.p1;
  if (p1.kmpCoveredPercent < 100) {
    errors.push({
      id: 'warn-p1-kmp',
      section: 'Section C',
      fieldId: 'p1.kmpCoveredPercent',
      fieldName: 'Anti-Corruption Coverage of KMP (%)',
      severity: 'warning',
      message: '100% coverage of Key Managerial Personnel (KMPs) in anti-corruption code is expected.',
      isEssential: true,
    });
  }

  // Section C - Principle 3 (Employee Safety)
  const p3 = report.sectionC.p3;
  if (p3.healthInsuranceCoverageEmployeesPercent < 80) {
    errors.push({
      id: 'warn-p3-insurance',
      section: 'Section C',
      fieldId: 'p3.healthInsuranceCoverageEmployeesPercent',
      fieldName: 'Health Insurance Coverage (%)',
      severity: 'warning',
      message: 'Health insurance coverage for employees is below standard industry baseline (80%).',
      isEssential: true,
    });
  }

  // Section C - Principle 5 (Human Rights)
  const p5 = report.sectionC.p5;
  if (p5.minimumWagePaidCompliancePercent < 100) {
    errors.push({
      id: 'err-p5-minimum-wage',
      section: 'Section C',
      fieldId: 'p5.minimumWagePaidCompliancePercent',
      fieldName: 'Statutory Minimum Wage Compliance (%)',
      severity: 'error',
      message: '100% compliance with statutory minimum wages is legally mandated.',
      isEssential: true,
    });
  }

  if (p5.childLaborInstances > 0) {
    errors.push({
      id: 'err-p5-child-labor',
      section: 'Section C',
      fieldId: 'p5.childLaborInstances',
      fieldName: 'Child Labor / Forced Labor Incidents',
      severity: 'error',
      message: 'Incidents of child labor flagged. Requires immediate statutory redressal documentation.',
      isEssential: true,
    });
  }

  // Section C - Principle 6 (Environment & BRSR Core)
  const p6 = report.sectionC.p6;
  if (p6.scope1EmissionsMTCO2e < 0 || p6.scope2EmissionsMTCO2e < 0) {
    errors.push({
      id: 'err-p6-emissions-negative',
      section: 'Section C',
      fieldId: 'p6.scope1EmissionsMTCO2e',
      fieldName: 'Scope 1 & Scope 2 GHG Emissions',
      severity: 'error',
      message: 'Emissions figures cannot be negative.',
      isEssential: true,
    });
  }

  if (p6.renewableEnergyGJ < 0 || p6.nonRenewableEnergyGJ < 0) {
    errors.push({
      id: 'err-p6-energy-negative',
      section: 'Section C',
      fieldId: 'p6.renewableEnergyGJ',
      fieldName: 'Energy Consumption (GJ)',
      severity: 'error',
      message: 'Energy consumption values cannot be negative.',
      isEssential: true,
    });
  }

  const totalWaste = p6.hazardousWasteGeneratedMT + p6.nonHazardousWasteGeneratedMT + p6.plasticWasteGeneratedMT + p6.eWasteGeneratedMT;
  if (p6.wasteRecycledOrReusedMT > totalWaste) {
    errors.push({
      id: 'err-p6-waste-recycled',
      section: 'Section C',
      fieldId: 'p6.wasteRecycledOrReusedMT',
      fieldName: 'Waste Recycled / Reused',
      severity: 'error',
      message: 'Recycled waste cannot exceed total waste generated.',
      isEssential: true,
    });
  }

  // Value Chain Checks
  const vc = report.valueChain;
  if (vc.averagePaymentDaysToMSME > 45) {
    errors.push({
      id: 'warn-vc-msme-payment',
      section: 'Value Chain',
      fieldId: 'valueChain.averagePaymentDaysToMSME',
      fieldName: 'Average Payment Days to MSMEs',
      severity: 'warning',
      message: 'MSMED Act mandates payments to MSMEs within 45 days. Current value exceeds statutory threshold.',
      isEssential: true,
    });
  }

  return errors;
}
