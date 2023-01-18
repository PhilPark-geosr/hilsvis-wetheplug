const initialState = {
  // TODO: 나중에 viewport 값 추가 일단 객체로 만듬
  view: { type: 'GlobeView' },
  // TODO: 나중에 베이스맵 styles 추가, 일단 객체로 만듬
  basemap: { map_style: 'dark-v10' },
};

const displayReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_BASEMAP':
      return {
        ...state,
        basemap: { ...state.basemap, map_style: action.payload },
      };
    case 'UPDATE_VIEW':
      return {
        ...state,
        view: { ...state.view, type: action.payload },
      };
    default:
      return state;
  }
};

export default displayReducer;
