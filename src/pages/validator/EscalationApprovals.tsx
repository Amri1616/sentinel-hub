import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdvancedFilterDrawer, {
  AdvancedFilters, EMPTY_FILTERS, countActiveFilters,
} from '@/components/shared/AdvancedFilterDrawer';

const escalationRequests = [
  { id: 'PSIRP-2025-0060', org: 'Pos Malaysia', officer: 'Farah Amin', severity: 'High', date: '2025-06-10' },
  { id: 'PSIRP-2025-0045', org: 'Global Express Logistics', officer: 'Ahmad Razif', severity: 'Critical', date: '2025-06-09' },
  { id: 'PSIRP-2025-0032', org: 'City-Link Express', officer: 'Nurul Hana', severity: 'Medium', date: '2025-06-08' },
];

export default function SupervisorEscalationApprovals() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);

  const activeCount = countActiveFilters(advFilters);

  const filtered = escalationRequests.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      const match = c.id.toLowerCase().includes(q) || c.org.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-amber-600 flex items-center">
            <AlertTriangle className="mr-3 h-8 w-8 text-amber-600" />
            Escalation Requests
          </h1>
          <p className="text-muted-foreground">Endorsement queue for multi-agency law enforcement escalations</p>
        </div>
        <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300 px-4 py-1 text-sm font-bold uppercase tracking-widest">
          Pending Endorsement
        </Badge>
      </div>

      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center" onClick={() => navigate('/supervisor/dashboard')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <Card className="border-amber-200 bg-amber-50/30">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search escalation requests..." className="pl-10 border-amber-200 focus-visible:ring-amber-500" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full overflow-hidden border-amber-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm">
              <thead className="bg-amber-100/50 border-b border-amber-200">
                <tr>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-amber-800 min-w-[140px]">Reference</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-amber-800 min-w-[200px]">Organisation</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-amber-800 min-w-[140px]">Severity</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-amber-800 min-w-[140px]">Officer</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-amber-800 min-w-[140px]">Date</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[100px] text-amber-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-amber-50 cursor-pointer transition-colors border-b" onClick={() => navigate(`/supervisor/escalations/${c.id}`)}>
                    <td className="px-3 py-4 text-center align-middle font-mono font-bold text-amber-700">{c.id}</td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.org}</td>
                    <td className="px-3 py-4 text-center align-middle"><div className="flex justify-center"><Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300 rounded-full">{c.severity}</Badge></div></td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.officer}</td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.date}</td>
                    <td className="px-3 py-4 text-center align-middle"><Button size="sm" variant="ghost" className="text-amber-700 hover:bg-amber-100" onClick={(e) => { e.stopPropagation(); navigate(`/supervisor/escalations/${c.id}`); }}><Eye className="h-4 w-4 mr-2" /> Endorse</Button></td>
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
