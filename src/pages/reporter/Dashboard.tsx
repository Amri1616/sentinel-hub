import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { FileText, Plus, MessageSquare, Clock, CheckCircle2, Trash2, ArrowUpRight, ShieldCheck, Megaphone, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const chartTooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
};

const statusDistribution = [
  { name: 'Submitted', value: 12, color: 'hsl(var(--status-submitted))' },
  { name: 'Under Review', value: 4, color: 'hsl(var(--status-in-review))' },
  { name: 'Escalated', value: 2, color: 'hsl(var(--destructive))' },
  { name: 'Closed', value: 8, color: 'hsl(var(--status-closed))' },
];

const monthlySubmissions = [
  { month: 'Aug', count: 1 },
  { month: 'Sep', count: 2 },
  { month: 'Oct', count: 3 },
  { month: 'Nov', count: 1 },
  { month: 'Dec', count: 4 },
  { month: 'Jan', count: 7 },
];

export default function ReporterDashboard() {
  const navigate = useNavigate();

  const drafts = [
    { id: 'draft-1', title: 'Theft of High-Value Package', updated: '2 hours ago', daysLeft: 5 },
    { id: 'draft-2', title: 'Tampered Shipment', updated: '1 day ago', daysLeft: 3 },
    { id: 'draft-3', title: 'Lost Consignment', updated: '3 days ago', daysLeft: 1 },
  ];

  const announcements = [
    { id: '1', title: 'System Maintenance Scheduled', message: 'The system will undergo scheduled maintenance this Saturday from 2:00 AM to 6:00 AM (MYT). During this window, the platform will be temporarily unavailable. Please ensure all pending drafts are saved before the maintenance period begins. We apologise for any inconvenience and appreciate your understanding.', from: 'System Admin', time: '2 hours ago', date: '8 Mar 2026', priority: 'high' as const },
    { id: '2', title: 'New Reporting Guidelines', message: 'Please review the updated incident reporting guidelines effective next month. Key changes include revised classification categories for postal security incidents, updated evidence requirements for escalation cases, and new mandatory fields in the incident submission form. A detailed document has been shared via email. All reporters must acknowledge receipt by 15 March 2026.', from: 'Licensee Admin', time: '1 day ago', date: '7 Mar 2026', priority: 'normal' as const },
    { id: '3', title: 'Training Session Available', message: 'Join our monthly training session on best practices for incident documentation. This session will cover: proper evidence attachment guidelines, how to write effective incident descriptions, common mistakes to avoid, and a live Q&A with the MCMC review team. Register through the Learning portal by 10 March 2026.', from: 'Licensee Admin', time: '3 days ago', date: '5 Mar 2026', priority: 'normal' as const },
    { id: '4', title: 'Holiday Closure Notice', message: 'Please note that the support helpdesk will be closed on 12 March 2026 in observance of a public holiday. Any urgent incidents should be submitted through the platform as usual — they will be reviewed on the next business day. For critical security matters, please contact the emergency hotline.', from: 'System Admin', time: '5 days ago', date: '3 Mar 2026', priority: 'normal' as const },
    { id: '5', title: 'Platform Update v2.4 Released', message: 'We are pleased to announce the release of Platform Update v2.4. This update includes performance improvements to the dashboard, enhanced search filters on the incidents page, and a new bulk-export feature for analytics reports. Please clear your browser cache if you experience any display issues after the update.', from: 'System Admin', time: '1 week ago', date: '1 Mar 2026', priority: 'normal' as const },
  ];

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<(typeof announcements)[number] | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Licensee Reporter</p>
      </div>


      {/* Create New Incident */}
      <Button
        onClick={() => navigate('/reporter/incidents/new')}
        size="lg"
        className="w-full h-auto py-5 text-lg glow-cyan"
      >
        <Plus className="mr-3 h-6 w-6" />
        Create New Incident
      </Button>

      {/* KPI Cards - 5 cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <Card className="border-primary/20 hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate('/reporter/drafts')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3</div>
          </CardContent>
        </Card>

        <Card className="border-status-submitted/20 hover:border-status-submitted/40 transition-all cursor-pointer" onClick={() => navigate('/reporter/incidents')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-submitted">12</div>
          </CardContent>
        </Card>

        <Card className="border-status-in-review/20 hover:border-status-in-review/40 transition-all cursor-pointer" onClick={() => navigate('/reporter/incidents')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-in-review">4</div>
          </CardContent>
        </Card>

        <Card className="border-status-investigation/20 hover:border-status-investigation/40 transition-all cursor-pointer" onClick={() => navigate('/reporter/incidents')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalated</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-investigation">2</div>
          </CardContent>
        </Card>

        <Card className="border-status-closed/20 hover:border-status-closed/40 transition-all cursor-pointer" onClick={() => navigate('/reporter/incidents')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-closed">8</div>
          </CardContent>
        </Card>
      </div>

      {/* Data Visualizations */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Case Status Distribution</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ResponsiveContainer width="55%" height={200}>
                <PieChart>
                  <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                    {statusDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-[45%] space-y-2">
                {statusDistribution.map(s => (
                  <div key={s.name} className="flex items-center gap-2 text-sm">
                    <span className="h-3 w-3 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="ml-auto font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Monthly Submissions</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlySubmissions}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Submissions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pending Clarification Alert */}
      <Card className="border-destructive/40 bg-destructive/5 cursor-pointer hover:border-destructive/60 transition-all" onClick={() => navigate('/reporter/incidents?filter=rfi')}>
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="font-semibold text-destructive">2 Pending Clarification Responses</p>
              <p className="text-sm text-muted-foreground">You have clarification requests awaiting your response</p>
            </div>
          </div>
          <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10">
            View & Respond
          </Button>
        </CardContent>
      </Card>


      <div className="flex flex-col gap-6">
        {/* My Drafts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>My Drafts</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary" onClick={() => navigate('/reporter/drafts')}>
              View All Drafts
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/40 transition-all"
                >
                  <div className="flex-1">
                    <p className="font-medium">{draft.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-sm text-muted-foreground">Last updated: {draft.updated}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${draft.daysLeft <= 2
                        ? 'bg-destructive/15 text-destructive'
                        : draft.daysLeft <= 4
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                          : 'bg-primary/15 text-primary'
                        }`}>
                        {draft.daysLeft} {draft.daysLeft === 1 ? 'day' : 'days'} left
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => navigate('/reporter/incidents/new')}>
                      Continue
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Recent Activity Widget */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 border-b border-border pb-3 last:border-0">
                <div className="h-2 w-2 rounded-full bg-status-in-review mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Case PSIR-2026-004 moved to <span className="text-status-in-review">Under Review</span></p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-b border-border pb-3 last:border-0">
                <div className="h-2 w-2 rounded-full bg-status-rfi mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Clarification requested for Case PSIR-2026-002</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-b border-border pb-3 last:border-0">
                <div className="h-2 w-2 rounded-full bg-status-closed mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Case PSIR-2026-001 <span className="text-status-closed">Closed</span></p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
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
