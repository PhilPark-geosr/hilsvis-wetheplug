// React, Redux
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Components
import { deselectTyphoonByTyphoonId } from '../../_actions/dangerAction';
import DialogDangerLayerTable from '../dialog/DialogDangerLayerTable';

// MUI
import { IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material';
import {
  DeleteRounded,
  VisibilityRounded,
  VisibilityOffRounded,
  TableRowsRounded,
  ArrowDropDownCircleRounded,
} from '@mui/icons-material';

const sxListPriTypo = { fontSize: 11, lineHeight: '15px' };
const sxListSecTypo = {
  fontSize: 10,
  lineHeight: '15px',
  color: 'rgba(150,150,150)',
};

const MenuDrawerDangerLayerListItem = ({ typhoon: { typhoon_id, typhoon_name } }) => {
  const dispatch = useDispatch();

  // local component state
  const [openDialog, setOpenDialog] = useState(false);
  const [isBtnShown, setIsBtnShown] = useState(false);

  // hanlde toggle dialog
  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <React.Fragment>
      <ListItem onMouseEnter={() => setIsBtnShown(true)} onMouseLeave={() => setIsBtnShown(false)}>
        <ListItemButton>
          <ListItemText
            primary={typhoon_name}
            primaryTypographyProps={{ ...sxListPriTypo }}
            secondary={`태풍 식별자 = ${typhoon_id}`}
            secondaryTypographyProps={{ ...sxListSecTypo }}
          />
          {isBtnShown && (
            <IconButton onClick={() => dispatch(deselectTyphoonByTyphoonId(typhoon_id))}>
              <DeleteRounded />
            </IconButton>
          )}
          <IconButton onClick={toggleDialog}>
            <TableRowsRounded />
          </IconButton>
          {/* <IconButton>
            <VisibilityRounded />
          </IconButton> */}
          <IconButton>
            <ArrowDropDownCircleRounded />
          </IconButton>
        </ListItemButton>
      </ListItem>

      {/* 데이터셋 정보 다이얼로그 */}
      {openDialog && (
        <DialogDangerLayerTable
          toggleDialog={toggleDialog}
          typhoonId={typhoon_id}
          typhoonName={typhoon_name}
        />
      )}
    </React.Fragment>
  );
};

export default MenuDrawerDangerLayerListItem;
