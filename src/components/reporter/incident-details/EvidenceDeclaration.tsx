import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Download, ShieldCheck, Edit2, Trash2, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Doc {
  name: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
}

interface Props {
  incident: {
    documents: Doc[];
    declarationAgreed?: boolean;
    declarationDate?: string;
    linkDescription?: string;
  };
  editable?: boolean;
}

export default function EvidenceDeclaration({ incident, editable }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    declarationAgreed: incident.declarationAgreed || false,
    declarationDate: incident.declarationDate || '',
    linkDescription: incident.linkDescription || '',
  });
  const [documents, setDocuments] = useState<Doc[]>(incident.documents);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    toast.success("Evidence and declaration updated successfully.");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues({
      declarationAgreed: incident.declarationAgreed || false,
      declarationDate: incident.declarationDate || '',
      linkDescription: incident.linkDescription || '',
    });
    setDocuments(incident.documents);
    setIsEditing(false);
  };

  const handleRemoveFile = (name: string) => {
    setDocuments(documents.filter(d => d.name !== name));
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: Doc = {
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploadedBy: 'Super Admin',
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setDocuments([...documents, newDoc]);
      toast.success(`${file.name} added to evidence.`);
    }
  };

  const photos = documents.filter(d => /\.(jpg|jpeg|png|gif|webp)$/i.test(d.name));
  const docs = documents.filter(d => /\.(pdf|doc|docx|xls|xlsx|csv)$/i.test(d.name));
  const videos = documents.filter(d => /\.(mp4|avi|mov|wmv|webm)$/i.test(d.name));
  const others = documents.filter(d =>
    !photos.includes(d) && !docs.includes(d) && !videos.includes(d)
  );
  const renderFileList = (files: Doc[], label: string) => {
    if (files.length === 0) return null;
    return (
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label} ({files.length})</p>
        {files.map((doc, i) => (
          <div key={i} className={cn(
            "flex items-center justify-between p-3 border rounded-lg transition-colors",
            isEditing ? "border-amber-200 bg-amber-50/30" : "border-border"
          )}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{doc.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-tight">{doc.size} · Uploaded by {doc.uploadedBy} · {doc.uploadDate}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase">
                  <Download className="h-3 w-3 mr-2" />
                  Download
                </Button>
              ) : (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="h-8 text-[10px] font-bold uppercase"
                  onClick={() => handleRemoveFile(doc.name)}
                >
                  <Trash2 className="h-3 w-3 mr-2" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Part 6: Evidence &amp; Declaration
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
      <CardContent className="space-y-6">
        {isEditing && (
          <div className="p-4 border-2 border-dashed border-amber-200 rounded-lg bg-amber-50/20 flex flex-col items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Plus className="h-6 w-6" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-amber-800">Replace / Upload New Evidence</p>
              <p className="text-[10px] text-amber-600 uppercase tracking-widest mt-1">Accepted formats: JPG, PNG, PDF, MP4 (Max 10MB)</p>
            </div>
            <div className="relative">
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">Select Files</Button>
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleUploadFile}
              />
            </div>
          </div>
        )}

        {/* Documents */}
        {documents.length > 0 ? (
          <div className="space-y-6">
            {renderFileList(photos, 'Evidence Photos')}
            {renderFileList(docs, 'Supporting Documents')}
            {renderFileList(videos, 'Video Evidence')}
            {renderFileList(others, 'Other Files')}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">No supporting documents uploaded.</p>
        )}
        
        {incident.linkDescription && (
          <div className="p-4 border border-border rounded-lg bg-muted/30">
            <p className="text-xs font-semibold text-muted-foreground mb-1">External Evidence Link / Description</p>
            <p className="text-sm leading-relaxed">{incident.linkDescription}</p>
          </div>
        )}

        {/* Declaration */}
        <div className="border-t border-border pt-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Declaration Status</p>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className={`text-xs ${
                incident.declarationAgreed !== false
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : 'bg-destructive/20 text-destructive border-destructive/30'
              }`}
            >
              {incident.declarationAgreed !== false ? 'Declaration Signed' : 'Not Declared'}
            </Badge>
            {incident.declarationDate && (
              <span className="text-xs text-muted-foreground">Signed on {incident.declarationDate}</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mt-1">
            The reporter has confirmed that all information provided in this report is true and accurate to the best of their knowledge.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
