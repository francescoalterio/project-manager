import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import useInizializedApp from "../hooks/useInizializedApp";

const Home = ({ navigation }) => {
  useInizializedApp();

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  boxBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});

export default Home;
