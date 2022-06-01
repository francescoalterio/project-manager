import React, { useState } from "react";
import { addDataStorage } from "../utils/dataStorage";
import { useDispatch } from "react-redux";
import { addProject } from "../store/myProjects/myProjectsSlice";

const useCreateProject = (navigation) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleCreate = () => {
    if (title.length === 0 || description.length === 0 || author.length === 0) {
      setError("Todos los campos son obligatorios");
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      if (title.length > 20) {
        setError("El titulo no debe superar los 20 caracteres");
        setTimeout(() => {
          setError("");
        }, 5000);
      } else if (version.length > 9) {
        setError("La version no debe superar los 9 caracteres");
        setTimeout(() => {
          setError("");
        }, 5000);
      } else if (author.length > 15) {
        setError("el autor no debe superar los 15 caracteres");
        setTimeout(() => {
          setError("");
        }, 5000);
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
    error,
    setTitle,
    setDescription,
    setAuthor,
    setError,
    setVersion,
    handleCreate,
  };
};

export default useCreateProject;
