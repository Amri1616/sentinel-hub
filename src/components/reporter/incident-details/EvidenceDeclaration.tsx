import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, ShieldCheck } from 'lucide-react';

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
}

export default function EvidenceDeclaration({ incident }: Props) {
  const photos = incident.documents.filter(d => /\.(jpg|jpeg|png|gif|webp)$/i.test(d.name));
  const docs = incident.documents.filter(d => /\.(pdf|doc|docx|xls|xlsx|csv)$/i.test(d.name));
  const videos = incident.documents.filter(d => /\.(mp4|avi|mov|wmv|webm)$/i.test(d.name));
  const others = incident.documents.filter(d =>
    !photos.includes(d) && !docs.includes(d) && !videos.includes(d)
  );

  const renderFileList = (files: Doc[], label: string) => {
    if (files.length === 0) return null;
    return (
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground">{label} ({files.length})</p>
        {files.map((doc, i) => (
          <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.size} · Uploaded by {doc.uploadedBy} · {doc.uploadDate}</p>
              </div>
            </div>
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Download</Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Part 6: Evidence &amp; Declaration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Documents */}
        {incident.documents.length > 0 ? (
          <div className="space-y-4">
            {renderFileList(photos, 'Evidence Photos')}
            {renderFileList(docs, 'Supporting Documents')}
            {renderFileList(videos, 'Video Evidence')}
            {renderFileList(others, 'Other Files')}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No supporting documents uploaded.</p>
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
