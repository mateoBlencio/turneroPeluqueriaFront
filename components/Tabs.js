import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// screens
import HomeScreen from './screens/HomeScreen';
import Settings from './screens/Settings';

// Icons
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function MyTabs() {
  return (
    <Tab.Navigator initialRouteName='HomeScreen' screenOptions={{headerTitleAlign:"center"}}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} 
        options={{
            tabBarIcon: ({ color, size })=>(
              <Entypo name="home" size={size} color={color} />
            ),
            title:"Inicio",
          }}
      />
      <Tab.Screen name="Settings" component={Settings} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" size={size} color={color} />
          ),
          title:"Configuraciones"
        }}  
      />
    </Tab.Navigator>
  );
}