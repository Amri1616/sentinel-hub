import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CaseHeaderProps {
  id: string;
  title: string;
  companyName: string;
  status: string;
  statusColor: string;
  severity?: string;
  severityColor?: string;
  submittedDate?: string;
  backLabel: string;
  onBack: () => void;
  topBadges?: React.ReactNode;
  actions?: React.ReactNode;
  escalatedTo?: string[];
}

export default function CaseHeader({
  id,
  title,
  companyName,
  status,
  statusColor,
  severity,
  severityColor,
  submittedDate,
  backLabel,
  onBack,
  topBadges,
  actions,
  escalatedTo
}: CaseHeaderProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Navigation Line */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="h-8 pl-0 pr-2 text-[14px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> {backLabel}
        </Button>
        {escalatedTo && escalatedTo.length > 0 && (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 border-2 font-bold uppercase tracking-widest text-[10px] px-2 py-0.5">
            Escalated to {escalatedTo.length} {escalatedTo.length > 1 ? 'Agencies' : 'Agency'}
          </Badge>
        )}
        {topBadges && (
          <div className="flex items-center gap-2">
            {topBadges}
          </div>
        )}
      </div>

      {/* Main Header Content */}
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
            {id}
          </h1>
          <p className="text-muted-foreground font-medium text-[16px]">
            {title} <span className="mx-1.5 opacity-40">—</span> {companyName}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-3">
            {actions && (
              <div className="flex items-center gap-2 mr-1">
                {actions}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={cn("text-xs font-bold uppercase tracking-wider px-3 py-1 border-2", statusColor)}>
                {status}
              </Badge>
              {severity && (
                <Badge variant="outline" className={cn("text-xs font-bold uppercase tracking-wider px-3 py-1 border-2", severityColor)}>
                  {severity}
                </Badge>
              )}
            </div>
          </div>
          {submittedDate && (
            <div className="flex items-center text-[12px] font-medium text-muted-foreground/80 pr-1">
              Submitted on: {submittedDate}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
