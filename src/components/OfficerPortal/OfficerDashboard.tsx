import React, { useState } from 'react';
import { Shield, FileText, Map, BarChart3, Plus, Sparkles, UserCheck, ShieldAlert, Radio } from 'lucide-react';
import { FIRRecord, CrimeHotspot } from '../../types/crime';
import { FIRManagementTable } from './FIRManagementTable';
import { CrimeHotspotMap } from './CrimeHotspotMap';
import { CrimeAnalyticsView } from './CrimeAnalyticsView';

interface OfficerDashboardProps {
  firs: FIRRecord[];
  hotspots: CrimeHotspot[];
  onOpenDossier: (fir: FIRRecord) => void;
  onViewOfficialFIR: (fir: FIRRecord) => void;
  onOpenNewFIRModal: () => void;
  onOpenAIAssistant: () => void;
  onSwitchToCitizen: () => void;
}

export const OfficerDashboard: React.FC<OfficerDashboardProps> = ({
  firs,
  hotspots,
  onOpenDossier,
  onViewOfficialFIR,
  onOpenNewFIRModal,
  onOpenAIAssistant,
  onSwitchToCitizen
}) => {
  const [activeTab, setActiveTab] = useState<'table' | 'map' | 'analytics'>('table');

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Officer Console Title Header */}
        <div className="bg-[#1F1912] border-2 border-[#8B1E1E] rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-[#C8B282] overflow-hidden bg-black shrink-0">
              <img
                src="/src/assets/images/commissioner_portrait_1792058758826.jpg"
                alt="Officer Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#991B1B] text-[#FDE68A]">
                  OFFICER CONSOLE (COP-NET)
                </span>
                <span className="text-xs text-[#C8B89E]">Coimbatore City Police</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading mt-1">
                Crime Records & Investigation Command
              </h2>
              <p className="text-xs text-[#A89884]">
                Inspector R. Balakrishnan · Badge #CBE-CC-1402 · C1 Katoor Station / Central Sub-Div
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenAIAssistant}
              className="bg-[#2B2319] hover:bg-[#3B3024] border border-[#C8B282]/50 text-[#FDE68A] text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#FDE68A]" />
              <span>AI Legal Section Advisor</span>
            </button>

            <button
              onClick={onOpenNewFIRModal}
              className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Register Officer FIR</span>
            </button>

            <button
              onClick={onSwitchToCitizen}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2.5 rounded-lg flex items-center gap-1 transition-colors"
              title="Return to Citizen Portal"
            >
              <UserCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Citizen View</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-[#E8DFC9] rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'table'
                ? 'bg-[#991B1B] text-white shadow-xs'
                : 'text-[#4A3B2C] hover:text-[#1F1912] hover:bg-white/50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>FIR Registry & Crime Dossiers ({firs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'map'
                ? 'bg-[#991B1B] text-white shadow-xs'
                : 'text-[#4A3B2C] hover:text-[#1F1912] hover:bg-white/50'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>GIS Hotspots & Cheetah Patrols</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'analytics'
                ? 'bg-[#991B1B] text-white shadow-xs'
                : 'text-[#4A3B2C] hover:text-[#1F1912] hover:bg-white/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Sub-Division Crime Analytics</span>
          </button>
        </div>

        {/* Tab Viewport */}
        {activeTab === 'table' && (
          <FIRManagementTable
            firs={firs}
            onOpenDossier={onOpenDossier}
            onViewOfficialFIR={onViewOfficialFIR}
            onOpenNewFIRModal={onOpenNewFIRModal}
          />
        )}

        {activeTab === 'map' && (
          <CrimeHotspotMap hotspots={hotspots} />
        )}

        {activeTab === 'analytics' && (
          <CrimeAnalyticsView firs={firs} />
        )}
      </div>
    </div>
  );
};
