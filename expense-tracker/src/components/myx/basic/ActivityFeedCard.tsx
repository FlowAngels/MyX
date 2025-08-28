import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { ActivityItem } from '@/lib/myx/basic/types'

interface ActivityFeedCardProps {
  items: ActivityItem[];
}

export default function ActivityFeedCard({ items }: ActivityFeedCardProps) {
  const getRelativeTime = (isoString: string): string => {
    const now = new Date();
    const date = new Date(isoString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const displayItems = items.slice(0, 10);

  return (
    <Card className="p-3">
      <CardHeader className="pb-1">
        <CardTitle className="text-xs font-semibold tracking-wide text-center">ACTIVITY</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Single scrollable area - shows 3 by default, scroll to see up to 10 */}
        <div className="h-[4.5rem] overflow-y-auto space-y-2">
          {displayItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-700 truncate flex-1 mr-2">{item.merchant}</span>
              <span className="text-gray-900 font-medium">{formatCurrency(item.amount)}</span>
              <span className="text-gray-400 text-xs ml-2">{getRelativeTime(item.occurredAt)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}