import { View, Text } from "react-native";
import TodoList from "../components/TodoList";

const TasksCompleted = ({ id, completedTasks }) => {
  return (
    <View>
      <TodoList projectId={id} tasks={completedTasks} completedTasks />
    </View>
  );
};

export default TasksCompleted;
