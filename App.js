import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";

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

export default function App() {
  const Tab = createBottomTabNavigator();
  const ProjectStack = createNativeStackNavigator();
  const HomeStack = createNativeStackNavigator();
  const TaskStack = createNativeStackNavigator();
  const SettingsStack = createNativeStackNavigator();

  /*React.useEffect(() => {
    AsyncStorage.removeItem("myProjects");
    AsyncStorage.removeItem("myTasks");
  }, []);*/

  return (
    <Provider store={store}>
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
                            <BtnCreateProject {...props} />
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
                    <ProjectStack.Group
                      screenOptions={{ presentation: "modal" }}
                    >
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
                    <TaskStack.Screen
                      name="Mis Tareas Page"
                      component={MyTasks}
                      options={{ title: "Mis Tareas" }}
                    />
                  </TaskStack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen
                name="Configuracion"
                options={{
                  headerShown: false,
                }}
              >
                {() => (
                  <SettingsStack.Navigator>
                    <SettingsStack.Screen
                      name="Configuracion Page"
                      component={Settings}
                      options={{ title: "Configuracion" }}
                    />
                  </SettingsStack.Navigator>
                )}
              </Tab.Screen>
            </Tab.Navigator>
          </View>
        </View>
      </NavigationContainer>
    </Provider>
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
