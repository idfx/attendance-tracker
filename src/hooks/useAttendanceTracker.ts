import { useMemo } from 'react';
import { format, subDays, startOfWeek, eachWeekOfInterval } from 'date-fns';

// Custom hook to handle attendance calculations
export function useAttendanceTracker(selectedDays: Set<string>, today: Date) {
  return useMemo(() => {
    // Define the tracking period: last 12 weeks (84 days) ending on today
    const periodStart = subDays(today, 84);
    const periodEnd = today;

    // Get all weeks in the period FIRST
    const weeksInPeriod = eachWeekOfInterval({ start: periodStart, end: periodEnd }, { weekStartsOn: 1 });
    const trackedWeekKeys = new Set(weeksInPeriod.map(w => format(w, 'yyyy-MM-dd')));

    // Filter selected days to only those whose WEEK is in the tracking period
    const selectedDaysInPeriod = Array.from(selectedDays)
      .map(dayStr => new Date(dayStr))
      .filter(day => trackedWeekKeys.has(format(startOfWeek(day, { weekStartsOn: 1 }), 'yyyy-MM-dd')));
    const trackedDays = selectedDaysInPeriod.length;

    // Count attendance days per week within the period
    const weekCounts = new Map<string, number>();
    for (const day of selectedDaysInPeriod) {
      const weekKey = format(startOfWeek(day, { weekStartsOn: 1 }), 'yyyy-MM-dd'); // Weeks start on Monday
      weekCounts.set(weekKey, (weekCounts.get(weekKey) || 0) + 1);
    }

    // Create array of week starts with their attendance counts
    const weekCountsArray = weeksInPeriod.map(weekStart => ({ weekStart, count: weekCounts.get(format(weekStart, 'yyyy-MM-dd')) || 0 }));

    // Sort weeks by count descending to find the best weeks
    weekCountsArray.sort((a, b) => b.count - a.count);

    // Extract counts sorted descending
    const counts = Array.from(weekCounts.values()).sort((a, b) => b - a);

    // Sum the top 8 weeks' attendance (policy requirement: at least 24 days in best 8 weeks)
    const best8Weeks = counts.slice(0, 8).reduce((sum, v) => sum + v, 0);

    // Identify the best 8 weeks by their start dates
    const bestWeeks = new Set(weekCountsArray.slice(0, 8).map(w => format(w.weekStart, 'yyyy-MM-dd')));

    // Sort weeks chronologically for display
    const sortedWeeks = [...weekCountsArray].sort((a, b) => a.weekStart.getTime() - b.weekStart.getTime());

    return {
      trackedDays,
      best8Weeks,
      sortedWeeks,
      bestWeeks,
    };
  }, [selectedDays, today]);
}