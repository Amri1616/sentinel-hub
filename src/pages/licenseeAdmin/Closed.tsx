import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import AdvancedFilterDrawer, { EMPTY_FILTERS, countActiveFilters, AdvancedFilters } from '@/components/shared/AdvancedFilterDrawer';

interface Escalation {
  name: string;
  status: string;
}

const incidents = [
  {
    id: 'PSIRP-2025-0021',
    reporter: 'Azman Ali',
    type: 'Theft',
    severity: 'Critical',
    escalations: [
      { name: 'PDRM', status: 'Closed - Resolved' },
      { name: 'NACSA', status: 'Closed - Resolved' },
      { name: 'KDN', status: 'Closed - Resolved' },
    ],
  },
  {
    id: 'PSIRP-2025-0018',
    reporter: 'Siti Nurhaliza',
    type: 'Prohibited Items',
    severity: 'Medium',
    escalations: [
      { name: 'CUSTOMS', status: 'Closed - No Further Action' },
      { name: 'MOT', status: 'Closed - No Further Action' },
    ],
  },
];

const severityColors: Record<string, string> = {
  'Low': 'bg-status-closed/20 text-status-closed border-status-closed/30',
  'Medium': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
  'High': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
  'Critical': 'bg-destructive/20 text-destructive border-destructive/30',
};

export default function LicenseeAdminClosed() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);
  const activeFilterCount = countActiveFilters(filters);

  const filtered = incidents.filter(i =>
    i.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.escalations.some((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderAssignedLea = (escalations: Escalation[], incidentId: string) => {
    if (escalations.length === 0) {
      return <span className="text-muted-foreground text-xs italic">Not Escalated</span>;
    }

    const detailUrl = `/licensee-admin/incidents/${incidentId}#escalation-status`;
    const display = escalations.slice(0, 2);
    const remaining = escalations.length - 2;

    const trigger = (
      <div className="flex flex-wrap justify-center gap-1">
        {display.map((e, idx) => (
          <Badge
            key={idx}
            variant="secondary"
            className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 px-1.5 py-0 h-5 text-[10px] font-bold cursor-pointer"
            onClick={(ev) => {
              ev.stopPropagation();
              navigate(detailUrl);
            }}
          >
            {e.name}
          </Badge>
        ))}
        {remaining > 0 && (
          <Badge
            variant="secondary"
            className="bg-primary/5 text-primary border-primary/20 px-1.5 py-0 h-5 text-[10px] font-bold cursor-pointer"
            onClick={(ev) => {
              ev.stopPropagation();
              navigate(detailUrl);
            }}
          >
            +{remaining} more
          </Badge>
        )}
      </div>
    );

    if (escalations.length <= 2) return trigger;

    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
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

  const renderInvestigationStatus = (escalations: Escalation[]) => {
    if (escalations.length === 0) return <span className="text-muted-foreground text-xs">-</span>;

    const statuses = escalations.map((e) => e.status);
    const uniqueStatuses = Array.from(new Set(statuses));
    const isAllSame = uniqueStatuses.length === 1;

    let badgeText = '';
    let badgeStyle = 'bg-muted/50 text-muted-foreground border-muted/30';

    if (isAllSame) {
      badgeText = `All ${uniqueStatuses[0]}`;
      if (uniqueStatuses[0].toLowerCase().includes('resolved')) {
        badgeStyle = 'bg-status-closed/20 text-status-closed border-status-closed/30';
      }
    } else {
      badgeText = 'Mixed Outcomes';
      badgeStyle = 'bg-amber-500/15 text-amber-600 border-amber-500/30';
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
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-slate-50 text-slate-700 border-slate-200">
                    {e.status}
                  </Badge>
                </div>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Closed Cases</h1>
        <p className="text-muted-foreground">Historical records of all closed cases</p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center"
        onClick={() => navigate('/licensee-admin/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by reference, reporter, type, or agency..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Button variant="outline" onClick={() => setIsFilterOpen(true)} className="relative">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-2 px-1.5 min-w-[1.25rem] h-5 justify-center">{activeFilterCount}</Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-center text-sm font-medium">Reference No</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Reporter</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Case Type</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Severity</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Escalated To</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Agency Progress</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((incident) => (
                  <tr key={incident.id} className="border-b hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => navigate(`/licensee-admin/incidents/${incident.id}`)}>
                    <td className="px-4 py-4 text-center align-middle">
                      <span className="font-mono text-sm text-primary">{incident.id}</span>
                    </td>
                    <td className="px-4 py-4 text-center align-middle text-sm">{incident.reporter}</td>
                    <td className="px-4 py-4 text-center align-middle text-sm">{incident.type}</td>
                    <td className="px-4 py-4 text-center align-middle">
                      <Badge variant="outline" className={severityColors[incident.severity]}>{incident.severity}</Badge>
                    </td>
                    <td className="px-4 py-4 text-center align-middle text-sm text-muted-foreground">{renderAssignedLea(incident.escalations, incident.id)}</td>
                    <td className="px-4 py-4 text-center align-middle text-sm">{renderInvestigationStatus(incident.escalations)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AdvancedFilterDrawer
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApply={setFilters}
      />
    </div>
  );
}

