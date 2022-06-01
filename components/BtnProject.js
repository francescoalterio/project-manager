import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const BtnProject = ({ title, version, id, author, completed }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Proyecto Page", { id });
  };
  return completed ? (
    <View style={[styles.button, { backgroundColor: "#4287f5" }]}>
      <View style={styles.iconBox}>
        <View style={styles.circleIcon}>
          <Ionicons name="checkmark" size={45} color="#4287f5" />
        </View>
      </View>
      <View style={styles.infoBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.extraInfoBox}>
          <Text style={styles.extraInfo}>{author}</Text>
          <Text style={styles.extraInfo}>{version}</Text>
        </View>
      </View>
    </View>
  ) : (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.button, { backgroundColor: "#f59e0b" }]}
    >
      <View style={styles.iconBox}>
        <View style={styles.circleIcon}>
          <Ionicons name="flask" size={45} color="#f59e0b" />
        </View>
      </View>
      <View style={styles.infoBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.extraInfoBox}>
          <Text style={styles.extraInfo}>{author}</Text>
          <Text style={styles.extraInfo}>{version}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 100,
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    padding: 10,
  },
  iconBox: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  infoBox: {
    width: "75%",
    justifyContent: "space-evenly",
  },
  circleIcon: {
    borderRadius: 50,
    padding: 15,
    backgroundColor: "#fff",
  },
  titleBox: {
    width: "100%",
    paddingLeft: 10,
  },
  extraInfoBox: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },

  title: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
  },
  extraInfo: {
    fontSize: 17,
    color: "#fff",
  },
});

export default BtnProject;
