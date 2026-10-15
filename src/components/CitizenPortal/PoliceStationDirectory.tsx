import React, { useState } from 'react';
import { MapPin, Phone, Shield, Search, ExternalLink, Navigation, Building2 } from 'lucide-react';
import { PoliceStation } from '../../types/crime';

interface PoliceStationDirectoryProps {
  stations: PoliceStation[];
  onSelectStationForComplaint: (stationCode: string) => void;
}

export const PoliceStationDirectory: React.FC<PoliceStationDirectoryProps> = ({
  stations,
  onSelectStationForComplaint,
}) => {
  const [subdivisionFilter, setSubdivisionFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const subdivisions = ['All', 'Central', 'East', 'West', 'South', 'Cyber Crime'];

  const filteredStations = stations.filter((station) => {
    const matchesSubdiv = subdivisionFilter === 'All' || station.subdivision === subdivisionFilter;
    const matchesSearch =
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.tamilName.includes(searchQuery) ||
      station.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.jurisdictionAreas.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubdiv && matchesSearch;
  });

  return (
    <section id="stations" className="py-12 bg-[#F5EFEB] border-t border-[#E5DAC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#991B1B] uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>COIMBATORE CITY COMMISSIONERATE NETWORK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F1912] font-heading">
              Police Station Directory & Jurisdictions
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5A47] mt-1">
              Find your jurisdictional station, Station House Officer (SHO), emergency direct lines, and beat coverage.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-[#8C7A68] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search area (e.g. Gandhipuram, RS Puram)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D1C2A5] rounded-lg focus:outline-none focus:border-[#991B1B]"
            />
          </div>
        </div>

        {/* Subdivision Filter Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-[#E8DFC9] rounded-lg overflow-x-auto mb-6">
          {subdivisions.map((sub) => (
            <button
              key={sub}
              onClick={() => setSubdivisionFilter(sub)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                subdivisionFilter === sub
                  ? 'bg-[#991B1B] text-white shadow-xs'
                  : 'text-[#4A3B2C] hover:text-[#1F1912] hover:bg-white/40'
              }`}
            >
              {sub} Sub-Division
            </button>
          ))}
        </div>

        {/* Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className="bg-[#FAF7F2] border border-[#D9CDB8] hover:border-[#991B1B] rounded-xl p-5 shadow-xs flex flex-col justify-between transition-all hover:shadow-md"
            >
              <div>
                {/* Station Code Badge & Name */}
                <div className="flex items-start justify-between gap-2 border-b border-[#E8DFC9] pb-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#991B1B] text-white">
                        {station.code}
                      </span>
                      <span className="text-[11px] font-semibold text-[#8C7A68] uppercase">
                        {station.subdivision} Sub-Div
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#1F1912] mt-1 font-heading">
                      {station.name}
                    </h3>
                    <p className="text-xs text-[#8B1E1E] font-medium font-tamil mt-0.5">
                      {station.tamilName}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2.5 text-xs text-[#4A3B2C]">
                  <div>
                    <span className="text-[11px] text-[#8C7A68] block">Inspector / SHO In-Charge:</span>
                    <strong className="text-[#1F1912]">{station.inspectorName}</strong>
                  </div>

                  <div>
                    <span className="text-[11px] text-[#8C7A68] block">Station Address:</span>
                    <p className="text-[#2B2319] leading-relaxed flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#991B1B] shrink-0 mt-0.5" />
                      <span>{station.address}</span>
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] text-[#8C7A68] block">Jurisdiction Coverage:</span>
                    <div className="flex flex-wrap gap-1 mt-1 text-[11px] text-[#4A3B2C]">
                      {station.jurisdictionAreas.map((area, i) => (
                        <span key={i} className="bg-white px-2 py-0.5 rounded border border-[#E5DAC6]">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Phone & Action */}
              <div className="mt-4 pt-3 border-t border-[#E8DFC9] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8C7A68] uppercase font-bold block">Helpline</span>
                  <a
                    href={`tel:${station.phone}`}
                    className="text-xs font-bold text-[#991B1B] hover:underline flex items-center gap-1 font-mono"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{station.phone}</span>
                  </a>
                </div>

                <button
                  onClick={() => onSelectStationForComplaint(station.code)}
                  className="bg-white border border-[#D1C2A5] hover:border-[#991B1B] hover:text-[#991B1B] text-[#1F1912] text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  File Here
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
