import React from 'react';
import { X, Printer, Shield, CheckCircle } from 'lucide-react';
import { FIRRecord } from '../types/crime';

interface OfficialFIRSheetProps {
  fir: FIRRecord | null;
  onClose: () => void;
}

export const OfficialFIRSheet: React.FC<OfficialFIRSheetProps> = ({ fir, onClose }) => {
  if (!fir) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white border-2 border-[#8B1E1E] rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden text-[#1F1912] my-6">
        {/* Top Control Bar */}
        <div className="bg-[#1F1912] text-white px-6 py-3 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#FDE68A] uppercase tracking-wider">
              OFFICIAL POLICE DOCUMENT · CCTNS FORM II
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold px-4 py-1.5 rounded-md flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Form II FIR</span>
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div className="p-8 sm:p-12 space-y-6 bg-[#FCFBF9] border-t border-[#D9CDB8] text-xs font-serif leading-relaxed">
          {/* Header Seal & Emblem */}
          <div className="text-center space-y-1.5 border-b-2 border-[#1F1912] pb-4">
            <div className="flex items-center justify-center gap-4">
              <img
                src="/src/assets/images/coimbatore_police_seal_1792058757220.jpg"
                alt="Tamil Nadu Police Seal"
                className="w-16 h-16 rounded-full border border-[#C8B282]"
                referrerPolicy="no-referrer"
              />
              <div>
                <h2 className="text-base font-bold uppercase tracking-wider text-[#1F1912]">
                  GOVERNMENT OF TAMIL NADU · POLICE DEPARTMENT
                </h2>
                <h3 className="text-lg font-extrabold text-[#991B1B] font-heading">
                  COIMBATORE CITY POLICE COMMISSIONERATE
                </h3>
                <p className="text-[11px] text-[#4A3B2C] italic">
                  Integrated Crime Management System (CCTNS) · முதல் தகவல் அறிக்கை
                </p>
              </div>
            </div>
            <div className="pt-2 text-center">
              <span className="inline-block bg-[#1F1912] text-white font-mono font-bold px-4 py-0.5 text-xs tracking-widest uppercase">
                FIRST INFORMATION REPORT (Under Sec 173 BNSS 2023 / Sec 154 CrPC)
              </span>
            </div>
          </div>

          {/* Core Case Particulars Table */}
          <div className="border border-[#1F1912] divide-y divide-[#1F1912]">
            <div className="grid grid-cols-4 divide-x divide-[#1F1912] bg-[#F4EFE6] font-semibold text-[11px]">
              <div className="p-2">1. District: <strong>COIMBATORE CITY</strong></div>
              <div className="p-2">Sub-Division: <strong>{fir.subdivision.toUpperCase()}</strong></div>
              <div className="p-2">Police Station: <strong>{fir.stationCode} - {fir.stationName}</strong></div>
              <div className="p-2">Year: <strong>2026</strong></div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-[#1F1912] text-xs">
              <div className="p-2.5">
                <span className="text-[10px] uppercase font-bold text-[#6B5A47] block">FIR Number & Date</span>
                <span className="font-mono font-bold text-sm text-[#991B1B] tabular-nums">{fir.id}</span>
                <p className="text-[11px] text-[#4A3B2C]">{fir.registrationDate} hrs</p>
              </div>
              <div className="p-2.5">
                <span className="text-[10px] uppercase font-bold text-[#6B5A47] block">Acts & Legal Sections</span>
                <span className="font-bold text-[#1F1912] font-mono block">{fir.bnsSection}</span>
                <span className="text-[11px] text-[#6B5A47] italic">Corresponding: {fir.ipcEquivalent}</span>
              </div>
              <div className="p-2.5">
                <span className="text-[10px] uppercase font-bold text-[#6B5A47] block">Current Case Status</span>
                <span className="font-bold text-[#991B1B]">{fir.status}</span>
                <p className="text-[11px] text-[#6B5A47]">Severity: {fir.severity}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-[#1F1912] text-xs">
              <div className="p-2.5">
                <span className="text-[10px] uppercase font-bold text-[#6B5A47] block">Occurrence of Offence</span>
                <p><strong>Date & Time:</strong> {fir.incidentDate} hrs</p>
                <p><strong>General Diary Ref:</strong> GD Entry #18 / {fir.registrationDate.slice(0, 10)}</p>
              </div>
              <div className="p-2.5">
                <span className="text-[10px] uppercase font-bold text-[#6B5A47] block">Place of Occurrence</span>
                <p><strong>Exact Spot:</strong> {fir.incidentLocation}</p>
                <p><strong>Jurisdiction Distance:</strong> Approx 1.8 km from Police Station</p>
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-[#1F1912] text-xs">
              <div className="p-2.5">
                <span className="text-[10px] uppercase font-bold text-[#6B5A47] block">Complainant / Informant</span>
                <p><strong>Name:</strong> {fir.complainantName}</p>
                <p><strong>Contact:</strong> {fir.complainantPhone}</p>
              </div>
              <div className="p-2.5">
                <span className="text-[10px] uppercase font-bold text-[#6B5A47] block">Suspect / Accused Particulars</span>
                {fir.accused.length > 0 ? (
                  fir.accused.map((a, i) => (
                    <p key={i}>
                      <strong>{i + 1}. {a.name}</strong> ({a.status}) · Age: {a.age}
                    </p>
                  ))
                ) : (
                  <p className="italic text-[#6B5A47]">Unknown suspects - Under investigation</p>
                )}
              </div>
            </div>
          </div>

          {/* Brief of Incident */}
          <div className="border border-[#1F1912] p-4 bg-white space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5A47] block">
              First Information Contents / Gist of Complaint (குற்ற விவரம்):
            </span>
            <p className="text-xs text-[#1F1912] leading-relaxed font-sans">
              {fir.briefDescription}
            </p>
          </div>

          {/* Seized Properties / Evidence if any */}
          {fir.evidence.length > 0 && (
            <div className="border border-[#1F1912] p-3 bg-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5A47] block mb-2">
                Particulars of Seized Property & Physical Evidence (Mahazar List):
              </span>
              <table className="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr className="bg-[#F4EFE6] border-b border-[#1F1912]">
                    <th className="p-1 font-bold">Item #</th>
                    <th className="p-1 font-bold">Description</th>
                    <th className="p-1 font-bold">Category</th>
                    <th className="p-1 font-bold">Custody Location</th>
                  </tr>
                </thead>
                <tbody>
                  {fir.evidence.map((ev, i) => (
                    <tr key={ev.id} className="border-b border-[#E5DAC6]">
                      <td className="p-1 font-mono">{i + 1}</td>
                      <td className="p-1">{ev.itemDescription}</td>
                      <td className="p-1 font-semibold">{ev.category}</td>
                      <td className="p-1">{ev.storageLocation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Signatures & Seal Block */}
          <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <p className="font-bold text-[#1F1912]">Signature / Thumb Impression of Informant</p>
              <div className="h-14 flex items-end justify-center">
                <span className="italic text-[#6B5A47]">[ Digitally Signed via CCMS Portal ]</span>
              </div>
              <p className="text-[11px] text-[#4A3B2C]">{fir.complainantName}</p>
            </div>

            <div>
              <p className="font-bold text-[#1F1912]">Signature of Officer-in-Charge / Investigating Officer</p>
              <div className="h-14 flex items-end justify-center flex-col items-center">
                <div className="w-24 h-8 border border-dashed border-[#991B1B] text-[#991B1B] flex items-center justify-center font-mono text-[10px] font-bold uppercase">
                  VERIFIED SHO
                </div>
              </div>
              <p className="font-bold text-[#1F1912] mt-1">{fir.investigatingOfficer.name}</p>
              <p className="text-[11px] text-[#4A3B2C]">{fir.investigatingOfficer.rank} · Badge: {fir.investigatingOfficer.badgeNumber}</p>
              <p className="text-[11px] text-[#991B1B] font-semibold">{fir.stationName}</p>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-[#D9CDB8] text-[10px] text-[#8C7A68]">
            Coimbatore City Police Commissionerate · Generated electronically under the Authority of Government of Tamil Nadu.
          </div>
        </div>
      </div>
    </div>
  );
};
