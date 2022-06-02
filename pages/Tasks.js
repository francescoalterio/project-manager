import React from "react";
import { View, Text } from "react-native";
import TodoList from "../components/TodoList";

const Tasks = ({ id, tasks }) => {
  return (
    <View>
      <TodoList projectId={id} tasks={tasks} />
    </View>
  );
};

export default Tasks;
