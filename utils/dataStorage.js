import AsyncStorage from "@react-native-async-storage/async-storage";

export const getDataStorage = async (key) => {
  const res = await AsyncStorage.getItem(key);
  const data = await JSON.parse(res);
  return data;
};

export const addDataStorage = async (key, value) => {
  const res = await AsyncStorage.getItem(key);
  const data = JSON.parse(res);
  if (data) {
    const newData = [...data, value];
    await AsyncStorage.setItem(key, JSON.stringify(newData));
  } else {
    await AsyncStorage.setItem(key, JSON.stringify([]));
  }
};

export const addTaskStorage = async (key, value, arrayName) => {
  if (key === "myProjects" && arrayName === "tasks") {
    const res = await AsyncStorage.getItem(key);
    const data = JSON.parse(res);
    const newData = [...data];
    newData.forEach((project) => {
      if (project.id === value.projectId) {
        project.tasks.push(value);
      }
    });
    await AsyncStorage.setItem(key, JSON.stringify(newData));
  } else if (key === "myProjects" && arrayName === "completedTasks") {
    const res = await AsyncStorage.getItem(key);
    const data = JSON.parse(res);
    const newData = [...data];
    newData.forEach((project) => {
      if (project.id === value.projectId) {
        project.completedTasks.push(value);
        const tasks = project.tasks.filter((task) => task.id !== value.id);
        project.tasks = tasks;
      }
    });
    await AsyncStorage.setItem(key, JSON.stringify(newData));
  }
};

export const deleteTaskDataStorage = async (key, value, arrayName) => {
  if (key === "myProjects" && arrayName === "tasks") {
    const res = await AsyncStorage.getItem(key);
    const data = JSON.parse(res);
    const newData = [...data];
    newData.forEach((project) => {
      if (project.id === value.projectId) {
        const tasks = project.tasks.filter((task) => task.id !== value.taskId);
        project.tasks = tasks;
      }
    });
    await AsyncStorage.setItem(key, JSON.stringify(newData));
  } else if (key === "myProjects" && arrayName === "completedTasks") {
    const res = await AsyncStorage.getItem(key);
    const data = JSON.parse(res);
    const newData = [...data];
    newData.forEach((project) => {
      if (project.id === value.projectId) {
        const completedTasks = project.completedTasks.filter(
          (task) => task.id !== value.taskId
        );
        project.completedTasks = completedTasks;
      }
    });
    await AsyncStorage.setItem(key, JSON.stringify(newData));
  }
};

export const editTaskDataStorage = async (key, value) => {
  if (key === "myProjects") {
    const res = await AsyncStorage.getItem(key);
    const data = JSON.parse(res);
    const newData = [...data];
    newData.forEach((project) => {
      if (project.id === value.projectId) {
        project.tasks.forEach((task) => {
          if (task.id === value.taskId) {
            task.title = value.task.title;
            task.description = value.task.description;
            task.important = value.task.important;
          }
        });
      }
    });
    AsyncStorage.setItem(key, JSON.stringify(newData));
  }
};

export const setSettingsDataStore = async (key, value) => {
  const res = await AsyncStorage.getItem("settings");
  const data = JSON.parse(res);
  if (data) {
    data[key] = value;
    await AsyncStorage.setItem("settings", JSON.stringify(data));
  } else {
    await AsyncStorage.setItem(
      "settings",
      JSON.stringify({
        theme: "light",
        language: "es",
      })
    );
  }
};
