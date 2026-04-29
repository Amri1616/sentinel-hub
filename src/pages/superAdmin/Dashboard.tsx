import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileSignature, 
  ShieldAlert, 
  Trash2, 
  History, 
  Settings, 
  UserPlus, 
  Send, 
  Database,
  Activity,
  ArrowUpRight,
  UserCheck,
  UserX,
  FileText,
  AlertCircle,
  Lock,
  ShieldCheck,
  AppWindow,
  Scale
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  const userStats = [
    { label: 'Total Users', value: '1,284', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Active Users', value: '1,150', icon: UserCheck, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Inactive / Locked', value: '134', icon: UserX, color: 'text-destructive', bg: 'bg-destructive/10' },
  ];

  const applicationStats = [
    { label: 'Pending Review', value: '42', icon: FileSignature, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Approved', value: '156', icon: FileText, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  ];

  const reportStats = [
    { label: 'Total Incidents', value: '3,842', icon: ShieldAlert, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Removed Cases', value: '12', icon: Trash2, color: 'text-destructive', bg: 'bg-destructive/10' },
  ];

  const auditData = [
    { day: 'Mon', activities: 120 },
    { day: 'Tue', activities: 150 },
    { day: 'Wed', activities: 180 },
    { day: 'Thu', activities: 140 },
    { day: 'Fri', activities: 210 },
    { day: 'Sat', activities: 50 },
    { day: 'Sun', activities: 30 },
  ];

  const loginTrendData = [
    { name: '08:00', users: 120 },
    { name: '10:00', users: 450 },
    { name: '12:00', users: 380 },
    { name: '14:00', users: 520 },
    { name: '16:00', users: 480 },
    { name: '18:00', users: 210 },
    { name: '20:00', users: 90 },
  ];

  const recentActivities = [
    { id: 1, user: 'Ahmad Faiz', action: 'Approved Application', target: 'Ninja Van Malaysia', time: '5 mins ago', type: 'application' },
    { id: 2, user: 'System', action: 'Bi-directional sync', target: 'MCMC Database', time: '15 mins ago', type: 'system' },
    { id: 3, user: 'Super Admin', action: 'Soft-deleted case', target: 'PSIR-2026-0082', time: '1 hour ago', type: 'case' },
    { id: 4, user: 'Ahmad Faiz', action: 'Updated Master Data', target: 'LEA Acronyms', time: '2 hours ago', type: 'system' },
    { id: 5, user: 'System', action: 'Auto-locked user', target: 'lim@pdrm.gov.my', time: '3 hours ago', type: 'security' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Governance Dashboard</h1>
          <p className="text-muted-foreground mt-1">Unified system-level oversight and administrative control.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate('/super-admin/users/new')} size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Create User Manually
          </Button>
        </div>
      </div>

      {/* Summary Cards with Drill-down */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* User Summary */}
        <Card className="col-span-1 cursor-pointer hover:border-primary/40 transition-colors" onClick={() => navigate('/super-admin/users')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">User Population</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,284</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-green-500 border-green-500/10 bg-green-500/5 text-[10px]">1,150 ACTIVE</Badge>
              <Badge variant="outline" className="text-destructive border-destructive/10 bg-destructive/5 text-[10px]">134 LOCKED</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Application Summary */}
        <Card className="col-span-1 cursor-pointer hover:border-primary/40 transition-colors" onClick={() => navigate('/super-admin/applications')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Applications</CardTitle>
            <AppWindow className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              Pending System Onboarding
            </div>
          </CardContent>
        </Card>

        {/* Case Summary */}
        <Card className="col-span-1 cursor-pointer hover:border-primary/40 transition-colors" onClick={() => navigate('/super-admin/cases')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Escalated Cases</CardTitle>
            <Scale className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
            <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              Active LEA Investigation
            </div>
          </CardContent>
        </Card>

        {/* Health Summary */}
        <Card className="col-span-1 cursor-pointer hover:border-primary/40 transition-colors" onClick={() => navigate('/super-admin/logs')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">System Health</CardTitle>
            <Activity className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">OPTIMAL</div>
            <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              Audit Trails Synchronized
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Quick Actions */}
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Governance Hub</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-2">
            <Button variant="outline" className="justify-start h-auto py-3 px-4 border-border/40 hover:bg-accent/30" onClick={() => navigate('/super-admin/users')}>
              <Users className="mr-3 h-5 w-5 text-blue-500" />
              <div className="text-left">
                <div className="font-bold text-sm">User Management</div>
                <div className="text-[10px] text-muted-foreground">Governance and role assignment</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 px-4 border-border/40 hover:bg-accent/30" onClick={() => navigate('/super-admin/master-data')}>
              <Database className="mr-3 h-5 w-5 text-indigo-500" />
              <div className="text-left">
                <div className="font-bold text-sm">Master Data Control</div>
                <div className="text-[10px] text-muted-foreground">System categories and constants</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 px-4 border-border/40 hover:bg-accent/30" onClick={() => navigate('/super-admin/logs')}>
              <History className="mr-3 h-5 w-5 text-amber-500" />
              <div className="text-left">
                <div className="font-bold text-sm">Audit Trail Records</div>
                <div className="text-[10px] text-muted-foreground">Track all mutation activities</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 px-4 border-border/40 hover:bg-accent/30" onClick={() => navigate('/super-admin/cases')}>
              <Scale className="mr-3 h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-bold text-sm">Case Governance</div>
                <div className="text-[10px] text-muted-foreground">Administrative oversight of cases</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* System Activity Chart */}
        <Card className="col-span-full lg:col-span-5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Global Activity Trend</CardTitle>
            <Badge variant="secondary" className="text-[10px] font-bold">REAL-TIME TRAFFIC</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={loginTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Audit Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/40 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Critical Governance Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg bg-accent/20 border border-border/40 group hover:border-primary/20 transition-all">
                  <div className={cn(
                    "p-2 rounded-full",
                    activity.type === 'application' ? "bg-blue-500/10 text-blue-500" :
                    activity.type === 'case' ? "bg-destructive/10 text-destructive" :
                    "bg-primary/10 text-primary"
                  )}>
                    {activity.type === 'application' ? <AppWindow className="h-4 w-4" /> :
                     activity.type === 'case' ? <Trash2 className="h-4 w-4" /> :
                     <Activity className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-medium text-muted-foreground">{activity.target}</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-widest">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Mutation Frequency (Weekly)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={auditData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="activities" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

