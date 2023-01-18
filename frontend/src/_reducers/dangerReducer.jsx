const initialState = {
  loading: true,
  typhoons: [],
  typhoons_selected: [],
  error: null,
};

const dangerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_TYPHOONS': {
      return {
        ...state,
        loading: false,
        typhoons: action.payload,
      };
    }
    case 'CLEAR_ALL_TYPHOONS': {
      return {
        ...state,
        typhoons: [],
        loading: true,
      };
    }
    case 'SELECT_TYPHOONS': {
      return {
        ...state,
        loading: true,
        typhoons: [],
        typhoons_selected: action.payload,
        error: null,
      };
    }
    case 'DESELECT_TYPHOON_BY_TYPHOON_ID': {
      return {
        ...state,
        typhoons_selected: state.typhoons_selected.filter(
          (item) => item.typhoon_id !== action.payload
        ),
      };
    }
    case 'GET_PATHS_BY_TYPHOON': {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default dangerReducer;
