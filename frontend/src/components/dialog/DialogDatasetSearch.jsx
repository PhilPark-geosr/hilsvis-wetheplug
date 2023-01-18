// React, Redux
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import { getDatasets, selectDataset } from '../../_actions/datasetAction';
import Spinner from '../layout/Spinner';

// Third-party libraries
import moment from 'moment';

// MUI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  TableFooter,
  TablePagination,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { FilterListRounded, FullscreenRounded, FullscreenExitRounded } from '@mui/icons-material';

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
  },
  '& .MuiTableCell-head': {
    color: 'primary.main',
  },
  '& .MuiDialogActions-root': {
    p: '16px',
    pt: '0px',
  },
};

// create an enhanced Table Toolbar component
const EnhancedTableToolbar = (props) => {
  const { itemSelected } = props;

  return (
    <Toolbar
      sx={{
        ...(itemSelected !== null && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {itemSelected !== null ? (
        <Typography>dataset_id = {itemSelected} 선택됨</Typography>
      ) : (
        <Typography variant='h6'>해양환경 데이터셋 목록</Typography>
      )}
    </Toolbar>
  );
};

const DialogOceanSearch = ({ toggleSearchDialog }) => {
  // global redux state
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.dataset.loading);
  const datasets = useSelector((state) => state.dataset.datasets);

  // local component state
  const [fullScreen, setFullScreen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState(null);

  // submit
  const handleSubmit = () => {
    // select a dataset
    const dataset = datasets[selected - 1];

    // dispatch an action to select a dataset
    dispatch(selectDataset(dataset));

    // close dialog
    toggleSearchDialog();
  };

  // cancel selection
  const handleCancel = () => {
    // clear all datasets
    dispatch({ type: 'CLEAR_ALL_DATASETS' });

    // close dialog
    toggleSearchDialog();
  };

  // toggle screen size
  const handleToggleScreen = () => {
    setFullScreen(!fullScreen);
  };

  // open filter
  // TODO: filter
  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  // change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // change rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  // select row
  const handleSelectRow = (event, id) => {
    let newSelected = null;
    if (id === selected) {
      // if alreday selected, change to null
      newSelected = null;
    } else if (id !== selected) {
      // if not selected, update it with id
      newSelected = id;
    }

    setSelected(newSelected);
  };

  useEffect(() => {
    // get available datasets
    dispatch(getDatasets());
  }, []);

  return (
    <Dialog open={true} fullScreen={fullScreen} onClose={handleCancel} sx={{ ...sxDialog }}>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <DialogTitle>
            <Button
              disabled
              size='small'
              startIcon={<FilterListRounded />}
              onClick={handleOpenFilter}
            >
              필터
            </Button>
            <Button
              size='small'
              endIcon={fullScreen ? <FullscreenExitRounded /> : <FullscreenRounded />}
              onClick={handleToggleScreen}
            >
              {fullScreen ? '축소화면' : '전체화면'}
            </Button>
          </DialogTitle>
          <DialogContent>
            <Paper elevation={8}>
              <EnhancedTableToolbar itemSelected={selected} />
              <TableContainer>
                <Table size={'small'}>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>아이디</TableCell>
                      <TableCell align='center'>사례유형</TableCell>
                      <TableCell align='center'>시작일시</TableCell>
                      <TableCell align='center'>종료일시</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datasets
                      // slice rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      // make a deep copy and update the value of category_id
                      .map((row) => {
                        if (row.category_id === 1) {
                          return { ...row, category_id: '태풍' };
                        } else if (row.category_id === 2) {
                          return { ...row, category_id: '폭풍' };
                        } else if (row.category_id === 3) {
                          return { ...row, category_id: '고파' };
                        } else if (row.category_id === 4) {
                          return { ...row, category_id: '강우' };
                        } else if (row.category_id === 5) {
                          return { ...row, category_id: '강설' };
                        } else if (row.category_id === 6) {
                          return { ...row, category_id: '안개' };
                        }

                        return row;
                      })
                      // create table
                      .map((row) => {
                        // check if the row is selected
                        const isRowSelected = selected === row.dataset_id ? true : false;

                        return (
                          <TableRow
                            key={row.dataset_id}
                            hover={true}
                            role='checkbox'
                            selected={isRowSelected}
                            onClick={(event) => handleSelectRow(event, row.dataset_id)}
                          >
                            <TableCell align='center'>{row.dataset_id}</TableCell>
                            <TableCell align='center'>{row.category_id}</TableCell>
                            <TableCell align='center'>
                              {moment(row.time_start).format('YYYY-MM-DD HH:mm:ss')}
                            </TableCell>
                            <TableCell align='center'>
                              {moment(row.time_end).format('YYYY-MM-DD HH:mm:ss')}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        count={datasets.length}
                        page={page}
                        onPageChange={handleChangePage}
                        showFirstButton={true}
                        showLastButton={true}
                        labelRowsPerPage={'페이지당 행 수'}
                        labelDisplayedRows={({ from, to, count }) => {
                          return `데이터셋 ${count}개 중 ${from} - ${to}`;
                        }}
                        rowsPerPageOptions={[5, 10, 15]}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button size='small' variant='contained' onClick={handleSubmit}>
              추가
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
};

export default DialogOceanSearch;
