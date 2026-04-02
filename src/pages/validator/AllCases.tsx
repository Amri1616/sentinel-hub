import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Eye, Lock, CheckCircle, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const allCases = [
  { id: 'PSIRP-2025-0063', org: 'Global Express Logistics', officer: 'Raj Kumar', severity: 'Medium', status: 'Under Review', escalation: 'None', date: '2025-06-09', lastUpdated: '2025-06-11' },
  { id: 'PSIRP-2025-0060', org: 'Pos Malaysia', officer: 'Farah Amin', severity: 'Critical', status: 'Escalation Pending', escalation: 'Pending', date: '2025-06-10', lastUpdated: '2025-06-12' },
  { id: 'PSIRP-2025-0058', org: 'J&T Express', officer: 'Lee Wei', severity: 'High', status: 'Escalation Pending', escalation: 'Pending', date: '2025-06-08', lastUpdated: '2025-06-10' },
  { id: 'PSIRP-2025-0055', org: 'DHL eCommerce', officer: 'Ahmad Razif', severity: 'High', status: 'Under Review', escalation: 'None', date: '2025-06-06', lastUpdated: '2025-06-07' },
  { id: 'PSIRP-2025-0052', org: 'Ninja Van', officer: 'Nurul Hana', severity: 'High', status: 'Escalation Pending', escalation: 'Pending', date: '2025-06-10', lastUpdated: '2025-06-12' },
  { id: 'PSIRP-2025-0048', org: 'CityLink', officer: 'Lee Wei', severity: 'Low', status: 'Clarification Requested', escalation: 'None', date: '2025-06-03', lastUpdated: '2025-06-05' },
  { id: 'PSIRP-2025-0045', org: 'Global Express Logistics', officer: 'Ahmad Razif', severity: 'Critical', status: 'Escalation Pending', escalation: 'Pending', date: '2025-06-09', lastUpdated: '2025-06-11' },
  { id: 'PSIRP-2025-0030', org: 'Pos Malaysia', officer: 'Nurul Hana', severity: 'Medium', status: 'Closed', escalation: 'None', date: '2025-05-28', lastUpdated: '2025-06-05' },
  { id: 'PSIRP-2025-0025', org: 'DHL eCommerce', officer: 'Farah Amin', severity: 'High', status: 'Escalated', escalation: 'Approved', date: '2025-05-22', lastUpdated: '2025-05-28' },
];

const closableCases = [
  { id: 'PSIRP-2025-0040', title: 'Minor packaging damage', officer: 'Lee Wei', severity: 'Low', status: 'Under Review', days: 10 },
  { id: 'PSIRP-2025-0038', title: 'Delayed delivery complaint', officer: 'Nurul Hana', severity: 'Low', status: 'Recommendation for Closure', days: 12 },
  { id: 'PSIRP-2025-0035', title: 'Address label tampering', officer: 'Ahmad Razif', severity: 'Medium', status: 'Under Review', days: 15 },
  { id: 'PSIRP-2025-0025', title: 'Contraband detection – Penang hub', officer: 'Farah Amin', severity: 'High', status: 'Escalated', days: 20 },
];

const statusColors: Record<string, string> = {
  'Under Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30 px-2.5 py-0.5 rounded-full',
  'Escalation Pending': 'bg-destructive/20 text-destructive border-destructive/30 px-2.5 py-0.5 rounded-full',
  'Clarification Requested': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30 px-2.5 py-0.5 rounded-full',
  'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30 px-2.5 py-0.5 rounded-full',
  'Escalated': 'bg-role-reviewer/20 text-role-reviewer border-role-reviewer/30 px-2.5 py-0.5 rounded-full',
  'Submitted': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30 px-2.5 py-0.5 rounded-full',
  'Recommendation for Closure': 'bg-status-closed/20 text-status-closed border-status-closed/30 px-2.5 py-0.5 rounded-full',
};

export default function CaseMonitoring() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [orgFilter, setOrgFilter] = useState('all');
  const [closeDialog, setCloseDialog] = useState<string | null>(null);
  const [outcome, setOutcome] = useState('');
  const [summary, setSummary] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const filtered = allCases.filter((c) => {
    if (search && !c.id.toLowerCase().includes(search.toLowerCase()) && !c.org.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (severityFilter !== 'all' && c.severity !== severityFilter) return false;
    if (orgFilter !== 'all' && c.org !== orgFilter) return false;
    return true;
  });

  const orgs = [...new Set(allCases.map((c) => c.org))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Case Monitoring</h1>
          <p className="text-muted-foreground">Monitor all cases and manage case closures</p>
        </div>
        <Button variant="outline" onClick={() => toast({ title: 'Export Started', description: 'Case monitoring data export queued.' })}>
          <Download className="h-4 w-4 mr-2" /> Export
        </Button>
      </div>

      <Tabs defaultValue="monitoring" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monitoring">All Cases</TabsTrigger>
          <TabsTrigger value="closure">Case Closure</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Escalation Pending">Escalation Pending</SelectItem>
                    <SelectItem value="Clarification Requested">Clarification Requested</SelectItem>
                    <SelectItem value="Escalated">Escalated</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger><SelectValue placeholder="Severity" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={orgFilter} onValueChange={setOrgFilter}>
                  <SelectTrigger><SelectValue placeholder="Organisation" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Organisations</SelectItem>
                    {orgs.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full overflow-hidden border">
            <CardContent className="p-0">
              <div className="relative group w-full overflow-hidden">
                <div className="overflow-x-auto w-full">
                  <Table className="table-auto w-full text-sm">
                    <TableHeader className="bg-muted/50 border-b border-border">
                      <TableRow>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Reference</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[180px]">Organisation</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[150px]">Assigned Officer</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[120px]">Severity</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Status</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[150px]">Escalation Status</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[160px]">Last Updated Date</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Submitted</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[50px] text-foreground"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id} className="hover:bg-muted/30 cursor-pointer transition-colors border-b" onClick={() => navigate(`/supervisor/cases/${c.id}`)}>
                      <TableCell className="px-3 py-4 text-center align-middle font-mono font-bold text-primary hover:underline cursor-pointer text-sm" onClick={() => navigate(`/supervisor/cases/${c.id}`)}>{c.id}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle whitespace-normal text-sm">{c.org}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm">{c.officer}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${c.severity === 'Critical' ? 'bg-destructive/20 text-destructive border-destructive/30' : c.severity === 'High' ? 'bg-status-in-review/20 text-status-in-review border-status-in-review/30' : 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30'} px-2.5 py-0.5 rounded-full text-[11px]`}>
                            {c.severity}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${statusColors[c.status] || ''} text-[11px]`}>{c.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm">{c.escalation}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{c.lastUpdated}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{c.date}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Button size="sm" variant="ghost" onClick={() => navigate(`/supervisor/cases/${c.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                    </TableBody>
                  </Table>
                </div>
                {/* Scroll Hint Shadow */}
                <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none bg-gradient-to-l from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-r" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="closure" className="space-y-4">
          <Card className="w-full overflow-hidden border">
            <CardHeader>
              <CardTitle>Case Closure – Supervisor Authority</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative group w-full overflow-hidden">
                <div className="overflow-x-auto w-full">
                  <Table className="table-auto w-full text-sm">
                    <TableHeader className="bg-muted/50 border-b border-border">
                      <TableRow>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Reference</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[200px]">Title</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[150px]">Assigned Officer</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[120px]">Severity</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Status</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[160px]">Last Updated Date</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[120px]">Days Open</TableHead>
                        <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[100px] text-foreground"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                  {closableCases.map((c) => (
                    <TableRow key={c.id} className="hover:bg-muted/30 cursor-pointer transition-colors border-b" onClick={() => navigate(`/supervisor/cases/${c.id}`)}>
                      <TableCell className="px-3 py-4 text-center align-middle font-mono font-bold text-primary hover:underline cursor-pointer text-sm" onClick={() => navigate(`/supervisor/cases/${c.id}`)}>{c.id}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle whitespace-normal text-sm">{c.title}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm">{c.officer}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${c.severity === 'High' ? 'bg-status-in-review/20 text-status-in-review border-status-in-review/30' : 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30'} px-2.5 py-0.5 rounded-full text-[11px]`}>
                            {c.severity}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${statusColors[c.status] || ''} text-[11px]`}>{c.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">2025-06-12</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm">{c.days}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Button size="sm" onClick={() => setCloseDialog(c.id)}>
                            <Lock className="h-4 w-4 mr-1" /> Close
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                    </TableBody>
                  </Table>
                </div>
                {/* Scroll Hint Shadow */}
                <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none bg-gradient-to-l from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-r" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!closeDialog} onOpenChange={() => { setCloseDialog(null); setOutcome(''); setSummary(''); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Close Case – {closeDialog}</DialogTitle>
            <DialogDescription>Select an outcome and provide a closure summary. This action is final and will lock the case.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Outcome</p>
              <Select value={outcome} onValueChange={setOutcome}>
                <SelectTrigger><SelectValue placeholder="Select closure outcome" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="action-taken">Closed – Action Taken</SelectItem>
                  <SelectItem value="no-further-action">Closed – No Further Action</SelectItem>
                  <SelectItem value="referred-lea">Closed – Referred to LEA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Closure Summary</p>
              <Textarea placeholder="Enter closure summary..." value={summary} onChange={(e) => setSummary(e.target.value)} className="min-h-[120px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setCloseDialog(null); setOutcome(''); setSummary(''); }}>Cancel</Button>
            <Button disabled={!outcome || !summary.trim()} onClick={() => {
              toast({ title: 'Case Closed', description: `${closeDialog} has been closed and locked.` });
              setCloseDialog(null); setOutcome(''); setSummary('');
            }}>
              <CheckCircle className="h-4 w-4 mr-2" /> Confirm Closure
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
