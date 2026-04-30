import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, User, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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
  editable?: boolean;
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value || '—'}</p>
    </div>
  );
}

export default function BasicCaseInfo({ incident, getStatusColor, getSeverityColor, editable }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    companyName: incident.companyName,
    registeredAddress: incident.registeredAddress || '',
    reporterName: incident.reporterName,
    reporterDesignation: incident.reporterDesignation,
    reporterEmail: incident.reporterEmail || '',
    alternativeEmail: incident.alternativeEmail || '',
    reporterPhone: incident.reporterPhone || '',
    additionalPhone: incident.additionalPhone || '',
    faxNumber: incident.faxNumber || '',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    toast.success("Reporter information updated successfully.");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues({
      companyName: incident.companyName,
      registeredAddress: incident.registeredAddress || '',
      reporterName: incident.reporterName,
      reporterDesignation: incident.reporterDesignation,
      reporterEmail: incident.reporterEmail || '',
      alternativeEmail: incident.alternativeEmail || '',
      reporterPhone: incident.reporterPhone || '',
      additionalPhone: incident.additionalPhone || '',
      faxNumber: incident.faxNumber || '',
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Part 1: Reporter Information
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
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-semibold">Incident ID</Label>
            <p className="text-sm font-medium mt-1">{incident.id}</p>
          </div>
          <InfoField label="Date Reported" value={incident.dateReported} />
          
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Company Name</Label>
            {isEditing ? (
              <Input value={editValues.companyName} onChange={(e) => setEditValues({...editValues, companyName: e.target.value})} />
            ) : (
              <p className="text-sm font-medium">{editValues.companyName}</p>
            )}
          </div>
          
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Registered Company Address</Label>
            {isEditing ? (
              <Input value={editValues.registeredAddress} onChange={(e) => setEditValues({...editValues, registeredAddress: e.target.value})} />
            ) : (
              <p className="text-sm font-medium">{editValues.registeredAddress || '—'}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Reporter Name</Label>
            {isEditing ? (
              <Input value={editValues.reporterName} onChange={(e) => setEditValues({...editValues, reporterName: e.target.value})} />
            ) : (
              <p className="text-sm font-medium">{editValues.reporterName}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Position</Label>
            {isEditing ? (
              <Input value={editValues.reporterDesignation} onChange={(e) => setEditValues({...editValues, reporterDesignation: e.target.value})} />
            ) : (
              <p className="text-sm font-medium">{editValues.reporterDesignation}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Email Address</Label>
            {isEditing ? (
              <Input value={editValues.reporterEmail} onChange={(e) => setEditValues({...editValues, reporterEmail: e.target.value})} />
            ) : (
              <p className="text-sm font-medium">{editValues.reporterEmail || '—'}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Alternative Email</Label>
            {isEditing ? (
              <Input value={editValues.alternativeEmail} onChange={(e) => setEditValues({...editValues, alternativeEmail: e.target.value})} />
            ) : (
              <p className="text-sm font-medium">{editValues.alternativeEmail || '—'}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Phone Number</Label>
            {isEditing ? (
              <Input value={editValues.reporterPhone} onChange={(e) => setEditValues({...editValues, reporterPhone: e.target.value})} />
            ) : (
              <p className="text-sm font-medium">{editValues.reporterPhone || '—'}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Additional Phone No.</Label>
            {isEditing ? (
              <Input value={editValues.additionalPhone} onChange={(e) => setEditValues({...editValues, additionalPhone: e.target.value})} />
            ) : (
              <p className="text-sm font-medium">{editValues.additionalPhone || '—'}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Fax Number</Label>
            {isEditing ? (
              <Input value={editValues.faxNumber} onChange={(e) => setEditValues({...editValues, faxNumber: e.target.value})} />
            ) : (
              <p className="text-sm font-medium">{editValues.faxNumber || '—'}</p>
            )}
          </div>

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
