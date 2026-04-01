import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Download, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function ReporterIncidents() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [exportMode, setExportMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const incidents = [
    { id: 'PSIRP-2025-0025', title: 'High-Value Package Theft', category: 'Theft', status: 'In Review', submitted: '2025-01-15', lastUpdated: '2 hours ago' },
    { id: 'PSIRP-2025-0023', title: 'Tampered Shipment Detected', category: 'Tampering', status: 'RFI Sent', submitted: '2025-01-14', lastUpdated: '1 hour ago' },
    { id: 'PSIRP-2025-0020', title: 'Lost Consignment Investigation', category: 'Loss', status: 'Under Investigation', submitted: '2025-01-12', lastUpdated: '5 hours ago' },
    { id: 'PSIRP-2025-0019', title: 'Dangerous Goods Mishandling', category: 'Dangerous Goods', status: 'Closed', submitted: '2025-01-10', lastUpdated: '1 day ago' },
    { id: 'PSIRP-2025-0018', title: 'Fraud Attempt Reported', category: 'Fraud', status: 'Submitted', submitted: '2025-01-09', lastUpdated: '3 days ago' },
  ];

  const filtered = incidents.filter((i) => {
    if (statusFilter !== 'all' && i.status !== statusFilter) return false;
    if (searchQuery && !i.title.toLowerCase().includes(searchQuery.toLowerCase()) && !i.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Draft': 'bg-status-draft/20 text-status-draft border-status-draft/30',
      'Submitted': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30',
      'In Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
      'RFI Sent': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
      'Under Investigation': 'bg-status-investigation/20 text-status-investigation border-status-investigation/30',
      'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30',
    };
    return colors[status] || 'bg-secondary';
  };

  /* ── Export mode helpers ── */
  const handleToggleExportMode = () => {
    if (exportMode) {
      // Cancel export mode
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
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
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
      description: `Exporting ${selectedIds.size} report${selectedIds.size > 1 ? 's' : ''}…`,
    });
    setExportMode(false);
    setSelectedIds(new Set());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Submissions</h1>
          <p className="text-muted-foreground">Track and manage your incident reports</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 flex flex-col justify-center h-full">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Case Resolution Time</h3>
            <div className="text-2xl font-bold text-primary flex items-baseline gap-2">
              4.2 Days <span className="text-xs font-normal text-muted-foreground">across all closed cases</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, title..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Submitted">Submitted</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="RFI Sent">RFI Sent</SelectItem>
                <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
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
            Select the reports you want to export, then click <strong className="text-foreground">Download</strong>.
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
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  {exportMode && (
                    <th className="pb-3 pr-3 w-10">
                      <Checkbox
                        checked={allSelected}
                        ref={undefined}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                        {...(someSelected ? { 'data-state': 'indeterminate' } : {})}
                      />
                    </th>
                  )}
                  <th className="pb-3 font-medium text-muted-foreground">Reference</th>
                  <th className="pb-3 font-medium text-muted-foreground">Title</th>
                  <th className="pb-3 font-medium text-muted-foreground">Category</th>
                  <th className="pb-3 font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 font-medium text-muted-foreground">Last Updated</th>
                  <th className="pb-3 font-medium text-muted-foreground">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((incident) => (
                  <tr
                    key={incident.id}
                    className="hover:bg-accent/30 cursor-pointer transition-colors"
                    onClick={() => {
                      if (exportMode) {
                        toggleSelectOne(incident.id);
                      } else {
                        navigate(`/reporter/incidents/${incident.id}`);
                      }
                    }}
                  >
                    {exportMode && (
                      <td className="py-3 pr-3" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedIds.has(incident.id)}
                          onCheckedChange={() => toggleSelectOne(incident.id)}
                          aria-label={`Select ${incident.id}`}
                        />
                      </td>
                    )}
                    <td className="py-3 font-mono text-primary">{incident.id}</td>
                    <td className="py-3 font-medium">{incident.title}</td>
                    <td className="py-3 text-muted-foreground">{incident.category}</td>
                    <td className="py-3">
                      <Badge variant="outline" className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">{incident.lastUpdated}</td>
                    <td className="py-3 text-muted-foreground">{incident.submitted}</td>
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
