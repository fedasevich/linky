import { AuthScreen } from "../../screens/AuthScreen";
import { HomeScreen } from "../../screens/HomeScreen";
import { RootScreenName } from "../enums/RootScreenName";
import { RootStackParamList } from "../types/Routes/RootStackParamList.type";

export type NavigationScreen = {
  name: keyof RootStackParamList;
  component: React.ComponentType;
};

export const navigationScreens = [
  {
    name: RootScreenName.HOME,
    component: HomeScreen,
  },
  {
    name: RootScreenName.AUTH,
    component: AuthScreen,
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
