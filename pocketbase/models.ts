import type { AuthModel, RecordModel } from "pocketbase";

type Filename = string;
type ID = string;

export type User = {
  username: string;
  email: string;
  name: string;
  avatar: Filename;
  permissions: ("create" | "update" | "delete")[];
} & AuthModel;

export interface Link {
  url: string;
  slug: string;
  owner: ID;
  privacy: "public" | "unlisted";
  expand: {
    owner: User;
  };
}

export type PBLink = Link & RecordModel;
