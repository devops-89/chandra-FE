import IconButton from '@mui/material/IconButton';

export function SliderControls() {
  return (
    <div className="flex gap-4">
      <IconButton
        sx={{
          width: 56,
          height: 56,
          bgcolor: '#009966',
          color: 'white',
        }}
      >
      </IconButton>

      <IconButton
        sx={{
          width: 56,
          height: 56,
          bgcolor: '#009966',
          color: 'white',
        }}
      >
      </IconButton>
    </div>
  );
}