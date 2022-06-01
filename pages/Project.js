import { View, Text, StyleSheet, Button } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ProjectTasks from "./ProjectTasks";
import ProjectTasksCompleted from "./ProjectTasksCompleted";
import ProjectInfo from "./ProjectInfo";
import useProject from "../hooks/useProject";

const Project = ({ route, navigation }) => {
  const ProjectTopTab = createMaterialTopTabNavigator();

  const { project, handleCompleteProject, handleDeleteProject } = useProject(
    navigation,
    route
  );

  return (
    <View style={styles.container}>
      <View style={styles.backgroundInfo}>
        <View style={styles.boxInfo}>
          <View>
            <Text style={styles.title}>{project.title}</Text>
          </View>
          <View style={styles.boxExtraInfo}>
            <View style={styles.extraInfoContainer}>
              <Text style={[styles.extraInfo, styles.extraInfoName]}>
                Version:{" "}
              </Text>
              <Text style={[styles.extraInfo]}>{project.version}</Text>
            </View>
            <View style={styles.extraInfoContainer}>
              <Text style={[styles.extraInfo, styles.extraInfoName]}>
                Autor:{" "}
              </Text>
              <Text style={[styles.extraInfo]}>{project.author}</Text>
            </View>
          </View>
          <Button
            title="Completar proyecto"
            color="#228b22"
            onPress={handleCompleteProject}
          />
          <Button
            title="Eliminar proyecto"
            color="#ff3636"
            onPress={handleDeleteProject}
          />
        </View>
      </View>
      <ProjectTopTab.Navigator>
        <ProjectTopTab.Screen
          name="Proyecto Tareas"
          options={{ title: "Tareas" }}
        >
          {() => <ProjectTasks id={project.id} tasks={project.tasks} />}
        </ProjectTopTab.Screen>
        <ProjectTopTab.Screen
          name="Proyecto Tareas Completadas"
          options={{ title: "completadas" }}
        >
          {() => (
            <ProjectTasksCompleted
              id={project.id}
              completedTasks={project.completedTasks}
            />
          )}
        </ProjectTopTab.Screen>
        <ProjectTopTab.Screen
          name="Proyecto Info"
          options={{ title: "Informacion" }}
        >
          {() => (
            <ProjectInfo id={project.id} description={project.description} />
          )}
        </ProjectTopTab.Screen>
      </ProjectTopTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundInfo: {
    height: 200,
    backgroundColor: "white",
    paddingTop: 20,
    padding: 20,
    paddingBottom: 0,
  },

  boxInfo: {
    flex: 1,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#3b3b3b",
  },
  boxExtraInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  extraInfoContainer: {
    flexDirection: "row",
  },
  extraInfoName: {
    fontWeight: "bold",
  },
  extraInfo: {
    fontSize: 18,
    color: "#3b3b3b",
  },
});

export default Project;
