import React from 'react';
import { useBrsr } from '../context/BrsrContext';
import { ShieldCheck, Check, X, ExternalLink, Award } from 'lucide-react';

const PRINCIPLE_NAMES = [
  'P1: Ethics, Transparency & Accountability',
  'P2: Sustainable & Safe Goods/Services',
  'P3: Employee Well-being & Workplace Safety',
  'P4: Stakeholder Responsiveness & Inclusivity',
  'P5: Human Rights & Non-Discrimination',
  'P6: Environment Protection & Climate Action',
  'P7: Responsible Public Policy Advocacy',
  'P8: Inclusive Growth & Social Development',
  'P9: Consumer Value & Data Privacy',
];

export const SectionB: React.FC = () => {
  const { report, updatePolicy, canEdit } = useBrsr();
  const secB = report.sectionB;
  const isGovernance = canEdit('governance') || canEdit('esg_lead');

  return (
    <div className="space-y-6">
      
      {/* Sub-header */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-5 h-5 text-emerald-800" />
          <h2 className="text-base font-bold text-neutral-900">Section B: Management and Process Disclosures</h2>
        </div>
        <p className="text-xs text-neutral-500">
          Governance structure, board-approved sustainability policies covering all 9 NGRBC principles, and third-party independent assurance verification.
        </p>
      </div>

      {/* Board Oversight & Governance Details */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-neutral-900 pb-3 border-b border-neutral-100 flex items-center gap-2">
          <span>I. Board Oversight & Governance Structure</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Director Responsible for BRSR</label>
            <input
              type="text"
              disabled={!isGovernance}
              value={secB.directorResponsible}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-50 font-semibold text-neutral-900"
              readOnly
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Director Identification Number (DIN)</label>
            <input
              type="text"
              disabled={!isGovernance}
              value={secB.directorDin}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-50 font-mono text-neutral-900"
              readOnly
            />
          </div>

          <div>
            <label className="block text-neutral-500 font-semibold mb-1">Governing Board Committee</label>
            <input
              type="text"
              disabled={!isGovernance}
              value={secB.governanceCommittee}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-50 text-neutral-900"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* 9 Principles Policy Matrix Table */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">II. Policy & Governance Matrix (All 9 NGRBC Principles)</h3>
            <p className="text-xs text-neutral-500">SEBI requires explicit board adoption and procedural translation for each principle.</p>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            9 of 9 Principles Adopted
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-600 font-semibold">
                <th className="py-2.5 px-3">Principle</th>
                <th className="py-2.5 px-3 text-center">Policy In Place?</th>
                <th className="py-2.5 px-3 text-center">Board Approved?</th>
                <th className="py-2.5 px-3 text-center">Translated to SOPs?</th>
                <th className="py-2.5 px-3">Review Cadence</th>
                <th className="py-2.5 px-3">Policy Web Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {PRINCIPLE_NAMES.map((name, idx) => {
                const pNum = idx + 1;
                const policy = secB.policies[pNum] || {
                  hasPolicy: true,
                  approvedByBoard: true,
                  policyWebLink: '',
                  translatedToProcedures: true,
                  assignedDirector: '',
                  reviewFrequency: 'Annually' as const,
                };

                return (
                  <tr key={pNum} className="hover:bg-neutral-50/50">
                    <td className="py-3 px-3 font-semibold text-neutral-900">
                      {name}
                    </td>

                    {/* Policy in place */}
                    <td className="py-3 px-3 text-center">
                      <button
                        disabled={!isGovernance}
                        onClick={() => updatePolicy(pNum, { hasPolicy: !policy.hasPolicy })}
                        className={`inline-flex p-1 rounded cursor-pointer ${
                          policy.hasPolicy ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {policy.hasPolicy ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </button>
                    </td>

                    {/* Board approved */}
                    <td className="py-3 px-3 text-center">
                      <button
                        disabled={!isGovernance}
                        onClick={() => updatePolicy(pNum, { approvedByBoard: !policy.approvedByBoard })}
                        className={`inline-flex p-1 rounded cursor-pointer ${
                          policy.approvedByBoard ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {policy.approvedByBoard ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </button>
                    </td>

                    {/* Translated to SOPs */}
                    <td className="py-3 px-3 text-center">
                      <button
                        disabled={!isGovernance}
                        onClick={() => updatePolicy(pNum, { translatedToProcedures: !policy.translatedToProcedures })}
                        className={`inline-flex p-1 rounded cursor-pointer ${
                          policy.translatedToProcedures ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {policy.translatedToProcedures ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </button>
                    </td>

                    {/* Review frequency */}
                    <td className="py-3 px-3">
                      <select
                        disabled={!isGovernance}
                        value={policy.reviewFrequency}
                        onChange={(e) => updatePolicy(pNum, { reviewFrequency: e.target.value as any })}
                        className="px-2 py-1 border border-neutral-300 rounded bg-white text-neutral-800 focus:outline-none"
                      >
                        <option value="Quarterly">Quarterly</option>
                        <option value="Half-Yearly">Half-Yearly</option>
                        <option value="Annually">Annually</option>
                      </select>
                    </td>

                    {/* Web link */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          disabled={!isGovernance}
                          value={policy.policyWebLink}
                          onChange={(e) => updatePolicy(pNum, { policyWebLink: e.target.value })}
                          className="w-48 px-2 py-1 border border-neutral-300 rounded font-mono text-[11px] text-neutral-700"
                        />
                        {policy.policyWebLink && (
                          <a
                            href={policy.policyWebLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-neutral-400 hover:text-emerald-700"
                            title="Open link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Third Party Independent Assurance Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-neutral-900 pb-3 border-b border-neutral-100 flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>III. Independent Third-Party Assurance (SEBI BRSR Core Mandate)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
          <div className="p-4 bg-emerald-50/60 rounded-lg border border-emerald-200">
            <span className="text-neutral-500 block mb-1">Assurance Status</span>
            <span className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-700" />
              Reasonable Assurance Obtained
            </span>
            <span className="text-[11px] text-emerald-700 mt-1 block">Scope: {secB.assuranceScope}</span>
          </div>

          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <span className="text-neutral-500 block mb-1">Assurance Provider</span>
            <span className="font-bold text-neutral-900 text-sm block">{secB.assuranceProvider}</span>
            <span className="text-[11px] text-neutral-500 mt-1 block">Accredited Statutory Assurance Body</span>
          </div>

          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <span className="text-neutral-500 block mb-1">Assurance Standards Applied</span>
            <span className="font-bold text-neutral-900 text-sm block">{secB.assuranceStandard}</span>
            <span className="text-[11px] text-neutral-500 mt-1 block">SEBI Specified Assurance Framework</span>
          </div>
        </div>
      </div>

    </div>
  );
};
