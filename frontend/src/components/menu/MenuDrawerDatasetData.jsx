// React, Redux
import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { getSingleBandRaster, getMultiBandRaster } from '../../_actions/rasterAction';

// Components
import DialogRasterDataTable from '../dialog/DialogRasterDataTable';
import MenuDrawerDatasetDataVariable from './MenuDrawerDatasetDataVariable';
import MenuDrawerDatasetDataTime from './MenuDrawerDatasetDataTime';
import MenuDrawerDatasetDataColor from './MenuDrawerDatasetDataColor';

// MUI
import { Box, Typography, Divider } from '@mui/material';

const MenuDrawerDatasetData = () => {
  // global redux state
  const dispatch = useDispatch();
  const dataset = useSelector((state) => state.dataset.dataset);
  const scalar_variable = useSelector((state) => state.raster.scalar_variable);
  const vector_variable = useSelector((state) => state.raster.vector_variable);

  // control raster re-rendering
  useEffect(() => {
    // should only result in one combined re-render, not two
    batch(() => {
      // get single band raster
      dispatch(
        getSingleBandRaster(dataset.dataset_id, scalar_variable.var_name, scalar_variable.time_id)
      );

      // get multi band raster
      if (vector_variable.var_name !== 'none') {
        dispatch(
          getMultiBandRaster(dataset.dataset_id, vector_variable.var_name, scalar_variable.time_id)
        );
      }
    });
  }, [scalar_variable, vector_variable]);

  return (
    <React.Fragment>
      <Box sx={{ my: '20px' }}>
        <Typography sx={{ fontSize: '14px' }}>래스터 데이터</Typography>
      </Box>

      {/* 데이터 선택 옵션: 변수 */}
      <Box sx={{ my: '20px' }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', fontSize: '14px' }}>
          변수
        </Typography>
        <Divider sx={{ my: '10px' }} />
        <MenuDrawerDatasetDataVariable />
      </Box>

      {/* 데이터 선택 옵션: 시간 */}
      <Box sx={{ my: '20px' }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', fontSize: '14px' }}>
          시간
        </Typography>
        <Divider sx={{ my: '10px' }} />
        <MenuDrawerDatasetDataTime />
      </Box>

      {/* 데이터 선택 옵션: 색상 */}
      <Box sx={{ my: '20px' }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', fontSize: '14px' }}>
          색상
        </Typography>
        <Divider sx={{ my: '10px' }} />
        <MenuDrawerDatasetDataColor />
      </Box>
    </React.Fragment>
  );
};

export default MenuDrawerDatasetData;
