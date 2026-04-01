import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileBarChart, TrendingUp, BarChart3 as BarIcon, PieChart as PieIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const caseVolume = [
  { month: 'Jan', cases: 18, prev: 14 },
  { month: 'Feb', cases: 22, prev: 16 },
  { month: 'Mar', cases: 15, prev: 20 },
  { month: 'Apr', cases: 28, prev: 19 },
  { month: 'May', cases: 24, prev: 22 },
  { month: 'Jun', cases: 30, prev: 25 },
];

const categoryTrend = [
  { month: 'Jan', theft: 5, damage: 8, tampering: 3, hazmat: 2 },
  { month: 'Feb', theft: 7, damage: 9, tampering: 4, hazmat: 2 },
  { month: 'Mar', theft: 4, damage: 6, tampering: 3, hazmat: 2 },
  { month: 'Apr', theft: 9, damage: 10, tampering: 5, hazmat: 4 },
  { month: 'May', theft: 6, damage: 9, tampering: 5, hazmat: 4 },
  { month: 'Jun', theft: 8, damage: 12, tampering: 6, hazmat: 4 },
];

const severityData = [
  { name: 'Critical', value: 8, color: 'hsl(0 78% 62%)' },
  { name: 'High', value: 22, color: 'hsl(38 92% 50%)' },
  { name: 'Medium', value: 45, color: 'hsl(203 89% 53%)' },
  { name: 'Low', value: 25, color: 'hsl(168 76% 42%)' },
];

const statusData = [
  { name: 'Open', value: 18, color: 'hsl(203 89% 53%)' },
  { name: 'Under Review', value: 25, color: 'hsl(38 92% 50%)' },
  { name: 'Closed', value: 42, color: 'hsl(168 76% 42%)' },
  { name: 'No Further Action', value: 15, color: 'hsl(var(--muted-foreground))' },
];

const casesByOrg = [
  { org: 'Pos Malaysia', cases: 28 },
  { org: 'J&T Express', cases: 22 },
  { org: 'DHL eCommerce', cases: 18 },
  { org: 'CityLink', cases: 14 },
  { org: 'Global Express Logistics', cases: 12 },
];

const resolutionTime = [
  { month: 'Jan', avgDays: 8.2 },
  { month: 'Feb', avgDays: 7.5 },
  { month: 'Mar', avgDays: 9.1 },
  { month: 'Apr', avgDays: 6.3 },
  { month: 'May', avgDays: 7.0 },
  { month: 'Jun', avgDays: 5.8 },
];


const tooltipStyle = {
  backgroundColor: 'hsl(var(--background))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '6px',
};

export default function InvestigatorAnalytics() {
  const { toast } = useToast();

  const handleExport = (title: string, format: string) => {
    toast({ title: 'Export Started', description: `${title} – ${format} export queued.` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics & Report</h1>
        <p className="text-muted-foreground">Cross-organisation insights and governance metrics</p>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Cases', value: '137', icon: BarIcon },
          { label: 'Organisations', value: '12', icon: PieIcon },
          { label: 'Closed This Month', value: '30', icon: FileBarChart },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-role-investigator/15 flex items-center justify-center shrink-0">
                <kpi.icon className="h-5 w-5 text-role-investigator" />
              </div>
              <div>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="summary">Summary Analytics</TabsTrigger>
          <TabsTrigger value="trends">Incident Trends</TabsTrigger>
          <TabsTrigger value="resolution">Resolution</TabsTrigger>
        </TabsList>

        {/* Summary Analytics */}
        <TabsContent value="summary" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Case Volume Trend</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={caseVolume}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend />
                      <Line type="monotone" dataKey="cases" stroke="hsl(var(--role-investigator))" strokeWidth={2} name="Current Period" />
                      <Line type="monotone" dataKey="prev" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" name="Previous Period" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Cases by Organisation</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={casesByOrg} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" />
                      <YAxis dataKey="org" type="category" width={110} tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="cases" fill="hsl(var(--role-investigator))" radius={[0, 4, 4, 0]} name="Cases" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Severity Distribution</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={severityData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {severityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Status Distribution</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Incident Trends */}
        <TabsContent value="trends">
          <Card>
            <CardHeader><CardTitle>Incident Type Trend</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar dataKey="theft" stackId="a" fill="hsl(0 78% 62%)" name="Theft" />
                    <Bar dataKey="damage" stackId="a" fill="hsl(38 92% 50%)" name="Damage" />
                    <Bar dataKey="tampering" stackId="a" fill="hsl(203 89% 53%)" name="Tampering" />
                    <Bar dataKey="hazmat" stackId="a" fill="hsl(168 76% 42%)" name="Hazmat" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resolution Time */}
        <TabsContent value="resolution">
          <Card>
            <CardHeader><CardTitle>Average Resolution Time</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={resolutionTime}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis unit="d" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="avgDays" stroke="hsl(var(--primary))" strokeWidth={2} name="Avg Days to Close" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 border border-border/40 rounded-lg">
                  <p className="text-xl font-bold text-primary">7.3</p>
                  <p className="text-xs text-muted-foreground">Avg Days to Close (Overall)</p>
                </div>
                <div className="text-center p-3 border border-border/40 rounded-lg">
                  <p className="text-xl font-bold text-role-investigator">2.1d</p>
                  <p className="text-xs text-muted-foreground">Avg Reporting Delay</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}