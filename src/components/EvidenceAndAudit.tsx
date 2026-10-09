import React, { useState } from 'react';
import { useBrsr } from '../context/BrsrContext';
import { 
  FileText, 
  UploadCloud, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  History, 
  Download, 
  Filter,
  Check,
  Search,
  ShieldCheck
} from 'lucide-react';
import { BrsrDocument } from '../types/brsr';

export const EvidenceAndAudit: React.FC = () => {
  const { 
    report, 
    addDocument, 
    deleteDocument, 
    verifyDocument, 
    canEdit, 
    activeRole 
  } = useBrsr();

  const [activeSubTab, setActiveSubTab] = useState<'evidence' | 'audit'>('evidence');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [auditSearch, setAuditSearch] = useState<string>('');

  const [newDoc, setNewDoc] = useState<Omit<BrsrDocument, 'id' | 'uploadedAt'>>({
    name: '',
    category: 'Audit Evidence',
    principleTag: 'P6 - Environment',
    uploadedBy: 'Current User',
    fileSize: '2.4 MB',
    status: 'Pending Review',
    notes: '',
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.name.trim()) return;
    addDocument({
      ...newDoc,
      uploadedBy: activeRole === 'esg_lead' ? 'Dr. Ananya Sen (ESG Lead)' : `${activeRole.toUpperCase()} Team Member`,
    });
    setShowUploadModal(false);
    setNewDoc({
      name: '',
      category: 'Audit Evidence',
      principleTag: 'P6 - Environment',
      uploadedBy: 'Current User',
      fileSize: '2.4 MB',
      status: 'Pending Review',
      notes: '',
    });
  };

  const filteredDocs = filterCategory === 'all' 
    ? report.documents 
    : report.documents.filter(d => d.category === filterCategory);

  const filteredAudit = report.auditTrail.filter(a => {
    const query = auditSearch.toLowerCase();
    return (
      a.fieldName.toLowerCase().includes(query) ||
      a.section.toLowerCase().includes(query) ||
      a.userName.toLowerCase().includes(query) ||
      a.previousValue.toLowerCase().includes(query) ||
      a.newValue.toLowerCase().includes(query)
    );
  });

  const exportAuditCsv = () => {
    const headers = ['Timestamp', 'User', 'Role', 'Section', 'Field', 'Previous Value', 'New Value', 'Action'];
    const rows = report.auditTrail.map(a => [
      `"${a.timestamp}"`,
      `"${a.userName}"`,
      `"${a.userRole}"`,
      `"${a.section}"`,
      `"${a.fieldName}"`,
      `"${a.previousValue}"`,
      `"${a.newValue}"`,
      `"${a.action}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BRSR_Audit_Trail_${report.reportingYear.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Sub-header with Sub-tab toggle */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-neutral-900">Evidence Vault & Statutory Audit Trail</h2>
            <p className="text-xs text-neutral-500">
              Cryptographically backed records of supporting evidence, assurance letters, and immutable user change history.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg shrink-0">
            <button
              onClick={() => setActiveSubTab('evidence')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'evidence' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-800" />
              <span>Evidence Vault ({report.documents.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('audit')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'audit' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <History className="w-3.5 h-3.5 text-emerald-800" />
              <span>Audit Trail ({report.auditTrail.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SUB-TAB 1: EVIDENCE VAULT */}
      {/* ============================================================== */}
      {activeSubTab === 'evidence' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-neutral-500 font-semibold mr-1">Filter:</span>
              {['all', 'Policy', 'Assurance Report', 'Board Approval', 'Audit Evidence'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                    filterCategory === cat 
                      ? 'bg-neutral-900 text-white border-neutral-900 font-medium' 
                      : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {cat === 'all' ? 'All Documents' : cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Evidence</span>
            </button>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between hover:border-emerald-600 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 text-[11px]">
                    <span className="font-semibold text-neutral-500">{doc.category}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                      doc.status === 'Verified' 
                        ? 'bg-emerald-100 text-emerald-900' 
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {doc.status === 'Verified' ? <Check className="w-3 h-3 text-emerald-700" /> : <Clock className="w-3 h-3 text-amber-700" />}
                      {doc.status}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-neutral-900 mt-3 break-all flex items-start gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{doc.name}</span>
                  </h3>

                  <p className="text-[11px] text-neutral-600 mt-2 line-clamp-2">
                    {doc.notes || 'Supporting compliance document for statutory filings.'}
                  </p>

                  <div className="mt-3 text-[11px] text-neutral-400 space-y-0.5">
                    <div>Principle: <strong className="text-neutral-700">{doc.principleTag}</strong></div>
                    <div>By: <strong className="text-neutral-700">{doc.uploadedBy}</strong> · <span className="tabular-nums">{doc.uploadedAt}</span></div>
                    <div>File Size: <span className="font-mono">{doc.fileSize}</span></div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                  {canEdit('auditor') && doc.status !== 'Verified' ? (
                    <button
                      onClick={() => verifyDocument(doc.id)}
                      className="text-xs text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verify as Auditor</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-neutral-400">
                      AES-256 Secured
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Downloading signed copy of ${doc.name}...`)}
                      className="text-neutral-500 hover:text-neutral-900 p-1 cursor-pointer"
                      title="Download file"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    {canEdit('esg_lead') && (
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="text-neutral-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Delete document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Modal */}
          {showUploadModal && (
            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-neutral-200">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <h3 className="text-base font-bold text-neutral-900">Upload BRSR Evidence File</h3>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-neutral-400 hover:text-neutral-600 font-semibold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleUploadSubmit} className="mt-4 space-y-3 text-xs">
                  <div>
                    <label className="block text-neutral-600 font-semibold mb-1">Document Title / File Name *</label>
                    <input
                      type="text"
                      required
                      value={newDoc.name}
                      onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                      placeholder="e.g. ISO14001_Certificate_Noida_Plant.pdf"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-600 font-semibold mb-1">Category</label>
                      <select
                        value={newDoc.category}
                        onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value as any })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none bg-white"
                      >
                        <option value="Policy">Policy</option>
                        <option value="Assurance Report">Assurance Report</option>
                        <option value="Board Approval">Board Approval</option>
                        <option value="Audit Evidence">Audit Evidence</option>
                        <option value="Emission Certificate">Emission Certificate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-600 font-semibold mb-1">Associated Principle</label>
                      <input
                        type="text"
                        value={newDoc.principleTag}
                        onChange={(e) => setNewDoc({ ...newDoc, principleTag: e.target.value })}
                        placeholder="e.g. P6 - Environment"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-600 font-semibold mb-1">Description & Verification Notes</label>
                    <textarea
                      rows={3}
                      value={newDoc.notes}
                      onChange={(e) => setNewDoc({ ...newDoc, notes: e.target.value })}
                      placeholder="Specify certificate issuing agency, validity dates, or auditor references..."
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div className="p-4 border border-dashed border-neutral-300 rounded-lg text-center bg-neutral-50 text-neutral-500">
                    <UploadCloud className="w-6 h-6 mx-auto mb-1 text-neutral-400" />
                    <span>PDF, Word, or Excel file accepted (Simulated upload up to 25MB)</span>
                  </div>

                  <div className="mt-5 pt-3 border-t border-neutral-100 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-semibold cursor-pointer"
                    >
                      Store in Vault
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 2: STATUTORY AUDIT TRAIL */}
      {/* ============================================================== */}
      {activeSubTab === 'audit' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search audit trail by user, field, or section..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-none bg-white"
              />
            </div>

            <button
              onClick={exportAuditCsv}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-neutral-500" />
              <span>Export Audit Trail (CSV)</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-600 font-semibold">
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">User & Role</th>
                    <th className="py-2.5 px-3">Section</th>
                    <th className="py-2.5 px-3">Field / Action</th>
                    <th className="py-2.5 px-3">Previous Value</th>
                    <th className="py-2.5 px-3">Updated Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-mono text-[11px]">
                  {filteredAudit.map((entry) => (
                    <tr key={entry.id} className="hover:bg-neutral-50/50">
                      <td className="py-3 px-3 text-neutral-500 whitespace-nowrap">
                        {entry.timestamp}
                      </td>
                      <td className="py-3 px-3 font-sans">
                        <span className="font-semibold text-neutral-900 block">{entry.userName}</span>
                        <span className="text-[10px] uppercase text-neutral-400">{entry.userRole}</span>
                      </td>
                      <td className="py-3 px-3 font-sans text-neutral-600">
                        {entry.section}
                      </td>
                      <td className="py-3 px-3 font-sans font-medium text-neutral-900">
                        {entry.fieldName}
                      </td>
                      <td className="py-3 px-3 text-neutral-400 line-through">
                        {entry.previousValue}
                      </td>
                      <td className="py-3 px-3 font-bold text-emerald-800">
                        {entry.newValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
