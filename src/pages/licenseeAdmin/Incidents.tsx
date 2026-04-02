import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, Filter, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const incidents = [
  { id: 'PSIRP-2025-0025', reporter: 'Ahmad bin Abdullah', type: 'Theft', severity: 'High', status: 'Under Review', submitted: '2025-01-15', updated: '2025-01-20', escalated: true, description: 'High-value package theft at sorting facility', attachments: ['evidence-photo.jpg', 'cctv-footage.mp4'] },
  { id: 'PSIRP-2025-0024', reporter: 'Mohd Zaki', type: 'Suspicious Parcel', severity: 'Medium', status: 'Submitted', submitted: '2025-01-14', updated: '2025-01-15', escalated: false, description: 'Suspicious parcel detected during scanning', attachments: ['scan-report.pdf'] },
  { id: 'PSIRP-2025-0023', reporter: 'Kamal Hassan', type: 'Prohibited Items', severity: 'Low', status: 'Draft', submitted: '2025-01-13', updated: '2025-01-13', escalated: false, description: 'Prohibited items found in shipment', attachments: [] },
  { id: 'PSIRP-2025-0022', reporter: 'Fatimah Zahra', type: 'Security Breach', severity: 'High', status: 'Escalated', submitted: '2025-01-12', updated: '2025-01-16', escalated: true, description: 'Unauthorized access to secure area', attachments: ['access-log.csv', 'photo1.jpg'] },
  { id: 'PSIRP-2025-0021', reporter: 'Azman Ali', type: 'Theft', severity: 'Critical', status: 'Closed', submitted: '2025-01-11', updated: '2025-01-20', escalated: true, description: 'Serial theft case across multiple branches', attachments: ['police-report.pdf'] },
  { id: 'PSIRP-2025-0020', reporter: 'Ahmad bin Abdullah', type: 'Others', severity: 'Low', status: 'Under Review', submitted: '2025-01-10', updated: '2025-01-12', escalated: false, description: 'Equipment tampering report', attachments: [] },
];

const statusColors: Record<string, string> = {
  'Draft': 'bg-status-draft/20 text-status-draft border-status-draft/30 px-2.5 py-0.5 rounded-full',
  'Submitted': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30 px-2.5 py-0.5 rounded-full',
  'Under Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30 px-2.5 py-0.5 rounded-full',
  'Escalated': 'bg-status-investigation/20 text-status-investigation border-status-investigation/30 px-2.5 py-0.5 rounded-full',
  'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30 px-2.5 py-0.5 rounded-full',
};

const severityColors: Record<string, string> = {
  'Low': 'bg-status-closed/20 text-status-closed border-status-closed/30 px-2.5 py-0.5 rounded-full',
  'Medium': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30 px-2.5 py-0.5 rounded-full',
  'High': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30 px-2.5 py-0.5 rounded-full',
  'Critical': 'bg-destructive/20 text-destructive border-destructive/30 px-2.5 py-0.5 rounded-full',
};

export default function LicenseeAdminIncidents() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filtered = incidents.filter(i =>
    i.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Case Monitoring</h1>
        <p className="text-muted-foreground">Read-only view of all organisation incidents</p>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by reference, reporter, type..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Advanced Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Cases</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="date" />
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Case Type</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="All types" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="theft">Theft</SelectItem>
                        <SelectItem value="suspicious">Suspicious Parcel</SelectItem>
                        <SelectItem value="prohibited">Prohibited Items</SelectItem>
                        <SelectItem value="breach">Security Breach</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="All statuses" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="review">Under Review</SelectItem>
                        <SelectItem value="escalated">Escalated</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Reporter</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="All reporters" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="ahmad">Ahmad bin Abdullah</SelectItem>
                        <SelectItem value="siti">Mastura Salleh</SelectItem>
                        <SelectItem value="kamal">Kamal Hassan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Apply Filters</Button>
                    <Button variant="outline" className="flex-1">Reset</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card className="w-full overflow-hidden border">
        <CardContent className="p-0">
          <div className="relative group w-full overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="table-auto w-full text-sm">
                <thead className="border-b bg-muted/50 border-border">
                  <tr>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Reference</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[180px] text-foreground">Reporter</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[150px] text-foreground">Case Type</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[120px] text-foreground">Severity</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Status</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[160px] text-foreground">Last Updated Date</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[140px] text-foreground">Submitted</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[150px] text-foreground">Escalation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((incident) => (
                    <tr key={incident.id} className="border-b hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => navigate(`/licensee-admin/incidents/${incident.id}`)}>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <span className="font-mono font-bold text-primary hover:underline cursor-pointer text-sm">{incident.id}</span>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm whitespace-normal">{incident.reporter}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm whitespace-normal">{incident.type}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${severityColors[incident.severity]} text-[11px]`}>{incident.severity}</Badge>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={`${statusColors[incident.status]} text-[11px]`}>{incident.status}</Badge>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{incident.updated}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{incident.submitted}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          {incident.escalated ? (
                            <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">Yes</Badge>
                          ) : (
                            <span className="text-sm text-muted-foreground whitespace-nowrap">No</span>
                          )}
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
    </div>
  );
}
