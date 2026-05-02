import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Building2, 
  Phone, 
  ShieldCheck, 
  Edit2, 
  Save, 
  History,
  AlertCircle,
  Clock,
  UserCheck,
  UserX
} from 'lucide-react';
import { toast } from "sonner";

export default function LicenseeUserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock data state
  const [userData, setUserData] = useState({
    id: id || '1',
    name: 'Ariff Kamal',
    email: 'ariff@ninjavan.co',
    role: 'Licensee Admin',
    organisation: 'Ninja Van Malaysia',
    status: 'active',
    phone: '019-8765432',
    designation: 'Operations Director',
    department: 'Logistics Operations',
    myKad: '880220-08-4321',
    altEmail: 'ariff.alt@ninjavan.co',
    altPhone: '+60198765433',
    lastLogin: '2026-05-01 09:30'
  });

  const [editForm, setEditForm] = useState({
    designation: userData.designation,
    department: userData.department,
    altEmail: userData.altEmail,
    altPhone: userData.altPhone
  });

  const handleSave = () => {
    setUserData(prev => ({
      ...prev,
      ...editForm
    }));
    setIsEditing(false);
    toast.success("User profile updated successfully.");
  };

  const toggleStatus = () => {
    const newStatus = userData.status === 'active' ? 'inactive' : 'active';
    setUserData(prev => ({ ...prev, status: newStatus }));
    toast.info(`Account ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/super-admin/licensee-users')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              {userData.name}
              <Badge variant="outline" className={userData.status === 'active' ? "bg-green-500/10 text-green-600 border-green-500/20 uppercase text-[10px] font-bold" : "bg-slate-500/10 text-slate-600 border-slate-500/20 uppercase text-[10px] font-bold"}>
                {userData.status}
              </Badge>
            </h1>
            <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
              <Mail className="h-3 w-3" />
              {userData.email}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="h-9 border-blue-200 text-blue-600 hover:bg-blue-50">
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button onClick={() => setIsEditing(false)} variant="ghost" size="sm" className="h-9">Cancel</Button>
              <Button onClick={handleSave} size="sm" className="h-9 bg-blue-600 hover:bg-blue-700 text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className={userData.status === 'active' ? "h-9 text-red-500 border-red-200 hover:bg-red-50" : "h-9 text-green-600 border-green-200 hover:bg-green-50"}
            onClick={toggleStatus}
          >
            {userData.status === 'active' ? (
              <><UserX className="mr-2 h-4 w-4" /> Deactivate</>
            ) : (
              <><UserCheck className="mr-2 h-4 w-4" /> Activate</>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 border-b py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-800">User Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-md border border-slate-100">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-slate-900">{userData.name}</span>
                </div>
                <p className="text-[9px] text-muted-foreground font-medium italic">Cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">MyKad No</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-md border border-slate-100">
                  <span className="font-semibold text-slate-900">{userData.myKad}</span>
                </div>
                <p className="text-[9px] text-muted-foreground font-medium italic">Cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Designation</Label>
                {isEditing ? (
                  <Input 
                    value={editForm.designation} 
                    onChange={(e) => setEditForm({...editForm, designation: e.target.value})} 
                    className="h-11 bg-white border-blue-200 focus:border-blue-500"
                  />
                ) : (
                  <div className="p-3 bg-card rounded-md border border-slate-200 font-medium text-slate-700">
                    {userData.designation}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Department</Label>
                {isEditing ? (
                  <Input 
                    value={editForm.department} 
                    onChange={(e) => setEditForm({...editForm, department: e.target.value})} 
                    className="h-11 bg-white border-blue-200 focus:border-blue-500"
                  />
                ) : (
                  <div className="p-3 bg-card rounded-md border border-slate-200 font-medium text-slate-700">
                    {userData.department}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-md border border-slate-100">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-slate-900">{userData.email}</span>
                </div>
                <p className="text-[9px] text-muted-foreground font-medium italic">Cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Optional Alternative Email</Label>
                {isEditing ? (
                  <Input 
                    type="email"
                    value={editForm.altEmail} 
                    onChange={(e) => setEditForm({...editForm, altEmail: e.target.value})} 
                    className="h-11 bg-white border-blue-200 focus:border-blue-500"
                  />
                ) : (
                  <div className="p-3 bg-card rounded-md border border-slate-200 font-medium text-slate-700">
                    {userData.altEmail || '---'}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone No</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-md border border-slate-100">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-slate-900">{userData.phone}</span>
                </div>
                <p className="text-[9px] text-muted-foreground font-medium italic">Cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Optional Alternative Phone No</Label>
                {isEditing ? (
                  <Input 
                    type="tel"
                    value={editForm.altPhone} 
                    onChange={(e) => setEditForm({...editForm, altPhone: e.target.value})} 
                    className="h-11 bg-white border-blue-200 focus:border-blue-500"
                  />
                ) : (
                  <div className="p-3 bg-card rounded-md border border-slate-200 font-medium text-slate-700">
                    {userData.altPhone || '---'}
                  </div>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">System Role</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-md border border-slate-100">
                  <ShieldCheck className="h-4 w-4 text-blue-500" />
                  <span className="font-bold text-blue-700 uppercase tracking-tighter text-sm">{userData.role}</span>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Organization</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-md border border-slate-100">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-slate-900">{userData.organisation}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 shadow-sm bg-blue-500/5 border-blue-500/10">
            <CardContent className="p-4 flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-blue-900 uppercase tracking-widest">Administrative Constraint</h4>
                <p className="text-xs text-blue-700/80 leading-relaxed">
                  As per the Governance & Compliance framework, Superadmins are restricted from modifying a Licensee user's core identity (Name, MyKad, Email, Phone) or Organization. 
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 border-b py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-800">Account Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted-foreground uppercase tracking-tighter">
                  <Clock className="h-3.5 w-3.5" />
                  Last Login
                </div>
                <span className="font-bold text-slate-900">{userData.lastLogin}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
