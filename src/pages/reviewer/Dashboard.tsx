import { useState } from 'react';
import { FileText, MessageSquare, Clock, Eye, ArrowUpRight, ShieldAlert, Users, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type CaseActionUpdate = {
  id: string;
  title: string;
  actionType: string;
  decision: string;
  summary: string;
  timestamp: string;
  requestDetails: Array<{ label: string; value: string }>;
  justification: string;
  supervisorFeedback: string;
};

export default function ReviewerDashboard() {
  const navigate = useNavigate();
  const [selectedActionUpdate, setSelectedActionUpdate] = useState<CaseActionUpdate | null>(null);

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

  const [caseActionUpdates, setCaseActionUpdates] = useState<CaseActionUpdate[]>([
    {
      id: 'PSIRP-2025-0028',
      title: 'High-Value Package Theft',
      actionType: 'Escalation Request',
      decision: 'Rejected',
      summary: 'Supervisor requested stronger evidence linkage before LEA escalation.',
      timestamp: '2026-04-10T11:20:00',
      requestDetails: [
        { label: 'Requested By', value: 'Ahmad Razif' },
        { label: 'Proposed LEA', value: 'PDRM' },
      ],
      justification: 'Escalation proposed due to recurring theft pattern and potential organised criminal involvement across multiple hubs.',
      supervisorFeedback: 'Please attach CCTV timeline mapping and cross-reference the related case IDs before resubmission.',
    },
    {
      id: 'PSIRP-2025-0027',
      title: 'Critical Security Breach',
      actionType: 'Transfer Request',
      decision: 'Approved',
      summary: 'Transfer approved to Hanis Zakaria for specialised automation analysis.',
      timestamp: '2026-04-10T10:05:00',
      requestDetails: [
        { label: 'Original Officer', value: 'Ahmad Razif' },
        { label: 'Target Officer', value: 'Hanis Zakaria (CO-2024-008)' },
      ],
      justification: 'Requesting transfer due to current high workload with 15 active critical cases. Hanis has direct expertise in sorting automation patterns found in this case.',
      supervisorFeedback: 'Approved. Transfer execution scheduled for next shift handover window.',
    },
    {
      id: 'PSIRP-2025-0026',
      title: 'Package Tampering Report',
      actionType: 'Closure Request',
      decision: 'Pending',
      summary: 'Awaiting Supervisor review. No final action yet.',
      timestamp: '2026-04-09T15:10:00',
      requestDetails: [
        { label: 'Requested By', value: 'Ahmad Razif' },
        { label: 'Current Status', value: 'Under Review' },
      ],
      justification: 'Field verification completed and no additional risk indicators were found. Requesting closure based on guideline section 4.2.',
      supervisorFeedback: 'No final instruction yet. Supervisor review is still in progress.',
    },
  ]);

  const getDecisionColor = (decision: string) => {
    const colors: Record<string, string> = {
      'Approved': 'bg-status-closed/15 text-status-closed border-status-closed/25',
      'Rejected': 'bg-destructive/10 text-destructive border-destructive/25',
      'Pending': 'bg-status-in-review/15 text-status-in-review border-status-in-review/25',
    };
    return colors[decision] || 'bg-secondary';
  };

  const getActionTypeColor = (actionType: string) => {
    const colors: Record<string, string> = {
      'Escalation Request': 'border-destructive/40 bg-destructive/5 hover:border-destructive/60 hover:bg-destructive/10',
      'Closure Request': 'border-status-closed/40 bg-status-closed/5 hover:border-status-closed/60 hover:bg-status-closed/10',
      'Transfer Request': 'border-blue-300 bg-blue-50/50 hover:border-blue-400 hover:bg-blue-50',
    };
    return colors[actionType] || 'border-border hover:border-role-reviewer/40 hover:bg-accent/30';
  };

  const getActionTypeBadgeColor = (actionType: string) => {
    const colors: Record<string, string> = {
      'Escalation Request': 'border-destructive/35 bg-destructive/10 text-destructive',
      'Closure Request': 'border-status-closed/35 bg-status-closed/10 text-status-closed',
      'Transfer Request': 'border-blue-300 bg-blue-100/60 text-blue-700',
    };
    return colors[actionType] || 'bg-muted/60 text-foreground border-border';
  };

  const getActionTypePanelColor = (actionType: string) => {
    const colors: Record<string, string> = {
      'Escalation Request': 'border-destructive/40 bg-destructive/5',
      'Closure Request': 'border-status-closed/40 bg-status-closed/5',
      'Transfer Request': 'border-blue-300 bg-blue-50/50',
    };
    return colors[actionType] || 'border-border bg-muted/20';
  };

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

  const handleMarkReviewed = () => {
    if (!selectedActionUpdate) return;

    setCaseActionUpdates((prev) =>
      prev.filter(
        (update) =>
          !(update.id === selectedActionUpdate.id && update.actionType === selectedActionUpdate.actionType)
      )
    );
    setSelectedActionUpdate(null);
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

        {/* Case Action Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Case Action Updates</CardTitle>
            <p className="text-sm text-muted-foreground">Request-level decisions from Supervisor. Click to view full reasons.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {caseActionUpdates.length === 0 && (
                <div className="rounded-lg border border-border/60 bg-muted/20 p-4 text-sm text-muted-foreground">
                  No more action updates pending review.
                </div>
              )}

              {caseActionUpdates.map((update) => (
                <div
                  key={`${update.id}-${update.actionType}`}
                  className={cn(
                    'p-4 rounded-lg border transition-all cursor-pointer',
                    getActionTypeColor(update.actionType)
                  )}
                  onClick={() => setSelectedActionUpdate(update)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-sm text-role-reviewer">{update.id}</span>
                        <Badge variant="outline" className={getActionTypeBadgeColor(update.actionType)}>
                          {update.actionType}
                        </Badge>
                        <Badge variant="outline" className={getDecisionColor(update.decision)}>
                          {update.decision}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-foreground truncate">{update.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{update.summary}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{formatTimestamp(update.timestamp)}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedActionUpdate(update);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog open={!!selectedActionUpdate} onOpenChange={(open) => { if (!open) setSelectedActionUpdate(null); }}>
          <DialogContent className="max-w-5xl">
            {selectedActionUpdate && (
              <>
                <DialogHeader className="pr-10">
                  <DialogTitle className="flex items-center justify-between gap-3 flex-wrap pr-2">
                    <div className="flex items-center gap-2">
                      <span>Action Update Preview</span>
                      <span className="text-muted-foreground">-</span>
                      <span className="font-mono text-sm text-role-reviewer">{selectedActionUpdate.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getActionTypeBadgeColor(selectedActionUpdate.actionType)}>
                        {selectedActionUpdate.actionType}
                      </Badge>
                      <Badge variant="outline" className={getDecisionColor(selectedActionUpdate.decision)}>
                        {selectedActionUpdate.decision}
                      </Badge>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className={cn('rounded-xl border p-4 md:p-5', getActionTypePanelColor(selectedActionUpdate.actionType))}>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Case</p>
                        <p className="text-base font-semibold text-foreground">{selectedActionUpdate.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Updated: {formatTimestamp(selectedActionUpdate.timestamp)}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-4">
                    <Card className="border-border/60 shadow-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Request Snapshot</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-2">
                          {selectedActionUpdate.requestDetails.map((detail) => (
                            <div key={detail.label} className="flex items-center justify-between gap-3 text-sm bg-muted/30 rounded-md border border-border/40 px-3 py-2">
                              <span className="text-muted-foreground">{detail.label}</span>
                              <span className="font-medium text-right">{detail.value}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Officer Rationale</h4>
                          <div className="p-4 rounded-lg bg-background border border-border/60 text-sm italic text-foreground/80 leading-relaxed">
                            {selectedActionUpdate.justification}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/60 shadow-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Decision Notes
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Textarea
                          value={selectedActionUpdate.supervisorFeedback}
                          readOnly
                          className="min-h-[168px] bg-background border-border/60"
                        />

                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            className="w-full"
                            onClick={() => {
                              navigate(`/case-officer/cases/${selectedActionUpdate.id}`);
                              setSelectedActionUpdate(null);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />Open Case
                          </Button>
                          <Button variant="outline" className="w-full" onClick={handleMarkReviewed}>
                            Mark Reviewed
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
