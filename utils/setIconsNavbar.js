import Ionicons from "react-native-vector-icons/Ionicons";

export const setIconsNavbar = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Inicio") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name === "Mis Proyectos") {
      iconName = focused ? "briefcase" : "briefcase-outline";
    } else if (route.name === "Mis Tareas") {
      iconName = focused ? "list" : "list-outline";
    } else if (route.name === "Configuracion") {
      iconName = focused ? "settings" : "settings-outline";
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: "#3483eb",
  tabBarInactiveTintColor: "gray",
});
