import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Building2, 
  Shield, 
  Clock, 
  Calendar, 
  Key, 
  Unlock, 
  UserX, 
  UserCheck,
  ArrowLeft,
  Activity,
  ChevronRight,
  Monitor,
  Database,
  Lock,
  Edit2,
  Trash2,
  AlertTriangle,
  Fingerprint,
  Phone,
  Briefcase,
  History,
  RefreshCw,
  MoreVertical
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoleChip } from '@/components/RoleChip';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from '@/lib/auth';

export default function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");

  const [userData, setUserData] = useState({
    id: id || 'USR-001',
    name: 'Ahmad bin Abdullah',
    myKad: '890312-14-5577',
    designation: 'Compliance Officer',
    department: 'Regulatory Affairs',
    email: 'ahmad.abdullah@expresscourier.com',
    altEmail: 'ahmad.alt@expresscourier.com',
    phone: '+60 12-345 6789',
    altPhone: '+60 17-222 3344',
    businessAddress: 'Global Express Logistics, Shah Alam, Selangor',
    internalNotes: 'Primary contact for regional compliance submissions.',
    role: 'super-admin' as Role,
    organisation: 'MCMC',
    status: 'active',
    mfa: true,
    lastLogin: '2026-03-08 09:30:12',
    createdDate: '2025-01-15'
  });

  const activities = [
    { id: 1, action: 'User Update', target: 'Self', module: 'User Management', time: '5 mins ago', severity: 'low' },
    { id: 2, action: 'Approved Application', target: 'APP-2026-003', module: 'Application Management', time: '2 hours ago', severity: 'medium' },
    { id: 3, action: 'Platform Login', target: '10.20.0.12', module: 'Authentication', time: '4 hours ago', severity: 'low' },
    { id: 4, action: 'Modified Master Data', target: 'Incident Categories', module: 'Master Data', time: '1 day ago', severity: 'high' },
    { id: 5, action: 'Soft Deleted Case', target: 'CASE-0092', module: 'Case Governance', time: '2 days ago', severity: 'critical' },
  ];

  const handleAction = (action: string) => {
    toast.success(`${action} successful.`);
  };

  const handleSave = () => {
    toast.success("User details updated and synced with application record.");
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteReason) {
      toast.error("Please provide a reason for deletion.");
      return;
    }
    toast.error("User account soft-deleted and moved to archival state.");
    setIsDeleteOpen(false);
    navigate('/super-admin/users');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/super-admin/users')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl border border-primary/20">
              {userData.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{userData.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <RoleChip role={userData.role} />
                <Badge className={cn(
                  "py-0 px-2 uppercase text-[9px] font-bold",
                  userData.status === 'active' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-destructive/10 text-destructive border-destructive/20"
                )}>
                  {userData.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Soft Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Soft Delete User</DialogTitle>
                <DialogDescription>
                  This will hide the user from all active lists. They will be marked as 'Deleted' and cannot be restored.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Reason for Deletion</Label>
                  <Select onValueChange={setDeleteReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resigned">User Resigned</SelectItem>
                      <SelectItem value="transferred">User Transferred</SelectItem>
                      <SelectItem value="policy">Policy Violation</SelectItem>
                      <SelectItem value="duplicate">Duplicate Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDelete}>Confirm Deletion</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-accent/20 border-b py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Detailed Identity</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-3 rounded-lg border bg-background/60 p-3">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Name</p>
                    <p className="text-sm font-medium">{userData.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">MyKad No</p>
                    <p className="text-sm font-medium">{userData.myKad}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Designation</p>
                    <p className="text-sm font-medium">{userData.designation}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Department</p>
                    <p className="text-sm font-medium">{userData.department}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</p>
                    <p className="text-sm font-medium break-all">{userData.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Optional Alternative Email</p>
                    <p className="text-sm font-medium break-all">{userData.altEmail}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone No</p>
                    <p className="text-sm font-medium">{userData.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Optional Alternative Phone No</p>
                    <p className="text-sm font-medium">{userData.altPhone}</p>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Business Address</p>
                    <p className="text-sm font-medium">{userData.businessAddress}</p>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Internal Notes</p>
                    <p className="text-sm font-medium whitespace-pre-wrap">{userData.internalNotes}</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t space-y-1">
                <p className="text-[10px] text-muted-foreground italic">System ID: {userData.id}</p>
                <p className="text-[10px] text-muted-foreground italic">Member since {userData.createdDate}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 shadow-sm">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Governance Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-xs font-semibold" onClick={() => handleAction('Password Reset')}>
                <Key className="mr-2 h-4 w-4" />
                Reset Password
              </Button>
              <Button variant="outline" className="w-full justify-start text-xs font-semibold" onClick={() => handleAction('Activation Resent')}>
                <Mail className="mr-2 h-4 w-4" />
                Resend Activation
              </Button>
              <Button variant="outline" className="w-full justify-start text-xs font-semibold" onClick={() => handleAction('Temp PW Regenerated')}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate Temp PW
              </Button>
              <Button variant="outline" className="w-full justify-start text-xs font-semibold" onClick={() => handleAction('Role Changed')}>
                <Shield className="mr-2 h-4 w-4 text-primary" />
                Change User Role
              </Button>
              {userData.status === 'active' ? (
                <Button variant="outline" className="w-full justify-start text-xs font-semibold text-amber-500" onClick={() => handleAction('Deactivated')}>
                  <UserX className="mr-2 h-4 w-4" />
                  Deactivate User
                </Button>
              ) : (
                <Button variant="outline" className="w-full justify-start text-xs font-semibold text-green-500" onClick={() => handleAction('Activated')}>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Activate User
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="w-full bg-muted/30 p-1 border border-border/40 mb-4 h-11">
              <TabsTrigger value="activity" className="flex-1 py-1.5 font-bold uppercase tracking-wider text-[10px]">
                <Activity className="h-3 w-3 mr-2" />
                User Activity
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex-1 py-1.5 font-bold uppercase tracking-wider text-[10px]">
                <History className="h-3 w-3 mr-2" />
                Governance Logs
              </TabsTrigger>
            </TabsList>
            <TabsContent value="activity">
              <Card className="border-border/40 shadow-sm min-h-[500px]">
                <CardHeader>
                  <CardTitle className="text-base">Recent Activity Trail</CardTitle>
                  <CardDescription>Actions performed by this user in the last 30 days.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-2">
                  <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-muted before:to-transparent">
                    {activities.map((act) => (
                      <div key={act.id} className="relative flex items-start gap-4 pl-10">
                        <div className={cn(
                          "absolute left-3 p-1 rounded-full ring-4 ring-background",
                          act.severity === 'critical' ? 'bg-destructive text-destructive-foreground' : 
                          act.severity === 'high' ? 'bg-orange-500 text-white' :
                          act.severity === 'medium' ? 'bg-amber-500 text-white' :
                          'bg-primary text-primary-foreground'
                        )}>
                          <div className="h-4 w-4 rounded-full bg-background/20" />
                        </div>
                        <div className="flex-1 p-3 rounded-lg border bg-accent/30 hover:border-primary/20 transition-all group">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{act.module}</span>
                            <span className="text-[10px] text-muted-foreground">{act.time}</span>
                          </div>
                          <p className="text-sm font-medium">
                            {act.action} on <span className="font-mono text-xs">{act.target}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="logs">
              <div className="p-12 text-center bg-accent/10 rounded-xl border border-dashed border-border/60">
                <History className="h-8 w-8 text-muted-foreground/40 mx-auto mb-4" />
                <p className="text-sm font-medium text-muted-foreground">Accessing full governance logs...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User Profile</DialogTitle>
            <DialogDescription>Update the identity and organizational details for this user.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>MyKad / Passport</Label>
              <Input value={userData.myKad} onChange={(e) => setUserData({...userData, myKad: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Designation</Label>
              <Input value={userData.designation} onChange={(e) => setUserData({...userData, designation: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input value={userData.department} onChange={(e) => setUserData({...userData, department: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Optional Alternative Email</Label>
              <Input value={userData.altEmail} onChange={(e) => setUserData({...userData, altEmail: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Phone No</Label>
              <Input value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Optional Alternative Phone No</Label>
              <Input value={userData.altPhone} onChange={(e) => setUserData({...userData, altPhone: e.target.value})} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Business Address</Label>
              <Textarea
                value={userData.businessAddress}
                onChange={(e) => setUserData({...userData, businessAddress: e.target.value})}
                rows={3}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Internal Notes</Label>
              <Textarea
                value={userData.internalNotes}
                onChange={(e) => setUserData({...userData, internalNotes: e.target.value})}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

