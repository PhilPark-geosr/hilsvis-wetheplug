// React, Redux
import React, { useState } from 'react';

// Components
import DialogDangerSearch from '../dialog/DialogDangerSearch';
import MenuDrawerDangerLayerList from './MenuDrawerDangerLayerList';

// MUI
import { Box, Typography, Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  AddRounded,
  StormRounded,
  AirRounded,
  AcUnitRounded,
  ThunderstormRounded,
  WavesRounded,
} from '@mui/icons-material';

const sxBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  my: '10px',
  '& .MuiTypography-root': {
    fontSize: '14px',
  },
};

const MenuDrawerDanger = () => {
  // local component state
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  // click add button
  const hanldeClickAddBtn = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // hanlde close add button
  const handleCloseAddBtn = () => {
    setAnchorEl(null);
  };

  // handle toggle typhoon dialog
  const toggleSearchDialog = () => {
    // close anchor
    setAnchorEl(null);

    // open dialog
    setOpenSearchDialog(!openSearchDialog);
  };

  return (
    <React.Fragment>
      {/* 데이터셋 추가 */}
      <Box sx={{ ...sxBox }}>
        <Typography sx={{ my: '10px' }}>관측 데이터셋</Typography>
        <Button
          variant='contained'
          size='small'
          startIcon={<AddRounded />}
          onClick={hanldeClickAddBtn}
        >
          추가
        </Button>

        {/* 위험사례 선택 메뉴 */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseAddBtn}>
          <MenuItem onClick={toggleSearchDialog}>
            <ListItemIcon>
              <StormRounded />
            </ListItemIcon>
            <ListItemText primary='태풍' />
          </MenuItem>
          <MenuItem disabled>
            <ListItemIcon>
              <AirRounded />
            </ListItemIcon>
            <ListItemText primary='강풍' />
          </MenuItem>
          <MenuItem disabled>
            <ListItemIcon>
              <AcUnitRounded />
            </ListItemIcon>
            <ListItemText primary='강설' />
          </MenuItem>
          <MenuItem disabled>
            <ListItemIcon>
              <ThunderstormRounded />
            </ListItemIcon>
            <ListItemText primary='강설' />
          </MenuItem>
          <MenuItem disabled>
            <ListItemIcon>
              <WavesRounded />
            </ListItemIcon>
            <ListItemText primary='고파' />
          </MenuItem>
        </Menu>
      </Box>

      {/* 데이터셋 검색 다이얼로그 */}
      {openSearchDialog && <DialogDangerSearch toggleDialog={toggleSearchDialog} />}

      {/* 선택된 데이터셋 */}
      <MenuDrawerDangerLayerList />
    </React.Fragment>
  );
};

export default MenuDrawerDanger;
