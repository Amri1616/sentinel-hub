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
  Phone,
  Download,
  Paperclip,
  MapPin,
  Image as ImageIcon
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
      addressLine1: isLEA ? 'Level 10, Menara PDRM' : '15, Jalan Tandang',
      addressLine2: isLEA ? 'Bukit Aman' : 'Seksyen 51',
      zipCode: isLEA ? '50480' : '46050',
      city: isLEA ? 'Kuala Lumpur' : 'Petaling Jaya',
      state: isLEA ? 'WP Kuala Lumpur' : 'Selangor',
      country: 'Malaysia',
      phone: '+603-2266 2222',
      fax: isLEA ? '+60388888899' : '+603-7912 3456',
      orgSubType: isLEA ? 'Police' : 'Courier'
    },
    documents: [
      { id: 'doc1', name: 'Authorization Letter', type: 'PDF', size: '2.4 MB', date: '2026-03-05', status: 'uploaded' },
      { id: 'doc2', name: 'Organization Stamp', type: 'PNG', size: '1.1 MB', date: '2026-03-05', status: 'uploaded' }
    ],
    authorization: {
      name: 'Dato\' Seri Ariff Kamal',
      position: 'Chief Executive Officer',
      submissionDate: '2026-03-05',
      declaration: 'I hereby declare that all information provided in this application is true and correct to the best of my knowledge and belief.'
    },
    users: isLEA ? [
      { 
        role: 'LEA Main User', 
        salutation: 'Dato\'',
        firstName: 'Ridzuan',
        lastName: 'Bin Mansor', 
        email: 'ridzuan.m@rmp.gov.my', 
        phone: '012-3456789', 
        designation: 'Assistant Superintendent',
        myKad: '720815-14-5678',
        department: 'Commercial Crime Investigation Department',
        altEmail: 'alternative@email.com',
        altPhone: '+60123456780',
      },
      { 
        role: 'LEA Secondary User', 
        salutation: 'Ms',
        firstName: 'Fatimah',
        lastName: 'Binti Ahmad', 
        email: 'fatimah.a@rmp.gov.my', 
        phone: '013-3456789', 
        designation: 'Inspector',
        myKad: '850101-10-1234',
        department: 'Cyber Crime Unit',
        altEmail: '',
        altPhone: '',
      }
    ] : [
      { 
        id: '1', 
        role: 'Licensee Admin', 
        salutation: 'Mr',
        firstName: 'Ariff',
        lastName: 'Kamal', 
        email: 'ariff@ninjavan.co', 
        phone: '019-8765432', 
        designation: 'Operations Director',
        myKad: '880220-08-4321',
        department: 'Operations',
        altEmail: 'ariff.alt@ninjavan.co',
        altPhone: '+60198765433',
      },
      { 
        id: '2', 
        role: 'Licensee Reporter', 
        salutation: 'Ms',
        firstName: 'Siti',
        lastName: 'Norhaliza', 
        email: 'siti.n@ninjavan.co', 
        phone: '011-22334455', 
        designation: 'Compliance Officer',
        myKad: '920303-03-5566',
        department: 'Legal & Compliance',
        altEmail: '',
        altPhone: '',
      },
      { 
        id: '3', 
        role: 'Licensee Reporter', 
        salutation: 'Mr',
        firstName: 'Tan',
        lastName: 'Kah Boon', 
        email: 'kb.tan@ninjavan.co', 
        phone: '016-55667788', 
        designation: 'Risk Manager',
        myKad: '851010-14-1122',
        department: 'Risk Management',
        altEmail: '',
        altPhone: '',
      }
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
    toast.error(`Application rejected. Notification sent to applicant.`);
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
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      designation: '',
      myKad: '',
      department: '',
      altEmail: '',
      altPhone: '',
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

  const removeDocument = (docId: string) => {
    setApplicationData(prev => ({
      ...prev,
      documents: prev.documents.map(doc => 
        doc.id === docId ? { ...doc, status: 'removed', name: doc.name + ' (Removed)' } : doc
      )
    }));
    toast.info("Document marked for removal.");
  };

  const replaceDocument = (docId: string) => {
    // In a real app, this would open a file picker
    const newDocName = prompt("Enter new document name (Mock upload):") || "New Document.pdf";
    setApplicationData(prev => ({
      ...prev,
      documents: prev.documents.map(doc => 
        doc.id === docId ? { 
          ...doc, 
          name: newDocName, 
          status: 'uploaded', 
          date: new Date().toISOString().split('T')[0],
          size: '1.2 MB',
          type: newDocName.split('.').pop()?.toUpperCase() || 'PDF'
        } : doc
      )
    }));
    toast.success("Document replaced successfully.");
  };

  const renderUserCard = (user: any, index: number) => (
    <Card key={index} className={cn(
      "border-border/40 shadow-sm relative group overflow-hidden",
      user.role.includes('Admin') || user.role.includes('Main') ? "bg-primary/5" : "bg-card"
    )}>
      {isEditing && applicationData.users.length > 1 && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={() => removeUser(index)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Salutation</Label>
            {isEditing ? (
              <Select value={user.salutation} onValueChange={(v) => updateUserField(index, 'salutation', v)}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr">Mr</SelectItem>
                  <SelectItem value="Ms">Ms</SelectItem>
                  <SelectItem value="Mrs">Mrs</SelectItem>
                  <SelectItem value="Dato'">Dato'</SelectItem>
                  <SelectItem value="Datin">Datin</SelectItem>
                  <SelectItem value="Dr">Dr</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm font-semibold text-slate-700">{user.salutation || '---'}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">First Name</Label>
            {isEditing ? (
              <Input value={user.firstName} onChange={(e) => updateUserField(index, 'firstName', e.target.value)} placeholder="First Name" className="h-10" />
            ) : (
              <p className="font-bold text-slate-900">{user.firstName || '---'}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Last Name</Label>
            {isEditing ? (
              <Input value={user.lastName} onChange={(e) => updateUserField(index, 'lastName', e.target.value)} placeholder="Last Name" className="h-10" />
            ) : (
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-900">{user.lastName || '---'}</span>
                <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-tighter w-fit h-4 px-1.5">{user.role}</Badge>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">MyKad / Passport No.</Label>
            {isEditing ? (
              <Input value={user.myKad} onChange={(e) => updateUserField(index, 'myKad', e.target.value)} placeholder="XXXXXX-XX-XXXX" className="h-10" />
            ) : (
              <p className="text-sm font-semibold text-slate-700">{user.myKad || '---'}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Designation</Label>
            {isEditing ? (
              <Input value={user.designation} onChange={(e) => updateUserField(index, 'designation', e.target.value)} placeholder="Official Title" className="h-10" />
            ) : (
              <p className="text-sm font-semibold text-slate-700">{user.designation || '---'}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Department</Label>
            {isEditing ? (
              <Input value={user.department} onChange={(e) => updateUserField(index, 'department', e.target.value)} placeholder="Working Unit" className="h-10" />
            ) : (
              <p className="text-sm font-semibold text-slate-700">{user.department || '---'}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Official Email Address</Label>
            {isEditing ? (
              <Input value={user.email} onChange={(e) => updateUserField(index, 'email', e.target.value)} placeholder="email@organisation.com" className="h-10" />
            ) : (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail className="h-3.5 w-3.5 text-blue-500" />
                {user.email || '---'}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Alt. Email (Optional)</Label>
            {isEditing ? (
              <Input value={user.altEmail} onChange={(e) => updateUserField(index, 'altEmail', e.target.value)} placeholder="Personal Email" className="h-10" />
            ) : (
              <p className="text-sm font-medium text-slate-500 italic">{user.altEmail || '---'}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Office Phone Number</Label>
            {isEditing ? (
              <Input value={user.phone} onChange={(e) => updateUserField(index, 'phone', e.target.value)} placeholder="+60..." className="h-10" />
            ) : (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="h-3.5 w-3.5 text-emerald-500" />
                {user.phone || '---'}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Alt. Phone No. (Optional)</Label>
            {isEditing ? (
              <Input value={user.altPhone} onChange={(e) => updateUserField(index, 'altPhone', e.target.value)} placeholder="Secondary Number" className="h-10" />
            ) : (
              <p className="text-sm font-medium text-slate-500 italic">{user.altPhone || '---'}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Company Name</Label>
                  {isEditing ? (
                    <Input value={applicationData.organisation} onChange={(e) => setApplicationData({...applicationData, organisation: e.target.value})} />
                  ) : (
                    <p className="font-semibold">{applicationData.organisation}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {applicationData.type === 'LEA' ? 'Agency Code' : 'Company Registration No.'}
                  </Label>
                  {isEditing ? (
                    <Input value={applicationData.companyInfo.regNumber} onChange={(e) => setApplicationData({...applicationData, companyInfo: {...applicationData.companyInfo, regNumber: e.target.value}})} />
                  ) : (
                    <p className="font-semibold">{applicationData.companyInfo.regNumber}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {applicationData.type === 'LEA' ? 'Agency Type' : 'License Type'}
                  </Label>
                  {isEditing ? (
                    <Input value={applicationData.companyInfo.orgSubType} onChange={(e) => setApplicationData({...applicationData, companyInfo: {...applicationData.companyInfo, orgSubType: e.target.value}})} />
                  ) : (
                    <p className="font-semibold">{applicationData.companyInfo.orgSubType}</p>
                  )}
                </div>

                <div className="md:col-span-2 mt-4 pb-2 border-b">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                    Official Address
                  </h4>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Address Line 1</Label>
                  {isEditing ? (
                    <Input value={applicationData.companyInfo.addressLine1} onChange={(e) => setApplicationData({...applicationData, companyInfo: {...applicationData.companyInfo, addressLine1: e.target.value}})} />
                  ) : (
                    <p className="text-sm">{applicationData.companyInfo.addressLine1}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Address Line 2 (Optional)</Label>
                  {isEditing ? (
                    <Input value={applicationData.companyInfo.addressLine2} onChange={(e) => setApplicationData({...applicationData, companyInfo: {...applicationData.companyInfo, addressLine2: e.target.value}})} />
                  ) : (
                    <p className="text-sm">{applicationData.companyInfo.addressLine2 || '---'}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ZIP / Postal Code</Label>
                  {isEditing ? (
                    <Input value={applicationData.companyInfo.zipCode} onChange={(e) => setApplicationData({...applicationData, companyInfo: {...applicationData.companyInfo, zipCode: e.target.value}})} />
                  ) : (
                    <p className="text-sm">{applicationData.companyInfo.zipCode}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">City / Municipality</Label>
                  {isEditing ? (
                    <Input value={applicationData.companyInfo.city} onChange={(e) => setApplicationData({...applicationData, companyInfo: {...applicationData.companyInfo, city: e.target.value}})} />
                  ) : (
                    <p className="text-sm">{applicationData.companyInfo.city}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">State</Label>
                  {isEditing ? (
                    <Input value={applicationData.companyInfo.state} onChange={(e) => setApplicationData({...applicationData, companyInfo: {...applicationData.companyInfo, state: e.target.value}})} />
                  ) : (
                    <p className="text-sm">{applicationData.companyInfo.state}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Country</Label>
                  {isEditing ? (
                    <Input value={applicationData.companyInfo.country} onChange={(e) => setApplicationData({...applicationData, companyInfo: {...applicationData.companyInfo, country: e.target.value}})} />
                  ) : (
                    <p className="text-sm">{applicationData.companyInfo.country}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                  {isEditing ? (
                    <Input value={applicationData.companyInfo.phone} onChange={(e) => setApplicationData({...applicationData, companyInfo: {...applicationData.companyInfo, phone: e.target.value}})} />
                  ) : (
                    <p className="font-medium">{applicationData.companyInfo.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Fax Number</Label>
                  {isEditing ? (
                    <Input value={applicationData.companyInfo.fax} onChange={(e) => setApplicationData({...applicationData, companyInfo: {...applicationData.companyInfo, fax: e.target.value}})} />
                  ) : (
                    <p className="font-medium">{applicationData.companyInfo.fax || '---'}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
 
          {/* Attached Documents */}
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 border-b py-4">
              <div className="flex items-center gap-2">
                <Paperclip className="h-4 w-4 text-primary" />
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-800">Attached Documents</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {applicationData.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center",
                        doc.status === 'removed' ? "bg-slate-100" : (doc.id === 'doc1' ? "bg-blue-500/10" : "bg-amber-500/10")
                      )}>
                        <FileText className={cn(
                          "h-5 w-5",
                          doc.status === 'removed' ? "text-slate-400" : (doc.id === 'doc1' ? "text-blue-600" : "text-amber-600")
                        )} />
                      </div>
                      <div>
                        <p className={cn(
                          "text-sm font-bold",
                          doc.status === 'removed' ? "text-slate-400 line-through" : "text-slate-800"
                        )}>{doc.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                          {doc.status === 'removed' ? 'Pending Removal' : `${doc.type} • ${doc.size} • Uploaded ${doc.date}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isEditing ? (
                        <Button variant="outline" size="sm" className="h-9 px-4 border-slate-200 text-slate-600 hover:bg-slate-600 hover:text-white transition-all font-bold uppercase tracking-widest text-[10px]">
                          <Download className="mr-2 h-3.5 w-3.5" /> Download
                        </Button>
                      ) : (
                        <>
                          {doc.status !== 'removed' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-9 w-9 text-red-500 hover:bg-red-50 hover:text-red-600"
                              onClick={() => removeDocument(doc.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-9 px-4 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all font-bold uppercase tracking-widest text-[10px]"
                            onClick={() => replaceDocument(doc.id)}
                          >
                            <Edit2 className="mr-2 h-3.5 w-3.5" /> {doc.status === 'removed' ? 'Restore & Replace' : 'Replace'}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
 
          {/* User Information */}
          <div className="space-y-8">
            {/* Administrative Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">Administrative Users</h3>
              </div>
              <div className="grid gap-4">
                {applicationData.users
                  .filter((u: any) => u.role.includes('Admin') || u.role.includes('Main'))
                  .map((user: any) => {
                    const originalIndex = applicationData.users.findIndex((u: any) => u === user);
                    return renderUserCard(user, originalIndex);
                  })}
              </div>
            </div>
 
            {/* Reporter Section(s) */}
            {applicationData.type === 'Licensee' ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-emerald-600" />
                      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">Licensee Reporter 1 Details</h3>
                    </div>
                  </div>
                  {applicationData.users
                    .filter((u: any) => u.role.includes('Reporter'))
                    .slice(0, 1)
                    .map((user: any) => {
                      const originalIndex = applicationData.users.findIndex((u: any) => u === user);
                      return renderUserCard(user, originalIndex);
                    })}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-emerald-600" />
                      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">Licensee Reporter 2 Details</h3>
                    </div>
                  </div>
                  {applicationData.users
                    .filter((u: any) => u.role.includes('Reporter'))
                    .slice(1, 2)
                    .map((user: any) => {
                      const originalIndex = applicationData.users.findIndex((u: any) => u === user);
                      return renderUserCard(user, originalIndex);
                    })}
                  {applicationData.users.filter((u: any) => u.role.includes('Reporter')).length < 2 && (
                    <div className="p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-slate-50/50">
                      <Users className="h-8 w-8 mb-2 opacity-20" />
                      <p className="text-xs font-medium uppercase tracking-widest">Reporter 2 not assigned</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-emerald-600" />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">Secondary Users</h3>
                  </div>
                </div>
                <div className="grid gap-4">
                  {applicationData.users
                    .filter((u: any) => u.role.includes('Secondary'))
                    .map((user: any) => {
                      const originalIndex = applicationData.users.findIndex((u: any) => u === user);
                      return renderUserCard(user, originalIndex);
                    })}
                </div>
              </div>
            )}
          </div>

          {/* Authorization & Declaration */}
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 border-b py-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-800">Authorization & Declaration</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Authorized Person Name</Label>
                  {isEditing ? (
                    <Input value={applicationData.authorization.name} onChange={(e) => setApplicationData({...applicationData, authorization: {...applicationData.authorization, name: e.target.value}})} />
                  ) : (
                    <p className="font-semibold">{applicationData.authorization.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Authorized Person Position</Label>
                  {isEditing ? (
                    <Input value={applicationData.authorization.position} onChange={(e) => setApplicationData({...applicationData, authorization: {...applicationData.authorization, position: e.target.value}})} />
                  ) : (
                    <p className="font-semibold">{applicationData.authorization.position}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Date of Submission</Label>
                  <p className="font-semibold">{applicationData.authorization.submissionDate}</p>
                </div>
                <div className="md:col-span-2 space-y-2 mt-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Declaration</Label>
                  <div className="p-4 bg-slate-50 border rounded-lg italic text-sm text-slate-600">
                    "{applicationData.authorization.declaration}"
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Bar */}
          {!isEditing && applicationData.status === 'submitted' && (
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/40">
              <Button 
                variant="outline" 
                className="text-red-500 border-red-500/20 hover:bg-red-500/5 font-bold uppercase tracking-widest text-[10px] h-10 px-8"
                onClick={handleReject}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject Application
              </Button>

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
                            <span className="font-bold">{user.firstName} {user.lastName}</span>
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
