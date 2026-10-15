import React, { useState } from 'react';
import { Search, Filter, FileText, Printer, Shield, Eye, AlertCircle, ArrowUpDown } from 'lucide-react';
import { FIRRecord, CaseStatus, CaseSeverity } from '../../types/crime';
import { INITIAL_POLICE_STATIONS } from '../../data/mockPoliceData';

interface FIRManagementTableProps {
  firs: FIRRecord[];
  onOpenDossier: (fir: FIRRecord) => void;
  onViewOfficialFIR: (fir: FIRRecord) => void;
  onOpenNewFIRModal: () => void;
}

export const FIRManagementTable: React.FC<FIRManagementTableProps> = ({
  firs,
  onOpenDossier,
  onViewOfficialFIR,
  onOpenNewFIRModal,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [subdivisionFilter, setSubdivisionFilter] = useState<string>('All');
  const [stationFilter, setStationFilter] = useState<string>('All');

  const filteredFirs = firs.filter((f) => {
    const matchesSearch =
      f.id.toLowerCase().includes(search.toLowerCase()) ||
      f.complainantName.toLowerCase().includes(search.toLowerCase()) ||
      f.incidentLocation.toLowerCase().includes(search.toLowerCase()) ||
      f.bnsSection.toLowerCase().includes(search.toLowerCase()) ||
      f.briefDescription.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
    const matchesSubdiv = subdivisionFilter === 'All' || f.subdivision === subdivisionFilter;
    const matchesStation = stationFilter === 'All' || f.stationCode === stationFilter;

    return matchesSearch && matchesStatus && matchesSubdiv && matchesStation;
  });

  return (
    <div className="bg-white border border-[#D9CDB8] rounded-xl overflow-hidden shadow-xs">
      {/* Controls Bar */}
      <div className="p-4 bg-[#F5EFEB] border-b border-[#E8DFC9] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1 flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#8C7A68] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by FIR ID, complainant, section..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded-lg focus:outline-none focus:border-[#991B1B]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded-lg font-medium text-[#4A3B2C]"
          >
            <option value="All">All Statuses</option>
            <option value="Complaint Received">Complaint Received</option>
            <option value="FIR Registered">FIR Registered</option>
            <option value="Under Investigation">Under Investigation</option>
            <option value="Charge Sheet Filed">Charge Sheet Filed</option>
            <option value="Under Trial">Under Trial</option>
          </select>

          {/* Subdivision Filter */}
          <select
            value={subdivisionFilter}
            onChange={(e) => setSubdivisionFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded-lg font-medium text-[#4A3B2C]"
          >
            <option value="All">All Sub-Divisions</option>
            <option value="Central">Central Sub-Div</option>
            <option value="East">East Sub-Div</option>
            <option value="West">West Sub-Div</option>
            <option value="South">South Sub-Div</option>
            <option value="Cyber Crime">Cyber Crime Station</option>
          </select>

          {/* Police Station Filter */}
          <select
            value={stationFilter}
            onChange={(e) => setStationFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-white border border-[#D1C2A5] rounded-lg font-medium text-[#4A3B2C]"
          >
            <option value="All">All Stations</option>
            {INITIAL_POLICE_STATIONS.map((s) => (
              <option key={s.id} value={s.code}>
                {s.code} - {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-[#78654C] font-mono">
          Showing <strong>{filteredFirs.length}</strong> of {firs.length} Cases
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#EFE7D8] text-[#4A3B2C] border-b border-[#D9CDB8] font-bold text-[11px] uppercase tracking-wider">
              <th className="py-3 px-4">FIR Docket & Date</th>
              <th className="py-3 px-3">Station</th>
              <th className="py-3 px-3">Category & Severity</th>
              <th className="py-3 px-4">Acts & Sections</th>
              <th className="py-3 px-4">Complainant & Spot</th>
              <th className="py-3 px-3">Investigation Status</th>
              <th className="py-3 px-3">Investigating Officer</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFE7D8]">
            {filteredFirs.map((fir) => {
              const isCritical = fir.severity === 'Critical';
              const isHigh = fir.severity === 'High';

              return (
                <tr
                  key={fir.id}
                  className="hover:bg-[#FAF7F2] transition-colors group cursor-pointer"
                  onClick={() => onOpenDossier(fir)}
                >
                  {/* Docket ID */}
                  <td className="py-3 px-4 font-mono">
                    <span className="font-bold text-[#991B1B] text-[13px] block tabular-nums">
                      {fir.id}
                    </span>
                    <span className="text-[11px] text-[#8C7A68]">
                      Reg: {fir.registrationDate}
                    </span>
                  </td>

                  {/* Station */}
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#1F1912] block">{fir.stationCode}</span>
                    <span className="text-[11px] text-[#78654C]">{fir.subdivision}</span>
                  </td>

                  {/* Category & Severity */}
                  <td className="py-3 px-3">
                    <span className="font-semibold text-[#1F1912] block truncate max-w-[130px]">
                      {fir.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase ${
                        isCritical
                          ? 'text-[#DC2626]'
                          : isHigh
                          ? 'text-[#B45309]'
                          : 'text-[#65A30D]'
                      }`}
                    >
                      {fir.severity} Priority
                    </span>
                  </td>

                  {/* Legal Sections */}
                  <td className="py-3 px-4 font-mono text-[11px]">
                    <span className="font-bold text-[#1F1912] block truncate max-w-[170px]" title={fir.bnsSection}>
                      {fir.bnsSection}
                    </span>
                    <span className="text-[#8C7A68] truncate max-w-[170px] block" title={fir.ipcEquivalent}>
                      Eq: {fir.ipcEquivalent}
                    </span>
                  </td>

                  {/* Complainant & Spot */}
                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#1F1912] block">{fir.complainantName}</span>
                    <span className="text-[11px] text-[#78654C] block truncate max-w-[160px]" title={fir.incidentLocation}>
                      {fir.incidentLocation}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold ${
                        fir.status === 'Charge Sheet Filed'
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : fir.status === 'Under Investigation'
                          ? 'bg-[#FEF9C3] text-[#A16207]'
                          : fir.status === 'FIR Registered'
                          ? 'bg-[#EFF6FF] text-[#1D4ED8]'
                          : 'bg-[#FEE2E2] text-[#991B1B]'
                      }`}
                    >
                      {fir.status}
                    </span>
                  </td>

                  {/* IO */}
                  <td className="py-3 px-3">
                    <span className="font-semibold text-[#1F1912] block truncate max-w-[120px]">
                      {fir.investigatingOfficer.name}
                    </span>
                    <span className="text-[10px] text-[#8C7A68] font-mono">
                      {fir.investigatingOfficer.badgeNumber}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenDossier(fir)}
                        className="p-1.5 text-[#4A3B2C] hover:text-[#991B1B] hover:bg-[#EFE7D8] rounded transition-colors"
                        title="View Full Case Dossier"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onViewOfficialFIR(fir)}
                        className="p-1.5 text-[#4A3B2C] hover:text-[#991B1B] hover:bg-[#EFE7D8] rounded transition-colors"
                        title="Print Official Form II FIR"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredFirs.length === 0 && (
          <div className="text-center py-12 text-[#6B5A47]">
            <AlertCircle className="w-8 h-8 mx-auto text-[#C8B89E] mb-2" />
            <p className="text-sm font-bold text-[#1F1912]">No Cases Found Matching Filters</p>
            <p className="text-xs mt-1">Try resetting the status or sub-division filter.</p>
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('All');
                setSubdivisionFilter('All');
                setStationFilter('All');
              }}
              className="mt-3 text-xs text-[#991B1B] font-bold underline"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
