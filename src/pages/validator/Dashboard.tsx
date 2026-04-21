import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  FolderOpen, AlertTriangle, Shield, Inbox, Users, CheckCircle2, ArrowRight,
} from 'lucide-react';

const escalationQueue = [
  { id: 'PSIRP-2025-0045', title: 'High-value theft – KL hub', officer: 'Ahmad Razif', severity: 'Critical', days: 2, type: 'Transfer Request', deadline: 'Overdue by 6h' },
  { id: 'PSIRP-2025-0052', title: 'Dangerous goods interception', officer: 'Nurul Hana', severity: 'High', days: 1, type: 'Closure Approval', deadline: 'Due in 3h' },
  { id: 'PSIRP-2025-0060', title: 'Cross-border contraband attempt', officer: 'Farah Amin', severity: 'Critical', days: 1, type: 'Escalation', deadline: 'Due in 7h' },
  { id: 'PSIRP-2025-0063', title: 'Tampering at sorting centre', officer: 'Raj Kumar', severity: 'Medium', days: 4, type: 'Escalation', deadline: 'Overdue by 1d' },
];

export default function SupervisorDashboard() {
  const navigate = useNavigate();
  const overdueCount = escalationQueue.filter((item) => item.deadline.toLowerCase().includes('overdue')).length;

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

      {/* Priority Alerts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Row 1: Critical & Escalation */}
        <Card className="relative border-destructive/40 bg-destructive/5 cursor-pointer hover:border-destructive/60 transition-all flex flex-col justify-between overflow-hidden sm:h-[110px]" onClick={() => navigate('/supervisor/critical-incidents')}>
          <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 h-full">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-destructive/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="font-semibold text-destructive">Critical Incident Alert</p>
                <p className="text-sm text-muted-foreground">Immediate review required.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center justify-center relative">
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-destructive opacity-40"></span>
                <Badge className="relative h-6 w-6 p-0 flex items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">3</Badge>
              </div>
              <Button variant="outline" className="hidden sm:flex shrink-0 border-destructive/30 text-destructive hover:bg-destructive/10">
                View Cases <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="relative border-amber-500/40 bg-amber-500/5 cursor-pointer hover:border-amber-500/60 transition-all flex flex-col justify-between overflow-hidden sm:h-[110px]" onClick={() => navigate('/supervisor/escalation-approvals')}>
          <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 h-full">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-amber-600">Escalation Approval Alert</p>
                <p className="text-sm text-muted-foreground">Endorsement needed.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center justify-center relative">
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-amber-500 opacity-40"></span>
                <Badge className="relative h-6 w-6 p-0 flex items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white">4</Badge>
              </div>
              <Button variant="outline" className="hidden sm:flex shrink-0 border-amber-500/30 text-amber-600 hover:bg-amber-500/10">
                Review Queue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Row 2: Transfer & Closure */}
        <Card className="relative border-indigo-500/40 bg-indigo-500/5 cursor-pointer hover:border-indigo-500/60 transition-all flex flex-col justify-between overflow-hidden sm:h-[110px]" onClick={() => navigate('/supervisor/transfer-approvals')}>
          <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 h-full">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-indigo-600">Case Transfer Approval</p>
                <p className="text-sm text-muted-foreground">Reassignment requests.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center justify-center relative">
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-indigo-500 opacity-40"></span>
                <Badge className="relative h-6 w-6 p-0 flex items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">2</Badge>
              </div>
              <Button variant="outline" className="hidden sm:flex shrink-0 border-indigo-500/30 text-indigo-600 hover:bg-indigo-500/10">
                Review Transfers <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="relative border-teal-500/40 bg-teal-500/5 cursor-pointer hover:border-teal-500/60 transition-all flex flex-col justify-between overflow-hidden sm:h-[110px]" onClick={() => navigate('/supervisor/closure-approvals')}>
          <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 h-full">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-teal-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <p className="font-semibold text-teal-600">Case Closure Approval</p>
                <p className="text-sm text-muted-foreground">Final findings review.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center justify-center relative">
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-teal-500 opacity-40"></span>
                <Badge className="relative h-6 w-6 p-0 flex items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white">5</Badge>
              </div>
              <Button variant="outline" className="hidden sm:flex shrink-0 border-teal-500/30 text-teal-600 hover:bg-teal-500/10">
                Review Closures <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
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
          <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-destructive">Overdue Reminder</p>
              <p className="text-xs text-muted-foreground">{overdueCount} pending task(s) are beyond their SLA window and need immediate supervisor action.</p>
            </div>
            <Badge variant="outline" className="border-destructive/40 bg-destructive/10 text-destructive">
              {overdueCount} Overdue
            </Badge>
          </div>
          {escalationQueue.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border border-border/40 rounded-lg hover:bg-accent/30 transition-colors">
              <div className="space-y-1">
                <p className="text-sm font-medium">{item.id}</p>
                <p className="text-xs text-muted-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">Officer: {item.officer} · {item.days}d ago</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={item.deadline.toLowerCase().includes('overdue') ? 'border-destructive/40 bg-destructive/10 text-destructive' : 'border-amber-400/40 bg-amber-100 text-amber-700'}>
                  {item.deadline}
                </Badge>
                <Badge variant="secondary" className={cn(
                  "text-[10px] font-bold uppercase",
                  item.type === 'Transfer Request' ? "bg-indigo-100 text-indigo-700" : 
                  item.type === 'Closure Approval' ? "bg-emerald-100 text-emerald-700" :
                  "bg-amber-100 text-amber-700"
                )}>
                  {item.type}
                </Badge>
                <Badge variant="outline" className={item.severity === 'Critical' ? 'border-destructive/50 text-destructive' : 'border-status-in-review/50 text-status-in-review'}>
                  {item.severity}
                </Badge>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    if (item.type === 'Escalation') navigate(`/supervisor/escalations/${item.id}`);
                    else navigate(`/supervisor/cases/${item.id}`);
                  }}
                >
                  Review
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
