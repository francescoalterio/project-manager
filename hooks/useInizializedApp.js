import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { appInitializedMyCompletedProjects } from "../store/myCompletedProjects/myCompletedProjectsSlice";
import { appInitializedMyProjects } from "../store/myProjects/myProjectsSlice";
import { appInitializedMyTasks } from "../store/myTasks/myTasksSlice";
import { appInitializedSettings } from "../store/settings/settingsSlice";
import {
  getDataStorage,
  addDataStorage,
  setSettingsDataStore,
} from "../utils/dataStorage";

const useInizializedApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const projects = await getDataStorage("myProjects");
      const completedProjects = await getDataStorage("myCompletedProjects");
      const tasks = await getDataStorage("myTasks");
      const settings = await getDataStorage("settings");
      if (projects && tasks && completedProjects && settings) {
        dispatch(appInitializedMyProjects(projects));
        dispatch(appInitializedMyCompletedProjects(completedProjects));
        dispatch(appInitializedMyTasks(tasks));
        dispatch(appInitializedSettings(settings));
      } else {
        await addDataStorage("myProjects", []);
        await addDataStorage("myCompletedProjects", []);
        await addDataStorage("myTasks", {});
        await setSettingsDataStore();
      }
    };
    getData();
  }, []);
};

export default useInizializedApp;
