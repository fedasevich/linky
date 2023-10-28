import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";
import AuthForm from "../components/Auth/AuthForm";

export function AuthScreen() {
  const set = async () => {
    try {
      await AsyncStorage.setItem("test", "test12123123");
      console.log("Token saved successfully");
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const get = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("test");

      console.log("Stored Token:", storedToken);
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  return (
    <>
      <AuthForm />
      <Button title="get" onPress={get} />
      <Button title="set" onPress={set} />
    </>
  );
}
