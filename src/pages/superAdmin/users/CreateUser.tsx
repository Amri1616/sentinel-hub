import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  UserPlus, 
  ArrowLeft, 
  Mail, 
  User, 
  ShieldCheck, 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateUser() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    myKadNo: '',
    designation: '',
    department: '',
    email: '',
    altEmail: '',
    phone: '',
    altPhone: '',
    systemRole: '',
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    const requiredFields: Array<keyof typeof formData> = ['name', 'myKadNo', 'designation', 'department', 'email', 'phone', 'systemRole'];
    const missingField = requiredFields.find((field) => !formData[field].trim());

    if (missingField) {
      toast({
        title: "Missing Information",
        description: "Please complete all required profile fields before sending the invitation.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "User Created",
      description: "Invitation email and activation link have been sent to the new user.",
    });
    navigate('/super-admin/users');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/super-admin/users')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New System User</h1>
          <p className="text-muted-foreground mt-1">Onboard a new member to the platform and assign global governance roles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-accent/20 border-b py-4">
              <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                <User className="h-4 w-4 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Name</Label>
                  <Input id="fullname" placeholder="Mohd Kamal" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                  <p className="text-[11px] text-muted-foreground">Cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mykad">MyKad No</Label>
                  <Input id="mykad" placeholder="850715-10-6234" value={formData.myKadNo} onChange={(e) => handleChange('myKadNo', e.target.value)} />
                  <p className="text-[11px] text-muted-foreground">Cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" placeholder="Case Officer" value={formData.designation} onChange={(e) => handleChange('designation', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="MCMC — Postal Security Division" value={formData.department} onChange={(e) => handleChange('department', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="mohd.kamal@mcmc.gov.my" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                  <p className="text-[11px] text-muted-foreground">Cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alt-email">Optional Alternative Email</Label>
                  <Input id="alt-email" type="email" placeholder="alternative@email.com" value={formData.altEmail} onChange={(e) => handleChange('altEmail', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone No</Label>
                  <Input id="phone" placeholder="+60 13-456 7890" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                  <p className="text-[11px] text-muted-foreground">Cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alt-phone">Optional Alternative Phone No</Label>
                  <Input id="alt-phone" placeholder="+60 1X-XXX XXXX" value={formData.altPhone} onChange={(e) => handleChange('altPhone', e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="system-role">System Role</Label>
                  <Select value={formData.systemRole} onValueChange={(value) => handleChange('systemRole', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select system role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super-admin">Super Admin</SelectItem>
                      <SelectItem value="reviewer">Case Officer</SelectItem>
                      <SelectItem value="validator">Supervisor</SelectItem>
                      <SelectItem value="investigator">Internal Investigator</SelectItem>
                      <SelectItem value="licensee-admin">Licensee Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-3 pt-6 font-poppins">
            <Button variant="outline" onClick={() => navigate('/super-admin/users')}>
              Cancel Invitation
            </Button>
            <Button onClick={handleCreate} className="px-8 shadow-lg shadow-primary/20 bg-primary">
              <UserPlus className="mr-2 h-4 w-4" />
              Send Onboarding Invitation
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="border-border/40 shadow-sm bg-primary/[0.02]">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                System Role Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="p-3 bg-background border rounded-lg space-y-2">
                <p className="text-xs font-bold uppercase tracking-tighter text-blue-500">MCMC Super Admin</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Full system access, user management, nomination oversight, deletion authority, and master data control.</p>
              </div>
              <div className="p-3 bg-background border rounded-lg space-y-2">
                <p className="text-xs font-bold uppercase tracking-tighter text-amber-500">MCMC Supervisor</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Case validation, approval of transfers, closure approval, and team monitoring.</p>
              </div>
              <div className="p-3 bg-background border rounded-lg space-y-2">
                <p className="text-xs font-bold uppercase tracking-tighter text-indigo-500">LEA Agency User</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Read-only access to escalated cases, investigation updates, and analytics for their agency.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
