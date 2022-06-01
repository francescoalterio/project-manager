import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import ErrorAlert from "../components/ErrorAlert";
import useCreateProject from "../hooks/useCreateProject";

const CreateProject = ({ navigation }) => {
  const {
    title,
    description,
    version,
    author,
    error,
    setTitle,
    setDescription,
    setAuthor,
    setVersion,
    handleCreate,
  } = useCreateProject(navigation);

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
