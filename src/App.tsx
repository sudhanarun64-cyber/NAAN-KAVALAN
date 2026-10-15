import React, { useState } from 'react';
import { Header } from './components/Header';
import { CitizenHero } from './components/CitizenPortal/CitizenHero';
import { PoliceStationDirectory } from './components/CitizenPortal/PoliceStationDirectory';
import { CrimeWatchPublic } from './components/CitizenPortal/CrimeWatchPublic';
import { FileComplaintModal } from './components/CitizenPortal/FileComplaintModal';
import { TrackStatusModal } from './components/CitizenPortal/TrackStatusModal';
import { EmergencyModal } from './components/CitizenPortal/EmergencyModal';
import { OfficerDashboard } from './components/OfficerPortal/OfficerDashboard';
import { FIRDossierModal } from './components/OfficerPortal/FIRDossierModal';
import { NewFIRFormModal } from './components/OfficerPortal/NewFIRFormModal';
import { AILegalAdvisorModal } from './components/OfficerPortal/AILegalAdvisorModal';
import { OfficialFIRSheet } from './components/OfficialFIRSheet';
import { Footer } from './components/Footer';
import {
  INITIAL_FIRS,
  INITIAL_POLICE_STATIONS,
  INITIAL_HOTSPOTS,
  INITIAL_MISSING_PERSONS,
  INITIAL_STOLEN_VEHICLES
} from './data/mockPoliceData';
import { FIRRecord } from './types/crime';

export default function App() {
  const [activeView, setActiveView] = useState<'citizen' | 'officer'>('citizen');
  
  // Master Datasets
  const [firs, setFirs] = useState<FIRRecord[]>(INITIAL_FIRS);
  const [stations] = useState(INITIAL_POLICE_STATIONS);
  const [hotspots] = useState(INITIAL_HOTSPOTS);
  const [missingPersons, setMissingPersons] = useState(INITIAL_MISSING_PERSONS);
  const [stolenVehicles, setStolenVehicles] = useState(INITIAL_STOLEN_VEHICLES);

  // Modals
  const [complaintModalOpen, setComplaintModalOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [trackInitialId, setTrackInitialId] = useState('');
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  
  // Officer Modals
  const [selectedDossierFir, setSelectedDossierFir] = useState<FIRRecord | null>(null);
  const [selectedOfficialFir, setSelectedOfficialFir] = useState<FIRRecord | null>(null);
  const [newFIRModalOpen, setNewFIRModalOpen] = useState(false);
  const [aiAdvisorModalOpen, setAiAdvisorModalOpen] = useState(false);

  // AI to FIR Transfer
  const [prefilledBNS, setPrefilledBNS] = useState('');
  const [prefilledIPC, setPrefilledIPC] = useState('');
  const [prefilledSummary, setPrefilledSummary] = useState('');

  // Toast Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleAddFIR = (newRecord: FIRRecord) => {
    setFirs([newRecord, ...firs]);
    showToast(`FIR ${newRecord.id} successfully registered in Coimbatore Crime System.`);
  };

  const handleUpdateFIR = (updatedRecord: FIRRecord) => {
    setFirs(firs.map(f => f.id === updatedRecord.id ? updatedRecord : f));
    if (selectedDossierFir?.id === updatedRecord.id) {
      setSelectedDossierFir(updatedRecord);
    }
    showToast(`Case ${updatedRecord.id} docket updated with latest investigation log.`);
  };

  const handleOpenTrackWithId = (firId: string) => {
    setTrackInitialId(firId);
    setTrackModalOpen(true);
  };

  const handleReportTip = (tip: { subject: string; location: string; details: string; phone: string }) => {
    showToast(`Confidential tip for "${tip.subject}" forwarded to Coimbatore Police Control Room.`);
  };

  const handleApplyAIToNewFIR = (bns: string, ipc: string, summary: string) => {
    setPrefilledBNS(bns);
    setPrefilledIPC(ipc);
    setPrefilledSummary(summary);
    setNewFIRModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2B2319] selection:bg-[#991B1B] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-[#1F1912] border-2 border-[#C8B282] text-white px-4 py-3 rounded-xl shadow-2xl text-xs flex items-center gap-3 animate-slide-in">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenComplaintModal={() => setComplaintModalOpen(true)}
        onOpenTrackModal={() => {
          setTrackInitialId('');
          setTrackModalOpen(true);
        }}
        onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
      />

      {/* Main Views */}
      <main className="flex-1">
        {activeView === 'citizen' ? (
          <div>
            <CitizenHero
              onOpenFileComplaint={() => setComplaintModalOpen(true)}
              onOpenTrackModal={() => {
                setTrackInitialId('');
                setTrackModalOpen(true);
              }}
              onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
              onSwitchToOfficer={() => setActiveView('officer')}
            />

            <PoliceStationDirectory
              stations={stations}
              onSelectStationForComplaint={() => setComplaintModalOpen(true)}
            />

            <CrimeWatchPublic
              missingPersons={missingPersons}
              stolenVehicles={stolenVehicles}
              onReportTip={handleReportTip}
            />
          </div>
        ) : (
          <OfficerDashboard
            firs={firs}
            hotspots={hotspots}
            onOpenDossier={(fir) => setSelectedDossierFir(fir)}
            onViewOfficialFIR={(fir) => setSelectedOfficialFir(fir)}
            onOpenNewFIRModal={() => setNewFIRModalOpen(true)}
            onOpenAIAssistant={() => setAiAdvisorModalOpen(true)}
            onSwitchToCitizen={() => setActiveView('citizen')}
          />
        )}
      </main>

      {/* Citizen Modals */}
      <FileComplaintModal
        isOpen={complaintModalOpen}
        onClose={() => setComplaintModalOpen(false)}
        onSubmitComplaint={handleAddFIR}
        onTrackNewFIR={handleOpenTrackWithId}
      />

      <TrackStatusModal
        isOpen={trackModalOpen}
        onClose={() => setTrackModalOpen(false)}
        firs={firs}
        initialSearchId={trackInitialId}
        onViewOfficialFIR={(fir) => setSelectedOfficialFir(fir)}
      />

      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
      />

      {/* Officer Modals */}
      <FIRDossierModal
        fir={selectedDossierFir}
        isOpen={!!selectedDossierFir}
        onClose={() => setSelectedDossierFir(null)}
        onUpdateFIR={handleUpdateFIR}
        onViewOfficialFIR={(fir) => setSelectedOfficialFir(fir)}
      />

      <NewFIRFormModal
        isOpen={newFIRModalOpen}
        onClose={() => {
          setNewFIRModalOpen(false);
          setPrefilledBNS('');
          setPrefilledIPC('');
          setPrefilledSummary('');
        }}
        onRegisterFIR={handleAddFIR}
        onOpenAIAssistant={() => {
          setNewFIRModalOpen(false);
          setAiAdvisorModalOpen(true);
        }}
        prefilledBNS={prefilledBNS}
        prefilledIPC={prefilledIPC}
        prefilledSummary={prefilledSummary}
      />

      <AILegalAdvisorModal
        isOpen={aiAdvisorModalOpen}
        onClose={() => setAiAdvisorModalOpen(false)}
        onApplySectionsToNewFIR={handleApplyAIToNewFIR}
      />

      {/* Printable Official Form II FIR Sheet */}
      <OfficialFIRSheet
        fir={selectedOfficialFir}
        onClose={() => setSelectedOfficialFir(null)}
      />

      {/* Footer */}
      <Footer
        onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
        onOpenComplaintModal={() => setComplaintModalOpen(true)}
        onOpenTrackModal={() => {
          setTrackInitialId('');
          setTrackModalOpen(true);
        }}
        onSwitchToOfficer={() => setActiveView('officer')}
      />
    </div>
  );
}
