import PocketBase, { BaseAuthStore, RecordModel, RecordService } from "pocketbase";
import { Link, User } from "./models";

import Constants from "../constants";

interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService; // default fallback for any other collection
  collection(idOrName: "users"): RecordService<User>;
  collection(idOrName: "links"): RecordService<Link & RecordModel>;

  authStore: BaseAuthStore & {
    model: User;
  };
}

const pocketbase = new PocketBase(Constants.PocketBaseURL) as TypedPocketBase;

export default pocketbase;
