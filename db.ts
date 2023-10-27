import * as SQLite from "expo-sqlite";
import { cryptoMock } from "./mocks/cryptoMock";
import { CartItem } from "./store/reducers/CartSlice";
export const db = SQLite.openDatabase("UserDatabase.db");

db.transaction((tx) => {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS CryptoCurrency (
        id INTEGER PRIMARY KEY,
        name TEXT,
        symbol TEXT,
        num_market_pairs INTEGER,
        price REAL,
        market_cap REAL,
        percent_change_1h REAL,
        percent_change_24h REAL,
        percent_change_7d REAL
      );`,
    [],
    (_: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
      console.log("Table created successfully");
    },
    () => {
      console.log("Something went wrong");
      return false;
    }
  );
});

export const insertCryptoArray = () => {
  db.transaction((tx) => {
    tx.executeSql("BEGIN;");
    cryptoMock.data.forEach((crypto) => {
      tx.executeSql(
        "INSERT INTO CryptoCurrency (name, symbol, num_market_pairs, price, market_cap, percent_change_1h, percent_change_24h, percent_change_7d) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          crypto.name,
          crypto.symbol,
          crypto.num_market_pairs,
          crypto.quote.USD.price,
          crypto.quote.USD.market_cap,
          crypto.quote.USD.percent_change_1h,
          crypto.quote.USD.percent_change_24h,
          crypto.quote.USD.percent_change_7d,
        ],
        (_, result) => {},
        (_, error) => {
          console.error("Error inserting data:", error);
          return false;
        }
      );
    });
    tx.executeSql("COMMIT;");
  });
};

export const selectCrypto = () => {
  return new Promise<CartItem[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM CryptoCurrency",
        [],
        (_, { rows }) => {
          const data: CartItem[] = [
            ...rows._array.map((item) => ({ ...item, quantity: 0 })),
          ];

          resolve(data);
        },
        (_, error) => {
          return false;
        }
      );
    });
  });
};
