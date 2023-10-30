import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthForm from "../components/Auth/AuthForm";
import { CreateLinkForm } from "../components/Profile/CreateLinkForm";
import { OwnProfileContainer } from "../components/Profile/OwnProfileContainer";
import { ProfileCreateForm } from "../components/Profile/ProfileCreateForm";
import { useAppSelector } from "../hooks/redux";
import { ProfileScreenName } from "../libs/enums/Profile/ProfileScreenName";

const ProfileStack = createNativeStackNavigator();

export function ProfileScreen() {
  const user = useAppSelector((state) => state.userReducer.user);

  return (
    <ProfileStack.Navigator>
      {user ? (
        <ProfileStack.Screen
          name={ProfileScreenName.USER_PROFILE}
          options={{ title: "Your own profile" }}
          component={OwnProfileContainer}
        />
      ) : (
        <ProfileStack.Screen
          name={ProfileScreenName.AUTH}
          component={AuthForm}
        />
      )}

      <ProfileStack.Screen
        name={ProfileScreenName.CREATE_PROFILE}
        component={ProfileCreateForm}
      />
      <ProfileStack.Screen
        name={ProfileScreenName.CREATE_LINK}
        component={CreateLinkForm}
      />
    </ProfileStack.Navigator>
  );
}
