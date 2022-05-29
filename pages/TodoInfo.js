import { useState, useEffect } from "react";
import { View, Text, Button, Alert, TextInput, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addProjectCompletedTask,
  deleteProjectTask,
  editProjectTask,
} from "../store/myProjects/myProjectsSlice";
import {
  addTaskStorage,
  deleteTaskDataStorage,
  editTaskDataStorage,
} from "../utils/dataStorage";

const TodoInfo = ({ route, navigation }) => {
  const task = useSelector((state) => {
    if (route.params.projectId) {
      const project = state.myProjects.value.find(
        (project) => project.id === route.params.projectId
      );
      return project.tasks.find((task) => task.id === route.params.taskId);
    } else {
      return state.tasks.value.tasks.find(
        (task) => task.id === route.params.taskId
      );
    }
  });
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isEnabled, setIsEnabled] = useState(task.important);
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
          navigation.navigate("Proyecto Page", { id: route.params.projectId });
          dispatch(deleteProjectTask(data));
          deleteTaskDataStorage("myProjects", data, "tasks");
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
          navigation.navigate("Proyecto Page", { id: route.params.projectId });
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

  return (
    <View>
      <Text>Titulo: </Text>
      <TextInput value={title} onChangeText={(text) => setTitle(text)} />
      <Text>Descripcion: </Text>
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Text>Importancia: </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Button
        title="Eliminar Tarea"
        color="#ff3636"
        onPress={handleDeleteTask}
      />
      <Button title="Editar Tarea" color="#228b22" onPress={handleEditTask} />
      <Button title="Completar Tarea" onPress={handleCompleteTask} />
    </View>
  );
};

export default TodoInfo;
