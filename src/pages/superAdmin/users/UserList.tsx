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
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RoleChip } from '@/components/RoleChip';
import { Role } from '@/lib/auth';

const mockUsers = [
  { id: '1', name: 'Ahmad Faiz', email: 'afaiz@mcmc.gov.my', role: 'super-admin' as Role, organisation: 'MCMC', status: 'active', mfa: true, lastLogin: '2026-03-08 09:30', createdDate: '2025-01-15' },
  { id: '2', name: 'Mastura Salleh', email: 'mastura@globalexpress.com', role: 'reporter' as Role, organisation: 'Global Express Logistics', status: 'active', mfa: true, lastLogin: '2026-03-07 14:20', createdDate: '2025-02-10' },
  { id: '3', name: 'John Doe', email: 'john@poslaju.com.my', role: 'licensee-admin' as Role, organisation: 'Pos Malaysia', status: 'inactive', mfa: false, lastLogin: '2026-02-28 11:15', createdDate: '2025-03-05' },
  { id: '4', name: 'Siti Aminah', email: 'siti@mcmc.gov.my', role: 'reviewer' as Role, organisation: 'MCMC', status: 'active', mfa: true, lastLogin: '2026-03-08 08:45', createdDate: '2025-01-20' },
  { id: '5', name: 'Lim Keng', email: 'lim@pdrm.gov.my', role: 'lea-viewer' as Role, organisation: 'PDRM', status: 'locked', mfa: true, lastLogin: '2026-03-01 16:30', createdDate: '2025-04-12' },
];

export default function UserList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organisation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'locked':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Locked</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage global users, roles, and access permissions across the system.</p>
        </div>
        <Button onClick={() => navigate('/super-admin/users/new')}>
          <UserPlus className="mr-2 h-4 w-4" />
          Create New User
        </Button>
      </div>

      <Card className="border-border/40 shadow-sm overflow-hidden">
        <CardHeader className="bg-accent/30 py-4 border-b">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, email, or organisation..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Organisation</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>MFA</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-accent/20 transition-colors">
                      <TableCell className="font-medium whitespace-nowrap">
                        <div className="flex flex-col">
                          <span>{user.name}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider md:hidden">{user.organisation}</span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{user.email}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <RoleChip role={user.role} className="scale-90 origin-left" />
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{user.organisation}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {getStatusBadge(user.status)}
                      </TableCell>
                      <TableCell>
                        {user.mfa ? (
                          <div className="flex items-center text-green-500">
                            <Shield className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs font-medium">On</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-muted-foreground">
                            <Shield className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">Off</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate(`/super-admin/users/${user.id}`)}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              Edit Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Key className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Resend Activation
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === 'active' ? (
                              <DropdownMenuItem className="text-amber-500">
                                <UserX className="mr-2 h-4 w-4" />
                                Deactivate Account
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-500">
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activate Account
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                      No users found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Showing {filteredUsers.length} of {mockUsers.length} users</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}
