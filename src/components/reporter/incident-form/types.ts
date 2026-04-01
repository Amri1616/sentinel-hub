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
  observedImpact: string;
  senderInfo: SenderRecipientInfo;
  recipientInfo: SenderRecipientInfo;
  trackingNumber: string;
  packageDeclaration: string;
  packageWeight: string;
  prohibitedItemType: string;
  otherRelatedInfo: string;

  // Part 4: Actions Taken
  immediateActions: string;
  incidentContained: string; // Yes | No | Ongoing
  assistanceRequired: string[];
  assistanceOther: string;
  reportedToAuthorities: string; // Yes | No
  authorityDetails: string;
  parcelHandedOver: string; // Yes | No

  // Part 5: Supporting Documents
  attachments: Array<{ name: string; size: number }>;

  // Part 6: Declaration
  declaration: boolean;
  declarationDate: string;
}

export type Step = 1 | 2 | 3 | 4 | 5 | 6;

export const simplifiedIncidentTypes = [
  'Prohibited Items',
  'Postal Operation Disruption',
  'Security Threat',
  'Customer Information Leakage',
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
      'Data leakage or cyber incidents',
      'Sabotage or large-scale infrastructure damage',
      'Criminal activities within postal hubs',
      'Gas leaks, fires, or major accidents',
      'Significant disruption to postal operations',
      'Other (Serious Threat)',
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
