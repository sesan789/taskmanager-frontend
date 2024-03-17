import authReducer from "./slices/authSlice";
import tasksReducer from "./slices/tasksSlice";
import loadingReducer from "./slices/loadingSlice";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  loading : loadingReducer,
});

export default rootReducer;
