import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IncidentFormData, StaffDetected, SenderRecipientInfo } from './types';
import { SelectCountry } from './SelectCountry';

interface Props {
  data: IncidentFormData;
  onChange: (field: keyof IncidentFormData, value: any) => void;
}

export default function Part3IncidentInfo({ data, onChange }: Props) {
  const updateStaff = (field: keyof StaffDetected, value: string) => {
    onChange('staffDetected', { ...data.staffDetected, [field]: value });
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

  return (
    <div className="space-y-6">
      {/* Incident Description */}
      <div className="space-y-2">
        <Label>Incident Description *</Label>
        <Textarea value={data.description} onChange={(e) => onChange('description', e.target.value)} placeholder="Provide a detailed description of the incident..." rows={5} />
      </div>

      {/* Date & Time */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date of Incident *</Label>
          <Input type="date" value={data.incidentDate} onChange={(e) => onChange('incidentDate', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Time of Incident *</Label>
          <Input type="time" value={data.incidentTime} onChange={(e) => onChange('incidentTime', e.target.value)} />
        </div>
      </div>

      {/* Location Address */}
      <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          Location Address (Location where the incident occurred) *
        </h4>
        
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Address Line 1 (Required) *</Label>
            <Input 
              value={data.incidentLocation.addressLine1} 
              onChange={(e) => updateLocation('addressLine1', e.target.value)} 
              placeholder="House number, street name, and suffix (e.g., '123 Main St')"
            />
          </div>
          <div className="space-y-2">
            <Label>Address Line 2 (Optional)</Label>
            <Input 
              value={data.incidentLocation.addressLine2} 
              onChange={(e) => updateLocation('addressLine2', e.target.value)} 
              placeholder="Apartment, suite, unit, floor, or PO Box"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>City / Municipality</Label>
              <Input 
                value={data.incidentLocation.city} 
                onChange={(e) => updateLocation('city', e.target.value)} 
                placeholder="The town or city name"
              />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Input 
                value={data.incidentLocation.state} 
                onChange={(e) => updateLocation('state', e.target.value)} 
                placeholder="The state or equivalent region"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ZIP / Postal Code</Label>
              <Input 
                value={data.incidentLocation.zipCode} 
                onChange={(e) => updateLocation('zipCode', e.target.value)} 
                placeholder="Numerical or alphanumeric code"
              />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
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
        <h4 className="text-sm font-semibold">Staff Who Detected the Incident</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={data.staffDetected.name} onChange={(e) => updateStaff('name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Position</Label>
            <Input value={data.staffDetected.designation} onChange={(e) => updateStaff('designation', e.target.value)} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Phone No.</Label>
            <Input value={data.staffDetected.contactNumber} onChange={(e) => updateStaff('contactNumber', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={data.staffDetected.email} onChange={(e) => updateStaff('email', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Affected Systems/Services */}
      <div className="space-y-2">
        <Label>Affected Systems/Services (if any)</Label>
        <Textarea
          value={data.systemServiceAffected}
          onChange={(e) => onChange('systemServiceAffected', e.target.value)}
          placeholder="Describe any systems or services impacted by the incident..."
          rows={3}
        />
      </div>

      {/* Estimated Impact */}
      <div className="space-y-3">
        <Label>Estimated Impact *</Label>
        <RadioGroup
          value={data.observedImpact}
          onValueChange={(value) => onChange('observedImpact', value)}
          className="flex gap-6"
        >
          {['Low', 'Medium', 'High'].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem value={level} id={`impact-${level}`} />
              <Label htmlFor={`impact-${level}`} className="font-normal cursor-pointer">{level}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Parcel Details */}
      <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
        <h4 className="text-sm font-semibold">Parcel Details</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Tracking / Consignment Number</Label>
            <Input value={data.trackingNumber} onChange={(e) => onChange('trackingNumber', e.target.value)} placeholder="e.g. EC20250115-12345" />
          </div>
          <div className="space-y-2">
            <Label>Parcel Declaration</Label>
            <Input value={data.packageDeclaration} onChange={(e) => onChange('packageDeclaration', e.target.value)} placeholder="e.g. Electronic goods" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Weight (kg)</Label>
            <Input type="number" min="0" step="0.1" value={data.packageWeight} onChange={(e) => onChange('packageWeight', e.target.value)} placeholder="e.g. 2.5" />
          </div>
          <div className="space-y-2">
            <Label>Type of Prohibited Item Detected</Label>
            <Input value={data.prohibitedItemType} onChange={(e) => onChange('prohibitedItemType', e.target.value)} placeholder="e.g. Narcotics, Firearms" />
          </div>
        </div>
      </div>

      {/* Sender Information */}
      <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
        <h4 className="text-sm font-semibold">Sender Information</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={data.senderInfo.name} onChange={(e) => updateSender('name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Phone No.</Label>
            <Input value={data.senderInfo.contact} onChange={(e) => updateSender('contact', e.target.value)} />
          </div>
        </div>
        
        {/* Granular Address Section */}
        <div className="space-y-4 pt-2 border-t border-border/50">
          <div className="space-y-2">
            <Label>Address Line 1 (Required) *</Label>
            <Input 
              value={data.senderInfo.addressLine1} 
              onChange={(e) => updateSender('addressLine1', e.target.value)} 
              placeholder="House number, street name, and suffix (e.g., '123 Main St')"
            />
          </div>
          <div className="space-y-2">
            <Label>Address Line 2 (Optional)</Label>
            <Input 
              value={data.senderInfo.addressLine2} 
              onChange={(e) => updateSender('addressLine2', e.target.value)} 
              placeholder="Apartment, suite, unit, floor, or PO Box"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>City / Municipality</Label>
              <Input 
                value={data.senderInfo.city} 
                onChange={(e) => updateSender('city', e.target.value)} 
                placeholder="The town or city name"
              />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Input 
                value={data.senderInfo.state} 
                onChange={(e) => updateSender('state', e.target.value)} 
                placeholder="The state or equivalent region"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ZIP / Postal Code</Label>
              <Input 
                value={data.senderInfo.zipCode} 
                onChange={(e) => updateSender('zipCode', e.target.value)} 
                placeholder="Numerical or alphanumeric code"
              />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <SelectCountry 
                value={data.senderInfo.country} 
                onValueChange={(val) => updateSender('country', val)} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recipient Information */}
      <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
        <h4 className="text-sm font-semibold">Recipient Information</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={data.recipientInfo.name} onChange={(e) => updateRecipient('name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Phone No.</Label>
            <Input value={data.recipientInfo.contact} onChange={(e) => updateRecipient('contact', e.target.value)} />
          </div>
        </div>
        
        {/* Granular Address Section */}
        <div className="space-y-4 pt-2 border-t border-border/50">
          <div className="space-y-2">
            <Label>Address Line 1 (Required) *</Label>
            <Input 
              value={data.recipientInfo.addressLine1} 
              onChange={(e) => updateRecipient('addressLine1', e.target.value)} 
              placeholder="House number, street name, and suffix (e.g., '123 Main St')"
            />
          </div>
          <div className="space-y-2">
            <Label>Address Line 2 (Optional)</Label>
            <Input 
              value={data.recipientInfo.addressLine2} 
              onChange={(e) => updateRecipient('addressLine2', e.target.value)} 
              placeholder="Apartment, suite, unit, floor, or PO Box"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>City / Municipality</Label>
              <Input 
                value={data.recipientInfo.city} 
                onChange={(e) => updateRecipient('city', e.target.value)} 
                placeholder="The town or city name"
              />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Input 
                value={data.recipientInfo.state} 
                onChange={(e) => updateRecipient('state', e.target.value)} 
                placeholder="The state or equivalent region"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ZIP / Postal Code</Label>
              <Input 
                value={data.recipientInfo.zipCode} 
                onChange={(e) => updateRecipient('zipCode', e.target.value)} 
                placeholder="Numerical or alphanumeric code"
              />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <SelectCountry 
                value={data.recipientInfo.country} 
                onValueChange={(val) => updateRecipient('country', val)} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
