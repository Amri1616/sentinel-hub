import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  FolderOpen,
  AlertTriangle,
  Clock,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  BarChart3,
  ShieldAlert,
  Megaphone,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const orgData = [
  { name: 'Global Express Logistics', cases: 28, escalated: 5 },
  { name: 'Pos Malaysia', cases: 42, escalated: 8 },
  { name: 'J&T Express', cases: 19, escalated: 3 },
  { name: 'CityLink', cases: 15, escalated: 2 },
  { name: 'DHL eCommerce', cases: 11, escalated: 4 },
];

const severityData = [
  { name: 'Low', value: 32, color: 'hsl(var(--status-closed))' },
  { name: 'Medium', value: 45, color: 'hsl(var(--status-in-review))' },
  { name: 'High', value: 25, color: 'hsl(var(--role-investigator))' },
  { name: 'Critical', value: 13, color: 'hsl(var(--destructive))' },
];

const recentClosed = [
  { id: 'PSIRP-2025-0059', org: 'Pos Malaysia', outcome: 'Action Taken', date: '2025-06-10' },
  { id: 'PSIRP-2025-0055', org: 'Global Express Logistics', outcome: 'No Further Action', date: '2025-06-09' },
  { id: 'PSIRP-2025-0052', org: 'J&T Express', outcome: 'Referred to LEA', date: '2025-06-08' },
  { id: 'PSIRP-2025-0049', org: 'CityLink', outcome: 'Action Taken', date: '2025-06-06' },
];

export default function InvestigatorDashboard() {
  const navigate = useNavigate();

  const kpis = [
    { label: 'Total Cases', value: '115', icon: FolderOpen, color: 'role-investigator', route: '/internal/cases' },
    { label: 'Open Cases', value: '47', icon: Clock, color: 'status-in-review', route: '/internal/cases' },
    { label: 'Escalated Cases', value: '18', icon: ArrowUpRight, color: 'destructive', route: '/internal/cases' },
    { label: 'Closed Cases', value: '68', icon: CheckCircle, color: 'status-closed', route: '/internal/cases' },
    { label: 'Escalation Ratio', value: '15.7%', icon: AlertTriangle, color: 'role-validator', route: '/internal/analytics' },
    { label: 'High Severity', value: '38', icon: ShieldAlert, color: 'role-investigator', route: '/internal/cases' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">MCMC Internal — strategic oversight and analytics</p>
      </div>

      <div className="grid gap-4 grid-cols-3">
        {kpis.map((k) => {
          const colorClass = k.color === 'role-investigator' ? 'text-role-investigator' :
                            k.color === 'status-in-review' ? 'text-status-in-review' :
                            k.color === 'destructive' ? 'text-destructive' :
                            k.color === 'status-closed' ? 'text-status-closed' :
                            k.color === 'role-validator' ? 'text-role-validator' : 'text-foreground';
          
          const borderColorClass = k.color === 'role-investigator' ? 'border-role-investigator/20' :
                                  k.color === 'status-in-review' ? 'border-status-in-review/20' :
                                  k.color === 'destructive' ? 'border-destructive/20' :
                                  k.color === 'status-closed' ? 'border-status-closed/20' :
                                  k.color === 'role-validator' ? 'border-role-validator/20' : 'border-border/20';

          return (
            <Card
              key={k.label}
              className={cn(borderColorClass, 'min-h-[120px] flex flex-col cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-border')}
              onClick={() => navigate(k.route)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{k.label}</CardTitle>
                <k.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex-1 flex items-end">
                <div className={cn('text-2xl font-bold', colorClass)}>{k.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Cases by Organisation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orgData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" tick={{ fontSize: 11 }} />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '6px' }} />
                  <Bar dataKey="cases" fill="hsl(var(--role-investigator))" radius={[4, 4, 0, 0]} name="Total Cases" />
                  <Bar dataKey="escalated" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Escalated" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={severityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {severityData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '6px' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recently Closed Cases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentClosed.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">{c.id}</p>
                <p className="text-xs text-muted-foreground">{c.org}</p>
              </div>
              <div className="text-right space-y-1">
                <Badge variant="outline" className="text-xs">{c.outcome}</Badge>
                <p className="text-xs text-muted-foreground">{c.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      

      
    </div>
  );
}
