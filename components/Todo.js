import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Todo = ({ id, title, important }) => {
  return (
    <TouchableOpacity
      style={
        important
          ? [styles.container, { borderColor: "#ff8c00" }]
          : [styles.container]
      }
    >
      {important ? (
        <View style={[styles.circle, { backgroundColor: "#ff8c00" }]}>
          <Ionicons name="alert-outline" size={20} color="#fff" />
        </View>
      ) : (
        <View style={styles.circle}>
          <Ionicons name="reader-outline" size={25} color="#3b3b3b" />
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#3b3b3b",
  },

  circle: {
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    marginLeft: 10,
    color: "#3b3b3b",
  },
});

export default Todo;
