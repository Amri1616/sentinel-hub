import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  Users, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Mail,
  Phone,
  Shield
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

export default function CreateApplication() {
  const navigate = useNavigate();
  const [appType, setAppType] = useState<'Licensee' | 'LEA'>('Licensee');
  const [orgName, setOrgName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [reporters, setReporters] = useState([{ id: '1', name: '', email: '', phone: '', designation: '' }]);

  const handleAddReporter = () => {
    setReporters([...reporters, { id: Math.random().toString(36).substr(2, 9), name: '', email: '', phone: '', designation: '' }]);
  };

  const handleRemoveReporter = (id: string) => {
    if (reporters.length > 1) {
      setReporters(reporters.filter(r => r.id !== id));
    }
  };

  const handleUpdateReporter = (id: string, field: string, value: string) => {
    setReporters(reporters.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleSubmit = () => {
    if (!orgName || !regNumber) {
      toast.error("Please fill in all required organisation details.");
      return;
    }
    toast.success("Application created successfully.");
    navigate('/super-admin/applications');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/super-admin/applications')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create New Application</h1>
          <p className="text-muted-foreground text-sm">Manually initiate a registration application for a new organisation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="bg-muted/30 border-b py-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <CardTitle className="text-xs font-bold uppercase tracking-widest">Organisation Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Application Type</Label>
                  <Select value={appType} onValueChange={(val: any) => setAppType(val)}>
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Licensee">Licensee (Company)</SelectItem>
                      <SelectItem value="LEA">LEA (Agency)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Organisation Name</Label>
                  <Input placeholder="Enter legal name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {appType === 'Licensee' ? 'SSM Registration No.' : 'Agency Code'}
                  </Label>
                  <Input placeholder={appType === 'Licensee' ? "2024..." : "G-..."} value={regNumber} onChange={(e) => setRegNumber(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-widest">
                  {appType === 'Licensee' ? 'Onboarding Reporters' : 'Agency Main User'}
                </h3>
              </div>
              {appType === 'Licensee' && (
                <Button size="xs" variant="outline" onClick={handleAddReporter}>
                  <Plus className="mr-1 h-3 w-3" /> Add Reporter
                </Button>
              )}
            </div>

            <div className="grid gap-4">
              {(appType === 'LEA' ? reporters.slice(0, 1) : reporters).map((user, index) => (
                <Card key={user.id} className="border-border/40 shadow-sm relative group bg-card">
                  {appType === 'Licensee' && reporters.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveReporter(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <CardContent className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                        <Input placeholder="Name as per MyKad" value={user.name} onChange={(e) => handleUpdateReporter(user.id, 'name', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</Label>
                        <Input placeholder="Work Email" value={user.email} onChange={(e) => handleUpdateReporter(user.id, 'email', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Designation</Label>
                        <Input placeholder="Job Title" value={user.designation} onChange={(e) => handleUpdateReporter(user.id, 'designation', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone</Label>
                        <Input placeholder="+60..." value={user.phone} onChange={(e) => handleUpdateReporter(user.id, 'phone', e.target.value)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-primary/5 border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Submission Notice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Creating an application manually bypasses the initial self-registration portal. You will still need to review and approve the application before user accounts are finalized.
                </p>
              </div>
              <Button className="w-full font-bold uppercase tracking-widest text-[10px] h-10" onClick={handleSubmit}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Submit Application
              </Button>
            </CardContent>
          </Card>

          <div className="p-4 bg-muted/30 border rounded-xl flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0" />
            <p className="text-[10px] text-muted-foreground leading-tight italic">
              New applications are assigned the status "Submitted" by default and appear in the review queue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

