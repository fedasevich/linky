import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { useAppSelector } from "../../hooks/redux";
import { ProfileScreenName } from "../../libs/enums/Profile/ProfileScreenName";
import { RootScreenName } from "../../libs/enums/RootScreenName";
import { isErrorWithMessage } from "../../libs/helpers/isErrorWithMessage";
import { isFetchBaseQueryError } from "../../libs/helpers/isFetchBaseQueryError";
import { RootStackParamList } from "../../libs/types/Routes/RootStackParamList.type";
import { FetchError } from "../../store/api";
import { profileApi } from "../../store/reducers/profile/ProfileApi";

type FormData = {
  name: string;
  description: string;
};

export function ProfileCreateForm() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const user = useAppSelector((state) => state.userReducer.user);
  const userId = user?.id as number;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [createProfile, { isLoading: signInIsLoading }] =
    profileApi.useCreateProfileMutation();

  const onSubmit = async (data: FormData) => {
    await createProfile({ ...data, userId })
      .unwrap()
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Profile was successfully created.",
        });

        navigation.navigate(RootScreenName.PROFILE, {
          screen: ProfileScreenName.USER_PROFILE,
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

  return (
    <View className="text-white flex-1 justify-start items-start w-full">
      <View className="w-full p-5">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Name"
              className="bg-neutral-600 px-3 py-2 rounded-lg text-white mb-3"
              placeholderTextColor={"#FFFFFF"}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="name"
          rules={{
            required: "Name is required",
            minLength: {
              value: 4,
              message: "Name must be at least 4 characters",
            },
          }}
        />
        {errors.name && (
          <Text className="text-red-600 mb-3">
            {errors.name.message as string}
          </Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Description"
              className="bg-neutral-600 px-3 py-2 rounded-lg text-white mb-3"
              placeholderTextColor={"#FFFFFF"}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="description"
          rules={{
            required: "Description is required",
            minLength: {
              value: 4,
              message: "Description must be at least 4 characters",
            },
          }}
        />
        {errors.description && (
          <Text className="text-red-600 mb-3">
            {errors.description.message as string}
          </Text>
        )}

        <Button title={"Create profile"} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
