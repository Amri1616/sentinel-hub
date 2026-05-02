import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Clock, 
  ArrowLeft,
  Edit2,
  Trash2,
  Phone,
  Briefcase,
  Building,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  User as UserIcon,
  Info
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoleChip } from '@/components/RoleChip';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Role } from '@/lib/auth';

export default function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");

  const [userData, setUserData] = useState({
    id: id || 'USR-2026-042',
    name: 'Ahmad Faiz',
    designation: 'Senior Compliance Officer',
    department: 'Postal Security & Incident Response',
    email: 'afaiz@mcmc.gov.my',
    phone: '+60 12-345 6789',
    role: 'super-admin' as Role,
    userType: 'System Administrator',
    organisation: 'MCMC',
    status: 'active',
    lastLogin: '2026-04-30 09:30:12',
    createdDate: '2025-01-15',
    caseOfficerType: 'standard'
  });

  const handleAction = (action: string) => {
    toast.success(`${action} logged in audit trail.`);
  };

  const handleSave = () => {
    toast.success("Staff profile and role updated. Changes recorded in audit log.");
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    toast.error("Account deactivated and moved to archival state.");
    setIsDeleteOpen(false);
    navigate('/super-admin/users');
  };

  return (
    <div className="space-y-6 bg-slate-50/30 -m-6 p-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/super-admin/users')}
            className="hover:bg-white rounded-full h-10 w-10 border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="h-5 w-5 text-slate-500" />
          </Button>
          <div className="flex items-center gap-4">

            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">{userData.name}</h1>
                <Badge className={cn(
                  "py-0.5 px-2 uppercase text-[10px] font-bold border",
                  userData.status === 'active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                )}>
                  {userData.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Building className="h-3.5 w-3.5" />
                  {userData.organisation}
                </div>
                <div className="h-3 w-px bg-slate-200" />
                <RoleChip role={userData.role} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm" onClick={() => setIsEditDialogOpen(true)}>
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Profile & Role
          </Button>
          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-rose-600 border-rose-100 hover:bg-rose-50 hover:text-rose-700 shadow-sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Deactivate Account
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-rose-600" />
                </div>
                <DialogTitle className="text-center">Deactivate Staff Account</DialogTitle>
                <DialogDescription className="text-center">
                  This will revoke all system access for <span className="font-bold text-slate-900">{userData.name}</span>.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="sm:justify-center gap-2">
                <Button variant="ghost" className="flex-1" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                <Button variant="destructive" className="flex-1" onClick={handleDelete}>Confirm Deactivation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Staff Information Card */}
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Building className="h-4 w-4 text-blue-600" />
                Staff Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</Label>
                  <p className="text-base font-semibold text-slate-900">{userData.name}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">MCMC Email Address</Label>
                  <p className="text-base font-semibold text-slate-900">{userData.email}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</Label>
                  <p className="text-base font-semibold text-slate-900">{userData.phone}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Designation</Label>
                  <p className="text-base font-semibold text-slate-900">{userData.designation}</p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Department</Label>
                  <p className="text-base font-semibold text-slate-900">{userData.department}</p>
                </div>
              </div>
            </CardContent>
          </Card>


        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* Security Summary Side Card */}
          <Card className="border-none shadow-sm bg-blue-600 text-white overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-4">
              <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Last Known Activity</p>
                  <Clock className="h-3 w-3 opacity-70" />
                </div>
                <p className="text-sm font-bold">{userData.lastLogin}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs font-bold italic underline underline-offset-4 decoration-blue-400">Audit Compliance</p>
                <p className="text-[11px] opacity-80 leading-relaxed">This staff record is currently being monitored. Any role modifications will trigger an automated alert to the Governance Division.</p>
              </div>
            </CardContent>
          </Card>

          {/* Role Summary Side Card */}
          <Card className="border-none shadow-sm bg-white border border-slate-100">
            <CardHeader className="pb-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">System Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
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

      {/* Edit Dialog - Now includes Role Selection */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl bg-white border-none shadow-2xl p-0 overflow-hidden">
          <DialogHeader className="p-6 bg-slate-50 border-b border-slate-100">
            <DialogTitle>Update Staff Profile & Role</DialogTitle>
            <DialogDescription>Modify the administrative identity and system permissions for {userData.name}.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
              <div className="md:col-span-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4 border-b pb-2">Profile Details</h3>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Full Name</Label>
                <Input className="bg-slate-50/50 border-slate-200 h-11" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Designation</Label>
                <Input className="bg-slate-50/50 border-slate-200 h-11" value={userData.designation} onChange={(e) => setUserData({...userData, designation: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Department</Label>
                <Input className="bg-slate-50/50 border-slate-200 h-11" value={userData.department} onChange={(e) => setUserData({...userData, department: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Phone Number</Label>
                <Input className="bg-slate-50/50 border-slate-200 h-11" value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 opacity-50">Email Address (Locked)</Label>
                <Input className="bg-slate-100 border-slate-200 h-11 text-slate-400" value={userData.email} disabled />
              </div>

              <div className="md:col-span-2 mt-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4 border-b pb-2">System Permissions</h3>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">System Role</Label>
                <Select 
                  value={userData.role === 'reviewer' ? `reviewer-${userData.caseOfficerType}` : userData.role} 
                  onValueChange={(value) => {
                    if (value.startsWith('reviewer-')) {
                      const type = value.split('-')[1];
                      setUserData(prev => ({ ...prev, role: 'reviewer', caseOfficerType: type }));
                    } else {
                      setUserData(prev => ({ ...prev, role: value as Role }));
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
          </div>
          <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100">
            <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 px-8 font-bold" onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
