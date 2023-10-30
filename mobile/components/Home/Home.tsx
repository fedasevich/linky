import { Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logOut } from "../../store/reducers/user/UserSlice";
import { HomeProfileCard } from "../Profile/HomeProfileCard";
import { ProfileSearchBar } from "../Profile/ProfileSearchBar";

export function Home() {
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();
  return (
    <>
      <View className="text-white flex-1 flex justify-center items-center">
        <ProfileSearchBar />
        {user && <HomeProfileCard />}

        <TouchableHighlight onPress={() => dispatch(logOut())}>
          <Text className="text-white border p-5 border-white">Logout</Text>
        </TouchableHighlight>
      </View>
    </>
  );
}
