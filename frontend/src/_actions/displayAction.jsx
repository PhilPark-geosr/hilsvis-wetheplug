// update a basemap
export const updateBasemap = (value) => (dispatch) => {
  try {
    dispatch({
      type: 'UPDATE_BASEMAP',
      payload: value,
    });
  } catch (err) {
    console.log(err);
  }
};

// update a view (where and how your deck.gl layers should be rendered)
export const updateView = (value) => (dispatch) => {
  try {
    dispatch({
      type: 'UPDATE_VIEW',
      payload: value,
    });
  } catch (err) {
    console.log(err);
  }
};
