import { CaseData } from '@/components/shared/CaseDetailsView';

export const fallbackIncident = (id: string): CaseData => ({
  id: id || 'PSIRP-2025-0025',
  title: id === 'PSIRP-2025-0032' ? 'Customer Data Exposure in Tracking Portal' : 'High-Value Package Theft',
  status: 'In Review',
  severity: 'High',
  description: id === 'PSIRP-2025-0032'
    ? 'Unusual API traffic exposed partial recipient profile data in the parcel tracking portal for approximately 18 minutes before the endpoint was blocked.'
    : 'A high-value package containing electronic goods was reported missing from the KL Distribution Center during the morning shift. The package was last scanned at 08:45 AM and could not be located during the 10:00 AM audit.',
  incidentDate: id === 'PSIRP-2025-0032' ? '2025-01-18' : '2025-01-15',
  incidentTime: id === 'PSIRP-2025-0032' ? '11:22' : '08:45',
  incidentLocation: id === 'PSIRP-2025-0032' ? 'Global Express SOC, Cyberjaya' : 'Lot 5, Jalan Teknologi, Taman Sains Selangor, Shah Alam',
  dateReported: id === 'PSIRP-2025-0032' ? '2025-01-18 12:05' : '2025-01-15 10:30',
  branchName: 'KL Main Distribution Center',
  address: 'Lot 5, Jalan Teknologi, Taman Sains Selangor',
  state: 'Selangor',
  postalCode: '47810',
  companyName: 'Pos Malaysia Berhad',
  registeredAddress: 'Dayabumi Complex, Jalan Sultan Hishamuddin, 50670 Kuala Lumpur',
  reporterName: 'Ahmad bin Ibrahim',
  reporterDesignation: 'Security Manager',
  reporterEmail: 'ahmad.ibrahim@posmalaysia.com.my',
  alternativeEmail: 'ahmad.sec@gmail.com',
  reporterPhone: '+60 12-345 6789',
  additionalPhone: '+60 17-888 9999',
  faxNumber: '+60 3-2222 3333',
  leaEscalation: 'No',
  systemServiceAffected: id === 'PSIRP-2025-0032' ? 'Public Tracking API and Customer Portal' : 'Parcel Tracking System',
  observedImpact: id === 'PSIRP-2025-0032' ? 'Service Impact' : 'Financial Impact',
  estimatedImpact: id === 'PSIRP-2025-0032' ? 'High' : undefined,
  isCyberIncident: id === 'PSIRP-2025-0032',
  cyberIncidentDetails: id === 'PSIRP-2025-0032'
    ? {
        chronologyEntries: [
          { date: '2025-01-18', time: '10:57', event: 'SIEM alert triggered for abnormal API request burst.' },
          { date: '2025-01-18', time: '11:09', event: 'SOC confirmed partial recipient data exposure on tracking endpoint.' },
          { date: '2025-01-18', time: '11:15', event: 'Endpoint blocked and temporary WAF policy enforced.' },
        ],
        downtimeDuration: '18 minutes',
        rootCause: 'Access control misconfiguration after deployment rollback combined with missing API scope validation.',
        failingComponent: 'Tracking API gateway policy and user-profile lookup middleware.',
        otherInfo: 'No payment data was exposed. Scope limited to recipient name and partial address fields.',
      }
    : undefined,
  primaryIncidentType: id === 'PSIRP-2025-0032' ? 'Data leakage or cyber incidents' : 'Theft or loss of postal items',
  staffDetected: { name: 'Ali bin Hassan', designation: 'Warehouse Supervisor', contactNumber: '+60 13-456 7890', email: 'ali.hassan@posmalaysia.com.my' },
  senderInfo: id === 'PSIRP-2025-0032' ? undefined : { name: 'TechCo Sdn Bhd', address: '12 Jalan Tech, KL', stateCountry: 'Kuala Lumpur, Malaysia', contact: '+60123456789' },
  recipientInfo: id === 'PSIRP-2025-0032' ? undefined : { name: 'Ahmad bin Ibrahim', address: '45 Jalan Mawar, Shah Alam', stateCountry: 'Selangor, Malaysia', contact: '+60198765432' },
  trackingNumber: id === 'PSIRP-2025-0032' ? undefined : 'EC20250115-12345',
  packageDeclaration: id === 'PSIRP-2025-0032' ? undefined : 'Sample Electronic Device - Prohibited Lithium Battery',
  packageWeight: id === 'PSIRP-2025-0032' ? undefined : '1.2',
  prohibitedItemType: id === 'PSIRP-2025-0032' ? undefined : 'Lithium Batteries',
  otherRelatedInfo: id === 'PSIRP-2025-0032' ? 'Exposure window contained after rate-limit and access token revocation.' : 'The item was flagged during x-ray screening at the departure gate.',
  linkDescription: id === 'PSIRP-2025-0032' ? 'SOC incident note, affected endpoint list, and API gateway logs are attached.' : 'Detailed screening report and x-ray images: https://storage.pos.my/evidence/ABXX0020-xray',
  immediateActions: id === 'PSIRP-2025-0032'
    ? 'Revoked exposed tokens, blocked endpoint, rotated credentials, and enabled temporary WAF rules while forensic review was started.'
    : 'Parcel isolated in a secure cabinet, local authorities notified, and sender is being contacted for clarification.',
  incidentContained: 'Yes',
  incidentControlStatus: 'Contained',
  reportedToAuthority: id === 'PSIRP-2025-0032' ? 'No' : 'Yes',
  authorityAgency: id === 'PSIRP-2025-0032' ? undefined : 'PDRM',
  authorityReference: id === 'PSIRP-2025-0032' ? undefined : 'RPT-2025-KL-0045',
  authorityDetails: id === 'PSIRP-2025-0032' ? undefined : 'PDRM — RPT-2025-KL-0045',
  parcelHandedOver: id === 'PSIRP-2025-0032' ? 'No' : 'Yes',
  assistanceRequested: id === 'PSIRP-2025-0032' ? [] : ['Investigation Support', 'Security Audit'],
  documents: [
    id === 'PSIRP-2025-0032'
      ? { name: 'API_Access_Log_Window.csv', size: '2.3 MB', uploadedBy: 'Ahmad bin Ibrahim', uploadDate: '2025-01-18 12:02' }
      : { name: 'X-Ray_Screening_B102.png', size: '1.8 MB', uploadedBy: 'Ahmad bin Ibrahim', uploadDate: '2025-01-15 10:25' },
    id === 'PSIRP-2025-0032'
      ? { name: 'SOC_Initial_Assessment.pdf', size: '1.4 MB', uploadedBy: 'Ahmad bin Ibrahim', uploadDate: '2025-01-18 12:04' }
      : { name: 'Incident_Report_Internal.pdf', size: '1.1 MB', uploadedBy: 'Ahmad bin Ibrahim', uploadDate: '2025-01-15 10:28' },
  ],
  declarationAgreed: true,
  declarationDate: id === 'PSIRP-2025-0032' ? '2025-01-18' : '2025-01-15',
  escalations: id === 'PSIRP-2025-0032'
    ? []
    : [
        { agency: 'PDRM', status: 'Under Investigation', date: '2025-01-16', reference: 'PDRM-2025-KL-992' },
        { agency: 'CUSTOMS', status: 'Evidence Seized', date: '2025-01-17', reference: 'KST-X-2025-004' },
        { agency: 'NACSA', status: 'Under Investigation', date: '2025-01-18' },
      ]
});
