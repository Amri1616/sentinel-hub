import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, ArrowLeft, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdvancedFilterDrawer, {
  AdvancedFilters, EMPTY_FILTERS, countActiveFilters,
} from '@/components/shared/AdvancedFilterDrawer';

const transferRequests = [
  { id: 'PSIRP-2025-0045', org: 'Global Express Logistics', officer: 'Ahmad Razif', target: 'Hanis Zakaria', severity: 'Critical', date: '2025-06-09' },
  { id: 'PSIRP-2025-0056', org: 'Ninja Van', officer: 'Faizal Ariffin', target: 'Sarah Lim', severity: 'High', date: '2025-06-11' },
];

export default function SupervisorTransferApprovals() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);

  const activeCount = countActiveFilters(advFilters);

  const filtered = transferRequests.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      const match = c.id.toLowerCase().includes(q) || c.org.toLowerCase().includes(q) || c.officer.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-indigo-600 flex items-center">
            <Users className="mr-3 h-8 w-8 text-indigo-600" />
            Case Transfer Requests
          </h1>
          <p className="text-muted-foreground">Internal reassignment requests between Case Officers</p>
        </div>
        <Badge variant="outline" className="bg-indigo-100 text-indigo-700 border-indigo-300 px-4 py-1 text-sm font-bold uppercase tracking-widest">
          Needs Approval
        </Badge>
      </div>

      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center" onClick={() => navigate('/supervisor/dashboard')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <Card className="border-indigo-200 bg-indigo-50/30">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transfer requests..." className="pl-10 border-indigo-200 focus-visible:ring-indigo-500" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full overflow-hidden border-indigo-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm">
              <thead className="bg-indigo-100/50 border-b border-indigo-200">
                <tr>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-indigo-800 min-w-[140px]">Reference</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-indigo-800 min-w-[150px]">Current Officer</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-indigo-800 min-w-[150px]">Target Officer</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-indigo-800 min-w-[140px]">Severity</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-indigo-800 min-w-[140px]">Request Date</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[100px] text-indigo-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-indigo-50 cursor-pointer transition-colors border-b" onClick={() => navigate(`/supervisor/cases/${c.id}`)}>
                    <td className="px-3 py-4 text-center align-middle font-mono font-bold text-indigo-700">{c.id}</td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.officer}</td>
                    <td className="px-3 py-4 text-center align-middle text-indigo-600 font-medium">{c.target}</td>
                    <td className="px-3 py-4 text-center align-middle"><div className="flex justify-center"><Badge variant="outline" className="bg-indigo-100 text-indigo-700 border-indigo-300 rounded-full">{c.severity}</Badge></div></td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.date}</td>
                    <td className="px-3 py-4 text-center align-middle"><Button size="sm" variant="ghost" className="text-indigo-700 hover:bg-indigo-100" onClick={(e) => { e.stopPropagation(); navigate(`/supervisor/cases/${c.id}`); }}><Eye className="h-4 w-4 mr-2" /> Review</Button></td>
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
