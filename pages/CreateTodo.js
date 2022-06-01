import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  StyleSheet,
} from "react-native";

import useCreateTodo from "../hooks/useCreateTodo";

const CreateTodo = ({ navigation, route }) => {
  const {
    title,
    description,
    isEnabled,
    setTitle,
    setDescription,
    addTaskHandler,
    toggleSwitch,
  } = useCreateTodo(navigation, route);

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
    fontSize: 17,
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
    height: "60%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
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
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});

export default CreateTodo;
