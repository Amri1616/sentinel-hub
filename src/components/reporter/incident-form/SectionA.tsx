import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { IncidentFormData } from './types';
import { useTranslation } from 'react-i18next';

interface Props {
  data: IncidentFormData;
  onChange: (field: keyof IncidentFormData, value: string) => void;
}

export default function SectionA({ data, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t('Company Name')}</Label>
        <Input value={data.companyName} disabled className="bg-muted" />
      </div>
      <div className="space-y-2">
        <Label>{t('Registered Company Address')}</Label>
        <Textarea value={data.registeredAddress} disabled className="bg-muted" rows={2} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('Reporter Name')}</Label>
          <Input value={data.reporterName} disabled className="bg-muted" />
        </div>
        <div className="space-y-2">
          <Label>{t('Position')}</Label>
          <Input value={data.position} disabled className="bg-muted" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('Email Address')}</Label>
          <Input value={data.officialEmail} disabled className="bg-muted" />
        </div>
        <div className="space-y-2">
          <Label>{t('Phone Number')}</Label>
          <Input value={data.contactNumber} disabled className="bg-muted" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>{t('Fax Number')}</Label>
        <Input value={data.faxNumber} onChange={(e) => onChange('faxNumber', e.target.value)} placeholder="e.g. +60 3-1234 5678" />
      </div>

      {/* Optional additional contact fields */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('Additional Phone Number')} <span className="text-xs text-muted-foreground">{t('(Optional)')}</span></Label>
          <Input value={data.additionalPhone} onChange={(e) => onChange('additionalPhone', e.target.value)} placeholder="e.g. +60 13-987 6543" />
        </div>
        <div className="space-y-2">
          <Label>{t('Alternative Email')} <span className="text-xs text-muted-foreground">{t('(Optional)')}</span></Label>
          <Input type="email" value={data.alternativeEmail} onChange={(e) => onChange('alternativeEmail', e.target.value)} placeholder="e.g. alternate@company.com" />
        </div>
      </div>
    </div>
  );
}
