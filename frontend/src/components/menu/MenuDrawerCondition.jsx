// React, Redux
import React, { useState } from 'react';

// MUI
import { Box, Typography, Button, Menu, MenuItem, ListItemText } from '@mui/material';
import { AddRounded } from '@mui/icons-material';

const sxBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  my: '10px',
  '& .MuiTypography-root': {
    fontSize: '14px',
  },
};

const MenuDrawerCondition = () => {
  return (
    <React.Fragment>
      {' '}
      <Box sx={{ ...sxBox }}>
        <Typography sx={{ my: '10px' }}>해역상태 레이어</Typography>
        <Button variant='contained' size='small' startIcon={<AddRounded />}>
          추가
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default MenuDrawerCondition;
