import React, { useState } from 'react';
import { X, Shield, User, FileText, Plus, CheckCircle, AlertTriangle, Printer, Phone, Calendar, MapPin, Database } from 'lucide-react';
import { FIRRecord, CaseStatus, AccusedPerson, EvidenceItem } from '../../types/crime';

interface FIRDossierModalProps {
  fir: FIRRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateFIR: (updatedFir: FIRRecord) => void;
  onViewOfficialFIR: (fir: FIRRecord) => void;
}

export const FIRDossierModal: React.FC<FIRDossierModalProps> = ({
  fir,
  isOpen,
  onClose,
  onUpdateFIR,
  onViewOfficialFIR
}) => {
  if (!isOpen || !fir) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'accused' | 'evidence' | 'diary'>('overview');
  
  // Status update
  const [currentStatus, setCurrentStatus] = useState<CaseStatus>(fir.status);

  // New Diary entry state
  const [newDiaryOfficer, setNewDiaryOfficer] = useState(fir.investigatingOfficer.name);
  const [newDiaryText, setNewDiaryText] = useState('');

  // New Accused state
  const [showAddAccused, setShowAddAccused] = useState(false);
  const [accusedName, setAccusedName] = useState('');
  const [accusedAge, setAccusedAge] = useState(28);
  const [accusedGender, setAccusedGender] = useState('Male');
  const [accusedStatus, setAccusedStatus] = useState<any>('Arrested');
  const [accusedAddress, setAccusedAddress] = useState('');

  // New Evidence state
  const [showAddEvidence, setShowAddEvidence] = useState(false);
  const [evidenceDesc, setEvidenceDesc] = useState('');
  const [evidenceCategory, setEvidenceCategory] = useState<any>('Physical');
  const [evidenceLocation, setEvidenceLocation] = useState('Station Malkhana');

  const handleStatusChange = (newStatus: CaseStatus) => {
    setCurrentStatus(newStatus);
    const updated: FIRRecord = {
      ...fir,
      status: newStatus,
      lastUpdated: 'Just now'
    };
    onUpdateFIR(updated);
  };

  const handleAddDiaryEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiaryText.trim()) return;

    const newEntry = {
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      officer: newDiaryOfficer || fir.investigatingOfficer.name,
      rank: fir.investigatingOfficer.rank,
      entry: newDiaryText.trim()
    };

    const updated: FIRRecord = {
      ...fir,
      caseDiary: [newEntry, ...fir.caseDiary],
      lastUpdated: 'Just now'
    };
    onUpdateFIR(updated);
    setNewDiaryText('');
  };

  const handleAddAccused = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accusedName.trim()) return;

    const newAcc: AccusedPerson = {
      name: accusedName.trim(),
      age: accusedAge,
      gender: accusedGender,
      address: accusedAddress || 'Coimbatore',
      status: accusedStatus,
      arrestDate: accusedStatus === 'Arrested' || accusedStatus.includes('Remanded') ? '2026-10-15' : undefined
    };

    const updated: FIRRecord = {
      ...fir,
      accused: [...fir.accused, newAcc],
      lastUpdated: 'Just now'
    };
    onUpdateFIR(updated);
    setAccusedName('');
    setAccusedAddress('');
    setShowAddAccused(false);
  };

  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceDesc.trim()) return;

    const newEv: EvidenceItem = {
      id: `EVD-${fir.id.slice(-4)}-${fir.evidence.length + 1}`,
      itemDescription: evidenceDesc.trim(),
      category: evidenceCategory,
      seizureDate: '2026-10-15',
      storageLocation: evidenceLocation,
      verifiedBy: fir.investigatingOfficer.name
    };

    const updated: FIRRecord = {
      ...fir,
      evidence: [...fir.evidence, newEv],
      lastUpdated: 'Just now'
    };
    onUpdateFIR(updated);
    setEvidenceDesc('');
    setShowAddEvidence(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF7F2] border border-[#C8B282] rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden text-[#2B2319]">
        {/* Officer Header with Status Toggles */}
        <div className="bg-[#1F1912] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#3B3024]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#991B1B] text-white">
              {fir.stationCode}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-mono tracking-tight text-white tabular-nums">
                  {fir.id}
                </h3>
                <span className="text-xs text-[#FDE68A] font-semibold">· {fir.category}</span>
              </div>
              <p className="text-xs text-[#C8B89E]">
                {fir.stationName} · Registered: {fir.registrationDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Selector */}
            <div className="flex items-center gap-1.5 bg-[#2B2319] p-1 rounded-lg border border-[#4A3B2C]">
              <span className="text-[10px] text-[#A89884] uppercase font-bold px-1.5">Status:</span>
              <select
                value={currentStatus}
                onChange={(e) => handleStatusChange(e.target.value as CaseStatus)}
                className="bg-[#1F1912] text-xs font-bold text-[#FDE68A] px-2 py-1 rounded border border-[#5A4836] focus:outline-none"
              >
                <option value="Complaint Received">Complaint Received</option>
                <option value="Preliminary Inquiry">Preliminary Inquiry</option>
                <option value="FIR Registered">FIR Registered</option>
                <option value="Under Investigation">Under Investigation</option>
                <option value="Charge Sheet Filed">Charge Sheet Filed</option>
                <option value="Under Trial">Under Trial</option>
                <option value="Closed & Convicted">Closed & Convicted</option>
                <option value="Case Disposed">Case Disposed</option>
              </select>
            </div>

            <button
              onClick={() => onViewOfficialFIR(fir)}
              className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Form II FIR</span>
            </button>

            <button
              onClick={onClose}
              className="text-[#C8B89E] hover:text-white p-1 rounded hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-[#EFE7D8] border-b border-[#D9CDB8] flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-1 transition-colors ${activeTab === 'overview' ? 'text-[#991B1B] border-b-2 border-[#991B1B]' : 'text-[#614E3A] hover:text-[#1F1912]'}`}
          >
            Case Overview & Charges
          </button>
          <button
            onClick={() => setActiveTab('accused')}
            className={`pb-1 transition-colors ${activeTab === 'accused' ? 'text-[#991B1B] border-b-2 border-[#991B1B]' : 'text-[#614E3A] hover:text-[#1F1912]'}`}
          >
            Accused & Suspects ({fir.accused.length})
          </button>
          <button
            onClick={() => setActiveTab('evidence')}
            className={`pb-1 transition-colors ${activeTab === 'evidence' ? 'text-[#991B1B] border-b-2 border-[#991B1B]' : 'text-[#614E3A] hover:text-[#1F1912]'}`}
          >
            Seized Evidence & Malkhana ({fir.evidence.length})
          </button>
          <button
            onClick={() => setActiveTab('diary')}
            className={`pb-1 transition-colors ${activeTab === 'diary' ? 'text-[#991B1B] border-b-2 border-[#991B1B]' : 'text-[#614E3A] hover:text-[#1F1912]'}`}
          >
            Case Diary Log ({fir.caseDiary.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Top details cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-[#D9CDB8] rounded-xl p-4 shadow-xs">
                  <span className="text-[10px] text-[#8C7A68] uppercase font-bold block">Legal Code (BNS 2023)</span>
                  <p className="text-sm font-bold text-[#991B1B] font-mono mt-1">{fir.bnsSection}</p>
                  <span className="text-xs text-[#6B5A47] block mt-1">Equivalent: {fir.ipcEquivalent}</span>
                </div>

                <div className="bg-white border border-[#D9CDB8] rounded-xl p-4 shadow-xs">
                  <span className="text-[10px] text-[#8C7A68] uppercase font-bold block">Complainant Particulars</span>
                  <p className="text-sm font-bold text-[#1F1912] mt-1">{fir.complainantName}</p>
                  <p className="text-xs text-[#6B5A47] mt-0.5 flex items-center gap-1 font-mono">
                    <Phone className="w-3 h-3 text-[#991B1B]" />
                    <span>{fir.complainantPhone}</span>
                  </p>
                </div>

                <div className="bg-white border border-[#D9CDB8] rounded-xl p-4 shadow-xs">
                  <span className="text-[10px] text-[#8C7A68] uppercase font-bold block">Investigating Officer (IO)</span>
                  <p className="text-sm font-bold text-[#1F1912] mt-1">{fir.investigatingOfficer.name}</p>
                  <span className="text-xs text-[#6B5A47] block">
                    {fir.investigatingOfficer.rank} · {fir.investigatingOfficer.badgeNumber}
                  </span>
                </div>
              </div>

              {/* Incident Narrative */}
              <div className="bg-white border border-[#D9CDB8] rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-[#4A3B2C] uppercase tracking-wider">
                    First Information Statement (FIR Gist)
                  </h4>
                  <span className="text-xs text-[#8C7A68] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#991B1B]" />
                    <span>{fir.incidentLocation}</span>
                  </span>
                </div>
                <p className="text-xs text-[#2B2319] leading-relaxed bg-[#FAF7F2] p-4 rounded-lg border border-[#E8DFC9]">
                  {fir.briefDescription}
                </p>
                {fir.recoveryAmount && (
                  <div className="mt-3 inline-block bg-[#FEF9C3] border border-[#FDE047] text-[#854D0E] text-xs font-bold px-3 py-1 rounded">
                    Property / Amount Recovery: {fir.recoveryAmount}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'accused' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3B2C]">
                  Accused / Suspect Registry
                </h4>
                <button
                  onClick={() => setShowAddAccused(!showAddAccused)}
                  className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Accused</span>
                </button>
              </div>

              {showAddAccused && (
                <form onSubmit={handleAddAccused} className="bg-white border border-[#C8B282] p-4 rounded-xl space-y-3 shadow-xs">
                  <span className="text-xs font-bold text-[#991B1B] block">Enter Accused Particulars</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#6B5A47] mb-1">Name / Alias *</label>
                      <input
                        type="text"
                        required
                        value={accusedName}
                        onChange={(e) => setAccusedName(e.target.value)}
                        placeholder="e.g. M. Rajesh @ Bullet"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded focus:border-[#991B1B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#6B5A47] mb-1">Age</label>
                      <input
                        type="number"
                        value={accusedAge}
                        onChange={(e) => setAccusedAge(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded focus:border-[#991B1B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#6B5A47] mb-1">Status</label>
                      <select
                        value={accusedStatus}
                        onChange={(e) => setAccusedStatus(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded focus:border-[#991B1B]"
                      >
                        <option value="Arrested">Arrested</option>
                        <option value="Remanded (Coimbatore Central Prison)">Remanded (Coimbatore Central Prison)</option>
                        <option value="On Bail">On Bail</option>
                        <option value="Absconding">Absconding</option>
                        <option value="Suspect">Suspect</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B5A47] mb-1">Native / Current Address</label>
                    <input
                      type="text"
                      value={accusedAddress}
                      onChange={(e) => setAccusedAddress(e.target.value)}
                      placeholder="e.g. Town Hall Street, Coimbatore"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded focus:border-[#991B1B]"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddAccused(false)}
                      className="text-xs text-[#6B5A47] px-3 py-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#991B1B] text-white text-xs font-bold px-4 py-1.5 rounded"
                    >
                      Save Accused
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {fir.accused.map((acc, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[#D9CDB8] rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1F1912]">{acc.name}</span>
                        {acc.alias && (
                          <span className="text-xs font-mono text-[#8C7A68]">({acc.alias})</span>
                        )}
                      </div>
                      <p className="text-xs text-[#6B5A47] mt-0.5">
                        Age: {acc.age} · Gender: {acc.gender} · Address: {acc.address}
                      </p>
                      {acc.arrestDate && (
                        <span className="text-[11px] font-mono text-[#991B1B] block mt-0.5">
                          Arrest Date: {acc.arrestDate}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-md shrink-0 ${
                        acc.status.includes('Remanded') || acc.status === 'Arrested'
                          ? 'bg-[#FEE2E2] text-[#991B1B]'
                          : acc.status === 'On Bail'
                          ? 'bg-[#FEF9C3] text-[#A16207]'
                          : 'bg-[#E5DAC6] text-[#4A3B2C]'
                      }`}
                    >
                      {acc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3B2C]">
                  Seized Evidence & Malkhana Register (Form 95)
                </h4>
                <button
                  onClick={() => setShowAddEvidence(!showAddEvidence)}
                  className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Seized Property</span>
                </button>
              </div>

              {showAddEvidence && (
                <form onSubmit={handleAddEvidence} className="bg-white border border-[#C8B282] p-4 rounded-xl space-y-3 shadow-xs">
                  <span className="text-xs font-bold text-[#991B1B] block">Enter Seized Property Item</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-[#6B5A47] mb-1">Item Description *</label>
                      <input
                        type="text"
                        required
                        value={evidenceDesc}
                        onChange={(e) => setEvidenceDesc(e.target.value)}
                        placeholder="e.g. Samsung Galaxy S23 Mobile Phone with Airtel SIM"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded focus:border-[#991B1B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#6B5A47] mb-1">Category</label>
                      <select
                        value={evidenceCategory}
                        onChange={(e) => setEvidenceCategory(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded focus:border-[#991B1B]"
                      >
                        <option value="Physical">Physical</option>
                        <option value="Digital / Cyber">Digital / Cyber</option>
                        <option value="Forensic">Forensic</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Vehicle / Property">Vehicle / Property</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B5A47] mb-1">Custody / Vault Location</label>
                    <input
                      type="text"
                      value={evidenceLocation}
                      onChange={(e) => setEvidenceLocation(e.target.value)}
                      placeholder="e.g. Station Malkhana Safe Box #3"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded focus:border-[#991B1B]"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddEvidence(false)}
                      className="text-xs text-[#6B5A47] px-3 py-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#991B1B] text-white text-xs font-bold px-4 py-1.5 rounded"
                    >
                      Register Evidence
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fir.evidence.map((ev) => (
                  <div key={ev.id} className="bg-white border border-[#D9CDB8] rounded-xl p-4 shadow-xs">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-mono text-[#8C7A68]">{ev.id}</span>
                      <span className="font-semibold text-[#991B1B] bg-[#FEF2F2] px-2 py-0.5 rounded">
                        {ev.category}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#1F1912]">{ev.itemDescription}</p>
                    <div className="mt-2 pt-2 border-t border-[#F0E6D5] text-[11px] text-[#6B5A47] space-y-0.5">
                      <div>Storage: <strong className="text-[#1F1912]">{ev.storageLocation}</strong></div>
                      <div>Seized: {ev.seizureDate} · Verifier: {ev.verifiedBy}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'diary' && (
            <div className="space-y-4">
              <form onSubmit={handleAddDiaryEntry} className="bg-white border border-[#C8B282] p-4 rounded-xl space-y-3 shadow-xs">
                <span className="text-xs font-bold text-[#991B1B] block">Add Case Diary Daily Investigation Entry</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B5A47] mb-1">Officer Name</label>
                    <input
                      type="text"
                      value={newDiaryOfficer}
                      onChange={(e) => setNewDiaryOfficer(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded focus:border-[#991B1B]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#6B5A47] mb-1">Investigation Action Details *</label>
                  <textarea
                    rows={2}
                    required
                    value={newDiaryText}
                    onChange={(e) => setNewDiaryText(e.target.value)}
                    placeholder="e.g. Examined 2 independent witnesses at location. Collected tower CDR dump for suspect mobile."
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded focus:border-[#991B1B]"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#991B1B] text-white text-xs font-bold px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Append to Case Diary</span>
                  </button>
                </div>
              </form>

              <div className="space-y-3">
                {fir.caseDiary.map((cd, idx) => (
                  <div key={idx} className="bg-white border-l-4 border-[#991B1B] border border-[#D9CDB8] rounded-r-xl p-4 shadow-xs">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-[#1F1912]">{cd.officer} ({cd.rank})</span>
                      <span className="font-mono text-[#8C7A68] text-[11px]">{cd.date}</span>
                    </div>
                    <p className="text-xs text-[#3D2E20] leading-relaxed">{cd.entry}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
