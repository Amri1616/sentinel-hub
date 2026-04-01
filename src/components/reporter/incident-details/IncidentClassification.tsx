import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';

interface Props {
  incident: {
    primaryIncidentType?: string;
    postalIncidentTypes?: string[];
    otherRelatedInfo?: string;
  };
}

export default function IncidentClassification({ incident }: Props) {
  const isOther = incident.primaryIncidentType?.startsWith('Other');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          Part 2: Incident Classification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Primary Incident Type</p>
          {incident.primaryIncidentType ? (
            <Badge variant="outline" className="text-xs">{incident.primaryIncidentType}</Badge>
          ) : (
            <span className="text-sm font-medium">—</span>
          )}
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Other Details (if applicable)</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isOther && incident.otherRelatedInfo ? incident.otherRelatedInfo : '—'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
