import { Card, CardContent } from '@/components/ui/card';
import { Clock, AlertTriangle, FileText, CheckCircle2, Activity, TrendingUp } from 'lucide-react';
import AnalyticsDashboard from '@/components/shared/AnalyticsDashboard';
import { cn } from '@/lib/utils';

export default function ReviewerAnalytics() {
  const scrollToAgencyChart = () => {
    const element = document.getElementById('agency-escalations-chart');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const kpiCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {[
        { label: 'Assigned Cases', value: '45', trend: '+5%', icon: FileText, color: 'text-primary' },
        { label: 'Pending Review', value: '18', trend: '-2%', icon: Clock, color: 'text-blue-600' },
        { label: 'SLA At Risk', value: '3', trend: '+1%', icon: AlertTriangle, color: 'text-destructive' },
        { label: 'Escalated Cases', value: '25', trend: '+4%', icon: Activity, color: 'text-slate-600', interactive: true },
        { label: 'Reviewed Cases', value: '24', trend: '+10%', icon: CheckCircle2, color: 'text-green-600' },
      ].map((kpi, i) => (
        <Card 
          key={i} 
          className={cn(
            "border-border shadow-sm hover:shadow-md transition-all bg-card",
            kpi.interactive && "cursor-pointer ring-slate-400/20 hover:ring-2 border-slate-200"
          )}
          onClick={kpi.interactive ? scrollToAgencyChart : undefined}
        >
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
                <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
                {kpi.interactive && <TrendingUp className="h-3 w-3 text-slate-400" />}
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
        scope="full" 
        userRole="reviewer" 
        kpiOverview={kpiCards}
      />
    </div>
  );
}
