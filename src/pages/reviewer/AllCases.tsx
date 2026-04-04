import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdvancedFilterDrawer, {
  AdvancedFilters, EMPTY_FILTERS, countActiveFilters,
} from '@/components/shared/AdvancedFilterDrawer';

export default function ReviewerAllCases() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);

  const allCases = [
    { id: 'PSIRP-2025-0028', title: 'Critical Security Breach', organisation: 'Global Express Logistics Sdn Bhd', reporter: 'Ahmad bin Abdullah', officer: 'You', severity: 'Critical', status: 'Under Review', submitted: '2025-01-16', lastUpdated: '2025-01-18', escalation: 'Yes', isOwn: true },
    { id: 'PSIRP-2025-0027', title: 'High-Value Theft Investigation', organisation: 'Swift Logistics Sdn Bhd', reporter: 'Mohd Zaki', officer: 'You', severity: 'High', status: 'Pending Review', submitted: '2025-01-16', lastUpdated: '2025-01-17', escalation: 'No', isOwn: true },
    { id: 'PSIRP-2025-0030', title: 'Warehouse Break-in', organisation: 'Pos Malaysia Berhad', reporter: 'Kamal Hassan', officer: 'Nurul Hana', severity: 'High', status: 'Under Review', submitted: '2025-01-17', lastUpdated: '2025-01-18', escalation: 'No', isOwn: false },
    { id: 'PSIRP-2025-0031', title: 'Package Diversion Scheme', organisation: 'Global Express Logistics Sdn Bhd', reporter: 'Fatimah Zahra', officer: 'Lee Wei', severity: 'Critical', status: 'Escalation Pending', submitted: '2025-01-17', lastUpdated: '2025-01-19', escalation: 'Pending', isOwn: false },
    { id: 'PSIRP-2025-0029', title: 'Missing Registered Mail', organisation: 'Fast Delivery Enterprise', reporter: 'Azman Ali', officer: 'Farah Amin', severity: 'Medium', status: 'RFI Sent', submitted: '2025-01-16', lastUpdated: '2025-01-17', escalation: 'No', isOwn: false },
    { id: 'PSIRP-2025-0026', title: 'Package Tampering Report', organisation: 'Global Express Logistics Sdn Bhd', reporter: 'Ahmad bin Abdullah', officer: 'You', severity: 'High', status: 'RFI Sent', submitted: '2025-01-15', lastUpdated: '2025-01-16', escalation: 'No', isOwn: true },
    { id: 'PSIRP-2025-0032', title: 'Delayed Goods Complaint', organisation: 'Swift Logistics Sdn Bhd', reporter: 'Mohd Zaki', officer: 'Ahmad Razif', severity: 'Low', status: 'Under Review', submitted: '2025-01-18', lastUpdated: '2025-01-20', escalation: 'No', isOwn: false },
  ];

  const activeCount = countActiveFilters(advFilters);

  const filtered = allCases.filter((i) => {
    // Main search: Ref No, Title, Organisation, Reporter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        i.id.toLowerCase().includes(q) ||
        i.title.toLowerCase().includes(q) ||
        i.organisation.toLowerCase().includes(q) ||
        i.reporter.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Advanced filters
    if (advFilters.status !== 'all' && i.status !== advFilters.status) return false;
    if (advFilters.severity !== 'all' && i.severity !== advFilters.severity) return false;
    if (advFilters.dateFrom && i.submitted < advFilters.dateFrom) return false;
    if (advFilters.dateTo && i.submitted > advFilters.dateTo) return false;
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
        <h1 className="text-3xl font-bold mb-2">Case Monitoring</h1>
        <p className="text-muted-foreground">Monitor all cases across Case Officers — you can comment on colleagues' assessments</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference, title, organisation, reporter..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              id="btn-advanced-filters"
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
          <div className="relative group w-full overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="table-auto w-full text-sm">
                <thead className="border-b bg-muted/50 border-border">
                  <tr>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Reference</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[200px] text-foreground">Title</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[180px] text-foreground">Organisation</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[150px] text-foreground">Reporter</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[150px] text-foreground">Assigned Officer</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[120px] text-foreground">Severity</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Status</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[150px] text-foreground">Escalation</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[160px] text-foreground">Last Updated</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Submitted</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[50px] text-foreground"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((c) => (
                    <tr key={c.id} className="border-b hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => navigate(`/case-officer/cases/${c.id}`)}>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <span className="font-mono font-bold text-primary hover:underline cursor-pointer text-sm" onClick={() => navigate(`/case-officer/cases/${c.id}`)}>{c.id}</span>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm font-medium whitespace-normal">{c.title}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground whitespace-normal">{c.organisation}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm whitespace-normal">{c.reporter}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <span className={c.isOwn ? 'text-role-reviewer font-medium text-sm' : 'text-muted-foreground text-sm'}>{c.officer}</span>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${getSeverityColor(c.severity)} text-[11px]`}>{c.severity}</Badge>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${getStatusColor(c.status)} text-[11px]`}>{c.status}</Badge>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          {c.escalation === 'Yes' && <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">Yes</Badge>}
                          {c.escalation === 'Pending' && <Badge variant="outline" className="bg-status-investigation/20 text-status-investigation border-status-investigation/30 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">Pending</Badge>}
                          {c.escalation === 'No' && <span className="text-muted-foreground text-sm">No</span>}
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{c.lastUpdated}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{c.submitted}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Button size="sm" variant="ghost" onClick={() => navigate(`/case-officer/cases/${c.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Scroll Hint Shadow */}
            <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none bg-gradient-to-l from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-r" />
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filter Drawer */}
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
