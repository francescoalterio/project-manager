import { configureStore } from "@reduxjs/toolkit";
import myProjectsReducer from "./myProjects/myProjectsSlice";
import myTasksReducer from "./myTasks/myTasksSlice";
import settingsReducer from "./settings/settingsSlice";
export default configureStore({
  reducer: {
    myProjects: myProjectsReducer,
    myTasks: myTasksReducer,
    settings: settingsReducer,
  },
});
