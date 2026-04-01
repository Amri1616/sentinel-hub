import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Filter, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReviewerIncidents() {
  const navigate = useNavigate();

  const incidents = [
    { id: 'PSIRP-2025-0028', title: 'Critical Security Breach', licensee: 'Global Express Logistics Sdn Bhd', reporter: 'Ahmad bin Abdullah', status: 'Pending Review', severity: 'Critical', submitted: '2025-01-16', sla: '2h remaining' },
    { id: 'PSIRP-2025-0027', title: 'High-Value Theft Investigation', licensee: 'Swift Logistics Sdn Bhd', reporter: 'Mastura Salleh', status: 'Pending Review', severity: 'High', submitted: '2025-01-16', sla: '5h remaining' },
    { id: 'PSIRP-2025-0026', title: 'Package Tampering Report', licensee: 'Global Express Logistics Sdn Bhd', reporter: 'Kamal Hassan', status: 'RFI Sent', severity: 'High', submitted: '2025-01-15', sla: '8h remaining' },
    { id: 'PSIRP-2025-0025', title: 'Lost Consignment Claim', licensee: 'Fast Delivery Enterprise', reporter: 'Fatimah Zahra', status: 'Pending Review', severity: 'Medium', submitted: '2025-01-15', sla: '12h remaining' },
    { id: 'PSIRP-2025-0024', title: 'Fraud Attempt Documentation', licensee: 'Global Express Logistics Sdn Bhd', reporter: 'Azman Ali', status: 'RFI Sent', severity: 'High', submitted: '2025-01-15', sla: '3h remaining' },
    { id: 'PSIRP-2025-0023', title: 'Damaged Goods Report', licensee: 'Swift Logistics Sdn Bhd', reporter: 'Nurul Aisyah', status: 'Under Investigation', severity: 'Medium', submitted: '2025-01-14', sla: '24h remaining' },
    { id: 'PSIRP-2025-0022', title: 'Delayed Shipment Complaint', licensee: 'Global Express Logistics Sdn Bhd', reporter: 'Hafiz Rahman', status: 'In Review', severity: 'Low', submitted: '2025-01-14', sla: '36h remaining' },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Pending Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
      'RFI Sent': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
      'Under Investigation': 'bg-status-investigation/20 text-status-investigation border-status-investigation/30',
      'In Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
      'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30',
    };
    return colors[status] || 'bg-secondary';
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
      'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    return colors[severity] || 'bg-secondary';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/reviewer/dashboard')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Review Queue</h1>
          <p className="text-muted-foreground">Review and process incident reports</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>CSV File</DropdownMenuItem>
            <DropdownMenuItem>PDF Screen Capture</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by ID, title, or licensee..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Incident ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Licensee</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Reporter</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Severity</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">SLA</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <span className="font-mono text-sm text-primary">{incident.id}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium">{incident.title}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm">{incident.licensee}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm">{incident.reporter}</span>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-medium ${incident.sla.includes('2h') || incident.sla.includes('3h') ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {incident.sla}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/reporter/incidents/${incident.id}`)}
                      >
                        Review
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
