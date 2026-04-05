import { Card, CardContent } from '@/components/ui/card';
import { FileBarChart, PieChart as PieIcon, BarChart3 as BarIcon } from 'lucide-react';
import AnalyticsDashboard from '@/components/shared/AnalyticsDashboard';

export default function LEAAnalytics() {
  const kpiCards = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { label: 'Total Cases', value: '137', icon: BarIcon },
        { label: 'Organisations', value: '12', icon: PieIcon },
        { label: 'Closed This Month', value: '30', icon: FileBarChart },
      ].map((kpi) => (
        <Card key={kpi.label} className="border-border shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <kpi.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{kpi.value}</p>
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
        scope="escalated" 
        userRole="agency" 
        kpiOverview={kpiCards}
      />
    </div>
  );
}
