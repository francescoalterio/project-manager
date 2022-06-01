import { configureStore } from "@reduxjs/toolkit";
import myCompletedProjectsSlice from "./myCompletedProjects/myCompletedProjectsSlice";
import myProjectsReducer from "./myProjects/myProjectsSlice";
import myTasksReducer from "./myTasks/myTasksSlice";
import settingsReducer from "./settings/settingsSlice";
export default configureStore({
  reducer: {
    myProjects: myProjectsReducer,
    myCompletedProjects: myCompletedProjectsSlice,
    myTasks: myTasksReducer,
    settings: settingsReducer,
  },
});
