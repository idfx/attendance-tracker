import { useMemo } from 'react';
import { format, subDays, startOfWeek, eachWeekOfInterval } from 'date-fns';

const WEEK_OPTIONS = { weekStartsOn: 1 } as const;
const formatWeekKey = (date: Date) => format(date, 'yyyy-MM-dd');

// Custom hook to handle attendance calculations
export function useAttendanceTracker(selectedDays: Set<string>, today: Date) {
  return useMemo(() => {
    // Get all weeks in the 12-week tracking period
    const weeksInPeriod = eachWeekOfInterval(
      { start: subDays(today, 84), end: today },
      WEEK_OPTIONS
    );
    const trackedWeekKeys = new Set(weeksInPeriod.map(formatWeekKey));

    // Count attendance days per week (only for weeks in tracking period)
    const weekCounts = new Map<string, number>();
    let trackedDays = 0;

    for (const dayStr of selectedDays) {
      const weekKey = formatWeekKey(startOfWeek(new Date(dayStr), WEEK_OPTIONS));
      if (trackedWeekKeys.has(weekKey)) {
        weekCounts.set(weekKey, (weekCounts.get(weekKey) || 0) + 1);
        trackedDays++;
      }
    }

    // Build week data array sorted chronologically
    const sortedWeeks = weeksInPeriod.map(weekStart => ({
      weekStart,
      count: weekCounts.get(formatWeekKey(weekStart)) || 0,
    }));

    // Find best 8 weeks by sorting a copy by count descending
    const byCount = [...sortedWeeks].sort((a, b) => b.count - a.count);
    const best8Weeks = byCount.slice(0, 8).reduce((sum, w) => sum + w.count, 0);
    const bestWeeks = new Set(byCount.slice(0, 8).map(w => formatWeekKey(w.weekStart)));

    return { trackedDays, best8Weeks, sortedWeeks, bestWeeks };
  }, [selectedDays, today]);
}