import React from 'react';
import { useBrsr } from '../context/BrsrContext';
import { Building2, Users, HeartHandshake, ShieldAlert, MapPin, Briefcase } from 'lucide-react';

export const SectionA: React.FC = () => {
  const { report, updateCompany, updateEmployees, updateCSR, updateGrievances, canEdit, calculatedMetrics } = useBrsr();
  const comp = report.sectionA.company;
  const emp = report.sectionA.employees;
  const csr = report.sectionA.csr;
  const griev = report.sectionA.grievances;

  const isFinance = canEdit('finance');
  const isHr = canEdit('hr');
  const isCompany = canEdit('company');

  return (
    <div className="space-y-6">
      
      {/* Sub-header */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="w-5 h-5 text-emerald-800" />
          <h2 className="text-base font-bold text-neutral-900">Section A: General Disclosures</h2>
        </div>
        <p className="text-xs text-neutral-500">
          Statutory profile of the entity, operations, employees, corporate social responsibility, and stakeholder grievance redressal mechanism.
        </p>
      </div>

      {/* Part I: Details of Listed Entity */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-neutral-900 pb-3 border-b border-neutral-100 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-emerald-700" />
          <span>I. Details of the Listed Entity</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
          
          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Corporate Identity Number (CIN) *</label>
            <input
              type="text"
              disabled={!isCompany}
              value={comp.cin}
              onChange={(e) => updateCompany({ cin: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none font-mono disabled:bg-neutral-100"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Name of the Entity *</label>
            <input
              type="text"
              disabled={!isCompany}
              value={comp.name}
              onChange={(e) => updateCompany({ name: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none font-medium disabled:bg-neutral-100"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Year of Incorporation</label>
            <input
              type="number"
              disabled={!isCompany}
              value={comp.yearOfIncorporation}
              onChange={(e) => updateCompany({ yearOfIncorporation: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Total Turnover (INR Crores) *</label>
            <input
              type="number"
              step="0.01"
              disabled={!isFinance}
              value={comp.turnoverCrores}
              onChange={(e) => updateCompany({ turnoverCrores: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 font-bold tabular-nums"
            />
            <span className="text-[10px] text-neutral-400 mt-0.5 block">Denominator for all BRSR intensities</span>
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Paid-Up Capital (INR Crores)</label>
            <input
              type="number"
              step="0.01"
              disabled={!isFinance}
              value={comp.paidUpCapitalCrores}
              onChange={(e) => updateCompany({ paidUpCapitalCrores: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Reporting Boundary</label>
            <select
              disabled={!isCompany}
              value={comp.reportingBoundary}
              onChange={(e) => updateCompany({ reportingBoundary: e.target.value as 'Standalone' | 'Consolidated' })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100"
            >
              <option value="Consolidated">Consolidated (Entity + Subsidiaries)</option>
              <option value="Standalone">Standalone (Entity Only)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-neutral-500 font-semibold mb-1">Registered Office Address</label>
            <input
              type="text"
              disabled={!isCompany}
              value={comp.registeredOffice}
              onChange={(e) => updateCompany({ registeredOffice: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Corporate Official Website</label>
            <input
              type="text"
              disabled={!isCompany}
              value={comp.website}
              onChange={(e) => updateCompany({ website: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Designated BRSR Officer Name *</label>
            <input
              type="text"
              disabled={!isCompany}
              value={comp.brsrOfficerName}
              onChange={(e) => updateCompany({ brsrOfficerName: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 font-semibold"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Officer Designation</label>
            <input
              type="text"
              disabled={!isCompany}
              value={comp.brsrOfficerDesignation}
              onChange={(e) => updateCompany({ brsrOfficerDesignation: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Officer Email & Contact</label>
            <input
              type="email"
              disabled={!isCompany}
              value={comp.brsrOfficerEmail}
              onChange={(e) => updateCompany({ brsrOfficerEmail: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100"
            />
          </div>

        </div>
      </div>

      {/* Part II & III: Products & Operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Top Products */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <h3 className="text-sm font-bold text-neutral-900 pb-3 border-b border-neutral-100">
            II. Products & Business Activities (NIC Codes)
          </h3>
          <div className="mt-4 space-y-3 text-xs">
            {report.sectionA.topProducts.map((p, idx) => (
              <div key={idx} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-neutral-900">{p.name}</p>
                  <p className="text-[11px] text-neutral-500">NIC Code: <span className="font-mono">{p.nicCode}</span></p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-neutral-900 tabular-nums">{p.turnoverSharePercent}%</span>
                  <span className="text-[10px] text-neutral-400 block">Turnover Share</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Locations */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <h3 className="text-sm font-bold text-neutral-900 pb-3 border-b border-neutral-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>III. Operational Footprint</span>
          </h3>
          <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
              <span className="text-xl font-bold text-neutral-900 block tabular-nums">{report.sectionA.operationalLocations.nationalPlants}</span>
              <span className="text-neutral-500">National Plants</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
              <span className="text-xl font-bold text-neutral-900 block tabular-nums">{report.sectionA.operationalLocations.nationalOffices}</span>
              <span className="text-neutral-500">National Offices</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
              <span className="text-xl font-bold text-neutral-900 block tabular-nums">{report.sectionA.operationalLocations.internationalPlants}</span>
              <span className="text-neutral-500">International Plants</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
              <span className="text-xl font-bold text-neutral-900 block tabular-nums">{report.sectionA.operationalLocations.internationalOffices}</span>
              <span className="text-neutral-500">International Offices</span>
            </div>
          </div>
        </div>

      </div>

      {/* Part IV: Employees & Workers (Diversity, Wages, Turnover) */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>IV. Employees & Workers (BRSR Core Diversity Metrics)</span>
          </h3>
          <span className="text-xs text-neutral-500">
            Assurance Required under SEBI BRSR Core
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-xs">
          
          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Permanent Employees *</label>
            <input
              type="number"
              disabled={!isHr}
              value={emp.totalPermanentEmployees}
              onChange={(e) => updateEmployees({ totalPermanentEmployees: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums font-semibold"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Female Permanent Employees *</label>
            <input
              type="number"
              disabled={!isHr}
              value={emp.femalePermanentEmployees}
              onChange={(e) => updateEmployees({ femalePermanentEmployees: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums font-semibold"
            />
            <span className="text-[10px] text-emerald-700 mt-0.5 block">
              Auto: {calculatedMetrics.genderDiversityEmployeePercent}% Female Ratio
            </span>
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Permanent Workers</label>
            <input
              type="number"
              disabled={!isHr}
              value={emp.totalPermanentWorkers}
              onChange={(e) => updateEmployees({ totalPermanentWorkers: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Female Permanent Workers</label>
            <input
              type="number"
              disabled={!isHr}
              value={emp.femalePermanentWorkers}
              onChange={(e) => updateEmployees({ femalePermanentWorkers: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Contractual Employees</label>
            <input
              type="number"
              disabled={!isHr}
              value={emp.totalContractualEmployees}
              onChange={(e) => updateEmployees({ totalContractualEmployees: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Contractual Workers</label>
            <input
              type="number"
              disabled={!isHr}
              value={emp.totalContractualWorkers}
              onChange={(e) => updateEmployees({ totalContractualWorkers: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Total Payroll (INR Crores) *</label>
            <input
              type="number"
              step="0.01"
              disabled={!isFinance}
              value={emp.totalPayrollCrores}
              onChange={(e) => updateEmployees({ totalPayrollCrores: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Female Payroll (INR Crores) *</label>
            <input
              type="number"
              step="0.01"
              disabled={!isFinance}
              value={emp.femalePayrollCrores}
              onChange={(e) => updateEmployees({ femalePayrollCrores: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums"
            />
            <span className="text-[10px] text-emerald-700 mt-0.5 block">
              Auto: {calculatedMetrics.femaleWageSharePercent}% Female Share
            </span>
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Differently-Abled Employees</label>
            <input
              type="number"
              disabled={!isHr}
              value={emp.differentlyAbledEmployees}
              onChange={(e) => updateEmployees({ differentlyAbledEmployees: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Employee Turnover Rate (%)</label>
            <input
              type="number"
              step="0.1"
              disabled={!isHr}
              value={emp.employeeTurnoverRatePercent}
              onChange={(e) => updateEmployees({ employeeTurnoverRatePercent: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums"
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Median Wage Ratio (M:F)</label>
            <input
              type="number"
              step="0.01"
              disabled={!isHr}
              value={emp.medianRemunerationRatioMaleToFemale}
              onChange={(e) => updateEmployees({ medianRemunerationRatioMaleToFemale: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums"
            />
          </div>

        </div>
      </div>

      {/* Part VI & VII: CSR Details & Stakeholder Grievances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CSR Details */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <h3 className="text-sm font-bold text-neutral-900 pb-3 border-b border-neutral-100 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-emerald-700" />
            <span>VI. Corporate Social Responsibility (Section 135)</span>
          </h3>

          <div className="space-y-3 mt-4 text-xs">
            <div>
              <label className="block text-neutral-500 font-semibold mb-1">Average Net Profit of past 3 FYs (INR Crores)</label>
              <input
                type="number"
                step="0.01"
                disabled={!isFinance}
                value={csr.avgNetProfit3YearsCrores}
                onChange={(e) => updateCSR({ avgNetProfit3YearsCrores: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="text-[11px] text-neutral-500 block">Prescribed 2% CSR</span>
                <span className="text-base font-bold text-neutral-900 tabular-nums">
                  ₹{calculatedMetrics.csrPrescribedCrores} Cr
                </span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="text-[11px] text-neutral-500 block">Actual CSR Spent</span>
                <input
                  type="number"
                  step="0.01"
                  disabled={!isFinance}
                  value={csr.actualCSRSpentCrores}
                  onChange={(e) => updateCSR({ actualCSRSpentCrores: Number(e.target.value) })}
                  className="w-full mt-0.5 px-2 py-1 text-sm font-bold border border-neutral-300 rounded bg-white tabular-nums"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-500 font-semibold mb-1">Spent in Aspirational Districts (Cr)</label>
                <input
                  type="number"
                  step="0.01"
                  disabled={!isFinance}
                  value={csr.spentInAspirationalDistrictsCrores}
                  onChange={(e) => updateCSR({ spentInAspirationalDistrictsCrores: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums"
                />
              </div>
              <div>
                <label className="block text-neutral-500 font-semibold mb-1">Total CSR Projects</label>
                <input
                  type="number"
                  disabled={!isFinance}
                  value={csr.csrProjectsCount}
                  onChange={(e) => updateCSR({ csrProjectsCount: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none disabled:bg-neutral-100 tabular-nums"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Grievance Redressal */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <h3 className="text-sm font-bold text-neutral-900 pb-3 border-b border-neutral-100 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-700" />
            <span>VII. Stakeholder Grievances Redressal</span>
          </h3>

          <div className="space-y-3 mt-4 text-xs">
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between">
              <div>
                <p className="font-semibold text-neutral-800">Investor Grievances</p>
                <p className="text-[11px] text-neutral-500">SEBI SCORES / Registrar</p>
              </div>
              <div className="flex items-center gap-2 text-right">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Received</span>
                  <span className="font-mono font-bold text-neutral-900 tabular-nums">{griev.investorComplaintsReceived}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Resolved</span>
                  <span className="font-mono font-bold text-emerald-800 tabular-nums">{griev.investorComplaintsResolved}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between">
              <div>
                <p className="font-semibold text-neutral-800">Worker & Employee Grievances</p>
                <p className="text-[11px] text-neutral-500">Internal Works Committee</p>
              </div>
              <div className="flex items-center gap-2 text-right">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Received</span>
                  <span className="font-mono font-bold text-neutral-900 tabular-nums">{griev.workerComplaintsReceived}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Resolved</span>
                  <span className="font-mono font-bold text-emerald-800 tabular-nums">{griev.workerComplaintsResolved}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between">
              <div>
                <p className="font-semibold text-neutral-800">Customer Complaints</p>
                <p className="text-[11px] text-neutral-500">Quality & Service Deliverables</p>
              </div>
              <div className="flex items-center gap-2 text-right">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Received</span>
                  <span className="font-mono font-bold text-neutral-900 tabular-nums">{griev.customerComplaintsReceived}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Resolved</span>
                  <span className="font-mono font-bold text-emerald-800 tabular-nums">{griev.customerComplaintsResolved}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between">
              <div>
                <p className="font-semibold text-neutral-800">POSH (Sexual Harassment)</p>
                <p className="text-[11px] text-neutral-500">Internal Complaints Committee (ICC)</p>
              </div>
              <div className="flex items-center gap-2 text-right">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Received</span>
                  <span className="font-mono font-bold text-neutral-900 tabular-nums">{griev.poshComplaintsReceived}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Resolved</span>
                  <span className="font-mono font-bold text-emerald-800 tabular-nums">{griev.poshComplaintsResolved}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
