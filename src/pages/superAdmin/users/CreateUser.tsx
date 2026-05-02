import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  ShieldCheck, 
  UserPlus,
  Info,
  Building,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CreateUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    department: '',
    role: '',
    caseOfficerType: 'standard',
    status: 'active',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    const requiredFields = ['name', 'email', 'phone', 'designation', 'department', 'role'];
    const missingField = requiredFields.find((field) => !formData[field as keyof typeof formData]);

    if (missingField) {
      toast.error(`Please fill in the ${missingField} field.`);
      return;
    }

    // Mock audit log simulation
    console.log(`AUDIT: User ${formData.name} created by Superadmin at ${new Date().toISOString()}`);
    
    toast.success("Internal user account created successfully. Audit record saved.");
    navigate('/super-admin/users');
  };

  return (
    <div className="space-y-6 pb-12 bg-slate-50/30 -m-6 p-6 min-h-screen">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/super-admin/users')}
          className="hover:bg-white rounded-full h-10 w-10 border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="h-5 w-5 text-slate-500" />
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">Governance Control</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add Internal Staff</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Register a new MCMC employee into the PSIRP system.</p>
        </div>
      </div>

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Building className="h-4 w-4 text-blue-600" />
                Staff Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</Label>
                  <Input id="fullname" placeholder="Enter staff name" className="bg-slate-50/50 border-slate-200 h-11" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">MCMC Email Address</Label>
                  <Input id="email" type="email" placeholder="username@mcmc.gov.my" className="bg-slate-50/50 border-slate-200 h-11" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                  <p className="text-[10px] text-slate-400 italic">Email cannot be edited after account creation.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number</Label>
                  <Input id="phone" placeholder="+60 1X-XXX XXXX" className="bg-slate-50/50 border-slate-200 h-11" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation" className="text-xs font-bold uppercase tracking-wider text-slate-500">Designation</Label>
                  <Input id="designation" placeholder="e.g. Senior Case Officer" className="bg-slate-50/50 border-slate-200 h-11" value={formData.designation} onChange={(e) => handleChange('designation', e.target.value)} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="department" className="text-xs font-bold uppercase tracking-wider text-slate-500">Department</Label>
                  <Input id="department" placeholder="e.g. Postal Security & Incident Response" className="bg-slate-50/50 border-slate-200 h-11" value={formData.department} onChange={(e) => handleChange('department', e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Access Control & Roles
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
              <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Organization</Label>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="h-10 w-10 bg-white border border-slate-200 rounded-md flex items-center justify-center font-bold text-blue-600">
                    M
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">MCMC (Internal Only)</p>
                    <p className="text-xs text-slate-500">Fixed for this management module</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 ml-auto" />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-slate-500">System Role</Label>
                  <Select 
                    value={formData.role === 'reviewer' ? `reviewer-${formData.caseOfficerType}` : formData.role} 
                    onValueChange={(value) => {
                      if (value.startsWith('reviewer-')) {
                        const type = value.split('-')[1];
                        setFormData(prev => ({ ...prev, role: 'reviewer', caseOfficerType: type }));
                      } else {
                        handleChange('role', value);
                      }
                    }}
                  >
                    <SelectTrigger className="h-11 bg-slate-50/50 border-slate-200">
                      <SelectValue placeholder="Assign a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reviewer-standard">Case Officer (Standard)</SelectItem>
                      <SelectItem value="reviewer-cyber">Case Officer (Cyber Security)</SelectItem>
                      <SelectItem value="validator">Supervisor</SelectItem>
                      <SelectItem value="investigator">Internal (View Only)</SelectItem>
                      <SelectItem value="super-admin">Superadmin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button variant="ghost" className="text-slate-500 font-medium" onClick={() => navigate('/super-admin/users')}>
              Cancel
            </Button>
            <Button onClick={handleCreate} className="px-10 h-11 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/10 transition-all font-bold">
              <UserPlus className="mr-2 h-4 w-4" />
              Create Staff Account
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-blue-600 text-white overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Security Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1">
                <p className="text-sm font-bold italic underline underline-offset-4 decoration-blue-400">Strict MCMC Only</p>
                <p className="text-[11px] opacity-80 leading-relaxed">This module is strictly for managing MCMC internal personnel. Licensee and LEA management is handled under separate governance modules.</p>
              </div>
              <div className="space-y-1 pt-2">
                <p className="text-sm font-bold italic underline underline-offset-4 decoration-blue-400">Audit Compliance</p>
                <p className="text-[11px] opacity-80 leading-relaxed">All creations and role modifications are permanently logged for security auditing by the compliance division.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white border border-slate-100">
            <CardHeader className="pb-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Role Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700">Superadmin</p>
                  <p className="text-[10px] text-slate-500 leading-tight">Full system oversight including user and master data governance.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700">Supervisor</p>
                  <p className="text-[10px] text-slate-500 leading-tight">Approves case transfers, closures, and monitors team performance.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-500 mt-1.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700">Case Officer</p>
                  <p className="text-[10px] text-slate-500 leading-tight">Primary handler for incident review and investigation workflows.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-slate-400 mt-1.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700">Internal User</p>
                  <p className="text-[10px] text-slate-500 leading-tight">Restricted access role that can only view all cases without performing actions.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
