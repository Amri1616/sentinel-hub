import { FileText, MessageSquare, Clock, Eye, Inbox, ArrowUpRight, ShieldAlert, Megaphone, Users, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function ReviewerDashboard() {
  const navigate = useNavigate();

  const priorityIncidents = [
    { 
      id: 'PSIRP-2025-0028', 
      title: 'Critical Security Breach', 
      licensee: 'Global Express Logistics Sdn Bhd', 
      severity: 'Critical', 
      status: 'Pending Review',
      timestamp: '2026-04-10T10:30:00',
      isRead: false
    },
    { 
      id: 'PSIRP-2025-0027', 
      title: 'High-Value Theft Investigation', 
      licensee: 'Swift Logistics Sdn Bhd', 
      severity: 'High', 
      status: 'Pending Review',
      timestamp: '2026-04-10T09:15:00',
      isRead: false
    },
    { 
      id: 'PSIRP-2025-0026', 
      title: 'Package Tampering Report', 
      licensee: 'Global Express Logistics Sdn Bhd', 
      severity: 'High', 
      status: 'RFI Sent',
      timestamp: '2026-04-09T14:20:00',
      isRead: true
    },
    { 
      id: 'PSIRP-2025-0024', 
      title: 'Fraud Attempt Documentation', 
      licensee: 'Global Express Logistics Sdn Bhd', 
      severity: 'High', 
      status: 'RFI Sent',
      timestamp: '2026-04-08T11:00:00',
      isRead: true
    },
  ];

  const sortedIncidents = [...priorityIncidents].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const formatTimestamp = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return `${date.toLocaleDateString('en-GB')} | ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`;
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
        <Card className="border-role-reviewer/20 hover:border-role-reviewer/40 transition-all cursor-pointer min-h-[120px] flex flex-col" onClick={() => navigate('/case-officer/assigned-cases')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Cases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
            <div className="text-2xl font-bold text-role-reviewer">15</div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 hover:border-destructive/40 transition-all cursor-pointer min-h-[120px] flex flex-col" onClick={() => navigate('/case-officer/high-severity')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Severity</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
            <div className="text-2xl font-bold text-destructive">5</div>
          </CardContent>
        </Card>

        <Card className="border-status-rfi/20 hover:border-status-rfi/40 transition-all cursor-pointer min-h-[120px] flex flex-col" onClick={() => navigate('/case-officer/escalation-pending')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalation Pending</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
            <div className="text-2xl font-bold text-status-rfi">2</div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-all cursor-pointer min-h-[120px] flex flex-col" onClick={() => navigate('/case-officer/clarification-pending')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clarification Pending</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 flex items-end">
            <div className="text-2xl font-bold text-primary">6</div>
          </CardContent>
        </Card>

        {/* Priority Alerts Stat Card */}
        <Card className="border-destructive/40 bg-destructive/5 hover:border-destructive/60 transition-all cursor-pointer group min-h-[120px] flex flex-col" onClick={() => navigate('/case-officer/priority-alerts')}>
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
      <Button onClick={() => navigate('/case-officer/all-cases')} size="lg" className="w-full h-auto py-5 text-lg glow-blue">
        <Users className="mr-3 h-6 w-6" />
        Go to Case Monitoring
      </Button>

      <div className="flex flex-col gap-6">
        {/* Recent Assigned */}
        <Card>
          <CardHeader><CardTitle>Recent Assigned Cases</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sortedIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border border-border hover:border-role-reviewer/40 transition-all cursor-pointer",
                    !incident.isRead && "bg-blue-50/30 border-blue-100 shadow-sm"
                  )}
                  onClick={() => navigate(`/case-officer/cases/${incident.id}`)}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {!incident.isRead && (
                        <Circle className="h-2 w-2 fill-[#044cd0] text-[#044cd0]" />
                      )}
                      <span className={cn(
                        "font-mono text-sm",
                        incident.isRead ? "text-role-reviewer" : "text-[#044cd0] font-bold"
                      )}>
                        {incident.id}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          incident.isRead 
                            ? getSeverityColor(incident.severity) 
                            : "bg-gray-100/50 text-gray-400 border-dashed border-gray-300"
                        )}
                      >
                        {incident.isRead ? incident.severity : 'Not Set'}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          incident.isRead 
                            ? getStatusColor(incident.status) 
                            : "bg-gray-100/50 text-gray-400 border-dashed border-gray-300"
                        )}
                      >
                        {incident.isRead ? incident.status : 'Pending Assessment'}
                      </Badge>
                    </div>
                    <p className={cn(
                      "text-sm",
                      !incident.isRead ? "font-bold text-gray-900" : "font-medium text-gray-700"
                    )}>
                      {incident.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{incident.licensee}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatTimestamp(incident.timestamp)}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className={cn(!incident.isRead && "border-blue-200 text-[#044cd0] hover:bg-blue-50")}>
                    <Eye className="mr-2 h-4 w-4" />
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
