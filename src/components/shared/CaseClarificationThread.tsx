import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Paperclip, Send, MessageCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ClarificationMessage {
    id: number;
    from: string;
    role: 'officer' | 'reporter' | 'admin' | 'supervisor' | 'lea';
    timestamp: string;
    message: string;
    status?: string;
    isNew?: boolean;
}

export const sampleClarificationMessages: ClarificationMessage[] = [
    { id: 1, from: 'Case Officer (Ahmad Razif)', role: 'officer', message: 'Please clarify the exact location of the incident within the sorting hub. Was it near the loading dock or the automated sorting line?', timestamp: '2025-06-09 10:30', status: 'Responded' },
    { id: 2, from: 'Licensee Reporter (Ali Hassan)', role: 'reporter', message: 'The incident occurred at Sorting Line 3, specifically at the secondary scanning station before the dispatch area.', timestamp: '2025-06-09 11:15' },
    { id: 3, from: 'Licensee Admin (Sarah Wong)', role: 'admin', message: 'I have attached the access logs for Sorting Line 3 for the 02:00-04:00 shift. Please note that only  staff members were authorized in that zone.', timestamp: '2025-06-09 14:00' },
    { id: 4, from: 'MCMC Supervisor (Zulkifli Ahmad)', role: 'supervisor', message: 'Case Officer, please ensure you cross-reference these access logs with the CCTV footage from Camera 7.', timestamp: '2025-06-10 09:00', status: 'Responded' },
    { id: 5, from: 'Agency (PDRM - Commercial Crime)', role: 'lea', message: 'PDRM has received the escalation. We require the full shift roster and contact details of the staff members identified in the access logs.', timestamp: '2025-06-11 10:00' },
];

const roleStyles: Record<ClarificationMessage['role'], { border: string; bg: string; text: string; badge: string }> = {
    admin: {
        border: 'border-purple-200 dark:border-purple-900/50',
        bg: 'bg-purple-50/30 dark:bg-purple-900/10',
        text: 'text-purple-700 dark:text-purple-300',
        badge: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800'
    },
    reporter: {
        border: 'border-blue-200 dark:border-blue-900/50',
        bg: 'bg-blue-50/30 dark:bg-blue-900/10',
        text: 'text-blue-700 dark:text-blue-300',
        badge: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
    },
    officer: {
        border: 'border-green-200 dark:border-green-900/50',
        bg: 'bg-green-50/30 dark:bg-green-900/10',
        text: 'text-green-700 dark:text-green-300',
        badge: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
    },
    supervisor: {
        border: 'border-orange-200 dark:border-orange-900/50', // Light brown-ish
        bg: 'bg-orange-50/20 dark:bg-orange-900/5',
        text: 'text-orange-800 dark:text-orange-300',
        badge: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800'
    },
    lea: {
        border: 'border-amber-200 dark:border-amber-900/50',
        bg: 'bg-amber-50/30 dark:bg-amber-900/10',
        text: 'text-amber-700 dark:text-amber-300',
        badge: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800'
    },
};

interface CaseClarificationThreadProps {
    messages: ClarificationMessage[];
    replyPlaceholder?: string;
    currentRole?: string;
    isReadOnly?: boolean;
    /** CSS class for "glow" button variant, e.g. glow-cyan / glow-blue */
    glowClass?: string;
}

export default function CaseClarificationThread({
    messages,
    replyPlaceholder = 'Type your response to the clarification request...',
    glowClass = 'glow-cyan',
    isReadOnly = false,
    currentRole,
}: CaseClarificationThreadProps) {
    const [replyText, setReplyText] = useState('');

    const handleSendReply = () => {
        if (replyText.trim()) setReplyText('');
    };

    const threadMessages = messages.length > 0 ? messages : sampleClarificationMessages;
    const hasNewMessages = threadMessages.some((m) => m.isNew);

    return (
        <Card className="shadow-sm border-border/40">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg font-semibold">
                    <div className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-primary" />
                        Communication Thread
                        {hasNewMessages && (
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive" />
                            </span>
                        )}
                    </div>
                    {isReadOnly && (
                        <Badge variant="outline" className="bg-muted text-muted-foreground border-border/60 gap-1.5 px-3">
                            <Lock className="h-3.5 w-3.5" /> Read Only
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Thread history */}
                <div className="space-y-4">
                    {threadMessages.map((msg) => {
                        const style = roleStyles[msg.role] || roleStyles.lea;
                        const isMe = msg.role === currentRole;
                        return (
                            <div key={msg.id} className={cn("flex w-full", isMe ? "justify-end" : "justify-start")}>
                                <div
                                    className={cn(
                                        "p-4 border rounded-xl transition-all shadow-sm max-w-[85%]",
                                        style.border,
                                        style.bg,
                                        isMe ? "rounded-tr-none" : "rounded-tl-none"
                                    )}
                                >
                                    <div className="flex items-center justify-between mb-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className={cn("text-[10px] uppercase font-bold tracking-wider px-2 py-0 border-transparent", style.badge)}>
                                                {msg.role}
                                            </Badge>
                                            <p className={cn("text-xs font-semibold", style.text)}>
                                                {isMe ? 'You' : msg.from}
                                            </p>
                                            <span className="text-[10px] text-muted-foreground/60">•</span>
                                            <p className="text-[10px] text-muted-foreground font-medium whitespace-nowrap">
                                                {msg.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm leading-relaxed text-foreground/80">{msg.message}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Reply input */}
                {!isReadOnly ? (
                    <div className="border-t border-border pt-5 space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Post Clarification / Response</Label>
                            <Textarea
                                placeholder={replyPlaceholder}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                rows={3}
                                className="resize-none text-sm bg-card/50"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                <Paperclip className="h-4 w-4 mr-2" />
                                <span className="text-xs">Attach Evidence</span>
                            </Button>
                            <Button
                                onClick={handleSendReply}
                                disabled={!replyText.trim()}
                                size="sm"
                                className={cn("px-6 font-semibold", glowClass)}
                            >
                                <Send className="h-3.5 w-3.5 mr-2" /> Send Message
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="border-t border-border pt-5 flex items-center justify-center p-6 bg-muted/20 rounded-lg border-dashed border-2">
                        <div className="text-center space-y-2">
                            <Lock className="h-6 w-6 text-muted-foreground mx-auto opacity-50" />
                            <p className="text-sm font-medium text-muted-foreground">Strategic Oversight Mode</p>
                            <p className="text-xs text-muted-foreground/60">Internal users are restricted to read-only access for communication logs.</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

