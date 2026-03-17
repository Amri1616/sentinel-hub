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
  const announcements = [
    { id: '1', title: 'System Maintenance Scheduled', message: 'The system will undergo scheduled maintenance this Saturday from 2:00 AM to 6:00 AM (MYT). During this window, the platform will be temporarily unavailable. Please ensure all pending investigations and case updates are completed before the maintenance period begins.', from: 'System Admin', time: '2 hours ago', date: '8 Mar 2025', priority: 'high' as const },
    { id: '2', title: 'New Reporting Guidelines', message: 'Please review the updated incident reporting guidelines effective next month. The revised guidelines cover new escalation thresholds, updated severity classification criteria, and mandatory documentation requirements for internal governance reviews. All MCMC Internal officers are expected to adopt the new standards.', from: 'MCMC', time: '1 day ago', date: '7 Mar 2025', priority: 'normal' as const },
    { id: '3', title: 'Training Session Available', message: 'Join our monthly training session on best practices for incident documentation, evidence analysis, and governance reporting. Topics include cross-referencing intelligence data, identifying systemic vulnerabilities, and writing effective compliance summaries. Registration is open until 15 March 2025.', from: 'MCMC Training Unit', time: '3 days ago', date: '5 Mar 2025', priority: 'normal' as const },
  ];

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<(typeof announcements)[number] | null>(null);

  const kpis = [
    { label: 'Total Cases', value: '115', icon: FolderOpen, color: 'role-investigator' },
    { label: 'Open Cases', value: '47', icon: Clock, color: 'status-in-review' },
    { label: 'Escalated Cases', value: '18', icon: ArrowUpRight, color: 'destructive' },
    { label: 'Closed Cases', value: '68', icon: CheckCircle, color: 'status-closed' },
    { label: 'Escalation Ratio', value: '15.7%', icon: AlertTriangle, color: 'role-validator' },
    { label: 'High Severity', value: '38', icon: ShieldAlert, color: 'role-investigator' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Governance Dashboard</h1>
        <p className="text-muted-foreground">MCMC Internal — strategic oversight and analytics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className={`border-${k.color}/20`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{k.label}</CardTitle>
              <k.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold text-${k.color}`}>{k.value}</div>
            </CardContent>
          </Card>
        ))}
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
