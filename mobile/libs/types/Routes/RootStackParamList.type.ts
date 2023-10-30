import { NavigatorScreenParams } from "@react-navigation/native";
import { RootScreenName } from "../../enums/RootScreenName";
import { HomeStackParamList } from "./HomeStackParamList.type";
import { ProfileStackParamList } from "./ProfileStackParamList.type";

export type RootStackParamList = {
  [RootScreenName.HOME]: NavigatorScreenParams<HomeStackParamList>;
  [RootScreenName.PROFILE]: NavigatorScreenParams<ProfileStackParamList>;
};
