const PostReducer = (
  state = {
    posts: [],
    isFetching: false,
    error: false,
    uploading: false,
  },

  action
) => {
  switch (action.type) {
    //! ----------------------------------------- belongs to Share.js
    case "UPLOAD_START":
      return { ...state, uploading: true };

    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
      };

    case "UPLOAD_FAIL":
      return {
        ...state,
        uploading: false,
        error: true,
      };
    //!------------------------------------ belongs to Posts.js
    case "RETREIVING_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "RETREIVING_SUCCESS":
      return {
        ...state,
        posts: action.data,
        loading: false,
        error: false,
      };
    case "RETREIVING_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
      };

    // !-------------------------DEFAULT
    default:
      return state;
  }
};

export default PostReducer;
