import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { IncidentFormData, Step } from './types';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface Props {
  data: IncidentFormData;
  declaration: boolean;
  onDeclarationChange: (checked: boolean) => void;
  onDateChange: (date: string) => void;
  onEditStep: (step: Step) => void;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between py-1">
      <span className="text-muted-foreground text-sm">{t(label)}</span>
      <span className="font-medium text-sm truncate ml-4 text-right max-w-[60%]">{value ? t(value) : '—'}</span>
    </div>
  );
}

function formatAddress(address: any) {
  if (!address || typeof address === 'string') return address || '—';
  // If it's the SenderRecipientInfo object
  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.zipCode,
    address.city,
    address.state,
    address.country
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : '—';
}

export default function Part6Declaration({ data, declaration, onDeclarationChange, onDateChange, onEditStep }: Props) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">{t('Review Summary')}</h3>
        <p className="text-sm text-muted-foreground">{t('Please review all information before submitting.')}</p>

        {/* Step 1: Reporter */}
        <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Badge variant="outline">{t('Step 1')}</Badge> {t('Reporter Information')}
            </h4>
            <Button size="sm" variant="outline" onClick={() => onEditStep(1)}>{t('Edit')}</Button>
          </div>
          <SummaryRow label="Company" value={data.companyName} />
          <SummaryRow label="Reporter" value={data.reporterName} />
          <SummaryRow label="Position" value={data.position} />
          <SummaryRow label="Email" value={data.officialEmail} />
          <SummaryRow label="Contact" value={data.contactNumber} />
        </div>

        {/* Step 2: Incident Type */}
        <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Badge variant="outline">{t('Step 2')}</Badge> {t('Incident Type')}
            </h4>
            <Button size="sm" variant="outline" onClick={() => onEditStep(2)}>{t('Edit')}</Button>
          </div>
          <SummaryRow label="Type" value={data.primaryIncidentType} />
          {data.primaryIncidentType === 'Others' && (
            <SummaryRow label="Details" value={data.otherRelatedInfo} />
          )}
        </div>

        {/* Step 3: Incident Details */}
        <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Badge variant="outline">{t('Step 3')}</Badge> {t('Incident Details')}
            </h4>
            <Button size="sm" variant="outline" onClick={() => onEditStep(3)}>{t('Edit')}</Button>
          </div>
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
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Badge variant="outline">{t('Step 4')}</Badge> {t('Actions Taken')}
            </h4>
            <Button size="sm" variant="outline" onClick={() => onEditStep(4)}>{t('Edit')}</Button>
          </div>
          <SummaryRow label="Actions" value={data.immediateActions} />
          <SummaryRow label="Has incident been controlled" value={data.incidentContained} />
          <SummaryRow label="Reported to Authorities" value={data.reportedToAuthorities} />
          <SummaryRow label="Parcel Handed Over" value={data.parcelHandedOver} />
          <SummaryRow label="Authority Report Number" value={data.authorityReportNumber} />
          {data.assistanceRequired.length > 0 && (
            <SummaryRow label="Assistance" value={data.assistanceRequired.join(', ')} />
          )}
        </div>

        {/* Step 5: Documents */}
        <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Badge variant="outline">{t('Step 5')}</Badge> {t('Supporting Documents')}
            </h4>
            <Button size="sm" variant="outline" onClick={() => onEditStep(5)}>{t('Edit')}</Button>
          </div>
          <SummaryRow label="Attachments" value={t('{{count}} file(s)', { count: data.attachments.length })} />
        </div>
      </div>

      {/* Declaration */}
      <div className="p-6 border border-border rounded-lg bg-muted/30 space-y-4">
        <h3 className="font-semibold">{t('Declaration')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('I hereby declare that the information provided above is true and accurate to the best of my knowledge and understand that this report may be used for regulatory coordination and follow-up actions by the relevant authority.')}
        </p>
      </div>

      <div className="flex items-start gap-3 p-4 border border-primary/30 rounded-lg">
        <Checkbox id="declaration" checked={declaration} onCheckedChange={(c) => onDeclarationChange(c as boolean)} className="mt-1" />
        <Label htmlFor="declaration" className="cursor-pointer text-sm leading-relaxed">{t('I agree with the statement above. *')}</Label>
      </div>

      <div className="space-y-2">
        <Label>{t('Date')}</Label>
        <Input type="date" value={data.declarationDate} onChange={(e) => onDateChange(e.target.value)} />
      </div>

      <div className="text-xs text-muted-foreground p-3 border border-border rounded-lg bg-muted/30">
        <p><strong>{t('Incident ID:')}</strong> {t('Will be auto-generated upon submission')}</p>
        <p><strong>{t('Submission Timestamp:')}</strong> {t('Will be recorded automatically')}</p>
      </div>
    </div>
  );
}
