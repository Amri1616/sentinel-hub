import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { IncidentFormData, StaffDetected, SenderRecipientInfo, emptySenderRecipient, cyberSecurityIncidentOptions } from './types';
import { SelectCountry } from './SelectCountry';
import SearchableSelect from './SearchableSelect';
import { MALAYSIAN_STATES, getCitiesForState, lookupMalaysiaByZip } from './postalLookup';
import { useTranslation } from 'react-i18next';

interface Props {
  data: IncidentFormData;
  onChange: (field: keyof IncidentFormData, value: any) => void;
}

export default function Part3IncidentInfo({ data, onChange }: Props) {
  const { t } = useTranslation();
  const isCyberIncidentSelected = cyberSecurityIncidentOptions.includes(data.primaryIncidentType);

  const updateStaff = (field: keyof StaffDetected, value: string) => {
    onChange('staffDetected', { ...data.staffDetected, [field]: value });
  };

  const updateCyberField = (field: keyof IncidentFormData['cyberIncidentReport'], value: any) => {
    onChange('cyberIncidentReport', { ...data.cyberIncidentReport, [field]: value });
  };

  const updateCyberChronologyRow = (index: number, field: 'date' | 'time' | 'event', value: string) => {
    const rows = [...data.cyberIncidentReport.incidentChronologyEntries];
    rows[index] = { ...rows[index], [field]: value };
    onChange('cyberIncidentReport', {
      ...data.cyberIncidentReport,
      incidentChronologyEntries: rows,
    });
  };

  const updateSender = (field: keyof SenderRecipientInfo, value: string) => {
    onChange('senderInfo', { ...data.senderInfo, [field]: value });
  };

  const updateRecipient = (field: keyof SenderRecipientInfo, value: string) => {
    onChange('recipientInfo', { ...data.recipientInfo, [field]: value });
  };

  const updateLocation = (field: keyof SenderRecipientInfo, value: string) => {
    onChange('incidentLocation', { ...data.incidentLocation, [field]: value });
  };

  const updateLocationZip = (zipCode: string) => {
    const next = { ...data.incidentLocation, zipCode };
    const autofill = lookupMalaysiaByZip(zipCode);
    if (autofill && next.country === 'Malaysia') {
      next.city = autofill.city;
      next.state = autofill.state;
    }
    onChange('incidentLocation', next);
  };

  const updateSenderZip = (zipCode: string) => {
    const next = { ...data.senderInfo, zipCode };
    const autofill = lookupMalaysiaByZip(zipCode);
    if (autofill && next.country === 'Malaysia') {
      next.city = autofill.city;
      next.state = autofill.state;
    }
    onChange('senderInfo', next);
  };

  const updateRecipientZip = (zipCode: string) => {
    const next = { ...data.recipientInfo, zipCode };
    const autofill = lookupMalaysiaByZip(zipCode);
    if (autofill && next.country === 'Malaysia') {
      next.city = autofill.city;
      next.state = autofill.state;
    }
    onChange('recipientInfo', next);
  };

  const toggleParcelOptional = (checked: boolean) => {
    onChange('skipParcelDetails', checked);
    if (checked) {
      onChange('trackingNumber', '');
      onChange('packageDeclaration', '');
      onChange('packageWeight', '');
      onChange('prohibitedItemType', '');
    }
  };

  const toggleSenderOptional = (checked: boolean) => {
    onChange('skipSenderInfo', checked);
    if (checked) onChange('senderInfo', { ...emptySenderRecipient });
  };

  const toggleRecipientOptional = (checked: boolean) => {
    onChange('skipRecipientInfo', checked);
    if (checked) onChange('recipientInfo', { ...emptySenderRecipient });
  };

  return (
    <div className="space-y-6">
      {/* Incident Description */}
      <div className="space-y-2">
        <Label>{t('Incident Description *')}</Label>
        <Textarea value={data.description} onChange={(e) => onChange('description', e.target.value)} placeholder={t('Provide a detailed description of the incident...')} rows={5} />
      </div>

      {/* Date & Time */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('Date of Incident *')}</Label>
          <Input type="date" value={data.incidentDate} onChange={(e) => onChange('incidentDate', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>{t('Time of Incident *')}</Label>
          <Input type="time" value={data.incidentTime} onChange={(e) => onChange('incidentTime', e.target.value)} />
        </div>
      </div>

      {isCyberIncidentSelected && (
        <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
          <h4 className="text-sm font-semibold">{t('Additional Information for Cyber Security Incident')}</h4>

          <div className="space-y-2">
            <Label>{t('Incident Chronology Table')}</Label>
            <div className="overflow-x-auto border border-border rounded-md bg-background">
              <table className="w-full text-sm">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="px-2 py-2 text-left font-semibold min-w-[130px]">{t('Date')}</th>
                    <th className="px-2 py-2 text-left font-semibold min-w-[120px]">{t('Time')}</th>
                    <th className="px-2 py-2 text-left font-semibold min-w-[260px]">{t('Event')}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.cyberIncidentReport.incidentChronologyEntries.map((row, index) => (
                    <tr key={index} className="border-t border-border/50">
                      <td className="p-1.5">
                        <Input type="date" value={row.date} onChange={(e) => updateCyberChronologyRow(index, 'date', e.target.value)} />
                      </td>
                      <td className="p-1.5">
                        <Input type="time" value={row.time} onChange={(e) => updateCyberChronologyRow(index, 'time', e.target.value)} />
                      </td>
                      <td className="p-1.5">
                        <Input value={row.event} onChange={(e) => updateCyberChronologyRow(index, 'event', e.target.value)} placeholder={t('Describe event')} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('Downtime Duration')}</Label>
            <Input
              value={data.cyberIncidentReport.downtimeDuration}
              onChange={(e) => updateCyberField('downtimeDuration', e.target.value)}
              placeholder={t('e.g. 2 hours 30 minutes')}
            />
          </div>

          <div className="space-y-2">
            <Label>{t('Internal and External Root Cause Factors')}</Label>
            <Textarea
              value={data.cyberIncidentReport.rootCause}
              onChange={(e) => updateCyberField('rootCause', e.target.value)}
              rows={3}
              placeholder={t('Describe internal and external root cause factors')}
            />
          </div>

          <div className="space-y-2">
            <Label>{t('Failing Components')}</Label>
            <Input
              value={data.cyberIncidentReport.failingComponent}
              onChange={(e) => updateCyberField('failingComponent', e.target.value)}
              placeholder={t('List failing components')}
            />
          </div>
        </div>
      )}

      {/* Location Address */}
      <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          {t('Location Address (Location where the incident occurred) *')}
        </h4>
        
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>{t('Address Line 1 (Required) *')}</Label>
            <Input 
              value={data.incidentLocation.addressLine1} 
              onChange={(e) => updateLocation('addressLine1', e.target.value)} 
              placeholder={t("House number, street name, and suffix (e.g., '123 Main St')")}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('Address Line 2 (Optional)')}</Label>
            <Input 
              value={data.incidentLocation.addressLine2} 
              onChange={(e) => updateLocation('addressLine2', e.target.value)} 
              placeholder={t('Apartment, suite, unit, floor, or PO Box')}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('ZIP / Postal Code')}</Label>
              <Input
                value={data.incidentLocation.zipCode}
                onChange={(e) => updateLocationZip(e.target.value)}
                placeholder={t('Numerical or alphanumeric code')}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('City / Municipality')}</Label>
              <SearchableSelect
                value={data.incidentLocation.city} 
                onChange={(e) => updateLocation('city', e.target.value)} 
                onValueChange={(val) => updateLocation('city', val)}
                options={getCitiesForState(data.incidentLocation.state)}
                placeholder={t('Select city')}
                searchPlaceholder={t('Search city...')}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('State')}</Label>
              <SearchableSelect
                value={data.incidentLocation.state}
                onValueChange={(val) => updateLocation('state', val)}
                options={MALAYSIAN_STATES}
                placeholder={t('Select Malaysian state')}
                searchPlaceholder={t('Search state...')}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('Country')}</Label>
              <SelectCountry 
                value={data.incidentLocation.country} 
                onValueChange={(val) => updateLocation('country', val)} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Staff Details */}
      <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
        <h4 className="text-sm font-semibold">{t('Staff Who Detected the Incident')}</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t('Name')}</Label>
            <Input value={data.staffDetected.name} onChange={(e) => updateStaff('name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t('Position')}</Label>
            <Input value={data.staffDetected.designation} onChange={(e) => updateStaff('designation', e.target.value)} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t('Phone No.')}</Label>
            <Input value={data.staffDetected.contactNumber} onChange={(e) => updateStaff('contactNumber', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t('Email')}</Label>
            <Input type="email" value={data.staffDetected.email} onChange={(e) => updateStaff('email', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Affected Systems/Services */}
      <div className="space-y-2">
        <Label>{t('Affected Systems/Services (if any)')}</Label>
        <Textarea
          value={data.systemServiceAffected}
          onChange={(e) => onChange('systemServiceAffected', e.target.value)}
          placeholder={t('Describe any systems or services impacted by the incident...')}
          rows={3}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('Vehicle Details (if any)')}</Label>
          <Input
            value={data.vehicleDetails}
            onChange={(e) => onChange('vehicleDetails', e.target.value)}
            placeholder={t('Vehicle type, registration number, and related details')}
          />
        </div>
        <div className="space-y-2">
          <Label>{t('Building Details (if any)')}</Label>
          <Input
            value={data.buildingDetails}
            onChange={(e) => onChange('buildingDetails', e.target.value)}
            placeholder={t('Building name, floor, unit, or zone details')}
          />
        </div>
      </div>

      {/* Estimated Impact */}
      <div className="space-y-3">
        <Label>{t('Estimated Impact *')}</Label>
        <RadioGroup
          value={data.observedImpact}
          onValueChange={(value) => onChange('observedImpact', value)}
          className="flex gap-6"
        >
          {['Low', 'Medium', 'High'].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem value={level} id={`impact-${level}`} />
              <Label htmlFor={`impact-${level}`} className="font-normal cursor-pointer">{t(level)}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Parcel Details */}
      <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-sm font-semibold">{t('Parcel Details')}</h4>
          <div className="flex items-center gap-2">
            <Checkbox
              id="parcel-optional"
              checked={data.skipParcelDetails}
              onCheckedChange={(checked) => toggleParcelOptional(checked === true)}
            />
            <Label htmlFor="parcel-optional" className="text-xs text-muted-foreground cursor-pointer">{t('Not applicable')}</Label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t('Tracking / Consignment Number')}</Label>
            <Input disabled={data.skipParcelDetails} value={data.trackingNumber} onChange={(e) => onChange('trackingNumber', e.target.value)} placeholder={t('e.g. EC20250115-12345')} />
          </div>
          <div className="space-y-2">
            <Label>{t('Parcel Declaration')}</Label>
            <Input disabled={data.skipParcelDetails} value={data.packageDeclaration} onChange={(e) => onChange('packageDeclaration', e.target.value)} placeholder={t('e.g. Electronic goods')} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t('Weight (kg)')}</Label>
            <Input disabled={data.skipParcelDetails} type="number" min="0" step="0.1" value={data.packageWeight} onChange={(e) => onChange('packageWeight', e.target.value)} placeholder={t('e.g. 2.5')} />
          </div>
          <div className="space-y-2">
            <Label>{t('Type of Prohibited Item Detected')}</Label>
            <Input disabled={data.skipParcelDetails} value={data.prohibitedItemType} onChange={(e) => onChange('prohibitedItemType', e.target.value)} placeholder={t('e.g. Narcotics, Firearms')} />
          </div>
        </div>
      </div>

      {/* Sender Information */}
      <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-sm font-semibold">{t('Sender Information')}</h4>
          <div className="flex items-center gap-2">
            <Checkbox
              id="sender-optional"
              checked={data.skipSenderInfo}
              onCheckedChange={(checked) => toggleSenderOptional(checked === true)}
            />
            <Label htmlFor="sender-optional" className="text-xs text-muted-foreground cursor-pointer">{t('Not applicable')}</Label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t('Name')}</Label>
            <Input disabled={data.skipSenderInfo} value={data.senderInfo.name} onChange={(e) => updateSender('name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t('Phone No.')}</Label>
            <Input disabled={data.skipSenderInfo} value={data.senderInfo.contact} onChange={(e) => updateSender('contact', e.target.value)} />
          </div>
        </div>
        
        {/* Granular Address Section */}
        <div className="space-y-4 pt-2 border-t border-border/50">
          <div className="space-y-2">
            <Label>{t('Address Line 1 (Required) *')}</Label>
            <Input 
              disabled={data.skipSenderInfo}
              value={data.senderInfo.addressLine1} 
              onChange={(e) => updateSender('addressLine1', e.target.value)} 
              placeholder={t("House number, street name, and suffix (e.g., '123 Main St')")}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('Address Line 2 (Optional)')}</Label>
            <Input 
              disabled={data.skipSenderInfo}
              value={data.senderInfo.addressLine2} 
              onChange={(e) => updateSender('addressLine2', e.target.value)} 
              placeholder={t('Apartment, suite, unit, floor, or PO Box')}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('ZIP / Postal Code')}</Label>
              <Input 
                disabled={data.skipSenderInfo}
                value={data.senderInfo.zipCode} 
                onChange={(e) => updateSenderZip(e.target.value)} 
                placeholder={t('Numerical or alphanumeric code')}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('City / Municipality')}</Label>
              <SearchableSelect
                disabled={data.skipSenderInfo}
                value={data.senderInfo.city} 
                onValueChange={(val) => updateSender('city', val)}
                options={getCitiesForState(data.senderInfo.state)}
                placeholder={t('Select city')}
                searchPlaceholder={t('Search city...')}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('State')}</Label>
              <SearchableSelect
                disabled={data.skipSenderInfo}
                value={data.senderInfo.state}
                onValueChange={(val) => updateSender('state', val)}
                options={MALAYSIAN_STATES}
                placeholder={t('Select Malaysian state')}
                searchPlaceholder={t('Search state...')}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('Country')}</Label>
              <SelectCountry 
                value={data.senderInfo.country} 
                onValueChange={(val) => updateSender('country', val)} 
                disabled={data.skipSenderInfo}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recipient Information */}
      <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-sm font-semibold">{t('Recipient Information')}</h4>
          <div className="flex items-center gap-2">
            <Checkbox
              id="recipient-optional"
              checked={data.skipRecipientInfo}
              onCheckedChange={(checked) => toggleRecipientOptional(checked === true)}
            />
            <Label htmlFor="recipient-optional" className="text-xs text-muted-foreground cursor-pointer">{t('Not applicable')}</Label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t('Name')}</Label>
            <Input disabled={data.skipRecipientInfo} value={data.recipientInfo.name} onChange={(e) => updateRecipient('name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t('Phone No.')}</Label>
            <Input disabled={data.skipRecipientInfo} value={data.recipientInfo.contact} onChange={(e) => updateRecipient('contact', e.target.value)} />
          </div>
        </div>
        
        {/* Granular Address Section */}
        <div className="space-y-4 pt-2 border-t border-border/50">
          <div className="space-y-2">
            <Label>{t('Address Line 1 (Required) *')}</Label>
            <Input 
              disabled={data.skipRecipientInfo}
              value={data.recipientInfo.addressLine1} 
              onChange={(e) => updateRecipient('addressLine1', e.target.value)} 
              placeholder={t("House number, street name, and suffix (e.g., '123 Main St')")}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('Address Line 2 (Optional)')}</Label>
            <Input 
              disabled={data.skipRecipientInfo}
              value={data.recipientInfo.addressLine2} 
              onChange={(e) => updateRecipient('addressLine2', e.target.value)} 
              placeholder={t('Apartment, suite, unit, floor, or PO Box')}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('ZIP / Postal Code')}</Label>
              <Input 
                disabled={data.skipRecipientInfo}
                value={data.recipientInfo.zipCode} 
                onChange={(e) => updateRecipientZip(e.target.value)} 
                placeholder={t('Numerical or alphanumeric code')}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('City / Municipality')}</Label>
              <SearchableSelect
                disabled={data.skipRecipientInfo}
                value={data.recipientInfo.city} 
                onValueChange={(val) => updateRecipient('city', val)}
                options={getCitiesForState(data.recipientInfo.state)}
                placeholder={t('Select city')}
                searchPlaceholder={t('Search city...')}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('State')}</Label>
              <SearchableSelect
                disabled={data.skipRecipientInfo}
                value={data.recipientInfo.state}
                onValueChange={(val) => updateRecipient('state', val)}
                options={MALAYSIAN_STATES}
                placeholder={t('Select Malaysian state')}
                searchPlaceholder={t('Search state...')}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('Country')}</Label>
              <SelectCountry 
                value={data.recipientInfo.country} 
                onValueChange={(val) => updateRecipient('country', val)} 
                disabled={data.skipRecipientInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
