import type { AuthModel, RecordModel } from "pocketbase";

type Filename = string;
type ID = string;
type Permissions = ("create" | "update" | "delete")[];

export type User = {
  username: string;
  email: string;
  name: string;
  avatar: Filename;
  permissions: Permissions[];
} & AuthModel;

export interface Link {
  url: string;
  slug: string;
  owner: ID;
  expand: {
    owner: User;
  };
}

export type PBLink = Link & RecordModel;
