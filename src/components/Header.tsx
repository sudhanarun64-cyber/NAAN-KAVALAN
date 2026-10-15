import React, { useState } from 'react';
import { Shield, PhoneCall, Radio, AlertOctagon, UserCheck, Lock, ExternalLink, Siren } from 'lucide-react';

interface HeaderProps {
  activeView: 'citizen' | 'officer';
  setActiveView: (view: 'citizen' | 'officer') => void;
  onOpenComplaintModal: () => void;
  onOpenTrackModal: () => void;
  onOpenEmergencyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  onOpenComplaintModal,
  onOpenTrackModal,
  onOpenEmergencyModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2] border-b border-[#E5DAC6] shadow-xs">
      {/* Official Government Emergency Ribbon */}
      <div className="bg-[#991B1B] text-[#FAF7F2] text-xs font-medium px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#7F1D1D]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-semibold tracking-wide text-[#FDE68A]">
            <Siren className="w-3.5 h-3.5 text-red-200" />
            24x7 POLICE CONTROL ROOM: 100 / 112
          </span>
          <span className="hidden sm:inline text-red-200/60">|</span>
          <span className="hidden sm:inline text-red-100">
            Cyber Fraud Helpline: <strong className="text-white">1930</strong>
          </span>
          <span className="hidden md:inline text-red-200/60">|</span>
          <span className="hidden md:inline text-red-100">
            Women & Child: <strong className="text-white">1091</strong>
          </span>
          <span className="hidden lg:inline text-red-200/60">|</span>
          <span className="hidden lg:inline text-red-100">
            Coimbatore HQ Desk: <strong className="text-white">0422-2300970</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button 
            onClick={onOpenEmergencyModal}
            className="flex items-center gap-1.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-[11px] font-bold px-2.5 py-0.5 rounded transition-colors shadow-xs"
          >
            <AlertOctagon className="w-3 h-3 text-white" />
            <span>Emergency SOS</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar - adhering to 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with Seal */}
        <div className="flex items-center gap-3 shrink-0">
          <img 
            src="/src/assets/images/coimbatore_police_seal_1792058757220.jpg" 
            alt="Coimbatore City Police Seal" 
            className="w-11 h-11 object-cover rounded-full border border-[#C8B282] shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#1F1912] font-heading">
                COIMBATORE CITY POLICE
              </span>
              <span className="hidden md:inline text-[11px] font-semibold text-[#8B1E1E] bg-[#F7EFE1] border border-[#E3D4BC] px-1.5 py-0.2 rounded">
                தமிழ்நாடு காவல்
              </span>
            </div>
            <span className="text-[11px] text-[#78654C] font-medium tracking-wide">
              Crime Management & Public Safety System · CCMS
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#4A3B2C]">
          <button
            onClick={() => setActiveView('citizen')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#991B1B] ${
              activeView === 'citizen' ? 'text-[#991B1B] font-semibold underline underline-offset-4 decoration-2 decoration-[#991B1B]' : ''
            }`}
          >
            Citizen Services
          </button>
          <button
            onClick={onOpenTrackModal}
            className="transition-colors whitespace-nowrap shrink-0 hover:text-[#991B1B]"
          >
            Track FIR / Complaint
          </button>
          <button
            onClick={onOpenComplaintModal}
            className="transition-colors whitespace-nowrap shrink-0 hover:text-[#991B1B]"
          >
            File e-Complaint
          </button>
          <a
            href="#stations"
            onClick={() => setActiveView('citizen')}
            className="transition-colors whitespace-nowrap shrink-0 hover:text-[#991B1B]"
          >
            Police Stations
          </a>
          <a
            href="#crimewatch"
            onClick={() => setActiveView('citizen')}
            className="transition-colors whitespace-nowrap shrink-0 hover:text-[#991B1B]"
          >
            Crime Watch
          </a>
        </nav>

        {/* Zone 3: Primary Action / Mode Switch */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center p-1 bg-[#EFE7D8] border border-[#D9CDB8] rounded-lg">
            <button
              onClick={() => setActiveView('citizen')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeView === 'citizen'
                  ? 'bg-white text-[#991B1B] shadow-xs'
                  : 'text-[#614E3A] hover:text-[#1F1912]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Public Portal</span>
            </button>
            <button
              onClick={() => setActiveView('officer')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeView === 'officer'
                  ? 'bg-[#991B1B] text-white shadow-xs'
                  : 'text-[#614E3A] hover:text-[#1F1912]'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Officer Console</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
