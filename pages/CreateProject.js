import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { addDataStorage } from "../utils/dataStorage";
import { useDispatch } from "react-redux";
import { addProject } from "../store/myProjects/myProjectsSlice";
import ErrorAlert from "../components/ErrorAlert";

const CreateProject = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
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
      {error ? <ErrorAlert error={error} /> : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreateProject;
