import React, { useState } from 'react';
import { X, ShieldPlus, Sparkles, CheckCircle2, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { FIRRecord, CrimeCategory, CaseSeverity } from '../../types/crime';
import { INITIAL_POLICE_STATIONS } from '../../data/mockPoliceData';

interface NewFIRFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterFIR: (newFir: FIRRecord) => void;
  onOpenAIAssistant: () => void;
  prefilledBNS?: string;
  prefilledIPC?: string;
  prefilledSummary?: string;
}

export const NewFIRFormModal: React.FC<NewFIRFormModalProps> = ({
  isOpen,
  onClose,
  onRegisterFIR,
  onOpenAIAssistant,
  prefilledBNS = '',
  prefilledIPC = '',
  prefilledSummary = ''
}) => {
  if (!isOpen) return null;

  const [stationCode, setStationCode] = useState('C1');
  const [complainantName, setComplainantName] = useState('');
  const [complainantPhone, setComplainantPhone] = useState('');
  const [incidentDate, setIncidentDate] = useState('2026-10-15');
  const [incidentTime, setIncidentTime] = useState('11:00');
  const [incidentLocation, setIncidentLocation] = useState('');
  const [category, setCategory] = useState<CrimeCategory>('Theft & Burglary');
  const [severity, setSeverity] = useState<CaseSeverity>('High');

  const [bnsSection, setBnsSection] = useState(prefilledBNS || 'BNS Sec 303(2) (Theft)');
  const [ipcEquivalent, setIpcEquivalent] = useState(prefilledIPC || 'IPC Sec 379');
  const [briefDescription, setBriefDescription] = useState(prefilledSummary || '');
  const [accusedName, setAccusedName] = useState('');
  const [recoveryAmount, setRecoveryAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const station = INITIAL_POLICE_STATIONS.find(s => s.code === stationCode) || INITIAL_POLICE_STATIONS[0];
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newId = `CBE/2026/FIR-0${randomNum}`;

    const newRecord: FIRRecord = {
      id: newId,
      stationCode: station.code,
      stationName: station.name,
      subdivision: station.subdivision as any,
      bnsSection: bnsSection || 'BNS Sec 303(2)',
      ipcEquivalent: ipcEquivalent || 'IPC Sec 379',
      category,
      severity,
      incidentDate: `${incidentDate} ${incidentTime}`,
      registrationDate: '2026-10-15 03:15',
      complainantName: complainantName || 'Complainant',
      complainantPhone: complainantPhone || '+91 94420 00000',
      incidentLocation: incidentLocation || `${station.landmark}, Coimbatore`,
      briefDescription: briefDescription || 'Statutory FIR registered at police station desk.',
      status: 'FIR Registered',
      investigatingOfficer: {
        name: station.inspectorName,
        rank: 'Inspector of Police',
        phone: station.emergencyDirect,
        badgeNumber: `CBE-${station.code}-091`
      },
      accused: accusedName ? [{
        name: accusedName,
        age: 29,
        gender: 'Male',
        address: 'Coimbatore',
        status: 'Suspect'
      }] : [],
      evidence: [],
      caseDiary: [{
        date: '2026-10-15 03:15',
        officer: station.inspectorName,
        rank: 'Inspector of Police',
        entry: 'FIR registered upon receipt of written complaint. Entered in General Diary.'
      }],
      recoveryAmount: recoveryAmount ? `Est. ${recoveryAmount}` : undefined,
      lastUpdated: 'Just now'
    };

    onRegisterFIR(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF7F2] border border-[#C8B282] rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden text-[#2B2319]">
        {/* Header */}
        <div className="bg-[#1F1912] text-white px-6 py-4 flex items-center justify-between border-b border-[#3B3024]">
          <div className="flex items-center gap-2.5">
            <ShieldPlus className="w-5 h-5 text-[#991B1B]" />
            <div>
              <h3 className="text-base font-bold font-heading">
                Register New Statutory First Information Report (FIR)
              </h3>
              <p className="text-xs text-[#C8B89E]">
                Station House Officer (SHO) Entry Portal · Form II CCTNS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#C8B89E] hover:text-white p-1 rounded hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                Police Station Desk *
              </label>
              <select
                value={stationCode}
                onChange={(e) => setStationCode(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#D1C2A5] rounded-lg focus:border-[#991B1B]"
              >
                {INITIAL_POLICE_STATIONS.map((st) => (
                  <option key={st.id} value={st.code}>
                    {st.name} ({st.subdivision} Sub-Div)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                Crime Category & Severity *
              </label>
              <div className="flex gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CrimeCategory)}
                  className="w-2/3 px-2 py-2 text-xs bg-white border border-[#D1C2A5] rounded-lg focus:border-[#991B1B]"
                >
                  <option value="Theft & Burglary">Theft & Burglary</option>
                  <option value="Cyber Crime & Online Fraud">Cyber Crime & Fraud</option>
                  <option value="Vehicle Theft">Vehicle Theft</option>
                  <option value="Violent Crime & Assault">Violent Crime</option>
                  <option value="Women & Child Safety">Women & Child Safety</option>
                  <option value="Financial & Cheating">Financial & Cheating</option>
                  <option value="Narcotics & NDPS">Narcotics & NDPS</option>
                </select>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as CaseSeverity)}
                  className="w-1/3 px-2 py-2 text-xs bg-white border border-[#D1C2A5] rounded-lg font-bold text-[#991B1B]"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                Complainant Name *
              </label>
              <input
                type="text"
                required
                value={complainantName}
                onChange={(e) => setComplainantName(e.target.value)}
                placeholder="e.g. S. Ramanathan"
                className="w-full px-3 py-2 text-xs bg-white border border-[#D1C2A5] rounded-lg focus:border-[#991B1B]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                Contact Number *
              </label>
              <input
                type="tel"
                required
                value={complainantPhone}
                onChange={(e) => setComplainantPhone(e.target.value)}
                placeholder="+91 98420 12345"
                className="w-full px-3 py-2 text-xs bg-white border border-[#D1C2A5] rounded-lg focus:border-[#991B1B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                Date & Time of Occurrence *
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-3/5 px-2 py-2 text-xs bg-white border border-[#D1C2A5] rounded-lg"
                />
                <input
                  type="time"
                  value={incidentTime}
                  onChange={(e) => setIncidentTime(e.target.value)}
                  className="w-2/5 px-2 py-2 text-xs bg-white border border-[#D1C2A5] rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                Occurrence Location *
              </label>
              <input
                type="text"
                required
                value={incidentLocation}
                onChange={(e) => setIncidentLocation(e.target.value)}
                placeholder="e.g. Gandhipuram 100ft Road Signal"
                className="w-full px-3 py-2 text-xs bg-white border border-[#D1C2A5] rounded-lg focus:border-[#991B1B]"
              />
            </div>
          </div>

          {/* Legal Section Framing Box with AI Assistant Button */}
          <div className="bg-[#F4EFE6] border border-[#D9CDB8] p-3.5 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#4A3B2C] uppercase tracking-wider">
                Statutory Legal Code Classification
              </span>
              <button
                type="button"
                onClick={onOpenAIAssistant}
                className="text-xs font-bold text-[#991B1B] hover:text-[#7F1D1D] flex items-center gap-1 underline underline-offset-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Legal Section Recommender</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#6B5A47] mb-1">
                  Bharatiya Nyaya Sanhita (BNS 2023) *
                </label>
                <input
                  type="text"
                  required
                  value={bnsSection}
                  onChange={(e) => setBnsSection(e.target.value)}
                  placeholder="e.g. BNS Sec 303(2) (Theft)"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded-md font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#6B5A47] mb-1">
                  Corresponding IPC Equivalent
                </label>
                <input
                  type="text"
                  value={ipcEquivalent}
                  onChange={(e) => setIpcEquivalent(e.target.value)}
                  placeholder="e.g. IPC Sec 379"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded-md font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
              Gist of Offence / First Information Content *
            </label>
            <textarea
              rows={3}
              required
              value={briefDescription}
              onChange={(e) => setBriefDescription(e.target.value)}
              placeholder="Detailed description of offence, means used, injury sustained, or property lost..."
              className="w-full px-3 py-2 text-xs bg-white border border-[#D1C2A5] rounded-lg focus:border-[#991B1B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                Suspect Particulars (If identified)
              </label>
              <input
                type="text"
                value={accusedName}
                onChange={(e) => setAccusedName(e.target.value)}
                placeholder="e.g. Ramesh @ Katta, Age 26, Tirupur"
                className="w-full px-3 py-2 text-xs bg-white border border-[#D1C2A5] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                Stolen / Defrauded Valuation (₹)
              </label>
              <input
                type="text"
                value={recoveryAmount}
                onChange={(e) => setRecoveryAmount(e.target.value)}
                placeholder="e.g. ₹1,50,000"
                className="w-full px-3 py-2 text-xs bg-white border border-[#D1C2A5] rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DFC9]">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-[#6B5A47] hover:text-[#1F1912] px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Issue Official FIR Docket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
