import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"/>
  </svg>
)

const FaceSmileIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.25 10.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6-1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-2.625 6a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z" clipRule="evenodd"/>
  </svg>
)

const InformationCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd"/>
  </svg>
)

const ExclamationTriangleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd"/>
  </svg>
)

const XCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd"/>
  </svg>
)

const StatusNeutralIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="9" />
    <line x1="8" y1="15" x2="16" y2="15" />
    <circle cx="9" cy="10" r="1" />
    <circle cx="15" cy="10" r="1" />
  </svg>
)

interface ContextCardProps {
  title: string;
  type: 'income' | 'committed' | 'goals';
  data: {
    value?: number;
    nextHorizon?: { label: string; value: number };
    actual?: number;
    planned?: number;
    target?: number;
    trendPct?: number;
    status: 1|2|3|4|5;
  };
}

export default function ContextCard({ title, type, data }: ContextCardProps) {
  const getStatusIcon = (status: 1|2|3|4|5) => {
    const iconClass = "w-5 h-5";
    switch (status) {
      case 5: return <CheckCircleIcon className={`${iconClass} text-green-600`} />;
      case 4: return <FaceSmileIcon className={`${iconClass} text-green-500`} />;
      case 3: return <InformationCircleIcon className={`${iconClass} text-amber-500`} />;
      case 2: return <ExclamationTriangleIcon className={`${iconClass} text-orange-500`} />;
      case 1: return <XCircleIcon className={`${iconClass} text-red-600`} />;
      default: return <StatusNeutralIcon className={`${iconClass} text-gray-400`} />;
    }
  };

  const getTrendIcon = (trendPct?: number) => {
    if (trendPct === undefined) return <div className="w-5 h-5" />;
    
    const iconClass = "w-5 h-5";
    if (trendPct > 0) {
      return (
        <svg className={`${iconClass} text-green-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="m7 14 5-5 5 5" />
        </svg>
      );
    } else if (trendPct < 0) {
      return (
        <svg className={`${iconClass} text-red-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="m7 10 5 5 5-5" />
        </svg>
      );
    } else {
      return (
        <svg className={`${iconClass} text-gray-400`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M7 12h10" />
        </svg>
      );
    }
  };

  const getPrimaryValue = () => {
    if (type === 'income') return data.value || 0;
    if (type === 'committed') return data.actual || 0;
    if (type === 'goals') return data.actual || 0;
    return 0;
  };

  const getSecondaryLine = () => {
    if (type === 'income' && data.nextHorizon) {
      return `${data.nextHorizon.label}: ${formatCurrency(data.nextHorizon.value)}`;
    }
    if (type === 'committed' && data.planned !== undefined && data.actual !== undefined) {
      return `Planned ${formatCurrency(data.planned)} / Actual ${formatCurrency(data.actual)}`;
    }
    if (type === 'goals' && data.target !== undefined && data.actual !== undefined) {
      const isOnTrack = data.actual >= data.target * 0.8; // Simple on track logic
      return isOnTrack ? 'On Track' : `Target ${formatCurrency(data.target)} / Actual ${formatCurrency(data.actual)}`;
    }
    return '—';
  };

  return (
    <Card className="p-3">
      <CardHeader className="pb-1">
        <CardTitle className="text-xs font-semibold tracking-wide text-center">{title.toUpperCase()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-600">{formatCurrency(getPrimaryValue())}</div>
          <div className="flex flex-col items-center gap-0.5 h-11">
            {getTrendIcon(data.trendPct)}
            {getStatusIcon(data.status)}
          </div>
        </div>
        <div className="mt-0.5 text-[11px] leading-4 text-gray-400">
          {getSecondaryLine()}
        </div>
      </CardContent>
    </Card>
  )
}