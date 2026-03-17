import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReviewerAllCases() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allCases = [
    { id: 'PSIRP-2025-0028', title: 'Critical Security Breach', organisation: 'Global Express Logistics Sdn Bhd', officer: 'You', severity: 'Critical', status: 'Under Review', submitted: '2025-01-16', isOwn: true },
    { id: 'PSIRP-2025-0027', title: 'High-Value Theft Investigation', organisation: 'Swift Logistics Sdn Bhd', officer: 'You', severity: 'High', status: 'Pending Review', submitted: '2025-01-16', isOwn: true },
    { id: 'PSIRP-2025-0030', title: 'Warehouse Break-in', organisation: 'Pos Malaysia Berhad', officer: 'Nurul Hana', severity: 'High', status: 'Under Review', submitted: '2025-01-17', isOwn: false },
    { id: 'PSIRP-2025-0031', title: 'Package Diversion Scheme', organisation: 'Global Express Logistics Sdn Bhd', officer: 'Lee Wei', severity: 'Critical', status: 'Escalation Pending', submitted: '2025-01-17', isOwn: false },
    { id: 'PSIRP-2025-0029', title: 'Missing Registered Mail', organisation: 'Fast Delivery Enterprise', officer: 'Farah Amin', severity: 'Medium', status: 'RFI Sent', submitted: '2025-01-16', isOwn: false },
    { id: 'PSIRP-2025-0026', title: 'Package Tampering Report', organisation: 'Global Express Logistics Sdn Bhd', officer: 'You', severity: 'High', status: 'RFI Sent', submitted: '2025-01-15', isOwn: true },
    { id: 'PSIRP-2025-0032', title: 'Delayed Goods Complaint', organisation: 'Swift Logistics Sdn Bhd', officer: 'Ahmad Razif', severity: 'Low', status: 'Under Review', submitted: '2025-01-18', isOwn: false },
  ];

  const filtered = allCases.filter((i) => {
    if (statusFilter !== 'all' && i.status !== statusFilter) return false;
    if (severityFilter !== 'all' && i.severity !== severityFilter) return false;
    if (searchQuery && !i.title.toLowerCase().includes(searchQuery.toLowerCase()) && !i.id.toLowerCase().includes(searchQuery.toLowerCase()) && !i.organisation.toLowerCase().includes(searchQuery.toLowerCase()) && !i.officer.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Pending Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
      'RFI Sent': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
      'Under Review': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30',
      'Escalation Pending': 'bg-destructive/20 text-destructive border-destructive/30',
      'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30',
    };
    return colors[status] || 'bg-secondary';
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
      'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    return colors[severity] || 'bg-secondary';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Case Monitoring</h1>
        <p className="text-muted-foreground">Monitor all cases across Case Officers — you can comment on colleagues' assessments</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by ID, title, organisation, or officer..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="RFI Sent">RFI Sent</SelectItem>
                <SelectItem value="Escalation Pending">Escalation Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Severity" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Reference</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Organisation</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Assigned Officer</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Severity</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Submitted</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-role-reviewer">{c.id}</td>
                    <td className="px-4 py-3 font-medium">{c.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.organisation}</td>
                    <td className="px-4 py-3">
                      <span className={c.isOwn ? 'text-role-reviewer font-medium' : 'text-muted-foreground'}>{c.officer}</span>
                    </td>
                    <td className="px-4 py-3"><Badge variant="outline" className={getSeverityColor(c.severity)}>{c.severity}</Badge></td>
                    <td className="px-4 py-3"><Badge variant="outline" className={getStatusColor(c.status)}>{c.status}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{c.submitted}</td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="outline" onClick={() => navigate(`/reviewer/cases/${c.id}`)}>
                        <Eye className="mr-1 h-3 w-3" />{c.isOwn ? 'Review' : 'View'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
