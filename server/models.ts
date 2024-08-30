import type { RecordModel } from "pocketbase";

type Filename = string;
type ID = string;
type Permissions = ("create" | "update" | "delete")[];

export interface User extends RecordModel {
  username: string;
  email: string;
  name: string;
  avatar: Filename;
  permissions: Permissions[];
}

export interface Link {
  url: string;
  slug: string;
  owner: ID;
  expand: {
    owner: User;
  };
}
