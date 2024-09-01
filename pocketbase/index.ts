import PocketBase, { BaseAuthStore, RecordService, type RecordModel } from "pocketbase";
import type { PBLink, User } from "./models";

interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService; // default fallback for any other collection
  collection(idOrName: "users"): RecordService<User>;
  collection(idOrName: "links"): RecordService<PBLink>;
  collection(idOrName: "metadata"): RecordService<{ key: string; value: string } & RecordModel>;

  authStore: BaseAuthStore & {
    model: User;
  };
}

const pocketbase = new PocketBase(import.meta.env.POCKETBASE_URL ?? "http://localhost:8090") as TypedPocketBase;

export default pocketbase;
