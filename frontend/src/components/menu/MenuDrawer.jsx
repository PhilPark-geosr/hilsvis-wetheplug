// React, Redux
import React, { useState } from 'react';

// MUI
import { Drawer, Box, Tabs, Tab } from '@mui/material';

// Components
import MenuDrawerDataset from './MenuDrawerDataset';
import MenuDrawerDanger from './MenuDrawerDanger';

const sxDrawer = {
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
  },
};

// Custom TabPanel component
function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box sx={{ m: 2 }}>{children}</Box>}
    </div>
  );
}

const MenuDrawer = ({ open, toggleDrawer }) => {
  // local component state
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Drawer
      variant='persistent'
      hideBackdrop={true}
      PaperProps={{ style: { position: 'fixed', width: 380, margin: 20 } }}
      transitionDuration={500}
      open={open}
      onClose={toggleDrawer}
      // sx={{ ...sxDrawer }}
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            indicatorColor='primary'
            variant='scrollable'
            scrollButtons={true}
            value={value}
            onChange={handleChangeTab}
          >
            <Tab wrapped label='위험사례(모델)' />
            <Tab wrapped label='위험사례(관측)' />
            <Tab wrapped disabled label='해양상태' />
            <Tab wrapped disabled label='해역특성' />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <MenuDrawerDataset />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MenuDrawerDanger />
        </TabPanel>
        <TabPanel value={value} index={2}></TabPanel>
        <TabPanel value={value} index={3}></TabPanel>
      </Box>
    </Drawer>
  );
};

export default MenuDrawer;
