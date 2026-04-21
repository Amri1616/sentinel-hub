import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Megaphone, Pin, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type TargetAudience = 'reporter-only' | 'licensee-admin-only' | 'both' | 'all-users';

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  pinned: boolean;
  createdAt: string;
  author: string;
  expiryDate: string;
  target: string[];
  targetAudience: TargetAudience;
}

const audienceToTarget = (audience: TargetAudience): string[] => {
  switch (audience) {
    case 'reporter-only': return ['reporter'];
    case 'licensee-admin-only': return ['licensee-admin'];
    case 'both': return ['licensee-admin', 'reporter'];
    case 'all-users': return ['licensee-admin', 'reporter', 'all-users'];
  }
};

const targetToAudience = (target: string[]): TargetAudience => {
  if (target.includes('all-users')) return 'all-users';
  const hasReporter = target.includes('reporter');
  const hasAdmin = target.includes('licensee-admin');
  if (hasReporter && hasAdmin) return 'both';
  if (hasAdmin) return 'licensee-admin-only';
  return 'reporter-only';
};

const initialAnnouncements: Announcement[] = [
  { id: '1', title: 'New SOP for Critical Case Escalation', content: 'All critical severity cases must now be escalated within 24 hours of receipt. Updated guidelines are available in the knowledge base.', priority: 'high', pinned: true, createdAt: '2025-01-18', expiryDate: '2026-05-15', author: 'CO-2024-015', target: ['licensee-admin', 'reporter'], targetAudience: 'both' },
  { id: '2', title: 'System Maintenance — 25 Jan 2025', content: 'Scheduled maintenance window from 02:00 to 06:00 MYT. The portal will be unavailable during this period.', priority: 'medium', pinned: true, createdAt: '2025-01-17', expiryDate: '2026-04-25', author: 'CO-2024-015', target: ['licensee-admin', 'reporter', 'all-users'], targetAudience: 'all-users' },
  { id: '3', title: 'Q4 2024 Incident Report Published', content: 'The quarterly incident summary for all licensees has been published. Case officers are encouraged to review trends.', priority: 'low', pinned: false, createdAt: '2025-01-15', expiryDate: '2026-06-30', author: 'CO-2024-015', target: ['licensee-admin'], targetAudience: 'licensee-admin-only' },
  { id: '4', title: 'Training: Advanced Case Assessment Techniques', content: 'Mandatory training session on 28 Jan 2025 at 10:00 MYT. All case officers must attend via the internal training portal.', priority: 'medium', pinned: false, createdAt: '2025-01-14', expiryDate: '2026-04-23', author: 'CO-2024-015', target: ['reporter'], targetAudience: 'reporter-only' },
];

export default function CaseOfficerAnnouncements() {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', content: '', priority: 'medium' as 'high' | 'medium' | 'low', pinned: false, expiryDate: '', target: ['licensee-admin', 'reporter'] as string[], targetAudience: 'both' as TargetAudience });

  const getDaysRemaining = (expiryDate: string) => {
    const remainingDays = Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return remainingDays;
  };

  const getPriorityStyle = (p: string) => {
    const styles: Record<string, string> = {
      high: 'border-destructive/30 bg-destructive/5',
      medium: 'border-status-rfi/30 bg-status-rfi/5',
      low: 'border-border',
    };
    return styles[p] || 'border-border';
  };

  const getPriorityBadge = (p: string) => {
    const styles: Record<string, string> = {
      high: 'bg-destructive/20 text-destructive border-destructive/30',
      medium: 'bg-status-rfi/20 text-status-rfi border-status-rfi/30',
      low: 'bg-muted text-muted-foreground border-border',
    };
    return styles[p] || '';
  };

  const openNew = () => {
    setEditingId(null);
    setForm({ title: '', content: '', priority: 'medium', pinned: false, expiryDate: '', target: ['licensee-admin', 'reporter'], targetAudience: 'both' });
    setDialogOpen(true);
  };

  const openEdit = (a: Announcement) => {
    setEditingId(a.id);
    setForm({ title: a.title, content: a.content, priority: a.priority, pinned: a.pinned, expiryDate: a.expiryDate || '', target: a.target, targetAudience: a.targetAudience ?? targetToAudience(a.target) });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast({ title: 'Missing Fields', description: 'Please fill in title and content.', variant: 'destructive' });
      return;
    }
    if (!form.expiryDate) {
      toast({ title: 'Missing Expiry Date', description: 'Please set an expiry deadline reminder for this announcement.', variant: 'destructive' });
      return;
    }

    if (editingId) {
      setAnnouncements(prev => prev.map(a => a.id === editingId ? { ...a, ...form } : a));
      toast({ title: 'Announcement Updated', description: 'The announcement has been updated successfully.' });
    } else {
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        ...form,
        createdAt: new Date().toISOString().split('T')[0],
        author: 'CO-2024-015',
      };
      setAnnouncements(prev => [newAnnouncement, ...prev]);
      toast({ title: 'Announcement Posted', description: 'The announcement is now visible to Licensee Admins and Reporters.' });
    }

    const remainingDays = Math.ceil((new Date(form.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (remainingDays <= 3) {
      toast({ title: 'Expiry Reminder', description: `This announcement expires in ${Math.max(remainingDays, 0)} day(s).` });
    }

    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    toast({ title: 'Announcement Deleted', description: 'The announcement has been removed.' });
  };

  const togglePin = (id: string) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Post Announcement</h1>
          <p className="text-muted-foreground">Manage announcements visible to Licensee Admins and Reporters</p>
        </div>
        <Button onClick={openNew} className="glow-blue">
          <Plus className="mr-2 h-4 w-4" /> New Announcement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold text-role-reviewer">{announcements.length}</p>
            <p className="text-sm text-muted-foreground">Total Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold text-destructive">{announcements.filter(a => a.priority === 'high').length}</p>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold text-primary">{announcements.filter(a => a.pinned).length}</p>
            <p className="text-sm text-muted-foreground">Pinned</p>
          </CardContent>
        </Card>
      </div>

      {/* Announcement List */}
      <div className="space-y-4">
        {announcements.map(a => (
          <Card key={a.id} className={getPriorityStyle(a.priority)}>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {a.pinned && <Pin className="h-3.5 w-3.5 text-role-reviewer" />}
                    <h3 className="font-semibold">{a.title}</h3>
                    <Badge variant="outline" className={getPriorityBadge(a.priority)}>{a.priority}</Badge>
                    {a.target.map(t => (
                      <Badge key={t} variant="outline" className="text-xs bg-muted/50">
                        <Eye className="h-3 w-3 mr-1" />
                        {t === 'licensee-admin' ? 'Licensee Admin' : t === 'reporter' ? 'Reporter' : 'All Users'}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{a.content}</p>
                  <p className="text-xs text-muted-foreground">Posted: {a.createdAt} by {a.author}</p>
                  <p className="text-xs text-muted-foreground">
                    Expires: {a.expiryDate} ({getDaysRemaining(a.expiryDate) < 0 ? `${Math.abs(getDaysRemaining(a.expiryDate))} day(s) overdue` : `${getDaysRemaining(a.expiryDate)} day(s) remaining`})
                  </p>
                  {getDaysRemaining(a.expiryDate) <= 3 && (
                    <Badge variant="outline" className="border-amber-400/40 bg-amber-50 text-amber-700 text-[10px]">
                      {getDaysRemaining(a.expiryDate) < 0 ? 'Expiry overdue' : 'Expiry deadline approaching'}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => togglePin(a.id)} title={a.pinned ? 'Unpin' : 'Pin'}>
                    <Pin className={`h-4 w-4 ${a.pinned ? 'text-role-reviewer' : 'text-muted-foreground'}`} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(a)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(a.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Announcement' : 'New Announcement'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Title</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Announcement title" />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Write your announcement..." rows={4} />
            </div>
            <div>
              <Label>Visible To</Label>
              <Select value={form.targetAudience} onValueChange={(v: string) => setForm(f => ({ ...f, targetAudience: v as TargetAudience, target: audienceToTarget(v as TargetAudience) }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="reporter-only">Reporter only</SelectItem>
                  <SelectItem value="licensee-admin-only">Licensee Admin only</SelectItem>
                  <SelectItem value="both">Both (Reporter & Licensee Admin)</SelectItem>
                  <SelectItem value="all-users">All Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select value={form.priority} onValueChange={v => setForm(f => ({ ...f, priority: v as any }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Expiry Deadline Reminder</Label>
              <Input type="date" value={form.expiryDate} onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="pinCheck" checked={form.pinned} onChange={e => setForm(f => ({ ...f, pinned: e.target.checked }))} className="rounded border-border" />
              <Label htmlFor="pinCheck" className="text-sm">Pin this announcement</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>
              <Megaphone className="h-4 w-4 mr-2" /> {editingId ? 'Update' : 'Post'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
