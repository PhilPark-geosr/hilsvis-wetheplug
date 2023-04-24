// React, Redux
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCharacteristics } from '../../_actions/characteristicAction';

// MUI
import { Box, Typography, Button, Menu, MenuItem, ListItemText } from '@mui/material';
import { TreeView, TreeItem } from '@mui/lab';
import { ExpandMoreRounded, ChevronRightRounded } from '@mui/icons-material';

const sxBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  my: '10px',
  '& .MuiTypography-root': {
    fontSize: '14px',
  },
};

const MenuDrawerCharacteristic = () => {
  // global redux state
  const dispatch = useDispatch();

  // local component state
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);

  // handle toggle node
  const handleToggleNode = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  // hanlde select node
  const handleSelectNode = (event, nodeIds) => {
    setSelected(nodeIds);
    console.log(event);
    console.log(nodeIds);

    // dispatch an action
    const nodesToSkip = ['routes', 'zones', 'accidents'];
    if (!nodesToSkip.includes(event.target.innerText)) {
      console.log('proceed');
      dispatch(selectCharacteristics(nodeIds));
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ ...sxBox }}>
        <Typography sx={{ my: '10px' }}>{`해역특성 레이어(${selected.length})`}</Typography>
      </Box>
      <Box>
        <TreeView
          defaultCollapseIcon={<ExpandMoreRounded />}
          defaultExpandIcon={<ChevronRightRounded />}
          expanded={expanded} // expanded node ids(controlled)
          selected={selected} // selected node ids(controlled)
          onNodeToggle={handleToggleNode}
          onNodeSelect={handleSelectNode}
          multiSelect
        >
          <TreeItem nodeId='routes' label='항로'>
            <TreeItem nodeId='PassengerShipRoute' label='여객항로' />
            <TreeItem nodeId='YachtRoute' label='요트항로' />
            <TreeItem nodeId='DesignatedRoute' label='지정항로' />
            <TreeItem nodeId='AllRoute' label='전체항로' />
            <TreeItem nodeId='TwowayRoutePart' label='양길항로부' />
          </TreeItem>
          <TreeItem nodeId='zones' label='영역'>
            <TreeItem nodeId='TssBoundary' label='통항분리경계선' />
            <TreeItem nodeId='TssZone' label='통항분리구역' />
            <TreeItem nodeId='TrafficSaftetyDesignatedArea' label='교통안전특정해역' />
            <TreeItem disabled nodeId='AidsToNavigationArea' label='항로표지설치해역' />
            <TreeItem nodeId='ForecastRegionalArea' label='해양조사원 해양예보구역(광역)' />
            <TreeItem nodeId='ForecastCoastalArea' label='해양조사원 해양예보구역(협역)' />
          </TreeItem>
          <TreeItem nodeId='accidents' label='사고'>
            <TreeItem nodeId='KcgShipAccident' label='해양경찰청제공 선박사고' />
            <TreeItem nodeId='KcgNonshipAccident' label='해양경찰청제공 비선박사고' />
            <TreeItem nodeId='KmstShipAccident' label='해안심판원제공 선박사고' />
          </TreeItem>
        </TreeView>
      </Box>
    </React.Fragment>
  );
};

export default MenuDrawerCharacteristic;
