const initialState = {
  loading: true,
};

const conditionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_TIDAL_CURRENTS': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default conditionReducer;
