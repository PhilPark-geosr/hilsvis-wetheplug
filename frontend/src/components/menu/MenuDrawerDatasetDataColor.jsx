// React, Redux
import React from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import {
  updateColorScheme,
  updateDomainMinValue,
  updateDomainMaxValue,
  updateOpacity,
} from '../../_actions/rasterAction';

// MUI
import { Grid, TextField, MenuItem, Typography, Button, Slider } from '@mui/material';

// Constant
import { color_schemes } from '../../constants/Constants';

const MenuDrawerDatasetDataColor = () => {
  // global redux state
  const dispatch = useDispatch();
  const opacity = useSelector((state) => state.raster.opacity);
  const scalar_variable = useSelector((state) => state.raster.scalar_variable);

  // handle update color scheme
  const handleUpdateColorScheme = (event) => {
    // update the global redux state by dispatching an action
    dispatch(updateColorScheme(event.target.value));
  };

  // handle update min
  const handleUpdateMin = (event) => {
    // update the global redux state by dispatching an action
    dispatch(updateDomainMinValue(event.target.value));
  };

  // handle update max
  const handleUpdateMax = (event) => {
    // update the global redux state by dispatching an action
    dispatch(updateDomainMaxValue(event.target.value));
  };

  // handle update opacity
  const handleUpdateOpacity = (event) => {
    // update the global redux state by dispatching an action
    dispatch(updateOpacity(event.target.value));
  };

  return (
    <Grid container spacing={2} alignItems='center'>
      {/* 팔레트 설정 */}
      <Grid item xs={3}>
        <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
          팔레트
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <TextField
          fullWidth
          size='small'
          select
          value={scalar_variable.scheme}
          onChange={handleUpdateColorScheme}
        >
          {color_schemes.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* 범위 설정 */}
      <Grid item xs={3}>
        <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
          범위
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          size='small'
          label='최소'
          value={scalar_variable.min}
          onChange={handleUpdateMin}
        ></TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          size='small'
          label='최대'
          value={scalar_variable.max}
          onChange={handleUpdateMax}
        ></TextField>
      </Grid>
      <Grid item xs={3}>
        <Button disabled variant='outlined'>
          적용
        </Button>
      </Grid>

      {/* 투명도 설정 */}
      <Grid item xs={3}>
        <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
          투명도
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Slider
          size='small'
          value={opacity}
          min={0}
          max={100}
          onChange={handleUpdateOpacity}
          valueLabelDisplay='auto'
        />
      </Grid>
    </Grid>
  );
};

export default MenuDrawerDatasetDataColor;
