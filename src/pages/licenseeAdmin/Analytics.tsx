import { Card, CardContent } from '@/components/ui/card';
import { FileText, CheckCircle2, AlertTriangle, Activity } from 'lucide-react';
import AnalyticsDashboard from '@/components/shared/AnalyticsDashboard';
import { cn } from '@/lib/utils';

export default function LicenseeAdminAnalytics() {
  const kpiCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Total Cases', value: '234', trend: '+12%', icon: FileText, color: 'text-primary' },
        { label: 'Active Cases', value: '42', trend: '-5%', icon: Activity, color: 'text-blue-600' },
        { label: 'Escalated Cases', value: '62', trend: '+8%', icon: AlertTriangle, color: 'text-destructive', extra: '26.5% rate' },
        { label: 'Closed Cases', value: '130', trend: '+15%', icon: CheckCircle2, color: 'text-green-600' },
      ].map((kpi, i) => (
        <Card key={i} className="border-border shadow-sm hover:shadow-md transition-shadow bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", kpi.color.replace('text-', 'bg-').split(' ')[0] + '/10')}>
                <kpi.icon className={cn("h-5 w-5", kpi.color)} />
              </div>
              <span className={cn("text-xs font-bold px-2 py-1 rounded-full", kpi.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                {kpi.trend}
              </span>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest mb-1">{kpi.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold tracking-tight">{kpi.value}</p>
                {kpi.extra && <span className="text-xs font-bold text-destructive underline decoration-dotted">{kpi.extra}</span>}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <AnalyticsDashboard 
        scope="organisation" 
        userRole="admin" 
        organisationName="Global Express Logistics" 
        kpiOverview={kpiCards}
      />
    </div>
  );
}
