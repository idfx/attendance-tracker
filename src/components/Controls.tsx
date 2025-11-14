import { Box, Button, IconButton } from '@mui/material';

// Props for Controls
interface ControlsProps {
  mode: 'light' | 'dark';
  onModeChange: (mode: 'light' | 'dark') => void;
  onReset: () => void;
}

export function Controls({ mode, onModeChange, onReset }: ControlsProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      {/* Theme toggle button */}
      <IconButton onClick={() => onModeChange(mode === 'light' ? 'dark' : 'light')} color="inherit">
        {mode === 'light' ? '🌙' : '☀️'}
      </IconButton>
      {/* Reset button */}
      <Button variant="contained" color="error" onClick={onReset}>
        Reset
      </Button>
    </Box>
  );
}