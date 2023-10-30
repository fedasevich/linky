import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { HomeScreen } from "../../screens/HomeScreen";
import { ProfileScreen } from "../../screens/ProfileScreen";
import { RootScreenName } from "../enums/RootScreenName";
import { RootStackParamList } from "../types/Routes/RootStackParamList.type";

export type NavigationScreen = {
  name: keyof RootStackParamList;
  component: React.ComponentType;
  tabIcon: IconDefinition;
};

export const navigationScreens = [
  {
    name: RootScreenName.HOME,
    component: HomeScreen,
    tabIcon: faHouse,
  },
  {
    name: RootScreenName.PROFILE,
    component: ProfileScreen,
    tabIcon: faUser,
    headerShown: false,
  },
  // {
  //   name: RootScreenName.CONTACTS,
  //   component: ContactsScreen,
  // },
  // {
  //   name: RootScreenName.GALLERY,
  //   component: GalleryScreen,
  // },
  // {
  //   name: RootScreenName.TODO_LIST,
  //   component: TodoList,
  // },
];
