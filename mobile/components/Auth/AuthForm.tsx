import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isLogin, setIsLogin] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [signIn, { isLoading: signInIsLoading }] = userApi.useSignInMutation();
  const [signUp, { isLoading: signUpIsLoading }] = userApi.useSignUpMutation();

  const handleLogin = async (formData: FormData) => {
    await signIn(formData)
      .unwrap()
      .then((data) => {
        console.log("asdasd" + JSON.stringify(data));
        dispatch(setCredentials(data));
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        if (isErrorWithMessage(error)) {
          Toast.show({ type: "success", text1: error.message });
        } else if (isFetchBaseQueryError(error)) {
          const errMsg =
            "error" in error ? error.error : (error as FetchError).data.message;
          Toast.show({ type: "success", text1: errMsg });
        }
      });
  };

  const handleRegistration = async (formData: FormData) => {
    await signUp(formData)
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View className="bg-red-100">
        <Text>{isLogin ? "Login" : "Sign Up"}</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
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
          <Text style={{ color: "red" }}>{errors.email.message as string}</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
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
          <Text style={{ color: "red" }}>
            {errors.password.message as string}
          </Text>
        )}

        {/* <Text>
          <Link to={RESET_PASSWORD_ROUTE}>Forgot password?</Link>
        </Text> */}

        <Button
          title={isLogin ? "Sign In" : "Sign Up"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <View>
        {/* <Text>
          {isLogin ? (
            <Text>
              Don't have an account? <Link to={SIGN_UP_ROUTE}>Sign Up</Link>
            </Text>
          ) : (
            <Text>
              Have an account? <Link to={SIGN_IN_ROUTE}>Sign In</Link>
            </Text>
          )}
        </Text> */}
      </View>
    </View>
  );
};

export default AuthForm;
