import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdvancedFilterDrawer, {
  AdvancedFilters, EMPTY_FILTERS, countActiveFilters,
} from '@/components/shared/AdvancedFilterDrawer';

const closedCases = [
  { id: 'ESC-2025-006', title: 'Stolen Goods Resell Syndicate', org: 'CityLink', severity: 'Medium', status: 'Case Referred for Prosecution', date: '2025-05-20' },
  { id: 'ESC-2025-007', title: 'Suspicious Document Forgery', org: 'DHL eCommerce', severity: 'High', status: 'No Further Action', date: '2025-05-15' },
];

export default function LEAClosedCases() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);

  const activeCount = countActiveFilters(advFilters);

  const filtered = closedCases.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      const match = c.id.toLowerCase().includes(q) || c.org.toLowerCase().includes(q) || c.status.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3 text-status-closed">
          <CheckCircle className="h-8 w-8 text-status-closed" />
          Resolved Cases
        </h1>
        <p className="text-muted-foreground">Historical records of investigations completed by your agency</p>
      </div>

      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center" onClick={() => navigate('/agency/dashboard')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search resolved cases..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[200px]">Organisation</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Severity</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[220px]">Outcome</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Date Resolved</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[100px] text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30 cursor-pointer transition-colors border-b" onClick={() => navigate(`/agency/cases/${c.id}`)}>
                    <td className="px-3 py-4 text-center align-middle font-mono font-bold text-primary">{c.id}</td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.org}</td>
                    <td className="px-3 py-4 text-center align-middle"><div className="flex justify-center"><Badge variant="outline" className="bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30 px-2.5 py-0.5 rounded-full">{c.severity}</Badge></div></td>
                    <td className="px-3 py-4 text-center align-middle"><div className="flex justify-center"><Badge variant="outline" className="bg-status-closed/10 text-status-closed border-status-closed/20 px-2.5 py-0.5 rounded-full">{c.status}</Badge></div></td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.date}</td>
                    <td className="px-3 py-4 text-center align-middle"><Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate(`/agency/cases/${c.id}`); }}><Eye className="h-4 w-4 mr-2" /> View Audit</Button></td>
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
