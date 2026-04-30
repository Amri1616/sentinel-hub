import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tag, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  incident: {
    primaryIncidentType?: string;
    postalIncidentTypes?: string[];
    otherRelatedInfo?: string;
  };
  editable?: boolean;
}

export default function IncidentClassification({ incident, editable }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    primaryIncidentType: incident.primaryIncidentType || '',
    otherRelatedInfo: incident.otherRelatedInfo || '',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    toast.success("Incident classification updated successfully.");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues({
      primaryIncidentType: incident.primaryIncidentType || '',
      otherRelatedInfo: incident.otherRelatedInfo || '',
    });
    setIsEditing(false);
  };

  const isOther = editValues.primaryIncidentType?.startsWith('Other');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          Part 2: Incident Classification
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
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">Primary Incident Type</Label>
          {isEditing ? (
            <Input 
              value={editValues.primaryIncidentType} 
              onChange={(e) => setEditValues({...editValues, primaryIncidentType: e.target.value})}
              placeholder="Enter incident type"
            />
          ) : (
            <>
              {editValues.primaryIncidentType ? (
                <Badge variant="outline" className="text-xs">{editValues.primaryIncidentType}</Badge>
              ) : (
                <span className="text-sm font-medium">—</span>
              )}
            </>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">Other Details (if applicable)</Label>
          {isEditing ? (
            <Textarea 
              value={editValues.otherRelatedInfo}
              onChange={(e) => setEditValues({...editValues, otherRelatedInfo: e.target.value})}
              placeholder="Enter additional details"
              className="min-h-[80px]"
            />
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isOther && editValues.otherRelatedInfo ? editValues.otherRelatedInfo : '—'}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
