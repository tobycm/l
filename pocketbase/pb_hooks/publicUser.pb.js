/// <reference path="../pb_data/types.d.ts" />

onRecordBeforeUpdateRequest((event) => {
  if (event.httpContext.get("admin")) return null; // ignore for admins

  if (
    event.record.originalCopy().getString("username") !== event.record.getString("username") ||
    event.record.originalCopy().getString("email") !== event.record.getString("email") ||
    event.record.originalCopy().getString("name") !== event.record.getString("name") ||
    event.record.originalCopy().getString("avatar") !== event.record.getString("avatar") ||
    event.record.originalCopy().getStringSlice("permissions").join(",") !== event.record.getStringSlice("permissions").join(",")
  )
    throw new Error("You can't edit the guest account");
}, "users");
