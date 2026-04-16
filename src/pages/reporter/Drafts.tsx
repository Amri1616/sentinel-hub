import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, Search, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function ReporterDrafts() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const [drafts, setDrafts] = useState([
    { id: 'draft-1', title: 'Theft of High-Value Package', category: 'Theft', updated: '2 hours ago', daysLeft: 5 },
    { id: 'draft-2', title: 'Tampered Shipment', category: 'Tampering', updated: '1 day ago', daysLeft: 3 },
    { id: 'draft-3', title: 'Lost Consignment', category: 'Loss', updated: '3 days ago', daysLeft: 1 },
  ]);

  const filteredDrafts = drafts.filter(draft => 
    draft.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    draft.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setDrafts(drafts.filter(d => d.id !== id));
    toast({
      title: 'Draft Deleted',
      description: 'The draft has been permanently removed.',
      variant: 'destructive',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Drafts</h1>
        <p className="text-muted-foreground">Manage your incomplete incident reports</p>
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
              placeholder="Search drafts by title or category..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full overflow-hidden border">
        <CardContent className="p-0">
          <div className="relative group w-full overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="table-auto w-full text-sm">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground">Title</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground">Category</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground">Last Updated</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground">Days Remaining</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                {filteredDrafts.length > 0 ? (
                  filteredDrafts.map((draft) => (
                    <tr key={draft.id} className="hover:bg-accent/30 transition-colors border-b">
                      <td className="px-3 py-4 text-center align-middle text-sm font-medium">{draft.title}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{draft.category}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{draft.updated}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge 
                            variant="outline" 
                            className={
                              draft.daysLeft <= 2
                                ? 'bg-destructive/15 text-destructive border-destructive/30'
                                : draft.daysLeft <= 4
                                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                                  : 'bg-primary/15 text-primary border-primary/30'
                            }
                          >
                            {draft.daysLeft} {draft.daysLeft === 1 ? 'day' : 'days'} left
                          </Badge>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex items-center justify-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => navigate('/licensee-reporter/incidents/new')}>
                            Continue <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(draft.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No drafts found matching your search.
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
