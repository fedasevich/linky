import { User } from "../../../libs/types/User/User.type";
import { api } from "../../api";

export interface TokenResponse {
  token: string;
}

export type SignRequest = Pick<User, "email"> & {
  password: string;
};

type ResetPasswordConfirmRequest = TokenResponse & {
  password: string;
};

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<TokenResponse, SignRequest>({
      query: (body) => ({
        body,
        url: "/auth/sign-in",
        method: "POST",
      }),
    }),
    signUp: builder.mutation<TokenResponse, SignRequest>({
      query: (body) => ({
        body,
        url: "/auth/sign-up",
        method: "POST",
      }),
    }),
    check: builder.query<TokenResponse, void>({
      query: () => ({
        url: "/auth/check",
      }),
    }),
    resetPassword: builder.mutation<string, Pick<User, "email">>({
      query: (body) => ({
        body,
        url: "/auth/reset-password",
        method: "POST",
      }),
    }),
    validateResetPasswordToken: builder.query<string, TokenResponse>({
      query: ({ token }) => ({
        url: `/auth/reset-password?token=${token}`,
      }),
    }),
    resetPasswordConfirm: builder.mutation<string, ResetPasswordConfirmRequest>(
      {
        query: (body) => ({
          body,
          url: `/auth/reset-password/confirm`,
          method: "POST",
        }),
      }
    ),
  }),
});
