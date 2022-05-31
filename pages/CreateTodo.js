import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import ErrorAlert from "../components/ErrorAlert";
import { addProjectTask } from "../store/myProjects/myProjectsSlice";
import { addTaskStorage } from "../utils/dataStorage";

const CreateTodo = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const addTaskHandler = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    if (title.length === 0 || description.length === 0) {
      setError("Todos los campos son obligatorios");
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      if (title.length > 25) {
        setError("El titulo no debe superar los 25 caracteres");
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        const task = {
          projectId: route.params.projectId,
          id: Date.now(),
          title,
          description,
          important: isEnabled,
          date: `${day}-${month}-${year}`,
        };
        addTaskStorage("myProjects", task, "tasks");
        dispatch(addProjectTask(task));
        navigation.navigate("Proyecto Page", { id: route.params.projectId });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.field}>Titulo</Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Publicar el proyecto..."
        style={styles.inputTitle}
      />
      <View style={styles.switchBox}>
        <Text style={styles.field}>Tarea Importante</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
      </View>
      <Text style={styles.field}>Descripcion</Text>
      <TextInput
        multiline={true}
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Publicar el proyecto..."
        style={styles.inputDescription}
      />

      <View style={styles.buttonBox}>
        <Button title="Agregar Tarea" onPress={addTaskHandler} />
      </View>
      {error ? <ErrorAlert error={error} /> : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  field: {
    marginBottom: 10,
    fontSize: 20,
  },
  inputTitle: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  inputDescription: {
    width: "100%",
    height: "50%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    textAlignVertical: "top",
    padding: 10,
  },
  switchBox: {
    flexDirection: "row",

    alignItems: "center",
  },
  switch: {
    marginLeft: 10,
    marginBottom: 10,
  },
  buttonBox: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    marginBottom: 10,
  },
});

export default CreateTodo;
