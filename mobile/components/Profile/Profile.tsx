import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-virtualized-view";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link } from "../../libs/types/Profile/Link";
import { Profile as ProfileType } from "../../libs/types/Profile/Profile";
import { RootStackParamList } from "../../libs/types/Routes/RootStackParamList.type";
import { linkApi } from "../../store/reducers/link/LinkApi";
import { profileApi } from "../../store/reducers/profile/ProfileApi";
import { CreateLinkButton } from "./CreateLinkButton";
import { LinkButton } from "./LinkButton";
import { SwipeToDeleteItem } from "./SwipetoDelete";

type FormData = {
  description: string;
};

interface ProfileProps {
  profile: ProfileType;
}

export function Profile({ profile }: ProfileProps) {
  const { description, name, links, userId: profileUserId } = profile;

  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { description } });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  console.log("RERENDER", links.length);

  const [linksToRender, setLinksToRender] = useState<Link[]>([]);

  useEffect(() => {
    setLinksToRender(links);
  }, [profile]);

  const user = useAppSelector((state) => state.userReducer.user);

  const userId = user?.id as number;

  const [changeOwnProfileLinksOrder] =
    linkApi.useChangeOwnProfileLinksOrderMutation();

  const [changeProfileDescription] =
    profileApi.useChangeProfileDescriptionMutation();

  const [deleteLink] = linkApi.useDeleteLinkMutation();

  const isUserOwnProfile = userId === profileUserId;

  const handleGearClick = () => {
    setIsEditing(true);
  };

  const handleXClick = () => {
    setIsEditing(false);
  };

  const onDragEnd = async ({
    data,
    from,
    to,
  }: {
    data: Link[];
    from: number;
    to: number;
  }) => {
    setLinksToRender(data);
    await changeOwnProfileLinksOrder({ from: from + 1, to: to + 1 });
  };

  const handleDescriptionChangeSubmit = async (data: FormData) => {
    await changeProfileDescription(data)
      .unwrap()
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Profile description changed successfully.",
        });
      });
  };

  const handleDelete = async (id: number) => {
    await deleteLink(id);
  };

  return (
    <ScrollView className="px-4 flex-1 flex gap-6">
      <View className="pt-4 relative">
        {isUserOwnProfile && !isEditing && (
          <View className="absolute z-40 right-5 top-4  bg-blue-500 flex items-center justify-center rounded-full w-10 h-10">
            <FontAwesome
              name="gear"
              onPress={handleGearClick}
              size={24}
              color={"white"}
            />
          </View>
        )}

        {isEditing && (
          <View className="absolute z-40 right-5 top-4  bg-blue-500 flex items-center justify-center rounded-full w-10 h-10">
            <FontAwesome
              onPress={handleXClick}
              name="close"
              size={24}
              color={"white"}
            />
          </View>
        )}

        <Text className="text-white text-5xl font-bold text-center mb-4">
          @{name}
        </Text>
        <Text className="text-white font-normal text-lg text-center">
          {!isEditing && description}
        </Text>
        {isEditing && (
          <>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Description"
                  className="bg-neutral-600 px-3 py-2 h-10 border border-1 border-white rounded-lg text-white mb-3"
                  placeholderTextColor={"#FFFFFF"}
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(handleDescriptionChangeSubmit)}
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
          </>
        )}
      </View>
      <View>
        <DraggableFlatList
          data={linksToRender}
          renderItem={({ item, drag, isActive }) => (
            <View className="mb-4">
              {isUserOwnProfile && isEditing ? (
                <SwipeToDeleteItem itemId={item.id} onDelete={handleDelete}>
                  <LinkButton
                    buttonType={item.linkType.name}
                    onLongPress={isEditing ? drag : undefined}
                    title={item.title}
                    url={item.url}
                  />
                </SwipeToDeleteItem>
              ) : (
                <LinkButton
                  buttonType={item.linkType.name}
                  onLongPress={isEditing ? drag : undefined}
                  title={item.title}
                  url={item.url}
                />
              )}
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          onDragEnd={onDragEnd}
        />
        {isUserOwnProfile && <CreateLinkButton />}
        <View className="mb-4">
          <Text className="text-white font-light text-sm text-center">
            All rights reserved. Linky © 2023
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
