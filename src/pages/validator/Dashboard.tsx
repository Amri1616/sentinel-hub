import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import {
  FolderOpen, AlertTriangle, CheckCircle, Shield, Inbox, TrendingUp, Megaphone,
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';

const escalationQueue = [
  { id: 'PSIRP-2025-0045', title: 'High-value theft – KL hub', officer: 'Ahmad Razif', severity: 'Critical', days: 2 },
  { id: 'PSIRP-2025-0052', title: 'Dangerous goods interception', officer: 'Nurul Hana', severity: 'High', days: 1 },
  { id: 'PSIRP-2025-0058', title: 'Suspicious parcel pattern', officer: 'Lee Wei', severity: 'High', days: 3 },
  { id: 'PSIRP-2025-0060', title: 'Cross-border contraband attempt', officer: 'Farah Amin', severity: 'Critical', days: 1 },
  { id: 'PSIRP-2025-0063', title: 'Tampering at sorting centre', officer: 'Raj Kumar', severity: 'Medium', days: 4 },
];

const recentClosed = [
  { id: 'PSIRP-2025-0030', outcome: 'Closed – Action Taken', date: '2025-06-08' },
  { id: 'PSIRP-2025-0028', outcome: 'Closed – No Further Action', date: '2025-06-07' },
  { id: 'PSIRP-2025-0025', outcome: 'Closed – Referred to LEA', date: '2025-06-05' },
];



export default function SupervisorDashboard() {
  const navigate = useNavigate();

  const announcements = [
    { id: '1', title: 'System Maintenance Scheduled', message: 'The system will undergo scheduled maintenance this Saturday from 2:00 AM to 6:00 AM (MYT). During this window, the platform will be temporarily unavailable. Please ensure all pending reviews and approvals are completed before the maintenance period begins.', from: 'System Admin', time: '2 hours ago', date: '8 Mar 2025', priority: 'high' as const },
    { id: '2', title: 'New Reporting Guidelines', message: 'Please review the updated incident reporting guidelines effective next month. The revised guidelines cover new escalation thresholds, updated severity classification criteria, and mandatory documentation requirements for all case officers. All supervisors are expected to ensure compliance within their teams.', from: 'MCMC', time: '1 day ago', date: '7 Mar 2025', priority: 'normal' as const },
    { id: '3', title: 'Training Session Available', message: 'Join our monthly training session on best practices for incident documentation and case review. Topics include cross-referencing evidence, identifying fraud patterns, and writing effective preliminary findings. Registration is open on the internal learning portal until 15 March 2025.', from: 'MCMC Training Unit', time: '3 days ago', date: '5 Mar 2025', priority: 'normal' as const },
  ];

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<(typeof announcements)[number] | null>(null);

  const kpis = [
    { label: 'Total Open Cases', value: 34, icon: FolderOpen, color: 'text-role-validator' },
    { label: 'Pending Tasks', value: 5, icon: AlertTriangle, color: 'text-destructive' },
    { label: 'Closed This Month', value: 12, icon: CheckCircle, color: 'text-status-closed' },
    { label: 'Escalated Cases', value: 8, icon: Shield, color: 'text-role-reviewer' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Supervisor Dashboard</h1>
          <p className="text-muted-foreground">Governance overview & escalation management</p>
        </div>
        <Button onClick={() => navigate('/validator/escalations')} className="bg-role-validator text-primary-foreground hover:bg-role-validator/90">
          <Inbox className="mr-2 h-4 w-4" /> Pending Tasks
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{kpi.label}</CardTitle>
              <kpi.icon className={cn('h-4 w-4', kpi.color)} />
            </CardHeader>
            <CardContent>
              <div className={cn('text-2xl font-bold', kpi.color)}>{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Priority Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-destructive/40 bg-destructive/5 cursor-pointer hover:border-destructive/60 transition-all" onClick={() => navigate('/validator/escalations')}>
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

        <Card className="border-amber-500/40 bg-amber-500/5 cursor-pointer hover:border-amber-500/60 transition-all dark:bg-amber-500/10" onClick={() => navigate('/validator/escalations')}>
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

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Escalation Approval Queue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Tasks Queue</CardTitle>
            <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30">{escalationQueue.length} pending</Badge>
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
                  <Button size="sm" variant="outline" onClick={() => navigate(`/validator/escalations/${item.id}`)}>Review</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recently Closed + Officer Workload */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Closed Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentClosed.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{c.id}</p>
                    <p className="text-xs text-muted-foreground">{c.date}</p>
                  </div>
                  <Badge variant="outline" className="border-status-closed/50 text-status-closed text-xs">{c.outcome}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Officer Workload</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 grid-cols-2">
                {[
                  { name: 'Ahmad Razif', cases: 8 },
                  { name: 'Nurul Hana', cases: 6 },
                  { name: 'Lee Wei', cases: 9 },
                  { name: 'Farah Amin', cases: 5 },
                  { name: 'Raj Kumar', cases: 4 },
                  { name: 'Siti Mariam', cases: 2 },
                ].map((o) => (
                  <div key={o.name} className="p-2 border border-border/40 rounded-lg">
                    <p className="text-sm font-medium">{o.name}</p>
                    <span className="text-xs text-muted-foreground">{o.cases} cases</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Announcements */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Megaphone className="h-4 w-4" />
            Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {announcements.map((announcement) => (
              <button
                key={announcement.id}
                type="button"
                onClick={() => setSelectedAnnouncement(announcement)}
                className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer hover:ring-1 hover:ring-primary/30 hover:shadow-sm ${announcement.priority === 'high'
                  ? 'border-destructive/40 bg-destructive/5 hover:bg-destructive/10'
                  : 'border-border bg-secondary/30 hover:bg-secondary/60'
                  }`}
              >
                <p className="text-sm font-medium mb-1">{announcement.title}</p>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{announcement.message}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>From: {announcement.from}</span>
                  <span>{announcement.time}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Announcement Detail Modal */}
      <Dialog open={!!selectedAnnouncement} onOpenChange={(open) => { if (!open) setSelectedAnnouncement(null); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedAnnouncement?.title}</DialogTitle>
            <DialogDescription asChild>
              <div className="flex items-center gap-3 pt-1">
                <span>From: {selectedAnnouncement?.from}</span>
                <span className="text-muted-foreground/50">•</span>
                <span>{selectedAnnouncement?.date}</span>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm leading-relaxed text-foreground/90 py-2 whitespace-pre-line">
            {selectedAnnouncement?.message}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
