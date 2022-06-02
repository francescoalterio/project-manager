import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Todo from "./Todo";

const TodoList = ({ projectId, tasks, completedTasks }) => {
  const [ordenedTasks, setOrdenedTasks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (tasks) {
      const importantTasks = tasks.filter((task) => task.important);
      const normalTasks = tasks.filter((task) => !task.important);
      const ordenedTasks = [...importantTasks, ...normalTasks];
      setOrdenedTasks(ordenedTasks);
    }
  }, [tasks]);

  const createTodoHandler = () => {
    if (projectId === "myTasks") {
      navigation.navigate("Tasks Create Todo", { projectId });
    } else {
      navigation.navigate("Create Todo", { projectId });
    }
  };

  const todoInfoHandler = (id) => {
    if (projectId === "myTasks") {
      navigation.navigate("Tasks Todo Info", {
        projectId,
        taskId: id,
        completedTasks,
      });
    } else {
      navigation.navigate("Todo Info", {
        projectId,
        taskId: id,
        completedTasks,
      });
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {!completedTasks ? (
          <View style={styles.buttonContainer}>
            <Button title="Agregar Tarea" onPress={createTodoHandler} />
          </View>
        ) : undefined}
        <SafeAreaView style={styles.flatlist}>
          <FlatList
            data={ordenedTasks}
            renderItem={({ item }) => (
              <Todo
                id={item.id}
                title={item.title}
                description={item.description}
                important={item.important}
                handler={todoInfoHandler}
                completed={completedTasks}
              />
            )}
            keyExtractor={(item) => item.id * Date.now()}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    alignItems: "center",
    height: "100%",
    paddingBottom: 30,
  },
  container: {
    width: "95%",
    paddingBottom: 20,
    paddingTop: 20,
  },
  flatlist: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default TodoList;
