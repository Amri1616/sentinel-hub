import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  UserPlus, 
  ArrowLeft, 
  Save, 
  Mail, 
  User, 
  Building2, 
  ShieldCheck, 
  Lock,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateUser() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreate = () => {
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
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="fullname" placeholder="E.g. Tan Sri Ahmad" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="official@mcmc.gov.my" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">System Role</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select high-level role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super-admin">MCMC Super Admin</SelectItem>
                      <SelectItem value="reviewer">MCMC Case Officer</SelectItem>
                      <SelectItem value="validator">MCMC Supervisor</SelectItem>
                      <SelectItem value="investigator">MCMC Internal</SelectItem>
                      <SelectItem value="licensee-admin">Licensee Admin</SelectItem>
                      <SelectItem value="lea-viewer">LEA Agency User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org">Organisation</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="org" placeholder="MCMC / PDRM / POS / etc." className="pl-10" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border/40">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-bold flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      Initial Access Security
                    </Label>
                    <p className="text-xs text-muted-foreground">Force user to create new password and setup MFA upon first login.</p>
                  </div>
                  <Switch defaultChecked />
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
                Role Permissions Hint
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
                <p className="text-xs font-bold uppercase tracking-tighter text-indigo-500">Agency User (LEA)</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Read-only access to escalated cases, investigation updates, and analytics for their agency.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
