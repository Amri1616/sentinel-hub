import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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
  editable?: boolean;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value || '—'}</p>
    </div>
  );
}

export default function ActionsTaken({ incident, editable }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    immediateActions: incident.immediateActions,
    incidentControlStatus: incident.incidentControlStatus || '',
    reportedToAuthority: incident.reportedToAuthority,
    authorityAgency: incident.authorityAgency || '',
    authorityReference: incident.authorityReference || '',
    authorityDetails: incident.authorityDetails || '',
    parcelHandedOver: incident.parcelHandedOver || '',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    toast.success("Actions and authority tracking updated successfully.");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues({
      immediateActions: incident.immediateActions,
      incidentControlStatus: incident.incidentControlStatus || '',
      reportedToAuthority: incident.reportedToAuthority,
      authorityAgency: incident.authorityAgency || '',
      authorityReference: incident.authorityReference || '',
      authorityDetails: incident.authorityDetails || '',
      parcelHandedOver: incident.parcelHandedOver || '',
    });
    setIsEditing(false);
  };

  const controlStatus = editValues.incidentControlStatus || '—';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          Part 5: Action &amp; Authority Tracking
        </CardTitle>
        {editable && (
          !isEditing ? (
            <Button size="sm" variant="outline" onClick={handleEdit}>
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )
        )}
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
