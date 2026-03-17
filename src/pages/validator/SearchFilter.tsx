import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const allCases = [
  { id: 'PSIRP-2025-0063', title: 'Tampering at sorting centre', organisation: 'Global Express Logistics', severity: 'Medium', status: 'Under Review', escalation: 'None', submitted: '2025-06-09' },
  { id: 'PSIRP-2025-0060', title: 'Cross-border contraband attempt', organisation: 'Pos Malaysia', severity: 'Critical', status: 'Escalation Pending', escalation: 'Pending', submitted: '2025-06-10' },
  { id: 'PSIRP-2025-0058', title: 'Suspicious parcel pattern', organisation: 'J&T Express', severity: 'High', status: 'Escalation Pending', escalation: 'Pending', submitted: '2025-06-08' },
  { id: 'PSIRP-2025-0055', title: 'Dangerous goods interception', organisation: 'DHL eCommerce', severity: 'High', status: 'Under Review', escalation: 'None', submitted: '2025-06-06' },
  { id: 'PSIRP-2025-0052', title: 'Missing parcel investigation', organisation: 'Ninja Van', severity: 'High', status: 'Escalation Pending', escalation: 'Pending', submitted: '2025-06-10' },
  { id: 'PSIRP-2025-0045', title: 'High-value theft – KL hub', organisation: 'Global Express Logistics', severity: 'Critical', status: 'Escalation Pending', escalation: 'Pending', submitted: '2025-06-09' },
  { id: 'PSIRP-2025-0030', title: 'Minor packaging damage', organisation: 'Pos Malaysia', severity: 'Medium', status: 'Closed', escalation: 'None', submitted: '2025-05-28' },
  { id: 'PSIRP-2025-0025', title: 'Contraband detection – Penang', organisation: 'DHL eCommerce', severity: 'High', status: 'Escalated', escalation: 'Approved', submitted: '2025-05-22' },
];

function getStatusColor(s: string) {
  const map: Record<string, string> = {
    'Under Review': 'border-status-in-review/50 text-status-in-review',
    'Escalation Pending': 'border-destructive/50 text-destructive',
    'Closed': 'border-status-closed/50 text-status-closed',
    'Escalated': 'border-role-reviewer/50 text-role-reviewer',
  };
  return map[s] || 'border-muted-foreground/50 text-muted-foreground';
}

function getSeverityColor(s: string) {
  const map: Record<string, string> = {
    'Critical': 'border-destructive/50 text-destructive',
    'High': 'border-status-in-review/50 text-status-in-review',
  };
  return map[s] || 'border-muted-foreground/50 text-muted-foreground';
}

export default function SupervisorSearchFilter() {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('all');
  const [severity, setSeverity] = useState('all');
  const [escalation, setEscalation] = useState('all');
  const navigate = useNavigate();

  const filtered = allCases.filter((c) => {
    if (status !== 'all' && c.status !== status) return false;
    if (severity !== 'all' && c.severity !== severity) return false;
    if (escalation !== 'all' && c.escalation !== escalation) return false;
    if (keyword) {
      const q = keyword.toLowerCase();
      return c.id.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.organisation.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Search & Filter</h1>
        <p className="text-muted-foreground">Find and filter cases across the platform</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by ID, title, organisation..." className="pl-9" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Escalation Pending">Escalation Pending</SelectItem>
                <SelectItem value="Escalated">Escalated</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger><SelectValue placeholder="Severity" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={escalation} onValueChange={setEscalation}>
              <SelectTrigger><SelectValue placeholder="Escalation" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Escalation</SelectItem>
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
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
                <TableHead>Title</TableHead>
                <TableHead>Organisation</TableHead>
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
                  <TableCell>{c.title}</TableCell>
                  <TableCell>{c.organisation}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getSeverityColor(c.severity)}>{c.severity}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(c.status)}>{c.status}</Badge>
                  </TableCell>
                  <TableCell>{c.escalation}</TableCell>
                  <TableCell className="text-muted-foreground">{c.submitted}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => navigate(`/validator/cases/${c.id}`)}>
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
