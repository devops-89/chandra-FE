import { Box, CircularProgress } from '@mui/material';

const PageLoader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)' }}>
      <CircularProgress sx={{ color: '#059669' }} size={40} />
    </Box>
  );
};

export default PageLoader;
