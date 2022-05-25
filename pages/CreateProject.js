import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { setDataStorage } from "../utils/dataStorage";
import { useDispatch } from "react-redux";
import { addProject } from "../store/myProjects/myProjectsSlice";
import { useNavigation } from "@react-navigation/native";

const CreateProject = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("");
  const [author, setAuthor] = useState("");

  const dispatch = useDispatch();

  const handleCreate = () => {
    const project = {
      id: Date.now(),
      title,
      description,
      version,
      author,
      tasks: [],
    };
    setDataStorage("myProjects", project);
    dispatch(addProject(project));
    navigation.navigate("Mis Proyectos Page");
  };

  return (
    <View>
      <View>
        <Text>Nombre del proyecto:</Text>
        <TextInput
          placeholder="Mi Proyecto"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Text>Version:</Text>
        <TextInput
          placeholder="1.0.0"
          value={version}
          onChangeText={(text) => setVersion(text)}
        />
        <Text>Autor:</Text>
        <TextInput
          placeholder="Dan Abramov"
          value={author}
          onChangeText={(text) => setAuthor(text)}
        />
        <Text>Descripción:</Text>
        <TextInput
          placeholder="Descripcion del proyecto"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      <View>
        <Button title="Crear" onPress={handleCreate} />
      </View>
    </View>
  );
};

export default CreateProject;
