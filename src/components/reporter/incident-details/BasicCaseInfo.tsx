import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, User } from 'lucide-react';

interface Props {
  incident: {
    id: string;
    dateReported: string;
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
  };
  getStatusColor: (s: string) => string;
  getSeverityColor: (s: string) => string;
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value || '—'}</p>
    </div>
  );
}

export default function BasicCaseInfo({ incident, getStatusColor, getSeverityColor }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Part 1: Reporter Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <InfoField label="Incident ID" value={incident.id} />
          <InfoField label="Date Reported" value={incident.dateReported} />
          <InfoField label="Company Name" value={incident.companyName} />
          <InfoField label="Registered Company Address" value={incident.registeredAddress || '—'} />
          <InfoField label="Reporter Name" value={incident.reporterName} />
          <InfoField label="Position" value={incident.reporterDesignation} />
          <InfoField label="Email Address" value={incident.reporterEmail || '—'} />
          <InfoField label="Alternative Email" value={incident.alternativeEmail || '—'} />
          <InfoField label="Phone Number" value={incident.reporterPhone || '—'} />
          <InfoField label="Additional Phone No." value={incident.additionalPhone || '—'} />
          <InfoField label="Fax Number" value={incident.faxNumber || '—'} />
          <div>
            <p className="text-xs text-muted-foreground">Current Case Status</p>
            <Badge variant="outline" className={`mt-0.5 text-xs ${getStatusColor(incident.status)}`}>{incident.status}</Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Severity Level</p>
            <Badge variant="outline" className={`mt-0.5 text-xs ${getSeverityColor(incident.severity)}`}>{incident.severity}</Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">LEA Escalation Status</p>
            <Badge variant="outline" className={`mt-0.5 text-xs ${incident.leaEscalation === 'Yes' ? 'bg-destructive/20 text-destructive border-destructive/30' : 'bg-secondary text-muted-foreground'}`}>
              {incident.leaEscalation}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
