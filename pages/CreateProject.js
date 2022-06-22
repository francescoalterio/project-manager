import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import useCreateProject from "../hooks/useCreateProject";

const CreateProject = ({ navigation, route }) => {
  const {
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
  } = useCreateProject(navigation, route);

  return (
    <View style={styles.container}>
      <Text style={styles.field}>Nombre del proyecto:</Text>
      <TextInput
        placeholder="Mi Proyecto"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.inputTitle}
      />
      <Text style={styles.field}>Version:</Text>
      <TextInput
        placeholder="1.0.0"
        value={version}
        onChangeText={(text) => setVersion(text)}
        style={styles.inputSmall}
      />
      <Text style={styles.field}>Autor:</Text>
      <TextInput
        placeholder="Dan Abramov"
        value={author}
        onChangeText={(text) => setAuthor(text)}
        style={styles.inputSmall}
      />
      <Text style={styles.field}>Descripción:</Text>
      <TextInput
        multiline={true}
        placeholder="Descripcion del proyecto"
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={styles.inputDescription}
      />
      <View style={styles.buttonBox}>
        {route.params.edit ? (
          <Button title="Editar" onPress={handleEdit} />
        ) : (
          <Button title="Crear" onPress={handleCreate} />
        )}
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
    paddingLeft: 10,
  },
  inputSmall: {
    width: "50%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
  inputDescription: {
    width: "100%",
    height: "35%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    textAlignVertical: "top",
    padding: 10,
  },
  buttonBox: {
    marginTop: 10,
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});

export default CreateProject;
