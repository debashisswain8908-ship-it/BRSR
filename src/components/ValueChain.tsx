import React, { useState } from 'react';
import { useBrsr } from '../context/BrsrContext';
import { Truck, Plus, Trash2, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ValueChainPartner } from '../types/brsr';

export const ValueChain: React.FC = () => {
  const { report, updateValueChainSummary, addValueChainPartner, removeValueChainPartner, canEdit, calculatedMetrics } = useBrsr();
  const vc = report.valueChain;
  const isFinanceOrOps = canEdit('finance') || canEdit('operations') || canEdit('esg_lead');

  const [showAddModal, setShowAddModal] = useState(false);
  const [newPartner, setNewPartner] = useState<Omit<ValueChainPartner, 'id'>>({
    name: '',
    category: 'Component Provider',
    annualSpendCrores: 10,
    msmeRegistered: true,
    codeOfConductSigned: true,
    esgAuditCompleted: true,
    paymentWithin45Days: true,
    scope3Reported: true,
    emissionsEstimateMTCO2e: 500,
  });

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartner.name.trim()) return;
    addValueChainPartner(newPartner);
    setShowAddModal(false);
    setNewPartner({
      name: '',
      category: 'Component Provider',
      annualSpendCrores: 10,
      msmeRegistered: true,
      codeOfConductSigned: true,
      esgAuditCompleted: true,
      paymentWithin45Days: true,
      scope3Reported: true,
      emissionsEstimateMTCO2e: 500,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Sub-header */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Truck className="w-5 h-5 text-emerald-800" />
              <h2 className="text-base font-bold text-neutral-900">BRSR Core Value-Chain Disclosures</h2>
            </div>
            <p className="text-xs text-neutral-500">
              Pursuant to SEBI mandate, companies must report ESG metrics for top Tier-1 value-chain partners comprising at least 75% of purchases by value.
            </p>
          </div>

          {isFinanceOrOps && (
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Supplier Partner</span>
            </button>
          )}
        </div>
      </div>

      {/* Value Chain Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Tier-1 Suppliers</span>
          <span className="text-2xl font-black text-neutral-900 font-mono tabular-nums block mt-1">
            {vc.totalTier1SuppliersCount}
          </span>
          <span className="text-xs text-neutral-500 mt-2 block">
            {vc.evaluatedForESGPercent}% Evaluated for ESG Criteria
          </span>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Total Procurement</span>
          <span className="text-2xl font-black text-neutral-900 font-mono tabular-nums block mt-1">
            ₹{vc.totalProcurementSpendCrores} Cr
          </span>
          <span className="text-xs text-neutral-500 mt-2 block">
            Annual Supply Spend
          </span>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">MSME Procurement</span>
          <span className="text-2xl font-black text-emerald-800 font-mono tabular-nums block mt-1">
            ₹{vc.msmeSpendCrores} Cr
          </span>
          <span className="text-xs text-emerald-700 mt-2 block font-medium">
            {calculatedMetrics.msmeProcurementSharePercent}% Sourced from MSMEs
          </span>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">MSME Payment Dues</span>
          <span className={`text-2xl font-black font-mono tabular-nums block mt-1 ${vc.averagePaymentDaysToMSME > 45 ? 'text-amber-700' : 'text-neutral-900'}`}>
            {vc.averagePaymentDaysToMSME} Days
          </span>
          <span className="text-xs text-neutral-500 mt-2 block">
            Statutory MSMED Max: 45 Days
          </span>
        </div>

      </div>

      {/* Tier-1 Partners Data Grid */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Key Value-Chain Partners Register</h3>
            <p className="text-xs text-neutral-500">Individual compliance status for Scope 3 emissions, code of conduct, and timely payments.</p>
          </div>
          <span className="text-xs font-medium text-neutral-500">
            {vc.partners.length} Critical Vendors Enrolled
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-600 font-semibold">
                <th className="py-2.5 px-3">Supplier Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-right">Annual Spend</th>
                <th className="py-2.5 px-3 text-center">MSME?</th>
                <th className="py-2.5 px-3 text-center">ESG Audited?</th>
                <th className="py-2.5 px-3 text-center">≤ 45d Payment</th>
                <th className="py-2.5 px-3 text-right">Scope 3 GHG</th>
                {isFinanceOrOps && <th className="py-2.5 px-3 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {vc.partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-neutral-50/50">
                  <td className="py-3 px-3 font-semibold text-neutral-900">
                    {partner.name}
                  </td>
                  <td className="py-3 px-3 text-neutral-600">
                    {partner.category}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-neutral-900 tabular-nums">
                    ₹{partner.annualSpendCrores.toFixed(2)} Cr
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      partner.msmeRegistered ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {partner.msmeRegistered ? 'MSME Yes' : 'No'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      partner.esgAuditCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {partner.esgAuditCompleted ? 'Audited' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      partner.paymentWithin45Days ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {partner.paymentWithin45Days ? 'Compliant' : 'Delayed'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-neutral-700">
                    {partner.emissionsEstimateMTCO2e.toLocaleString('en-IN')} MT
                  </td>
                  {isFinanceOrOps && (
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => removeValueChainPartner(partner.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer p-1"
                        title="Remove supplier record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Partner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-neutral-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-900">Add Tier-1 Value-Chain Partner</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-neutral-600 font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePartner} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Supplier Company Name *</label>
                <input
                  type="text"
                  required
                  value={newPartner.name}
                  onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                  placeholder="e.g. Apex Precision Hardware Ltd"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Category</label>
                  <select
                    value={newPartner.category}
                    onChange={(e) => setNewPartner({ ...newPartner, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none bg-white"
                  >
                    <option value="Component Provider">Component Provider</option>
                    <option value="Critical Raw Material">Critical Raw Material</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Packaging">Packaging</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Annual Spend (Cr)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newPartner.annualSpendCrores}
                    onChange={(e) => setNewPartner({ ...newPartner, annualSpendCrores: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 font-semibold mb-1">Scope 3 Emission Estimate (MT CO2e)</label>
                <input
                  type="number"
                  value={newPartner.emissionsEstimateMTCO2e}
                  onChange={(e) => setNewPartner({ ...newPartner, emissionsEstimateMTCO2e: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <label className="flex items-center gap-2 font-medium text-neutral-800">
                  <input
                    type="checkbox"
                    checked={newPartner.msmeRegistered}
                    onChange={(e) => setNewPartner({ ...newPartner, msmeRegistered: e.target.checked })}
                  />
                  <span>Registered as MSME under Udyam Scheme</span>
                </label>

                <label className="flex items-center gap-2 font-medium text-neutral-800">
                  <input
                    type="checkbox"
                    checked={newPartner.esgAuditCompleted}
                    onChange={(e) => setNewPartner({ ...newPartner, esgAuditCompleted: e.target.checked })}
                  />
                  <span>ESG Due Diligence / Site Audit Completed</span>
                </label>

                <label className="flex items-center gap-2 font-medium text-neutral-800">
                  <input
                    type="checkbox"
                    checked={newPartner.paymentWithin45Days}
                    onChange={(e) => setNewPartner({ ...newPartner, paymentWithin45Days: e.target.checked })}
                  />
                  <span>Payment Settled Within 45 Days (MSMED Act)</span>
                </label>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-semibold cursor-pointer"
                >
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
