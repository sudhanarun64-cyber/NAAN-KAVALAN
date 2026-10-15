import React from 'react';
import { ShieldAlert, FileText, Search, PhoneCall, AlertTriangle, CheckCircle2, ChevronRight, Lock, MapPin } from 'lucide-react';

interface CitizenHeroProps {
  onOpenFileComplaint: () => void;
  onOpenTrackModal: () => void;
  onOpenEmergencyModal: () => void;
  onSwitchToOfficer: () => void;
}

export const CitizenHero: React.FC<CitizenHeroProps> = ({
  onOpenFileComplaint,
  onOpenTrackModal,
  onOpenEmergencyModal,
  onSwitchToOfficer
}) => {
  return (
    <div className="bg-[#FAF7F2] border-b border-[#E5DAC6]">
      {/* Hero Banner with Headquarters photo and prompt callouts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Text & Action triggers */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4EFE6] border border-[#D9CDB8] text-xs font-semibold text-[#8B1E1E]">
              <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
              <span>OFFICIAL TAMIL NADU POLICE CITIZEN CRIME PORTAL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F1912] leading-[1.15] font-heading">
              Coimbatore City Police <br />
              <span className="text-[#991B1B]">Crime Management Portal</span>
            </h1>

            <p className="text-sm sm:text-base text-[#5A4836] leading-relaxed max-w-2xl">
              Transparent, swift law enforcement for 2.2 million citizens of Coimbatore. 
              File online crime complaints, track investigation progress under Bharatiya Nyaya Sanhita (BNS), 
              verify stolen vehicles, and access round-the-clock emergency assistance.
            </p>

            {/* Quick Primary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenFileComplaint}
                className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-sm font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <FileText className="w-4 h-4 text-[#FDE68A]" />
                <span>File e-Complaint / FIR</span>
              </button>

              <button
                onClick={onOpenTrackModal}
                className="bg-white border-2 border-[#C8B282] hover:border-[#991B1B] text-[#1F1912] hover:text-[#991B1B] text-sm font-bold px-5 py-3 rounded-lg flex items-center gap-2 transition-all shadow-xs"
              >
                <Search className="w-4 h-4 text-[#991B1B]" />
                <span>Track Complaint Status</span>
              </button>

              <button
                onClick={onOpenEmergencyModal}
                className="bg-[#FEF2F2] border border-[#FECACA] hover:bg-[#FEE2E2] text-[#991B1B] text-sm font-bold px-4 py-3 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#DC2626]" />
                <span>Emergency Help</span>
              </button>
            </div>

            {/* Official Key Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E8DFC9]">
              <div className="bg-white/80 border border-[#E8DFC9] p-2.5 rounded-lg">
                <span className="text-[11px] text-[#78654C] font-medium block">Jurisdiction Stations</span>
                <span className="text-xl font-bold font-mono text-[#991B1B] tabular-nums">10 Stations</span>
              </div>
              <div className="bg-white/80 border border-[#E8DFC9] p-2.5 rounded-lg">
                <span className="text-[11px] text-[#78654C] font-medium block">Resolution Rate</span>
                <span className="text-xl font-bold font-mono text-[#15803D] tabular-nums">84.6%</span>
              </div>
              <div className="bg-white/80 border border-[#E8DFC9] p-2.5 rounded-lg">
                <span className="text-[11px] text-[#78654C] font-medium block">Active Beat Units</span>
                <span className="text-xl font-bold font-mono text-[#1F1912] tabular-nums">32 Cheetahs</span>
              </div>
              <div className="bg-white/80 border border-[#E8DFC9] p-2.5 rounded-lg">
                <span className="text-[11px] text-[#78654C] font-medium block">Cyber Recovery</span>
                <span className="text-xl font-bold font-mono text-[#B45309] tabular-nums">₹1.84 Cr</span>
              </div>
            </div>
          </div>

          {/* Right: Authentic Law Enforcement Visual Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C8B282] shadow-xl bg-black">
              <img
                src="/src/assets/images/coimbatore_police_hq_1792058758321.jpg"
                alt="Coimbatore City Police Commissionerate"
                className="w-full h-64 object-cover opacity-90 hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1912] via-[#1F1912]/40 to-transparent p-5 flex flex-col justify-end text-white">
                <span className="text-xs font-bold text-[#FDE68A] uppercase tracking-wider">
                  COMMISSIONERATE HEADQUARTERS
                </span>
                <h3 className="text-lg font-bold font-heading">
                  Coimbatore City Police Commissionerate
                </h3>
                <p className="text-xs text-slate-200 mt-0.5">
                  Old Hosur Road, Opp. Police Grounds, Coimbatore - 641018
                </p>
              </div>
            </div>

            {/* Commissioner Message / Desk Card */}
            <div className="bg-white border border-[#D9CDB8] rounded-xl p-4 shadow-xs flex items-center gap-4">
              <img
                src="/src/assets/images/commissioner_portrait_1792058758826.jpg"
                alt="Commissioner of Police"
                className="w-16 h-16 rounded-lg object-cover border border-[#C8B282] shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 text-xs">
                <span className="text-[10px] font-bold text-[#991B1B] uppercase tracking-wider block">
                  COMMISSIONER'S MESSAGE
                </span>
                <p className="text-xs font-bold text-[#1F1912] mt-0.5">
                  "Zero tolerance towards organized crime, drug peddling & cyber fraud."
                </p>
                <p className="text-[11px] text-[#6B5A47] mt-1">
                  Coimbatore City Police Commissionerate · மக்கள் சேவையில் காவல்
                </p>
              </div>
              <button
                onClick={onSwitchToOfficer}
                className="shrink-0 p-2 text-xs font-bold text-[#991B1B] hover:bg-[#FEF2F2] rounded-lg border border-[#FCA5A5] flex items-center gap-1"
                title="Law Enforcement Officer Login"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">COP-NET</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
