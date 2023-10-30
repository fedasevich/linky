import { Profile } from "../../../libs/types/Profile/Profile";
import { api } from "../../api";

type CreateProfile = Pick<Profile, "name" | "description" | "userId">;

type ChangeDescriptionRequest = Pick<CreateProfile, "description">;

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfileByUserName: builder.query<Profile, string>({
      query: (userName) => ({
        url: `/profile/name/${userName}`,
      }),
    }),
    getOwnProfileByUserId: builder.query<Profile, number>({
      query: (userId) => ({
        url: `/profile/user/${userId}`,
      }),
      providesTags: ["OwnProfile"],
    }),
    createProfile: builder.mutation<void, CreateProfile>({
      query: (body) => ({
        body,
        url: "/profile",
        method: "POST",
      }),
      invalidatesTags: ["OwnProfile"],
    }),
    changeProfileDescription: builder.mutation<void, ChangeDescriptionRequest>({
      query: (body) => ({
        body,
        url: "/profile/description",
        method: "PUT",
      }),
      invalidatesTags: ["OwnProfile"],
    }),
  }),
});
