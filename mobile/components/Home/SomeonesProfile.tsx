import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../libs/types/Routes/HomeStackParamList.type";
import { Profile } from "../Profile/Profile";

export function SomeonesProfile({
  route,
}: NativeStackScreenProps<HomeStackParamList, "SomeonesProfile">) {
  const {
    params: {
      params: { profile },
    },
  } = route;

  return (
    <>
      <Profile profile={profile} />
    </>
  );
}
