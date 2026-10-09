import { FullBrsrReport } from '../types/brsr';

export interface CalculatedMetrics {
  totalEnergyGJ: number;
  renewableSharePercent: number;
  energyIntensityPerCrore: number;
  totalScope1And2MTCO2e: number;
  ghgIntensityPerCrore: number;
  totalWaterWithdrawalKL: number;
  waterIntensityPerCrore: number;
  waterRecycledPercent: number;
  totalWasteGeneratedMT: number;
  wasteRecycledPercent: number;
  wasteIntensityPerCrore: number;
  genderDiversityEmployeePercent: number;
  genderDiversityWorkerPercent: number;
  femaleWageSharePercent: number;
  csrPrescribedCrores: number;
  csrDeficitOrSurplusCrores: number;
  msmeProcurementSharePercent: number;
}

export function computeCalculatedMetrics(report: FullBrsrReport): CalculatedMetrics {
  const turnover = report.sectionA.company.turnoverCrores > 0 ? report.sectionA.company.turnoverCrores : 1;
  const p6 = report.sectionC.p6;
  const emp = report.sectionA.employees;
  const csr = report.sectionA.csr;
  const vc = report.valueChain;

  // Energy
  const totalEnergyGJ = Number((p6.renewableEnergyGJ + p6.nonRenewableEnergyGJ).toFixed(2));
  const renewableSharePercent = totalEnergyGJ > 0 
    ? Number(((p6.renewableEnergyGJ / totalEnergyGJ) * 100).toFixed(2)) 
    : 0;
  const energyIntensityPerCrore = Number((totalEnergyGJ / turnover).toFixed(3));

  // GHG
  const totalScope1And2MTCO2e = Number((p6.scope1EmissionsMTCO2e + p6.scope2EmissionsMTCO2e).toFixed(2));
  const ghgIntensityPerCrore = Number((totalScope1And2MTCO2e / turnover).toFixed(3));

  // Water
  const totalWaterWithdrawalKL = Number(
    (p6.waterWithdrawalSurfaceKL + p6.waterWithdrawalGroundKL + p6.waterWithdrawalMunicipalKL + p6.waterWithdrawalRecycledKL).toFixed(2)
  );
  const waterIntensityPerCrore = Number((totalWaterWithdrawalKL / turnover).toFixed(3));
  const waterRecycledPercent = totalWaterWithdrawalKL > 0 
    ? Number(((p6.waterWithdrawalRecycledKL / totalWaterWithdrawalKL) * 100).toFixed(2)) 
    : 0;

  // Waste
  const totalWasteGeneratedMT = Number(
    (p6.hazardousWasteGeneratedMT + p6.nonHazardousWasteGeneratedMT + p6.plasticWasteGeneratedMT + p6.eWasteGeneratedMT).toFixed(2)
  );
  const wasteRecycledPercent = totalWasteGeneratedMT > 0 
    ? Number(((p6.wasteRecycledOrReusedMT / totalWasteGeneratedMT) * 100).toFixed(2)) 
    : 0;
  const wasteIntensityPerCrore = Number((totalWasteGeneratedMT / turnover).toFixed(3));

  // Employees & Diversity
  const totalPerm = emp.totalPermanentEmployees > 0 ? emp.totalPermanentEmployees : 1;
  const genderDiversityEmployeePercent = Number(((emp.femalePermanentEmployees / totalPerm) * 100).toFixed(2));

  const totalWorkers = emp.totalPermanentWorkers > 0 ? emp.totalPermanentWorkers : 1;
  const genderDiversityWorkerPercent = Number(((emp.femalePermanentWorkers / totalWorkers) * 100).toFixed(2));

  const totalPayroll = emp.totalPayrollCrores > 0 ? emp.totalPayrollCrores : 1;
  const femaleWageSharePercent = Number(((emp.femalePayrollCrores / totalPayroll) * 100).toFixed(2));

  // CSR
  const csrPrescribedCrores = Number(((csr.avgNetProfit3YearsCrores * 0.02)).toFixed(2));
  const csrDeficitOrSurplusCrores = Number((csr.actualCSRSpentCrores - csrPrescribedCrores).toFixed(2));

  // MSME
  const totalProc = vc.totalProcurementSpendCrores > 0 ? vc.totalProcurementSpendCrores : 1;
  const msmeProcurementSharePercent = Number(((vc.msmeSpendCrores / totalProc) * 100).toFixed(2));

  return {
    totalEnergyGJ,
    renewableSharePercent,
    energyIntensityPerCrore,
    totalScope1And2MTCO2e,
    ghgIntensityPerCrore,
    totalWaterWithdrawalKL,
    waterIntensityPerCrore,
    waterRecycledPercent,
    totalWasteGeneratedMT,
    wasteRecycledPercent,
    wasteIntensityPerCrore,
    genderDiversityEmployeePercent,
    genderDiversityWorkerPercent,
    femaleWageSharePercent,
    csrPrescribedCrores,
    csrDeficitOrSurplusCrores,
    msmeProcurementSharePercent,
  };
}

export interface CompletionStats {
  overallPercent: number;
  sectionAPercent: number;
  sectionBPercent: number;
  sectionCPercent: number;
  brsrCorePercent: number;
  valueChainPercent: number;
  totalFieldsCount: number;
  filledFieldsCount: number;
  pendingDisclosuresCount: number;
}

export function computeCompletionStats(report: FullBrsrReport): CompletionStats {
  // Section A items check
  const secAFields = [
    report.sectionA.company.cin,
    report.sectionA.company.name,
    report.sectionA.company.turnoverCrores,
    report.sectionA.company.paidUpCapitalCrores,
    report.sectionA.company.brsrOfficerName,
    report.sectionA.employees.totalPermanentEmployees,
    report.sectionA.employees.femalePermanentEmployees,
    report.sectionA.employees.totalPayrollCrores,
    report.sectionA.employees.femalePayrollCrores,
    report.sectionA.csr.actualCSRSpentCrores,
    report.sectionA.grievances.customerComplaintsReceived !== undefined,
  ];
  const filledA = secAFields.filter(v => v !== '' && v !== null && v !== undefined && v !== 0).length;
  const sectionAPercent = Math.min(100, Math.round((filledA / secAFields.length) * 100));

  // Section B policies check (9 principles)
  const policies = Object.values(report.sectionB.policies);
  const filledB = policies.filter(p => p.hasPolicy && p.approvedByBoard).length;
  const sectionBPercent = Math.min(100, Math.round((filledB / 9) * 100));

  // Section C principles check
  const p1Filled = report.sectionC.p1.kmpCoveredPercent > 0;
  const p2Filled = report.sectionC.p2.rdSpendOnSustainabilityCrores > 0;
  const p3Filled = report.sectionC.p3.healthInsuranceCoverageEmployeesPercent > 0;
  const p4Filled = report.sectionC.p4.keyStakeholdersIdentified.length > 0;
  const p5Filled = report.sectionC.p5.humanRightsPolicyInPlace;
  const p6Filled = report.sectionC.p6.totalEnergyGJ > 0 || report.sectionC.p6.scope1EmissionsMTCO2e > 0;
  const p7Filled = report.sectionC.p7.tradeAssociationMemberships.length > 0;
  const p8Filled = report.sectionC.p8.localProcurementPercent > 0;
  const p9Filled = report.sectionC.p9.customerSatisfactionSurveyScore > 0;

  const cFilledCount = [p1Filled, p2Filled, p3Filled, p4Filled, p5Filled, p6Filled, p7Filled, p8Filled, p9Filled].filter(Boolean).length;
  const sectionCPercent = Math.round((cFilledCount / 9) * 100);

  // BRSR Core items check (9 mandatory attributes)
  const coreChecks = [
    report.sectionC.p6.scope1EmissionsMTCO2e > 0, // 1. GHG
    report.sectionC.p6.waterWithdrawalSurfaceKL > 0 || report.sectionC.p6.waterWithdrawalGroundKL > 0, // 2. Water
    report.sectionC.p6.renewableEnergyGJ > 0 || report.sectionC.p6.nonRenewableEnergyGJ > 0, // 3. Energy
    report.sectionC.p6.wasteRecycledOrReusedMT >= 0, // 4. Waste
    report.sectionC.p3.ltifrScore !== undefined, // 5. Employee Safety
    report.sectionA.employees.femalePermanentEmployees > 0, // 6. Gender diversity
    report.sectionC.p8.msmeProcurementPercent > 0, // 7. Inclusive sourcing
    report.valueChain.averagePaymentDaysToMSME <= 45, // 8. Supplier fairness
    report.sectionB.independentAssurance, // 9. Openness & assurance
  ];
  const brsrCoreFilled = coreChecks.filter(Boolean).length;
  const brsrCorePercent = Math.round((brsrCoreFilled / coreChecks.length) * 100);

  // Value chain
  const vcFilled = report.valueChain.partners.length > 0 && report.valueChain.evaluatedForESGPercent > 0 ? 100 : 50;

  const totalFieldsCount = secAFields.length + 9 + 9 + coreChecks.length;
  const filledFieldsCount = filledA + filledB + cFilledCount + brsrCoreFilled;
  const pendingDisclosuresCount = totalFieldsCount - filledFieldsCount;

  const overallPercent = Math.round(
    (sectionAPercent * 0.25) +
    (sectionBPercent * 0.2) +
    (sectionCPercent * 0.35) +
    (brsrCorePercent * 0.2)
  );

  return {
    overallPercent,
    sectionAPercent,
    sectionBPercent,
    sectionCPercent,
    brsrCorePercent,
    valueChainPercent: vcFilled,
    totalFieldsCount,
    filledFieldsCount,
    pendingDisclosuresCount: Math.max(0, pendingDisclosuresCount),
  };
}
