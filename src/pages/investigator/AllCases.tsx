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
  { id: 'PSIRP-2025-0063', org: 'Global Express Logistics', reporter: 'Ali Hassan', officer: 'Raj Kumar', severity: 'Medium', status: 'Under Review', escalation: 'None', submitted: '2025-06-10', closed: '-' },
  { id: 'PSIRP-2025-0060', org: 'Pos Malaysia', reporter: 'Siti Aisyah', officer: 'Farah Amin', severity: 'Critical', status: 'Escalation Pending', escalation: 'Pending', submitted: '2025-06-08', closed: '-' },
  { id: 'PSIRP-2025-0058', org: 'J&T Express', reporter: 'Lim Wei Jie', officer: 'Lee Wei', severity: 'High', status: 'Under Review', escalation: 'None', submitted: '2025-06-07', closed: '-' },
  { id: 'PSIRP-2025-0055', org: 'Global Express Logistics', reporter: 'Ahmad Zulkifli', officer: 'Ahmad Razif', severity: 'Medium', status: 'Closed', escalation: 'None', submitted: '2025-06-05', closed: '2025-06-09' },
  { id: 'PSIRP-2025-0052', org: 'J&T Express', reporter: 'Tan Mei Ling', officer: 'Nurul Hana', severity: 'High', status: 'Escalated', escalation: 'PDRM', submitted: '2025-06-03', closed: '-' },
  { id: 'PSIRP-2025-0049', org: 'CityLink', reporter: 'Kumar Raj', officer: 'Ahmad Razif', severity: 'Low', status: 'Closed', escalation: 'None', submitted: '2025-06-01', closed: '2025-06-06' },
  { id: 'PSIRP-2025-0045', org: 'DHL eCommerce', reporter: 'Wong Kai Wen', officer: 'Farah Amin', severity: 'Critical', status: 'Escalated', escalation: 'Customs', submitted: '2025-05-28', closed: '-' },
  { id: 'PSIRP-2025-0039', org: 'Pos Malaysia', reporter: 'Nurul Izzah', officer: 'Lee Wei', severity: 'Medium', status: 'Closed', escalation: 'None', submitted: '2025-05-25', closed: '2025-05-30' },
];

const statusColors: Record<string, string> = {
  'Under Review': 'border-status-in-review/50 text-status-in-review',
  'Escalation Pending': 'border-role-validator/50 text-role-validator',
  'Escalated': 'border-destructive/50 text-destructive',
  'Closed': 'border-status-closed/50 text-status-closed',
  'Submitted': 'border-status-submitted/50 text-status-submitted',
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

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Organisation</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Officer</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Escalation</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.id}</TableCell>
                  <TableCell>{c.org}</TableCell>
                  <TableCell>{c.reporter}</TableCell>
                  <TableCell>{c.officer}</TableCell>
                  <TableCell>{c.severity}</TableCell>
                  <TableCell><Badge variant="outline" className={statusColors[c.status] || ''}>{c.status}</Badge></TableCell>
                  <TableCell>{c.escalation}</TableCell>
                  <TableCell>{c.submitted}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => navigate(`/investigator/cases/${c.id}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
