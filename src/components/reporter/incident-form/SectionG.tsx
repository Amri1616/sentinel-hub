import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, Camera, FileText, Video, Info, Eye, RefreshCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';

interface Props {
  attachments: Array<{ name: string; size: number; category?: string; previewUrl?: string; mimeType?: string }>;
  onChange: (attachments: Array<{ name: string; size: number; category?: string; previewUrl?: string; mimeType?: string }>) => void;
  linkDescription: string;
  onLinkDescriptionChange: (value: string) => void;
}

const samplePhotos = [
  'Damaged package exterior showing tampered sealing tape',
  'CCTV screenshot of sorting area during incident',
  'Close-up of prohibited item discovered',
  'Photo of parcel label with tracking details',
];

export default function SectionG({ attachments, onChange, linkDescription, onLinkDescriptionChange }: Props) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [previewFile, setPreviewFile] = useState<{ name: string; previewUrl?: string; mimeType?: string } | null>(null);

  const photos = attachments.filter(a => a.category === 'photo');
  const documents = attachments.filter(a => a.category === 'document');
  const videos = attachments.filter(a => a.category === 'video');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, category: string, maxFiles: number, maxSizeMB: number) => {
    const files = Array.from(e.target.files || []);
    const currentCount = attachments.filter(a => a.category === category).length;
    const remaining = maxFiles - currentCount;

    if (files.length > remaining) {
      toast({ title: t('Maximum {{max}} files allowed', { max: maxFiles }), description: t('You can only add {{remaining}} more.', { remaining }), variant: 'destructive' });
    }

    const toAdd = files.slice(0, remaining);
    const valid = toAdd.filter(f => f.size <= maxSizeMB * 1024 * 1024);
    if (valid.length < toAdd.length) {
      toast({ title: t('Some files exceed {{size}}MB limit', { size: maxSizeMB }), variant: 'destructive' });
    }

    onChange([
      ...attachments,
      ...valid.map((f) => ({
        name: f.name,
        size: f.size,
        category,
        previewUrl: URL.createObjectURL(f),
        mimeType: f.type,
      })),
    ]);
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    if (attachments[index]?.previewUrl) {
      URL.revokeObjectURL(attachments[index].previewUrl as string);
    }
    onChange(attachments.filter((_, i) => i !== index));
  };

  const replaceFile = (index: number, file?: File) => {
    if (!file) return;
    const updated = [...attachments];
    if (updated[index]?.previewUrl) {
      URL.revokeObjectURL(updated[index].previewUrl as string);
    }
    updated[index] = {
      ...updated[index],
      name: file.name,
      size: file.size,
      previewUrl: URL.createObjectURL(file),
      mimeType: file.type,
    };
    onChange(updated);
  };

  const renderFileList = (files: Array<{ name: string; size: number; category?: string; previewUrl?: string; mimeType?: string }>, icon: React.ReactNode) => {
    if (files.length === 0) return null;
    return (
      <div className="space-y-2 mt-3">
        {files.map((file, i) => {
          const globalIdx = attachments.indexOf(file);
          return (
            <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-0.5 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPreviewFile(file)}
                  title={t('Preview')}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Label className="cursor-pointer">
                  <Input
                    type="file"
                    className="hidden"
                    onChange={(e) => replaceFile(globalIdx, e.target.files?.[0])}
                  />
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">
                    <RefreshCcw className="h-4 w-4" />
                  </span>
                </Label>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFile(globalIdx)} title={t('Delete')}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Evidence Photos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Camera className="h-4 w-4 text-primary" />
            {t('Evidence Photos')}
          </Label>
          <span className="text-xs text-muted-foreground">{t('{{count}} / 5 uploaded', { count: photos.length })}</span>
        </div>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
          <Camera className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          <Label htmlFor="photoUpload" className="cursor-pointer">
            <span className="text-primary hover:underline">{t('Click to upload photos')}</span> {t('or drag and drop')}
          </Label>
          <p className="text-xs text-muted-foreground mt-1">{t('JPG, PNG — Max 10MB per file — Up to 5 photos')}</p>
          <Input
            id="photoUpload"
            type="file"
            multiple
            accept="image/jpeg,image/png,image/jpg"
            className="hidden"
            onChange={(e) => handleUpload(e, 'photo', 5, 10)}
            disabled={photos.length >= 5}
          />
        </div>

        {/* Sample evidence guidance */}
        <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-primary mb-1">{t('Sample Evidence Photos Guide')}</p>
              <ul className="text-xs text-muted-foreground space-y-0.5">
                {samplePhotos.map((s, i) => (
                  <li key={i}>• {t(s)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {renderFileList(photos, <Camera className="h-5 w-5 text-primary" />)}
      </div>

      {/* Supporting Documents */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            {t('Supporting Documents')}
          </Label>
          <span className="text-xs text-muted-foreground">{t('{{count}} uploaded', { count: documents.length })}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {t('Reports to Law Enforcement Agencies (LEA), internal reports, or other relevant documentation.')}
        </p>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
          <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          <Label htmlFor="docUpload" className="cursor-pointer">
            <span className="text-primary hover:underline">{t('Click to upload documents')}</span> {t('or drag and drop')}
          </Label>
          <p className="text-xs text-muted-foreground mt-1">{t('PDF format only — Max 10MB per file')}</p>
          <Input
            id="docUpload"
            type="file"
            multiple
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleUpload(e, 'document', 20, 10)}
          />
        </div>
        {renderFileList(documents, <FileText className="h-5 w-5 text-primary" />)}
      </div>

      {/* Video Evidence */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Video className="h-4 w-4 text-primary" />
            {t('Video Evidence')}
          </Label>
          <span className="text-xs text-muted-foreground">{t('{{count}} / 3 uploaded', { count: videos.length })}</span>
        </div>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
          <Video className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          <Label htmlFor="videoUpload" className="cursor-pointer">
            <span className="text-primary hover:underline">{t('Click to upload videos')}</span> {t('or drag and drop')}
          </Label>
          <p className="text-xs text-muted-foreground mt-1">{t('MP4, AVI, MOV, WMV — Max 50MB per file — Up to 3 videos')}</p>
          <Input
            id="videoUpload"
            type="file"
            multiple
            accept="video/mp4,video/avi,video/quicktime,video/x-ms-wmv,.mp4,.avi,.mov,.wmv"
            className="hidden"
            onChange={(e) => handleUpload(e, 'video', 3, 50)}
            disabled={videos.length >= 3}
          />
        </div>
        {renderFileList(videos, <Video className="h-5 w-5 text-primary" />)}
      </div>

      {/* Link or Description */}
      <div className="space-y-2">
        <Label>{t('Link or Description')}</Label>
        <Textarea
          value={linkDescription}
          onChange={(e) => onLinkDescriptionChange(e.target.value)}
          placeholder={t('Provide a URL link to external evidence or a description of supporting documents...')}
          rows={3}
        />
      </div>

      <Dialog open={!!previewFile} onOpenChange={(open) => !open && setPreviewFile(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t('Preview: {{name}}', { name: previewFile?.name })}</DialogTitle>
          </DialogHeader>
          {previewFile?.previewUrl ? (
            previewFile.mimeType?.startsWith('image/') ? (
              <img src={previewFile.previewUrl} alt={previewFile.name} className="max-h-[70vh] w-full object-contain" />
            ) : previewFile.mimeType?.startsWith('video/') ? (
              <video controls className="max-h-[70vh] w-full" src={previewFile.previewUrl} />
            ) : (
              <iframe title={previewFile.name} src={previewFile.previewUrl} className="h-[70vh] w-full rounded border" />
            )
          ) : (
            <p className="text-sm text-muted-foreground">{t('Preview is not available for this file.')}</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
