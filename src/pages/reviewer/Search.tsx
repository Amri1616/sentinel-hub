import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Eye, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const allCases = [
  { id: 'PSIRP-2025-0028', title: 'Critical Security Breach', organisation: 'Global Express Logistics Sdn Bhd', severity: 'Critical', status: 'Under Review', escalation: 'None', submitted: '2025-01-16' },
  { id: 'PSIRP-2025-0027', title: 'High-Value Theft Investigation', organisation: 'Swift Logistics Sdn Bhd', severity: 'High', status: 'Pending Review', escalation: 'None', submitted: '2025-01-16' },
  { id: 'PSIRP-2025-0026', title: 'Package Tampering Report', organisation: 'Global Express Logistics Sdn Bhd', severity: 'High', status: 'Clarification Requested', escalation: 'None', submitted: '2025-01-15' },
  { id: 'PSIRP-2025-0025', title: 'Lost Consignment Claim', organisation: 'Fast Delivery Enterprise', severity: 'Medium', status: 'Under Review', escalation: 'None', submitted: '2025-01-15' },
  { id: 'PSIRP-2025-0022', title: 'Suspicious Package Alert', organisation: 'Global Express Logistics Sdn Bhd', severity: 'Critical', status: 'Escalated', escalation: 'Approved', submitted: '2025-01-14' },
  { id: 'PSIRP-2025-0019', title: 'Dangerous Goods Mishandling', organisation: 'Pos Malaysia Berhad', severity: 'High', status: 'Closed', escalation: 'None', submitted: '2025-01-10' },
];

export default function CaseOfficerSearch() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('all');
  const [severity, setSeverity] = useState('all');
  const [escalation, setEscalation] = useState('all');

  const filtered = allCases.filter((c) => {
    if (status !== 'all' && c.status !== status) return false;
    if (severity !== 'all' && c.severity !== severity) return false;
    if (escalation !== 'all' && c.escalation !== escalation) return false;
    if (keyword && !c.title.toLowerCase().includes(keyword.toLowerCase()) && !c.id.toLowerCase().includes(keyword.toLowerCase()) && !c.organisation.toLowerCase().includes(keyword.toLowerCase())) return false;
    return true;
  });

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

  const getSeverityColor = (s: string) => {
    const colors: Record<string, string> = {
      'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
      'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    return colors[s] || 'bg-secondary';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Search & Filter</h1>
          <p className="text-muted-foreground">Advanced case search across your assignments</p>
        </div>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" />Export Results</Button>
      </div>

      {/* Filter panel */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5 text-role-reviewer" />Filters</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label>Keyword</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="ID, title, organisation..." className="pl-10" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Pending Review">Pending Review</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Clarification Requested">Clarification Requested</SelectItem>
                  <SelectItem value="Escalated">Escalated</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Severity</Label>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Escalation</Label>
              <Select value={escalation} onValueChange={setEscalation}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Pending Approval">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader><CardTitle>{filtered.length} Result{filtered.length !== 1 ? 's' : ''}</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Reference</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Organisation</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Severity</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-role-reviewer">{c.id}</td>
                    <td className="px-4 py-3 font-medium">{c.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.organisation}</td>
                    <td className="px-4 py-3"><Badge variant="outline" className={getSeverityColor(c.severity)}>{c.severity}</Badge></td>
                    <td className="px-4 py-3"><Badge variant="outline" className={getStatusColor(c.status)}>{c.status}</Badge></td>
                    <td className="px-4 py-3"><Button size="sm" variant="outline" onClick={() => navigate(`/case-officer/cases/${c.id}`)}><Eye className="mr-1 h-3 w-3" />View</Button></td>
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
