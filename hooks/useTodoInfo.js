import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addProjectCompletedTask,
  deleteCompletedProjectTask,
  deleteProjectTask,
  editProjectTask,
} from "../store/myProjects/myProjectsSlice";
import {
  addTaskStorage,
  deleteTaskDataStorage,
  editTaskDataStorage,
} from "../utils/dataStorage";

const useTodoInfo = (navigation, route) => {
  const task = useSelector((state) => {
    if (route.params.projectId) {
      const project = state.myProjects.value.find(
        (project) => project.id === route.params.projectId
      );
      return route.params.completedTasks
        ? project.completedTasks.find((task) => task.id === route.params.taskId)
        : project.tasks.find((task) => task.id === route.params.taskId);
    } else {
      return state.tasks.value.tasks.find(
        (task) => task.id === route.params.taskId
      );
    }
  });
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isEnabled, setIsEnabled] = useState(task.important);
  const [isCompleted, setIsCompleted] = useState(route.params.completedTasks);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    Alert.alert("Eliminar tarea", "¿Estás seguro/a?", [
      { text: "Cancelar" },
      {
        text: "Eliminar",
        onPress: () => {
          const data = {
            projectId: route.params.projectId,
            taskId: route.params.taskId,
          };
          navigation.navigate("Proyecto Page", {
            id: route.params.projectId,
          });
          if (!isCompleted) {
            dispatch(deleteProjectTask(data));
            deleteTaskDataStorage("myProjects", data, "tasks");
          } else {
            dispatch(deleteCompletedProjectTask(data));
            deleteTaskDataStorage("myProjects", data, "completedTasks");
          }
        },
      },
    ]);
  };

  const handleCompleteTask = () => {
    Alert.alert("Completar tarea", "¿Estás seguro/a?", [
      { text: "Cancelar" },
      {
        text: "Completar",
        onPress: () => {
          const data = {
            projectId: route.params.projectId,
            taskId: route.params.taskId,
          };
          navigation.navigate("Proyecto Page", {
            id: route.params.projectId,
          });
          dispatch(addProjectCompletedTask(data));
          addTaskStorage("myProjects", task, "completedTasks");
        },
      },
    ]);
  };
  const handleEditTask = () => {
    Alert.alert("Editar tarea", "¿Estás seguro/a?", [
      { text: "Cancelar" },
      {
        text: "Editar",
        onPress: () => {
          if (title.length === 0 || description.length === 0) {
            Alert.alert("Error", "Todos los campos son obligatorios");
          } else {
            if (title.length > 25) {
              Alert.alert(
                "Error",
                "El titulo no debe superar los 25 caracteres"
              );
            } else {
              const data = {
                projectId: route.params.projectId,
                taskId: route.params.taskId,
                task: {
                  title,
                  description,
                  date: task.date,
                  important: isEnabled,
                },
              };
              navigation.navigate("Proyecto Page", {
                id: route.params.projectId,
              });
              dispatch(editProjectTask(data));
              editTaskDataStorage("myProjects", data);
            }
          }
        },
      },
    ]);
  };

  return {
    title,
    description,
    isEnabled,
    isCompleted,
    setTitle,
    setDescription,
    setIsCompleted,
    setIsEnabled,
    toggleSwitch,
    handleDeleteTask,
    handleCompleteTask,
    handleEditTask,
  };
};

export default useTodoInfo;
