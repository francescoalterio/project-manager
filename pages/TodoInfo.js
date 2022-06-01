import {
  View,
  Text,
  Button,
  Alert,
  TextInput,
  Switch,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import useTodoInfo from "../hooks/useTodoInfo";

const TodoInfo = ({ route, navigation }) => {
  const {
    title,
    description,
    isEnabled,
    isCompleted,
    setTitle,
    setDescription,
    toggleSwitch,
    handleDeleteTask,
    handleCompleteTask,
    handleEditTask,
  } = useTodoInfo(navigation, route);

  return (
    <View style={styles.container}>
      {isCompleted ? (
        <>
          <Text style={styles.field}>Titulo: </Text>
          <View style={styles.titleField}>
            <Text>{title}</Text>
          </View>
          <Text style={styles.field}>Descripcion: </Text>
          <View style={styles.safeAreaContainer}>
            <SafeAreaView styles={styles.safeArea}>
              <ScrollView style={styles.scrollView}>
                <Text>{description}</Text>
              </ScrollView>
            </SafeAreaView>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.field}>Titulo: </Text>
          <TextInput
            style={styles.inputTitle}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          {!isCompleted ? (
            <View style={styles.switchBox}>
              <Text style={styles.field}>Importancia: </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={styles.switch}
              />
            </View>
          ) : undefined}
          <Text style={styles.field}>Descripcion: </Text>
          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={styles.inputDescription}
            multiline={true}
          />
        </>
      )}

      <View style={styles.buttonBox}>
        <Button
          title="Eliminar Tarea"
          color="#ff3636"
          onPress={handleDeleteTask}
        />

        {!isCompleted ? (
          <>
            <Button
              title="Editar Tarea"
              color="#228b22"
              onPress={handleEditTask}
            />
            <Button title="Completar Tarea" onPress={handleCompleteTask} />
          </>
        ) : undefined}
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
    flex: 1,
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  titleField: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    justifyContent: "center",
  },
  safeAreaContainer: {
    width: "100%",
    height: "50%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    textAlignVertical: "top",
  },
});

export default TodoInfo;
