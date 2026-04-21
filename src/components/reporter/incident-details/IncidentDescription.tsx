import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

interface Props {
  incident: {
    description: string;
    incidentDate: string;
    incidentTime: string;
    incidentLocation?: string;
    systemServiceAffected?: string;
    vehicleDetails?: string;
    buildingDetails?: string;
    observedImpact?: string;
    estimatedImpact?: string;
    staffDetected?: { name: string; designation: string; contactNumber: string; email: string };
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

export default function IncidentDescription({ incident }: Props) {
  const impact = incident.observedImpact || incident.estimatedImpact;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          Part 3: Incident Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Description */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Incident Description</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{incident.description}</p>
        </div>

        {/* Date & Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Date of Incident" value={incident.incidentDate} />
          <Field label="Time of Incident" value={incident.incidentTime} />
        </div>

        {/* Location */}
        {incident.incidentLocation && (
          <Field label="Incident Location Address" value={incident.incidentLocation} />
        )}

        {/* Staff Detected */}
        <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground">Officer/Staff Who Detected the Incident</p>
          <div className="grid md:grid-cols-2 gap-3">
            <Field label="Name" value={incident.staffDetected?.name || '—'} />
            <Field label="Position" value={incident.staffDetected?.designation || '—'} />
            <Field label="Phone No." value={incident.staffDetected?.contactNumber || '—'} />
            <Field label="Email" value={incident.staffDetected?.email || '—'} />
          </div>
        </div>

        {/* Affected Context & Estimated Impact */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Field label="Affected Systems/Services" value={incident.systemServiceAffected || '—'} />
          <Field label="Vehicle Details" value={incident.vehicleDetails || '—'} />
          <Field label="Building Details" value={incident.buildingDetails || '—'} />
          <div>
            <p className="text-xs text-muted-foreground mb-1">Estimated Impact</p>
            {impact ? (
              <Badge variant="outline" className={`text-xs ${
                impact === 'High' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                impact === 'Low' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                ''
              }`}>{impact}</Badge>
            ) : (
              <span className="text-sm font-medium">—</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
