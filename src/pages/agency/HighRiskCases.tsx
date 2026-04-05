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

const highRiskCases = [
  { id: 'ESC-2025-002', title: 'Contraband Interception - Narcotics', reporter: 'Siti Aisyah', escalationDate: '2025-06-12', org: 'Pos Malaysia', severity: 'Critical', status: 'Evidence Seized' },
  { id: 'ESC-2025-005', title: 'Large Scale Delivery Fraud', reporter: 'Tan Mei Ling', escalationDate: '2025-06-15', org: 'J&T Express', severity: 'Critical', status: 'Under Investigation' },
];

export default function LEAHighRiskCases() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);

  const activeCount = countActiveFilters(advFilters);

  const filtered = highRiskCases.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      const match = c.id.toLowerCase().includes(q) || c.org.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-destructive flex items-center">
            <ShieldAlert className="mr-3 h-8 w-8 text-destructive" />
            High-Risk Case Alerts
          </h1>
          <p className="text-muted-foreground">Critical investigations requiring immediate priority and resources</p>
        </div>
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 px-4 py-1 text-sm font-bold animate-pulse uppercase tracking-widest">
          Action Required
        </Badge>
      </div>

      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center" onClick={() => navigate('/agency/dashboard')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search high-risk cases..." className="pl-10 border-destructive/20 focus-visible:ring-destructive" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full overflow-hidden border-destructive/20 text-center">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm">
              <thead className="bg-destructive/10 border-b border-destructive/20">
                <tr>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-destructive min-w-[140px]">Reference</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-destructive min-w-[200px]">Organisation</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-destructive min-w-[140px]">Severity</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-destructive min-w-[180px]">Status</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-destructive min-w-[140px]">Subitted On</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[100px] text-destructive">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-destructive/5 cursor-pointer transition-colors border-b" onClick={() => navigate(`/agency/cases/${c.id}`)}>
                    <td className="px-3 py-4 text-center align-middle font-mono font-bold text-destructive">{c.id}</td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.org}</td>
                    <td className="px-3 py-4 text-center align-middle"><div className="flex justify-center"><Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/30 px-2.5 py-0.5 rounded-full">{c.severity}</Badge></div></td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.status}</td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.escalationDate}</td>
                    <td className="px-3 py-4 text-center align-middle"><Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10 font-bold" onClick={(e) => { e.stopPropagation(); navigate(`/agency/cases/${c.id}`); }}><Eye className="h-4 w-4 mr-2" /> Investigate</Button></td>
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
