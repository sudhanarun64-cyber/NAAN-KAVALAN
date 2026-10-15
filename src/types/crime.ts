export type CrimeCategory = 
  | 'Theft & Burglary'
  | 'Cyber Crime & Online Fraud'
  | 'Violent Crime & Assault'
  | 'Financial & Cheating'
  | 'Vehicle Theft'
  | 'Women & Child Safety'
  | 'Narcotics & NDPS'
  | 'Public Nuisance & Traffic';

export type CaseStatus = 
  | 'Complaint Received'
  | 'Preliminary Inquiry'
  | 'FIR Registered'
  | 'Under Investigation'
  | 'Charge Sheet Filed'
  | 'Under Trial'
  | 'Closed & Convicted'
  | 'Case Disposed';

export type CaseSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface AccusedPerson {
  name: string;
  age: number;
  gender: string;
  alias?: string;
  address: string;
  status: 'Arrested' | 'Remanded (Coimbatore Central Prison)' | 'On Bail' | 'Absconding' | 'Suspect';
  arrestDate?: string;
}

export interface EvidenceItem {
  id: string;
  itemDescription: string;
  category: 'Physical' | 'Digital / Cyber' | 'Forensic' | 'Documentary' | 'Vehicle / Property';
  seizureDate: string;
  storageLocation: string;
  verifiedBy: string;
}

export interface CaseDiaryEntry {
  date: string;
  officer: string;
  rank: string;
  entry: string;
}

export interface FIRRecord {
  id: string; // e.g. CBE/2026/FIR-0104
  stationCode: string; // e.g. B1, C1, E1
  stationName: string; // e.g. B1 Bazaar Police Station
  subdivision: 'Central' | 'East' | 'West' | 'South' | 'Cyber Crime' | 'Traffic';
  bnsSection: string; // e.g. BNS Sec 303(2) (Theft)
  ipcEquivalent: string; // e.g. IPC Sec 379
  category: CrimeCategory;
  severity: CaseSeverity;
  incidentDate: string;
  registrationDate: string;
  complainantName: string;
  complainantPhone: string;
  incidentLocation: string;
  briefDescription: string;
  status: CaseStatus;
  investigatingOfficer: {
    name: string;
    rank: string;
    phone: string;
    badgeNumber: string;
  };
  accused: AccusedPerson[];
  evidence: EvidenceItem[];
  caseDiary: CaseDiaryEntry[];
  recoveryAmount?: string;
  lastUpdated: string;
}

export interface PoliceStation {
  id: string;
  code: string;
  name: string;
  tamilName: string;
  subdivision: string;
  inspectorName: string;
  phone: string;
  emergencyDirect: string;
  address: string;
  landmark: string;
  jurisdictionAreas: string[];
  lat: number;
  lng: number;
  totalActiveCases: number;
}

export interface CrimeHotspot {
  id: string;
  name: string;
  location: string;
  zone: string;
  primaryCrimeType: string;
  incidentCount30d: number;
  riskLevel: 'Critical' | 'Elevated' | 'Moderate';
  activePatrolUnit: string;
  coordinates: { x: number; y: number }; // Percentage for custom stylized interactive map
  cctvSurveillance: boolean;
}

export interface MissingPerson {
  id: string;
  name: string;
  age: number;
  gender: string;
  missingSince: string;
  missingFrom: string;
  identifyingMarks: string;
  height: string;
  contactStation: string;
  contactOfficer: string;
  contactPhone: string;
  status: 'Tracing in Progress' | 'Located';
}

export interface StolenVehicle {
  id: string;
  registrationNumber: string; // e.g. TN 38 BJ 4519
  makeModel: string;
  vehicleType: 'Two Wheeler' | 'Four Wheeler' | 'Commercial';
  color: string;
  stolenDate: string;
  stolenLocation: string;
  firNumber: string;
  engineNumber: string;
  chassisNumber: string;
  status: 'Stolen - Tracing' | 'Recovered' | 'Seized at Checkpost';
}
