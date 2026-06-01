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
          '&:hover': {
            bgcolor: '#009966',
          },
        }}
      >
      </IconButton>

      <IconButton
        sx={{
          width: 56,
          height: 56,
          bgcolor: '#009966',
          color: 'white',
          '&:hover': {
            bgcolor: '#009966',
          },
        }}
      >
      </IconButton>
    </div>
  );
}