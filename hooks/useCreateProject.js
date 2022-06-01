import React, { useState } from "react";
import { Alert } from "react-native";
import { addDataStorage } from "../utils/dataStorage";
import { useDispatch } from "react-redux";
import { addProject } from "../store/myProjects/myProjectsSlice";

const useCreateProject = (navigation) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("");
  const [author, setAuthor] = useState("");

  const dispatch = useDispatch();

  const handleCreate = () => {
    if (title.length === 0 || description.length === 0 || author.length === 0) {
      Alert.alert("Error", "Todos los campos son obligatorios");
    } else {
      if (title.length > 20) {
        Alert.alert("Error", "El titulo no debe superar los 20 caracteres");
      } else if (version.length > 9) {
        Alert.alert("Error", "La version no debe superar los 9 caracteres");
      } else if (author.length > 15) {
        Alert.alert("Error", "el autor no debe superar los 15 caracteres");
      } else {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const project = {
          id: Date.now(),
          title,
          description,
          version,
          author,
          tasks: [],
          completedTasks: [],
          date: `${day}-${month}-${year}`,
        };
        addDataStorage("myProjects", project);
        dispatch(addProject(project));
        navigation.navigate("Mis Proyectos Page");
      }
    }
  };

  return {
    title,
    description,
    version,
    author,
    setTitle,
    setDescription,
    setAuthor,
    setVersion,
    handleCreate,
  };
};

export default useCreateProject;
