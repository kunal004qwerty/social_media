const UserReducer = (
  state = {
    user: [],
    isFetching: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case "GET_USER_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        user: action.data,
        isFetching: false,
        error: false,
      };
    case "GET_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.data,
      };

    default:
      return state;
  }
};

export default UserReducer;
