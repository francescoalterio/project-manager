import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { addProjectTask } from "../store/myProjects/myProjectsSlice";
import { addTask } from "../store/myTasks/myTasksSlice";
import { addTaskStorage } from "../utils/dataStorage";

const useCreateTodo = (navigation, route) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const dispatch = useDispatch();

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const addTaskHandler = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    if (title.length === 0 || description.length === 0) {
      Alert.alert("Error", "Todos los campos son obligatorios");
    } else {
      if (title.length > 25) {
        Alert.alert("Error", "El titulo no debe superar los 25 caracteres");
      } else {
        if (route.params.projectId === "myTasks") {
          const task = {
            id: Date.now(),
            title,
            description,
            important: isEnabled,
            date: `${day}-${month}-${year}`,
          };
          addTaskStorage("myTasks", task, "tasks");
          dispatch(addTask(task));
          navigation.navigate("Mis Tareas Page");
        } else {
          const task = {
            projectId: route.params.projectId,
            id: Date.now(),
            title,
            description,
            important: isEnabled,
            date: `${day}-${month}-${year}`,
          };
          addTaskStorage("myProjects", task, "tasks");
          dispatch(addProjectTask(task));
          navigation.navigate("Proyecto Page", { id: route.params.projectId });
        }
      }
    }
  };

  return {
    title,
    description,
    isEnabled,
    setTitle,
    setDescription,
    setIsEnabled,
    addTaskHandler,
    toggleSwitch,
  };
};

export default useCreateTodo;
