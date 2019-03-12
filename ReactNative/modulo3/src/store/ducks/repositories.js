// ACTION TYPES

export const Types = {
  request: "REPO_REQUEST",
  success: "REPO_SUCCESS",
  failed: "REPO_FAILED",
};

// REDUCER

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false
};

export default function loadRepos(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.request:
      return { ...state, loading: true };

    case Types.success:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false
      };

    case Types.failed:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
}

// ACTION CREATORS

export const Creators = {
  repoLoadRequest: () => ({
    type: Types.request
  }),

  repoLoadSuccess: data => ({
    type: Types.success,
    payload: { data }
  }),

  repoLoadFailed: () => ({
    type: Types.failed
  })
};
