import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

interface ContactInfo {
  name: string;
  address: string;
  stateCountry: string;
  contact: string;
}

interface Props {
  incident: {
    senderInfo?: ContactInfo;
    recipientInfo?: ContactInfo;
    trackingNumber?: string;
    packageDeclaration?: string;
    packageWeight?: string;
    prohibitedItemType?: string;
    items?: {
      tracking: string;
      type: string;
      declaration: string;
      weight: string;
      detectedItemType: string;
      sender: ContactInfo;
      receiver: ContactInfo;
    }[];
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

function ContactCard({ title, info }: { title: string; info: ContactInfo | undefined }) {
  if (!info) return (
    <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-2 opacity-50">
      <p className="text-xs font-semibold text-muted-foreground">{title}</p>
      <Field label="Name" value="—" />
      <Field label="Address" value="—" />
      <Field label="State / Country" value="—" />
      <Field label="Phone No." value="—" />
    </div>
  );
  return (
    <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">{title}</p>
      <Field label="Name" value={info.name} />
      <Field label="Address" value={info.address} />
      <Field label="State / Country" value={info.stateCountry} />
      <Field label="Phone No." value={info.contact} />
    </div>
  );
}

export default function LogisticsData({ incident }: Props) {
  const hasParcelFields = true; // Always show the section structure
  const hasSenderRecipient = true;
  const hasLegacyItems = incident.items && incident.items.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Part 4: Logistics &amp; Parcel Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Parcel details */}
        {hasParcelFields && (
          <div className="grid md:grid-cols-2 gap-4">
            {incident.trackingNumber && <Field label="Tracking / Consignment Number" value={incident.trackingNumber} />}
            {incident.packageDeclaration && <Field label="Package Declaration" value={incident.packageDeclaration} />}
            {incident.packageWeight && <Field label="Package Weight" value={`${incident.packageWeight} kg`} />}
            {incident.prohibitedItemType && <Field label="Type of Prohibited Item Detected" value={incident.prohibitedItemType} />}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <ContactCard title="Sender Information" info={incident.senderInfo} />
          <ContactCard title="Recipient Information" info={incident.recipientInfo} />
        </div>

        {/* Legacy multi-item */}
        {hasLegacyItems && !hasParcelFields && incident.items!.map((item, idx) => (
          <div key={idx} className="border border-border rounded-lg p-4 space-y-4">
            <p className="text-sm font-semibold">Item {idx + 1}</p>
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Tracking Number" value={item.tracking} />
              <Field label="Type" value={item.type} />
              <Field label="Declaration" value={item.declaration} />
              <Field label="Weight" value={item.weight} />
              <Field label="Detected Item Type" value={item.detectedItemType} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <ContactCard title="Sender" info={item.sender} />
              <ContactCard title="Receiver" info={item.receiver} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
