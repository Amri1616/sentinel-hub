import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, Download, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AdvancedFilterDrawer, {
  AdvancedFilters, EMPTY_FILTERS, countActiveFilters,
} from '@/components/shared/AdvancedFilterDrawer';

export default function ReporterIncidents() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [exportMode, setExportMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);

  const incidents = [
    { id: 'PSIRP-2025-0025', title: 'High-Value Package Theft', reporter: 'Ahmad bin Abdullah', org: 'Global Express Logistics', category: 'Theft', status: 'In Review', submitted: '2025-01-15', lastUpdated: '2 hours ago', severity: 'High', escalated: false },
    { id: 'PSIRP-2025-0023', title: 'Tampered Shipment Detected', reporter: 'Ahmad bin Abdullah', org: 'Global Express Logistics', category: 'Tampering', status: 'RFI Sent', submitted: '2025-01-14', lastUpdated: '1 hour ago', severity: 'Medium', escalated: false },
    { id: 'PSIRP-2025-0020', title: 'Lost Consignment Investigation', reporter: 'Ahmad bin Abdullah', org: 'Global Express Logistics', category: 'Loss', status: 'Under Investigation', submitted: '2025-01-12', lastUpdated: '5 hours ago', severity: 'Critical', escalated: true },
    { id: 'PSIRP-2025-0019', title: 'Dangerous Goods Mishandling', reporter: 'Ahmad bin Abdullah', org: 'Global Express Logistics', category: 'Dangerous Goods', status: 'Closed', submitted: '2025-01-10', lastUpdated: '1 day ago', severity: 'High', escalated: false },
    { id: 'PSIRP-2025-0018', title: 'Fraud Attempt Reported', reporter: 'Ahmad bin Abdullah', org: 'Global Express Logistics', category: 'Fraud', status: 'Submitted', submitted: '2025-01-09', lastUpdated: '3 days ago', severity: 'Low', escalated: false },
  ];

  const severityColors: Record<string, string> = {
    'Low': 'bg-status-closed/20 text-status-closed border-status-closed/30 px-2.5 py-0.5 rounded-full',
    'Medium': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30 px-2.5 py-0.5 rounded-full',
    'High': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30 px-2.5 py-0.5 rounded-full',
    'Critical': 'bg-destructive/20 text-destructive border-destructive/30 px-2.5 py-0.5 rounded-full',
  };

  const activeCount = countActiveFilters(advFilters);

  const filtered = incidents.filter((i) => {
    // Main search: Ref No, Title, Organisation, Reporter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        i.id.toLowerCase().includes(q) ||
        i.title.toLowerCase().includes(q) ||
        i.org.toLowerCase().includes(q) ||
        i.reporter.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Advanced filters
    if (advFilters.status !== 'all' && i.status !== advFilters.status) return false;
    if (advFilters.severity !== 'all' && i.severity !== advFilters.severity) return false;
    if (advFilters.dateFrom && i.submitted < advFilters.dateFrom) return false;
    if (advFilters.dateTo && i.submitted > advFilters.dateTo) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Draft': 'bg-status-draft/20 text-status-draft border-status-draft/30 px-2.5 py-0.5 rounded-full',
      'Submitted': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30 px-2.5 py-0.5 rounded-full',
      'In Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30 px-2.5 py-0.5 rounded-full',
      'RFI Sent': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30 px-2.5 py-0.5 rounded-full',
      'Under Investigation': 'bg-status-investigation/20 text-status-investigation border-status-investigation/30 px-2.5 py-0.5 rounded-full',
      'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30 px-2.5 py-0.5 rounded-full',
    };
    return colors[status] || 'bg-secondary px-2.5 py-0.5 rounded-full';
  };

  /* ── Export mode helpers ── */
  const handleToggleExportMode = () => {
    if (exportMode) { setExportMode(false); setSelectedIds(new Set()); }
    else { setExportMode(true); setSelectedIds(new Set()); }
  };
  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.size === filtered.length ? new Set() : new Set(filtered.map((i) => i.id)));
  };
  const allSelected = filtered.length > 0 && selectedIds.size === filtered.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < filtered.length;
  const handleDownloadSelected = () => {
    if (selectedIds.size === 0) return;
    toast({ title: 'Export Started', description: `Exporting ${selectedIds.size} report${selectedIds.size > 1 ? 's' : ''}…` });
    setExportMode(false); setSelectedIds(new Set());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Submissions</h1>
          <p className="text-muted-foreground">Track and manage your incident reports</p>
        </div>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference, title, organisation, reporter..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              id="btn-advanced-filters"
              onClick={() => setDrawerOpen(true)}
              className={activeCount > 0 ? 'border-primary/50 text-primary' : ''}
            >
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
              {activeCount > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  {activeCount}
                </span>
              )}
            </Button>

            {/* Export / Cancel + Download */}
            {!exportMode ? (
              <Button variant="outline" onClick={handleToggleExportMode}>
                <Download className="mr-2 h-4 w-4" />Export
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="default" disabled={selectedIds.size === 0} onClick={handleDownloadSelected}>
                  <Download className="mr-2 h-4 w-4" />Download ({selectedIds.size})
                </Button>
                <Button variant="ghost" onClick={handleToggleExportMode}>
                  <X className="mr-2 h-4 w-4" />Cancel
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
            <Badge variant="outline" className="ml-auto border-primary/30 text-primary px-2.5 py-0.5 rounded-full">
              {selectedIds.size} selected
            </Badge>
          )}
        </div>
      )}

      {/* Table */}
      <Card className="w-full overflow-hidden border">
        <CardContent className="p-0">
          <div className="relative group w-full overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="table-auto w-full text-sm">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    {exportMode && (
                      <th className="px-3 py-4 text-center align-middle text-sm font-semibold w-10">
                        <Checkbox
                          checked={allSelected}
                          ref={undefined}
                          onCheckedChange={toggleSelectAll}
                          aria-label="Select all"
                          {...(someSelected ? { 'data-state': 'indeterminate' } : {})}
                        />
                      </th>
                    )}
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Reference</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[200px] text-foreground">Title</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[150px] text-foreground">Case Type</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[120px] text-foreground">Severity</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Status</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[150px] text-foreground">Last Updated</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Submitted</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[150px] text-foreground">Escalation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((incident) => (
                    <tr
                      key={incident.id}
                      className="hover:bg-accent/30 cursor-pointer transition-colors"
                      onClick={() => {
                        if (exportMode) toggleSelectOne(incident.id);
                        else navigate(`/licensee-reporter/incidents/${incident.id}`);
                      }}
                    >
                      {exportMode && (
                        <td className="px-3 py-4 text-center align-middle" onClick={(e) => e.stopPropagation()}>
                          <Checkbox checked={selectedIds.has(incident.id)} onCheckedChange={() => toggleSelectOne(incident.id)} aria-label={`Select ${incident.id}`} />
                        </td>
                      )}
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <span className="font-mono font-bold text-primary hover:underline cursor-pointer text-sm">{incident.id}</span>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm font-medium whitespace-normal">{incident.title}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground whitespace-normal">{incident.category}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${severityColors[incident.severity]} text-[11px]`}>{incident.severity}</Badge>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${getStatusColor(incident.status)} text-[11px]`}>{incident.status}</Badge>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{incident.lastUpdated}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{incident.submitted}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          {incident.escalated ? (
                            <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">Yes</Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">No</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Scroll Hint Shadow */}
            <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none bg-gradient-to-l from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-r" />
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filter Drawer */}
      <AdvancedFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={advFilters}
        onApply={setAdvFilters}
        activeCount={activeCount}
      />
    </div>
  );
}
