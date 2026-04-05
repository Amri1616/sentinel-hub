import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdvancedFilterDrawer, { EMPTY_FILTERS, countActiveFilters, AdvancedFilters } from '@/components/shared/AdvancedFilterDrawer';

const incidents = [
  { id: 'PSIRP-2025-0025', reporter: 'Ahmad bin Abdullah', type: 'Theft', severity: 'High', status: 'Investigation Ongoing', submitted: '2025-01-15', escalationDate: '2025-01-18', agency: 'PDRM' },
  { id: 'PSIRP-2025-0022', reporter: 'Fatimah Zahra', type: 'Security Breach', severity: 'High', status: 'Pending Investigation', submitted: '2025-01-12', escalationDate: '2025-01-15', agency: 'KDN' },
];

const severityColors: Record<string, string> = {
  'Low': 'bg-status-closed/20 text-status-closed border-status-closed/30',
  'Medium': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
  'High': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
  'Critical': 'bg-destructive/20 text-destructive border-destructive/30',
};

const statusColors: Record<string, string> = {
  'Investigation Ongoing': 'bg-status-investigation/20 text-status-investigation border-status-investigation/30',
  'Pending Investigation': 'bg-amber-500/15 text-amber-600 border-amber-500/30'
};

export default function LicenseeAdminEscalated() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);
  const activeFilterCount = countActiveFilters(filters);

  const filtered = incidents.filter(i =>
    i.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.agency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Escalated Cases</h1>
        <p className="text-muted-foreground">Cases escalated to Law Enforcement Agencies (LEA)</p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center"
        onClick={() => navigate('/licensee-admin/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by reference, reporter, type, or agency..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Button variant="outline" onClick={() => setIsFilterOpen(true)} className="relative">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-2 px-1.5 min-w-[1.25rem] h-5 justify-center">{activeFilterCount}</Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Reference No</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Reporter</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Case Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Severity</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Submitted Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Escalation Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Assigned LEA</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Inv. Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((incident) => (
                  <tr key={incident.id} className="border-b hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => navigate(`/licensee-admin/incidents/${incident.id}`)}>
                    <td className="px-4 py-4">
                      <span className="font-mono text-sm text-primary">{incident.id}</span>
                    </td>
                    <td className="px-4 py-4 text-sm">{incident.reporter}</td>
                    <td className="px-4 py-4 text-sm">{incident.type}</td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className={severityColors[incident.severity]}>{incident.severity}</Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{incident.submitted}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{incident.escalationDate}</td>
                    <td className="px-4 py-4 text-sm">{incident.agency}</td>
                    <td className="px-4 py-4 text-sm">
                      <Badge variant="outline" className={statusColors[incident.status]}>{incident.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AdvancedFilterDrawer
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApply={setFilters}
      />
    </div>
  );
}

