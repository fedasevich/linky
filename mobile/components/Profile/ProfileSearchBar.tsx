import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "../../hooks/redux";
import { HomeScreenName } from "../../libs/enums/Home/HomeScreenName";
import { RootScreenName } from "../../libs/enums/RootScreenName";
import { isErrorWithMessage } from "../../libs/helpers/isErrorWithMessage";
import { isFetchBaseQueryError } from "../../libs/helpers/isFetchBaseQueryError";
import { RootStackParamList } from "../../libs/types/Routes/RootStackParamList.type";
import { FetchError } from "../../store/api";
import { profileApi } from "../../store/reducers/profile/ProfileApi";

export function ProfileSearchBar() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [getProfileByUserName, { isLoading: signUpIsLoading }] =
    profileApi.useLazyGetProfileByUserNameQuery();

  const onSubmit = async () => {
    const searchQuery = getValues("searchInput") as string;
    console.log("Search Data:", searchQuery);

    await getProfileByUserName(searchQuery)
      .unwrap()
      .then((profile) => {
        navigation.navigate(RootScreenName.HOME, {
          screen: HomeScreenName.SOMEONES_PROFILE,
          params: { params: { searchQuery, profile } },
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
    <View className="mb-16">
      <Text className="text-white text-2xl font-bold mb-2">
        Look up someone's profile:
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          paddingHorizontal: 10,
        }}
      >
        <FontAwesome name="at" size={24} color="white" />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="flex-1 p-2 text-white text-lg"
              placeholder="Search"
              placeholderTextColor={"white"}
              onChangeText={onChange}
              onSubmitEditing={onSubmit}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="searchInput"
          defaultValue=""
          rules={{
            required: "Profile name is required",
            minLength: {
              value: 2,
              message: "Profile name must be at least 2 characters",
            },
          }}
        />
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <FontAwesome name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {errors.searchInput && (
        <Text className="text-red-600 my-2">
          {errors.searchInput.message as string}
        </Text>
      )}
    </View>
  );
}
