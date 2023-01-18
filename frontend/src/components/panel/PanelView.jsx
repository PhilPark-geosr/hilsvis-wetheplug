// React, Redux
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateView } from '../../_actions/displayAction';

// MUI
import { Tooltip, Fade, Fab, Popover, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ViewInAr } from '@mui/icons-material';

const PanelView = () => {
  // global redux state
  const dispatch = useDispatch();
  const view = useSelector((state) => state.display.view);

  // local component state
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (event) => {
    // set the position of the popover relative to the HTML element
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  // handle view toggle
  const handleToggleView = (event, newView) => {
    // enforce that at least one button must be active
    if (newView !== null) {
      dispatch(updateView(newView));
    }
  };

  return (
    <React.Fragment>
      <Tooltip
        title='투영'
        placement='left'
        arrow={true}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
      >
        <Fab size='small' color='primary' disableRipple={true} onClick={handleButtonClick}>
          <ViewInAr />
        </Fab>
      </Tooltip>

      <Popover
        open={Boolean(anchorEl)} // if the value is not null, return true
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <ToggleButtonGroup
          orientation='vertical'
          exclusive
          value={view.type}
          onChange={handleToggleView}
          color='primary'
        >
          <ToggleButton value='MapView'>MapView</ToggleButton>
          <ToggleButton value='GlobeView'>GlobeView</ToggleButton>
        </ToggleButtonGroup>
      </Popover>
    </React.Fragment>
  );
};

export default PanelView;
