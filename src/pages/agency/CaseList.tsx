import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, Eye, Download, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AdvancedFilterDrawer, {
  AdvancedFilters, EMPTY_FILTERS, countActiveFilters,
} from '@/components/shared/AdvancedFilterDrawer';

const cases = [
  { id: 'ESC-2025-001', title: 'High-Value Package Theft Ring', reporter: 'Ali Hassan', escalationDate: '2025-06-10', org: 'Global Express Logistics', severity: 'High', status: 'Under Investigation', agency: 'PDRM' },
  { id: 'ESC-2025-002', title: 'Contraband Interception - Narcotics', reporter: 'Siti Aisyah', escalationDate: '2025-06-12', org: 'Pos Malaysia', severity: 'Critical', status: 'Evidence Seized', agency: 'JKDM' },
  { id: 'ESC-2025-003', title: 'Organized Parcel Tampering', reporter: 'Lim Wei Jie', escalationDate: '2025-06-13', org: 'J&T Express', severity: 'High', status: 'Pending Further Information', agency: 'PDRM' },
  { id: 'ESC-2025-004', title: 'Repeated Warehouse Intrusions', reporter: 'Ahmad Zulkifli', escalationDate: '2025-06-14', org: 'Pos Malaysia', severity: 'High', status: 'Pending Further Information', agency: 'PDRM' },
  { id: 'ESC-2025-005', title: 'Large Scale Delivery Fraud', reporter: 'Tan Mei Ling', escalationDate: '2025-06-15', org: 'J&T Express', severity: 'Critical', status: 'Under Investigation', agency: 'JKDM' },
  { id: 'ESC-2025-006', title: 'Stolen Goods Resell Syndicate', reporter: 'Kumar Raj', escalationDate: '2025-05-20', org: 'CityLink', severity: 'Medium', status: 'Case Referred for Prosecution', agency: 'PDRM' },
  { id: 'ESC-2025-007', title: 'Suspicious Document Forgery', reporter: 'Wong Kai Wen', escalationDate: '2025-05-15', org: 'DHL eCommerce', severity: 'High', status: 'No Further Action', agency: 'KDN' },
  { id: 'ESC-2025-008', title: 'Inside Job - Delivery Driver Theft', reporter: 'Nurul Izzah', escalationDate: '2025-05-10', org: 'Global Express Logistics', severity: 'Medium', status: 'Case Referred for Prosecution', agency: 'PDRM' },
];

const statusColors: Record<string, string> = {
  'Under Investigation': 'bg-primary/20 text-primary border-primary/30 px-2.5 py-0.5 rounded-full',
  'Evidence Seized': 'bg-role-validator/20 text-role-validator border-role-validator/30 px-2.5 py-0.5 rounded-full',
  'Pending Further Information': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30 px-2.5 py-0.5 rounded-full',
  'Case Referred for Prosecution': 'bg-role-investigator/20 text-role-investigator border-role-investigator/30 px-2.5 py-0.5 rounded-full',
  'No Further Action': 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30 px-2.5 py-0.5 rounded-full',
};

export default function LEACaseList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [exportMode, setExportMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);

  const activeCount = countActiveFilters(advFilters);

  const filtered = cases.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      const match =
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.org.toLowerCase().includes(q) ||
        c.reporter.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (advFilters.status !== 'all' && c.status !== advFilters.status) return false;
    if (advFilters.severity !== 'all' && c.severity !== advFilters.severity) return false;
    if (advFilters.dateFrom && c.escalationDate < advFilters.dateFrom) return false;
    if (advFilters.dateTo && c.escalationDate > advFilters.dateTo) return false;

    // Note: Agency filter is hidden in UI for LEA, so advFilters.agencies will normally be empty.
    // However, keeping the logic here for internal consistency.
    if (advFilters.agencies.length > 0) {
        const normalizedCaseAgency = c.agency === 'JKDM' ? 'KASTAM' : c.agency;
        if (!advFilters.agencies.includes(normalizedCaseAgency)) return false;
    }

    return true;
  });

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
    toast({ title: 'Export Started', description: `Exporting ${selectedIds.size} case dossier${selectedIds.size > 1 ? 's' : ''}…` });
    setExportMode(false); setSelectedIds(new Set());
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Escalated Cases</h1>
        <p className="text-muted-foreground">Cases formally referred to your agency</p>
      </div>

      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center" onClick={() => navigate('/agency/dashboard')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference, title, organisation, reporter..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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

      {exportMode && (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-primary/30 bg-primary/5 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <Download className="h-4 w-4 text-primary shrink-0" />
          <span className="text-muted-foreground">
            Select the cases you want to export, then click <strong className="text-foreground">Download</strong>.
          </span>
          {selectedIds.size > 0 && (
            <Badge variant="outline" className="ml-auto border-primary/30 text-primary px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold text-[10px]">
              {selectedIds.size} selected
            </Badge>
          )}
        </div>
      )}

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
                          onCheckedChange={toggleSelectAll}
                          aria-label="Select all"
                          {...(someSelected ? { 'data-state': 'indeterminate' } : {})}
                        />
                      </th>
                    )}
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Reference</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[220px]">Case Title</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[150px]">Reporter</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Escalation Date</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[180px]">Organisation</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[120px]">Severity</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[200px]">Investigation Status</th>
                    {!exportMode && <th className="px-3 py-4 text-center align-middle text-sm min-w-[50px]"></th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-muted/30 transition-colors cursor-pointer border-b"
                      onClick={() => {
                        if (exportMode) toggleSelectOne(c.id);
                        else navigate(`/agency/cases/${c.id}`);
                      }}
                    >
                      {exportMode && (
                        <td className="px-3 py-4 text-center align-middle" onClick={(e) => e.stopPropagation()}>
                          <Checkbox checked={selectedIds.has(c.id)} onCheckedChange={() => toggleSelectOne(c.id)} aria-label={`Select ${c.id}`} />
                        </td>
                      )}
                      <td className="px-3 py-4 text-center align-middle font-mono font-bold text-primary hover:underline cursor-pointer text-sm">{c.id}</td>
                      <td className="px-3 py-4 text-center align-middle whitespace-normal text-sm font-medium">{c.title}</td>
                      <td className="px-3 py-4 text-center align-middle whitespace-normal text-sm">{c.reporter}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{c.escalationDate}</td>
                      <td className="px-3 py-4 text-center align-middle whitespace-normal text-sm">{c.org}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${c.severity === 'Critical' ? 'bg-destructive/20 text-destructive border-destructive/30' : c.severity === 'High' ? 'bg-status-in-review/20 text-status-in-review border-status-in-review/30' : 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30'} px-2.5 py-0.5 rounded-full text-[11px]`}>
                            {c.severity}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${statusColors[c.status] || ''} text-[11px]`}>{c.status}</Badge>
                        </div>
                      </td>
                      {!exportMode && (
                        <td className="px-3 py-4 text-center align-middle text-sm" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-center">
                            <Button size="sm" variant="ghost" onClick={() => navigate(`/agency/cases/${c.id}`)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      )}
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
        hideAgencyFilter={true}
      />
    </div>
  );
}
