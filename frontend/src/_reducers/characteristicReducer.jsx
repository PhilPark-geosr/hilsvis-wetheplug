const initialState = {
  loading: true,
  characteristic_layers: [],
  error: null,
};

const characteristicReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_CHARACTERISTICS': {
      return { ...state, characteristic_layers: action.payload };
    }
    default:
      return state;
  }
};

export default characteristicReducer;
