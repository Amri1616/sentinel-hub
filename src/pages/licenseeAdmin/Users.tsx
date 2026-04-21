import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Eye, Pencil, Power } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const usersData = [
  { id: 1, name: 'Ahmad bin Abdullah', email: 'ahmad.abdullah@expresscourier.com', phone: '+60 12-345 6789', role: 'Reporter', status: 'Active', submissions: 14, draftDate: '2025-02-18', hasDraft: true },
  { id: 2, name: 'Mastura binti Hassan', email: 'mastura.hassan@expresscourier.com', phone: '+60 13-456 7890', role: 'Reporter', status: 'Active', submissions: 11, draftDate: '2025-02-20', hasDraft: true },
  { id: 3, name: 'Kamal Hassan', email: 'kamal.hassan@expresscourier.com', phone: '+60 14-567 8901', role: 'Reporter', status: 'Active', submissions: 9, draftDate: null, hasDraft: false },
  { id: 4, name: 'Fatimah Zahra', email: 'fatimah.zahra@expresscourier.com', phone: '+60 15-678 9012', role: 'Reporter', status: 'Active', submissions: 8, draftDate: '2025-02-15', hasDraft: true },
  { id: 5, name: 'Azman Ali', email: 'azman.ali@expresscourier.com', phone: '+60 16-789 0123', role: 'Reporter', status: 'Inactive', submissions: 5, draftDate: null, hasDraft: false },
];

export default function LicenseeAdminUsers() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(usersData);

  const filtered = users.filter(u => {
    return u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleStatus = (id: number) => {
    setUsers((prev) => prev.map((u) => {
      if (u.id !== id) return u;
      const nextStatus = u.status === 'Active' ? 'Inactive' : 'Active';
      toast({ title: `Reporter ${nextStatus}`, description: `${u.name} is now ${nextStatus.toLowerCase()}.` });
      return { ...u, status: nextStatus };
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Reporter Management</h1>
        <p className="text-muted-foreground">Manage reporters in your organisation</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or email..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-center text-sm font-medium">Name</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Email</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Phone Number</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Submissions</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4 text-center align-middle">
                      <span className="font-medium">{user.name}</span>
                    </td>
                    <td className="px-4 py-4 text-center align-middle text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-4 text-center align-middle text-sm text-muted-foreground">{user.phone}</td>
                    <td className="px-4 py-4 text-center align-middle text-sm font-medium">{user.submissions}</td>
                    <td className="px-4 py-4 text-center align-middle">
                      <Badge variant="outline" className={user.status === 'Active' ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-slate-300 bg-slate-50 text-slate-700'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-center align-middle">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" title="View" onClick={() => toast({ title: 'View Reporter', description: `Opened reporter profile for ${user.name}.` })}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Edit" onClick={() => toast({ title: 'Edit Reporter', description: `Editing profile for ${user.name}.` })}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title={user.status === 'Active' ? 'Deactivate' : 'Activate'} onClick={() => toggleStatus(user.id)}>
                          <Power className={`h-4 w-4 ${user.status === 'Active' ? 'text-destructive' : 'text-emerald-600'}`} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
