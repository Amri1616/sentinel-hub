import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdvancedFilterDrawer, {
  AdvancedFilters, EMPTY_FILTERS, countActiveFilters,
} from '@/components/shared/AdvancedFilterDrawer';

const cases = [
  { id: 'ESC-2025-001', title: 'High-Value Package Theft Ring', reporter: 'Ali Hassan', escalationDate: '2025-06-10', org: 'Global Express Logistics', severity: 'High', status: 'Under Investigation' },
  { id: 'ESC-2025-002', title: 'Contraband Interception - Narcotics', reporter: 'Siti Aisyah', escalationDate: '2025-06-12', org: 'Pos Malaysia', severity: 'Critical', status: 'Evidence Seized' },
  { id: 'ESC-2025-003', title: 'Organized Parcel Tampering', reporter: 'Lim Wei Jie', escalationDate: '2025-06-13', org: 'J&T Express', severity: 'High', status: 'Pending Further Information' },
  { id: 'ESC-2025-004', title: 'Repeated Warehouse Intrusions', reporter: 'Ahmad Zulkifli', escalationDate: '2025-06-14', org: 'Pos Malaysia', severity: 'High', status: 'Pending Further Information' },
  { id: 'ESC-2025-005', title: 'Large Scale Delivery Fraud', reporter: 'Tan Mei Ling', escalationDate: '2025-06-15', org: 'J&T Express', severity: 'Critical', status: 'Under Investigation' },
  { id: 'ESC-2025-006', title: 'Stolen Goods Resell Syndicate', reporter: 'Kumar Raj', escalationDate: '2025-05-20', org: 'CityLink', severity: 'Medium', status: 'Case Referred for Prosecution' },
  { id: 'ESC-2025-007', title: 'Suspicious Document Forgery', reporter: 'Wong Kai Wen', escalationDate: '2025-05-15', org: 'DHL eCommerce', severity: 'High', status: 'No Further Action' },
  { id: 'ESC-2025-008', title: 'Inside Job - Delivery Driver Theft', reporter: 'Nurul Izzah', escalationDate: '2025-05-10', org: 'Global Express Logistics', severity: 'Medium', status: 'Case Referred for Prosecution' },
];

const statusColors: Record<string, string> = {
  'Under Investigation': 'bg-primary/20 text-primary border-primary/30 px-2.5 py-0.5 rounded-full',
  'Evidence Seized': 'bg-role-validator/20 text-role-validator border-role-validator/30 px-2.5 py-0.5 rounded-full',
  'Pending Further Information': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30 px-2.5 py-0.5 rounded-full',
  'Case Referred for Prosecution': 'bg-role-investigator/20 text-role-investigator border-role-investigator/30 px-2.5 py-0.5 rounded-full',
  'No Further Action': 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30 px-2.5 py-0.5 rounded-full',
};

export default function LEACaseList() {
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);
  const navigate = useNavigate();

  const activeCount = countActiveFilters(advFilters);

  const filtered = cases.filter((c) => {
    // Main search: Ref No, Title, Organisation, Reporter
    if (search) {
      const q = search.toLowerCase();
      const match =
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.org.toLowerCase().includes(q) ||
        c.reporter.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Advanced filters
    if (advFilters.status !== 'all' && c.status !== advFilters.status) return false;
    if (advFilters.severity !== 'all' && c.severity !== advFilters.severity) return false;
    if (advFilters.dateFrom && c.escalationDate < advFilters.dateFrom) return false;
    if (advFilters.dateTo && c.escalationDate > advFilters.dateTo) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Escalated Cases</h1>
        <p className="text-muted-foreground">Cases formally referred to your agency</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference, title, organisation, reporter..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
              <Table className="table-auto w-full text-sm">
                <TableHeader className="bg-muted/50 border-b border-border">
                  <TableRow>
                    <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Reference</TableHead>
                    <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[220px]">Case Title</TableHead>
                    <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[150px]">Reporter</TableHead>
                    <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Escalation Date</TableHead>
                    <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[180px]">Organisation</TableHead>
                    <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[120px]">Severity</TableHead>
                    <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[200px]">Investigation Status</TableHead>
                    <TableHead className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[50px] text-foreground"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id} className="hover:bg-muted/30 cursor-pointer transition-colors border-b" onClick={() => navigate(`/lea/cases/${c.id}`)}>
                      <TableCell className="px-3 py-4 text-center align-middle font-mono font-bold text-primary hover:underline cursor-pointer text-sm">{c.id}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle whitespace-normal text-sm font-medium">{c.title}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle whitespace-normal text-sm">{c.reporter}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{c.escalationDate}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle whitespace-normal text-sm">{c.org}</TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${c.severity === 'Critical' ? 'bg-destructive/20 text-destructive border-destructive/30' : c.severity === 'High' ? 'bg-status-in-review/20 text-status-in-review border-status-in-review/30' : 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30'} px-2.5 py-0.5 rounded-full text-[11px]`}>
                            {c.severity}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${statusColors[c.status] || ''} text-[11px]`}>{c.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Button size="sm" variant="ghost" onClick={() => navigate(`/lea/cases/${c.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
