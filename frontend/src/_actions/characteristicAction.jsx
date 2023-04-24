import axios from 'axios';

// select characteristics
export const selectCharacteristics = (nodeIds) => async (dispatch) => {
  try {
    console.log(nodeIds);
    const char_layers = await Promise.all(
      await nodeIds.map(async (nodeId) => {
        console.log(`processing ${nodeId}`);
        const res = await axios.get(
          `http://hilsvis_ppark_backend.localhost:81/api/characteristic/${nodeId}`
        );
        return { name: nodeId, geometry: res.data };
      })
    );
    console.log(char_layers);
    // dispatch({
    //   type: 'SELECT_CHARACTERISTICS',
    //   payload: char_layers,
    // });
  } catch (err) {
    console.log(err);
  }
};

// deselect characteristic by id
export const deselectCharacteristicById = (id) => async (dispatch) => {
  try {
  } catch (err) {
    console.log(err);
  }
};
