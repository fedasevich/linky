import { Link } from "./Link";

export interface Profile {
  id: number;
  userId: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  links: Link[];
}
