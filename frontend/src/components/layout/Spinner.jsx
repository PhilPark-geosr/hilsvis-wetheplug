import React from 'react';

// MUI
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = () => {
  return (
    <Box sx={{ width: '300px', height: '300px' }}>
      <CircularProgress color='primary' sx={{ margin: 'auto' }} />
    </Box>
  );
};

export default Spinner;
