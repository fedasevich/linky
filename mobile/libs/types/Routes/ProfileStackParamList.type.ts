import { ProfileScreenName } from "../../enums/Profile/ProfileScreenName";

export type ProfileStackParamList = {
  [ProfileScreenName.AUTH]: undefined;
  [ProfileScreenName.CREATE_PROFILE]: undefined;
  [ProfileScreenName.USER_PROFILE]: undefined;
  [ProfileScreenName.CREATE_LINK]: undefined;
};
