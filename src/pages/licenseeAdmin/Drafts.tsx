import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowLeft, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdvancedFilterDrawer, { EMPTY_FILTERS, countActiveFilters, AdvancedFilters } from '@/components/shared/AdvancedFilterDrawer';

export default function LicenseeAdminDrafts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<AdvancedFilters>(EMPTY_FILTERS);
  const activeFilterCount = countActiveFilters(filters);

  const [drafts, setDrafts] = useState([
    { id: 'draft-1', reporter: 'Ahmad Abdullah', title: 'Theft of High-Value Package', category: 'Theft', updated: '2 hours ago', daysLeft: 5 },
    { id: 'draft-2', reporter: 'Mastura Salleh', title: 'Tampered Shipment', category: 'Tampering', updated: '1 day ago', daysLeft: 3 },
    { id: 'draft-3', reporter: 'Kamal Hassan', title: 'Lost Consignment', category: 'Loss', updated: '3 days ago', daysLeft: 1 },
  ]);

  const filteredDrafts = drafts.filter(draft =>
    draft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    draft.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    draft.reporter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Draft Reports</h1>
          <p className="text-muted-foreground">Manage incomplete incident reports across the organisation</p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center"
        onClick={() => navigate('/licensee-admin/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search drafts by title, category, or reporter..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => setIsFilterOpen(true)} className="relative">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-2 px-1.5 min-w-[1.25rem] h-5 justify-center">{activeFilterCount}</Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Reporter Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Title/Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Last Updated</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Days Remaining</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredDrafts.length > 0 ? (
                  filteredDrafts.map((draft) => (
                    <tr key={draft.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4 text-sm font-medium">{draft.reporter}</td>
                      <td className="px-4 py-4 text-sm">
                        <div className="font-medium">{draft.title}</div>
                        <div className="text-muted-foreground text-xs">{draft.category}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{draft.updated}</td>
                      <td className="px-4 py-4 text-sm">
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
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground">
                      No drafts found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AdvancedFilterDrawer
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApply={setFilters}
      />
    </div>
  );
}

