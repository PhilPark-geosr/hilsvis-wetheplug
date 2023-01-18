// React, Redux
import React from 'react';
import { useSelector } from 'react-redux';

// Components
import MenuDrawerDangerLayerListItem from './MenuDrawerDangerLayerListItem';

// MUI
import { List } from '@mui/material';

const sxList = {
  display: 'flex',
  flexDirection: 'column',
  '& .MuiListItem-root': {
    p: '0px',
  },
  '& .MuiListItemButton-root': {
    p: '0px',
    m: '4px',
  },
  '& .MuiIconButton-root': {
    p: '3px',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1rem',
  },
};

const MenuDrawerDangerLayerList = () => {
  // global redux state
  const typhoons_selected = useSelector((state) => state.danger.typhoons_selected);

  return (
    typhoons_selected.length > 0 && (
      <List sx={{ ...sxList }}>
        {typhoons_selected.map((row) => (
          <MenuDrawerDangerLayerListItem key={row.typhoon_id} typhoon={row} />
        ))}
      </List>
    )
  );
};

export default MenuDrawerDangerLayerList;
