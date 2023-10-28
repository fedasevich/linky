import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export type FetchError = FetchBaseQueryError & {
  data: {
    statusCode: number;
    error: string;
    message: string;
  };
};

export const api = createApi({
  tagTypes: ["Buildings"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      console.log("req" + JSON.stringify(token));

      return headers;
    },
  }),
  endpoints: () => ({}),
});
