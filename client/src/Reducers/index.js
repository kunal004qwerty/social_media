import { combineReducers } from "redux";

import AuthReducer from "./AuthReducers";
import PostReducer from "./PostReducer";
// import UserReducer from "./UserReducer";

export const reducers = combineReducers({
  AuthReducer,
  PostReducer,
  // UserReducer,
});
