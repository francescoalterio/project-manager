import { View, Text } from "react-native";

const ProjectInfo = ({ id, description }) => {
  return (
    <View>
      <Text>Project Info</Text>
      <Text>{description}</Text>
    </View>
  );
};

export default ProjectInfo;
