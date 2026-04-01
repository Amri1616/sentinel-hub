import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, FileText, MapPin, TrendingUp, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';

const chartTooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
};

const incidentsByCategory = [
  { name: 'Theft/Loss', value: 6, color: 'hsl(var(--destructive))' },
  { name: 'Suspicious Parcel', value: 4, color: 'hsl(var(--status-in-review))' },
  { name: 'Prohibited Items', value: 3, color: 'hsl(var(--status-rfi))' },
  { name: 'Operational', value: 2, color: 'hsl(var(--primary))' },
  { name: 'Others', value: 3, color: 'hsl(var(--muted-foreground))' },
];

const incidentsBySeverity = [
  { name: 'Critical', value: 1, color: 'hsl(var(--destructive))' },
  { name: 'High', value: 4, color: 'hsl(var(--status-rfi))' },
  { name: 'Medium', value: 8, color: 'hsl(var(--status-in-review))' },
  { name: 'Low', value: 5, color: 'hsl(var(--status-closed))' },
];

const incidentsByState = [
  { state: 'KL', incidents: 5 },
  { state: 'Selangor', incidents: 4 },
  { state: 'Penang', incidents: 3 },
  { state: 'Johor', incidents: 3 },
  { state: 'Sabah', incidents: 2 },
  { state: 'Sarawak', incidents: 1 },
];

const monthlyTrend = [
  { month: 'Aug', submitted: 1, closed: 0, escalated: 0 },
  { month: 'Sep', submitted: 2, closed: 1, escalated: 0 },
  { month: 'Oct', submitted: 3, closed: 2, escalated: 1 },
  { month: 'Nov', submitted: 1, closed: 2, escalated: 0 },
  { month: 'Dec', submitted: 4, closed: 3, escalated: 1 },
  { month: 'Jan', submitted: 7, closed: 5, escalated: 2 },
];

export default function ReporterAnalytics() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Analytics</h1>
          <p className="text-muted-foreground">Incident trends & distribution for your organisation</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>CSV File</DropdownMenuItem>
            <DropdownMenuItem>PDF Screen Capture</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ====== Submission Overview ====== */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Submission Overview
        </h2>

        <div className="grid gap-4 grid-cols-3 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">This Year</p>
              <p className="text-3xl font-bold text-primary">18</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">This Quarter</p>
              <p className="text-3xl font-bold text-primary">7</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">This Month</p>
              <p className="text-3xl font-bold text-primary">3</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ====== KPI Summary (moved to top) ====== */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Total Submitted</span>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">18</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Escalated</span>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Closed</span>
              <CheckCircle2 className="h-4 w-4 text-status-closed" />
            </div>
            <div className="text-2xl font-bold">11</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Escalation Rate</span>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
            <div className="text-2xl font-bold text-destructive">
              22.2<span className="text-sm font-medium ml-1">%</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 text-right">Escalated / Total Cases</p>
          </CardContent>
        </Card>
      </div>

      {/* ====== Charts: Category & Severity ====== */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Incidents by Category</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ResponsiveContainer width="55%" height={220}>
                <PieChart>
                  <Pie data={incidentsByCategory} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                    {incidentsByCategory.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-[45%] space-y-2">
                {incidentsByCategory.map(s => (
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
          <CardHeader><CardTitle className="text-base">Incidents by Severity</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ResponsiveContainer width="55%" height={220}>
                <PieChart>
                  <Pie data={incidentsBySeverity} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                    {incidentsBySeverity.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-[45%] space-y-2">
                {incidentsBySeverity.map(s => (
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
      </div>

      {/* ====== Trends & Geographic Distribution ====== */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-role-reporter" />
          Trends & Geographic Distribution
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Monthly Case Trend</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Legend />
                  <Line type="monotone" dataKey="submitted" stroke="hsl(var(--primary))" strokeWidth={2} name="Submitted" />
                  <Line type="monotone" dataKey="closed" stroke="hsl(var(--status-closed))" strokeWidth={2} name="Closed" />
                  <Line type="monotone" dataKey="escalated" stroke="hsl(var(--destructive))" strokeWidth={2} name="Escalated" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><MapPin className="h-4 w-4" /> Incidents by State / Region</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={incidentsByState}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="state" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Bar dataKey="incidents" fill="hsl(var(--role-reporter))" radius={[4, 4, 0, 0]} name="Incidents" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
