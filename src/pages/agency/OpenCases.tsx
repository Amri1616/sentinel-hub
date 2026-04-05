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

const openCases = [
  { id: 'ESC-2025-001', title: 'High-Value Package Theft Ring', reporter: 'Ali Hassan', escalationDate: '2025-06-10', org: 'Global Express Logistics', severity: 'High', status: 'Under Investigation' },
  { id: 'ESC-2025-002', title: 'Contraband Interception - Narcotics', reporter: 'Siti Aisyah', escalationDate: '2025-06-12', org: 'Pos Malaysia', severity: 'Critical', status: 'Evidence Seized' },
  { id: 'ESC-2025-003', title: 'Organized Parcel Tampering', reporter: 'Lim Wei Jie', escalationDate: '2025-06-13', org: 'J&T Express', severity: 'High', status: 'Pending Further Information' },
];

export default function LEAOpenCases() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);

  const activeCount = countActiveFilters(advFilters);

  const filtered = openCases.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      const match = c.id.toLowerCase().includes(q) || c.org.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Clock className="h-8 w-8 text-status-in-review" />
          Ongoing Investigations
        </h1>
        <p className="text-muted-foreground">Cases currently active and under investigation by your agency</p>
      </div>

      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center" onClick={() => navigate('/agency/dashboard')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search active investigations..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[180px]">Organisation</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Severity</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[180px]">Investigation Status</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Escalated On</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[100px] text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30 cursor-pointer transition-colors border-b" onClick={() => navigate(`/agency/cases/${c.id}`)}>
                    <td className="px-3 py-4 text-center align-middle font-mono font-bold text-primary">{c.id}</td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.org}</td>
                    <td className="px-3 py-4 text-center align-middle"><div className="flex justify-center"><Badge variant="outline" className={c.severity === 'Critical' ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-status-in-review/10 text-status-in-review border-status-in-review/20'}>{c.severity}</Badge></div></td>
                    <td className="px-3 py-4 text-center align-middle"><div className="flex justify-center"><Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-2.5 py-0.5 rounded-full">{c.status}</Badge></div></td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.escalationDate}</td>
                    <td className="px-3 py-4 text-center align-middle"><Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate(`/agency/cases/${c.id}`); }}><Eye className="h-4 w-4 mr-2" /> View Case</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AdvancedFilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} filters={advFilters} onApply={setAdvFilters} activeCount={activeCount} hideAgencyFilter={true} />
    </div>
  );
}
