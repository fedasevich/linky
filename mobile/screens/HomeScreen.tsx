import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { isErrorWithMessage } from "../libs/helpers/isErrorWithMessage";
import { isFetchBaseQueryError } from "../libs/helpers/isFetchBaseQueryError";
import { RootStackParamList } from "../libs/types/Routes/RootStackParamList.type";
import { FetchError } from "../store/api";
import { userApi } from "../store/reducers/user/UserApi";
import { logOut, setCredentials } from "../store/reducers/user/UserSlice";

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userReducer.user);

  const [isLoading, setIsLoading] = useState(true);
  const [check] = userApi.useLazyCheckQuery();

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      console.log("Stored Token12:", token);
      console.log("TOKEN   " + JSON.stringify(token));

      if (!token) {
        return setIsLoading(false);
      }

      check()
        .unwrap()
        .then(({ token }) => {
          console.log("new  " + token);
          dispatch(
            setCredentials({
              token,
            })
          );
        })
        .catch((error) => {
          if (isErrorWithMessage(error)) {
            Toast.show({ type: "error", text1: error.message });
          } else if (isFetchBaseQueryError(error)) {
            const errMsg =
              "error" in error
                ? error.error
                : (error as FetchError).data.message;
            Toast.show({ type: "error", text1: errMsg });
          }
          dispatch(logOut());
        })
        .finally(() => setIsLoading(false));
    });
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <Button title={"SignUp"} onPress={() => navigation.navigate("Auth")} />
      <Text>{user?.id}</Text>
    </>
  );
}
