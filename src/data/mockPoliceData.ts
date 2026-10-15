import { FIRRecord, PoliceStation, CrimeHotspot, MissingPerson, StolenVehicle } from '../types/crime';

export const INITIAL_POLICE_STATIONS: PoliceStation[] = [
  {
    id: 'ps-1',
    code: 'B1',
    name: 'B1 Bazaar Police Station',
    tamilName: 'B1 பெரிய கடைவீதி காவல் நிலையம்',
    subdivision: 'Central',
    inspectorName: 'Inspector K. Senthil Kumar, M.A., B.L.',
    phone: '0422-2391001',
    emergencyDirect: '+91 94981 01201',
    address: 'Near Town Hall Clock Tower, Raja Street, Coimbatore - 641001',
    landmark: 'Opposite Old Clock Tower, Town Hall',
    jurisdictionAreas: ['Town Hall', 'Raja Street', 'Big Bazaar', 'Sukrawarpet', 'Thomas Park'],
    lat: 11.0018,
    lng: 76.9629,
    totalActiveCases: 28
  },
  {
    id: 'ps-2',
    code: 'B2',
    name: 'B2 R.S. Puram Police Station',
    tamilName: 'B2 ஆர்.எஸ். புரம் காவல் நிலையம்',
    subdivision: 'West',
    inspectorName: 'Inspector M. Rajesh Kannan',
    phone: '0422-2541002',
    emergencyDirect: '+91 94981 01202',
    address: 'Diwan Bahadur (D.B.) Road, R.S. Puram, Coimbatore - 641002',
    landmark: 'Near Flower Market, DB Road',
    jurisdictionAreas: ['R.S. Puram', 'Thadagam Road', 'Cowley Brown Road', 'Ramnagar West', 'Lawley Road'],
    lat: 11.0116,
    lng: 76.9482,
    totalActiveCases: 19
  },
  {
    id: 'ps-3',
    code: 'C1',
    name: 'C1 Katoor Police Station',
    tamilName: 'C1 காட்டூர் காவல் நிலையம்',
    subdivision: 'Central',
    inspectorName: 'Inspector R. Balakrishnan',
    phone: '0422-2231003',
    emergencyDirect: '+91 94981 01203',
    address: '7th Street Extn, Gandhipuram, Coimbatore - 641012',
    landmark: 'Near Gandhipuram Central Bus Stand',
    jurisdictionAreas: ['Gandhipuram', 'Cross Cut Road', '100 Feet Road', 'Ramnagar', 'Sivananda Colony'],
    lat: 11.0176,
    lng: 76.9678,
    totalActiveCases: 42
  },
  {
    id: 'ps-4',
    code: 'C2',
    name: 'C2 Race Course Police Station',
    tamilName: 'C2 ரேஸ் கோர்ஸ் காவல் நிலையம்',
    subdivision: 'Central',
    inspectorName: 'Inspector S. Jayalakshmi',
    phone: '0422-2211004',
    emergencyDirect: '+91 94981 01204',
    address: 'Race Course Road, Opp. Thomas Park, Coimbatore - 641018',
    landmark: 'Adjacent to Police Officers Mess, Race Course',
    jurisdictionAreas: ['Race Course', 'Trichy Road Jn', 'Collectorate Complex', 'Court Complex', 'Railway Station East'],
    lat: 11.0055,
    lng: 76.9745,
    totalActiveCases: 14
  },
  {
    id: 'ps-5',
    code: 'E1',
    name: 'E1 Singanallur Police Station',
    tamilName: 'E1 சிங்காநல்லூர் காவல் நிலையம்',
    subdivision: 'East',
    inspectorName: 'Inspector V. Muruganandam',
    phone: '0422-2571005',
    emergencyDirect: '+91 94981 01205',
    address: 'Trichy Main Road, Singanallur, Coimbatore - 641005',
    landmark: 'Near Singanallur Bus Terminal & Lake',
    jurisdictionAreas: ['Singanallur', 'Ondipudur', 'Irugur', 'Neelikonampalayam', 'Trichy Road East'],
    lat: 10.9982,
    lng: 77.0211,
    totalActiveCases: 35
  },
  {
    id: 'ps-6',
    code: 'E2',
    name: 'E2 Peelamedu Police Station',
    tamilName: 'E2 பீளமேடு காவல் நிலையம்',
    subdivision: 'East',
    inspectorName: 'Inspector P. Thirunavukkarasu',
    phone: '0422-2511006',
    emergencyDirect: '+91 94981 01206',
    address: 'Avinashi Road, Peelamedu, Coimbatore - 641004',
    landmark: 'Opposite PSG Tech Campus, Hope College',
    jurisdictionAreas: ['Peelamedu', 'Hope College', 'Civil Aerodrome', 'Fun Mall Area', 'Hopes'],
    lat: 11.0254,
    lng: 77.0089,
    totalActiveCases: 31
  },
  {
    id: 'ps-7',
    code: 'E3',
    name: 'E3 Saravanampatti Police Station',
    tamilName: 'E3 சரவணம்பட்டி காவல் நிலையம்',
    subdivision: 'East',
    inspectorName: 'Inspector K. Natarajan',
    phone: '0422-2661007',
    emergencyDirect: '+91 94981 01207',
    address: 'Sathy Road, Saravanampatti, Coimbatore - 641035',
    landmark: 'Near CHIL SEZ IT Park Entrance',
    jurisdictionAreas: ['Saravanampatti', 'Keeranatham', 'Vilankurichi', 'KGISL Tech Park', 'Sathy Road'],
    lat: 11.0792,
    lng: 76.9944,
    totalActiveCases: 26
  },
  {
    id: 'ps-8',
    code: 'B4',
    name: 'B4 Ukkadam Police Station',
    tamilName: 'B4 உக்கடம் காவல் நிலையம்',
    subdivision: 'South',
    inspectorName: 'Inspector A. Mohammed Rafeeq',
    phone: '0422-2381008',
    emergencyDirect: '+91 94981 01208',
    address: 'South Bypass Road, Ukkadam, Coimbatore - 641001',
    landmark: 'Near Ukkadam Periyakulam Smart City Promenade',
    jurisdictionAreas: ['Ukkadam', 'Karumbukkadai', 'Sungam Bypass', 'Athupalam', 'Selvapuram Border'],
    lat: 10.9921,
    lng: 76.9582,
    totalActiveCases: 37
  },
  {
    id: 'ps-9',
    code: 'D1',
    name: 'D1 Ramanathapuram Police Station',
    tamilName: 'D1 ராமநாதபுரம் காவல் நிலையம்',
    subdivision: 'Central',
    inspectorName: 'Inspector D. Vijaya Raghavan',
    phone: '0422-2311009',
    emergencyDirect: '+91 94981 01209',
    address: 'Trichy Road, Ramanathapuram 80 Feet Road, Coimbatore - 641045',
    landmark: 'Near Ramanathapuram Signal',
    jurisdictionAreas: ['Ramanathapuram', 'Nanjundapuram Road', 'Puliakulam', 'Red Fields'],
    lat: 10.9998,
    lng: 76.9892,
    totalActiveCases: 22
  },
  {
    id: 'ps-10',
    code: 'CCPS',
    name: 'Coimbatore Cyber Crime Police Station',
    tamilName: 'மாநகர இணையதள குற்றப்பிரிவு காவல் நிலையம்',
    subdivision: 'Cyber Crime',
    inspectorName: 'Inspector (Cyber Specialist) S. Deepa, M.Tech (Cyber Forensics)',
    phone: '0422-2300971',
    emergencyDirect: '+91 94981 01210',
    address: 'City Police Commissionerate Complex, Old Hosur Road, Coimbatore - 641018',
    landmark: '3rd Floor, Commissioner of Police Office',
    jurisdictionAreas: ['Entire Coimbatore City Police Commissionerate Limits'],
    lat: 11.0062,
    lng: 76.9712,
    totalActiveCases: 54
  }
];

export const INITIAL_FIRS: FIRRecord[] = [
  {
    id: 'CBE/2026/FIR-0104',
    stationCode: 'C1',
    stationName: 'C1 Katoor Police Station',
    subdivision: 'Central',
    bnsSection: 'BNS Sec 303(2) (Theft)',
    ipcEquivalent: 'IPC Sec 379',
    category: 'Theft & Burglary',
    severity: 'High',
    incidentDate: '2026-10-12 19:40',
    registrationDate: '2026-10-13 08:30',
    complainantName: 'G. Shanmugam',
    complainantPhone: '+91 98422 18942',
    incidentLocation: 'Cross Cut Road, Opp. Lakshmi Complex, Gandhipuram',
    briefDescription: 'Two unknown bike-borne suspects snatched gold chain weighing 5.5 sovereigns (44 grams) from complainant while walking towards Cross Cut Road signal.',
    status: 'Under Investigation',
    investigatingOfficer: {
      name: 'R. Balakrishnan',
      rank: 'Inspector of Police',
      phone: '+91 94981 01203',
      badgeNumber: 'CBE-CC-1402'
    },
    accused: [
      {
        name: 'V. Prakash @ Katta Prakash',
        age: 26,
        gender: 'Male',
        alias: 'Katta Prakash',
        address: 'Veerapandi, Tirupur Rural',
        status: 'Arrested',
        arrestDate: '2026-10-14 16:00'
      },
      {
        name: 'K. Manikandan @ Mani',
        age: 24,
        gender: 'Male',
        alias: 'Speed Mani',
        address: 'Kavundampalayam, Coimbatore',
        status: 'Remanded (Coimbatore Central Prison)',
        arrestDate: '2026-10-14 16:00'
      }
    ],
    evidence: [
      {
        id: 'EVD-0104-1',
        itemDescription: 'Yamaha FZ motorcycle (TN 38 CL 8910) used during offence',
        category: 'Vehicle / Property',
        seizureDate: '2026-10-14',
        storageLocation: 'C1 Station Vehicle Yard',
        verifiedBy: 'SI Saravanan'
      },
      {
        id: 'EVD-0104-2',
        itemDescription: 'Cross Cut Road Traffic CCTV Footage (Camera ID CC-04)',
        category: 'Digital / Cyber',
        seizureDate: '2026-10-13',
        storageLocation: 'Forensic Digital Vault #4',
        verifiedBy: 'Inspector Balakrishnan'
      },
      {
        id: 'EVD-0104-3',
        itemDescription: 'Melted gold piece weighing 42.5 grams recovered from pawn broker',
        category: 'Physical',
        seizureDate: '2026-10-15',
        storageLocation: 'Station Malkhana Safe Locker',
        verifiedBy: 'Inspector Balakrishnan'
      }
    ],
    caseDiary: [
      {
        date: '2026-10-13 09:00',
        officer: 'R. Balakrishnan',
        rank: 'Inspector',
        entry: 'FIR registered upon receiving complaint statement. Formulated special team with SI Saravanan and HC Murugan.'
      },
      {
        date: '2026-10-13 14:30',
        officer: 'SI Saravanan',
        rank: 'Sub-Inspector',
        entry: 'Scrutinized 6 CCTV cameras between Power House Jn and 7th Street. Registration TN 38 CL 8910 spotted.'
      },
      {
        date: '2026-10-14 16:30',
        officer: 'R. Balakrishnan',
        rank: 'Inspector',
        entry: 'Nabbed accused near Thudiyalur checkpost. Confessed to crime. Gold recovered from pawn broker in Town Hall.'
      }
    ],
    recoveryAmount: '₹3,52,000 (Gold recovered)',
    lastUpdated: '2026-10-15 02:15'
  },
  {
    id: 'CBE/2026/FIR-0108',
    stationCode: 'CCPS',
    stationName: 'Coimbatore Cyber Crime Police Station',
    subdivision: 'Cyber Crime',
    bnsSection: 'BNS Sec 318(4) (Cheating) & IT Act Sec 66D',
    ipcEquivalent: 'IPC Sec 420 & IT Act 66D',
    category: 'Cyber Crime & Online Fraud',
    severity: 'Critical',
    incidentDate: '2026-10-09 11:20',
    registrationDate: '2026-10-10 10:15',
    complainantName: 'Dr. Anita Sundaramoorthy',
    complainantPhone: '+91 94433 76210',
    incidentLocation: 'Online / Peelamedu Residence, Coimbatore',
    briefDescription: 'Complainant duped in fake FedEx parcel & Telecom Regulatory "digital arrest" fraud. Fraudsters impersonated CBI and forced transfer of funds.',
    status: 'Under Investigation',
    investigatingOfficer: {
      name: 'S. Deepa',
      rank: 'Inspector (Cyber Specialist)',
      phone: '+91 94981 01210',
      badgeNumber: 'CBE-CY-0881'
    },
    accused: [
      {
        name: 'Mule Account Holder: Ramesh Babu (Beneficiary Bank: Yes Bank Noida)',
        age: 32,
        gender: 'Male',
        address: 'Sector 62, Noida, Uttar Pradesh',
        status: 'Suspect'
      }
    ],
    evidence: [
      {
        id: 'EVD-0108-1',
        itemDescription: 'Bank transaction logs and UTR numbers for ₹14,50,000 transfer',
        category: 'Documentary',
        seizureDate: '2026-10-10',
        storageLocation: 'Cyber Forensics Server Box B',
        verifiedBy: 'Inspector S. Deepa'
      },
      {
        id: 'EVD-0108-2',
        itemDescription: 'VoIP call logs and Telegram communication handles',
        category: 'Digital / Cyber',
        seizureDate: '2026-10-11',
        storageLocation: 'Cyber Station Secured Drive',
        verifiedBy: 'Inspector S. Deepa'
      }
    ],
    caseDiary: [
      {
        date: '2026-10-10 11:00',
        officer: 'S. Deepa',
        rank: 'Inspector',
        entry: 'Notified National Cyber Crime Reporting Portal (1930) and froze ₹9,80,000 in beneficiary accounts within Golden Hour.'
      },
      {
        date: '2026-10-12 16:00',
        officer: 'S. Deepa',
        rank: 'Inspector',
        entry: 'Notice under Sec 91 CrPC dispatched to Yes Bank and HDFC Bank nodal officers. Freeze confirmation received for ₹9.8 Lakhs.'
      }
    ],
    recoveryAmount: '₹9,80,000 (Frozen in Layer 1 & 2 Accounts)',
    lastUpdated: '2026-10-14 18:30'
  },
  {
    id: 'CBE/2026/FIR-0095',
    stationCode: 'B1',
    stationName: 'B1 Bazaar Police Station',
    subdivision: 'Central',
    bnsSection: 'BNS Sec 305 (Theft in Dwelling) & BNS 331(3)',
    ipcEquivalent: 'IPC Sec 380 & 454',
    category: 'Theft & Burglary',
    severity: 'Medium',
    incidentDate: '2026-10-05 03:30',
    registrationDate: '2026-10-05 09:00',
    complainantName: 'K. Ranganathan (Jewellery Merchant)',
    complainantPhone: '+91 98430 55120',
    incidentLocation: 'Shop #42, Raja Street, Town Hall, Coimbatore',
    briefDescription: 'Night break-in through terrace skylight. Silver articles weighing 12 kg and cash ₹75,000 reported stolen.',
    status: 'Charge Sheet Filed',
    investigatingOfficer: {
      name: 'K. Senthil Kumar',
      rank: 'Inspector of Police',
      phone: '+91 94981 01201',
      badgeNumber: 'CBE-BA-1105'
    },
    accused: [
      {
        name: 'D. Selvakumar @ Karuppu Selvam',
        age: 38,
        gender: 'Male',
        alias: 'Karuppu Selvam',
        address: 'Podanur Main Road, Coimbatore',
        status: 'Remanded (Coimbatore Central Prison)',
        arrestDate: '2026-10-07 11:30'
      }
    ],
    evidence: [
      {
        id: 'EVD-0095-1',
        itemDescription: 'Fingerprints lifted from terrace iron grille matching State Fingerprint Bureau record',
        category: 'Forensic',
        seizureDate: '2026-10-05',
        storageLocation: 'Forensic Lab Archive CBE #88',
        verifiedBy: 'Inspector Senthil Kumar'
      },
      {
        id: 'EVD-0095-2',
        itemDescription: '11.8 kg Silver articles recovered in gunny sack from abandoned godown near Podanur',
        category: 'Physical',
        seizureDate: '2026-10-08',
        storageLocation: 'Judicial Magistrate Court No. 1 Malkhana',
        verifiedBy: 'Inspector Senthil Kumar'
      }
    ],
    caseDiary: [
      {
        date: '2026-10-05 10:15',
        officer: 'K. Senthil Kumar',
        rank: 'Inspector',
        entry: 'Crime Scene inspection along with Scientific Assistant and sniffer dog Tyson. Latent prints lifted.'
      },
      {
        date: '2026-10-08 14:00',
        officer: 'K. Senthil Kumar',
        rank: 'Inspector',
        entry: 'Recovery Mahazar completed under Section 27 Evidence Act in presence of independent village administrative witnesses.'
      },
      {
        date: '2026-10-14 11:00',
        officer: 'K. Senthil Kumar',
        rank: 'Inspector',
        entry: 'Investigation concluded. Charge Sheet (Form 73) submitted before Judicial Magistrate I, Coimbatore.'
      }
    ],
    recoveryAmount: '₹9,20,000 (11.8kg Silver + ₹60,000 Cash)',
    lastUpdated: '2026-10-14 12:00'
  },
  {
    id: 'CBE/2026/FIR-0112',
    stationCode: 'E2',
    stationName: 'E2 Peelamedu Police Station',
    subdivision: 'East',
    bnsSection: 'BNS Sec 303(2) (Motor Vehicle Theft)',
    ipcEquivalent: 'IPC Sec 379',
    category: 'Vehicle Theft',
    severity: 'Medium',
    incidentDate: '2026-10-14 20:15',
    registrationDate: '2026-10-15 01:20',
    complainantName: 'R. Vignesh Kumar',
    complainantPhone: '+91 97890 33124',
    incidentLocation: 'Fun Republic Mall Parking, Avinashi Road, Peelamedu',
    briefDescription: 'Royal Enfield Classic 350 (Dark Stealth Black, Reg: TN 38 DJ 9912) stolen from mall outdoor two-wheeler bay.',
    status: 'FIR Registered',
    investigatingOfficer: {
      name: 'P. Thirunavukkarasu',
      rank: 'Inspector of Police',
      phone: '+91 94981 01206',
      badgeNumber: 'CBE-PE-2201'
    },
    accused: [],
    evidence: [
      {
        id: 'EVD-0112-1',
        itemDescription: 'Mall exit boom barrier CCTV footage timestamped 20:41 hrs showing suspect wearing black helmet',
        category: 'Digital / Cyber',
        seizureDate: '2026-10-15',
        storageLocation: 'Station Media Storage Box #1',
        verifiedBy: 'Inspector Thirunavukkarasu'
      }
    ],
    caseDiary: [
      {
        date: '2026-10-15 01:45',
        officer: 'P. Thirunavukkarasu',
        rank: 'Inspector',
        entry: 'FIR generated. Alert broadcasted across City Toll Plazas (Karumathampatti, Neelambur, Kaniyur) and Vahan portal.'
      }
    ],
    recoveryAmount: 'Under Investigation (Vehicle Est: ₹2,10,000)',
    lastUpdated: '2026-10-15 02:40'
  },
  {
    id: 'CBE/2026/FIR-0089',
    stationCode: 'B2',
    stationName: 'B2 R.S. Puram Police Station',
    subdivision: 'West',
    bnsSection: 'BNS Sec 74 (Outraging Modesty) & BNS 351(2) (Criminal Intimidation)',
    ipcEquivalent: 'IPC Sec 354 & 506',
    category: 'Women & Child Safety',
    severity: 'High',
    incidentDate: '2026-10-01 18:30',
    registrationDate: '2026-10-01 21:00',
    complainantName: 'Confidential (Student, Age 21)',
    complainantPhone: '+91 98421 99014',
    incidentLocation: 'Near Flower Market, Thadagam Road, RS Puram',
    briefDescription: 'Stalking and verbal assault on female college student returning from coaching centre. Suspect pursued on moped.',
    status: 'Charge Sheet Filed',
    investigatingOfficer: {
      name: 'S. Jayalakshmi',
      rank: 'All Women Police Station Inspector',
      phone: '+91 94981 01204',
      badgeNumber: 'CBE-AW-0051'
    },
    accused: [
      {
        name: 'M. Anandhakumar',
        age: 28,
        gender: 'Male',
        address: 'Saibaba Colony, Coimbatore',
        status: 'Remanded (Coimbatore Central Prison)',
        arrestDate: '2026-10-02 09:30'
      }
    ],
    evidence: [
      {
        id: 'EVD-0089-1',
        itemDescription: 'WhatsApp threatening voice notes and call recordings submitted by victim',
        category: 'Digital / Cyber',
        seizureDate: '2026-10-01',
        storageLocation: 'Cyber Forensics Unit Archive',
        verifiedBy: 'Inspector S. Jayalakshmi'
      }
    ],
    caseDiary: [
      {
        date: '2026-10-02 10:00',
        officer: 'S. Jayalakshmi',
        rank: 'Inspector',
        entry: 'Accused apprehended at his workplace. Confessed to following victim. Produced before Mahila Court Judge and remanded.'
      }
    ],
    lastUpdated: '2026-10-11 15:00'
  },
  {
    id: 'CBE/2026/FIR-0101',
    stationCode: 'E1',
    stationName: 'E1 Singanallur Police Station',
    subdivision: 'East',
    bnsSection: 'NDPS Act 1985 Sec 8(c) r/w 20(b)(ii)(B)',
    ipcEquivalent: 'NDPS Special Act',
    category: 'Narcotics & NDPS',
    severity: 'Critical',
    incidentDate: '2026-10-11 22:30',
    registrationDate: '2026-10-11 23:45',
    complainantName: 'State through Sub-Inspector M. Karthik (Suo Motu)',
    complainantPhone: '+91 94981 01205',
    incidentLocation: 'Near Singanallur Bus Terminal Parcel Office',
    briefDescription: 'During anti-narcotics vehicle check, intercepted interstate contraband parcel containing 14.5 kg of Ganja (Cannabis) transported from Andhra Pradesh.',
    status: 'Under Investigation',
    investigatingOfficer: {
      name: 'V. Muruganandam',
      rank: 'Inspector of Police',
      phone: '+91 94981 01205',
      badgeNumber: 'CBE-SI-1901'
    },
    accused: [
      {
        name: 'R. Surendhar @ Ganja Suren',
        age: 31,
        gender: 'Male',
        alias: 'Suren',
        address: 'Ondipudur, Coimbatore',
        status: 'Arrested',
        arrestDate: '2026-10-11 23:15'
      },
      {
        name: 'S. Vijay (Interstate Consignor)',
        age: 35,
        gender: 'Male',
        address: 'Visakhapatnam, Andhra Pradesh',
        status: 'Absconding'
      }
    ],
    evidence: [
      {
        id: 'EVD-0101-1',
        itemDescription: '14.5 kg green cannabis packed in 7 brown taped parcels, tested with field drug testing kit',
        category: 'Physical',
        seizureDate: '2026-10-11',
        storageLocation: 'Singanallur Malkhana NDPS Lockbox',
        verifiedBy: 'Inspector V. Muruganandam'
      }
    ],
    caseDiary: [
      {
        date: '2026-10-12 04:00',
        officer: 'V. Muruganandam',
        rank: 'Inspector',
        entry: 'Samples sealed under Sec 52A NDPS in front of Judicial Magistrate II for chemical analysis at Forensic Sciences Lab Chennai.'
      }
    ],
    recoveryAmount: '₹7,25,000 (Market Value Contraband)',
    lastUpdated: '2026-10-14 20:00'
  },
  {
    id: 'CBE/2026/FIR-0078',
    stationCode: 'B4',
    stationName: 'B4 Ukkadam Police Station',
    subdivision: 'South',
    bnsSection: 'BNS Sec 115(2) (Voluntarily Causing Hurt) & BNS 352 (Affray)',
    ipcEquivalent: 'IPC Sec 323 & 160',
    category: 'Violent Crime & Assault',
    severity: 'Medium',
    incidentDate: '2026-09-28 21:00',
    registrationDate: '2026-09-29 02:00',
    complainantName: 'M. Syed Ibrahim',
    complainantPhone: '+91 98940 12891',
    incidentLocation: 'Fish Market Lane, Ukkadam, Coimbatore',
    briefDescription: 'Altercation between two groups over unloading space leading to physical assault with wooden logs. Two persons sustained blunt injuries.',
    status: 'Under Trial',
    investigatingOfficer: {
      name: 'A. Mohammed Rafeeq',
      rank: 'Inspector of Police',
      phone: '+91 94981 01208',
      badgeNumber: 'CBE-UK-0771'
    },
    accused: [
      {
        name: 'T. Hameed',
        age: 29,
        gender: 'Male',
        address: 'Karumbukkadai, Coimbatore',
        status: 'On Bail'
      },
      {
        name: 'N. Bilal',
        age: 27,
        gender: 'Male',
        address: 'Ukkadam, Coimbatore',
        status: 'On Bail'
      }
    ],
    evidence: [
      {
        id: 'EVD-0078-1',
        itemDescription: 'CMCH Coimbatore Medical Examination & Wound Certificates for injured victims',
        category: 'Documentary',
        seizureDate: '2026-09-29',
        storageLocation: 'Case File Docket UK-78',
        verifiedBy: 'Inspector Rafeeq'
      }
    ],
    caseDiary: [
      {
        date: '2026-10-04 11:00',
        officer: 'A. Mohammed Rafeeq',
        rank: 'Inspector',
        entry: 'Charge sheet filed in Judicial Magistrate Court V. Summons served for trial hearing.'
      }
    ],
    lastUpdated: '2026-10-09 16:20'
  },
  {
    id: 'CBE/2026/FIR-0115',
    stationCode: 'E3',
    stationName: 'E3 Saravanampatti Police Station',
    subdivision: 'East',
    bnsSection: 'BNS Sec 318(4) (Job Fraud / Cheating)',
    ipcEquivalent: 'IPC Sec 420',
    category: 'Financial & Cheating',
    severity: 'High',
    incidentDate: '2026-10-13 14:00',
    registrationDate: '2026-10-14 16:30',
    complainantName: 'K. Divyaprabha & 14 Other Tech Graduates',
    complainantPhone: '+91 97910 88722',
    incidentLocation: 'CHIL SEZ IT Park Road, Saravanampatti',
    briefDescription: 'Bogus HR placement agency collected ₹85,000 each from 15 engineering graduates promising software developer appointments in multinational firms.',
    status: 'Under Investigation',
    investigatingOfficer: {
      name: 'K. Natarajan',
      rank: 'Inspector of Police',
      phone: '+91 94981 01207',
      badgeNumber: 'CBE-SR-3301'
    },
    accused: [
      {
        name: 'J. Robinson @ Robert',
        age: 39,
        gender: 'Male',
        alias: 'Robert Sir',
        address: 'Nagercoil / Presently Saravanampatti rented office',
        status: 'Absconding'
      }
    ],
    evidence: [
      {
        id: 'EVD-0115-1',
        itemDescription: '15 Counterfoil payment receipts and forged appointment letters with fake company seals',
        category: 'Documentary',
        seizureDate: '2026-10-14',
        storageLocation: 'Station Crime Register Box 9',
        verifiedBy: 'Inspector Natarajan'
      }
    ],
    caseDiary: [
      {
        date: '2026-10-14 18:00',
        officer: 'K. Natarajan',
        rank: 'Inspector',
        entry: 'Office inspected. Locked. Landlord examined. Lookout circular shared with railway police and airports.'
      }
    ],
    recoveryAmount: 'Est. Total Defrauded: ₹12,75,000',
    lastUpdated: '2026-10-15 01:10'
  }
];

export const INITIAL_HOTSPOTS: CrimeHotspot[] = [
  {
    id: 'hs-1',
    name: 'Gandhipuram Bus Stand & Cross Cut Road',
    location: 'Central Sub-Division (C1 Jurisdiction)',
    zone: 'Central Commercial Hub',
    primaryCrimeType: 'Pickpocketing & Mobile Snatching',
    incidentCount30d: 14,
    riskLevel: 'Critical',
    activePatrolUnit: 'Cheetah 03 (Gandhipuram Sector)',
    coordinates: { x: 52, y: 38 },
    cctvSurveillance: true
  },
  {
    id: 'hs-2',
    name: 'Town Hall & Big Bazaar Street',
    location: 'Central Sub-Division (B1 Jurisdiction)',
    zone: 'Old City Jewellery Market',
    primaryCrimeType: 'Shop Burglaries & Two Wheeler Theft',
    incidentCount30d: 9,
    riskLevel: 'Elevated',
    activePatrolUnit: 'Cheetah 01 (Clock Tower Beat)',
    coordinates: { x: 44, y: 55 },
    cctvSurveillance: true
  },
  {
    id: 'hs-3',
    name: 'Ukkadam Bus Stand & Fish Market',
    location: 'South Sub-Division (B4 Jurisdiction)',
    zone: 'Transit & Wholesale Market',
    primaryCrimeType: 'Affray, Drug Peddling & Snatching',
    incidentCount30d: 12,
    riskLevel: 'Critical',
    activePatrolUnit: 'Cheetah 05 (Ukkadam Lake Beat)',
    coordinates: { x: 42, y: 65 },
    cctvSurveillance: true
  },
  {
    id: 'hs-4',
    name: 'Peelamedu Hope College & Fun Mall Corridor',
    location: 'East Sub-Division (E2 Jurisdiction)',
    zone: 'College & IT Belt (Avinashi Road)',
    primaryCrimeType: 'Motorcycle Theft & Night Stalking',
    incidentCount30d: 8,
    riskLevel: 'Elevated',
    activePatrolUnit: 'Cheetah 06 (Avinashi Highway Patrol)',
    coordinates: { x: 70, y: 32 },
    cctvSurveillance: true
  },
  {
    id: 'hs-5',
    name: 'Singanallur Bus Terminal & Trichy Road Jn',
    location: 'East Sub-Division (E1 Jurisdiction)',
    zone: 'Interstate Transport Node',
    primaryCrimeType: 'Parcel Narcotic Smuggling & Baggage Theft',
    incidentCount30d: 11,
    riskLevel: 'Critical',
    activePatrolUnit: 'Cheetah 04 (Singanallur Beat)',
    coordinates: { x: 76, y: 58 },
    cctvSurveillance: true
  },
  {
    id: 'hs-6',
    name: 'Saravanampatti CHIL SEZ & KGISL Jn',
    location: 'East Sub-Division (E3 Jurisdiction)',
    zone: 'Tech Park IT Corridor',
    primaryCrimeType: 'Late Night Vehicle Prowling & Fraud',
    incidentCount30d: 5,
    riskLevel: 'Moderate',
    activePatrolUnit: 'Cheetah 07 (Tech Corridor Patrol)',
    coordinates: { x: 65, y: 18 },
    cctvSurveillance: true
  },
  {
    id: 'hs-7',
    name: 'R.S. Puram DB Road Shopping Strip',
    location: 'West Sub-Division (B2 Jurisdiction)',
    zone: 'Upscale Retail & Restaurant Zone',
    primaryCrimeType: 'Car Window Smashing & Valuables Theft',
    incidentCount30d: 4,
    riskLevel: 'Moderate',
    activePatrolUnit: 'Cheetah 02 (RS Puram Sector)',
    coordinates: { x: 34, y: 42 },
    cctvSurveillance: true
  },
  {
    id: 'hs-8',
    name: 'Ramanathapuram 80 Feet Road Jn',
    location: 'Central Sub-Division (D1 Jurisdiction)',
    zone: 'Residential & Commercial Arterial',
    primaryCrimeType: 'Chain Snatching on Evening Walkers',
    incidentCount30d: 6,
    riskLevel: 'Elevated',
    activePatrolUnit: 'Cheetah 08 (Nanjundapuram Beat)',
    coordinates: { x: 58, y: 56 },
    cctvSurveillance: true
  }
];

export const INITIAL_MISSING_PERSONS: MissingPerson[] = [
  {
    id: 'MP-CBE-2026-44',
    name: 'Master S. Harish',
    age: 14,
    gender: 'Male',
    missingSince: '2026-10-12',
    missingFrom: 'Near Gandhipuram Government Higher Secondary School',
    identifyingMarks: 'Mole on right cheek, scar near left eyebrow. Wearing blue school uniform shirt and navy shorts.',
    height: "4'11\" (150 cm)",
    contactStation: 'C1 Katoor Police Station',
    contactOfficer: 'Sub-Inspector Saravanan',
    contactPhone: '0422-2231003',
    status: 'Tracing in Progress'
  },
  {
    id: 'MP-CBE-2026-39',
    name: 'Thiru. M. Arumugam (Senior Citizen with Memory Loss)',
    age: 72,
    gender: 'Male',
    missingSince: '2026-10-13',
    missingFrom: 'Ramanathapuram 80 Feet Road Morning Walk',
    identifyingMarks: 'White hair, walking stick, responds to Tamil dialect. Wearing cream safari shirt and white dhoti.',
    height: "5'6\" (168 cm)",
    contactStation: 'D1 Ramanathapuram Police Station',
    contactOfficer: 'Inspector D. Vijaya Raghavan',
    contactPhone: '0422-2311009',
    status: 'Tracing in Progress'
  },
  {
    id: 'MP-CBE-2026-31',
    name: 'Selvi. P. Nithya',
    age: 19,
    gender: 'Female',
    missingSince: '2026-10-08',
    missingFrom: 'Peelamedu Hostel area',
    identifyingMarks: 'Birthmark on left wrist, spectacles.',
    height: "5'3\" (160 cm)",
    contactStation: 'E2 Peelamedu Police Station',
    contactOfficer: 'Inspector Thirunavukkarasu',
    contactPhone: '0422-2511006',
    status: 'Located'
  }
];

export const INITIAL_STOLEN_VEHICLES: StolenVehicle[] = [
  {
    id: 'SV-01',
    registrationNumber: 'TN 38 DJ 9912',
    makeModel: 'Royal Enfield Classic 350',
    vehicleType: 'Two Wheeler',
    color: 'Stealth Black',
    stolenDate: '2026-10-14',
    stolenLocation: 'Fun Mall Parking, Peelamedu',
    firNumber: 'CBE/2026/FIR-0112',
    engineNumber: 'U350-EC98124',
    chassisNumber: 'ME3U3S5F0L189201',
    status: 'Stolen - Tracing'
  },
  {
    id: 'SV-02',
    registrationNumber: 'TN 37 CY 4118',
    makeModel: 'Honda Activa 6G',
    vehicleType: 'Two Wheeler',
    color: 'Pearl White',
    stolenDate: '2026-10-10',
    stolenLocation: 'Opp. Cross Cut Kalyan Silks, Gandhipuram',
    firNumber: 'CBE/2026/FIR-0099',
    engineNumber: 'JF91E-904128',
    chassisNumber: 'ME4JF916FLN8291',
    status: 'Stolen - Tracing'
  },
  {
    id: 'SV-03',
    registrationNumber: 'TN 99 B 1204',
    makeModel: 'Maruti Suzuki Swift VXi',
    vehicleType: 'Four Wheeler',
    color: 'Magma Grey',
    stolenDate: '2026-10-06',
    stolenLocation: 'DB Road, R.S. Puram near Corporation Park',
    firNumber: 'CBE/2026/FIR-0091',
    engineNumber: 'K12M-771920',
    chassisNumber: 'MA3EWB1S00K4410',
    status: 'Recovered'
  },
  {
    id: 'SV-04',
    registrationNumber: 'TN 66 AB 5501',
    makeModel: 'TVS Jupiter 125',
    vehicleType: 'Two Wheeler',
    color: 'Titanium Grey',
    stolenDate: '2026-10-12',
    stolenLocation: 'Singanallur Bus Stand Two-Wheeler Stand',
    firNumber: 'CBE/2026/FIR-0105',
    engineNumber: 'TG125-55190',
    chassisNumber: 'MD626BF44M1109',
    status: 'Seized at Checkpost'
  }
];

export const POLICE_ADVISORIES = [
  {
    id: 'ADV-01',
    tag: 'Cyber Fraud Advisory',
    title: 'Beware of "Digital Arrest" & Fake Law Enforcement Video Calls',
    date: '14 Oct 2026',
    summary: 'No Police officer or CBI agent will ever place citizens under "Digital Arrest" over Skype or WhatsApp video calls or demand funds transfer. Dial 1930 immediately if targeted.',
    urgency: 'High'
  },
  {
    id: 'ADV-02',
    tag: 'Festival Season Alert',
    title: 'Special Crime Prevention Drive in Gandhipuram & Town Hall Shopping Hubs',
    date: '12 Oct 2026',
    summary: 'Over 180 undercover shadow beat officers deployed in civil clothes across Cross Cut Road, Raja Street, and 100ft Road. Citizens advised to report suspicious activity to nearest booth.',
    urgency: 'Medium'
  },
  {
    id: 'ADV-03',
    tag: 'Traffic & Night Safety',
    title: 'Round-the-clock Drone & Mobile Patrol along Avinashi & Sathy IT Corridors',
    date: '10 Oct 2026',
    summary: 'Women commuters can utilize the Free Night Escort / Drop Assistance service from 10:00 PM to 05:00 AM by dialing Police Helpline 112 or 1091.',
    urgency: 'Info'
  }
];
