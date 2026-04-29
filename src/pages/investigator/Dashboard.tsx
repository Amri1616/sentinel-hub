import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  FolderOpen,
  Clock,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  BarChart3,
  ShieldAlert,
  Megaphone,
  Eye,
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
    { label: 'Total Cases', value: '115', icon: FolderOpen, colorClass: 'text-role-investigator', route: '/internal/cases' },
    { label: 'Escalated Cases', value: '18', icon: ArrowUpRight, colorClass: 'text-destructive', route: '/internal/escalated-cases' },
    { label: 'Closed Cases', value: '68', icon: CheckCircle, colorClass: 'text-status-closed', route: '/internal/closed-cases' },
    { label: 'High Severity', value: '38', icon: ShieldAlert, colorClass: 'text-role-investigator', route: '/internal/high-severity' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">MCMC Internal — strategic oversight and analytics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => {
          return (
            <Card
              key={k.label}
              className={cn('border-border/40 min-h-[120px] flex flex-col cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-border')}
              onClick={() => navigate(k.route)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">{k.label}</CardTitle>
                <k.icon className={cn('h-4 w-4', k.colorClass)} />
              </CardHeader>
              <CardContent className="flex-1 flex items-end">
                <div className={cn('text-2xl font-bold', k.colorClass)}>{k.value}</div>
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

      <Card className="w-full overflow-hidden border">
        <CardHeader>
          <CardTitle>Recently Closed Cases</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[160px] text-foreground">Reference</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[220px] text-foreground">Organisation</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[160px] text-foreground">Outcome</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Closed Date</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[110px] text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentClosed.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => navigate(`/internal/cases/${c.id}`)}
                  >
                    <td className="px-3 py-4 text-center align-middle">
                      <span className="font-mono font-bold text-primary">{c.id}</span>
                    </td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.org}</td>
                    <td className="px-3 py-4 text-center align-middle">
                      <div className="flex justify-center">
                        <Badge variant="outline" className="text-xs">{c.outcome}</Badge>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.date}</td>
                    <td className="px-3 py-4 text-center align-middle">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/internal/cases/${c.id}`);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" /> Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      

      
    </div>
  );
}
