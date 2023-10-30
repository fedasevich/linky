import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "../../hooks/redux";
import { HomeScreenName } from "../../libs/enums/Home/HomeScreenName";
import { RootScreenName } from "../../libs/enums/RootScreenName";
import { isErrorWithMessage } from "../../libs/helpers/isErrorWithMessage";
import { isFetchBaseQueryError } from "../../libs/helpers/isFetchBaseQueryError";
import { RootStackParamList } from "../../libs/types/Routes/RootStackParamList.type";
import { FetchError } from "../../store/api";
import { userApi } from "../../store/reducers/user/UserApi";
import { setCredentials } from "../../store/reducers/user/UserSlice";

type FormData = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isLogin, setIsLogin] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: "testing@gmail.com", password: "1234" },
  });

  const [signIn, { isLoading: signInIsLoading }] = userApi.useSignInMutation();
  const [signUp, { isLoading: signUpIsLoading }] = userApi.useSignUpMutation();

  const handleLogin = async (formData: FormData) => {
    await signIn(formData)
      .unwrap()
      .then((data) => {
        Toast.show({
          type: "success",
          text1: "Successfully signed in.",
        });
        dispatch(setCredentials(data));
        navigation.navigate(RootScreenName.HOME, {
          screen: HomeScreenName.HOME,
        });
      })
      .catch((error) => {
        if (isErrorWithMessage(error)) {
          Toast.show({ type: "error", text1: error.message });
        } else if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : (error as FetchError).data.message;
          Toast.show({ type: "error", text1: errMsg });
        }
      });
  };

  const handleRegistration = async (formData: FormData) => {
    await signUp(formData)
      .unwrap()
      .then((data) => {
        Toast.show({
          type: "success",
          text1: "Account was successfully created.",
        });
        dispatch(setCredentials(data));
        navigation.navigate(RootScreenName.HOME, {
          screen: HomeScreenName.HOME,
        });
      })
      .catch((error) => {
        if (isErrorWithMessage(error)) {
          Toast.show({ type: "error", text1: error.message });
        } else if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : (error as FetchError).data.message;
          Toast.show({ type: "error", text1: errMsg });
        }
      });
  };

  const onSubmit = (data: FormData) => {
    if (isLogin) {
      handleLogin(data);
    } else {
      handleRegistration(data);
    }
  };

  const handleLoginToggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <View className="text-white flex-1 justify-center items-center w-full">
      <View className="w-full p-5">
        <Text className="text-white text-3xl mb-3 font-bold">
          {isLogin ? "Sign In" : "Sign Up"}
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              className="bg-neutral-600 px-3 py-2 rounded-lg text-white mb-3"
              placeholderTextColor={"#FFFFFF"}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email",
            },
          }}
        />
        {errors.email && (
          <Text className="text-red-600 mb-3">
            {errors.email.message as string}
          </Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              className="bg-neutral-600 px-3 py-2 rounded-lg text-white mb-3"
              placeholderTextColor={"#FFFFFF"}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry
            />
          )}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters",
            },
          }}
        />
        {errors.password && (
          <Text className="text-red-600 mb-3">
            {errors.password.message as string}
          </Text>
        )}

        {/* <Text className="text-white">
          <Link to={RESET_PASSWORD_ROUTE}>Forgot password?</Link>
        </Text> */}

        <Button
          title={isLogin ? "Sign In" : "Sign Up"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <View>
        <View className="text-whit flex items-center justify-center flex-row gap-1">
          {isLogin ? (
            <>
              <Text className="text-white">Don't have an account?</Text>
              <TouchableOpacity onPress={handleLoginToggle} className="p-0 m-0">
                <Text className="text-white font-bold">Sign Up</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text className="text-white">Have an account?</Text>
              <TouchableOpacity onPress={handleLoginToggle}>
                <Text className="text-white font-bold">Sign In</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default AuthForm;
