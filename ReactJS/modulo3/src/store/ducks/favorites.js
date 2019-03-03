//ACTION TYPES

export const Types = {
  ADD_REQUEST: 'favorite/ADD_REQUEST',
  ADD_SUCCESS: 'favorite/ADD_SUCCESS',
  ADD_FAILURE: 'favorite/ADD_FAILURE',
};  

//REDUCER

const INITIAL_STATE = {
  loading: false,
  data: [],
};

export default function favorites(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;

    case Types.ADD_REQUEST:
      return { ...state, loading: true };

    case Types.ADD_SUCCESS:
      return { ...state, loading: false, data: [...state.data, action.payload.data], error: null };

    case Types.ADD_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
  }
}

//ACTIONS

export const Creators = {
  addFavoriteRequest: repo => ({
    type: Types.ADD_REQUEST,
    payload: { repo },
  }),

  addFavoriteSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data },
  }),

  addFavoriteFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  })
};
