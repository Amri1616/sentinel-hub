import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdvancedFilterDrawer, {
  AdvancedFilters, EMPTY_FILTERS, countActiveFilters,
} from '@/components/shared/AdvancedFilterDrawer';

const pendingTasks = [
  { id: 'PSIRP-2025-0045', title: 'High-value theft – KL hub', officer: 'Ahmad Razif', severity: 'Critical', days: 2, status: 'Transfer Pending' },
  { id: 'PSIRP-2025-0052', title: 'Dangerous goods interception', officer: 'Nurul Hana', severity: 'High', days: 1, status: 'Recommendation for Closure' },
  { id: 'PSIRP-2025-0060', title: 'Cross-border contraband attempt', officer: 'Farah Amin', severity: 'Critical', days: 1, status: 'Escalation Pending' },
];

export default function SupervisorPendingTasks() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);

  const activeCount = countActiveFilters(advFilters);

  const filtered = pendingTasks.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      const match = c.id.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-destructive">Pending Supervisor Tasks</h1>
        <p className="text-muted-foreground">Cases requiring your endorsement or formal escalation approval</p>
      </div>

      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center" onClick={() => navigate('/supervisor/dashboard')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search pending tasks..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Button variant="outline" onClick={() => setDrawerOpen(true)} className={activeCount > 0 ? 'border-primary/50 text-primary' : ''}>
              <Filter className="mr-2 h-4 w-4" /> Advanced Filters
              {activeCount > 0 && <span className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">{activeCount}</span>}
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
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Reference</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[200px]">Task Summary</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Severity</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Officer</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Aging</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[100px] text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30 cursor-pointer transition-colors border-b" onClick={() => navigate(`/supervisor/cases/${c.id}`)}>
                    <td className="px-3 py-4 text-center align-middle font-mono font-bold text-primary">{c.id}</td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground truncate max-w-[200px]">{c.title}</td>
                    <td className="px-3 py-4 text-center align-middle"><div className="flex justify-center"><Badge variant="outline" className={c.severity === 'Critical' ? 'border-destructive/50 text-destructive bg-destructive/5' : 'border-status-in-review/50 text-status-in-review bg-status-in-review/5'}>{c.severity}</Badge></div></td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.officer}</td>
                    <td className="px-3 py-4 text-center align-middle"><div className="flex justify-center flex-col items-center"><Clock className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">{c.days}d ago</span></div></td>
                    <td className="px-3 py-4 text-center align-middle"><Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate(`/supervisor/cases/${c.id}`); }}><Eye className="h-4 w-4 mr-2" /> Review Action</Button></td>
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
