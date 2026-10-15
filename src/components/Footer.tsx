import React from 'react';
import { Shield, Phone, ExternalLink, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenEmergencyModal: () => void;
  onOpenComplaintModal: () => void;
  onOpenTrackModal: () => void;
  onSwitchToOfficer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenEmergencyModal,
  onOpenComplaintModal,
  onOpenTrackModal,
  onSwitchToOfficer
}) => {
  return (
    <footer className="bg-[#1F1912] text-[#E5DAC6] border-t-4 border-[#991B1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/coimbatore_police_seal_1792058757220.jpg"
                alt="Coimbatore City Police Seal"
                className="w-12 h-12 rounded-full border border-[#C8B282]"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-sm font-bold text-white font-heading">
                  COIMBATORE CITY POLICE
                </h4>
                <p className="text-[11px] text-[#C8B89E]">
                  தமிழ்நாடு காவல் துறை · CCMS
                </p>
              </div>
            </div>
            <p className="text-xs text-[#A89884] leading-relaxed">
              Serving with honor, integrity, and valor for peace and crime deterrence across Coimbatore City Commissionerate limits.
            </p>
            <div className="text-xs text-[#C8B89E] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#991B1B] shrink-0" />
              <span>Commissionerate, Old Hosur Road, Coimbatore - 641018</span>
            </div>
          </div>

          {/* Col 2: Citizen Quick Links */}
          <div className="space-y-2 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FDE68A] block">
              Citizen Public Services
            </span>
            <ul className="space-y-1.5 text-[#C8B89E]">
              <li>
                <button onClick={onOpenComplaintModal} className="hover:text-white transition-colors">
                  File Online e-Complaint / FIR
                </button>
              </li>
              <li>
                <button onClick={onOpenTrackModal} className="hover:text-white transition-colors">
                  Check FIR Status by Docket No.
                </button>
              </li>
              <li>
                <a href="#stations" className="hover:text-white transition-colors">
                  Police Station Directory & Officers
                </a>
              </li>
              <li>
                <a href="#crimewatch" className="hover:text-white transition-colors">
                  Stolen Vehicle Registry Search
                </a>
              </li>
              <li>
                <a href="#crimewatch" className="hover:text-white transition-colors">
                  Missing Persons Bulletin
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Helplines */}
          <div className="space-y-2 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FDE68A] block">
              Direct Emergency Helplines
            </span>
            <div className="space-y-2 text-[#C8B89E]">
              <div>
                <span className="text-[10px] text-[#A89884] block">Police Control Room (24x7):</span>
                <a href="tel:100" className="font-mono text-white font-bold hover:text-[#FDE68A]">
                  100 / 112 (Toll Free)
                </a>
              </div>
              <div>
                <span className="text-[10px] text-[#A89884] block">National Cyber Fraud:</span>
                <a href="tel:1930" className="font-mono text-white font-bold hover:text-[#FDE68A]">
                  1930 (Golden Hour Freeze)
                </a>
              </div>
              <div>
                <span className="text-[10px] text-[#A89884] block">Women Safety Helpline:</span>
                <a href="tel:1091" className="font-mono text-white font-bold hover:text-[#FDE68A]">
                  1091 (Kavalan SOS)
                </a>
              </div>
              <div>
                <span className="text-[10px] text-[#A89884] block">Child Protection Desk:</span>
                <a href="tel:1098" className="font-mono text-white font-bold hover:text-[#FDE68A]">
                  1098
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Officer Terminal & Legal Note */}
          <div className="space-y-3 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FDE68A] block">
              Law Enforcement Portal
            </span>
            <p className="text-xs text-[#A89884]">
              Authorized station house officers and investigating personnel can access COP-NET digital crime dossiers.
            </p>
            <button
              onClick={onSwitchToOfficer}
              className="w-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold py-2 rounded-lg text-xs transition-colors shadow-sm"
            >
              Access Officer Terminal
            </button>
            <p className="text-[10px] text-[#78654C] italic leading-tight">
              Statutory Notice: All online complaints are verified under Section 173 of Bharatiya Nagarik Suraksha Sanhita (BNSS 2023).
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#3B3024] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7A68] gap-3">
          <p>© 2026 Coimbatore City Police, Government of Tamil Nadu. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Use</span>
            <span>·</span>
            <span>CCTNS Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
