import { differenceInDays, parseISO, isValid } from 'date-fns';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import BasicCaseInfo from '@/components/reporter/incident-details/BasicCaseInfo';
import IncidentClassification from '@/components/reporter/incident-details/IncidentClassification';
import IncidentDescription from '@/components/reporter/incident-details/IncidentDescription';
import LogisticsData from '@/components/reporter/incident-details/LogisticsData';
import ActionsTaken from '@/components/reporter/incident-details/ActionsTaken';
import EvidenceDeclaration from '@/components/reporter/incident-details/EvidenceDeclaration';


export interface CaseData {
  id: string;
  title: string;
  dateReported: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation?: string;
  branchName: string;
  address: string;
  state: string;
  postalCode: string;
  companyName: string;
  registeredAddress?: string;
  reporterName: string;
  reporterDesignation: string;
  reporterEmail?: string;
  alternativeEmail?: string;
  reporterPhone?: string;
  additionalPhone?: string;
  faxNumber?: string;
  status: string;
  severity: string;
  leaEscalation: string;
  description: string;
  systemServiceAffected?: string;
  observedImpact?: string;
  estimatedImpact?: string;
  primaryIncidentType?: string;
  postalIncidentTypes?: string[];
  staffDetected?: { name: string; designation: string; contactNumber: string; email: string };
  senderInfo?: { name: string; address: string; stateCountry: string; contact: string };
  recipientInfo?: { name: string; address: string; stateCountry: string; contact: string };
  trackingNumber?: string;
  packageDeclaration?: string;
  packageWeight?: string;
  prohibitedItemType?: string;
  otherRelatedInfo?: string;
  linkDescription?: string;
  // Legacy parcel items support
  items?: {
    tracking: string;
    type: string;
    declaration: string;
    weight: string;
    detectedItemType: string;
    sender: { name: string; address: string; stateCountry: string; contact: string };
    receiver: { name: string; address: string; stateCountry: string; contact: string };
  }[];
  immediateActions: string;
  incidentContained?: string;
  incidentControlStatus: string;
  reportedToAuthority: string;
  authorityAgency?: string;
  authorityReference?: string;
  authorityDetails?: string;
  parcelHandedOver: string;
  assistanceRequested: string[];
  documents: { name: string; size: string; uploadedBy: string; uploadDate: string }[];
  // Legacy
  impactIndicators?: string[];
  // Declaration (Step 6)
  declarationAgreed?: boolean;
  declarationDate?: string;
}

const statusColors: Record<string, string> = {
  'In Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
  'Under Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
  'Submitted': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30',
  'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30',
  'RFI Sent': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
  'Escalation Pending': 'bg-destructive/20 text-destructive border-destructive/30',
  'Escalated': 'bg-destructive/20 text-destructive border-destructive/30',
};

const severityColors: Record<string, string> = {
  'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
};

export function getStatusColor(status: string) {
  return statusColors[status] || 'bg-secondary';
}

export function getSeverityColor(severity: string) {
  return severityColors[severity] || 'bg-secondary';
}

interface Props {
  incident: CaseData;
  children?: React.ReactNode;
}

export default function CaseDetailsView({ incident, children }: Props) {
  // Timeline Validation Logic
  const calculateTimeline = () => {
    if (!incident.incidentDate) return null;
    
    try {
      const incDate = parseISO(incident.incidentDate);
      // Use dateReported if available, otherwise current date
      const repDateString = incident.dateReported?.split(' ')[0];
      const repDate = repDateString ? parseISO(repDateString) : new Date();
      
      if (!isValid(incDate) || !isValid(repDate)) return null;
      
      const diffDays = differenceInDays(repDate, incDate);
      const isOverdue = diffDays > 8;
      
      return { diffDays, isOverdue };
    } catch (e) {
      return null;
    }
  };

  const timeline = calculateTimeline();

  return (
    <div className="space-y-6">
      {/* Section 1: Reporter Information (Step 1) */}
      <BasicCaseInfo incident={incident} getStatusColor={getStatusColor} getSeverityColor={getSeverityColor} />

      {/* Section 2: Incident Classification (Step 2) */}
      <IncidentClassification incident={incident} />

      {/* Section 3: Incident Details (Step 3) — excludes parcel/sender/recipient */}
      <IncidentDescription incident={incident} />

      {/* Section 4: Logistics Data — Parcel, Sender, Recipient (Step 3 parcel fields) */}
      <LogisticsData incident={incident} />

      {/* Section 5: Action & Authority Tracking (Step 4) */}
      <ActionsTaken incident={incident} />

      {/* Section 6: Evidence & Declaration (Steps 5 & 6) */}
      <div className="space-y-4">
        <EvidenceDeclaration incident={incident} />
        
        {/* Timeline Validation Notification */}
        {timeline && (
          <div className={cn(
            "flex items-center gap-3 p-4 rounded-lg border shadow-sm transition-all animate-in fade-in slide-in-from-top-1",
            timeline.isOverdue 
              ? "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400" 
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
          )}>
            {timeline.isOverdue ? (
              <>
                <AlertCircle className="h-5 w-5 shrink-0" />
                <div className="text-sm font-bold">
                  This report is {Math.abs(timeline.diffDays)} days overdue based on the incident date.
                </div>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <div className="text-sm font-bold">
                  Submitted within the 8-day reporting window.
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
