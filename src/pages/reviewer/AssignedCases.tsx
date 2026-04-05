import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

const assignedCases = [
  { id: 'PSIRP-2025-0028', title: 'Critical Security Breach', organisation: 'Global Express Logistics Sdn Bhd', officer: 'You', severity: 'Critical', status: 'Under Review', submitted: '2025-01-16', lastUpdated: '2025-01-18', escalations: [{ name: 'PDRM', status: 'Under Investigation' }] },
  { id: 'PSIRP-2025-0027', title: 'High-Value Theft Investigation', organisation: 'Swift Logistics Sdn Bhd', officer: 'You', severity: 'High', status: 'Pending Review', submitted: '2025-01-16', lastUpdated: '2025-01-17', escalations: [] },
  { id: 'PSIRP-2025-0026', title: 'Package Tampering Report', organisation: 'Global Express Logistics Sdn Bhd', officer: 'You', severity: 'High', status: 'RFI Sent', submitted: '2025-01-15', lastUpdated: '2025-01-16', escalations: [] },
];

export default function CaseOfficerAssignedCases() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);

  const activeCount = countActiveFilters(advFilters);

  const filtered = assignedCases.filter((i) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        i.id.toLowerCase().includes(q) ||
        i.title.toLowerCase().includes(q) ||
        i.organisation.toLowerCase().includes(q);
      if (!match) return false;
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Assigned Cases</h1>
        <p className="text-muted-foreground">Cases currently assigned to you for review and assessment</p>
      </div>

      <Button 
        variant="ghost" 
        size="sm" 
        className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center"
        onClick={() => navigate('/case-officer/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference, title, or organisation..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
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
          </div>
        </CardContent>
      </Card>

      <Card className="w-full overflow-hidden border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Reference</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[200px] text-foreground">Organisation</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[120px] text-foreground">Severity</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Internal Status</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[160px] text-foreground">Last Updated</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Submitted</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[100px] text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => navigate(`/case-officer/cases/${c.id}`)}>
                    <td className="px-3 py-4 text-center align-middle"><span className="font-mono font-bold text-primary">{c.id}</span></td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.organisation}</td>
                    <td className="px-3 py-4 text-center align-middle">
                      <div className="flex justify-center">
                        <Badge variant="outline" className={getSeverityColor(c.severity)}>{c.severity}</Badge>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center align-middle">
                      <div className="flex justify-center">
                        <Badge variant="outline" className={getStatusColor(c.status)}>{c.status}</Badge>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.lastUpdated}</td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.submitted}</td>
                    <td className="px-3 py-4 text-center align-middle">
                      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate(`/case-officer/cases/${c.id}`); }}>
                        <Eye className="h-4 w-4 mr-2" /> Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

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
