import React, { useState } from 'react';
import { Eye, Car, AlertTriangle, Search, CheckCircle, ShieldAlert, Phone, Send, Info } from 'lucide-react';
import { MissingPerson, StolenVehicle } from '../../types/crime';
import { POLICE_ADVISORIES } from '../../data/mockPoliceData';

interface CrimeWatchPublicProps {
  missingPersons: MissingPerson[];
  stolenVehicles: StolenVehicle[];
  onReportTip: (tip: { subject: string; location: string; details: string; phone: string }) => void;
}

export const CrimeWatchPublic: React.FC<CrimeWatchPublicProps> = ({
  missingPersons,
  stolenVehicles,
  onReportTip
}) => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'missing' | 'advisories'>('vehicles');
  const [vehicleSearch, setVehicleSearch] = useState('');
  
  // Tip modal state
  const [tipModalOpen, setTipModalOpen] = useState(false);
  const [tipSubject, setTipSubject] = useState('');
  const [tipLocation, setTipLocation] = useState('');
  const [tipDetails, setTipDetails] = useState('');
  const [tipPhone, setTipPhone] = useState('');
  const [tipSuccess, setTipSuccess] = useState(false);

  const filteredVehicles = stolenVehicles.filter(v =>
    v.registrationNumber.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
    v.makeModel.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
    v.stolenLocation.toLowerCase().includes(vehicleSearch.toLowerCase())
  );

  const handleOpenTip = (subject: string) => {
    setTipSubject(subject);
    setTipModalOpen(true);
    setTipSuccess(false);
  };

  const handleSendTip = (e: React.FormEvent) => {
    e.preventDefault();
    onReportTip({
      subject: tipSubject,
      location: tipLocation,
      details: tipDetails,
      phone: tipPhone
    });
    setTipSuccess(true);
    setTimeout(() => {
      setTipModalOpen(false);
      setTipDetails('');
      setTipLocation('');
      setTipPhone('');
      setTipSuccess(false);
    }, 2000);
  };

  return (
    <section id="crimewatch" className="py-12 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#991B1B] uppercase tracking-wider mb-1">
              <Eye className="w-4 h-4" />
              <span>COMMUNITY SURVEILLANCE & PUBLIC ALERTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F1912] font-heading">
              Coimbatore Crime Watch & Public Notices
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5A47] mt-1">
              Search stolen vehicle registries, assist with missing person tracing, and review official advisories.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1 p-1 bg-[#E8DFC9] rounded-lg">
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'vehicles' ? 'bg-[#991B1B] text-white shadow-xs' : 'text-[#4A3B2C] hover:text-[#1F1912]'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Stolen Vehicles ({stolenVehicles.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('missing')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'missing' ? 'bg-[#991B1B] text-white shadow-xs' : 'text-[#4A3B2C] hover:text-[#1F1912]'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Missing Persons ({missingPersons.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('advisories')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'advisories' ? 'bg-[#991B1B] text-white shadow-xs' : 'text-[#4A3B2C] hover:text-[#1F1912]'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Advisories</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Stolen Vehicles */}
        {activeTab === 'vehicles' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#F5EFEB] p-4 rounded-xl border border-[#E5DAC6]">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#8C7A68] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={vehicleSearch}
                  onChange={(e) => setVehicleSearch(e.target.value)}
                  placeholder="Enter TN reg number (e.g. TN 38 DJ 9912)..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D1C2A5] rounded-lg focus:outline-none focus:border-[#991B1B] font-mono"
                />
              </div>
              <p className="text-xs text-[#78654C]">
                Integrated with Tamil Nadu State Inter-Checkpost Vahan Surveillance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredVehicles.map((veh) => (
                <div
                  key={veh.id}
                  className="bg-white border border-[#D9CDB8] rounded-xl p-4 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-[#8C7A68]">{veh.vehicleType}</span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          veh.status === 'Recovered'
                            ? 'bg-[#DCFCE7] text-[#15803D]'
                            : veh.status === 'Seized at Checkpost'
                            ? 'bg-[#FEF9C3] text-[#A16207]'
                            : 'bg-[#FEE2E2] text-[#991B1B]'
                        }`}
                      >
                        {veh.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-mono text-[#1F1912] tabular-nums">
                      {veh.registrationNumber}
                    </h4>
                    <p className="text-xs font-semibold text-[#4A3B2C] mt-0.5">{veh.makeModel}</p>
                    <p className="text-[11px] text-[#8C7A68]">Color: {veh.color}</p>

                    <div className="mt-3 pt-2 border-t border-[#F0E6D5] text-[11px] space-y-1 text-[#6B5A47]">
                      <div>
                        <span>Stolen: </span>
                        <strong className="text-[#1F1912]">{veh.stolenDate}</strong>
                      </div>
                      <div className="truncate">
                        <span>Place: </span>
                        <span className="text-[#1F1912]">{veh.stolenLocation}</span>
                      </div>
                      <div>
                        <span>FIR Ref: </span>
                        <span className="font-mono text-[#991B1B] font-semibold">{veh.firNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <button
                      onClick={() => handleOpenTip(`Stolen Vehicle Sighting: ${veh.registrationNumber} (${veh.makeModel})`)}
                      className="w-full bg-[#FAF7F2] hover:bg-[#991B1B] hover:text-white border border-[#D1C2A5] text-[#4A3B2C] text-xs font-semibold py-1.5 rounded-lg transition-colors"
                    >
                      Report Sighting Tip
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Missing Persons */}
        {activeTab === 'missing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {missingPersons.map((mp) => (
              <div
                key={mp.id}
                className="bg-white border border-[#D9CDB8] rounded-xl p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#F0E6D5] pb-2 mb-3">
                    <span className="font-mono text-xs text-[#8C7A68]">{mp.id}</span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        mp.status === 'Located'
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : 'bg-[#FEE2E2] text-[#991B1B]'
                      }`}
                    >
                      {mp.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#1F1912] font-heading">{mp.name}</h4>
                  <p className="text-xs text-[#6B5A47] mt-0.5">
                    Age: <strong className="text-[#1F1912]">{mp.age} yrs</strong> · Gender: {mp.gender} · Height: {mp.height}
                  </p>

                  <div className="mt-3 space-y-2 text-xs text-[#4A3B2C] bg-[#FAF7F2] p-3 rounded-lg border border-[#E5DAC6]">
                    <div>
                      <span className="text-[11px] text-[#8C7A68] block">Last Seen Location:</span>
                      <strong className="text-[#1F1912]">{mp.missingFrom}</strong> (Since {mp.missingSince})
                    </div>
                    <div>
                      <span className="text-[11px] text-[#8C7A68] block">Identifying Marks:</span>
                      <p className="text-[#2B2319]">{mp.identifyingMarks}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0E6D5] flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-[10px] text-[#8C7A68] uppercase font-bold block">Assigned Station</span>
                    <span className="font-semibold text-[#1F1912]">{mp.contactStation}</span>
                  </div>
                  <button
                    onClick={() => handleOpenTip(`Missing Person Sighting: ${mp.name} (${mp.id})`)}
                    className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                  >
                    Send Tip
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Advisories */}
        {activeTab === 'advisories' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {POLICE_ADVISORIES.map((adv) => (
              <div
                key={adv.id}
                className="bg-white border border-[#D9CDB8] rounded-xl p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-[#991B1B]">{adv.tag}</span>
                    <span className="text-[#8C7A68] font-mono">{adv.date}</span>
                  </div>
                  <h4 className="text-base font-bold text-[#1F1912] font-heading">{adv.title}</h4>
                  <p className="text-xs text-[#4A3B2C] leading-relaxed mt-2">{adv.summary}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F0E6D5] flex items-center justify-between text-xs">
                  <span className="text-[#8C7A68]">Issued by CoP Office</span>
                  <a href="tel:100" className="text-[#991B1B] font-bold hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>Control Room</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tip modal */}
      {tipModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-[#FAF7F2] border border-[#C8B282] rounded-xl shadow-2xl w-full max-w-md p-6 text-[#2B2319]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFC9] mb-4">
              <h3 className="text-sm font-bold text-[#1F1912] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#991B1B]" />
                <span>Submit Confidential Sighting / Tip</span>
              </h3>
              <button
                onClick={() => setTipModalOpen(false)}
                className="text-[#8C7A68] hover:text-[#1F1912]"
              >
                ✕
              </button>
            </div>

            {tipSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-[#15803D] mx-auto" />
                <h4 className="text-base font-bold text-[#1F1912]">Tip Submitted to Control Room</h4>
                <p className="text-xs text-[#6B5A47]">
                  Thank you for assisting Coimbatore City Police. Beat patrol units in the area have been notified.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendTip} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8C7A68] uppercase">Subject</label>
                  <input
                    type="text"
                    disabled
                    value={tipSubject}
                    className="w-full px-3 py-1.5 text-xs bg-[#EFE7D8] border border-[#D1C2A5] rounded-md font-medium text-[#1F1912]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                    Where did you see this person/vehicle? *
                  </label>
                  <input
                    type="text"
                    required
                    value={tipLocation}
                    onChange={(e) => setTipLocation(e.target.value)}
                    placeholder="e.g. Near Gandhipuram Cross Cut Road, 10 minutes ago"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                    Details / Direction of Movement *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={tipDetails}
                    onChange={(e) => setTipDetails(e.target.value)}
                    placeholder="Mention clothing, direction travelled, companion details..."
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3B2C] mb-1">
                    Your Contact Phone (Optional - Kept strictly confidential)
                  </label>
                  <input
                    type="tel"
                    value={tipPhone}
                    onChange={(e) => setTipPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D1C2A5] rounded-md focus:outline-none focus:border-[#991B1B]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setTipModalOpen(false)}
                    className="text-xs text-[#6B5A47] px-3 py-1.5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Tip to Police Control</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
