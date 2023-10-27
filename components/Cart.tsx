import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { selectCrypto } from "../db";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addItem, removeItem, setCrypto } from "../store/reducers/CartSlice";
import { CryptoCurrencyDB } from "../types/crypto";

export function Cart() {
  const { items } = useAppSelector((state) => state.cartReducer);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    selectCrypto().then((data) => {
      dispatch(setCrypto(data));
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return null;
  }

  const handleClickIncrease = (crypto: CryptoCurrencyDB) => {
    dispatch(addItem(crypto));
  };

  const handleClickDecrease = (crypto: CryptoCurrencyDB) => {
    dispatch(removeItem(crypto.id));
  };

  return (
    <>
      <ScrollView>
        {items.map((crypto) => (
          <View key={crypto.id} style={styles.cartItem}>
            <Text>
              {crypto.name} ({crypto.symbol})
            </Text>
            <Text>Market Pairs: {crypto.num_market_pairs}</Text>
            <Text>Price: ${crypto.price.toFixed(2)}</Text>
            <Text>Market Cap: ${crypto.market_cap.toFixed(2)}</Text>
            <Text style={{ fontWeight: "800", fontSize: 15 }}>
              Percent change:
            </Text>
            <Text
              style={{
                color: crypto.percent_change_1h > 0 ? "green" : "red",
              }}
            >
              1h: {crypto.percent_change_1h}%
            </Text>
            <Text
              style={{
                color: crypto.percent_change_24h > 0 ? "green" : "red",
              }}
            >
              24: {crypto.percent_change_24h}%
            </Text>
            <Text
              style={{
                color: crypto.percent_change_7d > 0 ? "green" : "red",
              }}
            >
              7d: {crypto.percent_change_7d}%
            </Text>

            {crypto.quantity ? (
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleClickDecrease(crypto)}
                >
                  <Text style={styles.addToCardButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{crypto.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleClickIncrease(crypto)}
                >
                  <Text style={styles.addToCardButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleClickIncrease(crypto)}
              >
                <Text style={styles.addToCardButtonText}>Add to cart</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addToCartButton: {
    padding: 10,
    backgroundColor: "#00ff00",
    width: "50%",
    marginTop: 10,
    borderRadius: 10,
  },
  addToCardButtonText: {
    textAlign: "center",
    fontWeight: "800",
  },
  quantityContainer: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    marginTop: 10,
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "800",
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#575a57",
    marginTop: 10,
    borderRadius: 100,
  },
});
