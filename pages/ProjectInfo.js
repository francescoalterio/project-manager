import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";

const ProjectInfo = ({ id, description }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <Text style={styles.text}>{description}</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    width: "95%",
    height: "95%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: "#3b3b3b",
  },
});

export default ProjectInfo;
