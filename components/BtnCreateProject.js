import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const BtnCreateProject = () => {
  const navigation = useNavigation();

  const createProjectHandle = () => {
    navigation.navigate("Crear Proyecto Page");
  };
  return (
    <View style={styles.container}>
      <Button title="crear" onPress={createProjectHandle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
  },
});
