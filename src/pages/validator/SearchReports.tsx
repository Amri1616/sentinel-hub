import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Download, FileBarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const reportData = [
  { id: 'PSIRP-2025-0063', status: 'Under Review', severity: 'Medium', org: 'Global Express Logistics', officer: 'Raj Kumar' },
  { id: 'PSIRP-2025-0060', status: 'Escalation Pending', severity: 'Critical', org: 'Pos Malaysia', officer: 'Farah Amin' },
  { id: 'PSIRP-2025-0058', status: 'Escalation Pending', severity: 'High', org: 'J&T Express', officer: 'Lee Wei' },
  { id: 'PSIRP-2025-0045', status: 'Escalation Pending', severity: 'Critical', org: 'Global Express Logistics', officer: 'Ahmad Razif' },
  { id: 'PSIRP-2025-0039', status: 'Under Review', severity: 'Medium', org: 'CityLink', officer: 'Ahmad Razif' },
  { id: 'PSIRP-2025-0030', status: 'Closed', severity: 'Medium', org: 'Pos Malaysia', officer: 'Nurul Hana' },
  { id: 'PSIRP-2025-0025', status: 'Escalated', severity: 'High', org: 'DHL eCommerce', officer: 'Farah Amin' },
];

export default function SearchReports() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Search & Reports</h1>
          <p className="text-muted-foreground">Generate governance-level reports and export data</p>
        </div>
      </div>

      <Tabs defaultValue="search" className="space-y-4">
        <TabsList>
          <TabsTrigger value="search">Search Cases</TabsTrigger>
          <TabsTrigger value="reports">Generate Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by reference, organisation, officer..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Organisation</TableHead>
                    <TableHead>Officer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.filter((r) => !search || r.id.toLowerCase().includes(search.toLowerCase()) || r.org.toLowerCase().includes(search.toLowerCase()) || r.officer.toLowerCase().includes(search.toLowerCase())).map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.id}</TableCell>
                      <TableCell><Badge variant="outline">{r.status}</Badge></TableCell>
                      <TableCell>{r.severity}</TableCell>
                      <TableCell>{r.org}</TableCell>
                      <TableCell>{r.officer}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: 'Escalation Statistics', desc: 'Escalation approvals, rejections, and turnaround times' },
              { title: 'Officer Workload', desc: 'Caseload and efficiency metrics per officer' },
              { title: 'Case Volume by Organisation', desc: 'Incident distribution across licensed organisations' },
            ].map((report) => (
              <Card key={report.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileBarChart className="h-4 w-4" /> {report.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{report.desc}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => toast({ title: 'Export Started', description: `${report.title} – PDF export queued.` })}>
                      <Download className="h-4 w-4 mr-1" /> PDF
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toast({ title: 'Export Started', description: `${report.title} – Excel export queued.` })}>
                      <Download className="h-4 w-4 mr-1" /> Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
