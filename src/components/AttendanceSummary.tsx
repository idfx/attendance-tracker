import { Box, Typography } from '@mui/material';

// Props for AttendanceSummary
interface AttendanceSummaryProps {
  trackedDays: number;
  best8Weeks: number;
}

export function AttendanceSummary({ trackedDays, best8Weeks }: AttendanceSummaryProps) {
  return (
    <>
      {/* Summary statistics */}
      <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
        Total days in tracked weeks: {trackedDays}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
        <Typography variant="body1">
          Total days in best 8 weeks: {best8Weeks} days
        </Typography>
        {/* Icon indicating if requirement is met */}
        {best8Weeks >= 24 ? '✅' : '❌'}
      </Box>
    </>
  );
}