import { DropChange } from "../../../libs/types/Profile/DropChange";
import { Link } from "../../../libs/types/Profile/Link";
import { api } from "../../api";

type LinkCreationRequest = Pick<Link, "title" | "url"> & {
  type: string;
};

export const linkApi = api.injectEndpoints({
  endpoints: (builder) => ({
    changeOwnProfileLinksOrder: builder.mutation<void, DropChange>({
      query: (body) => ({
        body,
        url: "/link",
        method: "PUT",
      }),
      invalidatesTags: ["OwnProfile"],
    }),
    createLink: builder.mutation<void, LinkCreationRequest>({
      query: (body) => ({
        body,
        url: "/link",
        method: "POST",
      }),
      invalidatesTags: ["OwnProfile"],
    }),
    deleteLink: builder.mutation<void, number>({
      query: (id) => ({
        url: `/link/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OwnProfile"],
    }),
  }),
});
