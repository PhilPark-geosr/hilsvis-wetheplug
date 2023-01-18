// React, Redux
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBasemap } from '../../_actions/displayAction';

// MUI
import { Tooltip, Fade, Fab, Popover, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Map } from '@mui/icons-material';

const PanelBasemap = () => {
  // global redux state
  const dispatch = useDispatch();
  const map_style = useSelector((state) => state.display.basemap.map_style);
  const view = useSelector((state) => state.display.view);

  // local component state
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickButton = (event) => {
    // set the position of the popover relative to the HTML element
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleToggleBasemap = (event, newBasemap) => {
    // enforce that at least one button must be active
    if (newBasemap !== null) {
      dispatch(updateBasemap(newBasemap));
    }
  };

  return (
    view.type === 'MapView' && (
      <React.Fragment>
        <Tooltip
          title='베이스맵'
          placement='left'
          arrow={true}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 500 }}
        >
          <Fab size='small' color='primary' disableRipple={true} onClick={handleClickButton}>
            <Map />
          </Fab>
        </Tooltip>

        <Popover
          open={Boolean(anchorEl)} // if the value is not null, return true
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          BackdropProps={{ invisible: true }}
        >
          <ToggleButtonGroup
            orientation='vertical'
            exclusive
            value={map_style}
            onChange={handleToggleBasemap}
            color='primary'
          >
            <ToggleButton value='dark-v10'>Dark</ToggleButton>
            <ToggleButton value='light-v10'>Light</ToggleButton>
            <ToggleButton value='satellite-v9'>Satellite</ToggleButton>
            <ToggleButton value='streets-v10'>Streets</ToggleButton>
            <ToggleButton value='outdoors-v11'>Outdoors</ToggleButton>
          </ToggleButtonGroup>
        </Popover>
      </React.Fragment>
    )
  );
};

export default PanelBasemap;
