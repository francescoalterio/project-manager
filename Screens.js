import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";

import Home from "./pages/Home";
import MyProjects from "./pages/MyProjects";
import Settings from "./pages/Settings";
import MyTasks from "./pages/MyTasks";
import { setIconsNavbar } from "./utils/setIconsNavbar";
import store from "./store";
import { BtnCreateProject } from "./components/BtnCreateProject";
import CreateProject from "./pages/CreateProject";
import Project from "./pages/Project";

import AsyncStorage from "@react-native-async-storage/async-storage";
import CreateTodo from "./pages/CreateTodo";
import TodoInfo from "./pages/TodoInfo";
import { resetTenTasks } from "./store/myTenTasks/myTenTasksSlice";

export default function Screens() {
  const Tab = createBottomTabNavigator();
  const ProjectStack = createNativeStackNavigator();
  const HomeStack = createNativeStackNavigator();
  const TaskStack = createNativeStackNavigator();

  const myTenTasks = useSelector((state) => state.myTenTasks.value);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const admobAds = async () => {
      if (myTenTasks === 10) {
        try {
          AdMobInterstitial.setAdUnitID(
            "ca-app-pub-6947784507365792/3361789574"
          );
          await AdMobInterstitial.requestAdAsync({
            servePersonalizedAds: false,
          });
          await AdMobInterstitial.showAdAsync();
          dispatch(resetTenTasks());
        } catch (err) {
          dispatch(resetTenTasks());
        }
      }
    };
    admobAds();
  }, [myTenTasks]);

  return (
    <NavigationContainer>
      <View style={styles.background}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={setIconsNavbar}
          >
            <Tab.Screen
              name="Inicio"
              options={{
                headerShown: false,
              }}
            >
              {() => (
                <HomeStack.Navigator>
                  <HomeStack.Screen
                    name="Inicio Page"
                    component={Home}
                    options={{ title: "Inicio" }}
                  />
                </HomeStack.Navigator>
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Mis Proyectos"
              options={{
                headerShown: false,
              }}
            >
              {() => (
                <ProjectStack.Navigator>
                  <ProjectStack.Group>
                    <ProjectStack.Screen
                      name="Mis Proyectos Page"
                      component={MyProjects}
                      options={{
                        headerRight: (props) => (
                          <BtnCreateProject content="crear" {...props} />
                        ),
                        title: "Mis Proyectos",
                      }}
                    />
                    <ProjectStack.Screen
                      name="Crear Proyecto Page"
                      component={CreateProject}
                      options={{ title: "Crear Proyecto" }}
                    />
                    <ProjectStack.Screen
                      name="Proyecto Page"
                      component={Project}
                      options={{
                        title: "Mi Proyecto",
                      }}
                    />
                  </ProjectStack.Group>
                  <ProjectStack.Group screenOptions={{ presentation: "modal" }}>
                    <ProjectStack.Screen
                      name="Create Todo"
                      component={CreateTodo}
                      options={{ title: "Agregar Tarea" }}
                    />
                    <ProjectStack.Screen
                      name="Todo Info"
                      component={TodoInfo}
                      options={{ title: "Mi Tarea" }}
                    />
                  </ProjectStack.Group>
                </ProjectStack.Navigator>
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Mis Tareas"
              options={{
                headerShown: false,
              }}
            >
              {() => (
                <TaskStack.Navigator>
                  <TaskStack.Group>
                    <TaskStack.Screen
                      name="Mis Tareas Page"
                      component={MyTasks}
                      options={{ title: "Mis Tareas" }}
                    />
                  </TaskStack.Group>
                  <TaskStack.Group screenOptions={{ presentation: "modal" }}>
                    <TaskStack.Screen
                      name="Tasks Create Todo"
                      component={CreateTodo}
                      options={{ title: "Agregar Tarea" }}
                    />
                    <TaskStack.Screen
                      name="Tasks Todo Info"
                      component={TodoInfo}
                      options={{ title: "Mi Tarea" }}
                    />
                  </TaskStack.Group>
                </TaskStack.Navigator>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
