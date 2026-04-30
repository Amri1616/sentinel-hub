import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Info, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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
    isCyberIncident?: boolean;
    primaryIncidentType?: string;
    cyberIncidentDetails?: {
      chronologyEntries?: Array<{ date: string; time: string; event: string }>;
      downtimeDuration?: string;
      rootCause?: string;
      failingComponent?: string;
      otherInfo?: string;
    };
    staffDetected?: { name: string; designation: string; contactNumber: string; email: string };
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

export default function IncidentDescription({ incident, editable }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    description: incident.description,
    incidentDate: incident.incidentDate,
    incidentTime: incident.incidentTime,
    incidentLocation: incident.incidentLocation || '',
    systemServiceAffected: incident.systemServiceAffected || '',
    vehicleDetails: incident.vehicleDetails || '',
    buildingDetails: incident.buildingDetails || '',
    observedImpact: incident.observedImpact || '',
    estimatedImpact: incident.estimatedImpact || '',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    toast.success("Incident details updated successfully.");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues({
      description: incident.description,
      incidentDate: incident.incidentDate,
      incidentTime: incident.incidentTime,
      incidentLocation: incident.incidentLocation || '',
      systemServiceAffected: incident.systemServiceAffected || '',
      vehicleDetails: incident.vehicleDetails || '',
      buildingDetails: incident.buildingDetails || '',
      observedImpact: incident.observedImpact || '',
      estimatedImpact: incident.estimatedImpact || '',
    });
    setIsEditing(false);
  };

  const impact = editValues.observedImpact || editValues.estimatedImpact;
  const chronology = incident.cyberIncidentDetails?.chronologyEntries || [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          Part 3: Incident Details
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
      <CardContent className="space-y-5">
        {/* Description */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">Incident Description</Label>
          {isEditing ? (
            <Textarea 
              value={editValues.description}
              onChange={(e) => setEditValues({...editValues, description: e.target.value})}
              className="min-h-[100px]"
              placeholder="Describe the incident"
            />
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">{editValues.description}</p>
          )}
        </div>

        {/* Date & Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Date of Incident</Label>
            {isEditing ? (
              <Input type="date" value={editValues.incidentDate} onChange={(e) => setEditValues({...editValues, incidentDate: e.target.value})} />
            ) : (
              <p className="text-sm font-medium">{editValues.incidentDate}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Time of Incident</Label>
            {isEditing ? (
              <Input type="time" value={editValues.incidentTime} onChange={(e) => setEditValues({...editValues, incidentTime: e.target.value})} />
            ) : (
              <p className="text-sm font-medium">{editValues.incidentTime}</p>
            )}
          </div>
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

        {incident.isCyberIncident && (
          <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
            <p className="text-xs font-semibold text-muted-foreground">Additional Information for Cyber Security Incident</p>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Incident Chronology Table</p>
              <div className="overflow-x-auto border border-border rounded-md bg-background">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="px-2 py-2 text-left font-semibold min-w-[130px]">Date</th>
                      <th className="px-2 py-2 text-left font-semibold min-w-[120px]">Time</th>
                      <th className="px-2 py-2 text-left font-semibold min-w-[260px]">Event</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chronology.length > 0 ? (
                      chronology.map((row, index) => (
                        <tr key={index} className="border-t border-border/50">
                          <td className="p-2 text-sm">{row.date || '—'}</td>
                          <td className="p-2 text-sm">{row.time || '—'}</td>
                          <td className="p-2 text-sm">{row.event || '—'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-t border-border/50">
                        <td className="p-2 text-sm" colSpan={3}>—</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Downtime Duration" value={incident.cyberIncidentDetails?.downtimeDuration || '—'} />
              <Field label="Failing Component" value={incident.cyberIncidentDetails?.failingComponent || '—'} />
            </div>

            <Field label="Internal and External Root Cause Factors" value={incident.cyberIncidentDetails?.rootCause || '—'} />
            <Field label="Other Related Information" value={incident.cyberIncidentDetails?.otherInfo || '—'} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
