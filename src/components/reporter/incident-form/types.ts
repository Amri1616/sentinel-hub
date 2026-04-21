export interface StaffDetected {
  name: string;
  designation: string;
  contactNumber: string;
  email: string;
}

export interface SenderRecipientInfo {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  contact: string;
}

export interface CyberIncidentReport {
  companyName: string;
  registeredAddress: string;
  reporterName: string;
  position: string;
  email: string;
  phoneNumber: string;
  faxNumber: string;

  incidentDescription: string;
  incidentChronology: string;
  incidentChronologyEntries: Array<{
    date: string;
    time: string;
    event: string;
  }>;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  detectedOfficer: StaffDetected;
  affectedSystem: string;
  estimatedImpact: 'Low' | 'Medium' | 'High' | '';
  downtimeDuration: string;
  rootCause: string;
  failingComponent: string;
  otherInfo: string;

  actionsTaken: string;
  incidentControlled: 'Yes' | 'No' | '';
  assistanceRequired: string[];
  assistanceOther: string;
  reportedToAuthority: 'Yes' | 'No' | '';
  authorityDetails: string;

  hasSupportingDocuments: 'Yes' | 'No' | '';
  supportingLinkOrMethod: string;
  uploadedDocuments: Array<{ name: string; size: number }>;

  declarationTruth: boolean;
  declarationSharing: boolean;
  declarationDate: string;
  completed: boolean;
}

export interface IncidentFormData {
  // Part 1: Reporter Information
  companyName: string;
  registeredAddress: string;
  reporterName: string;
  position: string;
  officialEmail: string;
  contactNumber: string;
  faxNumber: string;
  additionalPhone: string;
  alternativeEmail: string;

  // Part 3: Incident Information
  primaryIncidentType: string;
  description: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: SenderRecipientInfo;
  staffDetected: StaffDetected;
  systemServiceAffected: string;
  vehicleDetails: string;
  buildingDetails: string;
  observedImpact: string;
  senderInfo: SenderRecipientInfo;
  recipientInfo: SenderRecipientInfo;
  trackingNumber: string;
  packageDeclaration: string;
  packageWeight: string;
  prohibitedItemType: string;
  skipParcelDetails: boolean;
  skipSenderInfo: boolean;
  skipRecipientInfo: boolean;
  otherRelatedInfo: string;
  cyberIncidentReport: CyberIncidentReport;

  // Part 4: Actions Taken
  immediateActions: string;
  incidentContained: string; // Yes | No | Ongoing
  assistanceRequired: string[];
  assistanceOther: string;
  reportedToAuthorities: string; // Yes | No
  authorityDetails: string;
  parcelHandedOver: string; // Yes | No
  authorityReportNumber: string;

  // Part 5: Supporting Documents
  attachments: Array<{ name: string; size: number; category?: string; previewUrl?: string; mimeType?: string }>;

  // Part 6: Declaration
  declaration: boolean;
  declarationDate: string;
}

export type Step = 1 | 2 | 3 | 4 | 5 | 6;

export const simplifiedIncidentTypes = [
  'Prohibited Items',
  'Postal Operation Disruption',
  'Security Threat',
  'Cyber Security Incidents',
  'Others',
];

// Grouped incident type options for Part 3
export interface IncidentTypeGroup {
  label: string;
  options: string[];
}

export const incidentTypeGroups: IncidentTypeGroup[] = [
  {
    label: 'Prohibited Postal Items',
    options: [
      'Gold bullion',
      'Counterfeit or pirated goods',
      'Currency',
      'Dangerous, toxic, or flammable materials',
      'Illegal drugs or narcotics',
      'Firearms, weapons, ammunition (including replicas)',
      'Bearer negotiable instruments',
      'Pornographic materials',
      'Wildlife or exotic animals',
      'Items prohibited under Federal, State, or local laws',
      'Other (Prohibited Postal Items)',
    ],
  },
  {
    label: 'Serious Threat',
    options: [
      'Explosives, biological or chemical threats',
      'Sabotage or large-scale infrastructure damage',
      'Criminal activities within postal hubs',
      'Gas leaks, fires, or major accidents',
      'Significant disruption to postal operations',
      'Other (Serious Threat)',
    ],
  },
  {
    label: 'Cyber Security Incidents',
    options: [
      'Denial-of-Service (DoS) / Distributed Denial-of-Service (DDoS)',
      'Intrusion Attempt',
      'Intrusion',
      'Malware',
      'Malware Hosting',
      'Social Engineering / Fraud',
      'Data-Related Incidents',
      'Potential Attack',
      'Defacement',
      'Others',
    ],
  },
  {
    label: 'Medium Severity Incident',
    options: [
      'Scam or fraud cases',
      'Theft or loss of postal items',
      'Mail tampering',
      'System outage',
      'Floods or natural disasters',
      'Suspicious package (false alarm)',
      'Non-compliance with postal procedures',
      'Limited impact data access incidents',
      'Other (Medium Severity Incident)',
    ],
  },
  {
    label: 'Operational Issues',
    options: [
      'Customs hold',
      'Minor delivery delays',
      'Documentation errors',
      'Procedural lapses',
      'Customer complaints (non-security)',
      'Administrative issues',
      'Minor system/process issues',
      'Other (Operational Issues)',
    ],
  },
];

export const observedImpactOptions = [
  'Operational Disruption',
  'Safety Risk',
  'Financial Impact',
  'Data / Information Risk',
  'Reputational Risk',
  'No Significant Impact',
];

export const cyberSecurityIncidentOptions = [
  'Denial-of-Service (DoS) / Distributed Denial-of-Service (DDoS)',
  'Intrusion Attempt',
  'Intrusion',
  'Malware',
  'Malware Hosting',
  'Social Engineering / Fraud',
  'Data-Related Incidents',
  'Potential Attack',
  'Defacement',
  'Others',
];

// Incident types that require parcel information section
export const parcelRelatedTypes = new Set([
  // All Prohibited Postal Items
  'Gold bullion',
  'Counterfeit or pirated goods',
  'Currency',
  'Dangerous, toxic, or flammable materials',
  'Illegal drugs or narcotics',
  'Firearms, weapons, ammunition (including replicas)',
  'Bearer negotiable instruments',
  'Pornographic materials',
  'Wildlife or exotic animals',
  'Items prohibited under Federal, State, or local laws',
  // Theft / loss / tampering / suspicious
  'Theft or loss of postal items',
  'Mail tampering',
  'Suspicious package (false alarm)',
]);

export const emptySenderRecipient: SenderRecipientInfo = {
  name: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'Malaysia',
  contact: '',
};

export const emptyCyberIncidentReport: CyberIncidentReport = {
  companyName: '',
  registeredAddress: '',
  reporterName: '',
  position: '',
  email: '',
  phoneNumber: '',
  faxNumber: '',

  incidentDescription: '',
  incidentChronology: '',
  incidentChronologyEntries: Array.from({ length: 10 }, () => ({
    date: '',
    time: '',
    event: '',
  })),
  incidentDate: '',
  incidentTime: '',
  incidentLocation: '',
  detectedOfficer: { name: '', designation: '', contactNumber: '', email: '' },
  affectedSystem: '',
  estimatedImpact: '',
  downtimeDuration: '',
  rootCause: '',
  failingComponent: '',
  otherInfo: '',

  actionsTaken: '',
  incidentControlled: '',
  assistanceRequired: [],
  assistanceOther: '',
  reportedToAuthority: '',
  authorityDetails: '',

  hasSupportingDocuments: '',
  supportingLinkOrMethod: '',
  uploadedDocuments: [],

  declarationTruth: false,
  declarationSharing: false,
  declarationDate: '',
  completed: false,
};
