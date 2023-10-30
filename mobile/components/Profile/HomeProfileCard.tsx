import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ProfileScreenName } from "../../libs/enums/Profile/ProfileScreenName";
import { RootScreenName } from "../../libs/enums/RootScreenName";
import { RootStackParamList } from "../../libs/types/Routes/RootStackParamList.type";
import { profileApi } from "../../store/reducers/profile/ProfileApi";
import { CreateProfilePrompt } from "./CreateProfilePrompt";

export function HomeProfileCard() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userReducer.user);
  const { data: profile, isLoading } = profileApi.useGetOwnProfileByUserIdQuery(
    user?.id as number
  );
  console.log(profile);
  if (isLoading) {
    return <ActivityIndicator />;
  }

  const handleProfilePress = () => {
    navigation.navigate(RootScreenName.PROFILE, {
      screen: ProfileScreenName.USER_PROFILE,
    });
  };

  return (
    <View>
      {profile ? (
        <View className="flex justify-center items-center">
          <Text className="text-white text-2xl font-bold mb-2">
            Change your profile:
          </Text>
          <TouchableOpacity
            onPress={handleProfilePress}
            className="border border-1 border-white w-2/3 rounded-lg text-center"
          >
            <Text className="text-white text-xl font-bold px-3 py-2">
              @{profile.name}
            </Text>
            <View className="bg-white px-3 py-2 rounded-b-lg">
              <Text numberOfLines={1}>Description: {profile.description}</Text>
              <Text>Links quantity: {profile.links.length}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <CreateProfilePrompt />
      )}
    </View>
  );
}
