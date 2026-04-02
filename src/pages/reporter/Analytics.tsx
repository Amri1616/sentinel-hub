import { Card, CardContent } from '@/components/ui/card';
import { FileText, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import AnalyticsDashboard from '@/components/shared/AnalyticsDashboard';

export default function ReporterAnalytics() {
  const kpiCards = (
    <div className="space-y-6">
      {/* ====== Submission Overview ====== */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Submission Overview
        </h2>

        <div className="grid gap-4 grid-cols-3 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">This Year</p>
              <p className="text-3xl font-bold text-primary">18</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">This Quarter</p>
              <p className="text-3xl font-bold text-primary">7</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">This Month</p>
              <p className="text-3xl font-bold text-primary">3</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ====== KPI Summary ====== */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Total Submitted</span>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">18</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Escalated</span>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Closed</span>
              <CheckCircle2 className="h-4 w-4 text-status-closed" />
            </div>
            <div className="text-2xl font-bold">11</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Escalation Rate</span>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
            <div className="text-2xl font-bold text-destructive">
              22.2<span className="text-sm font-medium ml-1">%</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 text-right">Escalated / Total Cases</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <AnalyticsDashboard 
        scope="organisation" 
        userRole="reporter" 
        organisationName="Pos Malaysia Berhad" 
        kpiOverview={kpiCards}
      />
    </div>
  );
}
