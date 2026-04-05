import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const incidents = [
  { id: 'PSIRP-2025-0025', title: 'High-Value Package Theft', category: 'Theft', status: 'In Review', submitted: '2025-01-15', lastUpdated: '2 hours ago', severity: 'High' },
  { id: 'PSIRP-2025-0023', title: 'Tampered Shipment Detected', category: 'Tampering', status: 'In Review', submitted: '2025-01-14', lastUpdated: '1 hour ago', severity: 'Medium' },
];

const severityColors: Record<string, string> = {
  'Low': 'bg-status-closed/20 text-status-closed border-status-closed/30 px-2.5 py-0.5 rounded-full',
  'Medium': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30 px-2.5 py-0.5 rounded-full',
  'High': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30 px-2.5 py-0.5 rounded-full',
  'Critical': 'bg-destructive/20 text-destructive border-destructive/30 px-2.5 py-0.5 rounded-full',
};

export default function ReporterUnderReview() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = incidents.filter(i => 
    i.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Under Review</h1>
        <p className="text-muted-foreground">Incident reports currently being reviewed by MCMC</p>
      </div>

      <Button 
        variant="ghost" 
        size="sm" 
        className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center"
        onClick={() => navigate('/licensee-reporter/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by reference, title, or category..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 px-4 font-medium text-muted-foreground text-center">Reference</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground text-center">Title</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground text-center">Category</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground text-center">Severity</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground text-center">Last Updated</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((incident) => (
                  <tr key={incident.id} className="hover:bg-accent/30 transition-colors">
                    <td className="py-3 px-4 text-center font-mono font-bold text-primary">{incident.id}</td>
                    <td className="py-3 px-4 text-center font-medium">{incident.title}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{incident.category}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center">
                        <Badge variant="outline" className={severityColors[incident.severity]}>{incident.severity}</Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{incident.lastUpdated}</td>
                    <td className="py-3 px-4 text-center">
                      <Button size="sm" variant="outline" onClick={() => navigate(`/licensee-reporter/incidents/${incident.id}`)}>
                        View Details
                      </Button>
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
