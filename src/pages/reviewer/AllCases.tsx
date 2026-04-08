import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, Eye, Download, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AdvancedFilterDrawer, {
  AdvancedFilters, EMPTY_FILTERS, countActiveFilters,
} from '@/components/shared/AdvancedFilterDrawer';

interface Escalation {
  name: string;
  status: string;
}

const allCases = [
  {
    id: 'PSIRP-2025-0028', title: 'Critical Security Breach', organisation: 'Global Express Logistics Sdn Bhd', reporter: 'Ahmad bin Abdullah', officer: 'You', severity: 'Critical', status: 'Under Review', submitted: '2025-01-16', lastUpdated: '2025-01-18', isOwn: true,
    escalations: [
      { name: 'PDRM', status: 'Under Investigation' },
      { name: 'KKM', status: 'Under Investigation' },
      { name: 'MOT', status: 'Evidence Seized' }
    ]
  },
  { id: 'PSIRP-2025-0027', title: 'High-Value Theft Investigation', organisation: 'Swift Logistics Sdn Bhd', reporter: 'Mohd Zaki', officer: 'You', severity: 'High', status: 'Pending Review', submitted: '2025-01-16', lastUpdated: '2025-01-17', isOwn: true, escalations: [] },
  {
    id: 'PSIRP-2025-0030', title: 'Warehouse Break-in', organisation: 'Pos Malaysia Berhad', reporter: 'Kamal Hassan', officer: 'Nurul Hana', severity: 'High', status: 'Under Review', submitted: '2025-01-17', lastUpdated: '2025-01-18', isOwn: false,
    escalations: [
      { name: 'JKDM', status: 'Closed' },
      { name: 'K-KOM', status: 'Closed' },
      { name: 'KDN', status: 'Closed' },
      { name: 'MKN', status: 'Closed' }
    ]
  },
  { id: 'PSIRP-2025-0031', title: 'Package Diversion Scheme', organisation: 'Global Express Logistics Sdn Bhd', reporter: 'Fatimah Zahra', officer: 'Lee Wei', severity: 'Critical', status: 'Escalation Pending', submitted: '2025-01-17', lastUpdated: '2025-01-19', isOwn: false, escalations: [] },
  {
    id: 'PSIRP-2025-0029', title: 'Missing Registered Mail', organisation: 'Fast Delivery Enterprise', reporter: 'Azman Ali', officer: 'Farah Amin', severity: 'Medium', status: 'RFI Sent', submitted: '2025-01-16', lastUpdated: '2025-01-17', isOwn: false,
    escalations: [
      { name: 'PDRM', status: 'Under Investigation' },
      { name: 'MOT', status: 'Closed' }
    ]
  },
  {
    id: 'PSIRP-2025-0026', title: 'Package Tampering Report', organisation: 'Global Express Logistics Sdn Bhd', reporter: 'Ahmad bin Abdullah', officer: 'You', severity: 'High', status: 'RFI Sent', submitted: '2025-01-15', lastUpdated: '2025-01-16', isOwn: true,
    escalations: [
      { name: 'KKM', status: 'Under Investigation' }
    ]
  },
  { id: 'PSIRP-2025-0032', title: 'Delayed Goods Complaint', organisation: 'Swift Logistics Sdn Bhd', reporter: 'Mohd Zaki', officer: 'Ahmad Razif', severity: 'Low', status: 'Under Review', submitted: '2025-01-18', lastUpdated: '2025-01-20', isOwn: false, escalations: [] },
];

export default function ReviewerAllCases() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [exportMode, setExportMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);

  const activeCount = countActiveFilters(advFilters);

  const filtered = allCases.filter((i) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        i.id.toLowerCase().includes(q) ||
        i.title.toLowerCase().includes(q) ||
        i.organisation.toLowerCase().includes(q) ||
        i.reporter.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (advFilters.status !== 'all' && i.status !== advFilters.status) return false;
    if (advFilters.severity !== 'all' && i.severity !== advFilters.severity) return false;
    if (advFilters.dateFrom && i.submitted < advFilters.dateFrom) return false;
    if (advFilters.dateTo && i.submitted > advFilters.dateTo) return false;

    // Agency Filter
    if (advFilters.agencies.length > 0) {
      const caseAgencies = i.escalations.map(e => e.name);
      // "JKDM" mapping fix in case data uses "JKDM" vs "KASTAM"
      const normalizedCaseAgencies = caseAgencies.map(a => a === 'JKDM' ? 'KASTAM' : a);
      const hasMatch = advFilters.agencies.some(a => normalizedCaseAgencies.includes(a));
      if (!hasMatch) return false;
    }

    return true;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Pending Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30 px-2.5 py-0.5 rounded-full',
      'RFI Sent': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30 px-2.5 py-0.5 rounded-full',
      'Under Review': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30 px-2.5 py-0.5 rounded-full',
      'Escalation Pending': 'bg-destructive/20 text-destructive border-destructive/30 px-2.5 py-0.5 rounded-full',
      'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30 px-2.5 py-0.5 rounded-full',
    };
    return colors[status] || 'bg-secondary px-2.5 py-0.5 rounded-full';
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'Critical': 'bg-red-500/20 text-red-500 border-red-500/30 px-2.5 py-0.5 rounded-full',
      'High': 'bg-orange-500/20 text-orange-600 border-orange-500/30 px-2.5 py-0.5 rounded-full',
      'Medium': 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30 px-2.5 py-0.5 rounded-full',
      'Low': 'bg-green-500/20 text-green-600 border-green-500/30 px-2.5 py-0.5 rounded-full',
    };
    return colors[severity] || 'bg-secondary px-2.5 py-0.5 rounded-full';
  };

  const renderEscalatedTo = (escalations: Escalation[]) => {
    if (escalations.length === 0) return <span className="text-muted-foreground text-xs italic">Not Escalated</span>;
    const display = escalations.slice(0, 2);
    const remaining = escalations.length - 2;
    const content = (
      <div className={`flex flex-wrap justify-center gap-1 ${escalations.length > 2 ? 'cursor-help' : ''}`}>
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

    if (escalations.length <= 2) return content;

    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent className="p-3 bg-popover border-border shadow-xl min-w-[150px]">
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Escalated Agencies</p>
              <div className="flex flex-wrap gap-1.5">
                {escalations.map((e, idx) => (
                  <Badge key={idx} variant="outline" className="text-[10px] px-2 py-0.5 bg-slate-50 text-slate-700 border-slate-200 font-bold uppercase">
                    {e.name}
                  </Badge>
                ))}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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

      {/* Export Selection Banner */}
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
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Reference</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[180px] text-foreground">Organisation</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[150px] text-foreground">Assigned Officer</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[120px] text-foreground">Severity</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Internal Status</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[150px] text-foreground">Escalated To</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[160px] text-foreground">Agency Progress</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[160px] text-foreground">Last Updated</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Submitted</th>
                    {!exportMode && <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[50px] text-foreground"></th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => {
                        if (exportMode) toggleSelectOne(c.id);
                        else navigate(`/case-officer/cases/${c.id}`);
                      }}
                    >
                      {exportMode && (
                        <td className="px-3 py-4 text-center align-middle" onClick={(e) => e.stopPropagation()}>
                          <Checkbox checked={selectedIds.has(c.id)} onCheckedChange={() => toggleSelectOne(c.id)} aria-label={`Select ${c.id}`} />
                        </td>
                      )}
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <span className="font-mono font-bold text-primary hover:underline cursor-pointer text-sm">{c.id}</span>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground whitespace-normal">{c.organisation}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <span className={c.isOwn ? 'text-role-reviewer font-medium text-sm' : 'text-muted-foreground text-sm'}>{c.officer}</span>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${getSeverityColor(c.severity)} text-[11px]`}>{c.severity}</Badge>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${getStatusColor(c.status)} text-[11px]`}>{c.status}</Badge>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        {renderEscalatedTo(c.escalations)}
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        {renderAgencyProgress(c.escalations)}
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{c.lastUpdated}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{c.submitted}</td>
                      {!exportMode && (
                        <td className="px-3 py-4 text-center align-middle text-sm" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-center">
                            <Button size="sm" variant="ghost" onClick={() => navigate(`/case-officer/cases/${c.id}`)}>
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
