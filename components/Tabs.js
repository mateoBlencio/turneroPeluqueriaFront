import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

// screens
import HomeScreen from "./screens/HomeScreen";
import Settings from "./screens/Settings";
import TurnosAntiguos from "./screens/TurnosAntiguos";
import PeluqueroHome from "./screens/PeluqueroHome";

// Icons
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function MyTabs({ route }) {
  const { authority } = route.params;
  const initialRouteName =
    authority === "Peluquero" ? "PeluqueroHome" : "HomeScreen";
  const mostrarPeluqueroHome = authority === "Peluquero" ? true : false;

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerTitleAlign: "center" }}
      sceneContainerStyle={{ backgroundColor: "#D9D9D9" }}
    >
      {mostrarPeluqueroHome ? (
        <Tab.Screen
          name="PeluqueroHome"
          component={PeluqueroHome}
          options={{
            tabBarIcon: ({ size }) => (
              <Entypo name="home" size={size} color={"#404040"} />
            ),
            title: "Inicio",
            tabBarActiveBackgroundColor: "#A6A6A6",
            tabBarActiveTintColor: "#404040",
          }}
        />
      ) : (
        <>
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ size }) => (
                <Entypo name="home" size={size} color={"#404040"} />
              ),
              title: "Inicio",
              tabBarActiveBackgroundColor: "#A6A6A6",
              tabBarActiveTintColor: "#404040",
            }}
          />
          <Tab.Screen
            name="TurnosAntiguos"
            component={TurnosAntiguos}
            options={{
              tabBarIcon: ({ size }) => (
                <Entypo name="ticket" size={size} color={"#404040"} />
              ),
              title: "Mis turnos",
              tabBarActiveBackgroundColor: "#A6A6A6",
              tabBarActiveTintColor: "#404040",
            }}
          />
        </>
      )}

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ size }) => (
            <Ionicons name="settings-sharp" size={size} color={"#404040"} />
          ),
          title: "Configuraciones",
          tabBarActiveBackgroundColor: "#A6A6A6",
          tabBarActiveTintColor: "#404040",
        }}
      />
    </Tab.Navigator>
  );
}
