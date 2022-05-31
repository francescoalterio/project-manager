import { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  TextInput,
  Switch,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
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

const TodoInfo = ({ route, navigation }) => {
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
          navigation.navigate("Proyecto Page", { id: route.params.projectId });
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
    <View style={styles.container}>
      {isCompleted ? (
        <>
          <Text style={styles.field}>Titulo: </Text>
          <View style={styles.titleField}>
            <Text>{title}</Text>
          </View>
          <Text style={styles.field}>Descripcion: </Text>
          <View style={styles.safeAreaContainer}>
            <SafeAreaView styles={styles.safeArea}>
              <ScrollView style={styles.scrollView}>
                <Text>{description}</Text>
              </ScrollView>
            </SafeAreaView>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.field}>Titulo: </Text>
          <TextInput
            style={styles.inputTitle}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          {!isCompleted ? (
            <View style={styles.switchBox}>
              <Text style={styles.field}>Importancia: </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={styles.switch}
              />
            </View>
          ) : undefined}
          <Text style={styles.field}>Descripcion: </Text>
          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={styles.inputDescription}
            multiline={true}
          />
        </>
      )}

      <View style={styles.buttonBox}>
        <Button
          title="Eliminar Tarea"
          color="#ff3636"
          onPress={handleDeleteTask}
        />

        {!isCompleted ? (
          <>
            <Button
              title="Editar Tarea"
              color="#228b22"
              onPress={handleEditTask}
            />
            <Button title="Completar Tarea" onPress={handleCompleteTask} />
          </>
        ) : undefined}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  field: {
    marginBottom: 10,
    fontSize: 20,
  },
  inputTitle: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  inputDescription: {
    width: "100%",
    height: "50%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    textAlignVertical: "top",
    padding: 10,
  },
  switchBox: {
    flexDirection: "row",

    alignItems: "center",
  },
  switch: {
    marginLeft: 10,
    marginBottom: 10,
  },
  buttonBox: {
    flex: 1,
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  titleField: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    justifyContent: "center",
  },
  safeAreaContainer: {
    width: "100%",
    height: "50%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    textAlignVertical: "top",
  },
});

export default TodoInfo;
