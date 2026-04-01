import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, MapPin, TrendingUp, ShieldAlert } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const chartTooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
};

const trendData = [
  { time: 'Jan', incidents: 10 },
  { time: 'Feb', incidents: 15 },
  { time: 'Mar', incidents: 12 },
  { time: 'Apr', incidents: 20 },
  { time: 'May', incidents: 25 },
  { time: 'Jun', incidents: 18 },
  { time: 'Jul', incidents: 30 },
  { time: 'Aug', incidents: 28 },
  { time: 'Sep', incidents: 35 },
  { time: 'Oct', incidents: 40 },
  { time: 'Nov', incidents: 32 },
  { time: 'Dec', incidents: 45 },
];

const incidentTypeData = [
  { name: 'Theft', value: 18, color: 'hsl(var(--destructive))' },
  { name: 'Suspicious Parcel', value: 10, color: 'hsl(var(--status-in-review))' },
  { name: 'Prohibited Items', value: 8, color: 'hsl(var(--status-rfi))' },
  { name: 'Security Breach', value: 6, color: 'hsl(var(--status-investigation))' },
  { name: 'Others', value: 5, color: 'hsl(var(--muted-foreground))' },
];

const incidentsByState = [
  { state: 'Selangor', cases: 14 },
  { state: 'KL', cases: 11 },
  { state: 'Penang', cases: 7 },
  { state: 'Johor', cases: 6 },
  { state: 'Sabah', cases: 5 },
  { state: 'Sarawak', cases: 4 },
];

const escalationData = [
  { name: 'Escalated', value: 12, color: 'hsl(var(--destructive))' },
  { name: 'Resolved', value: 35, color: 'hsl(var(--status-closed))' },
];

export default function LicenseeAdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Analytics & Report</h1>
          <p className="text-muted-foreground">Case Type Analytics</p>
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

      {/* ====== Filters ====== */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-1.5 flex-1 min-w-[150px]">
              <label className="text-sm font-medium">Date Range</label>
              <Select defaultValue="this-year">
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-quarter">This Quarter</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 flex-1 min-w-[150px]">
              <label className="text-sm font-medium">Incident Category</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="theft">Theft</SelectItem>
                  <SelectItem value="suspicious">Suspicious Parcel</SelectItem>
                  <SelectItem value="prohibited">Prohibited Items</SelectItem>
                  <SelectItem value="breach">Security Breach</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 flex-1 min-w-[150px]">
              <label className="text-sm font-medium">State</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="selangor">Selangor</SelectItem>
                  <SelectItem value="kl">Kuala Lumpur</SelectItem>
                  <SelectItem value="johor">Johor</SelectItem>
                  <SelectItem value="penang">Penang</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 flex-1 min-w-[150px]">
              <label className="text-sm font-medium">Status</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="shrink-0 bg-primary/10 text-primary hover:bg-primary/20">
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* ====== Charts Row 1 ====== */}
      <h2 className="text-lg font-semibold flex items-center gap-2 mt-8 mb-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        Case Type Analytics
      </h2>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly/Quarterly/Yearly Incidents Trend */}
        <Card className="col-span-full xl:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Monthly/Quarterly/Yearly Incidents Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="incidents" name="Incidents" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Incident Type Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Incident Type Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center h-[260px]">
              <ResponsiveContainer width="55%" height="100%">
                <PieChart>
                  <Pie data={incidentTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                    {incidentTypeData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-[45%] space-y-2.5">
                {incidentTypeData.map(s => (
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

      {/* ====== Charts Row 2 ====== */}
      <div className="grid gap-6 lg:grid-cols-2">
      
        {/* Incident Cases by State */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><MapPin className="h-4 w-4 text-role-licensee-admin" /> Incident Cases by State</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={incidentsByState} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="state" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="cases" fill="hsl(var(--role-licensee-admin))" radius={[4, 4, 0, 0]} name="Cases" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Escalation Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-warning" /> Escalation Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center h-[260px]">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie data={escalationData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                    {escalationData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-[50%] space-y-4 px-2">
                <div className="p-3 bg-secondary/50 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Escalation Rate</p>
                  <p className="text-3xl font-bold text-destructive">25.5<span className="text-xl">%</span></p>
                </div>
                <div className="space-y-2">
                  {escalationData.map(s => (
                    <div key={s.name} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                        <span className="text-muted-foreground">{s.name}</span>
                      </div>
                      <span className="font-semibold">{s.value} Cases</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
