import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Download, FileBarChart, TrendingUp, AlertTriangle, CheckCircle2, Clock, FileSpreadsheet, Shield } from 'lucide-react';
import MalaysiaIncidentMap from '@/components/MalaysiaIncidentMap';
import { useToast } from '@/hooks/use-toast';
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const tooltipStyle = { backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' };

const caseSummary = [
  { id: 'PSIRP-2025-0028', status: 'Under Review', severity: 'Critical', organisation: 'Global Express Logistics Sdn Bhd', officer: 'CO-2024-015' },
  { id: 'PSIRP-2025-0027', status: 'Pending Review', severity: 'High', organisation: 'Swift Logistics Sdn Bhd', officer: 'CO-2024-015' },
  { id: 'PSIRP-2025-0026', status: 'Clarification Requested', severity: 'High', organisation: 'Global Express Logistics Sdn Bhd', officer: 'CO-2024-015' },
  { id: 'PSIRP-2025-0025', status: 'Under Review', severity: 'Medium', organisation: 'Fast Delivery Enterprise', officer: 'CO-2024-015' },
  { id: 'PSIRP-2025-0022', status: 'Escalated', severity: 'Critical', organisation: 'Global Express Logistics Sdn Bhd', officer: 'CO-2024-015' },
  { id: 'PSIRP-2025-0019', status: 'Closed', severity: 'High', organisation: 'Pos Malaysia Berhad', officer: 'CO-2024-015' },
];

const severityData = [
  { name: 'Critical', value: 2, color: 'hsl(0 78% 62%)' },
  { name: 'High', value: 3, color: 'hsl(25 95% 53%)' },
  { name: 'Medium', value: 1, color: 'hsl(48 96% 53%)' },
  { name: 'Low', value: 0, color: 'hsl(142 71% 45%)' },
];

const statusData = [
  { name: 'Pending Review', value: 1, color: 'hsl(203 89% 53%)' },
  { name: 'Under Review', value: 2, color: 'hsl(38 92% 50%)' },
  { name: 'Clarification', value: 1, color: 'hsl(271 76% 53%)' },
  { name: 'Escalated', value: 1, color: 'hsl(0 78% 62%)' },
  { name: 'Closed', value: 1, color: 'hsl(168 76% 42%)' },
];

const monthlyTrend = [
  { month: 'Aug', submitted: 4, closed: 2, escalated: 1 },
  { month: 'Sep', submitted: 6, closed: 4, escalated: 1 },
  { month: 'Oct', submitted: 5, closed: 3, escalated: 2 },
  { month: 'Nov', submitted: 8, closed: 5, escalated: 2 },
  { month: 'Dec', submitted: 7, closed: 6, escalated: 1 },
  { month: 'Jan', submitted: 6, closed: 3, escalated: 2 },
];

const orgBreakdown = [
  { org: 'Global Express Logistics', cases: 8, escalated: 3 },
  { org: 'Swift Logistics', cases: 5, escalated: 1 },
  { org: 'Fast Delivery', cases: 3, escalated: 0 },
  { org: 'Pos Malaysia', cases: 4, escalated: 1 },
];



export default function CaseOfficerReports() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('analytics');
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedCases, setSelectedCases] = useState<Record<string, boolean>>(
    Object.fromEntries(caseSummary.map(c => [c.id, true]))
  );

  const toggleCase = (id: string) => {
    setSelectedCases(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const allSelected = caseSummary.every(c => selectedCases[c.id]);
  const toggleAll = () => {
    const next = !allSelected;
    setSelectedCases(Object.fromEntries(caseSummary.map(c => [c.id, next])));
  };

  const handleConfirmExport = () => {
    const selected = caseSummary.filter(c => selectedCases[c.id]);
    if (selected.length === 0) {
      toast({ title: 'No cases selected', description: 'Please select at least one case to export.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Exporting as Excel', description: `Exporting ${selected.length} case${selected.length > 1 ? 's' : ''} to Excel.` });
    setExportModalOpen(false);
  };

  const getStatusColor = (s: string) => {
    const colors: Record<string, string> = {
      'Pending Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
      'Under Review': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30',
      'Clarification Requested': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
      'Escalated': 'bg-destructive/20 text-destructive border-destructive/30',
      'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30',
    };
    return colors[s] || 'bg-secondary';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics & Report</h1>
          <p className="text-muted-foreground">Incident trend analytics and reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setExportModalOpen(true)}><FileSpreadsheet className="mr-2 h-4 w-4" />Export Excel</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analytics">Summary Analytics</TabsTrigger>
          <TabsTrigger value="reports">Case Reports</TabsTrigger>
        </TabsList>

        {/* ===== ANALYTICS TAB ===== */}
        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-role-reviewer/20 flex items-center justify-center"><TrendingUp className="h-5 w-5 text-role-reviewer" /></div>
                <div><p className="text-2xl font-bold">{caseSummary.length}</p><p className="text-xs text-muted-foreground">Total Active Cases</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center"><AlertTriangle className="h-5 w-5 text-destructive" /></div>
                <div><p className="text-2xl font-bold">{caseSummary.filter(c => c.severity === 'Critical').length}</p><p className="text-xs text-muted-foreground">Critical Cases</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-status-closed/20 flex items-center justify-center"><CheckCircle2 className="h-5 w-5 text-status-closed" /></div>
                <div><p className="text-2xl font-bold">{caseSummary.filter(c => c.status === 'Closed').length}</p><p className="text-xs text-muted-foreground">Closed Cases</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-status-rfi/20 flex items-center justify-center"><Clock className="h-5 w-5 text-status-rfi" /></div>
                <div><p className="text-2xl font-bold">4.2</p><p className="text-xs text-muted-foreground">Avg. Days to Close</p></div>
              </CardContent>
            </Card>
          </div>

          {/* Incident Geo-Density Heat Map */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-role-reviewer" />
                Incident Density Heat Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MalaysiaIncidentMap />
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Monthly Case Trend</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Line type="monotone" dataKey="submitted" stroke="hsl(203 89% 53%)" strokeWidth={2} name="Submitted" />
                    <Line type="monotone" dataKey="closed" stroke="hsl(168 76% 42%)" strokeWidth={2} name="Closed" />
                    <Line type="monotone" dataKey="escalated" stroke="hsl(0 78% 62%)" strokeWidth={2} name="Escalated" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Severity Distribution</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={severityData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                      {severityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 justify-center mt-2">
                  {severityData.map(s => (
                    <div key={s.name} className="flex items-center gap-1.5 text-xs">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-muted-foreground">{s.name} ({s.value})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Status Overview</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Cases by Organisation</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={orgBreakdown} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis type="category" dataKey="org" stroke="hsl(var(--muted-foreground))" fontSize={11} width={110} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar dataKey="cases" fill="hsl(203 89% 53%)" name="Total Cases" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="escalated" fill="hsl(0 78% 62%)" name="Escalated" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>


        </TabsContent>

        {/* ===== REPORTS TAB ===== */}
        <TabsContent value="reports" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-role-reviewer">{caseSummary.length}</p><p className="text-sm text-muted-foreground">Total Cases</p></CardContent></Card>
            <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-destructive">{caseSummary.filter(c => c.severity === 'Critical').length}</p><p className="text-sm text-muted-foreground">Critical</p></CardContent></Card>
            <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-status-closed">{caseSummary.filter(c => c.status === 'Closed').length}</p><p className="text-sm text-muted-foreground">Closed</p></CardContent></Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><FileBarChart className="h-5 w-5 text-role-reviewer" />Case Summary Report</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Reference No</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Severity</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Organisation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {caseSummary.map(c => (
                      <tr key={c.id} className="hover:bg-muted/30">
                        <td className="px-4 py-3 font-mono text-role-reviewer">{c.id}</td>
                        <td className="px-4 py-3"><Badge variant="outline" className={getStatusColor(c.status)}>{c.status}</Badge></td>
                        <td className="px-4 py-3">{c.severity}</td>
                        <td className="px-4 py-3">{c.organisation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export Excel Modal */}
      <Dialog open={exportModalOpen} onOpenChange={setExportModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-role-reviewer" />
              Export to Excel
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-1 py-2">
            <p className="text-sm text-muted-foreground mb-3">Select the cases you want to include in the export:</p>
            <label
              htmlFor="export-select-all"
              className="flex items-center gap-3 rounded-md px-3 py-2.5 hover:bg-muted/50 cursor-pointer transition-colors border-b border-border mb-1"
            >
              <input
                type="checkbox"
                id="export-select-all"
                checked={allSelected}
                onChange={toggleAll}
                className="rounded border-border h-4 w-4 accent-[hsl(var(--primary))]"
              />
              <Label htmlFor="export-select-all" className="text-sm cursor-pointer flex-1 font-medium">Select All</Label>
            </label>
            {caseSummary.map(c => (
              <label
                key={c.id}
                htmlFor={`export-${c.id}`}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  id={`export-${c.id}`}
                  checked={selectedCases[c.id]}
                  onChange={() => toggleCase(c.id)}
                  className="rounded border-border h-4 w-4 accent-[hsl(var(--primary))]"
                />
                <div className="flex-1">
                  <Label htmlFor={`export-${c.id}`} className="text-sm cursor-pointer font-mono text-role-reviewer">{c.id}</Label>
                  <p className="text-xs text-muted-foreground">{c.organisation} · {c.severity} · {c.status}</p>
                </div>
              </label>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportModalOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmExport}>
              <Download className="h-4 w-4 mr-2" /> Confirm Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
