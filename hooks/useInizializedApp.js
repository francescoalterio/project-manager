import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { appInitializedMyProjects } from "../store/myProjects/myProjectsSlice";
import { appInitializedMyTasks } from "../store/myTasks/myTasksSlice";
import { appInitializedSettings } from "../store/settings/settingsSlice";
import {
  getDataStorage,
  setDataStorage,
  setSettingsDataStore,
} from "../utils/dataStorage";

const useInizializedApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const projects = await getDataStorage("myProjects");
      const tasks = await getDataStorage("myTasks");
      const settings = await getDataStorage("settings");
      if (projects && tasks) {
        dispatch(appInitializedMyProjects(projects));
        dispatch(appInitializedMyTasks(tasks));
        dispatch(appInitializedSettings(settings));
      } else {
        await setDataStorage("myProjects");
        await setDataStorage("myTasks");
        await setSettingsDataStore();
      }
    };
    getData();
  }, []);
};

export default useInizializedApp;
