import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const Project = ({ route }) => {
  const projects = useSelector((state) => state.myProjects.value);
  const [project, setProject] = useState({});

  useEffect(() => {
    setProject(projects.find((project) => project.id === route.params.id));
  }, [projects]);

  return (
    <View>
      <Text>{project.title}</Text>
      <Text>{project.version}</Text>
      <Text>{project.author}</Text>
      <Text>{project.id}</Text>
      <Text>{project.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Project;
