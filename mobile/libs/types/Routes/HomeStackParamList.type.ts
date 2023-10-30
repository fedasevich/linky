import { HomeScreenName } from "../../enums/Home/HomeScreenName";
import { Profile } from "../Profile/Profile";

export type HomeStackParamList = {
  [HomeScreenName.HOME]: undefined;
  [HomeScreenName.SOMEONES_PROFILE]: {
    params: {
      profile: Profile;
      searchQuery: string;
    };
  };
};
