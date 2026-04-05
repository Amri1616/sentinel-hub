import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search, Eye, Download, Filter, X } from 'lucide-react';
import AdvancedFilterDrawer, {
  AdvancedFilters, EMPTY_FILTERS, countActiveFilters,
} from '@/components/shared/AdvancedFilterDrawer';

interface Escalation {
  name: string;
  status: string;
}

const allCases = [
  {
    id: 'PSIRP-2025-0063', org: 'Global Express Logistics', officer: 'Raj Kumar', severity: 'Medium', status: 'Under Review', date: '2025-06-09', lastUpdated: '2025-06-11',
    escalations: [
      { name: 'PDRM', status: 'Under Investigation' },
      { name: 'JKDM', status: 'Evidence Seized' }
    ]
  },
  { id: 'PSIRP-2025-0060', org: 'Pos Malaysia', officer: 'Farah Amin', severity: 'Critical', status: 'Escalation Pending', date: '2025-06-10', lastUpdated: '2025-06-12', escalations: [] },
  { id: 'PSIRP-2025-0058', org: 'J&T Express', officer: 'Lee Wei', severity: 'High', status: 'Escalation Pending', date: '2025-06-08', lastUpdated: '2025-06-10', escalations: [] },
  {
    id: 'PSIRP-2025-0055', org: 'DHL eCommerce', officer: 'Ahmad Razif', severity: 'High', status: 'Under Review', date: '2025-06-06', lastUpdated: '2025-06-07',
    escalations: [
      { name: 'KKM', status: 'Closed' },
      { name: 'KDN', status: 'Closed' }
    ]
  },
  { id: 'PSIRP-2025-0052', org: 'Ninja Van', officer: 'Nurul Hana', severity: 'High', status: 'Escalation Pending', date: '2025-06-10', lastUpdated: '2025-06-12', escalations: [] },
  { id: 'PSIRP-2025-0048', org: 'CityLink', officer: 'Lee Wei', severity: 'Low', status: 'Clarification Requested', date: '2025-06-03', lastUpdated: '2025-06-05', escalations: [] },
  { id: 'PSIRP-2025-0045', org: 'Global Express Logistics', officer: 'Ahmad Razif', severity: 'Critical', status: 'Escalation Pending', date: '2025-06-09', lastUpdated: '2025-06-11', escalations: [] },
  {
    id: 'PSIRP-2025-0030', org: 'Pos Malaysia', officer: 'Nurul Hana', severity: 'Medium', status: 'Closed', date: '2025-05-28', lastUpdated: '2025-06-05',
    escalations: [
      { name: 'MOT', status: 'Closed' },
      { name: 'PERHILITAN', status: 'Closed' },
      { name: 'KKM', status: 'Closed' },
      { name: 'PDRM', status: 'Closed' }
    ]
  },
  {
    id: 'PSIRP-2025-0025', org: 'DHL eCommerce', officer: 'Farah Amin', severity: 'High', status: 'Escalated', date: '2025-05-22', lastUpdated: '2025-05-28',
    escalations: [
      { name: 'AKPS', status: 'Under Investigation' },
      { name: 'MKN', status: 'Pending Review' }
    ]
  },
];

const statusColors: Record<string, string> = {
  'Under Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30 px-2.5 py-0.5 rounded-full',
  'Escalation Pending': 'bg-destructive/20 text-destructive border-destructive/30 px-2.5 py-0.5 rounded-full',
  'Clarification Requested': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30 px-2.5 py-0.5 rounded-full',
  'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30 px-2.5 py-0.5 rounded-full',
  'Escalated': 'bg-role-reviewer/20 text-role-reviewer border-role-reviewer/30 px-2.5 py-0.5 rounded-full',
  'Submitted': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30 px-2.5 py-0.5 rounded-full',
};

export default function CaseMonitoring() {
  const [search, setSearch] = useState('');
  const [exportMode, setExportMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);
  const navigate = useNavigate();
  const { toast } = useToast();

  const activeCount = countActiveFilters(advFilters);

  const filtered = allCases.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      const match = c.id.toLowerCase().includes(q) || c.org.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (advFilters.status !== 'all' && c.status !== advFilters.status) return false;
    if (advFilters.severity !== 'all' && c.severity !== advFilters.severity) return false;
    if (advFilters.dateFrom && c.date < advFilters.dateFrom) return false;
    if (advFilters.dateTo && c.date > advFilters.dateTo) return false;

    // Agency Filter logic
    if (advFilters.agencies.length > 0) {
      const caseAgencies = c.escalations.map(e => e.name);
      const normalizedCaseAgencies = caseAgencies.map(a => a === 'JKDM' ? 'KASTAM' : a);
      const hasMatch = advFilters.agencies.some(a => normalizedCaseAgencies.includes(a));
      if (!hasMatch) return false;
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
    toast({ title: 'Export Started', description: `Exporting ${selectedIds.size} case${selectedIds.size > 1 ? 's' : ''}…` });
    setExportMode(false); setSelectedIds(new Set());
  };

  const renderEscalatedTo = (escalations: Escalation[]) => {
    if (escalations.length === 0) return <span className="text-muted-foreground text-xs italic">Not Escalated</span>;
    const display = escalations.slice(0, 2);
    const remaining = escalations.length - 2;
    return (
      <div className="flex flex-wrap justify-center gap-1">
        {display.map((e, idx) => (
          <Badge key={idx} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 px-1.5 py-0 h-5 text-[10px] font-bold">
            {e.name}
          </Badge>
        ))}
        {remaining > 0 && (
          <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/20 px-1.5 py-0 h-5 text-[10px] font-bold">
            +{remaining} more
          </Badge>
        )}
      </div>
    );
  };

  const renderAgencyProgress = (escalations: Escalation[]) => {
    if (escalations.length === 0) return <span className="text-muted-foreground text-xs">-</span>;
    const statuses = escalations.map(e => e.status);
    const uniqueStatuses = Array.from(new Set(statuses));
    const isAllSame = uniqueStatuses.length === 1;
    const completedCount = escalations.filter(e => e.status.toLowerCase().includes('closed') || e.status.toLowerCase().includes('completed')).length;
    let badgeText = '';
    let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
    if (isAllSame) {
      badgeText = `All ${uniqueStatuses[0]}`;
      if (uniqueStatuses[0].toLowerCase().includes('investigation')) badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
      if (uniqueStatuses[0].toLowerCase().includes('closed')) badgeStyle = 'bg-green-50 text-green-700 border-green-200';
    } else {
      if (completedCount > 0) {
        badgeText = `${completedCount}/${escalations.length} Completed`;
        badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
      } else {
        badgeText = 'Pending Updates';
        badgeStyle = 'bg-slate-100 text-slate-600 border-slate-200 italic';
      }
    }
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <div className="flex justify-center cursor-help">
              <Badge variant="outline" className={`${badgeStyle} text-[10px] px-2 py-0.5 font-medium whitespace-nowrap`}>
                {badgeText}
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent className="p-3 bg-popover border-border shadow-xl min-w-[200px]">
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Agency Status Breakdown</p>
              {escalations.map((e, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 py-1 border-b border-border/50 last:border-0">
                  <span className="font-bold text-xs">{e.name}</span>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${e.status.toLowerCase().includes('closed') ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                    {e.status}
                  </Badge>
                </div>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Case Monitoring</h1>
          <p className="text-muted-foreground">Monitor all cases across organisations</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference, organisation, reporter..."
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

            {/* Export Mode Toggle */}
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

      {/* Export Mode Banner */}
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
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[180px]">Organisation</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[150px]">Assigned Officer</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[120px]">Severity</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Internal Status</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[150px]">Escalated To</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[160px]">Agency Progress</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[160px]">Last Updated</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Submitted</th>
                    {!exportMode && <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[50px] text-foreground"></th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-muted/30 cursor-pointer transition-colors border-b"
                      onClick={() => {
                        if (exportMode) toggleSelectOne(c.id);
                        else navigate(`/supervisor/cases/${c.id}`);
                      }}
                    >
                      {exportMode && (
                        <td className="px-3 py-4 text-center align-middle" onClick={(e) => e.stopPropagation()}>
                          <Checkbox checked={selectedIds.has(c.id)} onCheckedChange={() => toggleSelectOne(c.id)} aria-label={`Select ${c.id}`} />
                        </td>
                      )}
                      <td className="px-3 py-4 text-center align-middle font-mono font-bold text-primary hover:underline cursor-pointer text-sm">{c.id}</td>
                      <td className="px-3 py-4 text-center align-middle whitespace-normal text-sm">{c.org}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm">{c.officer}</td>
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
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        {renderEscalatedTo(c.escalations)}
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        {renderAgencyProgress(c.escalations)}
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{c.lastUpdated}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{c.date}</td>
                      {!exportMode && (
                        <td className="px-3 py-4 text-center align-middle text-sm" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-center">
                            <Button size="sm" variant="ghost" onClick={() => navigate(`/supervisor/cases/${c.id}`)}>
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
      />
    </div>
  );
}
