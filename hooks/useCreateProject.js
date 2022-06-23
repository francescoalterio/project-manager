import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { addDataStorage, editProjectStorage } from "../utils/dataStorage";
import { useDispatch } from "react-redux";
import { addProject, editProject } from "../store/myProjects/myProjectsSlice";

import { useInterstitialAd, TestIds } from "react-native-google-mobile-ads";

const useCreateProject = (navigation, route) => {
  const [title, setTitle] = useState(
    route.params.edit ? route.params.project.title : ""
  );
  const [description, setDescription] = useState(
    route.params.edit ? route.params.project.description : ""
  );
  const [version, setVersion] = useState(
    route.params.edit ? route.params.project.version : ""
  );
  const [author, setAuthor] = useState(
    route.params.edit ? route.params.project.author : ""
  );

  const dispatch = useDispatch();

  //ads
  const { isLoaded, isClosed, load, show } = useInterstitialAd(
    "ca-app-pub-6947784507365792/3668508384",
    {
      requestNonPersonalizedAdsOnly: true,
    }
  );

  useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      // Action after the ad is closed
      navigation.navigate("Mis Proyectos Page");
    }
  }, [isClosed, navigation]);

  const handleCreate = async () => {
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
        if (isLoaded) {
          show();
        } else {
          // No advert ready to show yet
          navigation.navigate("Mis Proyectos Page");
        }
      }
    }
  };

  const handleEdit = () => {
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
        const projectEdited = {
          ...route.params.project,
          title,
          description,
          version,
          author,
        };
        editProjectStorage(projectEdited);
        dispatch(editProject(projectEdited));
        navigation.navigate("Proyecto Page", { id: projectEdited.id });
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
    handleEdit,
  };
};

export default useCreateProject;
