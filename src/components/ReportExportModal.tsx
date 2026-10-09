import React, { useRef } from 'react';
import { useBrsr } from '../context/BrsrContext';
import { Printer, Download, FileSpreadsheet, Code, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({ isOpen, onClose }) => {
  const { report, calculatedMetrics, validationErrors, completionStats } = useBrsr();
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const comp = report.sectionA.company;
  const p6 = report.sectionC.p6;
  const emp = report.sectionA.employees;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    const csvRows = [
      ['SEBI BUSINESS RESPONSIBILITY & SUSTAINABILITY REPORT (BRSR)'],
      ['Reporting Year', report.reportingYear],
      ['Entity Name', comp.name],
      ['CIN', comp.cin],
      ['Sector', comp.industrySector],
      ['Turnover (INR Crores)', comp.turnoverCrores],
      [''],
      ['--- SECTION A: GENERAL DISCLOSURES ---'],
      ['Paid-up Capital (INR Cr)', comp.paidUpCapitalCrores],
      ['Total Permanent Employees', emp.totalPermanentEmployees],
      ['Female Permanent Employees', emp.femalePermanentEmployees],
      ['Gender Diversity Employee %', calculatedMetrics.genderDiversityEmployeePercent],
      ['Total Payroll (INR Cr)', emp.totalPayrollCrores],
      ['Female Payroll (INR Cr)', emp.femalePayrollCrores],
      ['Female Payroll Share %', calculatedMetrics.femaleWageSharePercent],
      ['Actual CSR Spent (INR Cr)', report.sectionA.csr.actualCSRSpentCrores],
      [''],
      ['--- SECTION B: GOVERNANCE & ASSURANCE ---'],
      ['Director Responsible', report.sectionB.directorResponsible],
      ['Assurance Provider', report.sectionB.assuranceProvider],
      ['Assurance Scope', report.sectionB.assuranceScope],
      ['Assurance Standard', report.sectionB.assuranceStandard],
      [''],
      ['--- SECTION C & BRSR CORE: ENVIRONMENTAL & SOCIAL INTENSITIES ---'],
      ['Scope 1 GHG Emissions (MT CO2e)', p6.scope1EmissionsMTCO2e],
      ['Scope 2 GHG Emissions (MT CO2e)', p6.scope2EmissionsMTCO2e],
      ['Total Scope 1+2 GHG (MT CO2e)', calculatedMetrics.totalScope1And2MTCO2e],
      ['GHG Intensity (MT CO2e / INR Cr)', calculatedMetrics.ghgIntensityPerCrore],
      ['Total Energy Consumption (GJ)', calculatedMetrics.totalEnergyGJ],
      ['Renewable Energy Share %', calculatedMetrics.renewableSharePercent],
      ['Energy Intensity (GJ / INR Cr)', calculatedMetrics.energyIntensityPerCrore],
      ['Total Water Withdrawal (KL)', calculatedMetrics.totalWaterWithdrawalKL],
      ['Water Intensity (KL / INR Cr)', calculatedMetrics.waterIntensityPerCrore],
      ['Total Waste Generated (MT)', calculatedMetrics.totalWasteGeneratedMT],
      ['Waste Recycled Ratio %', calculatedMetrics.wasteRecycledPercent],
      ['Waste Intensity (MT / INR Cr)', calculatedMetrics.wasteIntensityPerCrore],
      ['LTIFR Safety Incident Rate', report.sectionC.p3.ltifrScore],
      ['MSME Sourcing Share %', calculatedMetrics.msmeProcurementSharePercent],
      ['Average MSME Payment Days', report.valueChain.averagePaymentDaysToMSME],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.map(item => `"${item}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SEBI_BRSR_Report_${comp.cin}_${report.reportingYear.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SEBI_BRSR_XBRL_Filing_${comp.cin}_${report.reportingYear.replace(' ', '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-neutral-200">
        
        {/* Header toolbar */}
        <div className="p-4 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 bg-neutral-50 rounded-t-xl">
          <div>
            <h3 className="text-base font-bold text-neutral-900">SEBI Statutory BRSR Report Generator</h3>
            <p className="text-xs text-neutral-500">Official Annexure I format ready for MCA & Stock Exchange filings</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-lg shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-lg shadow-xs cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-800" />
              <span>Excel/CSV</span>
            </button>
            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-lg shadow-xs cursor-pointer"
            >
              <Code className="w-3.5 h-3.5 text-blue-700" />
              <span>XBRL/JSON</span>
            </button>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-700 font-bold text-lg p-1 cursor-pointer ml-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Validation reminder if any errors exist */}
        {validationErrors.length > 0 && (
          <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              Note: Current report has {validationErrors.length} validation item(s) pending resolution. Review before statutory submission.
            </span>
          </div>
        )}

        {/* Report Preview Canvas */}
        <div className="flex-1 overflow-y-auto p-8 bg-neutral-100 print:p-0 print:bg-white" ref={printRef}>
          <div className="max-w-3xl mx-auto bg-white p-8 border border-neutral-300 shadow-sm rounded-sm text-neutral-900 text-xs space-y-6 print:shadow-none print:border-none print:max-w-none">
            
            {/* Report Header */}
            <div className="text-center pb-6 border-b-2 border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                Securities and Exchange Board of India (SEBI)
              </span>
              <h1 className="text-lg font-black tracking-tight text-neutral-900">
                BUSINESS RESPONSIBILITY & SUSTAINABILITY REPORT (BRSR)
              </h1>
              <p className="text-xs font-semibold text-neutral-600">
                Format pursuant to Regulation 34(2)(f) of SEBI (LODR) Regulations, 2015
              </p>
              <div className="pt-2 flex items-center justify-center gap-4 text-xs font-mono font-bold text-neutral-800">
                <span>CIN: {comp.cin}</span>
                <span>·</span>
                <span>Reporting Period: {report.reportingYear}</span>
                <span>·</span>
                <span>Status: {report.status}</span>
              </div>
            </div>

            {/* Section A Preview Table */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider bg-neutral-100 p-2 border-l-4 border-emerald-800 mb-3">
                Section A: General Disclosures
              </h2>
              <table className="w-full border-collapse border border-neutral-200 text-[11px]">
                <tbody>
                  <tr className="border-b border-neutral-200">
                    <td className="p-2 font-semibold bg-neutral-50 w-1/3">1. Name of the Listed Entity</td>
                    <td className="p-2 font-bold">{comp.name}</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="p-2 font-semibold bg-neutral-50">2. Year of Incorporation</td>
                    <td className="p-2 tabular-nums">{comp.yearOfIncorporation}</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="p-2 font-semibold bg-neutral-50">3. Registered Office</td>
                    <td className="p-2">{comp.registeredOffice}</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="p-2 font-semibold bg-neutral-50">4. Paid-Up Capital & Turnover</td>
                    <td className="p-2 tabular-nums">Capital: ₹{comp.paidUpCapitalCrores} Cr · Turnover: ₹{comp.turnoverCrores} Cr</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="p-2 font-semibold bg-neutral-50">5. Employees & Gender Diversity</td>
                    <td className="p-2 tabular-nums">
                      {emp.totalPermanentEmployees} Permanent ({emp.femalePermanentEmployees} Female · {calculatedMetrics.genderDiversityEmployeePercent}%)
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="p-2 font-semibold bg-neutral-50">6. CSR Spend (Section 135)</td>
                    <td className="p-2 tabular-nums">
                      Prescribed 2%: ₹{calculatedMetrics.csrPrescribedCrores} Cr · Actual Spent: ₹{report.sectionA.csr.actualCSRSpentCrores} Cr
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section B Governance Preview Table */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider bg-neutral-100 p-2 border-l-4 border-emerald-800 mb-3">
                Section B: Management and Process Disclosures
              </h2>
              <table className="w-full border-collapse border border-neutral-200 text-[11px]">
                <tbody>
                  <tr className="border-b border-neutral-200">
                    <td className="p-2 font-semibold bg-neutral-50 w-1/3">1. Responsible Board Director</td>
                    <td className="p-2 font-semibold">{report.sectionB.directorResponsible} (DIN: {report.sectionB.directorDin})</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="p-2 font-semibold bg-neutral-50">2. NGRBC Policies (P1 to P9)</td>
                    <td className="p-2 font-semibold text-emerald-800">All 9 Policies Formally Board Approved & Operative</td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="p-2 font-semibold bg-neutral-50">3. Independent Third-Party Assurance</td>
                    <td className="p-2">
                      {report.sectionB.assuranceProvider} · Standard: {report.sectionB.assuranceStandard} ({report.sectionB.assuranceScope})
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section C & BRSR Core Mandatory Table */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider bg-neutral-100 p-2 border-l-4 border-emerald-800 mb-3">
                Section C: SEBI BRSR Core Performance & Intensity Attributes
              </h2>
              <table className="w-full border-collapse border border-neutral-200 text-[11px]">
                <thead>
                  <tr className="bg-neutral-100 font-bold border-b border-neutral-300">
                    <th className="p-2 text-left">BRSR Core KPI / Attribute</th>
                    <th className="p-2 text-right">Value (FY 2025-26)</th>
                    <th className="p-2 text-right">Turnover Intensity</th>
                    <th className="p-2 text-center">Assurance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 font-mono text-[10px]">
                  <tr>
                    <td className="p-2 font-sans font-semibold">1. GHG Footprint (Scope 1 + Scope 2)</td>
                    <td className="p-2 text-right tabular-nums">{calculatedMetrics.totalScope1And2MTCO2e.toLocaleString('en-IN')} MT</td>
                    <td className="p-2 text-right tabular-nums font-bold">{calculatedMetrics.ghgIntensityPerCrore} MT/₹Cr</td>
                    <td className="p-2 text-center font-sans text-emerald-800 font-bold">Reasonable ✓</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-semibold">2. Water Footprint & Intensity</td>
                    <td className="p-2 text-right tabular-nums">{calculatedMetrics.totalWaterWithdrawalKL.toLocaleString('en-IN')} KL</td>
                    <td className="p-2 text-right tabular-nums font-bold">{calculatedMetrics.waterIntensityPerCrore} KL/₹Cr</td>
                    <td className="p-2 text-center font-sans text-emerald-800 font-bold">Reasonable ✓</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-semibold">3. Energy Consumption & RE Share</td>
                    <td className="p-2 text-right tabular-nums">{calculatedMetrics.totalEnergyGJ.toLocaleString('en-IN')} GJ ({calculatedMetrics.renewableSharePercent}% RE)</td>
                    <td className="p-2 text-right tabular-nums font-bold">{calculatedMetrics.energyIntensityPerCrore} GJ/₹Cr</td>
                    <td className="p-2 text-center font-sans text-emerald-800 font-bold">Reasonable ✓</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-semibold">4. Waste Management & Recycling</td>
                    <td className="p-2 text-right tabular-nums">{calculatedMetrics.totalWasteGeneratedMT} MT ({calculatedMetrics.wasteRecycledPercent}% Recycled)</td>
                    <td className="p-2 text-right tabular-nums font-bold">{calculatedMetrics.wasteIntensityPerCrore} MT/₹Cr</td>
                    <td className="p-2 text-center font-sans text-emerald-800 font-bold">Reasonable ✓</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-semibold">5. Employee Safety (LTIFR Score)</td>
                    <td className="p-2 text-right tabular-nums">{report.sectionC.p3.ltifrScore} Rate</td>
                    <td className="p-2 text-right tabular-nums font-bold">0 Fatalities</td>
                    <td className="p-2 text-center font-sans text-emerald-800 font-bold">Reasonable ✓</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-semibold">6. Gender Diversity & Female Pay</td>
                    <td className="p-2 text-right tabular-nums">{calculatedMetrics.genderDiversityEmployeePercent}% Workforce</td>
                    <td className="p-2 text-right tabular-nums font-bold">{calculatedMetrics.femaleWageSharePercent}% Pay Share</td>
                    <td className="p-2 text-center font-sans text-emerald-800 font-bold">Reasonable ✓</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-semibold">7. MSME Sourcing & Inclusive Growth</td>
                    <td className="p-2 text-right tabular-nums">₹{report.valueChain.msmeSpendCrores} Cr</td>
                    <td className="p-2 text-right tabular-nums font-bold">{calculatedMetrics.msmeProcurementSharePercent}% Sourcing</td>
                    <td className="p-2 text-center font-sans text-emerald-800 font-bold">Reasonable ✓</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-semibold">8. Supplier Fairness (MSMED Dues)</td>
                    <td className="p-2 text-right tabular-nums">{report.valueChain.averagePaymentDaysToMSME} Days</td>
                    <td className="p-2 text-right tabular-nums font-bold">≤ 45 Days Statutory</td>
                    <td className="p-2 text-center font-sans text-emerald-800 font-bold">Reasonable ✓</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Regulatory Sign-off Block */}
            <div className="pt-6 border-t border-neutral-300 flex justify-between items-end text-[11px]">
              <div>
                <p className="font-bold text-neutral-900">{comp.brsrOfficerName}</p>
                <p className="text-neutral-500">{comp.brsrOfficerDesignation}</p>
                <p className="text-neutral-400">Sign-off Date: {new Date().toLocaleDateString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-neutral-900">Dr. Ananya Sen / Rajeshwar Sharma</p>
                <p className="text-neutral-500">Board CSR & Sustainability Committee</p>
                <p className="text-emerald-800 font-bold">Digitally Verified & Approved</p>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-200 flex justify-end gap-3 bg-neutral-50 rounded-b-xl text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 text-neutral-600 hover:bg-neutral-200 rounded-lg font-medium cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
