import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IncidentFormData } from './types';
import { useTranslation } from 'react-i18next';

const assistanceOptions = [
  'Investigation Support',
  'Parcel Inspection',
  'Legal Advice',
  'Service Recovery Guidance',
];

interface Props {
  data: IncidentFormData;
  onChange: (field: keyof IncidentFormData, value: any) => void;
}

export default function Part4ActionsTaken({ data, onChange }: Props) {
  const { t } = useTranslation();

  const toggleAssistance = (value: string) => {
    const current = data.assistanceRequired;
    if (current.includes(value)) {
      onChange('assistanceRequired', current.filter((v) => v !== value));
    } else {
      onChange('assistanceRequired', [...current, value]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Actions Taken So Far */}
      <div className="space-y-2">
        <Label>{t('Actions Taken So Far *')}</Label>
        <Textarea value={data.immediateActions} onChange={(e) => onChange('immediateActions', e.target.value)} placeholder={t('Describe the actions taken in response to the incident...')} rows={4} />
      </div>

      {/* Has the Incident Been Controlled? */}
      <div className="space-y-3">
        <Label>{t('Has the Incident Been Controlled? *')}</Label>
        <RadioGroup value={data.incidentContained} onValueChange={(v) => onChange('incidentContained', v)} className="flex gap-6">
          {['Yes', 'No'].map((opt) => (
            <div key={opt} className="flex items-center gap-2">
              <RadioGroupItem value={opt} id={`contained-${opt}`} />
              <Label htmlFor={`contained-${opt}`} className="cursor-pointer">{t(opt)}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Assistance Required from Authorities */}
      <div className="space-y-3">
        <Label>{t('Assistance Required from Authorities')}</Label>
        <div className="grid md:grid-cols-2 gap-3">
          {assistanceOptions.map((opt) => (
            <div key={opt} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <Checkbox
                id={`assist-${opt}`}
                checked={data.assistanceRequired.includes(opt)}
                onCheckedChange={() => toggleAssistance(opt)}
              />
              <Label htmlFor={`assist-${opt}`} className="cursor-pointer text-sm">{t(opt)}</Label>
            </div>
          ))}
          <div className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
            <Checkbox
              id="assist-other"
              checked={data.assistanceRequired.includes('Other')}
              onCheckedChange={() => toggleAssistance('Other')}
            />
            <Label htmlFor="assist-other" className="cursor-pointer text-sm">{t('Other')}</Label>
          </div>
        </div>
        {data.assistanceRequired.includes('Other') && (
          <div className="space-y-2 mt-2">
            <Label>{t('Please specify')}</Label>
            <Input value={data.assistanceOther} onChange={(e) => onChange('assistanceOther', e.target.value)} placeholder={t('Describe the assistance needed...')} />
          </div>
        )}
      </div>

      {/* Report to Authorities */}
      <div className="space-y-3">
        <Label>{t('Report to Authorities *')}</Label>
        <RadioGroup value={data.reportedToAuthorities} onValueChange={(v) => onChange('reportedToAuthorities', v)} className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="Yes" id="reported-yes" />
            <Label htmlFor="reported-yes" className="cursor-pointer">{t('Yes')}</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="No" id="reported-no" />
            <Label htmlFor="reported-no" className="cursor-pointer">{t('No')}</Label>
          </div>
        </RadioGroup>
        {data.reportedToAuthorities === 'Yes' && (
          <div className="space-y-2 p-3 border border-border rounded-lg bg-muted/30">
            <Label>{t('Authority Details (Agency Name & Reference Number)')}</Label>
            <Input value={data.authorityDetails} onChange={(e) => onChange('authorityDetails', e.target.value)} placeholder={t('e.g. PDRM — RPT-2025-001')} />
          </div>
        )}
      </div>

      {/* Handover of Package */}
      <div className="space-y-3">
        <Label>{t('Handover of Package to Authorities *')}</Label>
        <RadioGroup value={data.parcelHandedOver} onValueChange={(v) => onChange('parcelHandedOver', v)} className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="Yes" id="handover-yes" />
            <Label htmlFor="handover-yes" className="cursor-pointer">{t('Yes')}</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="No" id="handover-no" />
            <Label htmlFor="handover-no" className="cursor-pointer">{t('No')}</Label>
          </div>
        </RadioGroup>

        <div className="space-y-2">
          <Label>{t('Authority Report Number')}</Label>
          <Input
            value={data.authorityReportNumber}
            onChange={(e) => onChange('authorityReportNumber', e.target.value)}
            placeholder={t('e.g. PDRM/CCID/2025/00412')}
          />
        </div>
      </div>
    </div>
  );
}
