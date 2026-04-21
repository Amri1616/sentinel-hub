import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  AreaChart,
  Area,
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { 
  Activity, 
  Users, 
  ShieldAlert, 
  Trash2, 
  History, 
  AlertCircle, 
  TrendingUp,
  Download,
  Calendar,
  Filter,
  Monitor,
  Zap,
  Globe
} from 'lucide-react';

const loginData = [
  { time: '00:00', users: 120 }, { time: '04:00', users: 80 }, { time: '08:00', users: 450 },
  { time: '12:00', users: 820 }, { time: '16:00', users: 950 }, { time: '20:00', users: 380 },
];

const healthData = [
  { name: 'Incidents', status: 'Operational', uptime: '99.99%', load: 42 },
  { name: 'Auth/MFA', status: 'Operational', uptime: '99.98%', load: 15 },
  { name: 'Notification', status: 'Operational', uptime: '99.95%', load: 28 },
  { name: 'Analytics', status: 'Degraded', uptime: '98.50%', load: 88 },
];

const regionalTraffic = [
  { name: 'Kuala Lumpur', value: 450, color: 'hsl(var(--primary))' },
  { name: 'Johor Bahru', value: 300, color: 'hsl(220 70% 50%)' },
  { name: 'Penang', value: 180, color: 'hsl(190 70% 50%)' },
  { name: 'Others', value: 120, color: 'hsl(var(--muted))' },
];

export default function Monitoring() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Monitoring</h1>
          <p className="text-muted-foreground mt-1">Real-time oversight of platform activity, security incidents, and technical health.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Live Feed
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Generate Status Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/40 shadow-sm relative overflow-hidden bg-primary/[0.02]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Zap className="h-3 w-3 text-primary animate-pulse" />
              Live Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,482</div>
            <div className="flex items-center gap-1 mt-2 text-[10px] text-green-500 font-bold uppercase">
              <TrendingUp className="h-3 w-3" />
              +15% from last hour
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm relative overflow-hidden bg-destructive/[0.02]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <AlertCircle className="h-3 w-3 text-destructive" />
              Recent Errors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">8</div>
            <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground uppercase font-bold">
              Critical Exceptions
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm bg-accent/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Notification Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">99.2%</div>
            <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground uppercase font-bold">
              Success Rate (MTD)
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm bg-accent/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">DB Health Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">Excellent</div>
            <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground uppercase font-bold">
              Latency: 12ms avg
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Traffic Chart */}
        <Card className="lg:col-span-2 border-border/40 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-accent/20 py-4">
            <div>
              <CardTitle className="text-base font-bold">User Traffic Intensity</CardTitle>
              <CardDescription>Continuous monitoring of platform concurrent users.</CardDescription>
            </div>
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">Real-time Feed</Badge>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={loginData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" fontSize={12} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Global Access Distribution */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="border-b bg-accent/20 py-4">
            <CardTitle className="text-base font-bold">Regional Access Distribution</CardTitle>
            <CardDescription>Login source by geographical region.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionalTraffic}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {regionalTraffic.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {regionalTraffic.map((region) => (
                <div key={region.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: region.color }} />
                    <span className="font-medium">{region.name}</span>
                  </div>
                  <span className="font-bold">{region.value} users</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {/* System Health Status */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="border-b bg-accent/20 py-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-bold">Platform Microservices Health</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x border-b">
              {healthData.map((service) => (
                <div key={service.name} className="p-5 flex flex-col gap-4 hover:bg-accent/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{service.name}</span>
                    <Badge variant="outline" className={service.status === 'Operational' ? 'text-green-500 bg-green-500/5' : 'text-destructive bg-destructive/5'}>
                      {service.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">Uptime</span>
                      <span className="text-xs font-bold">{service.uptime}</span>
                    </div>
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: service.uptime }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">Load Indicator</span>
                      <span className={service.load > 80 ? 'text-xs font-bold text-destructive' : 'text-xs font-bold text-primary'}>
                        {service.load}%
                      </span>
                    </div>
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div className={service.load > 80 ? 'h-full bg-destructive' : 'h-full bg-primary'} style={{ width: `${service.load}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
