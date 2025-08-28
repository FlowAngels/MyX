import { BasicDashboardData, Period } from './types';

export function getMockBasicDashboardData(period: Period): BasicDashboardData {
  const mockData: Record<Period, BasicDashboardData> = {
    day: {
      period: 'day',
      orgName: 'Basic',
      available: { value: 145.50 },
      income: {
        value: 85.00,
        nextHorizon: { label: 'Week', value: 650.00 },
        trendPct: 12.5,
        status: 4
      },
      committed: {
        actual: 45.50,
        planned: 50.00,
        trendPct: -5.2,
        status: 3
      },
      goals: {
        actual: 25.00,
        target: 30.00,
        trendPct: 8.3,
        status: 3
      },
      activity: [
        { merchant: 'Countdown', amount: 42.50, occurredAt: '2025-08-28T14:30:00Z' },
        { merchant: 'BP Station', amount: 85.00, occurredAt: '2025-08-28T09:15:00Z' },
        { merchant: 'Cafe Luna', amount: 16.50, occurredAt: '2025-08-27T16:45:00Z' },
        { merchant: 'Amazon', amount: 29.99, occurredAt: '2025-08-27T11:20:00Z' },
        { merchant: 'Uber', amount: 22.50, occurredAt: '2025-08-27T08:30:00Z' },
        { merchant: 'Woolworths', amount: 38.75, occurredAt: '2025-08-26T17:10:00Z' },
        { merchant: 'Netflix', amount: 19.99, occurredAt: '2025-08-26T12:00:00Z' },
        { merchant: 'Starbucks', amount: 12.50, occurredAt: '2025-08-26T07:45:00Z' },
        { merchant: 'Pak n Save', amount: 55.20, occurredAt: '2025-08-25T18:20:00Z' },
        { merchant: 'Z Energy', amount: 75.00, occurredAt: '2025-08-25T13:15:00Z' }
      ],
      lastBankSyncIso: '2025-08-28T15:00:00Z'
    },
    week: {
      period: 'week',
      orgName: 'Basic',
      available: { value: 1280.75 },
      income: {
        value: 650.00,
        nextHorizon: { label: 'Month', value: 2800.00 },
        trendPct: 8.2,
        status: 4
      },
      committed: {
        actual: 285.50,
        planned: 300.00,
        trendPct: -2.1,
        status: 3
      },
      goals: {
        actual: 150.00,
        target: 200.00,
        trendPct: 15.5,
        status: 2
      },
      activity: [
        { merchant: 'Countdown', amount: 42.50, occurredAt: '2025-08-28T14:30:00Z' },
        { merchant: 'BP Station', amount: 85.00, occurredAt: '2025-08-28T09:15:00Z' },
        { merchant: 'Cafe Luna', amount: 16.50, occurredAt: '2025-08-27T16:45:00Z' },
        { merchant: 'Amazon', amount: 29.99, occurredAt: '2025-08-27T11:20:00Z' },
        { merchant: 'Uber', amount: 22.50, occurredAt: '2025-08-27T08:30:00Z' },
        { merchant: 'Woolworths', amount: 38.75, occurredAt: '2025-08-26T17:10:00Z' },
        { merchant: 'Netflix', amount: 19.99, occurredAt: '2025-08-26T12:00:00Z' },
        { merchant: 'Starbucks', amount: 12.50, occurredAt: '2025-08-26T07:45:00Z' },
        { merchant: 'Pak n Save', amount: 55.20, occurredAt: '2025-08-25T18:20:00Z' },
        { merchant: 'Z Energy', amount: 75.00, occurredAt: '2025-08-25T13:15:00Z' }
      ],
      lastBankSyncIso: '2025-08-28T15:00:00Z'
    },
    month: {
      period: 'month',
      orgName: 'Basic',
      available: { value: 2340.25 },
      income: {
        value: 2800.00,
        nextHorizon: { label: 'Quarter', value: 8500.00 },
        trendPct: 5.8,
        status: 5
      },
      committed: {
        actual: 1250.75,
        planned: 1200.00,
        trendPct: 3.2,
        status: 2
      },
      goals: {
        actual: 650.00,
        target: 800.00,
        trendPct: 12.1,
        status: 3
      },
      activity: [
        { merchant: 'Countdown', amount: 42.50, occurredAt: '2025-08-28T14:30:00Z' },
        { merchant: 'BP Station', amount: 85.00, occurredAt: '2025-08-28T09:15:00Z' },
        { merchant: 'Cafe Luna', amount: 16.50, occurredAt: '2025-08-27T16:45:00Z' },
        { merchant: 'Amazon', amount: 29.99, occurredAt: '2025-08-27T11:20:00Z' },
        { merchant: 'Uber', amount: 22.50, occurredAt: '2025-08-27T08:30:00Z' },
        { merchant: 'Woolworths', amount: 38.75, occurredAt: '2025-08-26T17:10:00Z' },
        { merchant: 'Netflix', amount: 19.99, occurredAt: '2025-08-26T12:00:00Z' },
        { merchant: 'Starbucks', amount: 12.50, occurredAt: '2025-08-26T07:45:00Z' },
        { merchant: 'Pak n Save', amount: 55.20, occurredAt: '2025-08-25T18:20:00Z' },
        { merchant: 'Z Energy', amount: 75.00, occurredAt: '2025-08-25T13:15:00Z' }
      ],
      lastBankSyncIso: '2025-08-28T15:00:00Z'
    },
    quarter: {
      period: 'quarter',
      orgName: 'Basic',
      available: { value: 4850.00 },
      income: {
        value: 8500.00,
        nextHorizon: { label: 'Year', value: 34000.00 },
        trendPct: 7.5,
        status: 5
      },
      committed: {
        actual: 3850.25,
        planned: 3600.00,
        trendPct: 1.8,
        status: 2
      },
      goals: {
        actual: 1950.00,
        target: 2400.00,
        trendPct: 18.2,
        status: 3
      },
      activity: [
        { merchant: 'Countdown', amount: 42.50, occurredAt: '2025-08-28T14:30:00Z' },
        { merchant: 'BP Station', amount: 85.00, occurredAt: '2025-08-28T09:15:00Z' },
        { merchant: 'Cafe Luna', amount: 16.50, occurredAt: '2025-08-27T16:45:00Z' },
        { merchant: 'Amazon', amount: 29.99, occurredAt: '2025-08-27T11:20:00Z' },
        { merchant: 'Uber', amount: 22.50, occurredAt: '2025-08-27T08:30:00Z' },
        { merchant: 'Woolworths', amount: 38.75, occurredAt: '2025-08-26T17:10:00Z' },
        { merchant: 'Netflix', amount: 19.99, occurredAt: '2025-08-26T12:00:00Z' },
        { merchant: 'Starbucks', amount: 12.50, occurredAt: '2025-08-26T07:45:00Z' },
        { merchant: 'Pak n Save', amount: 55.20, occurredAt: '2025-08-25T18:20:00Z' },
        { merchant: 'Z Energy', amount: 75.00, occurredAt: '2025-08-25T13:15:00Z' }
      ],
      lastBankSyncIso: '2025-08-28T15:00:00Z'
    },
    year: {
      period: 'year',
      orgName: 'Basic',
      available: { value: 18500.50 },
      income: {
        value: 34000.00,
        nextHorizon: { label: 'All-time', value: 68000.00 },
        trendPct: 12.3,
        status: 5
      },
      committed: {
        actual: 14250.75,
        planned: 14400.00,
        trendPct: -0.5,
        status: 4
      },
      goals: {
        actual: 7800.00,
        target: 9600.00,
        trendPct: 22.1,
        status: 3
      },
      activity: [
        { merchant: 'Countdown', amount: 42.50, occurredAt: '2025-08-28T14:30:00Z' },
        { merchant: 'BP Station', amount: 85.00, occurredAt: '2025-08-28T09:15:00Z' },
        { merchant: 'Cafe Luna', amount: 16.50, occurredAt: '2025-08-27T16:45:00Z' },
        { merchant: 'Amazon', amount: 29.99, occurredAt: '2025-08-27T11:20:00Z' },
        { merchant: 'Uber', amount: 22.50, occurredAt: '2025-08-27T08:30:00Z' },
        { merchant: 'Woolworths', amount: 38.75, occurredAt: '2025-08-26T17:10:00Z' },
        { merchant: 'Netflix', amount: 19.99, occurredAt: '2025-08-26T12:00:00Z' },
        { merchant: 'Starbucks', amount: 12.50, occurredAt: '2025-08-26T07:45:00Z' },
        { merchant: 'Pak n Save', amount: 55.20, occurredAt: '2025-08-25T18:20:00Z' },
        { merchant: 'Z Energy', amount: 75.00, occurredAt: '2025-08-25T13:15:00Z' }
      ],
      lastBankSyncIso: '2025-08-28T15:00:00Z'
    }
  };

  return mockData[period];
}