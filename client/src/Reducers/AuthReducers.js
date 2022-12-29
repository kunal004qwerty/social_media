const AuthReducer = (
  state = {
    user: null,
    isFetching: false,
    error: false,
    updateLoading: false,
  },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        user: action.data,
        isFetching: false,
        error: false,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        user: null,
        isFetching: false,
        error: action.data,
      };
    // !-------------------------------- UPDATING
    case "UPDATING_START":
      return { ...state, updateLoading: true, error: false };
    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        user: action.data,
        updateLoading: false,
        error: false,
      };

    case "UPDATING_FAIL":
      return { ...state, updateLoading: true, error: true };

    // !---------------------LogOut
    case "LOG_OUT":
      window.localStorage.clear();
      return {
        ...state,
        user: null,
        isFetching: false,
        error: false,
      };

    // !----------------------FOLLOW_USER
    case "FOLLOW_USER":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.data],
        },
      };
    // !----------------------------UNFOLLOW_USER
    case "UNFOLLOW_USER":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.data
          ),
        },
      };

    default:
      return state;
  }
};

export default AuthReducer;
