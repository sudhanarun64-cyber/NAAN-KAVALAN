import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, FileText, Upload, Printer, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { CrimeCategory, FIRRecord } from '../../types/crime';
import { INITIAL_POLICE_STATIONS } from '../../data/mockPoliceData';

interface FileComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitComplaint: (newFir: FIRRecord) => void;
  onTrackNewFIR: (firId: string) => void;
}

export const FileComplaintModal: React.FC<FileComplaintModalProps> = ({
  isOpen,
  onClose,
  onSubmitComplaint,
  onTrackNewFIR,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [address, setAddress] = useState('');

  const [category, setCategory] = useState<CrimeCategory>('Theft & Burglary');
  const [stationCode, setStationCode] = useState('C1');
  const [incidentDate, setIncidentDate] = useState('2026-10-15');
  const [incidentTime, setIncidentTime] = useState('14:30');
  const [location, setLocation] = useState('');

  const [description, setDescription] = useState('');
  const [suspectDetails, setSuspectDetails] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const [generatedRefId, setGeneratedRefId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const station = INITIAL_POLICE_STATIONS.find(s => s.code === stationCode) || INITIAL_POLICE_STATIONS[0];
    
    // Generate official Reference ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `CBE/2026/FIR-0${randomNum.toString().slice(0, 3)}`;

    // Legal section mapping
    let bnsSection = 'BNS Sec 303(2) (Theft)';
    let ipcEquivalent = 'IPC Sec 379';
    if (category === 'Cyber Crime & Online Fraud') {
      bnsSection = 'BNS Sec 318(4) & IT Act Sec 66D';
      ipcEquivalent = 'IPC Sec 420 & IT Act 66D';
    } else if (category === 'Vehicle Theft') {
      bnsSection = 'BNS Sec 303(2) (Motor Vehicle)';
      ipcEquivalent = 'IPC Sec 379';
    } else if (category === 'Violent Crime & Assault') {
      bnsSection = 'BNS Sec 115(2) (Hurt) & 351(2)';
      ipcEquivalent = 'IPC Sec 323 & 506';
    } else if (category === 'Women & Child Safety') {
      bnsSection = 'BNS Sec 74 & BNS 351';
      ipcEquivalent = 'IPC Sec 354 & 506';
    } else if (category === 'Financial & Cheating') {
      bnsSection = 'BNS Sec 318(4) (Cheating)';
      ipcEquivalent = 'IPC Sec 420';
    }

    const newRecord: FIRRecord = {
      id: newId,
      stationCode: station.code,
      stationName: station.name,
      subdivision: station.subdivision as any,
      bnsSection,
      ipcEquivalent,
      category,
      severity: category === 'Cyber Crime & Online Fraud' || category === 'Women & Child Safety' ? 'Critical' : 'High',
      incidentDate: `${incidentDate} ${incidentTime}`,
      registrationDate: '2026-10-15 03:00',
      complainantName: fullName || 'Citizen Complainant',
      complainantPhone: phone || '+91 98420 00000',
      incidentLocation: location || `${station.landmark}, Coimbatore`,
      briefDescription: description,
      status: 'Complaint Received',
      investigatingOfficer: {
        name: station.inspectorName,
        rank: 'Inspector of Police',
        phone: station.emergencyDirect,
        badgeNumber: `CBE-${station.code}-001`
      },
      accused: suspectDetails ? [{
        name: suspectDetails,
        age: 30,
        gender: 'Unknown',
        address: 'To be verified during investigation',
        status: 'Suspect'
      }] : [],
      evidence: fileName ? [{
        id: `EVD-${newId}-1`,
        itemDescription: `Citizen Digital Attachment: ${fileName}`,
        category: 'Digital / Cyber',
        seizureDate: '2026-10-15',
        storageLocation: 'Citizen Online Upload Secure Repository',
        verifiedBy: 'System Desk'
      }] : [],
      caseDiary: [{
        date: '2026-10-15 03:00',
        officer: 'Duty Officer',
        rank: 'Sub-Inspector',
        entry: 'Online complaint lodged via Coimbatore City Police e-Portal. Acknowledged and queued for verification.'
      }],
      recoveryAmount: propertyValue ? `Claimed Value: ₹${propertyValue}` : undefined,
      lastUpdated: 'Just now'
    };

    onSubmitComplaint(newRecord);
    setGeneratedRefId(newId);
    setStep(4);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF7F2] border border-[#C8B282] rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden text-[#2B2319]">
        {/* Header with authentic police styling */}
        <div className="bg-[#991B1B] text-white px-6 py-4 flex items-center justify-between border-b border-[#7F1D1D]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-5 h-5 text-[#FDE68A]" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight font-heading">
                File Online Crime Complaint / e-FIR
              </h3>
              <p className="text-xs text-red-200">
                Coimbatore City Police · குற்றப் புகார் பதிவு மையம்
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress tracker */}
        {step < 4 && (
          <div className="px-6 py-3 bg-[#F4EFE6] border-b border-[#E3D6C2] flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 1 ? 'bg-[#991B1B] text-white' : 'bg-[#D6C4A8] text-[#2B2319]'}`}>1</span>
              <span className={step === 1 ? 'font-semibold text-[#991B1B]' : 'text-[#6B5A47]'}>Complainant</span>
            </div>
            <span className="text-[#C8B89E]">/</span>
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 2 ? 'bg-[#991B1B] text-white' : 'bg-[#D6C4A8] text-[#2B2319]'}`}>2</span>
              <span className={step === 2 ? 'font-semibold text-[#991B1B]' : 'text-[#6B5A47]'}>Incident & Station</span>
            </div>
            <span className="text-[#C8B89E]">/</span>
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 3 ? 'bg-[#991B1B] text-white' : 'bg-[#D6C4A8] text-[#2B2319]'}`}>3</span>
              <span className={step === 3 ? 'font-semibold text-[#991B1B]' : 'text-[#6B5A47]'}>Narrative & Evidence</span>
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-[#FFFBEB] border border-[#FDE68A] p-3 rounded-lg text-xs text-[#92400E] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-[#D97706] mt-0.5" />
                <span>
                  Section 217 of Bharatiya Nyaya Sanhita (BNS): Filing false police complaints or misleading information is a cognizable offence punishable by law. Please provide truthful particulars.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                    Complainant Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. S. Karthikeyan"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                    Mobile Number (For OTP & Tracking) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98420 12345"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="citizen@example.com"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                    Aadhaar / Voter ID Number
                  </label>
                  <input
                    type="text"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value)}
                    placeholder="XXXX - XXXX - XXXX"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                  Residential Address in Coimbatore *
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Door No, Street Name, Area (e.g. 14, Cross Cut Road, Gandhipuram, Coimbatore - 641012)"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                />
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  disabled={!fullName || !phone || !address}
                  onClick={() => setStep(2)}
                  className="bg-[#991B1B] hover:bg-[#7F1D1D] disabled:opacity-50 text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-xs"
                >
                  <span>Continue to Incident Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                    Crime Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CrimeCategory)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                  >
                    <option value="Theft & Burglary">Theft & Burglary (திருட்டு)</option>
                    <option value="Cyber Crime & Online Fraud">Cyber Crime & Online Fraud (இணைய குற்றங்கள்)</option>
                    <option value="Vehicle Theft">Vehicle Theft (வாகன திருட்டு)</option>
                    <option value="Violent Crime & Assault">Violent Crime & Assault (தாக்குதல்)</option>
                    <option value="Women & Child Safety">Women & Child Safety (பெண்கள் பாதுகாப்பு)</option>
                    <option value="Financial & Cheating">Financial & Cheating (மோசடி)</option>
                    <option value="Narcotics & NDPS">Narcotics & NDPS (போதைப்பொருள் தகவல்)</option>
                    <option value="Public Nuisance & Traffic">Public Nuisance & Traffic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                    Police Station Jurisdiction *
                  </label>
                  <select
                    value={stationCode}
                    onChange={(e) => setStationCode(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                  >
                    {INITIAL_POLICE_STATIONS.map((st) => (
                      <option key={st.id} value={st.code}>
                        {st.name} ({st.subdivision} Sub-Div)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                    Date of Occurrence *
                  </label>
                  <input
                    type="date"
                    required
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                    Approximate Time
                  </label>
                  <input
                    type="time"
                    value={incidentTime}
                    onChange={(e) => setIncidentTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                  Exact Place of Occurrence (Landmark, Street, Area) *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Near Hope College Bus Stop, Avinashi Road, Peelamedu"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                />
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#6B5A47] hover:text-[#1F1912] font-semibold px-4 py-2"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!location}
                  onClick={() => setStep(3)}
                  className="bg-[#991B1B] hover:bg-[#7F1D1D] disabled:opacity-50 text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-xs"
                >
                  <span>Continue to Crime Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                  Incident Narrative & Description of Offence *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe chronologically what occurred, how the offence was committed, dialogue exchanged, and immediate action taken."
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                    Suspect Information (If known / physical description)
                  </label>
                  <input
                    type="text"
                    value={suspectDetails}
                    onChange={(e) => setSuspectDetails(e.target.value)}
                    placeholder="e.g. Unknown male, approx 25-30 yrs, black helmet, riding pulsar"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                    Estimated Value of Stolen / Defrauded Property (₹)
                  </label>
                  <input
                    type="text"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                    placeholder="e.g. 85,000"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                  Upload Evidence (Bill, Photo, Screenshot, Bank statement, CCTV clip)
                </label>
                <div className="border-2 border-dashed border-[#D1C2A5] rounded-lg p-3 text-center bg-[#FAF6EE] hover:bg-white transition-colors">
                  <input
                    type="file"
                    id="evidence-upload"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="evidence-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-5 h-5 text-[#8B6E4E] mb-1" />
                    <span className="text-xs font-medium text-[#4A3B2C]">
                      {fileName ? `Attached: ${fileName}` : 'Click to attach image, PDF, or video document'}
                    </span>
                    <span className="text-[11px] text-[#8C7A68]">Supports JPG, PNG, PDF, MP4 (Max 25MB)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-[#6B5A47] hover:text-[#1F1912] font-semibold px-4 py-2"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!description}
                  className="bg-[#991B1B] hover:bg-[#7F1D1D] disabled:opacity-50 text-white text-xs font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Official e-Complaint</span>
                </button>
              </div>
            </form>
          )}

          {step === 4 && generatedRefId && (
            <div className="space-y-5 text-center py-2">
              <div className="w-14 h-14 rounded-full bg-[#ECFDF5] border border-[#10B981]/30 text-[#059669] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#1F1912] font-heading">
                  e-Complaint Acknowledged Successfully
                </h4>
                <p className="text-xs text-[#6B5A47] mt-1">
                  Your complaint has been registered in the Coimbatore City Police Crime Record Network.
                </p>
              </div>

              {/* Official Receipt Card */}
              <div className="bg-white border-2 border-[#C8B282] rounded-xl p-5 text-left shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#E8DFC9] pb-3">
                  <div>
                    <span className="text-[11px] text-[#8C7A68] uppercase font-semibold">FIR / Docket Reference</span>
                    <p className="text-base font-bold font-mono text-[#991B1B] tabular-nums">
                      {generatedRefId}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#8C7A68] uppercase font-semibold">Jurisdiction</span>
                    <p className="text-xs font-bold text-[#1F1912]">
                      {INITIAL_POLICE_STATIONS.find(s => s.code === stationCode)?.name}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#8C7A68]">Complainant:</span>
                    <p className="font-semibold text-[#1F1912]">{fullName}</p>
                  </div>
                  <div>
                    <span className="text-[#8C7A68]">Category:</span>
                    <p className="font-semibold text-[#1F1912]">{category}</p>
                  </div>
                  <div>
                    <span className="text-[#8C7A68]">Contact Officer:</span>
                    <p className="font-semibold text-[#1F1912]">
                      {INITIAL_POLICE_STATIONS.find(s => s.code === stationCode)?.inspectorName}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#8C7A68]">Emergency Desk:</span>
                    <p className="font-semibold text-[#1F1912]">
                      {INITIAL_POLICE_STATIONS.find(s => s.code === stationCode)?.emergencyDirect}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E8DFC9] flex items-center justify-between text-[11px] text-[#6B5A47]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#8C7A68]" />
                    Investigation Officer will contact within 2 hours.
                  </span>
                  <span className="font-mono text-[#991B1B]">CCTNS Integrated</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintSlip}
                  className="bg-white border border-[#D1C2A5] hover:bg-[#FAF7F2] text-[#4A3B2C] text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Official Slip</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onTrackNewFIR(generatedRefId);
                  }}
                  className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold px-5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Track Status Real-Time</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
