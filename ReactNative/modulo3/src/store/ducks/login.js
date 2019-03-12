// ACTION TYPES

export const Types = {
  request: "LOGIN_REQUEST",
  success: "LOGIN_SUCCESS",
  failed: "LOGIN_FAILED"
};

// REDUCER

const INITIAL_STATE = {
  username: null,
  error: false,
  loading: false
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.request:
      return { ...state, loading: true };

    case Types.success:
      return {
        ...state,
        username: action.payload.username,
        error: false,
        loading: false
      };

    case Types.failed:
      return { ...state, error: true, loading: false };

    default:
      return state;
  }
}

// ACTIONS CREATORS

export const Creators = {
  loginRequest: username => ({
    type: Types.request,
    payload: { username }
  }),

  loginSuccess: username => ({
    type: Types.success,
    payload: { username }
  }),

  loginFailed: () => ({
    type: Types.failed
  })
};
