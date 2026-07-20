'use client';

import { Alert,Snackbar } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { hideSnackbar } from '@/redux/slices/snackbarSlice';

export default function GlobalSnackbar() {
  const dispatch = useAppDispatch();
  const { open, message, severity } = useAppSelector((state) => state.snackbar);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar 
      open={open} 
      autoHideDuration={4000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={severity} 
        variant="filled" 
        sx={{ width: '100%', borderRadius: '12px', boxShadow: 3 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
