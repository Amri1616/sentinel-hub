import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
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
  Eye, 
  ExternalLink,
  UserCheck,
  UserX,
  Mail,
  Building2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockLicenseeUsers = [
  { id: '1', name: 'Ariff Kamal', email: 'ariff@ninjavan.co', role: 'Licensee Admin', organisation: 'Ninja Van Malaysia', status: 'active', lastLogin: '2026-05-01 09:30' },
  { id: '2', name: 'Siti Norhaliza', email: 'siti.n@ninjavan.co', role: 'Licensee Reporter', organisation: 'Ninja Van Malaysia', status: 'active', lastLogin: '2026-04-30 14:15' },
  { id: '3', name: 'Kenny Lim', email: 'kenny.l@jtexpress.my', role: 'Licensee Admin', organisation: 'J&T Express', status: 'inactive', lastLogin: '2026-03-15 11:20' },
  { id: '4', name: 'Tan Kah Boon', email: 'kb.tan@flash.com.my', role: 'Licensee Reporter', organisation: 'Flash Express', status: 'active', lastLogin: '2026-05-02 08:45' },
  { id: '5', name: 'Winnie Tan', email: 'winnie.t@gdex.com.my', role: 'Licensee Admin', organisation: 'GDEX', status: 'active', lastLogin: '2026-05-01 17:30' },
];

export default function LicenseeUserList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = mockLicenseeUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.organisation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Licensee User Management</h1>
          <p className="text-muted-foreground mt-1">Manage external licensee accounts and their system access permissions.</p>
        </div>
        <Button onClick={() => navigate('/super-admin/applications')} variant="outline" className="h-11 border-blue-200 text-blue-600 hover:bg-blue-50">
          <ExternalLink className="mr-2 h-4 w-4" />
          Go to Application Management
        </Button>
      </div>

      <Card className="border-border/40 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, email or organization..." 
                className="pl-10 h-11 bg-muted/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="h-11 border-dashed">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Organization</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Last Login</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-accent/20 transition-colors">
                    <TableCell className="font-bold text-center">{user.name}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                        <Mail className="h-3 w-3 text-blue-500" />
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={user.role.includes('Admin') ? "bg-blue-500/5 border-blue-500/20 text-blue-600 font-bold uppercase tracking-tighter text-[10px]" : "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 font-bold uppercase tracking-tighter text-[10px]"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium">{user.organisation}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {user.status === 'active' ? (
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">Active</Badge>
                      ) : (
                        <Badge className="bg-slate-500/10 text-slate-600 border-slate-500/20 hover:bg-slate-500/20 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground text-center">{user.lastLogin}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/super-admin/licensee-users/${user.id}`)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                            <UserX className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500">
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No licensee users found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/40">
        <p className="text-sm text-muted-foreground">Showing <span className="font-bold text-foreground">{filteredUsers.length}</span> licensee users</p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" disabled>Previous</Button>
          <Button variant="ghost" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}
