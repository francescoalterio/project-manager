import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Todo = ({ id, title, important, handler, completed }) => {
  return (
    <TouchableOpacity
      style={
        completed
          ? [styles.container, { backgroundColor: "#427bf5" }]
          : important
          ? [
              styles.container,
              { borderColor: "#f59e0b", backgroundColor: "#f59e0b" },
            ]
          : [styles.container, { borderWidth: 2 }]
      }
      onPress={() => handler(id)}
    >
      {completed ? (
        <View style={[styles.circle, { backgroundColor: "#fff" }]}>
          <Ionicons name="checkmark-outline" size={25} color="#427bf5" />
        </View>
      ) : important ? (
        <View style={[styles.circle, { backgroundColor: "#fff" }]}>
          <Ionicons name="alert-outline" size={20} color="#f59e0b" />
        </View>
      ) : (
        <View style={styles.circle}>
          <Ionicons name="reader-outline" size={25} color="#3b3b3b" />
        </View>
      )}
      <Text
        style={
          completed
            ? [styles.title, { color: "#fff" }]
            : important
            ? [styles.title, { color: "#fff" }]
            : [styles.title]
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
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
