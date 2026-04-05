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
import { fallbackIncident } from '@/lib/mock-data';

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

import CaseHeader from '@/components/shared/CaseHeader';
// ... other imports ...

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
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <CaseHeader
        id={incident.id}
        title={incident.title}
        companyName={incident.companyName}
        status={incident.status}
        statusColor={getStatusColor(incident.status)}
        severity={incident.severity}
        severityColor={getSeverityColor(incident.severity)}
        submittedDate={incident.dateReported?.split(' ')[0] || incident.incidentDate}
        backLabel="Back to Submissions"
        onBack={() => navigate('/licensee-reporter/incidents')}
        escalatedTo={incident.escalations?.map(e => e.agency)}
      />

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 h-12 border border-border/40">
          <TabsTrigger value="details" className="px-6 h-full font-medium transition-all">Case Details</TabsTrigger>
          <TabsTrigger value="clarification" className="px-6 h-full font-medium transition-all flex items-center gap-2">
            Clarification
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
            </span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="px-6 h-full font-medium transition-all">Timeline</TabsTrigger>
        </TabsList>

        {/* Tab 1: Case Details */}
        <TabsContent value="details">
          <CaseDetailsView incident={incident} />
        </TabsContent>

        {/* Tab 2: Clarification */}
        <TabsContent value="clarification">
          <CaseClarificationThread messages={[]} currentRole="reporter" glowClass="glow-cyan" />
        </TabsContent>

        {/* Tab 3: Timeline */}
        <TabsContent value="timeline">
          <CaseTimeline events={timeline} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
