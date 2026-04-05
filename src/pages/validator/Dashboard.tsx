import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  FolderOpen, AlertTriangle, Shield, Inbox,
} from 'lucide-react';

const escalationQueue = [
  { id: 'PSIRP-2025-0045', title: 'High-value theft – KL hub', officer: 'Ahmad Razif', severity: 'Critical', days: 2 },
  { id: 'PSIRP-2025-0052', title: 'Dangerous goods interception', officer: 'Nurul Hana', severity: 'High', days: 1 },
  { id: 'PSIRP-2025-0058', title: 'Suspicious parcel pattern', officer: 'Lee Wei', severity: 'High', days: 3 },
  { id: 'PSIRP-2025-0060', title: 'Cross-border contraband attempt', officer: 'Farah Amin', severity: 'Critical', days: 1 },
  { id: 'PSIRP-2025-0063', title: 'Tampering at sorting centre', officer: 'Raj Kumar', severity: 'Medium', days: 4 },
];

export default function SupervisorDashboard() {
  const navigate = useNavigate();

  const kpis = [
    { label: 'Total Open Cases', value: 34, icon: FolderOpen, color: 'text-role-validator', route: '/supervisor/cases' },
    { label: 'Pending Tasks', value: 5, icon: AlertTriangle, color: 'text-destructive', route: '/supervisor/pending-tasks' },
    { label: 'Closed This Month', value: 12, icon: Inbox, color: 'text-status-closed', route: '/supervisor/closed-cases' },
    { label: 'Escalated Cases', value: 8, icon: Shield, color: 'text-role-reviewer', route: '/supervisor/escalated-cases' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Supervisor Dashboard</h1>
          <p className="text-muted-foreground">Governance overview & escalation management</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card
            key={kpi.label}
            className={cn('border-border/40 min-h-[120px] flex flex-col cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-border')}
            onClick={() => navigate(kpi.route)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{kpi.label}</CardTitle>
              <kpi.icon className={cn('h-4 w-4', kpi.color)} />
            </CardHeader>
            <CardContent className="flex-1 flex items-end">
              <div className={cn('text-2xl font-bold', kpi.color)}>{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Priority Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-destructive/40 bg-destructive/5 cursor-pointer hover:border-destructive/60 transition-all" onClick={() => navigate('/supervisor/critical-incidents')}>
          <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-destructive/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="font-semibold text-destructive">Critical Incident Alert</p>
                <p className="text-sm text-muted-foreground">Critical Cases: 3 — Immediate review required.</p>
              </div>
            </div>
            <Button variant="outline" className="shrink-0 border-destructive/30 text-destructive hover:bg-destructive/10 w-full sm:w-auto">
              View Cases
            </Button>
          </CardContent>
        </Card>

        <Card className="border-amber-500/40 bg-amber-500/5 cursor-pointer hover:border-amber-500/60 transition-all dark:bg-amber-500/10" onClick={() => navigate('/supervisor/pending-tasks')}>
          <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-amber-600 dark:text-amber-400">Escalation Approval Alert</p>
                <p className="text-sm text-muted-foreground">Escalation Requests Pending — Supervisor endorsement needed.</p>
              </div>
            </div>
            <Button variant="outline" className="shrink-0 border-amber-500/30 text-amber-600 hover:bg-amber-500/10 dark:text-amber-400 w-full sm:w-auto">
              Review Queue
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Escalation Approval Queue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pending Tasks Queue</CardTitle>
          <span className="relative flex items-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-15" style={{ animationDuration: '2.5s' }} />
            <Badge variant="outline" className="relative bg-destructive/20 text-destructive border-destructive/30">{escalationQueue.length} pending</Badge>
          </span>
        </CardHeader>
        <CardContent className="space-y-3">
          {escalationQueue.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border border-border/40 rounded-lg hover:bg-accent/30 transition-colors">
              <div className="space-y-1">
                <p className="text-sm font-medium">{item.id}</p>
                <p className="text-xs text-muted-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">Officer: {item.officer} · {item.days}d ago</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={item.severity === 'Critical' ? 'border-destructive/50 text-destructive' : 'border-status-in-review/50 text-status-in-review'}>
                  {item.severity}
                </Badge>
                <Button size="sm" variant="outline" onClick={() => navigate(`/supervisor/escalations/${item.id}`)}>Review</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
