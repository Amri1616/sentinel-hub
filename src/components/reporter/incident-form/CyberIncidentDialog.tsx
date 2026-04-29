import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CyberIncidentReport } from './types';
import mcmcLogo from '@/assets/mcmc-logo.png';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CyberIncidentReport;
  onChange: (value: CyberIncidentReport) => void;
}

const ASSISTANCE_OPTIONS = [
  'Further Investigation',
  'Legal Advice',
  'Service Restoration',
  'Other',
];

export default function CyberIncidentDialog({ open, onOpenChange, data, onChange }: Props) {
  const { toast } = useToast();

  const updateField = <K extends keyof CyberIncidentReport>(field: K, value: CyberIncidentReport[K]) => {
    onChange({ ...data, [field]: value });
  };

  const updateDetectedOfficer = (field: 'name' | 'designation' | 'contactNumber' | 'email', value: string) => {
    onChange({ ...data, detectedOfficer: { ...data.detectedOfficer, [field]: value } });
  };

  const toggleAssistance = (option: string, checked: boolean) => {
    const current = data.assistanceRequired || [];
    const next = checked ? [...current, option] : current.filter((x) => x !== option);
    updateField('assistanceRequired', next);
  };

  const updateChronologyRow = (
    index: number,
    field: 'date' | 'time' | 'event',
    value: string
  ) => {
    const rows = [...data.incidentChronologyEntries];
    rows[index] = { ...rows[index], [field]: value };
    updateField('incidentChronologyEntries', rows);
    const summary = rows
      .filter((r) => r.date || r.time || r.event)
      .map((r) => `${r.date || '-'} ${r.time || '-'} ${r.event || '-'}`.trim())
      .join('\n');
    updateField('incidentChronology', summary);
  };

  const addChronologyRow = () => {
    updateField('incidentChronologyEntries', [
      ...data.incidentChronologyEntries,
      { date: '', time: '', event: '' },
    ]);
  };

  const removeChronologyRow = (index: number) => {
    if (data.incidentChronologyEntries.length <= 1) return;
    const rows = data.incidentChronologyEntries.filter((_, rowIndex) => rowIndex !== index);
    updateField('incidentChronologyEntries', rows);
    const summary = rows
      .filter((r) => r.date || r.time || r.event)
      .map((r) => `${r.date || '-'} ${r.time || '-'} ${r.event || '-'}`.trim())
      .join('\n');
    updateField('incidentChronology', summary);
  };

  const handleDocumentUpload = (files: FileList | null) => {
    if (!files) return;
    const uploaded = Array.from(files).map((f) => ({ name: f.name, size: f.size }));
    updateField('uploadedDocuments', uploaded);
    if (uploaded.length > 0 && data.hasSupportingDocuments !== 'Yes') {
      updateField('hasSupportingDocuments', 'Yes');
    }
  };

  const handleSave = () => {
    updateField('completed', true);
    toast({
      title: 'Form Submitted Successfully',
      description: 'Cyber incident form flow completed. You may continue with the main incident submission.',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <img src={mcmcLogo} alt="MCMC Logo" className="h-12 w-auto object-contain shrink-0 mt-0.5" />
            <div className="space-y-1">
              <DialogTitle>Postal Security Incident Report Form - Cyber/Data Leakage Case</DialogTitle>
              <DialogDescription>
                Complete this specialized form for data leakage or cyber incidents. This case will be routed to a dedicated cyber case officer.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-1">
          <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
            <h4 className="font-semibold text-sm">Section 2: Reporter Information</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Company Name *</Label><Input value={data.companyName} onChange={(e) => updateField('companyName', e.target.value)} /></div>
              <div className="space-y-2"><Label>Registered Company Address *</Label><Input value={data.registeredAddress} onChange={(e) => updateField('registeredAddress', e.target.value)} /></div>
              <div className="space-y-2"><Label>Reporter Name *</Label><Input value={data.reporterName} onChange={(e) => updateField('reporterName', e.target.value)} /></div>
              <div className="space-y-2"><Label>Position *</Label><Input value={data.position} onChange={(e) => updateField('position', e.target.value)} /></div>
              <div className="space-y-2"><Label>Email Address *</Label><Input type="email" value={data.email} onChange={(e) => updateField('email', e.target.value)} /></div>
              <div className="space-y-2"><Label>Phone Number *</Label><Input value={data.phoneNumber} onChange={(e) => updateField('phoneNumber', e.target.value)} /></div>
              <div className="space-y-2 md:col-span-2"><Label>Fax Number</Label><Input value={data.faxNumber} onChange={(e) => updateField('faxNumber', e.target.value)} /></div>
            </div>
          </div>

          <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
            <h4 className="font-semibold text-sm">Section 3: Incident Information</h4>
            <div className="space-y-2"><Label>Incident Description *</Label><Textarea rows={3} value={data.incidentDescription} onChange={(e) => updateField('incidentDescription', e.target.value)} /></div>
            <div className="space-y-2">
              <Label>Incident Events in Chronological Order (attach necessary list of evidences)</Label>
              <div className="overflow-x-auto border border-border rounded-md">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="px-2 py-2 text-left font-semibold min-w-[130px]">Date</th>
                      <th className="px-2 py-2 text-left font-semibold min-w-[120px]">Time</th>
                      <th className="px-2 py-2 text-left font-semibold min-w-[220px]">Event</th>
                      <th className="px-2 py-2 text-center font-semibold min-w-[90px]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.incidentChronologyEntries.map((row, index) => (
                      <tr key={index} className="border-t border-border/50">
                        <td className="p-1.5">
                          <Input
                            type="date"
                            value={row.date}
                            onChange={(e) => updateChronologyRow(index, 'date', e.target.value)}
                          />
                        </td>
                        <td className="p-1.5">
                          <Input
                            type="time"
                            value={row.time}
                            onChange={(e) => updateChronologyRow(index, 'time', e.target.value)}
                          />
                        </td>
                        <td className="p-1.5">
                          <Input
                            value={row.event}
                            onChange={(e) => updateChronologyRow(index, 'event', e.target.value)}
                            placeholder="Describe incident event"
                          />
                        </td>
                        <td className="p-1.5 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeChronologyRow(index)}
                            disabled={data.incidentChronologyEntries.length <= 1}
                            title="Delete Row"
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end">
                <Button type="button" variant="outline" size="sm" onClick={addChronologyRow}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Row
                </Button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Incident Date *</Label><Input type="date" value={data.incidentDate} onChange={(e) => updateField('incidentDate', e.target.value)} /></div>
              <div className="space-y-2"><Label>Incident Time *</Label><Input type="time" value={data.incidentTime} onChange={(e) => updateField('incidentTime', e.target.value)} /></div>
            </div>
            <div className="space-y-2"><Label>Incident Location Address *</Label><Input value={data.incidentLocation} onChange={(e) => updateField('incidentLocation', e.target.value)} /></div>

            <div className="space-y-2">
              <Label>Officer/Staff Who Detected the Incident</Label>
              <div className="grid md:grid-cols-2 gap-3">
                <Input placeholder="Name" value={data.detectedOfficer.name} onChange={(e) => updateDetectedOfficer('name', e.target.value)} />
                <Input placeholder="Position" value={data.detectedOfficer.designation} onChange={(e) => updateDetectedOfficer('designation', e.target.value)} />
                <Input placeholder="Phone Number" value={data.detectedOfficer.contactNumber} onChange={(e) => updateDetectedOfficer('contactNumber', e.target.value)} />
                <Input placeholder="Email" value={data.detectedOfficer.email} onChange={(e) => updateDetectedOfficer('email', e.target.value)} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Affected System *</Label><Input value={data.affectedSystem} onChange={(e) => updateField('affectedSystem', e.target.value)} /></div>
              <div className="space-y-2">
                <Label>Estimated Impact *</Label>
                <RadioGroup value={data.estimatedImpact} onValueChange={(v) => updateField('estimatedImpact', v as CyberIncidentReport['estimatedImpact'])} className="flex gap-4">
                  {['Low', 'Medium', 'High'].map((lvl) => (
                    <div key={lvl} className="flex items-center gap-2">
                      <RadioGroupItem value={lvl} id={`cyber-impact-${lvl}`} />
                      <Label htmlFor={`cyber-impact-${lvl}`} className="font-normal">{lvl}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Downtime Duration</Label><Input placeholder="e.g. 2 hours 30 minutes" value={data.downtimeDuration} onChange={(e) => updateField('downtimeDuration', e.target.value)} /></div>
              <div className="space-y-2"><Label>Failing Component</Label><Input value={data.failingComponent} onChange={(e) => updateField('failingComponent', e.target.value)} /></div>
            </div>
            <div className="space-y-2"><Label>Actual Root Cause (Internal and External Factors)</Label><Textarea rows={2} value={data.rootCause} onChange={(e) => updateField('rootCause', e.target.value)} /></div>
            <div className="space-y-2"><Label>Other Related Information (Optional)</Label><Textarea rows={2} value={data.otherInfo} onChange={(e) => updateField('otherInfo', e.target.value)} /></div>
          </div>

          <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
            <h4 className="font-semibold text-sm">Section 4: Actions Taken</h4>
            <div className="space-y-2"><Label>Actions Taken So Far *</Label><Textarea rows={3} value={data.actionsTaken} onChange={(e) => updateField('actionsTaken', e.target.value)} /></div>
            <div className="space-y-2">
              <Label>Has the Incident Been Controlled?</Label>
              <RadioGroup value={data.incidentControlled} onValueChange={(v) => updateField('incidentControlled', v as CyberIncidentReport['incidentControlled'])} className="flex gap-4">
                {['Yes', 'No'].map((x) => (
                  <div key={x} className="flex items-center gap-2">
                    <RadioGroupItem value={x} id={`controlled-${x}`} />
                    <Label htmlFor={`controlled-${x}`} className="font-normal">{x}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Assistance Required from Authorities</Label>
              <div className="grid md:grid-cols-2 gap-2">
                {ASSISTANCE_OPTIONS.map((option) => (
                  <div key={option} className="flex items-center gap-2">
                    <Checkbox checked={data.assistanceRequired.includes(option)} onCheckedChange={(checked) => toggleAssistance(option, checked === true)} />
                    <Label className="text-sm font-normal">{option}</Label>
                  </div>
                ))}
              </div>
              {data.assistanceRequired.includes('Other') && (
                <Input placeholder="Please specify" value={data.assistanceOther} onChange={(e) => updateField('assistanceOther', e.target.value)} />
              )}
            </div>

            <div className="space-y-2">
              <Label>Reported to Authorities</Label>
              <RadioGroup value={data.reportedToAuthority} onValueChange={(v) => updateField('reportedToAuthority', v as CyberIncidentReport['reportedToAuthority'])} className="flex gap-4">
                {['Yes', 'No'].map((x) => (
                  <div key={x} className="flex items-center gap-2">
                    <RadioGroupItem value={x} id={`report-authority-${x}`} />
                    <Label htmlFor={`report-authority-${x}`} className="font-normal">{x}</Label>
                  </div>
                ))}
              </RadioGroup>
              {data.reportedToAuthority === 'Yes' && (
                <Textarea rows={2} placeholder="State authority report details" value={data.authorityDetails} onChange={(e) => updateField('authorityDetails', e.target.value)} />
              )}
            </div>
          </div>

          <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
            <h4 className="font-semibold text-sm">Section 5: Supporting Documents</h4>
            <p className="text-xs text-muted-foreground">Follow the platform format under Supporting Documents (Part 5) for attachments.</p>
            <div className="space-y-2">
              <Label>Are You Submitting Supporting Documents?</Label>
              <RadioGroup value={data.hasSupportingDocuments} onValueChange={(v) => updateField('hasSupportingDocuments', v as CyberIncidentReport['hasSupportingDocuments'])} className="flex gap-4">
                {['Yes', 'No'].map((x) => (
                  <div key={x} className="flex items-center gap-2">
                    <RadioGroupItem value={x} id={`supporting-docs-${x}`} />
                    <Label htmlFor={`supporting-docs-${x}`} className="font-normal">{x}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            {data.hasSupportingDocuments === 'Yes' && (
              <div className="space-y-2">
                <Label>If yes, provide link or submission method</Label>
                <Textarea rows={2} value={data.supportingLinkOrMethod} onChange={(e) => updateField('supportingLinkOrMethod', e.target.value)} />
                <div className="space-y-2">
                  <Label>Upload Supporting Documents (Multiple)</Label>
                  <Input type="file" multiple onChange={(e) => handleDocumentUpload(e.target.files)} />
                  {data.uploadedDocuments.length > 0 && (
                    <div className="space-y-1 rounded-md border border-border p-2 bg-background">
                      {data.uploadedDocuments.map((doc, idx) => (
                        <p key={`${doc.name}-${idx}`} className="text-xs text-muted-foreground">
                          {doc.name} ({(doc.size / 1024).toFixed(1)} KB)
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
            <h4 className="font-semibold text-sm">Section 6: Declaration</h4>
            <p className="text-xs text-muted-foreground">Follow the declaration format in Part 6 of the platform.</p>
            <div className="flex items-start gap-2">
              <Checkbox checked={data.declarationTruth} onCheckedChange={(c) => updateField('declarationTruth', c === true)} />
              <Label className="text-sm font-normal">I take full responsibility for this submission and declare that all disclosed information is true and correct.</Label>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox checked={data.declarationSharing} onCheckedChange={(c) => updateField('declarationSharing', c === true)} />
              <Label className="text-sm font-normal">I understand that the disclosed information may be subject to MCMC discretion for information sharing.</Label>
            </div>
            <div className="space-y-2 max-w-xs">
              <Label>Declaration Date</Label>
              <Input type="date" value={data.declarationDate} onChange={(e) => updateField('declarationDate', e.target.value)} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={handleSave}>Submit Cyber Incident Form</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
