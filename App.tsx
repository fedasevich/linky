import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import BottomPanel from "./components/BottomPanel";
import { Cart } from "./components/Cart";
import { setupStore } from "./store/store";

const store = setupStore();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
        <View style={styles.content}></View>
        <Cart />
      </SafeAreaView>
      <BottomPanel />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  content: {
    paddingTop: 30,
  },
});
