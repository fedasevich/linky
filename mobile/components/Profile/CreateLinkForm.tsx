import { Picker } from "@react-native-picker/picker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { LinkTypesMapToButton } from "../../libs/enums/Profile/LinkTypes";
import { ProfileScreenName } from "../../libs/enums/Profile/ProfileScreenName";
import { RootScreenName } from "../../libs/enums/RootScreenName";
import { isURL } from "../../libs/helpers/isUrl";
import { RootStackParamList } from "../../libs/types/Routes/RootStackParamList.type";
import { linkApi } from "../../store/reducers/link/LinkApi";
import { LinkButton } from "./LinkButton";

type FormData = {
  title: string;
  url: string;
  type: string;
};

export function CreateLinkForm() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const title = watch("title");
  const type = watch("type");
  const url = watch("url");

  const [createLink] = linkApi.useCreateLinkMutation();

  const handleLinkCreate = async (data: FormData) => {
    await createLink(data)
      .unwrap()
      .then((data) => {
        Toast.show({
          type: "success",
          text1: "Link was successfully created.",
        });
        navigation.navigate(RootScreenName.PROFILE, {
          screen: ProfileScreenName.USER_PROFILE,
        });
      });
  };

  return (
    <ScrollView
      className="flex flex-1 w-full px-4"
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <Text className="text-white text-2xl font-bold mb-2 mt-5">
        Create profile link
      </Text>
      <Text className="text-white self-start text-lg font-medium mb-2">
        Enter link title:
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Title"
            className="bg-neutral-600 px-3 py-2 h-10 border border-1 border-white rounded-lg text-white mb-3 w-full"
            placeholderTextColor={"#FFFFFF"}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="title"
        rules={{
          required: "Title is required",
          minLength: {
            value: 4,
            message: "Title must be at least 4 characters",
          },
        }}
      />
      {errors.title && (
        <Text className="text-red-600 mb-3">
          {errors.title.message as string}
        </Text>
      )}
      <Text className="text-white self-start text-lg font-medium mb-2">
        Enter link URL:
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="URL"
            className="bg-neutral-600 px-3 py-2 h-10 border border-1 border-white rounded-lg text-white mb-3  w-full"
            placeholderTextColor={"#FFFFFF"}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="url"
        rules={{
          required: "URL is required",
          validate: (value) => isURL(value) || "Please enter a valid URL",
        }}
      />
      {errors.url && (
        <Text className="text-red-600 mb-3">
          {errors.url.message as string}
        </Text>
      )}
      <Text className="text-white self-start text-lg font-medium mb-2">
        Choose link type:
      </Text>
      <Controller
        control={control}
        name="type"
        defaultValue={Object.keys(LinkTypesMapToButton)[0]}
        render={({ field: { onChange, value } }) => (
          <View className="border-white bg-neutral-600 border border-1 mb-3 rounded-lg w-full">
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              dropdownIconColor={"white"}
              style={{
                color: "white",
                marginVertical: -8,
              }}
            >
              {Object.keys(LinkTypesMapToButton).map((linkType) => {
                const splittedLinkType = linkType.split(/(?=[A-Z])/);

                const capitalised = [
                  splittedLinkType[0],
                  ...splittedLinkType
                    .slice(1)
                    .map((item) => item.toLowerCase()),
                ];

                return (
                  <Picker.Item
                    label={capitalised.join(" ")}
                    key={linkType}
                    value={linkType}
                  />
                );
              })}
            </Picker>
          </View>
        )}
      />
      <Text className="text-white self-start text-lg font-medium mb-2">
        Preview Link:
      </Text>
      <View className="w-full mb-3">
        {type && title && url ? (
          <LinkButton buttonType={type} title={title} url={url} />
        ) : (
          <View className="border rounded-lg h-[52px] border-gray-400 bg-gray-600 mb-4" />
        )}
      </View>
      <TouchableOpacity
        className={`flex flex-row justify-center items-center py-3 px-4 rounded-lg bg-green-600`}
        onPress={handleSubmit(handleLinkCreate)}
      >
        <View className="flex flex-row justify-center items-center">
          <Text className="text-lg font-bold text-white ml-2">Create link</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
