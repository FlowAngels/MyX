import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

interface AvailableToSpendHeroProps {
  value: number;
}

export default function AvailableToSpendHero({ value }: AvailableToSpendHeroProps) {
  return (
    <Card className="p-3">
      <CardHeader className="pb-1">
        <CardTitle className="text-xs font-semibold tracking-wide text-center">AVAILABLE TO SPEND</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-gray-600">{formatCurrency(value)}</div>
        </div>
      </CardContent>
    </Card>
  )
}