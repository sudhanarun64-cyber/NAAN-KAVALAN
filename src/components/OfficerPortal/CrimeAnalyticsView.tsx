import React from 'react';
import { BarChart3, TrendingDown, ShieldCheck, AlertTriangle, Clock, Layers, Award } from 'lucide-react';
import { FIRRecord } from '../../types/crime';

interface CrimeAnalyticsViewProps {
  firs: FIRRecord[];
}

export const CrimeAnalyticsView: React.FC<CrimeAnalyticsViewProps> = ({ firs }) => {
  // Counts by Subdivision
  const subDivData = [
    { name: 'Central Sub-Div (B1, C1, C2, D1)', cases: 106, rate: '86%' },
    { name: 'East Sub-Div (E1, E2, E3)', cases: 92, rate: '83%' },
    { name: 'South Sub-Div (B4, Selvapuram)', cases: 58, rate: '81%' },
    { name: 'West Sub-Div (B2, RS Puram)', cases: 38, rate: '89%' },
    { name: 'Cyber Crime Police Station', cases: 54, rate: '79%' },
  ];

  const categoryBreakdown = [
    { name: 'Theft & Burglaries (Sec 303/305)', count: 94, pct: 32 },
    { name: 'Cyber Crime & Online Fraud (Sec 318)', count: 68, pct: 23 },
    { name: 'Motor Vehicle Theft (Sec 303)', count: 48, pct: 16 },
    { name: 'Assault & Affray (Sec 115/352)', count: 34, pct: 12 },
    { name: 'Women & Child Safety (Sec 74)', count: 28, pct: 10 },
    { name: 'NDPS & Narcotics Special Drives', count: 20, pct: 7 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Trend Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#D9CDB8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#8C7A68]">
            <span>Conviction / Disposal Rate</span>
            <span className="text-[#15803D] font-bold flex items-center gap-0.5">
              <TrendingDown className="w-3.5 h-3.5" /> -4.2% Crime Rate
            </span>
          </div>
          <h4 className="text-2xl font-bold font-mono text-[#1F1912] mt-1 tabular-nums">
            84.6%
          </h4>
          <p className="text-[11px] text-[#6B5A47] mt-0.5">
            Ranked #2 in Tamil Nadu Commissionerates
          </p>
        </div>

        <div className="bg-white border border-[#D9CDB8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#8C7A68]">
            <span>Average Police Response Time</span>
            <span className="text-[#15803D] font-bold">Optimal</span>
          </div>
          <h4 className="text-2xl font-bold font-mono text-[#991B1B] mt-1 tabular-nums">
            6.4 Mins
          </h4>
          <p className="text-[11px] text-[#6B5A47] mt-0.5">
            Cheetah patrol van dispatch across 10 stations
          </p>
        </div>

        <div className="bg-white border border-[#D9CDB8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#8C7A68]">
            <span>Cyber Fraud Frozen (Golden Hr)</span>
            <span className="text-[#B45309] font-bold font-mono">1930 Helpline</span>
          </div>
          <h4 className="text-2xl font-bold font-mono text-[#15803D] mt-1 tabular-nums">
            ₹1,84,20,000
          </h4>
          <p className="text-[11px] text-[#6B5A47] mt-0.5">
            Recovered / frozen in beneficiary accounts
          </p>
        </div>

        <div className="bg-white border border-[#D9CDB8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#8C7A68]">
            <span>Camera Net Surveillance</span>
            <span className="text-[#1F1912] font-bold">24x7 AI</span>
          </div>
          <h4 className="text-2xl font-bold font-mono text-[#1F1912] mt-1 tabular-nums">
            1,540 Eyes
          </h4>
          <p className="text-[11px] text-[#6B5A47] mt-0.5">
            Automatic number plate recognition (ANPR)
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sub-Division Performance */}
        <div className="bg-white border border-[#D9CDB8] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0E6D5] pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3B2C]">
              Cases Registered & Resolution Rate by Sub-Division
            </h4>
            <span className="text-[11px] font-mono text-[#8C7A68]">Year 2026</span>
          </div>

          <div className="space-y-3">
            {subDivData.map((sd) => (
              <div key={sd.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1F1912]">{sd.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#6B5A47] font-mono">{sd.cases} Cases</span>
                    <span className="font-bold text-[#15803D] font-mono">{sd.rate} Solved</span>
                  </div>
                </div>
                <div className="w-full bg-[#EFE7D8] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#991B1B] h-full rounded-full transition-all"
                    style={{ width: `${(sd.cases / 120) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crime Category Distribution */}
        <div className="bg-white border border-[#D9CDB8] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0E6D5] pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3B2C]">
              Crime Composition (BNS 2023 Categorization)
            </h4>
            <span className="text-[11px] font-mono text-[#8C7A68]">Total 348 Cases</span>
          </div>

          <div className="space-y-3">
            {categoryBreakdown.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#1F1912]">{cat.name}</span>
                  <span className="font-bold font-mono text-[#991B1B]">{cat.count} ({cat.pct}%)</span>
                </div>
                <div className="w-full bg-[#EFE7D8] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#B45309] h-full rounded-full"
                    style={{ width: `${cat.pct * 2.8}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
