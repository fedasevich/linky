import React from "react";
import { Animated, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

interface SwipeToDeleteItemProps {
  itemId: number;
  children: React.ReactNode;
  onDelete: (itemId: number) => void;
}

export const SwipeToDeleteItem: React.FC<SwipeToDeleteItemProps> = ({
  itemId,
  children,
  onDelete,
}) => {
  const renderRightActions = (
    progressAnimatedValue: Animated.AnimatedInterpolation<number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = dragAnimatedValue.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 200],
      extrapolate: "clamp",
    });

    const handleDelete = () => {
      onDelete(itemId);
    };

    return (
      <RectButton
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 52,
          width: 100,
        }}
      >
        <Animated.Text
          onPress={handleDelete}
          className={"h-full w-full"}
          style={{
            color: "white",
            fontSize: 20,
            paddingTop: 11,
            borderRadius: 8,
            marginTop: 0,
            paddingLeft: 20,
            alignSelf: "center",
            backgroundColor: "red",
            transform: [{ translateX: trans }],
          }}
        >
          Delete
        </Animated.Text>
      </RectButton>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View>{children}</View>
    </Swipeable>
  );
};
