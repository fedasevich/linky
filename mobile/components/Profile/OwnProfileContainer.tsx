import { View } from "react-native";
import { useAppSelector } from "../../hooks/redux";
import { profileApi } from "../../store/reducers/profile/ProfileApi";
import { CreateProfilePrompt } from "./CreateProfilePrompt";
import { Profile } from "./Profile";

export function OwnProfileContainer() {
  const user = useAppSelector((state) => state.userReducer.user);

  const {
    data: profile,
    error,
    isLoading,
  } = profileApi.useGetOwnProfileByUserIdQuery(user?.id as number);

  return (
    <>
      {profile ? (
        <Profile profile={profile} />
      ) : (
        <View className="flex flex-1 justify-center items-center">
          <CreateProfilePrompt />
        </View>
      )}
    </>
  );
}
