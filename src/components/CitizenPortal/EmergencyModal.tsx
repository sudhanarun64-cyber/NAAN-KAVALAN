import React, { useState } from 'react';
import { X, PhoneCall, AlertOctagon, Siren, ShieldCheck, MapPin, Radio, CheckCircle2 } from 'lucide-react';
import { INITIAL_POLICE_STATIONS } from '../../data/mockPoliceData';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const [sosDispatched, setSosDispatched] = useState(false);
  const [sosArea, setSosArea] = useState('Gandhipuram Central');

  if (!isOpen) return null;

  const handleDispatchSOS = () => {
    setSosDispatched(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF7F2] border-2 border-[#991B1B] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden text-[#2B2319]">
        {/* Urgent Red Header */}
        <div className="bg-[#991B1B] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 animate-pulse">
              <Siren className="w-6 h-6 text-[#FDE68A]" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">
                Emergency Police Assistance (24x7)
              </h3>
              <p className="text-xs text-red-100">
                Coimbatore City Police Quick Response & Dial 112 Command Center
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick SOS Trigger Box */}
          <div className="bg-[#FEF2F2] border-2 border-[#FECACA] rounded-xl p-5 text-center space-y-3">
            <span className="text-xs font-bold uppercase text-[#991B1B] tracking-wider block">
              IMMEDIATE CITIZEN DANGER / CRIME IN PROGRESS
            </span>
            <h4 className="text-base font-bold text-[#1F1912]">
              Trigger Immediate Cheetah Patrol Van Dispatch
            </h4>
            <p className="text-xs text-[#6B5A47] max-w-md mx-auto">
              Broadcasts your GPS coordinate packet to the nearest active Coimbatore City Police Cheetah mobile patrol unit.
            </p>

            {sosDispatched ? (
              <div className="bg-[#DCFCE7] border border-[#86EFAC] p-4 rounded-lg text-center space-y-1">
                <CheckCircle2 className="w-8 h-8 text-[#15803D] mx-auto" />
                <h5 className="text-sm font-bold text-[#14532D]">
                  SOS Dispatched to Control Room & Cheetah 03!
                </h5>
                <p className="text-xs text-[#166534]">
                  Patrol vehicle ETA to {sosArea} is <strong>4 to 6 minutes</strong>. Control Room is dialing your registered line now.
                </p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <select
                  value={sosArea}
                  onChange={(e) => setSosArea(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-[#D1C2A5] rounded-lg font-semibold"
                >
                  <option value="Gandhipuram Central">Location: Gandhipuram / Cross Cut Rd</option>
                  <option value="Town Hall Bazaar">Location: Town Hall / Big Bazaar</option>
                  <option value="RS Puram DB Road">Location: R.S. Puram / Lawley Rd</option>
                  <option value="Peelamedu Hope College">Location: Peelamedu / Avinashi Rd</option>
                  <option value="Singanallur Junction">Location: Singanallur / Trichy Rd</option>
                  <option value="Ukkadam Lake Area">Location: Ukkadam / Pollachi Rd</option>
                  <option value="Saravanampatti Tech Zone">Location: Saravanampatti / Sathy Rd</option>
                </select>

                <button
                  onClick={handleDispatchSOS}
                  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-extrabold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-md transition-all animate-pulse"
                >
                  <Radio className="w-4 h-4" />
                  <span>DISPATCH EMERGENCY PATROL</span>
                </button>
              </div>
            )}
          </div>

          {/* Core Helplines Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white border border-[#D9CDB8] p-3 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8C7A68] uppercase font-bold">National Emergency</span>
                <p className="text-sm font-bold text-[#1F1912]">Police / Fire / Medical</p>
              </div>
              <a
                href="tel:112"
                className="bg-[#991B1B] text-white font-mono font-bold px-3 py-1.5 rounded-md hover:bg-[#7F1D1D]"
              >
                112
              </a>
            </div>

            <div className="bg-white border border-[#D9CDB8] p-3 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8C7A68] uppercase font-bold">Cyber Fraud Helpline</span>
                <p className="text-sm font-bold text-[#1F1912]">Immediate Bank Freeze</p>
              </div>
              <a
                href="tel:1930"
                className="bg-[#B45309] text-white font-mono font-bold px-3 py-1.5 rounded-md hover:bg-[#92400E]"
              >
                1930
              </a>
            </div>

            <div className="bg-white border border-[#D9CDB8] p-3 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8C7A68] uppercase font-bold">Women Helpline</span>
                <p className="text-sm font-bold text-[#1F1912]">Amma Kavalan / Night Escort</p>
              </div>
              <a
                href="tel:1091"
                className="bg-[#991B1B] text-white font-mono font-bold px-3 py-1.5 rounded-md hover:bg-[#7F1D1D]"
              >
                1091
              </a>
            </div>

            <div className="bg-white border border-[#D9CDB8] p-3 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8C7A68] uppercase font-bold">Coimbatore City Control</span>
                <p className="text-sm font-bold text-[#1F1912]">Commissionerate Master Desk</p>
              </div>
              <a
                href="tel:04222300970"
                className="bg-[#4A3B2C] text-white font-mono font-bold px-2.5 py-1.5 rounded-md text-[11px]"
              >
                0422-2300970
              </a>
            </div>
          </div>

          {/* Station Direct Lines List */}
          <div>
            <h5 className="text-xs font-bold text-[#4A3B2C] uppercase tracking-wider mb-2">
              Station Duty Officer Direct Lines
            </h5>
            <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
              {INITIAL_POLICE_STATIONS.map((st) => (
                <div
                  key={st.id}
                  className="flex items-center justify-between text-xs bg-white px-3 py-1.5 rounded border border-[#E5DAC6]"
                >
                  <span className="font-semibold text-[#1F1912]">
                    <strong className="text-[#991B1B]">{st.code}</strong> · {st.name}
                  </span>
                  <a
                    href={`tel:${st.emergencyDirect}`}
                    className="font-mono text-[#991B1B] hover:underline font-bold"
                  >
                    {st.emergencyDirect}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
