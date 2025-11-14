import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, Typography, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useAttendanceTracker } from './hooks/useAttendanceTracker';
import { AttendanceCalendar } from './components/AttendanceCalendar';
import { WeeksList } from './components/WeeksList';
import { AttendanceSummary } from './components/AttendanceSummary';
import { Controls } from './components/Controls';

function App() {
  // State for selected attendance days, persisted in localStorage
  const [selectedDays, setSelectedDays] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('selectedDays');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  // State for theme mode (light/dark), persisted in localStorage
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' ? 'dark' : 'light';
  });

  // State for the current date, used as the end of the tracking period
  const [today, setToday] = useState(() => {
    const stored = localStorage.getItem('today');
    return stored ? new Date(stored) : new Date();
  });

  const theme = createTheme({ palette: { mode } });

  // Persist selectedDays to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedDays', JSON.stringify(Array.from(selectedDays)));
  }, [selectedDays]);

  // Persist theme mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  // Persist today's date to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('today', today.toISOString());
  }, [today]);

  // Handler for clicking on a calendar day to toggle attendance
  const handleDayClick = (day: Date) => {
    const dayString = format(day, 'yyyy-MM-dd');
    setSelectedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dayString)) {
        newSet.delete(dayString);
      } else {
        newSet.add(dayString);
      }
      return newSet;
    });
  };

  // Use custom hook for attendance calculations
  const { trackedDays, best8Weeks, sortedWeeks, bestWeeks } = useAttendanceTracker(selectedDays, today);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={{ ...enUS, options: { ...enUS.options, weekStartsOn: 1 } }}>
        {/* Main container for the entire app */}
        <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: (theme) => theme.palette.background.default, p: { xs: 1, md: 2 } }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontSize: { xs: '2rem', md: '2.125rem' } }}>
            Attendance Tracker 📅
          </Typography>
          {/* Layout container for calendar and weeks list */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'flex-start' }, gap: { xs: 2, md: 4 } }}>
            <AttendanceCalendar selectedDays={selectedDays} onDayClick={handleDayClick} today={today} onTodayChange={(value) => { if (value) setToday(value); }} />
            <WeeksList sortedWeeks={sortedWeeks} bestWeeks={bestWeeks} />
          </Box>
          <AttendanceSummary trackedDays={trackedDays} best8Weeks={best8Weeks} />
          <Controls mode={mode} onModeChange={setMode} onReset={() => { setSelectedDays(new Set()); setToday(new Date()); }} />
          <Box sx={{ textAlign: 'center', mt: 2, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              No cookies were harmed 🍪
            </Typography>
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
