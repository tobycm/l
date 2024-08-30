import eventsource from "eventsource";
import PocketBase, { RecordService, type RecordModel } from "pocketbase";
import type { Link as PBLink } from "./models";

// Polyfill EventSource for Node.js
// @ts-ignore
global.EventSource = eventsource;

interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService; // default fallback for any other collection
  collection(idOrName: "links"): RecordService<PBLink & RecordModel>;
}

const pocketbase = new PocketBase(import.meta.env.POCKETBASE_URL ?? "http://localhost:8090") as TypedPocketBase;

export default pocketbase;
