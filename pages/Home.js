import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import BoxInfo from "../components/BoxInfo";
import useInizializedApp from "../hooks/useInizializedApp";
import { useSelector } from "react-redux";
import BtnProject from "../components/BtnProject";
import Ionicons from "react-native-vector-icons/Ionicons";

const Home = ({ navigation }) => {
  useInizializedApp();
  const myProjects = useSelector((state) => state.myProjects.value);
  const myCompletedProjects = useSelector(
    (state) => state.myCompletedProjects.value
  );
  const myTasks = useSelector((state) => state.myTasks.value);

  const [activeProject, setActiveProject] = useState(0);
  const [tasksToComplete, setTasksToComplete] = useState(0);
  const [importantTasks, setImportantTasks] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [moreActiveProjects, setMoreActiveProjects] = useState([]);

  useEffect(() => {
    setActiveProject(myProjects.length);
    setCompletedProjects(myCompletedProjects.length);
    const tasksAmountProjects = myProjects.reduce((acc, project) => {
      return acc + project.tasks.length;
    }, 0);
    const tasks = [...myTasks.tasks];
    setTasksToComplete(tasks.length + tasksAmountProjects);

    const importantTasksAmountProjects = myProjects.reduce((acc, project) => {
      return acc + project.tasks.filter((task) => task.important).length;
    }, 0);
    const importantTasksAmountMyTasks = myTasks.tasks.filter(
      (task) => task.important
    ).length;
    setImportantTasks(
      importantTasksAmountProjects + importantTasksAmountMyTasks
    );

    const projectsWithTasksLength = myProjects.map((project) => {
      return {
        title: project.title,
        id: project.id,
        version: project.version,
        author: project.author,
        tasksLength: project.tasks.length + project.completedTasks.length,
      };
    });
    const projectsWithTasksLengthSorted = projectsWithTasksLength.sort(
      (a, b) => {
        return b.tasksLength - a.tasksLength;
      }
    );
    setMoreActiveProjects(projectsWithTasksLengthSorted.slice(0, 5));
  }, [myProjects, myTasks, myCompletedProjects]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <BoxInfo
          title="Proyectos Activos"
          color="#169118"
          icon="flask"
          data={activeProject}
        />
        <BoxInfo
          title="Tareas por completar"
          color="#8c00ff"
          icon="hammer"
          data={tasksToComplete}
        />
        <BoxInfo
          title="Tareas Importantes"
          color="#ff3d3d"
          icon="alert"
          data={importantTasks}
        />
        <BoxInfo
          title="Proyectos Completados"
          color="#4287f5"
          icon="checkmark"
          data={completedProjects}
        />
      </View>
      <View style={styles.moreActiveProjectsContainer}>
        <View style={styles.moreActiveProjectsBox}>
          <View style={styles.safeAreaBox}>
            <View style={styles.containerTitle}>
              <View style={styles.boxTitle}>
                <View style={styles.boxIcon}>
                  <View
                    style={[
                      styles.circle,
                      { backgroundColor: "#ff8c00" + "26" },
                    ]}
                  >
                    <Ionicons name="flame" size={20} color="#ff8c00" />
                  </View>
                </View>
                <Text style={styles.title}>Proyectos mas activos</Text>
              </View>
              <SafeAreaView style={styles.safeAreaView}>
                <FlatList
                  data={moreActiveProjects}
                  renderItem={({ item }) => (
                    <BtnProject
                      title={item.title}
                      version={item.version}
                      id={item.id}
                      author={item.author}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                />
              </SafeAreaView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    flexWrap: "wrap",
  },
  moreActiveProjectsContainer: {
    width: "100%",
    alignItems: "center",
  },
  moreActiveProjectsBox: {
    backgroundColor: "#fff",
    width: "96%",
    borderRadius: 5,
    height: 500,
  },
  safeAreaBox: {
    width: "100%",
    alignItems: "center",
  },
  safeAreaView: {
    width: "95%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3b3b3b",
  },
  containerTitle: {
    width: "96%",
    alignItems: "center",
  },
  boxTitle: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    width: "100%",
  },
  boxIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  circle: {
    borderRadius: 50,
    padding: 7,
  },
});

export default Home;
