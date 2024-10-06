import PocketBase from "pocketbase";
import TypedPocketBase from "../../../pocketbase";

const pocketbase = new PocketBase(
  import.meta.env.POCKETBASE_URL ?? import.meta.env.VITE_POCKETBASE_URL ?? "http://localhost:8090"
) as TypedPocketBase;

export default pocketbase;
