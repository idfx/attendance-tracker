import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import { PickersDay, type PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { format } from 'date-fns';

// Props for AttendanceCalendar
interface AttendanceCalendarProps {
  selectedDays: Set<string>;
  onDayClick: (day: Date) => void;
  today: Date;
  onTodayChange: (date: Date | null) => void;
}

// Custom component for calendar days to handle selection highlighting
function CustomDay(props: PickersDayProps & { selectedDays: Set<string>; onDayClick: (day: Date) => void }) {
  const { day, selectedDays, onDayClick, ...other } = props;
  const dayString = format(day, 'yyyy-MM-dd');
  const isSelected = selectedDays.has(dayString);

  let backgroundColor = 'inherit';
  if (isSelected) backgroundColor = 'lightblue';

  return (
    <PickersDay
      {...other}
      day={day}
      onClick={() => onDayClick(day)}
      sx={{
        backgroundColor,
        '&:hover': {
          backgroundColor: backgroundColor !== 'inherit' ? backgroundColor : undefined,
        },
      }}
    />
  );
}

export function AttendanceCalendar({ selectedDays, onDayClick, today, onTodayChange }: AttendanceCalendarProps) {
  return (
    <Box>
      <DateCalendar
        slots={{
          day: (props: PickersDayProps) => (
            <CustomDay {...props} selectedDays={selectedDays} onDayClick={onDayClick} />
          ),
        }}
      />
      {/* Date picker for setting today's date */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <DatePicker label="Today's date" value={today} onChange={onTodayChange} />
      </Box>
    </Box>
  );
}