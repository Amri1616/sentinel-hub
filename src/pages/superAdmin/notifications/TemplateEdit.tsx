import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Mail, 
  Code, 
  Copy,
  Plus,
  Info,
  History,
  CheckCircle2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function TemplateEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Template Saved",
      description: "Changes to the notification template have been applied.",
    });
    navigate('/super-admin/notifications');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/super-admin/notifications')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Notification Template</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest bg-blue-500/5 text-blue-500 border-blue-500/20">EMAIL CHANNEL</Badge>
              <p className="text-muted-foreground text-sm font-mono">{id || 'TPL-EM-001'}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Send Test
          </Button>
          <Button onClick={handleSave} className="bg-primary px-8 shadow-lg shadow-primary/20">
            <Save className="mr-2 h-4 w-4" />
            Update Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-accent/20 border-b py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Notification Content</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest">Notification Subject</Label>
                <Input defaultValue="PSIRP - Activate Your Account" className="font-semibold" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs font-bold uppercase tracking-widest">Email Body (HTML/Text)</Label>
                  <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-wider gap-1">
                    <Code className="h-3 w-3" /> Source Code
                  </Button>
                </div>
                <Textarea 
                  className="min-h-[400px] font-mono text-sm leading-relaxed p-6 bg-accent/10" 
                  defaultValue={`Dear {{user_name}},\n\nYou have been nominated as a Licensee Administrator for the MCMC Postal Security Incident Reporting Platform (PSIRP).\n\nPlease click the button below to activate your account and set up your security credentials:\n\n[ {{activation_link}} ]\n\nIf you did not expect this invitation, please contact the MCMC IT Helpdesk at ITHelpdesk@mcmc.gov.my.\n\nThank you,\nMCMC PSIRP System Admin`}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="py-4 border-b">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <Plus className="h-3.5 w-3.5" /> Available Variables
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {[
                { name: 'user_name', desc: 'Recipient full name' },
                { name: 'activation_link', desc: 'Secure unique URL' },
                { name: 'platform_name', desc: 'Full system title' },
                { name: 'expiry_date', desc: 'Link expiration time' },
              ].map((v) => (
                <div key={v.name} className="p-2.5 rounded border bg-accent/30 group hover:border-primary/40 transition-all cursor-copy" onClick={() => {
                  navigator.clipboard.writeText(`{{${v.name}}}`);
                  toast({ title: "Copied!", description: `{{${v.name}}} ready to paste.` });
                }}>
                  <div className="flex items-center justify-between">
                    <code className="text-[11px] font-bold text-primary">{"{{"}{v.name}{"}}"}</code>
                    <Copy className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{v.desc}</p>
                </div>
              ))}
              <div className="pt-2">
                <p className="text-[10px] text-muted-foreground italic flex items-start gap-2">
                  <Info className="h-3 w-3 shrink-0 mt-0.5" />
                  Variables are case-sensitive and must be enclosed in double curly braces.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 shadow-sm bg-accent/10">
            <CardHeader className="py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <History className="h-3.5 w-3.5" /> Recent Versions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium">v2.1 (Current)</span>
                <span className="text-muted-foreground">Mar 08, 09:30</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="font-medium">v2.0</span>
                <span className="text-muted-foreground">Feb 15, 14:20</span>
              </div>
              <Button variant="ghost" size="sm" className="w-full text-[10px] font-bold uppercase tracking-widest mt-2">
                View Revision History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
