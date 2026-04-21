import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Building2, Calendar, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function NominationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/super-admin/nominations')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nomination Submission Detail</h1>
          <p className="text-muted-foreground mt-1 text-sm font-mono uppercase">Reference: {id || 'NOM-2026-0042'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b bg-accent/20">
              <CardTitle className="text-base">Submitted Form Data</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Proposed Full Name</p>
                  <p className="font-semibold">Mohd Zulhairi Bin Abdullah</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Proposed Email</p>
                  <p className="font-semibold">zulhairi@pos.com.my</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Designation</p>
                  <p className="font-semibold">Senior Manager IT Security</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Organisation Type</p>
                  <p className="font-semibold text-primary italic">Public Utility (Licensee)</p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/50 border space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest">Supporting Documents</p>
                <div className="flex items-center gap-4 p-3 bg-background rounded border">
                  <div className="h-10 w-10 bg-accent rounded flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Appointment_Letter.pdf</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">2.4 MB • Verified Virus-Free</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/5 uppercase font-bold text-xs tracking-wider">Reject Submission</Button>
            <Button className="bg-green-600 hover:bg-green-700 uppercase font-bold text-xs tracking-wider px-8">Approve & Send Activation</Button>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest">Nomination Audit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Sent: 2026-03-01</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-primary" />
                <span>Invited By: Ahmad Faiz</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Status: Submitted</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
