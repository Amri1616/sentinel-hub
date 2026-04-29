import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ArrowLeft, 
  User, 
  Building2, 
  Calendar, 
  ShieldCheck, 
  Mail, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  FileText,
  UserPlus,
  Users,
  Building,
  Edit2,
  Save,
  Trash2,
  Plus,
  History,
  ShieldAlert,
  Phone
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from '@/lib/utils';

export default function ApplicationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectCategory, setRejectCategory] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);

  // Mock data state - in a real app this would be fetched
  const isLEA = id === 'APP-2026-002' || id === 'APP-2026-004';
  
  const [applicationData, setApplicationData] = useState({
    id: id || 'APP-2026-001',
    type: isLEA ? 'LEA' : 'Licensee',
    organisation: isLEA ? 'PDRM - Cyber Crime Unit' : 'Ninja Van Malaysia',
    status: 'submitted',
    submittedDate: '2026-03-05',
    lastUpdated: '2026-03-08 14:30',
    companyInfo: {
      regNumber: isLEA ? 'G-12345' : '201501012345',
      address: 'Level 10, Menara PDRM, Bukit Aman, 50480 Kuala Lumpur',
      website: isLEA ? 'www.rmp.gov.my' : 'www.ninjavan.co',
      phone: '+603-2266 2222'
    },
    users: isLEA ? [
      { role: 'LEA Main User', name: 'ASP Ridzuan Bin Mansor', email: 'ridzuan.m@rmp.gov.my', phone: '012-3456789', designation: 'Assistant Superintendent' }
    ] : [
      { id: '1', role: 'Licensee Admin', name: 'Ariff Kamal', email: 'ariff@ninjavan.co', phone: '019-8765432', designation: 'Operations Director' },
      { id: '2', role: 'Licensee Reporter', name: 'Siti Norhaliza', email: 'siti.n@ninjavan.co', phone: '011-22334455', designation: 'Compliance Officer' },
      { id: '3', role: 'Licensee Reporter', name: 'Tan Kah Boon', email: 'kb.tan@ninjavan.co', phone: '016-55667788', designation: 'Risk Manager' }
    ]
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge className="bg-slate-500/10 text-slate-500 border-slate-500/20 uppercase font-bold text-[10px] tracking-widest px-3 py-1">Submitted</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 uppercase font-bold text-[10px] tracking-widest px-3 py-1">Under Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20 uppercase font-bold text-[10px] tracking-widest px-3 py-1">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20 uppercase font-bold text-[10px] tracking-widest px-3 py-1">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleApprove = () => {
    toast.success("Application approved. User accounts created and activation links sent.");
    setIsApproveDialogOpen(false);
    navigate('/super-admin/applications');
  };

  const handleReject = () => {
    if (!rejectCategory || !rejectReason) {
      toast.error("Please provide a category and reason for rejection.");
      return;
    }
    toast.error(`Application rejected. Notification sent to applicant.`);
    setIsRejectDialogOpen(false);
    navigate('/super-admin/applications');
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    setApplicationData(prev => ({ ...prev, lastUpdated: new Date().toLocaleString() }));
    toast.success("Application details updated successfully.");
  };

  const addReporter = () => {
    const newReporter = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'Licensee Reporter',
      name: '',
      email: '',
      phone: '',
      designation: ''
    };
    setApplicationData(prev => ({
      ...prev,
      users: [...prev.users, newReporter]
    }));
  };

  const removeUser = (index: number) => {
    if (applicationData.users.length <= 1) return;
    const newUsers = [...applicationData.users];
    newUsers.splice(index, 1);
    setApplicationData(prev => ({ ...prev, users: newUsers }));
  };

  const updateUserField = (index: number, field: string, value: string) => {
    const newUsers = [...applicationData.users];
    newUsers[index] = { ...newUsers[index], [field]: value };
    setApplicationData(prev => ({ ...prev, users: newUsers }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/super-admin/applications')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              Application Details
              {getStatusBadge(applicationData.status)}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest">{applicationData.id}</p>
              <div className="h-3 w-px bg-border" />
              <p className="text-muted-foreground text-[10px] uppercase tracking-tighter">Last Updated: {applicationData.lastUpdated}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Application
            </Button>
          ) : (
            <>
              <Button onClick={() => setIsEditing(false)} variant="ghost" size="sm">Cancel</Button>
              <Button onClick={handleSaveEdit} size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Organisation Information */}
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 border-b py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <CardTitle className="text-xs font-bold uppercase tracking-widest">
                    {applicationData.type === 'LEA' ? 'Agency Information' : 'Company Information'}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Organisation Name</Label>
                  {isEditing ? (
                    <Input value={applicationData.organisation} onChange={(e) => setApplicationData({...applicationData, organisation: e.target.value})} />
                  ) : (
                    <p className="font-semibold">{applicationData.organisation}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {applicationData.type === 'LEA' ? 'Agency Code' : 'SSM Registration No.'}
                  </Label>
                  {isEditing ? (
                    <Input value={applicationData.companyInfo.regNumber} onChange={(e) => setApplicationData({...applicationData, companyInfo: {...applicationData.companyInfo, regNumber: e.target.value}})} />
                  ) : (
                    <p className="font-semibold">{applicationData.companyInfo.regNumber}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Website</Label>
                  {isEditing ? (
                    <Input value={applicationData.companyInfo.website} onChange={(e) => setApplicationData({...applicationData, companyInfo: {...applicationData.companyInfo, website: e.target.value}})} />
                  ) : (
                    <p className="font-medium text-primary underline underline-offset-4 cursor-pointer">{applicationData.companyInfo.website}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Primary Phone</Label>
                  {isEditing ? (
                    <Input value={applicationData.companyInfo.phone} onChange={(e) => setApplicationData({...applicationData, companyInfo: {...applicationData.companyInfo, phone: e.target.value}})} />
                  ) : (
                    <p className="font-medium">{applicationData.companyInfo.phone}</p>
                  )}
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Address</Label>
                  {isEditing ? (
                    <Textarea value={applicationData.companyInfo.address} onChange={(e) => setApplicationData({...applicationData, companyInfo: {...applicationData.companyInfo, address: e.target.value}})} />
                  ) : (
                    <p className="text-sm leading-relaxed">{applicationData.companyInfo.address}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Onboarding User Profiles</h3>
              </div>
              {isEditing && applicationData.type === 'Licensee' && (
                <Button size="xs" variant="outline" onClick={addReporter}>
                  <Plus className="mr-1 h-3 w-3" /> Add Reporter
                </Button>
              )}
            </div>

            <div className="grid gap-4">
              {applicationData.users.map((user: any, index: number) => (
                <Card key={index} className={cn(
                  "border-border/40 shadow-sm relative group",
                  user.role.includes('Admin') || user.role.includes('Main') ? "bg-primary/5" : "bg-card"
                )}>
                  {isEditing && applicationData.users.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeUser(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <CardContent className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                        {isEditing ? (
                          <Input value={user.name} onChange={(e) => updateUserField(index, 'name', e.target.value)} placeholder="Full Name" />
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{user.name}</span>
                            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tighter h-5">{user.role}</Badge>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Work Email</Label>
                        {isEditing ? (
                          <Input value={user.email} onChange={(e) => updateUserField(index, 'email', e.target.value)} placeholder="email@organisation.com" />
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Designation</Label>
                        {isEditing ? (
                          <Input value={user.designation} onChange={(e) => updateUserField(index, 'designation', e.target.value)} placeholder="Official Title" />
                        ) : (
                          <p className="text-sm font-medium">{user.designation}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                        {isEditing ? (
                          <Input value={user.phone} onChange={(e) => updateUserField(index, 'phone', e.target.value)} placeholder="+60..." />
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          {!isEditing && applicationData.status === 'submitted' && (
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/40">
              <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-red-500 border-red-500/20 hover:bg-red-500/5 font-bold uppercase tracking-widest text-[10px] h-10 px-8">
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject Application
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-500">
                      <ShieldAlert className="h-5 w-5" />
                      Reject Application
                    </DialogTitle>
                    <DialogDescription>
                      This action will notify the applicant. Please provide a mandatory reason for the rejection.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest">Rejection Category</Label>
                      <Select onValueChange={setRejectCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select reason type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="incomplete">Incomplete Documentation</SelectItem>
                          <SelectItem value="invalid">Invalid Registration Data</SelectItem>
                          <SelectItem value="duplicate">Duplicate Application</SelectItem>
                          <SelectItem value="policy">Policy Violation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest">Detailed Remarks</Label>
                      <Textarea 
                        placeholder="Provide specific feedback to the applicant..." 
                        className="min-h-[120px]"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleReject} disabled={!rejectCategory || !rejectReason}>Confirm Rejection</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700 font-bold uppercase tracking-widest text-[10px] h-10 px-10">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approve & Onboard
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-green-600">
                      <ShieldCheck className="h-5 w-5" />
                      Confirm Approval
                    </DialogTitle>
                    <DialogDescription>
                      The following user accounts will be created and activated automatically.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg space-y-3 border">
                      {applicationData.users.map((user: any, i: number) => (
                        <div key={i} className="flex justify-between items-center text-sm border-b border-border/40 pb-2 last:border-0 last:pb-0">
                          <div className="flex flex-col">
                            <span className="font-bold">{user.name}</span>
                            <span className="text-[10px] text-muted-foreground">{user.email}</span>
                          </div>
                          <Badge variant="outline" className="text-[9px] h-4 uppercase">{user.role}</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-md">
                      <AlertCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
                        System will send temporary credentials and a secure activation link to each user email upon confirmation.
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsApproveDialogOpen(false)}>Cancel</Button>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove}>Confirm & Send Invites</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        {/* Audit / Summary Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 border-b py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Application Audit</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-border/40">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Submitted Date</span>
                </div>
                <span className="font-bold">{applicationData.submittedDate}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-border/40">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <History className="h-3.5 w-3.5" />
                  <span>Last Updated</span>
                </div>
                <span className="font-bold">{applicationData.lastUpdated}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-border/40">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="h-3.5 w-3.5" />
                  <span>Org Type</span>
                </div>
                <Badge variant="outline" className="font-bold">{applicationData.type}</Badge>
              </div>
              <div className="bg-accent/20 p-3 rounded-md mt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Audit Logs Preview</p>
                <div className="space-y-2">
                  <div className="text-[10px] flex justify-between">
                    <span className="text-muted-foreground italic">Application Created</span>
                    <span className="font-mono text-[9px]">{applicationData.submittedDate}</span>
                  </div>
                  <div className="text-[10px] flex justify-between">
                    <span className="text-muted-foreground italic">Docs Verified by System</span>
                    <span className="font-mono text-[9px]">2026-03-05</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-amber-600 flex items-center gap-2">
              <AlertCircle className="h-3 w-3" />
              Administrative Policy
            </h4>
            <p className="text-[10px] text-amber-700/80 leading-relaxed font-medium">
              Changes to user roles or organization details after approval will trigger a formal audit event. Ensure SSM details match official records before onboarding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
