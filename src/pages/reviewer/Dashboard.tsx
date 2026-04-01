import { FileText, MessageSquare, Clock, Eye, Inbox, ArrowUpRight, ShieldAlert, Megaphone, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ReviewerDashboard() {
  const navigate = useNavigate();

  const priorityIncidents = [
    { id: 'PSIRP-2025-0028', title: 'Critical Security Breach', licensee: 'Global Express Logistics Sdn Bhd', severity: 'Critical', status: 'Pending Review' },
    { id: 'PSIRP-2025-0027', title: 'High-Value Theft Investigation', licensee: 'Swift Logistics Sdn Bhd', severity: 'High', status: 'Pending Review' },
    { id: 'PSIRP-2025-0026', title: 'Package Tampering Report', licensee: 'Global Express Logistics Sdn Bhd', severity: 'High', status: 'RFI Sent' },
    { id: 'PSIRP-2025-0024', title: 'Fraud Attempt Documentation', licensee: 'Global Express Logistics Sdn Bhd', severity: 'High', status: 'RFI Sent' },
  ];

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
      'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    return colors[severity] || 'bg-secondary';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Pending Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30',
      'RFI Sent': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
    };
    return colors[status] || 'bg-secondary';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Case Officer Dashboard</h1>
        <p className="text-muted-foreground">Personal work overview — MCMC Case Officer</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="border-role-reviewer/20 hover:border-role-reviewer/40 transition-all cursor-pointer min-h-[120px] flex flex-col" onClick={() => navigate('/reviewer/all-cases')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Cases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
            <div className="text-2xl font-bold text-role-reviewer">15</div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 hover:border-destructive/40 transition-all cursor-pointer min-h-[120px] flex flex-col" onClick={() => navigate('/reviewer/all-cases')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Severity</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
            <div className="text-2xl font-bold text-destructive">5</div>
          </CardContent>
        </Card>

        <Card className="border-status-rfi/20 hover:border-status-rfi/40 transition-all cursor-pointer min-h-[120px] flex flex-col" onClick={() => navigate('/reviewer/all-cases')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalation Pending</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
            <div className="text-2xl font-bold text-status-rfi">2</div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-all cursor-pointer min-h-[120px] flex flex-col" onClick={() => navigate('/reviewer/all-cases')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clarification Pending</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
            <div className="text-2xl font-bold text-primary">6</div>
          </CardContent>
        </Card>

        {/* Priority Alerts Stat Card */}
        <Card className="border-destructive/40 bg-destructive/5 hover:border-destructive/60 transition-all cursor-pointer group min-h-[120px] flex flex-col" onClick={() => navigate('/reviewer/all-cases')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-destructive">Priority Alerts</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
            <div className="text-2xl font-bold text-destructive">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Go to Case Monitoring */}
      <Button onClick={() => navigate('/reviewer/all-cases')} size="lg" className="w-full h-auto py-5 text-lg glow-blue">
        <Users className="mr-3 h-6 w-6" />
        Go to Case Monitoring
      </Button>

      <div className="flex flex-col gap-6">
        {/* Recent Assigned */}
        <Card>
          <CardHeader><CardTitle>Recent Assigned Cases</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {priorityIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-role-reviewer/40 transition-all cursor-pointer"
                  onClick={() => navigate(`/reviewer/cases/${incident.id}`)}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-role-reviewer">{incident.id}</span>
                      <Badge variant="outline" className={getSeverityColor(incident.severity)}>{incident.severity}</Badge>
                      <Badge variant="outline" className={getStatusColor(incident.status)}>{incident.status}</Badge>
                    </div>
                    <p className="font-medium">{incident.title}</p>
                    <p className="text-sm text-muted-foreground">{incident.licensee}</p>
                  </div>
                  <Button size="sm" variant="outline"><Eye className="mr-2 h-4 w-4" />Review</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
