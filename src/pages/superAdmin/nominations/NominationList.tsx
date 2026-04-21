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
  Send, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Link as LinkIcon,
  RefreshCw,
  Mail,
  Copy,
  Eye,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const mockNominations = [
  { id: 'NOM-2026-001', organisation: 'Ninja Van Malaysia', contactPerson: 'Ariff Kamal', email: 'ariff@ninjavan.co', status: 'sent', sentDate: '2026-03-05', expiryDate: '2026-03-19', type: 'Licensee Admin' },
  { id: 'NOM-2026-002', organisation: 'Flash Express', contactPerson: 'Winnie Tan', email: 'winnie.tan@flash.my', status: 'pending_submission', sentDate: '2026-03-04', expiryDate: '2026-03-18', type: 'Licensee Admin' },
  { id: 'NOM-2026-003', organisation: 'J&T Express', contactPerson: 'Kenny Lim', email: 'kenny@jtexpress.my', status: 'submitted', sentDate: '2026-03-01', expiryDate: '2026-03-15', type: 'Licensee Admin' },
  { id: 'NOM-2026-004', organisation: 'DHL eCommerce', contactPerson: 'Sarah Wilson', email: 'sarah.w@dhl.com', status: 'approved', sentDate: '2026-02-25', expiryDate: '2026-03-11', type: 'Licensee Admin' },
  { id: 'NOM-2026-005', organisation: 'GDEX', contactPerson: 'Ahmad Nizam', email: 'nizam@gdexpress.com', status: 'expired', sentDate: '2026-02-15', expiryDate: '2026-03-01', type: 'Licensee Admin' },
  { id: 'NOM-2026-006', organisation: 'City-Link Express', contactPerson: 'Tan Mei Ling', email: 'meiling@citylinkexpress.com', status: 'rejected', sentDate: '2026-02-20', expiryDate: '2026-03-06', type: 'Licensee Admin' },
];

export default function NominationList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Sent</Badge>;
      case 'pending_submission':
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pending Submission</Badge>;
      case 'submitted':
        return <Badge className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20">Submitted</Badge>;
      case 'approved':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Rejected</Badge>;
      case 'expired':
        return <Badge variant="secondary">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredNominations = mockNominations.filter(nom => 
    nom.organisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nom.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nom.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nomination Management</h1>
          <p className="text-muted-foreground mt-1">Invitation and onboarding of Licensee Administrators.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/super-admin/nominations/templates')}>
            Manage Templates
          </Button>
          <Button onClick={() => navigate('/super-admin/nominations/new')}>
            <Plus className="mr-2 h-4 w-4" />
            New Invitation
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-primary/5 border-primary/20 shadow-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Links</p>
              <LinkIcon className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">42</div>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/5 border-amber-500/20 shadow-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pending Submissions</p>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">18</div>
          </CardContent>
        </Card>
        <Card className="bg-indigo-500/5 border-indigo-500/20 shadow-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">To Review</p>
              <Eye className="h-4 w-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/5 border-green-500/20 shadow-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Approved (MTD)</p>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">34</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/40 overflow-hidden shadow-sm">
        <CardHeader className="bg-accent/30 py-4 border-b">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by organisation, contact person, or ID..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Nomination ID</TableHead>
                  <TableHead>Organisation</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNominations.length > 0 ? (
                  filteredNominations.map((nom) => (
                    <TableRow key={nom.id} className="hover:bg-accent/20 transition-colors">
                      <TableCell className="font-mono text-xs font-semibold">{nom.id}</TableCell>
                      <TableCell className="font-medium">{nom.organisation}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{nom.contactPerson}</span>
                          <span className="text-[10px] text-muted-foreground uppercase">{nom.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(nom.status)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{nom.sentDate}</TableCell>
                      <TableCell className="text-xs text-muted-foreground font-medium">
                        <span className={cn(
                          nom.status === 'expired' ? "text-destructive" : "text-foreground"
                        )}>
                          {nom.expiryDate}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => navigate(`/super-admin/nominations/${nom.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Submission
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Resend Invitation
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Magic Link
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <LinkIcon className="mr-2 h-4 w-4" />
                              Extend Expiry
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Invitation
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                      No nominations found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center gap-4 text-xs bg-accent/30 p-4 rounded-lg border border-primary/10">
        <Mail className="h-4 w-4 text-primary shrink-0" />
        <p className="text-muted-foreground italic">
          Tip: Automated follow-up emails are sent 48 hours before a nomination link expires. 
          You can adjust this in <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate('/super-admin/notifications')}>Notification Templates</span>.
        </p>
      </div>
    </div>
  );
}
