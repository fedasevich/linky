import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import colors from "tailwindcss/colors";
import { navigationScreens } from "./libs/constants/navigationScreens";
import { setupStore } from "./store/store";

const store = setupStore();

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.sky[500],
    background: colors.neutral[900],
    text: colors.white,
    card: colors.neutral[800],
  },
};

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar animated={true} backgroundColor={colors.neutral[800]} />
        <NavigationContainer theme={CustomTheme}>
          <Provider store={store}>
            <Tab.Navigator initialRouteName={navigationScreens[0].name}>
              {navigationScreens.map(
                ({ name, component, tabIcon, headerShown }) => (
                  <Tab.Screen
                    name={name}
                    component={component}
                    key={name}
                    options={() => ({
                      headerShown,
                      tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon
                          color={color}
                          size={size}
                          icon={tabIcon}
                        />
                      ),
                    })}
                  />
                )
              )}
            </Tab.Navigator>
          </Provider>
        </NavigationContainer>

        <Toast />
      </GestureHandlerRootView>
    </>
  );
}
