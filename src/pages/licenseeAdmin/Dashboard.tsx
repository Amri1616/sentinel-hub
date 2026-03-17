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
  FileText, AlertTriangle, CheckCircle2, Clock, Megaphone,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
} from 'recharts';

const kpiCards = [
  { label: 'Total Incidents', value: 47, icon: FileText, color: 'text-primary', path: '/licensee-admin/incidents' },
  { label: 'Draft Reports', value: 3, icon: FileText, color: 'text-muted-foreground', path: '/licensee-admin/drafts' },
  { label: 'Under Review', value: 8, icon: Clock, color: 'text-status-in-review', path: '/licensee-admin/under-review' },
  { label: 'Escalated Cases', value: 5, icon: AlertTriangle, color: 'text-destructive', path: '/licensee-admin/escalated' },
  { label: 'Closed Cases', value: 30, icon: CheckCircle2, color: 'text-status-closed', path: '/licensee-admin/closed' },
];



const statusDistribution = [
  { name: 'Draft', value: 3, color: 'hsl(var(--status-draft))' },
  { name: 'Submitted', value: 8, color: 'hsl(var(--status-submitted))' },
  { name: 'Under Review', value: 6, color: 'hsl(var(--status-in-review))' },
  { name: 'Escalated', value: 5, color: 'hsl(var(--status-investigation))' },
  { name: 'Closed', value: 25, color: 'hsl(var(--status-closed))' },
];



const caseTypeByMonth = [
  { month: 'Aug', theft: 2, suspicious: 1, prohibited: 1, breach: 1, others: 1 },
  { month: 'Sep', theft: 3, suspicious: 2, prohibited: 1, breach: 1, others: 1 },
  { month: 'Oct', theft: 4, suspicious: 3, prohibited: 2, breach: 2, others: 1 },
  { month: 'Nov', theft: 3, suspicious: 2, prohibited: 2, breach: 1, others: 1 },
  { month: 'Dec', theft: 2, suspicious: 2, prohibited: 1, breach: 1, others: 1 },
  { month: 'Jan', theft: 1, suspicious: 1, prohibited: 1, breach: 1, others: 1 },
];

const chartTooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
};

export default function LicenseeAdminDashboard() {
  const navigate = useNavigate();
  const announcements = [
    { id: '1', title: 'System Maintenance Scheduled', message: 'The system will undergo scheduled maintenance this Saturday from 2:00 AM to 6:00 AM (MYT). During this window, the platform will be temporarily unavailable. Please ensure all pending incident reports and submissions are saved before the maintenance period begins.', from: 'System Admin', time: '2 hours ago', date: '8 Mar 2025', priority: 'high' as const },
    { id: '2', title: 'New Reporting Guidelines', message: 'Please review the updated incident reporting guidelines effective next month. The revised guidelines cover new submission requirements, updated classification criteria, and mandatory documentation standards. All reporters and administrators are expected to familiarise themselves with the changes.', from: 'MCMC', time: '1 day ago', date: '7 Mar 2025', priority: 'normal' as const },
    { id: '3', title: 'Training Session Available', message: 'Join our monthly training session on best practices for incident documentation and compliance reporting. Topics include evidence submission standards, proper categorisation of security incidents, and tips for faster case resolution. Registration is open on the internal learning portal until 15 March 2025.', from: 'MCMC Training Unit', time: '3 days ago', date: '5 Mar 2025', priority: 'normal' as const },
  ];

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<(typeof announcements)[number] | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Organisational overview — Global Express Logistics Sdn Bhd</p>
      </div>

      {/* KPI Cards — no trend indicators */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        {kpiCards.map((kpi) => (
          <Card key={kpi.label} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={() => navigate(kpi.path)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">{kpi.label}</span>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status Distribution Donut */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Case Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ResponsiveContainer width="60%" height={280}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number, name: string) => [`${value} (${((value / 47) * 100).toFixed(0)}%)`, name]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-[40%] space-y-2">
                {statusDistribution.map((s) => (
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

        {/* Case Type Analysis Stacked Bar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Case Type Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={caseTypeByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend />
                <Bar dataKey="theft" stackId="a" fill="hsl(var(--destructive))" name="Theft" />
                <Bar dataKey="suspicious" stackId="a" fill="hsl(var(--status-in-review))" name="Suspicious Parcel" />
                <Bar dataKey="prohibited" stackId="a" fill="hsl(var(--status-rfi))" name="Prohibited Items" />
                <Bar dataKey="breach" stackId="a" fill="hsl(var(--status-investigation))" name="Security Breach" />
                <Bar dataKey="others" stackId="a" fill="hsl(var(--muted-foreground))" name="Others" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
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
