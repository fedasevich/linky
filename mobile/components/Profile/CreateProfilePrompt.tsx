import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { ProfileScreenName } from "../../libs/enums/Profile/ProfileScreenName";
import { RootScreenName } from "../../libs/enums/RootScreenName";
import { RootStackParamList } from "../../libs/types/Routes/RootStackParamList.type";

export function CreateProfilePrompt() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleCreateProfilePress = () => {
    navigation.navigate(RootScreenName.PROFILE, {
      screen: ProfileScreenName.CREATE_PROFILE,
    });
  };

  return (
    <>
      <Text className="text-white text-2xl font-bold mb-2">
        You don't have profile:
      </Text>
      <TouchableOpacity onPress={handleCreateProfilePress}>
        <Text className="text-white border border-1 border-white px-3 py-2 rounded-lg bg-black font-bold text-lg text-center">
          Create profile
        </Text>
      </TouchableOpacity>
    </>
  );
}
