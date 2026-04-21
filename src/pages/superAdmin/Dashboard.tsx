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
  ShieldCheck
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

  const nominationStats = [
    { label: 'Pending Forms', value: '42', icon: FileSignature, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Submitted Forms', value: '156', icon: FileText, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
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
    { id: 1, user: 'Admin User', action: 'Created new user', target: 'John Doe', time: '5 mins ago', type: 'user' },
    { id: 2, user: 'System', action: 'Nomination form approved', target: 'Global Express', time: '15 mins ago', type: 'nomination' },
    { id: 3, user: 'Super Admin', action: 'Deleted case report', target: 'PSIR-2026-0082', time: '1 hour ago', type: 'case' },
    { id: 4, user: 'Admin User', action: 'Updated Master Data', target: 'Incident Categories', time: '2 hours ago', type: 'system' },
    { id: 5, user: 'System', action: 'MFA Disabled for user', target: 'Ahmad Faiz', time: '3 hours ago', type: 'security' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">System Governance & Oversight Management</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate('/super-admin/users/new')} size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Create User
          </Button>
          <Button onClick={() => navigate('/super-admin/nominations/new')} variant="secondary" size="sm">
            <Send className="mr-2 h-4 w-4" />
            Send Nomination
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* User Summary */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Governance</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/5">1,150 Active</Badge>
              <Badge variant="outline" className="text-destructive border-destructive/20 bg-destructive/5">134 Locked</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Nomination Summary */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nomination Pipeline</CardTitle>
            <FileSignature className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">198</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-amber-500 border-amber-500/20 bg-amber-500/5">42 Pending</Badge>
              <Badge variant="outline" className="text-indigo-500 border-indigo-500/20 bg-indigo-500/5">156 Submitted</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Case Summary */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Incidents</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,842</div>
            <div className="flex items-center gap-2 mt-2 font-medium text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><ArrowUpRight className="h-3 w-3 text-green-500" /> +12% this month</span>
            </div>
          </CardContent>
        </Card>

        {/* Audit/Health Summary */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Integrity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-destructive border-destructive/20 bg-destructive/5">12 Cases Deleted</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Quick Actions */}
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-2">
            <Button variant="outline" className="justify-start h-auto py-3 px-4" onClick={() => navigate('/super-admin/users')}>
              <Users className="mr-3 h-5 w-5 text-blue-500" />
              <div className="text-left">
                <div className="font-semibold text-sm">Manage Users</div>
                <div className="text-[10px] text-muted-foreground">Governance and role assignment</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 px-4" onClick={() => navigate('/super-admin/master-data')}>
              <Database className="mr-3 h-5 w-5 text-indigo-500" />
              <div className="text-left">
                <div className="font-semibold text-sm">Master Data</div>
                <div className="text-[10px] text-muted-foreground">System categories and settings</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 px-4" onClick={() => navigate('/super-admin/logs')}>
              <History className="mr-3 h-5 w-5 text-amber-500" />
              <div className="text-left">
                <div className="font-semibold text-sm">Audit Logs</div>
                <div className="text-[10px] text-muted-foreground">Track all system activities</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 px-4" onClick={() => navigate('/super-admin/deleted-cases')}>
              <Trash2 className="mr-3 h-5 w-5 text-destructive" />
              <div className="text-left">
                <div className="font-semibold text-sm">Deleted Cases</div>
                <div className="text-[10px] text-muted-foreground">View and manage removed records</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 px-4" onClick={() => navigate('/super-admin/settings')}>
              <Settings className="mr-3 h-5 w-5 text-gray-400" />
              <div className="text-left">
                <div className="font-semibold text-sm">System Settings</div>
                <div className="text-[10px] text-muted-foreground">SMTP, SSO, and platform config</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Login Trends / System Health */}
        <Card className="col-span-full lg:col-span-5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">System Activity Summary</CardTitle>
            <Badge variant="outline">Last 24 Hours</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={loginTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      borderColor: 'hsl(var(--border))' 
                    }}
                    itemStyle={{ color: 'hsl(var(--primary))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 border rounded-lg bg-accent/30">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Peak Concurrent</div>
                <div className="text-xl font-bold">520</div>
              </div>
              <div className="text-center p-3 border rounded-lg bg-accent/30">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Actions</div>
                <div className="text-xl font-bold">3,248</div>
              </div>
              <div className="text-center p-3 border rounded-lg bg-accent/30">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Error Rate</div>
                <div className="text-xl font-bold text-green-500">0.02%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {/* Recent System Activities */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent System Activities</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate('/super-admin/logs')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className={cn(
                    "p-2 rounded-full",
                    activity.type === 'user' ? "bg-blue-500/10 text-blue-500" :
                    activity.type === 'nomination' ? "bg-indigo-500/10 text-indigo-500" :
                    activity.type === 'case' ? "bg-destructive/10 text-destructive" :
                    activity.type === 'security' ? "bg-amber-500/10 text-amber-500" :
                    "bg-gray-500/10 text-gray-500"
                  )}>
                    {activity.type === 'user' ? <UserPlus className="h-4 w-4" /> :
                     activity.type === 'nomination' ? <FileText className="h-4 w-4" /> :
                     activity.type === 'case' ? <Trash2 className="h-4 w-4" /> :
                     activity.type === 'security' ? <Lock className="h-4 w-4" /> :
                     <Activity className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audit Data Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Audit Activity Weekly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={auditData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--accent))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      borderColor: 'hsl(var(--border))' 
                    }}
                  />
                  <Bar 
                    dataKey="activities" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
