import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Escalation {
  name: string;
  status: string;
}

const incidents = [
  { id: 'PSIRP-2025-0020', title: 'Lost Consignment Investigation', category: 'Loss', status: 'Escalated', submitted: '2025-01-12', lastUpdated: '5 hours ago', severity: 'Critical',
    escalations: [
      { name: 'PDRM', status: 'Under Investigation' },
      { name: 'MOT', status: 'Under Investigation' },
      { name: 'CUSTOMS', status: 'Evidence Seized' }
    ]
  },
  { id: 'PSIRP-2025-0025', title: 'High-Value Package Theft', category: 'Theft', status: 'Escalated', submitted: '2025-01-15', lastUpdated: '2 hours ago', severity: 'High',
    escalations: [
      { name: 'PDRM', status: 'Under Investigation' }
    ]
  },
];

const severityColors: Record<string, string> = {
  'Low': 'bg-status-closed/20 text-status-closed border-status-closed/30 px-2.5 py-0.5 rounded-full',
  'Medium': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30 px-2.5 py-0.5 rounded-full',
  'High': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30 px-2.5 py-0.5 rounded-full',
  'Critical': 'bg-destructive/20 text-destructive border-destructive/30 px-2.5 py-0.5 rounded-full',
};

export default function ReporterEscalated() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = incidents.filter(i => 
    i.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderEscalatedTo = (escalations: Escalation[]) => {
    if (escalations.length === 0) return <span className="text-muted-foreground text-xs italic">Not Escalated</span>;
    const display = escalations.slice(0, 2);
    const remaining = escalations.length - 2;
    return (
      <div className="flex flex-wrap justify-center gap-1">
        {display.map((e, idx) => (
          <Badge key={idx} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 px-1.5 py-0 h-5 text-[10px] font-bold">
            {e.name}
          </Badge>
        ))}
        {remaining > 0 && (
          <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/20 px-1.5 py-0 h-5 text-[10px] font-bold">
            +{remaining} more
          </Badge>
        )}
      </div>
    );
  };

  const renderAgencyProgress = (escalations: Escalation[]) => {
    if (escalations.length === 0) return <span className="text-muted-foreground text-xs">-</span>;
    const statuses = escalations.map(e => e.status);
    const uniqueStatuses = Array.from(new Set(statuses));
    const isAllSame = uniqueStatuses.length === 1;
    const completedCount = escalations.filter(e => e.status.toLowerCase().includes('closed') || e.status.toLowerCase().includes('completed')).length;
    let badgeText = '';
    let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
    if (isAllSame) {
      badgeText = `All ${uniqueStatuses[0]}`;
      if (uniqueStatuses[0].toLowerCase().includes('investigation')) badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
      if (uniqueStatuses[0].toLowerCase().includes('closed')) badgeStyle = 'bg-green-50 text-green-700 border-green-200';
    } else {
      if (completedCount > 0) {
        badgeText = `${completedCount}/${escalations.length} Completed`;
        badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
      } else {
        badgeText = 'Pending Updates';
        badgeStyle = 'bg-slate-100 text-slate-600 border-slate-200 italic';
      }
    }
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <div className="flex justify-center cursor-help">
              <Badge variant="outline" className={`${badgeStyle} text-[10px] px-2 py-0.5 font-medium whitespace-nowrap`}>
                {badgeText}
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent className="p-3 bg-popover border-border shadow-xl min-w-[200px]">
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Agency Status Breakdown</p>
              {escalations.map((e, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 py-1 border-b border-border/50 last:border-0">
                  <span className="font-bold text-xs">{e.name}</span>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${e.status.toLowerCase().includes('closed') ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                    {e.status}
                  </Badge>
                </div>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Escalated Reports</h1>
        <p className="text-muted-foreground">Incident reports that have been escalated to Law Enforcement Agencies (LEA)</p>
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
                  <th className="pb-3 px-4 font-medium text-muted-foreground text-center">Escalated To</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground text-center">LEA Status</th>
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
                    <td className="py-3 px-4 text-center">
                      {renderEscalatedTo(incident.escalations)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {renderAgencyProgress(incident.escalations)}
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
