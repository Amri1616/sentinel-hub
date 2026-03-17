import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const usersData = [
  { id: 1, name: 'Ahmad bin Abdullah', email: 'ahmad.abdullah@expresscourier.com', phone: '+60 12-345 6789', role: 'Reporter', status: 'Active', submissions: 14, draftDate: '2025-02-18', hasDraft: true },
  { id: 2, name: 'Mastura binti Hassan', email: 'mastura.hassan@expresscourier.com', phone: '+60 13-456 7890', role: 'Reporter', status: 'Active', submissions: 11, draftDate: '2025-02-20', hasDraft: true },
  { id: 3, name: 'Kamal Hassan', email: 'kamal.hassan@expresscourier.com', phone: '+60 14-567 8901', role: 'Reporter', status: 'Active', submissions: 9, draftDate: null, hasDraft: false },
  { id: 4, name: 'Fatimah Zahra', email: 'fatimah.zahra@expresscourier.com', phone: '+60 15-678 9012', role: 'Reporter', status: 'Active', submissions: 8, draftDate: '2025-02-15', hasDraft: true },
  { id: 5, name: 'Azman Ali', email: 'azman.ali@expresscourier.com', phone: '+60 16-789 0123', role: 'Reporter', status: 'Inactive', submissions: 5, draftDate: null, hasDraft: false },
];

export default function LicenseeAdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = usersData.filter(u => {
    return u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
                  <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Phone Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Submissions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <span className="font-medium">{user.name}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{user.phone}</td>
                    <td className="px-4 py-4 text-sm font-medium">{user.submissions}</td>
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
