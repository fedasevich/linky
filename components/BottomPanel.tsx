import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../hooks/redux";

const BottomPanel = () => {
  const { totalPrice, totalQuantity } = useAppSelector(
    (state) => state.cartReducer
  );
  return (
    <View style={styles.container}>
      <Text>Total quantity: {totalQuantity}</Text>
      <Text>Total price: ${totalPrice.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "lightgray",
    height: 60,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BottomPanel;
