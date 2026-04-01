import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { IncidentFormData } from './types';

interface Props {
  data: IncidentFormData;
  declaration: boolean;
  onDeclarationChange: (checked: boolean) => void;
  onDateChange: (date: string) => void;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="font-medium text-sm truncate ml-4 text-right max-w-[60%]">{value || '—'}</span>
    </div>
  );
}

function formatAddress(address: any) {
  if (!address || typeof address === 'string') return address || '—';
  // If it's the SenderRecipientInfo object
  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.zipCode,
    address.state,
    address.country
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : '—';
}

export default function Part6Declaration({ data, declaration, onDeclarationChange, onDateChange }: Props) {
  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Review Summary</h3>
        <p className="text-sm text-muted-foreground">Please review all information before submitting.</p>

        {/* Step 1: Reporter */}
        <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-1">
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Badge variant="outline">Step 1</Badge> Reporter Information
          </h4>
          <SummaryRow label="Company" value={data.companyName} />
          <SummaryRow label="Reporter" value={data.reporterName} />
          <SummaryRow label="Position" value={data.position} />
          <SummaryRow label="Email" value={data.officialEmail} />
          <SummaryRow label="Contact" value={data.contactNumber} />
        </div>

        {/* Step 2: Incident Type */}
        <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-1">
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Badge variant="outline">Step 2</Badge> Incident Type
          </h4>
          <SummaryRow label="Type" value={data.primaryIncidentType} />
          {data.primaryIncidentType === 'Others' && (
            <SummaryRow label="Details" value={data.otherRelatedInfo} />
          )}
        </div>

        {/* Step 3: Incident Details */}
        <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-1">
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Badge variant="outline">Step 3</Badge> Incident Details
          </h4>
          <SummaryRow label="Description" value={data.description} />
          <SummaryRow label="Date" value={data.incidentDate} />
          <SummaryRow label="Time" value={data.incidentTime} />
          <SummaryRow label="Location" value={formatAddress(data.incidentLocation)} />
          <SummaryRow label="Staff Detected" value={data.staffDetected.name} />
          <SummaryRow label="Tracking No." value={data.trackingNumber} />
          <SummaryRow label="Sender" value={data.senderInfo.name} />
          <SummaryRow label="Recipient" value={data.recipientInfo.name} />
        </div>

        {/* Step 4: Actions Taken */}
        <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-1">
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Badge variant="outline">Step 4</Badge> Actions Taken
          </h4>
          <SummaryRow label="Actions" value={data.immediateActions} />
          <SummaryRow label="Contained" value={data.incidentContained} />
          <SummaryRow label="Reported to Authorities" value={data.reportedToAuthorities} />
          <SummaryRow label="Parcel Handed Over" value={data.parcelHandedOver} />
          {data.assistanceRequired.length > 0 && (
            <SummaryRow label="Assistance" value={data.assistanceRequired.join(', ')} />
          )}
        </div>

        {/* Step 5: Documents */}
        <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-1">
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Badge variant="outline">Step 5</Badge> Supporting Documents
          </h4>
          <SummaryRow label="Attachments" value={`${data.attachments.length} file(s)`} />
        </div>
      </div>

      {/* Declaration */}
      <div className="p-6 border border-border rounded-lg bg-muted/30 space-y-4">
        <h3 className="font-semibold">Declaration</h3>
        <p className="text-sm text-muted-foreground">
          I hereby declare that the information provided above is true and accurate to the best of my knowledge and understand that this report may be used for regulatory coordination and follow-up actions by the relevant authority.
        </p>
      </div>

      <div className="flex items-start gap-3 p-4 border border-primary/30 rounded-lg">
        <Checkbox id="declaration" checked={declaration} onCheckedChange={(c) => onDeclarationChange(c as boolean)} className="mt-1" />
        <Label htmlFor="declaration" className="cursor-pointer text-sm leading-relaxed">I agree with the statement above. *</Label>
      </div>

      <div className="space-y-2">
        <Label>Date</Label>
        <Input type="date" value={data.declarationDate} onChange={(e) => onDateChange(e.target.value)} />
      </div>

      <div className="text-xs text-muted-foreground p-3 border border-border rounded-lg bg-muted/30">
        <p><strong>Incident ID:</strong> Will be auto-generated upon submission</p>
        <p><strong>Submission Timestamp:</strong> Will be recorded automatically</p>
      </div>
    </div>
  );
}
