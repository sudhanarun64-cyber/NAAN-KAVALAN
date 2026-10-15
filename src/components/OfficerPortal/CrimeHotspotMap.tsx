import React, { useState } from 'react';
import { MapPin, Shield, Radio, Video, AlertTriangle, Navigation, CheckCircle2, Siren, Layers } from 'lucide-react';
import { CrimeHotspot } from '../../types/crime';

interface CrimeHotspotMapProps {
  hotspots: CrimeHotspot[];
}

export const CrimeHotspotMap: React.FC<CrimeHotspotMapProps> = ({ hotspots }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<CrimeHotspot | null>(hotspots[0]);
  const [showCCTV, setShowCCTV] = useState(true);
  const [showPatrols, setShowPatrols] = useState(true);
  const [dispatchedUnit, setDispatchedUnit] = useState<string | null>(null);

  const handleDispatchPatrol = (unit: string) => {
    setDispatchedUnit(unit);
    setTimeout(() => {
      setDispatchedUnit(null);
    }, 4000);
  };

  return (
    <div className="space-y-4">
      {/* Top Map Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#EFE7D8] p-3 rounded-xl border border-[#D9CDB8]">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-[#991B1B]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F1912]">
            Coimbatore City Police GIS Patrol & Hotspot Grid
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setShowPatrols(!showPatrols)}
            className={`px-2.5 py-1 rounded-md font-semibold border transition-colors flex items-center gap-1.5 ${
              showPatrols ? 'bg-[#991B1B] text-white border-[#7F1D1D]' : 'bg-white text-[#4A3B2C] border-[#D1C2A5]'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Cheetah Patrol Units (Active: 8)</span>
          </button>

          <button
            onClick={() => setShowCCTV(!showCCTV)}
            className={`px-2.5 py-1 rounded-md font-semibold border transition-colors flex items-center gap-1.5 ${
              showCCTV ? 'bg-[#1F1912] text-white border-black' : 'bg-white text-[#4A3B2C] border-[#D1C2A5]'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Smart City CCTV Feeds (1540+)</span>
          </button>
        </div>
      </div>

      {/* Main Map Viewport & Detail Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Spatial Map Canvas */}
        <div className="lg:col-span-8 bg-[#2A231B] border-2 border-[#8B1E1E] rounded-xl overflow-hidden relative min-h-[460px] p-6 shadow-inner select-none flex flex-col justify-between">
          {/* Tactical Map Grid Lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C8B282_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Road Network Overlays (Stylized Coimbatore Arteries) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#C8B282]/25" strokeWidth="2" fill="none">
            {/* Avinashi Road (East to NE) */}
            <path d="M 380 240 Q 550 180 750 140" strokeWidth="3" stroke="#C8B282]/40" />
            {/* Trichy Road (East to SE) */}
            <path d="M 380 260 Q 550 280 780 320" strokeWidth="3" stroke="#C8B282]/40" />
            {/* Sathy Road (North) */}
            <path d="M 460 220 L 600 70" strokeWidth="2.5" />
            {/* Pollachi / Palakkad Road (South/SW) */}
            <path d="M 340 320 L 220 440" strokeWidth="3" />
            {/* Mettupalayam Road (NW) */}
            <path d="M 380 210 L 260 70" strokeWidth="2.5" />
            {/* Outer Ring Circle */}
            <circle cx="430" cy="250" r="160" strokeDasharray="4 4" stroke="#991B1B]/30" />
          </svg>

          {/* Map Heading Overlay */}
          <div className="relative z-10 flex items-center justify-between pointer-events-none">
            <div className="bg-[#1F1912]/90 border border-[#C8B282]/40 px-3 py-1.5 rounded-md backdrop-blur-xs">
              <span className="text-[10px] text-[#C8B89E] uppercase font-mono block">COMMISSIONERATE SECTOR MAP</span>
              <span className="text-xs font-bold text-white font-mono">COIMBATORE URBAN JURISDICTION</span>
            </div>
            <div className="text-right bg-[#1F1912]/90 border border-[#C8B282]/40 px-3 py-1.5 rounded-md backdrop-blur-xs">
              <span className="text-[10px] text-[#FDE68A] font-mono">SECTOR SENSORS: ONLINE</span>
            </div>
          </div>

          {/* Map Markers for Hotspots */}
          <div className="relative z-10 flex-1 my-4">
            {hotspots.map((spot) => {
              const isSelected = selectedHotspot?.id === spot.id;
              const isCritical = spot.riskLevel === 'Critical';
              const isElevated = spot.riskLevel === 'Elevated';

              return (
                <div
                  key={spot.id}
                  style={{
                    position: 'absolute',
                    left: `${spot.coordinates.x}%`,
                    top: `${spot.coordinates.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => setSelectedHotspot(spot)}
                  className="cursor-pointer group"
                >
                  {/* Radar pulse for critical spots */}
                  {isCritical && (
                    <span className="absolute -inset-2 rounded-full bg-red-600/40 animate-ping" />
                  )}

                  <div
                    className={`relative px-2 py-1 rounded-md text-[10px] font-bold font-mono transition-all flex items-center gap-1.5 shadow-md ${
                      isSelected
                        ? 'bg-white text-[#991B1B] ring-2 ring-[#991B1B] scale-110 z-20'
                        : isCritical
                        ? 'bg-[#991B1B] text-white hover:bg-red-700'
                        : isElevated
                        ? 'bg-[#B45309] text-white hover:bg-amber-700'
                        : 'bg-[#4A3B2C] text-[#FAF7F2] hover:bg-[#614E3A]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isCritical ? 'bg-red-300' : isElevated ? 'bg-amber-300' : 'bg-emerald-300'
                      }`}
                    />
                    <span className="truncate max-w-[110px]">{spot.name.split('&')[0]}</span>
                  </div>

                  {/* Tooltip on hover */}
                  <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 w-44 bg-[#1F1912] text-white p-2 rounded text-[10px] z-30 border border-[#C8B282] pointer-events-none">
                    <p className="font-bold text-[#FDE68A]">{spot.name}</p>
                    <p className="text-slate-300">{spot.primaryCrimeType}</p>
                    <p className="text-red-400 font-mono mt-0.5">30d Incidents: {spot.incidentCount30d}</p>
                  </div>
                </div>
              );
            })}

            {/* Active Patrol Units Markers */}
            {showPatrols && (
              <>
                <div
                  style={{ position: 'absolute', left: '55%', top: '44%' }}
                  className="bg-[#DC2626] text-white p-1 rounded-full border border-white shadow-lg animate-bounce"
                  title="Cheetah 03 - On Beat Patrol"
                >
                  <Siren className="w-3.5 h-3.5" />
                </div>
                <div
                  style={{ position: 'absolute', left: '72%', top: '35%' }}
                  className="bg-[#DC2626] text-white p-1 rounded-full border border-white shadow-lg"
                  title="Cheetah 06 - Avinashi Highway"
                >
                  <Siren className="w-3.5 h-3.5" />
                </div>
                <div
                  style={{ position: 'absolute', left: '38%', top: '60%' }}
                  className="bg-[#DC2626] text-white p-1 rounded-full border border-white shadow-lg"
                  title="Cheetah 05 - Ukkadam South"
                >
                  <Siren className="w-3.5 h-3.5" />
                </div>
              </>
            )}
          </div>

          {/* Map Legend */}
          <div className="relative z-10 flex flex-wrap items-center gap-4 text-[11px] bg-[#1F1912]/90 p-2.5 rounded-lg border border-[#C8B282]/30 text-white">
            <span className="text-[#A89884] font-bold uppercase">Incident Severity:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#991B1B]" />
              <span>Critical Cluster</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
              <span>Elevated Watch</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4A3B2C]" />
              <span>Standard Beat</span>
            </div>
          </div>
        </div>

        {/* Selected Hotspot Detailed Control Sidebar */}
        <div className="lg:col-span-4 bg-white border border-[#D9CDB8] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          {selectedHotspot ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-[#8C7A68]">
                    {selectedHotspot.zone}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      selectedHotspot.riskLevel === 'Critical'
                        ? 'bg-[#FEE2E2] text-[#991B1B]'
                        : selectedHotspot.riskLevel === 'Elevated'
                        ? 'bg-[#FEF9C3] text-[#A16207]'
                        : 'bg-[#E5DAC6] text-[#4A3B2C]'
                    }`}
                  >
                    {selectedHotspot.riskLevel} Risk
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#1F1912] font-heading mt-1">
                  {selectedHotspot.name}
                </h4>
                <p className="text-xs text-[#6B5A47]">{selectedHotspot.location}</p>
              </div>

              <div className="space-y-2.5 text-xs bg-[#FAF7F2] p-3.5 rounded-lg border border-[#E5DAC6]">
                <div>
                  <span className="text-[11px] text-[#8C7A68] block">Primary Crime Pattern:</span>
                  <strong className="text-[#991B1B]">{selectedHotspot.primaryCrimeType}</strong>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[#6B5A47]">30-Day Reported Cases:</span>
                  <span className="font-mono font-bold text-sm text-[#1F1912] tabular-nums">
                    {selectedHotspot.incidentCount30d} Incidents
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[#6B5A47]">Active Beat Patrol:</span>
                  <span className="font-bold text-[#1F1912]">{selectedHotspot.activePatrolUnit}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[#6B5A47]">Surveillance Grid:</span>
                  <span className="text-xs font-semibold text-[#15803D] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>CCTV Automated Feed Active</span>
                  </span>
                </div>
              </div>

              {dispatchedUnit ? (
                <div className="bg-[#DCFCE7] border border-[#86EFAC] p-3 rounded-lg text-xs text-[#14532D]">
                  <p className="font-bold">Dispatch Command Transmitted!</p>
                  <p className="text-[11px]">
                    {dispatchedUnit} re-routed to reinforce {selectedHotspot.name}. Control Room log updated.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-[11px] text-[#8C7A68] font-bold uppercase block">Tactical Intervention</span>
                  <button
                    onClick={() => handleDispatchPatrol(selectedHotspot.activePatrolUnit)}
                    className="w-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>Reinforce Beat ({selectedHotspot.activePatrolUnit})</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-[#8C7A68]">Select a hotspot on the map to inspect tactical details.</p>
          )}

          <div className="pt-3 border-t border-[#E8DFC9] text-[11px] text-[#78654C]">
            Connected to Coimbatore City Police Modern Command & Control Centre (MCCC).
          </div>
        </div>
      </div>
    </div>
  );
};
