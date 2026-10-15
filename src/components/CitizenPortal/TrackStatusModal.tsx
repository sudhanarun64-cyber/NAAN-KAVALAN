import React, { useState } from 'react';
import { X, Search, CheckCircle, Clock, FileText, Phone, Shield, User, MapPin, Printer } from 'lucide-react';
import { FIRRecord } from '../../types/crime';

interface TrackStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  firs: FIRRecord[];
  initialSearchId?: string;
  onViewOfficialFIR: (fir: FIRRecord) => void;
}

const STAGES = [
  'Complaint Received',
  'Preliminary Inquiry',
  'FIR Registered',
  'Under Investigation',
  'Charge Sheet Filed',
  'Case Disposed'
];

export const TrackStatusModal: React.FC<TrackStatusModalProps> = ({
  isOpen,
  onClose,
  firs,
  initialSearchId = '',
  onViewOfficialFIR
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchId || 'CBE/2026/FIR-0104');
  const [selectedFir, setSelectedFir] = useState<FIRRecord | null>(() => {
    return firs.find(f => f.id === initialSearchId) || firs[0] || null;
  });

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    const found = firs.find(
      f => f.id.toLowerCase().includes(query) || 
           f.complainantPhone.includes(query) ||
           f.complainantName.toLowerCase().includes(query)
    );
    if (found) {
      setSelectedFir(found);
    } else {
      setSelectedFir(null);
    }
  };

  const getStageIndex = (status: string) => {
    if (status === 'Complaint Received') return 0;
    if (status === 'Preliminary Inquiry') return 1;
    if (status === 'FIR Registered') return 2;
    if (status === 'Under Investigation') return 3;
    if (status === 'Charge Sheet Filed' || status === 'Under Trial') return 4;
    if (status === 'Closed & Convicted' || status === 'Case Disposed') return 5;
    return 2;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF7F2] border border-[#C8B282] rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden text-[#2B2319]">
        {/* Header */}
        <div className="bg-[#991B1B] text-white px-6 py-4 flex items-center justify-between border-b border-[#7F1D1D]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <Search className="w-4 h-4 text-[#FDE68A]" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight font-heading">
                Online FIR & Crime Complaint Status Tracker
              </h3>
              <p className="text-xs text-red-200">
                Coimbatore City Police · நிகழ்நேர வழக்கு நிலை அறிதல்
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

        {/* Search bar and quick samples */}
        <div className="p-6 border-b border-[#E8DFC9] bg-[#F4EFE6]">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter FIR / Complaint No. (e.g. CBE/2026/FIR-0104) or Phone Number"
                className="w-full pl-10 pr-3 py-2.5 text-sm bg-white border border-[#D1C2A5] rounded-lg focus:outline-none focus:border-[#991B1B] font-mono"
              />
            </div>
            <button
              type="submit"
              className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              Track Case
            </button>
          </form>

          {/* Quick Select Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
            <span className="text-[#78654C] font-medium">Quick Demo Records:</span>
            {firs.slice(0, 4).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setSearchQuery(f.id);
                  setSelectedFir(f);
                }}
                className="px-2.5 py-1 bg-white border border-[#D9CDB8] hover:border-[#991B1B] rounded-md font-mono text-[11px] text-[#4A3B2C] hover:text-[#991B1B] transition-colors"
              >
                {f.id} ({f.stationCode})
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {selectedFir ? (
            <div className="space-y-6">
              {/* Status Header Strip */}
              <div className="bg-white border border-[#D9CDB8] rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#991B1B] uppercase tracking-wider">
                      {selectedFir.stationName}
                    </span>
                    <span className="text-[#C8B89E]">·</span>
                    <span className="text-xs text-[#78654C]">{selectedFir.subdivision} Sub-Division</span>
                  </div>
                  <h4 className="text-xl font-bold font-mono text-[#1F1912] mt-0.5 tabular-nums">
                    {selectedFir.id}
                  </h4>
                  <p className="text-xs text-[#6B5A47] mt-0.5">
                    Registered: {selectedFir.registrationDate} · Category: <strong className="text-[#1F1912]">{selectedFir.category}</strong>
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedFir.status}</span>
                  </div>
                  <button
                    onClick={() => onViewOfficialFIR(selectedFir)}
                    className="text-xs text-[#991B1B] hover:text-[#7F1D1D] font-bold flex items-center gap-1 underline underline-offset-2"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Official Form II FIR</span>
                  </button>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="bg-white border border-[#D9CDB8] rounded-xl p-5 shadow-xs">
                <h5 className="text-xs font-bold text-[#4A3B2C] uppercase tracking-wider mb-4">
                  Investigation Progress Stages
                </h5>
                <div className="relative flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
                  {STAGES.map((stage, idx) => {
                    const currentIndex = getStageIndex(selectedFir.status);
                    const isPassed = idx <= currentIndex;
                    const isCurrent = idx === currentIndex;

                    return (
                      <div key={stage} className="flex-1 flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 relative">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                            isPassed
                              ? isCurrent
                                ? 'bg-[#991B1B] text-white ring-4 ring-[#FEE2E2]'
                                : 'bg-[#15803D] text-white'
                              : 'bg-[#E5DAC6] text-[#6B5A47]'
                          }`}
                        >
                          {isPassed && !isCurrent ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                        </div>
                        <div>
                          <p className={`text-xs ${isCurrent ? 'font-bold text-[#991B1B]' : isPassed ? 'font-semibold text-[#1F1912]' : 'text-[#8C7A68]'}`}>
                            {stage}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legal Sections & Incident Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-[#D9CDB8] rounded-xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 border-b border-[#EFE7D8] pb-2">
                    <Shield className="w-4 h-4 text-[#991B1B]" />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#4A3B2C]">
                      Legal Code & Charges Framed
                    </h5>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C7A68]">Bharatiya Nyaya Sanhita (BNS 2023):</span>
                    <p className="text-xs font-bold text-[#991B1B] font-mono mt-0.5">
                      {selectedFir.bnsSection}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C7A68]">Legacy IPC Equivalent:</span>
                    <p className="text-xs font-semibold text-[#4A3B2C] font-mono mt-0.5">
                      {selectedFir.ipcEquivalent}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C7A68]">Occurrence Location:</span>
                    <p className="text-xs font-medium text-[#1F1912] mt-0.5 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#991B1B] shrink-0 mt-0.5" />
                      <span>{selectedFir.incidentLocation}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-[#D9CDB8] rounded-xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 border-b border-[#EFE7D8] pb-2">
                    <User className="w-4 h-4 text-[#991B1B]" />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#4A3B2C]">
                      Assigned Investigating Officer (IO)
                    </h5>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C7A68]">Officer Name & Rank:</span>
                    <p className="text-xs font-bold text-[#1F1912] mt-0.5">
                      {selectedFir.investigatingOfficer.name} ({selectedFir.investigatingOfficer.rank})
                    </p>
                    <p className="text-[11px] font-mono text-[#8C7A68]">
                      Badge: {selectedFir.investigatingOfficer.badgeNumber}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C7A68]">Direct Police Helpline:</span>
                    <p className="text-xs font-bold text-[#991B1B] mt-0.5 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selectedFir.investigatingOfficer.phone}</span>
                    </p>
                  </div>
                  {selectedFir.recoveryAmount && (
                    <div className="bg-[#FEF9C3] border border-[#FDE047] p-2 rounded text-xs text-[#854D0E]">
                      <strong>Recovery Status:</strong> {selectedFir.recoveryAmount}
                    </div>
                  )}
                </div>
              </div>

              {/* Case Diary Timeline */}
              <div className="bg-white border border-[#D9CDB8] rounded-xl p-4 shadow-xs">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#4A3B2C] mb-3">
                  Official Case Diary Entries
                </h5>
                <div className="space-y-3">
                  {selectedFir.caseDiary.map((entry, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs border-l-2 border-[#C8B282] pl-3 py-0.5">
                      <div className="shrink-0 w-28 text-[11px] font-mono text-[#78654C]">
                        {entry.date}
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-[#1F1912]">{entry.officer} ({entry.rank}): </span>
                        <span className="text-[#4A3B2C]">{entry.entry}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#6B5A47]">
              <Search className="w-10 h-10 mx-auto text-[#C8B89E] mb-3" />
              <p className="text-sm font-semibold text-[#1F1912]">No Record Found</p>
              <p className="text-xs mt-1">
                Could not find any case matching "{searchQuery}". Please check the docket reference or contact the Station House Officer.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
