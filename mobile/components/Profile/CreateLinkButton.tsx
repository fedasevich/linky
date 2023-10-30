import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ProfileScreenName } from "../../libs/enums/Profile/ProfileScreenName";
import { RootScreenName } from "../../libs/enums/RootScreenName";
import { RootStackParamList } from "../../libs/types/Routes/RootStackParamList.type";

export function CreateLinkButton() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleButtonPress = () => {
    navigation.navigate(RootScreenName.PROFILE, {
      screen: ProfileScreenName.CREATE_LINK,
    });
  };

  return (
    <View className="mb-4">
      <TouchableOpacity
        className={`flex flex-row justify-center items-center py-3 px-4 rounded-lg border border-1 border-green-500`}
        onPress={handleButtonPress}
      >
        <View className="flex flex-row justify-center items-center">
          <FontAwesomeIcon
            icon={faPlusSquare}
            size={24}
            color="rgb(34 197 94)"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
