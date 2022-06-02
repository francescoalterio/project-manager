import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSelector, useDispatch } from "react-redux";

import TasksCompleted from "./TasksCompleted";
import Tasks from "./Tasks";

const MyTasks = ({ navigation }) => {
  const tasks = useSelector((state) => state.myTasks.value);

  const TasksTopTab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      <TasksTopTab.Navigator>
        <TasksTopTab.Screen name="Tareas Page" options={{ title: "Tareas" }}>
          {() => <Tasks id="myTasks" tasks={tasks.tasks} />}
        </TasksTopTab.Screen>
        <TasksTopTab.Screen
          name="Mis Tareas Completadas Page"
          options={{ title: "completadas" }}
        >
          {() => (
            <TasksCompleted
              id="myTasks"
              completedTasks={tasks.completedTasks}
            />
          )}
        </TasksTopTab.Screen>
      </TasksTopTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default MyTasks;
