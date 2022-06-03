import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const BoxInfo = ({ title, color, icon, data }) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.boxIcon}>
        <View style={[styles.circle, { backgroundColor: color + "26" }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
      </View>
      <View style={styles.boxData}>
        <Text style={styles.data}>{data}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "47%",
    height: 80,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 10,
    textAlign: "center",
    color: "#707070",
  },
  data: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#3b3b3b",
  },
  boxIcon: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  boxData: {
    width: "75%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  circle: {
    borderRadius: 50,
    padding: 7,
  },
});

export default BoxInfo;
