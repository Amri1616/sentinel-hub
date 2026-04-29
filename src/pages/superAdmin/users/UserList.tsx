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

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.organisation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (action: string, userName: string) => {
    toast.success(`${action} for ${userName} completed successfully.`);
  };

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

      <Card className="border-border/40 shadow-sm overflow-hidden">
        <CardHeader className="bg-accent/30 py-4 border-b">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Status: {statusFilter === 'all' ? 'All' : statusFilter.replace('_', ' ')}
                    <ChevronDown className="ml-2 h-4 w-4" />
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
              <Button variant="outline" size="sm">Export Logs</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
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
        </CardContent>
      </Card>
    </div>
  );
}
