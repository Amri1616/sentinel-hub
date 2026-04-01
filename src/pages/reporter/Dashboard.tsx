import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, MessageSquare, Clock, CheckCircle2, Trash2, ArrowUpRight, ShieldCheck } from 'lucide-react';
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

const pendingClarificationCount = 2;

export default function ReporterDashboard() {
  const navigate = useNavigate();

  const drafts = [
    { id: 'draft-1', title: 'Theft of High-Value Package', updated: '2 hours ago', daysLeft: 5 },
    { id: 'draft-2', title: 'Tampered Shipment', updated: '1 day ago', daysLeft: 3 },
    { id: 'draft-3', title: 'Lost Consignment', updated: '3 days ago', daysLeft: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Licensee Reporter</p>
        </div>
        {pendingClarificationCount > 0 && (
          <Button
            variant="outline"
            onClick={() => navigate('/licensee-reporter/incidents?filter=rfi')}
            className="border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:border-destructive/60 transition-all gap-2 shrink-0"
          >
            <MessageSquare className="h-4 w-4" />
            Pending Action
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive" />
            </span>
            <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
              {pendingClarificationCount}
            </span>
          </Button>
        )}
      </div>

      {/* Create New Incident */}
      <Button
        onClick={() => navigate('/licensee-reporter/incidents/new')}
        size="lg"
        className="w-full h-auto py-5 text-lg glow-cyan"
      >
        <Plus className="mr-3 h-6 w-6" />
        Create New Incident
      </Button>

      {/* KPI Cards - 5 cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <Card className="border-primary/20 hover:border-primary/40 transition-all cursor-pointer min-h-[120px] flex flex-col" onClick={() => navigate('/licensee-reporter/drafts')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
            <div className="text-2xl font-bold text-primary">3</div>
          </CardContent>
        </Card>

        <Card className="border-status-submitted/20 hover:border-status-submitted/40 transition-all cursor-pointer min-h-[120px] flex flex-col" onClick={() => navigate('/licensee-reporter/incidents')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
            <div className="text-2xl font-bold text-status-submitted">12</div>
          </CardContent>
        </Card>

        <Card className="border-status-in-review/20 hover:border-status-in-review/40 transition-all cursor-pointer min-h-[120px] flex flex-col" onClick={() => navigate('/licensee-reporter/incidents')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
            <div className="text-2xl font-bold text-status-in-review">4</div>
          </CardContent>
        </Card>

        <Card className="border-status-investigation/20 hover:border-status-investigation/40 transition-all cursor-pointer min-h-[120px] flex flex-col" onClick={() => navigate('/licensee-reporter/incidents')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalated</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
            <div className="text-2xl font-bold text-status-investigation">2</div>
          </CardContent>
        </Card>

        <Card className="border-status-closed/20 hover:border-status-closed/40 transition-all cursor-pointer min-h-[120px] flex flex-col" onClick={() => navigate('/licensee-reporter/incidents')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
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

      {/* My Drafts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>My Drafts</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary" onClick={() => navigate('/licensee-reporter/drafts')}>
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
                  <Button size="sm" variant="outline" onClick={() => navigate('/licensee-reporter/incidents/new')}>
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
    </div>
  );
}
