import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle,
  Eye,
  Search,
  Calendar,
  Edit2,
  Copy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

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
  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState(false);
  const [copiedCreateLink, setCopiedCreateLink] = useState(false);
  const [createLinkType, setCreateLinkType] = useState<'licensee' | 'lea'>(activeTab === 'lea' ? 'lea' : 'licensee');

  useEffect(() => {
    setIsCreateLinkOpen(false);
    setCopiedCreateLink(false);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'licensee' || activeTab === 'lea') {
      setCreateLinkType(activeTab);
    }
  }, [activeTab]);

  const createApplicationLink = `${window.location.origin}/super-admin/applications/new?type=${createLinkType}`;

  const handleCopyCreateLink = async () => {
    if (!createApplicationLink) return;

    try {
      await navigator.clipboard.writeText(createApplicationLink);
      setCopiedCreateLink(true);
      toast.success('Create application link copied to clipboard.');
      window.setTimeout(() => setCopiedCreateLink(false), 2000);
    } catch {
      toast.error('Unable to copy link. Please try again.');
    }
  };

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
            <TableHead className="w-[120px] text-center">Application ID</TableHead>
            <TableHead className="text-center">Application Type</TableHead>
            <TableHead className="text-center">Company / Agency Name</TableHead>
            <TableHead className="text-center">Submitted Date</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apps.length > 0 ? (
            apps.map((app) => (
              <TableRow key={app.id} className="hover:bg-accent/20 transition-colors cursor-pointer" onClick={() => navigate(`/super-admin/applications/${app.id}`)}>
                <TableCell className="font-mono text-xs font-bold text-primary text-center">{app.id}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    {app.type === 'Licensee' ? (
                      <Badge variant="outline" className="bg-blue-500/5 border-blue-500/20 text-blue-500 font-bold uppercase tracking-widest text-[10px]">Licensee</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-500/5 border-amber-500/20 text-amber-500 font-bold uppercase tracking-widest text-[10px]">LEA</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-center">{app.organisation}</TableCell>
                <TableCell className="text-xs text-muted-foreground text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {app.date}
                  </div>
                </TableCell>
                <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/super-admin/applications/${app.id}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
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
          <Dialog open={isCreateLinkOpen} onOpenChange={setIsCreateLinkOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Application Link
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Application Link</DialogTitle>
                <DialogDescription>
                  Choose the application type first, then copy the corresponding link.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Application Type
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={createLinkType === 'licensee' ? 'default' : 'outline'}
                      className="h-11"
                      onClick={() => setCreateLinkType('licensee')}
                    >
                      Licensee
                    </Button>
                    <Button
                      type="button"
                      variant={createLinkType === 'lea' ? 'default' : 'outline'}
                      className="h-11"
                      onClick={() => setCreateLinkType('lea')}
                    >
                      LEA
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {createLinkType === 'licensee' ? 'Licensee Application Link' : 'LEA Application Link'}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      readOnly
                      value={createApplicationLink}
                      className="text-sm bg-muted/40 cursor-default"
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className={`shrink-0 transition-colors ${copiedCreateLink ? 'border-green-500/50 text-green-500' : ''}`}
                      onClick={handleCopyCreateLink}
                    >
                      {copiedCreateLink ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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

