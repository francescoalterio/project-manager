import { View, Text } from "react-native";
import TodoList from "../components/TodoList";

const ProjectTasksCompleted = ({ id, completedTasks }) => {
  return (
    <View>
      <TodoList projectId={id} tasks={completedTasks} completedTasks />
    </View>
  );
};

export default ProjectTasksCompleted;
