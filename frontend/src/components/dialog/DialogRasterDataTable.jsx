// React, Redux
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Components
import Spinner from '../layout/Spinner';

// MUI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Paper,
  Toolbar,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@mui/material';
import { FullscreenRounded, FullscreenExitRounded } from '@mui/icons-material';

const sxDialog = {
  '& .MuiDialogTitle-root': {
    display: 'flex',
    justifyContent: 'space-between',
    p: '16px',
  },
  '& .MuiDialogContent-root': {
    px: '16px',
  },
  '& .MuiTableRow-root': {
    wordBreak: 'keep-all',
    whiteSpace: 'nowrap',
  },
  '& .MuiTableCell-root': {
    padding: '6px 6px 6px 6px',
    textAlign: 'center',
  },
  '& .MuiTableRow-head': {
    bgcolor: 'primary.main',
  },
  '& .MuiTableCell-head': {
    color: 'primary.contrastText',
  },
};

const DialogRasterDataTable = ({ toggleInfoDialog }) => {
  // global redux state
  const loading = useSelector((state) => state.dataset.loading);
  const raster = useSelector((state) => state.dataset.raster);

  // local component state
  const [fullScreen, setFullScreen] = useState(false);

  // handle close
  const handleClose = () => {
    toggleInfoDialog();
  };

  // toggle screen size
  const handleToggleFullscreen = () => {
    setFullScreen(!fullScreen);
  };

  return (
    <Dialog open={true} fullScreen={fullScreen} onClose={handleClose} sx={{ ...sxDialog }}>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <DialogTitle>
            <Button
              size='small'
              variant='outlined'
              endIcon={fullScreen ? <FullscreenExitRounded /> : <FullscreenRounded />}
              onClick={handleToggleFullscreen}
            >
              {fullScreen ? '축소화면' : '전체화면'}
            </Button>
          </DialogTitle>
          <DialogContent>
            <Paper>
              <Toolbar>
                <Typography variant='h6'>해양환경 래스터 데이터 속성정보</Typography>
              </Toolbar>
              <TableContainer>
                <Table size={'small'}>
                  <TableHead>
                    <TableRow>
                      <TableCell>래스터 속성명</TableCell>
                      <TableCell>래스터 속성값</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(raster.metadata).map(([k, v], i) => (
                      <TableRow key={i} hover={true}>
                        <TableCell>{k}</TableCell>
                        <TableCell>{v}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </DialogContent>
        </React.Fragment>
      )}
    </Dialog>
  );
};

export default DialogRasterDataTable;
