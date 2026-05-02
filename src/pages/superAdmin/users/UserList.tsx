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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MoreVertical, 
  UserPlus, 
  ShieldCheck, 
  Mail, 
  Key,
  Trash2,
  FileText,
  UserX,
  UserCheck,
  History
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RoleChip } from '@/components/RoleChip';
import { Role } from '@/lib/auth';
import { toast } from 'sonner';

// Filtered mock data to only include MCMC internal users
const mockInternalUsers = [
  { 
    id: '1', 
    name: 'Ahmad Faiz', 
    email: 'afaiz@mcmc.gov.my', 
    role: 'super-admin' as Role, 
    userType: 'System Administrator',
    status: 'active', 
    lastLogin: '2026-04-30 09:30' 
  },
  { 
    id: '2', 
    name: 'Siti Aminah', 
    email: 'siti@mcmc.gov.my', 
    role: 'reviewer' as Role, 
    userType: 'Case Officer (Standard)',
    status: 'active', 
    lastLogin: '2026-04-30 08:45' 
  },
  { 
    id: '3', 
    name: 'Zulhairi Abdullah', 
    email: 'zulhairi@mcmc.gov.my', 
    role: 'validator' as Role, 
    userType: 'Supervisor',
    status: 'active', 
    lastLogin: '2026-04-29 14:20' 
  },
  { 
    id: '4', 
    name: 'Sarah Tan', 
    email: 'sarah@mcmc.gov.my', 
    role: 'investigator' as Role, 
    userType: 'Internal (View Only)',
    status: 'inactive', 
    lastLogin: '2026-04-25 11:15' 
  },
  { 
    id: '5', 
    name: 'Farhan Hakimi', 
    email: 'farhan@mcmc.gov.my', 
    role: 'reviewer' as Role, 
    userType: 'Case Officer (Cyber)',
    status: 'active', 
    lastLogin: '2026-04-30 10:15' 
  },
];

export default function UserList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="bg-slate-100 text-slate-500 border-slate-200">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredUsers = mockInternalUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleAction = (action: string, userName: string) => {
    toast.success(`${action} for ${userName} logged in audit trail.`);
  };

  return (
    <div className="space-y-6 min-h-screen bg-slate-50/30 -m-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">MCMC Internal Users</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage MCMC staff accounts, roles, and system access levels.</p>
        </div>
        <Button onClick={() => navigate('/super-admin/users/new')} className="bg-blue-600 hover:bg-blue-700 shadow-sm">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Internal User
        </Button>
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardHeader className="border-b border-slate-100 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search by name or email..." 
                className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-blue-500 h-10 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px] bg-white border-slate-200 h-10 text-sm">
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="reviewer">Case Officer</SelectItem>
                  <SelectItem value="validator">Supervisor</SelectItem>
                  <SelectItem value="investigator">Internal (View Only)</SelectItem>
                  <SelectItem value="super-admin">Superadmin</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] bg-white border-slate-200 h-10 text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-slate-500 pl-6">Name & Email</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Role</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-slate-500">User Type</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Status</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Last Login</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-slate-50/30 transition-colors border-b border-slate-100 last:border-0">
                    <TableCell className="pl-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">{user.name}</span>
                        <span className="text-xs text-slate-500">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <RoleChip role={user.role} />
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600 font-medium">{user.userType}</span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <History className="h-3 w-3" />
                        {user.lastLogin}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 rounded-full">
                            <MoreVertical className="h-4 w-4 text-slate-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 border-slate-200 shadow-lg">
                          <DropdownMenuLabel className="text-xs text-slate-400 font-bold uppercase tracking-widest px-3 py-2">Account Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => navigate(`/super-admin/users/${user.id}`)}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === 'active' ? (
                            <DropdownMenuItem className="text-amber-600" onClick={() => handleAction("Deactivated", user.name)}>
                              <UserX className="mr-2 h-4 w-4" />
                              Deactivate Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-emerald-600" onClick={() => handleAction("Activated", user.name)}>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Activate Account
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-rose-600" onClick={() => handleAction("Deleted", user.name)}>
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
                  <TableCell colSpan={6} className="h-40 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="h-8 w-8 opacity-20" />
                      <p>No internal MCMC users found matching your search.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
        <p>Total MCMC Staff: <span className="font-bold text-slate-900">{filteredUsers.length}</span></p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 px-3 border-slate-200" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="h-8 px-3 border-slate-200" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}
