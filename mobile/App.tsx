import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { navigationScreens } from "./libs/constants/navigationScreens";
import { setupStore } from "./store/store";

const store = setupStore();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator initialRouteName={navigationScreens[0].name}>
            {navigationScreens.map(({ name, component }) => (
              <Stack.Screen name={name} component={component} key={name} />
            ))}
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
      <Toast />
    </>
  );
}
