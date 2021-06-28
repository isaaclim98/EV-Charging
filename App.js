import * as React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import LocationScreen from "./screens/LocationScreen";
import AccountScreen from "./screens/AccountScreen";

import { FontAwesome, FontAwesome5, Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            //Set the icon based on which route it is (name of the tab)
            if (route.name === "Home") {
              return <FontAwesome5 name="car-alt" size={size} color={color} />;
            } else if (route.name === "Location") {
              return <Entypo name="location-pin" size={size} color={color} />;
            } else if (route.name === "Account") {
              return <FontAwesome name="user" size={size} color={color} />;
            }
          },

          tabBarLabel: ({ focused, color, size }) => {
            //returns the route name only if this tab is focused
            return (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#4169E1",
                }}
              >
                {focused ? route.name : ""}
              </Text>
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "#4169E1",
          inactiveTintColor: "white",
          activeBackgroundColor: "white",
          inactiveBackgroundColor: "#4169E1",
          labelPosition: "below-icon",
        }}
      >
        <Tab.Screen name="Location" component={LocationScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
