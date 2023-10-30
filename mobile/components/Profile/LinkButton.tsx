import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinkTypesMapToButton } from "../../libs/enums/Profile/LinkTypes";
import { Gradient } from "../../libs/types/Profile/Gradient";

interface LinkButtonProps {
  buttonType: string;
  title: string;
  url: string;
  onLongPress?: () => void | undefined;
}

interface BackgroundProps {
  gradient?: Gradient;
  isGradient: boolean;
  className: string;
}

const withBackground =
  <P extends object>(Component: React.ComponentType<P>) =>
  ({ gradient, isGradient, className, ...props }: P & BackgroundProps) => {
    if (isGradient && gradient) {
      return (
        <LinearGradient
          colors={gradient.colors as string[]}
          start={gradient.start}
          style={{ borderRadius: 8, marginBottom: 0, paddingBottom: 0 }}
          end={gradient.end}
        >
          <Component {...(props as P)} />
        </LinearGradient>
      );
    }
    return <Component {...(props as P)} className={className} />;
  };

export function LinkButton({
  buttonType,
  title,
  url,
  onLongPress,
}: LinkButtonProps) {
  const buttonConfig = LinkTypesMapToButton[buttonType];

  if (!buttonConfig) {
    return null;
  }

  const { icon, className, isGradient, gradient } = buttonConfig;

  const handleLinkPress = () => {
    // Linking.openURL(url);
  };

  const ButtonComponent = withBackground(TouchableOpacity);

  return (
    <View className="">
      <ButtonComponent
        gradient={gradient}
        className={`flex flex-row justify-between items-center py-3 px-4 rounded-lg ${className}`}
        isGradient={isGradient}
        onLongPress={onLongPress}
        onPress={handleLinkPress}
      >
        <View></View>
        <View className="flex flex-row justify-center items-center">
          <FontAwesomeIcon icon={icon} size={24} color="white" />
          <Text className="text-lg font-bold text-white ml-2">{title}</Text>
        </View>

        <View className="justify-self-end">
          {onLongPress && (
            <FontAwesomeIcon icon={faBuilding} size={16} color="white" />
          )}
        </View>
      </ButtonComponent>
    </View>
  );
}
