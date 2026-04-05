import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdvancedFilterDrawer, {
  AdvancedFilters, EMPTY_FILTERS, countActiveFilters,
} from '@/components/shared/AdvancedFilterDrawer';

const priorityAlerts = [
  { id: 'PSIRP-2025-0028', title: 'Critical Security Breach', organisation: 'Global Express Logistics Sdn Bhd', officer: 'You', severity: 'Critical', status: 'Under Review', submitted: '2025-01-16', reason: 'High Severity' },
  { id: 'PSIRP-2025-0036', title: 'Suspicious Activity Detected', organisation: 'Swift Logistics Sdn Bhd', officer: 'None', severity: 'High', status: 'New', submitted: '2025-01-20', reason: 'System Flagged' },
];

export default function CaseOfficerPriorityAlerts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);

  const activeCount = countActiveFilters(advFilters);

  const filtered = priorityAlerts.filter((i) => {
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

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-destructive flex items-center">
            <ShieldAlert className="mr-3 h-8 w-8" />
            Priority Alerts
          </h1>
          <p className="text-muted-foreground">High-priority cases flagged by the system or requiring immediate intervention</p>
        </div>
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 px-4 py-1 text-sm font-bold animate-pulse">
          URGENT ATTENTION
        </Badge>
      </div>

      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center" onClick={() => navigate('/case-officer/dashboard')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search priority alerts..." className="pl-10 border-destructive/20 focus-visible:ring-destructive" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Button variant="outline" onClick={() => setDrawerOpen(true)} className={activeCount > 0 ? 'border-destructive/50 text-destructive' : 'border-destructive/20'}>
              <Filter className="mr-2 h-4 w-4" /> Advanced Filters
              {activeCount > 0 && <span className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">{activeCount}</span>}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full overflow-hidden border-destructive/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm">
              <thead className="bg-destructive/10 border-b border-destructive/20">
                <tr>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-destructive">Reference</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[200px] text-destructive">Organisation</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-destructive">Alert Reason</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[120px] text-destructive">Severity</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-destructive">Submitted</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[100px] text-destructive">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-destructive/5 transition-colors cursor-pointer" onClick={() => navigate(`/case-officer/cases/${c.id}`)}>
                    <td className="px-3 py-4 text-center align-middle"><span className="font-mono font-bold text-destructive">{c.id}</span></td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.organisation}</td>
                    <td className="px-3 py-4 text-center align-middle"><Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">{c.reason}</Badge></td>
                    <td className="px-3 py-4 text-center align-middle"><div className="flex justify-center"><Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/30 px-2.5 py-0.5 rounded-full">{c.severity}</Badge></div></td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.submitted}</td>
                    <td className="px-3 py-4 text-center align-middle"><Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={(e) => { e.stopPropagation(); navigate(`/case-officer/cases/${c.id}`); }}><Eye className="h-4 w-4 mr-2" /> View Alert</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AdvancedFilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} filters={advFilters} onApply={setAdvFilters} activeCount={activeCount} />
    </div>
  );
}
