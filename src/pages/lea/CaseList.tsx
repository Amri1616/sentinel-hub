import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cases = [
  { id: 'ESC-2025-001', escalationDate: '2025-06-10', org: 'Global Express Logistics', severity: 'High', status: 'Under Investigation' },
  { id: 'ESC-2025-002', escalationDate: '2025-06-12', org: 'Pos Malaysia', severity: 'Critical', status: 'Evidence Seized' },
  { id: 'ESC-2025-003', escalationDate: '2025-06-13', org: 'J&T Express', severity: 'High', status: 'Pending Further Information' },
  { id: 'ESC-2025-004', escalationDate: '2025-06-14', org: 'Pos Malaysia', severity: 'High', status: 'Pending Acknowledgement' },
  { id: 'ESC-2025-005', escalationDate: '2025-06-15', org: 'J&T Express', severity: 'Critical', status: 'Pending Acknowledgement' },
  { id: 'ESC-2025-006', escalationDate: '2025-05-20', org: 'CityLink', severity: 'Medium', status: 'Prosecution Recommended' },
  { id: 'ESC-2025-007', escalationDate: '2025-05-15', org: 'DHL eCommerce', severity: 'High', status: 'No Further Action' },
  { id: 'ESC-2025-008', escalationDate: '2025-05-10', org: 'Global Express Logistics', severity: 'Medium', status: 'Outcome Submitted' },
];

const statusColors: Record<string, string> = {
  'Under Investigation': 'border-primary/50 text-primary',
  'Evidence Seized': 'border-role-validator/50 text-role-validator',
  'Pending Further Information': 'border-status-rfi/50 text-status-rfi',
  'Pending Acknowledgement': 'border-destructive/50 text-destructive',
  'Prosecution Recommended': 'border-role-investigator/50 text-role-investigator',
  'No Further Action': 'border-muted-foreground/50 text-muted-foreground',
  'Outcome Submitted': 'border-status-closed/50 text-status-closed',
};

export default function LEACaseList() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const navigate = useNavigate();

  const filtered = cases.filter((c) => {
    const matchSearch = !search || c.id.toLowerCase().includes(search.toLowerCase()) || c.org.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchSeverity = severityFilter === 'all' || c.severity === severityFilter;
    return matchSearch && matchStatus && matchSeverity;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Escalated Cases</h1>
        <p className="text-muted-foreground">Cases formally referred to your agency</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by reference or organisation..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[220px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending Acknowledgement">Pending Acknowledgement</SelectItem>
                <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                <SelectItem value="Evidence Seized">Evidence Seized</SelectItem>
                <SelectItem value="Pending Further Information">Pending Info</SelectItem>
                <SelectItem value="Prosecution Recommended">Prosecution Recommended</SelectItem>
                <SelectItem value="No Further Action">No Further Action</SelectItem>
                <SelectItem value="Outcome Submitted">Outcome Submitted</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Severity" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
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
                <TableHead>Escalation Date</TableHead>
                <TableHead>Organisation</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Investigation Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.id}</TableCell>
                  <TableCell>{c.escalationDate}</TableCell>
                  <TableCell>{c.org}</TableCell>
                  <TableCell>{c.severity}</TableCell>
                  <TableCell><Badge variant="outline" className={statusColors[c.status] || ''}>{c.status}</Badge></TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => navigate(`/lea/cases/${c.id}`)}>
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
