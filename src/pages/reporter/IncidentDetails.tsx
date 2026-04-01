import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import CaseDetailsView, { getStatusColor, getSeverityColor, type CaseData } from '@/components/shared/CaseDetailsView';
import CaseClarificationThread, { type ClarificationMessage } from '@/components/shared/CaseClarificationThread';
import CaseTimeline, { type TimelineEvent } from '@/components/shared/CaseTimeline';
import { IncidentFormData } from '@/components/reporter/incident-form/types';

function formatAddress(address: any) {
  if (!address || typeof address === 'string') return address || '';
  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.zipCode,
    address.state,
    address.country
  ].filter(Boolean);
  return parts.join(', ');
}

function mapFormToCaseData(id: string, form: IncidentFormData & { submittedAt?: string, linkDescription?: string }): CaseData {
  const submittedAt = form.submittedAt ? new Date(form.submittedAt) : new Date();
  const dateReported = `${submittedAt.toISOString().split('T')[0]} ${submittedAt.toTimeString().slice(0, 5)}`;

  return {
    id,
    title: form.primaryIncidentType?.startsWith('Other') ? (form.otherRelatedInfo || 'Other Incident') : (form.primaryIncidentType || 'Incident Report'),
    status: 'Submitted',
    severity: 'Medium',
    description: form.description,
    incidentDate: form.incidentDate,
    incidentTime: form.incidentTime,
    incidentLocation: formatAddress(form.incidentLocation),
    dateReported,
    branchName: '',
    address: formatAddress(form.incidentLocation),
    state: form.incidentLocation?.state || '',
    postalCode: form.incidentLocation?.zipCode || '',
    companyName: form.companyName,
    registeredAddress: form.registeredAddress,
    reporterName: form.reporterName,
    reporterDesignation: form.position,
    reporterEmail: form.officialEmail,
    alternativeEmail: form.alternativeEmail || undefined,
    reporterPhone: form.contactNumber,
    additionalPhone: form.additionalPhone || undefined,
    faxNumber: form.faxNumber || undefined,
    leaEscalation: form.reportedToAuthorities === 'Yes' ? 'Yes' : 'No',
    systemServiceAffected: form.systemServiceAffected || undefined,
    observedImpact: form.observedImpact || undefined,
    primaryIncidentType: form.primaryIncidentType,
    staffDetected: form.staffDetected?.name ? form.staffDetected : undefined,
    senderInfo: form.senderInfo?.name ? {
      name: form.senderInfo.name,
      address: `${form.senderInfo.addressLine1}${form.senderInfo.addressLine2 ? ', ' + form.senderInfo.addressLine2 : ''}`,
      stateCountry: `${form.senderInfo.city}, ${form.senderInfo.state}, ${form.senderInfo.zipCode}, ${form.senderInfo.country}`,
      contact: form.senderInfo.contact
    } : undefined,
    recipientInfo: form.recipientInfo?.name ? {
      name: form.recipientInfo.name,
      address: `${form.recipientInfo.addressLine1}${form.recipientInfo.addressLine2 ? ', ' + form.recipientInfo.addressLine2 : ''}`,
      stateCountry: `${form.recipientInfo.city}, ${form.recipientInfo.state}, ${form.recipientInfo.zipCode}, ${form.recipientInfo.country}`,
      contact: form.recipientInfo.contact
    } : undefined,
    trackingNumber: form.trackingNumber || undefined,
    packageDeclaration: form.packageDeclaration || undefined,
    packageWeight: form.packageWeight || undefined,
    prohibitedItemType: form.prohibitedItemType || undefined,
    otherRelatedInfo: form.otherRelatedInfo || undefined,
    linkDescription: form.linkDescription || undefined,
    immediateActions: form.immediateActions,
    incidentContained: form.incidentContained || undefined,
    incidentControlStatus: form.incidentContained || '',
    reportedToAuthority: form.reportedToAuthorities || 'No',
    authorityDetails: form.authorityDetails || undefined,
    parcelHandedOver: form.parcelHandedOver || 'No',
    assistanceRequested: form.assistanceRequired || [],
    documents: form.attachments?.map((a) => ({
      name: a.name,
      size: `${(a.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedBy: form.reporterName,
      uploadDate: dateReported,
    })) || [],
    declarationAgreed: form.declaration ?? true,
    declarationDate: form.declarationDate || submittedAt.toISOString().split('T')[0],
  };
}

// Fallback hardcoded data for non-submitted incidents
const fallbackIncident = (id: string): CaseData => ({
  id: id || 'PSIRP-2025-0025',
  title: 'High-Value Package Theft',
  status: 'In Review',
  severity: 'High',
  description: 'A high-value package containing electronic goods was reported missing from the KL Distribution Center during the morning shift. The package was last scanned at 08:45 AM and could not be located during the 10:00 AM audit.',
  incidentDate: '2025-01-15',
  incidentTime: '08:45',
  incidentLocation: 'Lot 5, Jalan Teknologi, Taman Sains Selangor, Shah Alam',
  dateReported: '2025-01-15 10:30',
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
  systemServiceAffected: 'Parcel Tracking System',
  observedImpact: 'Financial Impact',
  primaryIncidentType: 'Theft or loss of postal items',
  staffDetected: { name: 'Ali bin Hassan', designation: 'Warehouse Supervisor', contactNumber: '+60 13-456 7890', email: 'ali.hassan@posmalaysia.com.my' },
  senderInfo: { name: 'TechCo Sdn Bhd', address: '12 Jalan Tech, KL', stateCountry: 'Kuala Lumpur, Malaysia', contact: '+60123456789' },
  recipientInfo: { name: 'Ahmad bin Ibrahim', address: '45 Jalan Mawar, Shah Alam', stateCountry: 'Selangor, Malaysia', contact: '+60198765432' },
  trackingNumber: 'EC20250115-12345',
  packageDeclaration: 'Sample Electronic Device - Prohibited Lithium Battery',
  packageWeight: '1.2',
  prohibitedItemType: 'Lithium Batteries',
  otherRelatedInfo: 'The item was flagged during x-ray screening at the departure gate.',
  linkDescription: 'Detailed screening report and x-ray images: https://storage.pos.my/evidence/ABXX0020-xray',
  immediateActions: 'Parcel isolated in a secure cabinet, local authorities notified, and sender is being contacted for clarification.',
  incidentContained: 'Yes',
  incidentControlStatus: 'Contained',
  reportedToAuthority: 'Yes',
  authorityAgency: 'PDRM',
  authorityReference: 'RPT-2025-KL-0045',
  authorityDetails: 'PDRM — RPT-2025-KL-0045',
  parcelHandedOver: 'Yes',
  assistanceRequested: ['Investigation Support', 'Security Audit'],
  documents: [
    { name: 'X-Ray_Screening_B102.png', size: '1.8 MB', uploadedBy: 'Ahmad bin Ibrahim', uploadDate: '2025-01-15 10:25' },
    { name: 'Incident_Report_Internal.pdf', size: '1.1 MB', uploadedBy: 'Ahmad bin Ibrahim', uploadDate: '2025-01-15 10:28' },
  ],
  declarationAgreed: true,
  declarationDate: '2025-01-15',
});

const mockClarifications: ClarificationMessage[] = [
  {
    id: 1,
    from: 'MCMC Case Officer',
    role: 'officer',
    timestamp: '2025-01-16 09:30',
    message: 'Thank you for submitting this incident report. Could you please confirm the exact time the package was last scanned in the system and provide the shift roster for the distribution floor on that date?',
    status: 'Responded',
  },
  {
    id: 2,
    from: 'Ahmad bin Ibrahim (Reporter)',
    role: 'reporter',
    timestamp: '2025-01-16 14:15',
    message: 'The last scan was recorded at 08:45:12 AM. I have attached the shift roster for 15 January 2025 — 4 staff members were assigned to the sorting area between 08:00 and 12:00.',
  },
  {
    id: 3,
    from: 'MCMC Case Officer',
    role: 'officer',
    timestamp: '2025-01-17 10:00',
    message: 'Noted, thank you. We also need the internal CCTV footage covering the loading bay from 08:30 AM to 09:30 AM. Can you provide this as part of the evidence package?',
    status: 'Awaiting Response',
    isNew: true,
  },
];

export default function IncidentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const incident: CaseData = useMemo(() => {
    const stored = localStorage.getItem(`incident_${id}`);
    if (stored) {
      try {
        const formData = JSON.parse(stored) as IncidentFormData & { submittedAt?: string, linkDescription?: string };
        return mapFormToCaseData(id || 'ABXX0020', formData);
      } catch {
        // Fall through to default
      }
    }
    return fallbackIncident(id || 'PSIRP-2025-0025');
  }, [id]);

  const timeline: TimelineEvent[] = [
    { event: 'Incident Submitted', actor: 'Licensee Reporter', time: incident.dateReported, type: 'submission' },
    { event: 'Acknowledged by System', actor: 'System', time: incident.dateReported, type: 'system' },
    { event: 'Pending Assignment', actor: 'System', time: incident.dateReported, type: 'system' },
  ];



  return (
    <div className="space-y-6">
      {/* Back link — just the back button, no extra badges */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/licensee-reporter/incidents')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Submissions
        </Button>
      </div>

      {/* Header — matching Agency page typography exactly */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{incident.id}</h1>
          <p className="text-muted-foreground">{incident.title} — {incident.companyName}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-sm px-3 py-1 ${getStatusColor(incident.status)}`}>{incident.status}</Badge>
            <Badge variant="outline" className={`text-sm px-3 py-1 ${getSeverityColor(incident.severity)}`}>{incident.severity}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Submitted on: {incident.dateReported?.split(' ')[0] || incident.incidentDate}
          </p>
        </div>
      </div>

      {/* Tabbed Navigation — matching Agency page */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="details">Case Details</TabsTrigger>
          <TabsTrigger value="clarification" className="flex items-center gap-2">
            Clarification
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive" />
            </span>
          </TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        {/* Tab 1: Case Details */}
        <TabsContent value="details">
          <CaseDetailsView incident={incident} />
        </TabsContent>

        {/* Tab 2: Clarification */}
        <TabsContent value="clarification">
          <CaseClarificationThread messages={mockClarifications} glowClass="glow-cyan" />
        </TabsContent>

        {/* Tab 3: Timeline */}
        <TabsContent value="timeline">
          <CaseTimeline events={timeline} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
