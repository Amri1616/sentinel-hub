import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  FolderOpen, AlertTriangle, Clock, CheckCircle, TrendingUp,
  ArrowUpRight, BarChart3, ShieldAlert, Shield, Bell, Upload, CheckCircle2, AlertCircle, Megaphone,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


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

  const announcements = [
    { id: '1', title: 'System Maintenance Scheduled', message: 'The system will undergo scheduled maintenance this Saturday from 2:00 AM to 6:00 AM (MYT). During this window, the platform will be temporarily unavailable. Please ensure all pending case acknowledgements and updates are completed before the maintenance period begins.', from: 'System Admin', time: '2 hours ago', date: '8 Mar 2025', priority: 'high' as const },
    { id: '2', title: 'New Reporting Guidelines', message: 'Please review the updated incident reporting guidelines effective next month. The revised guidelines cover new escalation thresholds, updated severity classification criteria, and mandatory documentation requirements for inter-agency collaboration. All LEA officers are expected to familiarise themselves with the changes.', from: 'MCMC', time: '1 day ago', date: '7 Mar 2025', priority: 'normal' as const },
    { id: '3', title: 'Training Session Available', message: 'Join our monthly training session on best practices for incident documentation and inter-agency case coordination. Topics include evidence handling protocols, cross-referencing intelligence data, and writing effective investigation summaries. Registration is open on the internal learning portal until 15 March 2025.', from: 'MCMC Training Unit', time: '3 days ago', date: '5 Mar 2025', priority: 'normal' as const },
  ];

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<(typeof announcements)[number] | null>(null);

  const kpis = [
    { label: 'Total Cases', value: '115', icon: FolderOpen, color: 'hsl(220 70% 50%)' },
    { label: 'Open Cases', value: '47', icon: Clock, color: 'hsl(var(--status-in-review))' },
    { label: 'Escalated Cases', value: '18', icon: ArrowUpRight, color: 'hsl(var(--destructive))' },
    { label: 'Closed Cases', value: '68', icon: CheckCircle, color: 'hsl(var(--status-closed))' },
    { label: 'High Severity', value: '38', icon: ShieldAlert, color: 'hsl(var(--role-investigator))' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Agency Dashboard</h1>
        <p className="text-muted-foreground">PDRM — Strategic oversight and escalated case analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{k.label}</CardTitle>
              <k.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

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
              <Button size="sm" onClick={() => navigate(`/lea/cases/${c.id}`)}>Acknowledge</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* High Risk Alert Widget */}
      <Card className="border-destructive/40 bg-destructive/5 cursor-pointer hover:border-destructive/60 transition-all" onClick={() => navigate('/lea/cases')}>
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
