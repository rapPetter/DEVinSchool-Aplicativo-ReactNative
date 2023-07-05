import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthContext from "./src/contexts/AuthContext";
import TelaInicial from "./src/screens/TelaInicial";
import Login from "./src/screens/Login";
import Profile from "./src/screens/Profile";
import Home from "./src/screens/Home";
import Course from "./src/screens/Course";
import CursosSalvos from "./src/screens/CursosSalvos";
import CursosRecentes from "./src/screens/CursosRecentes";
import UserDataUpdate from "./src/screens/UserDataUpdate";
import CourseList from "./src/screens/CourseList";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getDataLocal } from "./src/services/LocalStorage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [context, setContext] = useState([]);
  const [authGuard, setAuthGuard] = useState(false);

  useEffect(() => {
    getDataLocal("token").then((token) => {
      if (token) {
        setAuthGuard(true);
      } else {
        setAuthGuard(false);
      }
    });
  }, []);

  const HomeTab = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" color={color} size={size} />
            ),
          }}
          name="Cursos Favoritos"
          component={CursosSalvos}
        />
        
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time-outline" color={color} size={size} />
            ),
          }}
          name="Cursos Recentes"
          component={CursosRecentes}
        />

        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-person" color={color} size={size} />
            ),
          }}
          name="Perfil"
          component={Profile}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ context, setContext }}>
        <Stack.Navigator initialRouteName="TelaInicial">
          <Stack.Screen
            options={{ headerShown: false }}
            name="TelaInicial"
            component={TelaInicial}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          {authGuard ? (
            <>
              <Stack.Screen
                options={{ headerShown: false, gestureEnabled: false }}
                name="HomeTab"
                component={HomeTab}
              />
              <Stack.Screen
                options={{ headerTitle: "Detalhes do curso" }}
                name="Course"
                component={Course}
              />
              <Stack.Screen
                options={{ headerTitle: "Lista de cursos" }}
                name="CourseList"
                component={CourseList}
              />
              <Stack.Screen
                options={{ headerTitle: "Atualize seus dados" }}
                name="UserDataUpdate"
                component={UserDataUpdate}
              />
            </>
          ) : null}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
