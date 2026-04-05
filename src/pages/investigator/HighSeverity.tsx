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

const highSeverityCases = [
  { id: 'PSIRP-2025-0060', title: 'Contraband Interception', org: 'Pos Malaysia', officer: 'Farah Amin', severity: 'Critical', status: 'Escalation Pending', submitted: '2025-06-08' },
  { id: 'PSIRP-2025-0045', title: 'Suspicious Cross-Border Shipment', org: 'DHL eCommerce', officer: 'Farah Amin', severity: 'Critical', status: 'Escalated', submitted: '2025-05-28' },
  { id: 'PSIRP-2025-0052', title: 'Parcel Diversion Scheme', org: 'J&T Express', officer: 'Nurul Hana', severity: 'High', status: 'Escalated', submitted: '2025-06-03' },
];

export default function InternalHighSeverity() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);

  const activeCount = countActiveFilters(advFilters);

  const filtered = highSeverityCases.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      const match = c.id.toLowerCase().includes(q) || c.org.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-role-investigator">
            <ShieldAlert className="h-8 w-8 text-role-investigator" />
            High Severity Incidents
          </h1>
          <p className="text-muted-foreground">Strategic oversight of critical and high-impact security breaches</p>
        </div>
        <Badge variant="outline" className="bg-role-investigator/10 text-role-investigator border-role-investigator/30 px-3 py-1 font-bold animate-pulse uppercase tracking-widest">
          Critical Focus
        </Badge>
      </div>

      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center" onClick={() => navigate('/internal/dashboard')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <Card className="border-role-investigator/20 bg-role-investigator/5">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search high-severity cases..." className="pl-10 border-role-investigator/20 focus-visible:ring-role-investigator" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Button variant="outline" onClick={() => setDrawerOpen(true)} className={activeCount > 0 ? 'border-primary/50 text-primary' : 'border-role-investigator/20'}>
              <Filter className="mr-2 h-4 w-4" /> Advanced Filters
              {activeCount > 0 && <span className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">{activeCount}</span>}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full overflow-hidden border-role-investigator/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm">
              <thead className="bg-role-investigator/10 border-b border-role-investigator/20">
                <tr>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-role-investigator min-w-[140px]">Reference</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-role-investigator min-w-[180px]">Organisation</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-role-investigator min-w-[120px]">Severity</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-role-investigator min-w-[140px]">Officer</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-role-investigator min-w-[140px]">Submitted</th>
                  <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[100px] text-role-investigator">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-role-investigator/5 cursor-pointer transition-colors border-b" onClick={() => navigate(`/internal/cases/${c.id}`)}>
                    <td className="px-3 py-4 text-center align-middle font-mono font-bold text-role-investigator">{c.id}</td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.org}</td>
                    <td className="px-3 py-4 text-center align-middle">
                      <div className="flex justify-center">
                        <Badge variant="outline" className={c.severity === 'Critical' ? 'bg-destructive/20 text-destructive border-destructive/30' : 'bg-role-investigator/20 text-role-investigator border-role-investigator/30'}>{c.severity}</Badge>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.officer}</td>
                    <td className="px-3 py-4 text-center align-middle text-muted-foreground">{c.submitted}</td>
                    <td className="px-3 py-4 text-center align-middle text-sm"><Button size="sm" variant="ghost" className="text-role-investigator hover:bg-role-investigator/10 font-bold" onClick={(e) => { e.stopPropagation(); navigate(`/internal/cases/${c.id}`); }}><Eye className="h-4 w-4 mr-2" /> View Audit</Button></td>
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
