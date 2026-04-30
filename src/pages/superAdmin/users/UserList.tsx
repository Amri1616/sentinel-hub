import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus, 
  UserCheck, 
  UserX, 
  Shield, 
  Mail, 
  Key,
  Trash2,
  FileText,
  Lock,
  Unlock,
  RefreshCw,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RoleChip } from '@/components/RoleChip';
import { Role } from '@/lib/auth';
import { toast } from 'sonner';

const mockUsers = [
  { id: '1', name: 'Ahmad Faiz', email: 'afaiz@mcmc.gov.my', role: 'super-admin' as Role, organisation: 'MCMC', status: 'active', mfa: true, lastLogin: '2026-03-08 09:30' },
  { id: '2', name: 'Mastura Salleh', email: 'mastura@globalexpress.com', role: 'reporter' as Role, organisation: 'Global Express Logistics', status: 'active', mfa: true, lastLogin: '2026-03-07 14:20' },
  { id: '3', name: 'John Doe', email: 'john@poslaju.com.my', role: 'licensee-admin' as Role, organisation: 'Pos Malaysia', status: 'inactive', mfa: false, lastLogin: '2026-02-28 11:15' },
  { id: '4', name: 'Siti Aminah', email: 'siti@mcmc.gov.my', role: 'reviewer' as Role, organisation: 'MCMC', status: 'active', mfa: true, lastLogin: '2026-03-08 08:45' },
  { id: '5', name: 'Lim Keng', email: 'lim@pdrm.gov.my', role: 'lea-viewer' as Role, organisation: 'PDRM', status: 'locked', mfa: true, lastLogin: '2026-03-01 16:30' },
  { id: '6', name: 'Zulhairi Abdullah', email: 'zulhairi@pos.com.my', role: 'licensee-admin' as Role, organisation: 'Pos Malaysia', status: 'pending_activation', mfa: false, lastLogin: 'N/A' },
];

export default function UserList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const userRoles = [
    { id: 'all', label: 'All Users' },
    { id: 'super-admin', label: 'Super Admin' },
    { id: 'licensee-admin', label: 'Licensee Admin' },
    { id: 'reporter', label: 'Licensee Reporter' },
    { id: 'reviewer', label: 'Case Officer' },
    { id: 'validator', label: 'MCMC Supervisor' },
    { id: 'investigator', label: 'MCMC Internal' },
    { id: 'lea-viewer', label: 'LEA Viewer' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'locked':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Locked</Badge>;
      case 'pending_activation':
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pending Activation</Badge>;
      case 'deleted':
        return <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/20">Deleted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredAndSortedUsers = mockUsers
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.organisation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      return matchesSearch && matchesStatus && matchesRole;
    })
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

  const handleAction = (action: string, userName: string) => {
    toast.success(`${action} for ${userName} completed successfully.`);
  };

  const renderTable = () => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead>User</TableHead>
            <TableHead>Organisation</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedUsers.length > 0 ? (
            filteredAndSortedUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-accent/20 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{user.organisation}</TableCell>
                <TableCell>
                  <RoleChip role={user.role} />
                </TableCell>
                <TableCell>
                  {getStatusBadge(user.status)}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {user.lastLogin}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Governance Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate(`/super-admin/users/${user.id}`)}>
                        <FileText className="mr-2 h-4 w-4" />
                        View Detailed Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("Password Reset", user.name)}>
                        <Key className="mr-2 h-4 w-4" />
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("Activation Resent", user.name)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Resend Activation Link
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("Temp Password Regenerated", user.name)}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate Temp Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.status === 'locked' ? (
                        <DropdownMenuItem onClick={() => handleAction("Account Unlocked", user.name)}>
                          <Unlock className="mr-2 h-4 w-4 text-green-500" />
                          Unlock Account
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handleAction("Account Locked", user.name)}>
                          <Lock className="mr-2 h-4 w-4 text-amber-500" />
                          Lock Account
                        </DropdownMenuItem>
                      )}
                      {user.status === 'active' ? (
                        <DropdownMenuItem className="text-amber-500" onClick={() => handleAction("Account Deactivated", user.name)}>
                          <UserX className="mr-2 h-4 w-4" />
                          Deactivate User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-500" onClick={() => handleAction("Account Activated", user.name)}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          Activate User
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleAction("User Soft Deleted", user.name)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete (Soft Delete)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                No users found.
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
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">Full governance control over system users, roles, and access states.</p>
        </div>
        <Button onClick={() => navigate('/super-admin/users/new')}>
          <UserPlus className="mr-2 h-4 w-4" />
          Create User Manually
        </Button>
      </div>

      <Tabs value={roleFilter} onValueChange={setRoleFilter} className="w-full space-y-4">
        <TabsList className="bg-muted/50 p-1 border h-11">
          {userRoles.map((role) => (
            <TabsTrigger key={role.id} value={role.id} className="px-6 h-full font-bold uppercase tracking-widest text-[10px]">{role.label}</TabsTrigger>
          ))}
        </TabsList>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search users..." 
              className="pl-10 h-11 text-sm bg-card w-full md:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-11 border-dashed">
              <Filter className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-11 border-dashed">
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>All Statuses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('active')}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>Inactive</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('locked')}>Locked</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('pending_activation')}>Pending Activation</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="h-11 border-dashed">Export Logs</Button>
          </div>
        </div>

        <TabsContent value={roleFilter} className="mt-0">
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              {renderTable()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/40">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <p>Showing <span className="font-bold text-foreground">{filteredAndSortedUsers.length}</span> results</p>
          <div className="h-4 w-px bg-border" />
          <p>Filtered by: <span className="font-bold text-primary uppercase tracking-widest text-[10px]">{roleFilter}</span></p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" disabled>Previous</Button>
          <Button variant="ghost" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}
