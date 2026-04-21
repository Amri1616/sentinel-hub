import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { IncidentFormData, Step, emptySenderRecipient, emptyCyberIncidentReport } from '@/components/reporter/incident-form/types';
import SectionA from '@/components/reporter/incident-form/SectionA';
import Part2IncidentType from '@/components/reporter/incident-form/Part2IncidentType';
import Part3IncidentInfo from '@/components/reporter/incident-form/Part3IncidentInfo';
import Part4ActionsTaken from '@/components/reporter/incident-form/Part4ActionsTaken';
import SectionG from '@/components/reporter/incident-form/SectionG';
import Part6Declaration from '@/components/reporter/incident-form/Part6Declaration';
import { useTranslation } from 'react-i18next';

const today = new Date().toISOString().split('T')[0];

const initialFormData: IncidentFormData = {
  companyName: 'Pos Malaysia Berhad',
  registeredAddress: 'Dayabumi Complex, Jalan Sultan Hishamuddin, 50670 Kuala Lumpur',
  reporterName: 'Ahmad bin Ismail',
  position: 'Security Officer',
  officialEmail: 'ahmad.ismail@posmalaysia.com.my',
  contactNumber: '+60 12-345 6789',
  faxNumber: '',
  additionalPhone: '',
  alternativeEmail: '',
  primaryIncidentType: '',
  description: '',
  incidentDate: '',
  incidentTime: '',
  incidentLocation: { ...emptySenderRecipient },
  staffDetected: { name: '', designation: '', contactNumber: '', email: '' },
  systemServiceAffected: '',
  vehicleDetails: '',
  buildingDetails: '',
  observedImpact: '',
  senderInfo: { ...emptySenderRecipient },
  recipientInfo: { ...emptySenderRecipient },
  trackingNumber: '',
  packageDeclaration: '',
  packageWeight: '',
  prohibitedItemType: '',
  skipParcelDetails: false,
  skipSenderInfo: false,
  skipRecipientInfo: false,
  otherRelatedInfo: '',
  cyberIncidentReport: { ...emptyCyberIncidentReport, declarationDate: today },
  immediateActions: '',
  incidentContained: '',
  assistanceRequired: [],
  assistanceOther: '',
  reportedToAuthorities: '',
  authorityDetails: '',
  parcelHandedOver: '',
  authorityReportNumber: '',
  attachments: [],
  declaration: false,
  declarationDate: today,
};

export default function NewIncident() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [formData, setFormData] = useState<IncidentFormData>(initialFormData);
  const [declaration, setDeclaration] = useState(false);
  const [linkDescription, setLinkDescription] = useState('');
  const [draftWarningOpen, setDraftWarningOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setLastSaved(new Date()), 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const steps = [
    { number: 1 as Step, title: t('Reporter Information'), short: t('Reporter') },
    { number: 2 as Step, title: t('Incident Type'), short: t('Type') },
    { number: 3 as Step, title: t('Incident Details'), short: t('Details') },
    { number: 4 as Step, title: t('Actions Taken'), short: t('Actions') },
    { number: 5 as Step, title: t('Supporting Documents'), short: t('Documents') },
    { number: 6 as Step, title: t('Review & Declaration'), short: t('Review') },
  ];

  const currentIdx = steps.findIndex((s) => s.number === currentStep);
  const isLastStep = currentIdx === steps.length - 1;
  const isFirstStep = currentIdx === 0;

  const nextStep = () => {
    if (!isLastStep) setCurrentStep(steps[currentIdx + 1].number);
  };
  const prevStep = () => {
    if (!isFirstStep) setCurrentStep(steps[currentIdx - 1].number);
  };

  const updateField = (field: keyof IncidentFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    toast({ title: t('Draft Saved'), description: t('Your incident report has been saved as a draft.') });
    navigate('/licensee-reporter/drafts');
  };

  const handleSubmit = () => {
    if (!declaration) {
      toast({ title: t('Declaration Required'), description: t('Please agree to the declaration before submitting.'), variant: 'destructive' });
      return;
    }

    const reportId = 'ABXX0020';
    const submittedAt = new Date().toISOString();
    // Persist form data so IncidentDetails can display it
    localStorage.setItem(
      `incident_${reportId}`,
      JSON.stringify({
        ...formData,
        linkDescription,
        submittedAt,
      })
    );
    toast({ title: t('Incident Submitted'), description: t('Reference: {{reportId}}. Submission timestamp recorded.', { reportId }) });
    navigate(`/licensee-reporter/incidents/${reportId}`);
  };

  const currentStepInfo = steps[currentIdx];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/licensee-reporter/incidents')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('Back')}
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{t('Postal Security Incident Reporting Form')}</h1>
          <p className="text-muted-foreground">{t('Complete all sections to submit your incident report')}</p>
        </div>
        {lastSaved && <div className="text-sm text-muted-foreground">{t('Auto-saved {{time}}', { time: lastSaved.toLocaleTimeString() })}</div>}
      </div>

      {/* Stepper */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep === step.number
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                      : currentIdx > index
                      ? 'bg-status-closed text-status-closed-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="text-xs mt-2 text-center hidden md:block">{step.title}</div>
                  <div className="text-xs mt-2 text-center md:hidden">{step.short}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded ${currentIdx > index ? 'bg-status-closed' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader><CardTitle>{currentStepInfo?.title}</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && <SectionA data={formData} onChange={updateField} />}
          {currentStep === 2 && <Part2IncidentType data={formData} onChange={updateField} />}
          {currentStep === 3 && <Part3IncidentInfo data={formData} onChange={updateField} />}
          {currentStep === 4 && <Part4ActionsTaken data={formData} onChange={updateField} />}
          {currentStep === 5 && <SectionG attachments={formData.attachments} onChange={(v) => updateField('attachments', v)} linkDescription={linkDescription} onLinkDescriptionChange={setLinkDescription} />}
          {currentStep === 6 && (
            <Part6Declaration
              data={formData}
              declaration={declaration}
              onDeclarationChange={setDeclaration}
              onDateChange={(d) => updateField('declarationDate', d)}
              onEditStep={(step) => setCurrentStep(step)}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={prevStep} disabled={isFirstStep}>
              <ArrowLeft className="mr-2 h-4 w-4" />{t('Previous')}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setDraftWarningOpen(true)}>
                <Save className="mr-2 h-4 w-4" />{t('Save Draft')}
              </Button>
              {!isLastStep ? (
                <Button onClick={nextStep} className="glow-cyan">{t('Next')}<ArrowRight className="ml-2 h-4 w-4" /></Button>
              ) : (
                <Button onClick={handleSubmit} className="glow-cyan" disabled={!declaration}>
                  <Send className="mr-2 h-4 w-4" />{t('Submit Incident')}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={draftWarningOpen} onOpenChange={setDraftWarningOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('Save Draft Confirmation')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('Please be informed that this form will be saved as a draft in the system and retained for up to 20 days from now. You can return to complete and submit it before expiry.')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveDraft}>{t('Proceed to Save Draft')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
