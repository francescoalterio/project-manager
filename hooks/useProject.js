import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { deleteProject } from "../store/myProjects/myProjectsSlice";
import { addDataStorage, deleteProjectStorage } from "../utils/dataStorage";
import { addCompletedProject } from "../store/myCompletedProjects/myCompletedProjectsSlice";

const useProject = (navigation, route) => {
  const projects = useSelector((state) => state.myProjects.value);
  const [project, setProject] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    setProject(projects.find((project) => project.id === route.params.id));
  }, [projects]);

  const handleDeleteProject = () => {
    Alert.alert("Eliminar proyecto", "¿Estás seguro/a?", [
      { text: "Cancelar" },
      {
        text: "Eliminar",
        onPress: () => {
          navigation.navigate("Mis Proyectos Page");
          dispatch(deleteProject(project.id));
          deleteProjectStorage(project.id);
        },
      },
    ]);
  };

  const handleCompleteProject = () => {
    Alert.alert("Completar proyecto", "¿Estás seguro/a?", [
      { text: "Cancelar" },
      {
        text: "Completar",
        onPress: () => {
          navigation.navigate("Mis Proyectos Page");
          dispatch(
            addCompletedProject({ ...project, completed: true, id: Date.now() })
          );
          dispatch(deleteProject(project.id));
          addDataStorage("myCompletedProjects", {
            ...project,
            completed: true,
          });
          deleteProjectStorage(project.id);
        },
      },
    ]);
  };

  const handleEditProject = () => {
    navigation.navigate("Crear Proyecto Page", {
      project: project,
      edit: true,
    });
  };

  return {
    project,
    handleDeleteProject,
    handleCompleteProject,
    handleEditProject,
  };
};

export default useProject;
