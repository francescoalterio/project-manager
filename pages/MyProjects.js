import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import BtnProject from "../components/BtnProject";

const MyProjects = () => {
  const projects = useSelector((state) => state.myProjects.value);

  return (
    <View style={styles.container}>
      <View style={styles.flatlist}>
        <FlatList
          data={projects}
          renderItem={({ item }) => (
            <BtnProject
              title={item.title}
              version={item.version}
              id={item.id}
              author={item.author}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
    paddingBottom: 20,
  },

  flatlist: {
    backgroundColor: "#fff",
    width: "90%",
  },
});

export default MyProjects;
