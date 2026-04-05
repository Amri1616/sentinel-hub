import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface TimelineEvent {
    event: string;
    actor: string;
    time: string;
    type: 'submission' | 'system' | 'rfi' | 'response' | 'update' | 'escalation';
}

const dotColorMap: Record<string, string> = {
    submission: 'bg-primary',
    system: 'bg-muted-foreground',
    rfi: 'bg-status-rfi',
    response: 'bg-status-closed',
    update: 'bg-status-in-review',
    escalation: 'bg-destructive',
};

interface CaseTimelineProps {
    events: TimelineEvent[];
}

export default function CaseTimeline({ events }: CaseTimelineProps) {
    const sortedEvents = [...events].reverse();

    return (
        <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/50 py-4 border-b border-border/40">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        Case History & Timeline
                    </CardTitle>
                    <Badge variant="outline" className="bg-background/50 text-[10px] uppercase font-bold tracking-widest text-muted-foreground border-border/60">
                        Reverse Chronological
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-8 px-6">
                <div className="relative">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-[7.25rem] top-2 bottom-6 w-0.5 bg-gradient-to-b from-primary/60 via-border to-transparent" />

                    <div className="space-y-0">
                        {sortedEvents.map((item, index) => (
                            <div key={index} className="flex gap-8 pb-10 last:pb-2 group relative">
                                {/* Time Column */}
                                <div className="w-24 pt-0.5 text-right shrink-0">
                                    <p className="text-[12px] font-bold text-foreground font-mono leading-tight whitespace-nowrap">
                                        {item.time.includes(' ') ? item.time.split(' ')[1] : item.time}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight mt-0.5">
                                        {item.time.includes(' ') ? item.time.split(' ')[0] : ''}
                                    </p>
                                </div>

                                {/* Marker Dot */}
                                <div className="relative z-10 flex flex-col items-center shrink-0">
                                    <div className={`h-4 w-4 rounded-full border-4 border-background shadow-md transition-all duration-300 group-hover:scale-125 group-hover:ring-4 group-hover:ring-primary/10 ${dotColorMap[item.type] || 'bg-primary'}`} />
                                    {index === 0 && (
                                        <div className="absolute -top-7 text-[9px] font-bold text-primary uppercase tracking-widest animate-pulse whitespace-nowrap bg-primary/5 px-2 py-0.5 rounded-full border border-primary/20">
                                            Latest Activity
                                        </div>
                                    )}
                                </div>

                                {/* Event Details */}
                                <div className="flex-1 -mt-1.5 min-w-0">
                                    <div className="bg-muted/30 p-4 rounded-xl border border-border/40 group-hover:bg-muted/50 transition-colors shadow-sm">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                                            <h4 className="text-sm font-bold text-foreground leading-snug truncate pr-2">
                                                {item.event}
                                            </h4>
                                            <Badge variant="secondary" className="text-[9px] h-5 px-2 uppercase tracking-wider font-bold bg-muted-foreground/10 text-muted-foreground border-none shrink-0 w-fit">
                                                {item.type}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px] uppercase">
                                                {item.actor.charAt(0)}
                                            </div>
                                            <p className="text-xs text-muted-foreground font-medium truncate">
                                                Action taken by <span className="text-foreground/80 font-bold">{item.actor}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
