import {
  FolderOpen, AlertTriangle, Clock, CheckCircle, TrendingUp,
  ArrowUpRight, BarChart3, ShieldAlert, Shield, Bell, Upload, CheckCircle2, AlertCircle, Megaphone,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


/* ── Static data ── */


const recentClosed = [
  { id: 'PSIRP-2025-0059', org: 'Pos Malaysia', outcome: 'Action Taken', date: '2025-06-10' },
  { id: 'PSIRP-2025-0055', org: 'Global Express Logistics', outcome: 'No Further Action', date: '2025-06-09' },
  { id: 'PSIRP-2025-0052', org: 'J&T Express', outcome: 'Referred to LEA', date: '2025-06-08' },
  { id: 'PSIRP-2025-0049', org: 'CityLink', outcome: 'Action Taken', date: '2025-06-06' },
];

const pendingAck = [
  { id: 'ESC-2025-004', title: 'Counterfeit stamps distribution', org: 'Pos Malaysia', severity: 'High', escalatedDate: '2025-06-14' },
  { id: 'ESC-2025-005', title: 'Organised parcel interception ring', org: 'J&T Express', severity: 'Critical', escalatedDate: '2025-06-15' },
];



export default function LEADashboard() {
  const navigate = useNavigate();

  

  
  const kpis = [
    { label: 'Total Cases', value: '115', icon: FolderOpen, color: 'hsl(220 70% 50%)', route: '/agency/cases' },
    { label: 'Open Cases', value: '47', icon: Clock, color: 'hsl(var(--status-in-review))', route: '/agency/open-cases' },
    { label: 'Escalated Cases', value: '18', icon: ArrowUpRight, color: 'hsl(var(--destructive))', route: '/agency/cases' },
    { label: 'Closed Cases', value: '68', icon: CheckCircle, color: 'hsl(var(--status-closed))', route: '/agency/closed-cases' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Agency Dashboard</h1>
        <p className="text-muted-foreground">PDRM — Strategic oversight and escalated case analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card
            key={k.label}
            className="min-h-[120px] flex flex-col cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-border"
            onClick={() => navigate(k.route)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{k.label}</CardTitle>
              <k.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-1 flex items-end">
              <div className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* High Risk Alert Widget */}
      <Card className="border-destructive/40 bg-destructive/5 cursor-pointer hover:border-destructive/60 transition-all" onClick={() => navigate('/agency/high-risk')}>
        <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-destructive/20 flex items-center justify-center">
              <ShieldAlert className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="font-semibold text-destructive">High Risk Alert</p>
              <p className="text-sm text-muted-foreground">Critical cases awaiting action — Urgent prioritization required.</p>
            </div>
          </div>
          <Button variant="outline" className="shrink-0 border-destructive/30 text-destructive hover:bg-destructive/10 w-full sm:w-auto">
            View Critical Cases
          </Button>
        </CardContent>
      </Card>

      {/* Pending Acknowledgement */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="h-4 w-4 text-destructive" /> Cases Pending Acknowledgement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingAck.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 border border-border/40 rounded-lg bg-destructive/5">
              <div className="space-y-1">
                <p className="text-sm font-medium">{c.id} — {c.title}</p>
                <p className="text-xs text-muted-foreground">{c.org} · Severity: {c.severity} · Escalated: {c.escalatedDate}</p>
              </div>
              <Button size="sm" onClick={() => navigate(`/agency/cases/${c.id}`)}>Acknowledge</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recently Closed Cases */}
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
