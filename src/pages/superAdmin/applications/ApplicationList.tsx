import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle,
  Eye,
  Search,
  Building2,
  Shield,
  Calendar,
  ChevronDown,
  Edit2,
  ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

const mockApplications = [
  { id: 'APP-2026-001', organisation: 'Ninja Van Malaysia', type: 'Licensee', status: 'submitted', date: '2026-03-05', lastUpdated: '2026-03-08', contactPerson: 'Ariff Kamal' },
  { id: 'APP-2026-002', organisation: 'PDRM - Cyber Crime Unit', type: 'LEA', status: 'under_review', date: '2026-03-04', lastUpdated: '2026-03-07', contactPerson: 'ASP Ridzuan' },
  { id: 'APP-2026-003', organisation: 'J&T Express', type: 'Licensee', status: 'approved', date: '2026-03-01', lastUpdated: '2026-03-05', contactPerson: 'Kenny Lim' },
  { id: 'APP-2026-004', organisation: 'MCMC - Enforcement', type: 'LEA', status: 'approved', date: '2026-02-25', lastUpdated: '2026-03-02', contactPerson: 'Siti Aminah' },
  { id: 'APP-2026-005', organisation: 'GDEX', type: 'Licensee', status: 'rejected', date: '2026-02-15', lastUpdated: '2026-02-20', contactPerson: 'Ahmad Nizam' },
  { id: 'APP-2026-006', organisation: 'Flash Express', type: 'Licensee', status: 'submitted', date: '2026-03-06', lastUpdated: '2026-03-06', contactPerson: 'Winnie Tan' },
];

export default function ApplicationList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge className="bg-slate-500/10 text-slate-500 border-slate-500/20">Submitted</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Under Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.organisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'licensee' && app.type === 'Licensee') || 
                      (activeTab === 'lea' && app.type === 'LEA');
    return matchesSearch && matchesTab;
  });

  const renderTable = (apps: typeof mockApplications) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-[120px]">Application ID</TableHead>
            <TableHead>Application Type</TableHead>
            <TableHead>Company / Agency Name</TableHead>
            <TableHead>Submitted Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apps.length > 0 ? (
            apps.map((app) => (
              <TableRow key={app.id} className="hover:bg-accent/20 transition-colors cursor-pointer" onClick={() => navigate(`/super-admin/applications/${app.id}`)}>
                <TableCell className="font-mono text-xs font-bold text-primary">{app.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {app.type === 'Licensee' ? (
                      <Badge variant="outline" className="bg-blue-500/5 border-blue-500/20 text-blue-500 font-bold uppercase tracking-widest text-[10px]">Licensee</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-500/5 border-amber-500/20 text-amber-500 font-bold uppercase tracking-widest text-[10px]">LEA</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{app.organisation}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {app.date}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(app.status)}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{app.lastUpdated}</TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/super-admin/applications/${app.id}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => navigate(`/super-admin/applications/${app.id}`)}>
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                No applications found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Application Management</h1>
          <p className="text-muted-foreground mt-1">Review and manage registration applications from Licensees and LEAs.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/super-admin/applications/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Application
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full space-y-4" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <TabsList className="bg-muted/50 p-1 border h-11">
            <TabsTrigger value="all" className="px-8 h-full font-bold uppercase tracking-widest text-[10px]">All Applications</TabsTrigger>
            <TabsTrigger value="licensee" className="px-8 h-full font-bold uppercase tracking-widest text-[10px]">Licensee Applications</TabsTrigger>
            <TabsTrigger value="lea" className="px-8 h-full font-bold uppercase tracking-widest text-[10px]">LEA Applications</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, ID, contact..." 
                className="pl-10 h-11 text-sm bg-card"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-11 border-dashed">
              <Filter className="mr-2 h-4 w-4" />
              Date Range
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card className="border-border/40 overflow-hidden shadow-sm">
            <CardContent className="p-0">
              {renderTable(filteredApplications)}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="licensee" className="mt-0">
          <Card className="border-border/40 overflow-hidden shadow-sm">
            <CardContent className="p-0">
              {renderTable(filteredApplications)}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="lea" className="mt-0">
          <Card className="border-border/40 overflow-hidden shadow-sm">
            <CardContent className="p-0">
              {renderTable(filteredApplications)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/40">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <p>Showing <span className="font-bold text-foreground">{filteredApplications.length}</span> results</p>
          <div className="h-4 w-px bg-border" />
          <p>Filtered by: <span className="font-bold text-primary uppercase tracking-widest text-[10px]">{activeTab}</span></p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" disabled>Previous</Button>
          <Button variant="ghost" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}

