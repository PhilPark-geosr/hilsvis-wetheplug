import axios from 'axios';

// get all typhoons
export const getAllTyphoons = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/typhoon');

    dispatch({
      type: 'GET_ALL_TYPHOONS',
      payload: res.data,
    });
  } catch (err) {
    // fix later...
    dispatch({
      type: 'TYPHOON_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// select typhoons
export const selectTyphoons = (rows) => async (dispatch) => {
  try {
    // add paths to each typhoon
    const typhoons_with_paths = await Promise.all(
      await rows.map(async (row) => {
        const res = await axios.get(`/api/path/${row.typhoon_id}`);
        return { ...row, paths: res.data };
      })
    );

    dispatch({
      type: 'SELECT_TYPHOONS',
      payload: typhoons_with_paths,
    });
  } catch (err) {
    console.log(err);
  }
};

// deselect layer by id
export const deselectTyphoonByTyphoonId = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'DESELECT_TYPHOON_BY_TYPHOON_ID',
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

// get paths by typhoon
export const getPathsByTyphoon = () => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_PATHS_BY_TYPHOON',
    });
  } catch (err) {
    console.log(err);
  }
};

// get typhoon paths by typhoon id
/* export const getAllPathsByTyphoonId = (typhoonId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/path/${typhoonId}`);

    dispatch({
      type: 'GET_ALL_PATHS_BY_TYPHOON_ID',
      payload: { paths: res.data, typhoon_id: typhoonId },
    });
  } catch (err) {
    console.log(err);
  }
};
 */
