import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { User } from "../../../libs/types/User/User.type";

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { token } }: PayloadAction<{ token: string }>
    ) => {
      console.log(token);
      const user = jwt_decode<User>(token);
      state.user = user;
      // (async () => {
      //   await AsyncStorage.setItem("token", token);
      // })();
      (async () => {
        try {
          await AsyncStorage.setItem("token", token);
          console.log("Token saved successfully");
        } catch (error) {
          console.error("Error saving token:", error);
        }
      })();
      (async () => {
        try {
          const storedToken = await AsyncStorage.getItem("token");
          console.log("Stored Token:", storedToken);
        } catch (error) {
          console.error("Error retrieving token:", error);
        }
      })();
    },
    logOut: (state) => {
      state.user = null;
      (async () => {
        await AsyncStorage.removeItem("token");
      })();
    },
  },
});

export const { setCredentials, logOut } = userSlice.actions;

export default userSlice.reducer;
