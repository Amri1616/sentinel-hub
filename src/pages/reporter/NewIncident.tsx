import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { IncidentFormData, Step, emptySenderRecipient } from '@/components/reporter/incident-form/types';
import SectionA from '@/components/reporter/incident-form/SectionA';
import Part2IncidentType from '@/components/reporter/incident-form/Part2IncidentType';
import Part3IncidentInfo from '@/components/reporter/incident-form/Part3IncidentInfo';
import Part4ActionsTaken from '@/components/reporter/incident-form/Part4ActionsTaken';
import SectionG from '@/components/reporter/incident-form/SectionG';
import Part6Declaration from '@/components/reporter/incident-form/Part6Declaration';

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
  observedImpact: '',
  senderInfo: { ...emptySenderRecipient },
  recipientInfo: { ...emptySenderRecipient },
  trackingNumber: '',
  packageDeclaration: '',
  packageWeight: '',
  prohibitedItemType: '',
  otherRelatedInfo: '',
  immediateActions: '',
  incidentContained: '',
  assistanceRequired: [],
  assistanceOther: '',
  reportedToAuthorities: '',
  authorityDetails: '',
  parcelHandedOver: '',
  attachments: [],
  declaration: false,
  declarationDate: today,
};

export default function NewIncident() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [formData, setFormData] = useState<IncidentFormData>(initialFormData);
  const [declaration, setDeclaration] = useState(false);
  const [linkDescription, setLinkDescription] = useState('');

  useEffect(() => {
    const interval = setInterval(() => setLastSaved(new Date()), 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const steps = [
    { number: 1 as Step, title: 'Reporter Information', short: 'Reporter' },
    { number: 2 as Step, title: 'Incident Type', short: 'Type' },
    { number: 3 as Step, title: 'Incident Details', short: 'Details' },
    { number: 4 as Step, title: 'Actions Taken', short: 'Actions' },
    { number: 5 as Step, title: 'Supporting Documents', short: 'Documents' },
    { number: 6 as Step, title: 'Review & Declaration', short: 'Review' },
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
    toast({ title: 'Draft Saved', description: 'Your incident report has been saved as a draft.' });
    navigate('/licensee-reporter/incidents');
  };

  const handleSubmit = () => {
    if (!declaration) {
      toast({ title: 'Declaration Required', description: 'Please agree to the declaration before submitting.', variant: 'destructive' });
      return;
    }
    const reportId = 'ABXX0020';
    const submittedAt = new Date().toISOString();
    // Persist form data so IncidentDetails can display it
    localStorage.setItem(`incident_${reportId}`, JSON.stringify({ ...formData, linkDescription, submittedAt }));
    toast({ title: 'Incident Submitted', description: `Reference: ${reportId}. Submission timestamp recorded.` });
    navigate(`/licensee-reporter/incidents/${reportId}`);
  };

  const currentStepInfo = steps[currentIdx];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/licensee-reporter/incidents')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Postal Security Incident Reporting Form</h1>
          <p className="text-muted-foreground">Complete all sections to submit your incident report</p>
        </div>
        {lastSaved && <div className="text-sm text-muted-foreground">Auto-saved {lastSaved.toLocaleTimeString()}</div>}
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
          {currentStep === 6 && <Part6Declaration data={formData} declaration={declaration} onDeclarationChange={setDeclaration} onDateChange={(d) => updateField('declarationDate', d)} />}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={prevStep} disabled={isFirstStep}>
              <ArrowLeft className="mr-2 h-4 w-4" />Previous
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="mr-2 h-4 w-4" />Save Draft
              </Button>
              {!isLastStep ? (
                <Button onClick={nextStep} className="glow-cyan">Next<ArrowRight className="ml-2 h-4 w-4" /></Button>
              ) : (
                <Button onClick={handleSubmit} className="glow-cyan" disabled={!declaration}>
                  <Send className="mr-2 h-4 w-4" />Submit Incident
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
