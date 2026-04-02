import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface Props {
  incident: {
    immediateActions: string;
    incidentContained?: string;
    incidentControlStatus?: string;
    reportedToAuthority: string;
    authorityAgency?: string;
    authorityReference?: string;
    authorityDetails?: string;
    parcelHandedOver: string;
    assistanceRequested: string[];
  };
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value || '—'}</p>
    </div>
  );
}

export default function ActionsTaken({ incident }: Props) {
  const controlStatus = incident.incidentContained || incident.incidentControlStatus || '—';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          Part 5: Action &amp; Authority Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Actions Taken So Far</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{incident.immediateActions}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Incident Control Status" value={controlStatus} />
          <div>
            <p className="text-xs text-muted-foreground">Reported to Authorities</p>
            <p className="text-sm font-medium">
              {incident.reportedToAuthority}
              {incident.reportedToAuthority === 'Yes' && incident.authorityDetails && (
                <span className="text-muted-foreground"> — {incident.authorityDetails}</span>
              )}
            </p>
          </div>
          {incident.authorityAgency && <Field label="Authority/Agency" value={incident.authorityAgency} />}
          <Field label="Authority Reference No." value={incident.authorityReference || '—'} />
          <Field label="Handover of Package to Authorities" value={incident.parcelHandedOver || '—'} />
          <div className="md:col-span-2">
            <p className="text-xs text-muted-foreground mb-1">Assistance Required from Authorities</p>
            <div className="flex flex-wrap gap-1.5">
              {incident.assistanceRequested && incident.assistanceRequested.length > 0 ? incident.assistanceRequested.map((a) => (
                <Badge key={a} variant="outline" className="text-xs">{a}</Badge>
              )) : <span className="text-sm font-medium">—</span>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
