import PocketBase, { BaseAuthStore, RecordService, type RecordModel } from "pocketbase";
import type { PBLink, User } from "./models";

export default interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService; // default fallback for any other collection
  collection(idOrName: "users"): RecordService<User>;
  collection(idOrName: "links"): RecordService<PBLink>;
  collection(idOrName: "metadata"): RecordService<{ key: string; value: string } & RecordModel>;

  authStore: BaseAuthStore & {
    model: User;
  };
}
