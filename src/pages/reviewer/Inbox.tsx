import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Eye, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function CaseOfficerInbox() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [exportMode, setExportMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const incidents = [
    { id: 'PSIRP-2025-0028', title: 'Critical Security Breach', organisation: 'Global Express Logistics Sdn Bhd', severity: 'Critical', status: 'Pending Review', escalation: 'None', submitted: '2025-01-16' },
    { id: 'PSIRP-2025-0027', title: 'High-Value Theft Investigation', organisation: 'Swift Logistics Sdn Bhd', severity: 'High', status: 'Pending Review', escalation: 'None', submitted: '2025-01-16' },
    { id: 'PSIRP-2025-0026', title: 'Package Tampering Report', organisation: 'Global Express Logistics Sdn Bhd', severity: 'High', status: 'RFI Sent', escalation: 'None', submitted: '2025-01-15' },
    { id: 'PSIRP-2025-0025', title: 'Lost Consignment Claim', organisation: 'Fast Delivery Enterprise', severity: 'Medium', status: 'Under Review', escalation: 'None', submitted: '2025-01-15' },
    { id: 'PSIRP-2025-0024', title: 'Fraud Attempt Documentation', organisation: 'Global Express Logistics Sdn Bhd', severity: 'High', status: 'RFI Sent', escalation: 'None', submitted: '2025-01-15' },
    { id: 'PSIRP-2025-0023', title: 'Damaged Goods Report', organisation: 'Swift Logistics Sdn Bhd', severity: 'Medium', status: 'Under Review', escalation: 'None', submitted: '2025-01-14' },
    { id: 'PSIRP-2025-0022', title: 'Suspicious Package Alert', organisation: 'Global Express Logistics Sdn Bhd', severity: 'Critical', status: 'Escalation Pending', escalation: 'Pending Approval', submitted: '2025-01-14' },
    { id: 'PSIRP-2025-0021', title: 'Delayed Goods — Route 7', organisation: 'Pos Malaysia Berhad', severity: 'Low', status: 'Under Review', escalation: 'None', submitted: '2025-01-13' },
  ];

  const filtered = incidents.filter((i) => {
    if (statusFilter !== 'all' && i.status !== statusFilter) return false;
    if (severityFilter !== 'all' && i.severity !== severityFilter) return false;
    if (searchQuery && !i.title.toLowerCase().includes(searchQuery.toLowerCase()) && !i.id.toLowerCase().includes(searchQuery.toLowerCase()) && !i.organisation.toLowerCase().includes(searchQuery.toLowerCase())) return false;
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

  /* ── Export mode helpers ── */
  const handleToggleExportMode = () => {
    if (exportMode) {
      setExportMode(false);
      setSelectedIds(new Set());
    } else {
      setExportMode(true);
      setSelectedIds(new Set());
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((i) => i.id)));
    }
  };

  const allSelected = filtered.length > 0 && selectedIds.size === filtered.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < filtered.length;

  const handleDownloadSelected = () => {
    if (selectedIds.size === 0) return;
    toast({
      title: 'Export Started',
      description: `Exporting ${selectedIds.size} case${selectedIds.size > 1 ? 's' : ''}…`,
    });
    setExportMode(false);
    setSelectedIds(new Set());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Assignment Inbox</h1>
          <p className="text-muted-foreground">Cases assigned to you</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by ID, title, or organisation..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
            <Input type="date" className="w-[160px]" />

            {/* Export / Cancel + Download */}
            {!exportMode ? (
              <Button variant="outline" onClick={handleToggleExportMode}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="default"
                  disabled={selectedIds.size === 0}
                  onClick={handleDownloadSelected}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download ({selectedIds.size})
                </Button>
                <Button variant="ghost" onClick={handleToggleExportMode}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Export mode banner */}
      {exportMode && (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-primary/30 bg-primary/5 text-sm">
          <Download className="h-4 w-4 text-primary shrink-0" />
          <span className="text-muted-foreground">
            Select the cases you want to export, then click <strong className="text-foreground">Download</strong>.
          </span>
          {selectedIds.size > 0 && (
            <Badge variant="outline" className="ml-auto border-primary/30 text-primary">
              {selectedIds.size} selected
            </Badge>
          )}
        </div>
      )}

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  {exportMode && (
                    <th className="px-4 py-3 w-10">
                      <Checkbox
                        checked={allSelected}
                        ref={undefined}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                        {...(someSelected ? { 'data-state': 'indeterminate' } : {})}
                      />
                    </th>
                  )}
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Reference</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Organisation</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Severity</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Escalation</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Submitted</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((incident) => (
                  <tr
                    key={incident.id}
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => {
                      if (exportMode) {
                        toggleSelectOne(incident.id);
                      } else {
                        navigate(`/case-officer/cases/${incident.id}`);
                      }
                    }}
                  >
                    {exportMode && (
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedIds.has(incident.id)}
                          onCheckedChange={() => toggleSelectOne(incident.id)}
                          aria-label={`Select ${incident.id}`}
                        />
                      </td>
                    )}
                    <td className="px-4 py-3 font-mono text-role-reviewer">{incident.id}</td>
                    <td className="px-4 py-3 font-medium">{incident.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{incident.organisation}</td>
                    <td className="px-4 py-3"><Badge variant="outline" className={getSeverityColor(incident.severity)}>{incident.severity}</Badge></td>
                    <td className="px-4 py-3"><Badge variant="outline" className={getStatusColor(incident.status)}>{incident.status}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{incident.escalation}</td>
                    <td className="px-4 py-3 text-muted-foreground">{incident.submitted}</td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate(`/case-officer/cases/${incident.id}`); }}>
                        <Eye className="mr-1 h-3 w-3" />Review
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
