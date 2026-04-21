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
  AlertTriangle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoleChip } from '@/components/RoleChip';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

export default function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const mockUser = {
    id: 'USR-001',
    name: 'Ahmad Faiz',
    email: 'afaiz@mcmc.gov.my',
    role: 'super-admin' as any,
    organisation: 'Malaysian Communications and Multimedia Commission',
    status: 'active',
    mfa: true,
    lastLogin: '2026-03-08 09:30:12',
    ip: '10.20.0.12',
    createdDate: '2025-01-15',
    createdBy: 'System Initializer',
    avatar: 'AF'
  };

  const activities = [
    { id: 1, action: 'Delete Case Report', target: 'PSIR-2026-0082', module: 'Case Governance', time: '5 mins ago', severity: 'critical' },
    { id: 2, action: 'Modified System Label', target: 'Incident Categories', module: 'Master Data', time: '2 hours ago', severity: 'medium' },
    { id: 3, action: 'Platform Login', target: 'Kuala Lumpur, MY', module: 'Authentication', time: '4 hours ago', severity: 'low' },
    { id: 4, action: 'Sent Nomination Invitation', target: 'Ninja Van Malaysia', module: 'Nomination', time: '1 day ago', severity: 'low' },
    { id: 5, action: 'Updated Security Policy', target: 'Password Complexity', module: 'Security Settings', time: '2 days ago', severity: 'high' },
  ];

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} request has been processed for ${mockUser.name}.`,
    });
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
              {mockUser.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{mockUser.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <RoleChip role={mockUser.role} />
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 py-0 px-2 uppercase text-[9px] font-bold">Active</Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleAction('Reset Password')}>
            <Key className="mr-2 h-4 w-4" />
            Reset Password
          </Button>
          <Button variant="destructive" onClick={() => handleAction('Lock Account')}>
            <UserX className="mr-2 h-4 w-4" />
            Deactivate User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-accent/20 border-b py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">User Overview</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="space-y-0.5 text-sm">
                    <p className="font-bold text-xs uppercase tracking-tighter text-muted-foreground">Email Address</p>
                    <p>{mockUser.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="space-y-0.5 text-sm">
                    <p className="font-bold text-xs uppercase tracking-tighter text-muted-foreground">Organisation</p>
                    <p>{mockUser.organisation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="space-y-0.5 text-sm">
                    <p className="font-bold text-xs uppercase tracking-tighter text-muted-foreground">Last Login</p>
                    <p className="font-mono text-xs">{mockUser.lastLogin}</p>
                    <p className="text-[10px] text-muted-foreground">Source IP: {mockUser.ip}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="space-y-0.5 text-sm">
                    <p className="font-bold text-xs uppercase tracking-tighter text-muted-foreground">Security Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      {mockUser.mfa ? (
                        <Badge variant="outline" className="text-green-500 bg-green-500/5 py-0 px-1.5 text-[9px] font-bold">MFA ENABLED</Badge>
                      ) : (
                        <Badge variant="outline" className="text-destructive bg-destructive/5 py-0 px-1.5 text-[9px] font-bold">MFA DISABLED</Badge>
                      )}
                      <Badge variant="outline" className="text-blue-500 bg-blue-500/5 py-0 px-1.5 text-[9px] font-bold">SSO SYNCED</Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t space-y-1">
                <p className="text-[10px] text-muted-foreground">User created on {mockUser.createdDate} by {mockUser.createdBy}</p>
                <p className="text-[10px] text-muted-foreground">Internal System ID: {mockUser.id}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 shadow-sm">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Administrative Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-xs font-semibold" onClick={() => handleAction('Edit User')}>
                <Edit2 className="mr-2 h-4 w-4" />
                Change Details
              </Button>
              <Button variant="outline" className="w-full justify-start text-xs font-semibold" onClick={() => handleAction('Change Role')}>
                <Lock className="mr-2 h-4 w-4" />
                Update Role / Permissions
              </Button>
              <Button variant="outline" className="w-full justify-start text-xs font-semibold" onClick={() => handleAction('Force Reset')}>
                <Unlock className="mr-2 h-4 w-4" />
                Force Password Reset
              </Button>
              <Button variant="ghost" className="w-full justify-start text-xs font-semibold text-destructive hover:bg-destructive/10" onClick={() => handleAction('Delete User')}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account Record
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="w-full bg-muted/30 p-1 border border-border/40 mb-4 h-11">
              <TabsTrigger value="activity" className="flex-1 py-1.5 font-bold uppercase tracking-wider text-[10px]">
                <Activity className="h-3 w-3 mr-2" />
                Activity Timeline
              </TabsTrigger>
              <TabsTrigger value="sessions" className="flex-1 py-1.5 font-bold uppercase tracking-wider text-[10px]">
                <Monitor className="h-3 w-3 mr-2" />
                Active Sessions
              </TabsTrigger>
              <TabsTrigger value="history" className="flex-1 py-1.5 font-bold uppercase tracking-wider text-[10px]">
                <Database className="h-3 w-3 mr-2" />
                System Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <Card className="border-border/40 shadow-sm min-h-[500px]">
                <CardHeader>
                  <CardTitle className="text-base">Administrative Activity Audit</CardTitle>
                  <CardDescription>Continuous tracking of actions performed by this user.</CardDescription>
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
                        <div className="flex-1 p-3 rounded-lg border bg-accent/30 group hover:border-primary/20 transition-all cursor-default">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{act.module}</span>
                            <span className="text-[10px] text-muted-foreground">{act.time}</span>
                          </div>
                          <p className="text-sm font-medium">
                            {act.action} on <span className="font-mono text-xs">{act.target}</span>
                          </p>
                          <div className="mt-2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-primary group-hover:underline cursor-pointer">
                            View Log Detail <ChevronRight className="h-2.5 w-2.5 ml-1" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6 flex justify-center">
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                      Load Older History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sessions">
              <div className="p-12 text-center bg-accent/10 rounded-xl border border-dashed border-border/60">
                <AlertTriangle className="h-8 w-8 text-muted-foreground/40 mx-auto mb-4" />
                <p className="text-sm font-medium text-muted-foreground">Session tracking functionality is disabled in demo mode.</p>
                <p className="text-xs text-muted-foreground/60 mt-1 italic">Contact system engineering for real-time traffic monitoring keys.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
