import { Card, CardContent } from '@/components/ui/card';
import { FileBarChart, PieChart as PieIcon, BarChart3 as BarIcon, Activity, TrendingUp } from 'lucide-react';
import AnalyticsDashboard from '@/components/shared/AnalyticsDashboard';
import { cn } from '@/lib/utils';

export default function InvestigatorAnalytics() {
  const scrollToAgencyChart = () => {
    const element = document.getElementById('agency-escalations-chart');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const kpiCards = (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: 'Total Cases', value: '137', icon: BarIcon, color: 'text-primary' },
        { label: 'Organisations', value: '12', icon: PieIcon, color: 'text-blue-600' },
        { label: 'Escalated Cases', value: '25', icon: Activity, color: 'text-slate-600', interactive: true },
        { label: 'Closed This Month', value: '30', icon: FileBarChart, color: 'text-green-600' },
      ].map((kpi) => (
        <Card 
          key={kpi.label} 
          className={cn(
            "border-border shadow-sm hover:shadow-md transition-all bg-card cursor-default",
            kpi.interactive && "cursor-pointer ring-slate-400/20 hover:ring-2 border-slate-200"
          )}
          onClick={kpi.interactive ? scrollToAgencyChart : undefined}
        >
          <CardContent className="p-4 flex items-center gap-3">
            <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", kpi.color.replace('text-', 'bg-').split(' ')[0] + '/10')}>
              <kpi.icon className={cn("h-5 w-5", kpi.color)} />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold">{kpi.value}</p>
                {kpi.interactive && <TrendingUp className="h-3 w-3 text-slate-400" />}
              </div>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
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
        userRole="investigator" 
        kpiOverview={kpiCards}
      />
    </div>
  );
}