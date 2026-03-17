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
import { FileText, MessageSquare, Clock, Eye, Inbox, ArrowUpRight, ShieldAlert, Megaphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReviewerDashboard() {
  const navigate = useNavigate();

  const announcements = [
    { id: '1', title: 'New SOP for Critical Case Escalation', message: 'All Case Officers must follow the updated SOP for escalating cases rated "Critical" or "High" severity to LEA agencies. Key changes include: mandatory supervisor pre-approval before escalation submission, a new justification template, and revised turnaround times. Please review the full SOP document shared via internal portal and acknowledge receipt by 20 January 2025.', from: 'MCMC Management', time: '2 hours ago', date: '18 Jan 2025', priority: 'high' as const },
    { id: '2', title: 'System Maintenance — 25 Jan 2025', message: 'The PSIRP platform will undergo scheduled maintenance on Saturday, 25 January 2025, from 2:00 AM to 6:00 AM (MYT). During this window, the system will be temporarily unavailable. Please ensure all pending assessments and case updates are saved before the maintenance period begins.', from: 'System Admin', time: '1 day ago', date: '17 Jan 2025', priority: 'normal' as const },
    { id: '3', title: 'Q4 2024 Incident Report Published', message: 'The quarterly incident analysis report for Q4 2024 has been published. The report covers trends in postal security incidents, response time benchmarks, and recommendations for improved case handling. All Case Officers are encouraged to review the findings and integrate relevant insights into ongoing investigations.', from: 'MCMC Analytics', time: '3 days ago', date: '15 Jan 2025', priority: 'normal' as const },
    { id: '4', title: 'Training: Advanced Case Review Techniques', message: 'A specialised training session on advanced case review techniques will be held on 22 January 2025 at 10:00 AM. Topics include cross-referencing evidence, identifying fraud patterns, and writing effective preliminary findings. Registration is open on the internal learning portal.', from: 'MCMC Training Unit', time: '5 days ago', date: '13 Jan 2025', priority: 'normal' as const },
    { id: '5', title: 'Holiday Schedule Reminder', message: 'Please note the upcoming public holiday on 1 February 2025 (Federal Territory Day). The helpdesk and supervisor approvals will resume on the next business day. Urgent escalations during this period should follow the emergency protocol outlined in SOP-ESC-003.', from: 'System Admin', time: '1 week ago', date: '11 Jan 2025', priority: 'normal' as const },
  ];

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<(typeof announcements)[number] | null>(null);

  const priorityIncidents = [
    { id: 'PSIRP-2025-0028', title: 'Critical Security Breach', licensee: 'Global Express Logistics Sdn Bhd', severity: 'Critical', status: 'Pending Review' },
    { id: 'PSIRP-2025-0027', title: 'High-Value Theft Investigation', licensee: 'Swift Logistics Sdn Bhd', severity: 'High', status: 'Pending Review' },
    { id: 'PSIRP-2025-0026', title: 'Package Tampering Report', licensee: 'Global Express Logistics Sdn Bhd', severity: 'High', status: 'RFI Sent' },
    { id: 'PSIRP-2025-0024', title: 'Fraud Attempt Documentation', licensee: 'Global Express Logistics Sdn Bhd', severity: 'High', status: 'RFI Sent' },
  ];

  const recentUpdates = [
    { message: 'Clarification response received for #PSIRP-2025-0026', time: '15 min ago' },
    { message: 'New case assigned: #PSIRP-2025-0028', time: '1 hour ago' },
    { message: 'Escalation approved for #PSIRP-2025-0022', time: '3 hours ago' },
    { message: 'Supervisor rejected escalation for #PSIRP-2025-0020', time: '5 hours ago' },
  ];

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
      'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    return colors[severity] || 'bg-secondary';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Pending Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
      'RFI Sent': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
    };
    return colors[status] || 'bg-secondary';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Case Officer Dashboard</h1>
        <p className="text-muted-foreground">Personal work overview — MCMC Case Officer</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-role-reviewer/20 hover:border-role-reviewer/40 transition-all cursor-pointer" onClick={() => navigate('/reviewer/inbox')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Cases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-reviewer">15</div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 hover:border-destructive/40 transition-all cursor-pointer" onClick={() => navigate('/reviewer/inbox')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Severity</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">5</div>
          </CardContent>
        </Card>


        <Card className="border-status-rfi/20 hover:border-status-rfi/40 transition-all cursor-pointer" onClick={() => navigate('/reviewer/inbox')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalation Pending</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-rfi">2</div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate('/reviewer/inbox')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clarification Pending</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">6</div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Alerts Widget */}
      <Card className="border-destructive/40 bg-destructive/5 cursor-pointer hover:border-destructive/60 transition-all" onClick={() => navigate('/reviewer/inbox')}>
        <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-destructive/20 flex items-center justify-center">
              <ShieldAlert className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="font-semibold text-destructive">Priority Alerts</p>
              <p className="text-sm text-muted-foreground">3 Critical Cases Awaiting Review — Ensure critical incidents are handled first.</p>
            </div>
          </div>
          <Button variant="outline" className="shrink-0 border-destructive/30 text-destructive hover:bg-destructive/10 w-full sm:w-auto">
            Review Cases
          </Button>
        </CardContent>
      </Card>

      {/* Escalation Reminder Widget */}
      <Card className="border-amber-500/40 bg-amber-500/5 cursor-pointer hover:border-amber-500/60 transition-all dark:bg-amber-500/10" onClick={() => navigate('/reviewer/inbox')}>
        <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-amber-500/20 flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="font-semibold text-amber-600 dark:text-amber-400">Escalation Reminder</p>
              <p className="text-sm text-muted-foreground">1 Case Awaiting Escalation Decision.</p>
            </div>
          </div>
          <Button variant="outline" className="shrink-0 border-amber-500/30 text-amber-600 hover:bg-amber-500/10 dark:text-amber-400 w-full sm:w-auto">
            View Status
          </Button>
        </CardContent>
      </Card>

      {/* Go to Inbox */}
      <Button onClick={() => navigate('/reviewer/inbox')} size="lg" className="w-full h-auto py-5 text-lg glow-blue">
        <Inbox className="mr-3 h-6 w-6" />
        Go to Assignment Inbox
      </Button>

      <div className="flex flex-col gap-6">
        {/* Recent Assigned */}
        <Card>
          <CardHeader><CardTitle>Recent Assigned Cases</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {priorityIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-role-reviewer/40 transition-all cursor-pointer"
                  onClick={() => navigate(`/reviewer/cases/${incident.id}`)}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-role-reviewer">{incident.id}</span>
                      <Badge variant="outline" className={getSeverityColor(incident.severity)}>{incident.severity}</Badge>
                      <Badge variant="outline" className={getStatusColor(incident.status)}>{incident.status}</Badge>
                    </div>
                    <p className="font-medium">{incident.title}</p>
                    <p className="text-sm text-muted-foreground">{incident.licensee}</p>
                  </div>
                  <Button size="sm" variant="outline"><Eye className="mr-2 h-4 w-4" />Review</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recently Updated */}
          {/* Recently Updated */}
          <Card>
            <CardHeader><CardTitle>Recently Updated</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {recentUpdates.map((update, i) => (
                <div key={i} className="flex items-start gap-2 p-2">
                  <div className="h-2 w-2 rounded-full bg-role-reviewer mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm">{update.message}</p>
                    <p className="text-xs text-muted-foreground">{update.time}</p>
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
    </div>
  );
}
