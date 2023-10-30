import { LinkType } from "./LinkType";

export interface Link {
  id: number;
  profileId: number;
  title: string;
  url: string;
  order: number;
  linkTypeId: number;
  createdAt: string;
  updatedAt: string;
  linkType: LinkType;
}
