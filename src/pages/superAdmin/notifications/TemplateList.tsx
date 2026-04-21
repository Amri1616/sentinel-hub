import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Edit2, 
  Mail, 
  Bell, 
  MessageSquare, 
  Send, 
  Copy,
  Plus,
  ArrowRight,
  MoreVertical,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const mockTemplates = [
  { id: 'TPL-EM-001', name: 'User Activation', type: 'email', trigger: 'User Creation', subject: 'Activate Your Platform Account', lastUpdated: '2026-02-28' },
  { id: 'TPL-AP-002', name: 'MFA Verification', type: 'app', trigger: 'Login', subject: 'Your Security Code', lastUpdated: '2026-03-01' },
  { id: 'TPL-EM-003', name: 'Nomination Invitation', type: 'email', trigger: 'Manual Send', subject: 'Nomination for MCMC Platform Access', lastUpdated: '2026-03-05' },
  { id: 'TPL-EM-004', name: 'Case Escalated to LEA', type: 'email', trigger: 'Status Change', subject: 'ACTION REQUIRED: Incident Escalated', lastUpdated: '2026-03-07' },
  { id: 'TPL-AP-005', name: 'New Case Assignment', type: 'app', trigger: 'Auto-Routing', subject: 'New Incident Task Assigned', lastUpdated: '2026-03-08' },
];

export default function TemplateList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = mockTemplates.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification Templates</h1>
          <p className="text-muted-foreground mt-1">Manage system messaging, email layouts, and trigger-based notifications.</p>
        </div>
        <Button onClick={() => navigate('/super-admin/notifications/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">15</div>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">In-App Notifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">9</div>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">4</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/40 overflow-hidden shadow-sm">
        <CardHeader className="bg-accent/30 py-4 border-b">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search templates by name or subject..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter by Type
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 text-[11px] uppercase tracking-wider font-bold">
                  <TableHead>Template ID</TableHead>
                  <TableHead>Template Name</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Trigger Event</TableHead>
                  <TableHead>Notification Subject</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.map((t) => (
                  <TableRow key={t.id} className="hover:bg-accent/20 transition-colors group">
                    <TableCell className="font-mono text-[10px] font-bold text-muted-foreground">{t.id}</TableCell>
                    <TableCell className="font-semibold text-sm">{t.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {t.type === 'email' ? (
                          <Badge variant="outline" className="bg-blue-500/5 text-blue-500 border-blue-500/20 gap-1.5 py-0.5">
                            <Mail className="h-3 w-3" /> Email
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-purple-500/5 text-purple-500 border-purple-500/20 gap-1.5 py-0.5">
                            <Bell className="h-3 w-3" /> In-App
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <ArrowRight className="h-3 w-3" />
                        {t.trigger}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm italic text-foreground/70 max-w-[200px] truncate">
                      "{t.subject}"
                    </TableCell>
                    <TableCell className="text-[10px] text-muted-foreground">{t.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => navigate(`/super-admin/notifications/${t.id}`)}>
                            <Edit2 className="mr-2 h-4 w-4" />
                            Edit Content
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            Send Test
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate Template
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive font-semibold">
                            Archive Template
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl flex items-start gap-4 shadow-sm">
        <CheckCircle2 className="h-5 w-5 text-blue-600 mt-1 shrink-0" />
        <div className="text-sm">
          <h3 className="font-bold text-blue-900 uppercase tracking-wider text-xs">Dynamic Messaging Ready</h3>
          <p className="text-blue-800 mt-0.5 leading-relaxed">
            All templates support dynamic variables like <span className="font-mono bg-blue-100 px-1 rounded">{"{{user_name}}"}</span>, <span className="font-mono bg-blue-100 px-1 rounded">{"{{case_id}}"}</span>, and <span className="font-mono bg-blue-100 px-1 rounded">{"{{activation_link}}"}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
