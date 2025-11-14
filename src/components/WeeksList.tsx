import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';

// Props for WeeksList
interface WeeksListProps {
  sortedWeeks: { weekStart: Date; count: number }[];
  bestWeeks: Set<string>;
}

export function WeeksList({ sortedWeeks, bestWeeks }: WeeksListProps) {
  return (
    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
      <Typography variant="h6">Tracked Weeks (12):</Typography>
      {sortedWeeks.map(({ weekStart, count }) => {
        const weekKey = format(weekStart, 'yyyy-MM-dd');
        const isBest = bestWeeks.has(weekKey);
        const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000); // Calculate week end (Sunday)
        return (
          <Box key={weekKey} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mt: 1 }}>
            {/* Check icon for best weeks */}
            <Box sx={{ width: 24, display: 'flex', justifyContent: 'center', mr: 1 }}>
              {isBest && '✅'}
            </Box>
            <Typography variant="body2">
              {format(weekStart, 'MMM dd')} - {format(weekEnd, 'MMM dd')}: {count} days
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}