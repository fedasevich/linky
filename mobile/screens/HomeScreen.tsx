import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { Home } from "../components/Home/Home";
import { SomeonesProfile } from "../components/Home/SomeonesProfile";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { HomeScreenName } from "../libs/enums/Home/HomeScreenName";
import { isErrorWithMessage } from "../libs/helpers/isErrorWithMessage";
import { isFetchBaseQueryError } from "../libs/helpers/isFetchBaseQueryError";
import { HomeStackParamList } from "../libs/types/Routes/HomeStackParamList.type";
import { FetchError } from "../store/api";
import { userApi } from "../store/reducers/user/UserApi";
import { logOut, setCredentials } from "../store/reducers/user/UserSlice";

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
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
          console.log("new" + token);
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

  console.log("user" + user);

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={HomeScreenName.HOME}
        component={Home}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name={HomeScreenName.SOMEONES_PROFILE}
        options={({
          route: {
            params: {
              params: { searchQuery },
            },
          },
        }) => ({ title: `@${searchQuery} profile` })}
        component={SomeonesProfile}
      />
    </HomeStack.Navigator>
  );
}
