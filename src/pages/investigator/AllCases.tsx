import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const casesData = [
  { id: 'PSIRP-2025-0063', org: 'Global Express Logistics', reporter: 'Ali Hassan', officer: 'Raj Kumar', severity: 'Medium', status: 'Under Review', escalation: 'None', submitted: '2025-06-10', lastUpdated: '2025-06-12', closed: '-' },
  { id: 'PSIRP-2025-0060', org: 'Pos Malaysia', reporter: 'Siti Aisyah', officer: 'Farah Amin', severity: 'Critical', status: 'Escalation Pending', escalation: 'Pending', submitted: '2025-06-08', lastUpdated: '2025-06-10', closed: '-' },
  { id: 'PSIRP-2025-0058', org: 'J&T Express', reporter: 'Lim Wei Jie', officer: 'Lee Wei', severity: 'High', status: 'Under Review', escalation: 'None', submitted: '2025-06-07', lastUpdated: '2025-06-09', closed: '-' },
  { id: 'PSIRP-2025-0055', org: 'Global Express Logistics', reporter: 'Ahmad Zulkifli', officer: 'Ahmad Razif', severity: 'Medium', status: 'Closed', escalation: 'None', submitted: '2025-06-05', lastUpdated: '2025-06-09', closed: '2025-06-09' },
  { id: 'PSIRP-2025-0052', org: 'J&T Express', reporter: 'Tan Mei Ling', officer: 'Nurul Hana', severity: 'High', status: 'Escalated', escalation: 'PDRM', submitted: '2025-06-03', lastUpdated: '2025-06-10', closed: '-' },
  { id: 'PSIRP-2025-0049', org: 'CityLink', reporter: 'Kumar Raj', officer: 'Ahmad Razif', severity: 'Low', status: 'Closed', escalation: 'None', submitted: '2025-06-01', lastUpdated: '2025-06-06', closed: '2025-06-06' },
  { id: 'PSIRP-2025-0045', org: 'DHL eCommerce', reporter: 'Wong Kai Wen', officer: 'Farah Amin', severity: 'Critical', status: 'Escalated', escalation: 'Customs', submitted: '2025-05-28', lastUpdated: '2025-06-05', closed: '-' },
  { id: 'PSIRP-2025-0039', org: 'Pos Malaysia', reporter: 'Nurul Izzah', officer: 'Lee Wei', severity: 'Medium', status: 'Closed', escalation: 'None', submitted: '2025-05-25', lastUpdated: '2025-05-30', closed: '2025-05-30' },
];

const statusColors: Record<string, string> = {
  'Under Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30 px-2.5 py-0.5 rounded-full',
  'Escalation Pending': 'bg-role-validator/20 text-role-validator border-role-validator/30 px-2.5 py-0.5 rounded-full',
  'Escalated': 'bg-destructive/20 text-destructive border-destructive/30 px-2.5 py-0.5 rounded-full',
  'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30 px-2.5 py-0.5 rounded-full',
  'Submitted': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30 px-2.5 py-0.5 rounded-full',
};

export default function InvestigatorAllCases() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const navigate = useNavigate();

  const filtered = casesData.filter((c) => {
    const matchSearch = !search || c.id.toLowerCase().includes(search.toLowerCase()) || c.org.toLowerCase().includes(search.toLowerCase()) || c.reporter.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchSeverity = severityFilter === 'all' || c.severity === severityFilter;
    return matchSearch && matchStatus && matchSeverity;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Cases</h1>
        <p className="text-muted-foreground">Read-only view across all organisations</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by reference, organisation, reporter..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Escalation Pending">Escalation Pending</SelectItem>
                <SelectItem value="Escalated">Escalated</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Severity" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
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
                    <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[150px]">Reporter</TableHead>
                    <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Officer</TableHead>
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
                <TableRow key={c.id} className="hover:bg-muted/30 cursor-pointer transition-colors border-b" onClick={() => navigate(`/internal/cases/${c.id}`)}>
                  <TableCell className="px-3 py-4 text-center align-middle font-mono font-bold text-primary hover:underline cursor-pointer text-sm" onClick={() => navigate(`/internal/cases/${c.id}`)}>{c.id}</TableCell>
                  <TableCell className="px-3 py-4 text-center align-middle whitespace-normal text-sm">{c.org}</TableCell>
                  <TableCell className="px-3 py-4 text-center align-middle whitespace-normal text-sm">{c.reporter}</TableCell>
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
                  <TableCell className="px-3 py-4 text-center align-middle text-sm">{c.submitted}</TableCell>
                  <TableCell className="px-3 py-4 text-center align-middle text-sm">
                    <div className="flex justify-center">
                      <Button size="sm" variant="ghost" onClick={() => navigate(`/internal/cases/${c.id}`)}>
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
    </div>
  );
}
