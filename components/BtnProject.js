import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BtnProject = ({ title, version, id, author, completed }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Proyecto Page", { id });
  };
  return completed ? (
    <View style={[styles.button, { borderColor: "#4287f5" }]}>
      <View>
        <Text>{title}</Text>
        <Text>{author}</Text>
        <Text>{version}</Text>
      </View>
    </View>
  ) : (
    <TouchableOpacity onPress={handlePress} style={[styles.button]}>
      <View>
        <Text>{title}</Text>
        <Text>{author}</Text>
        <Text>{version}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 2,
  },
});

export default BtnProject;
