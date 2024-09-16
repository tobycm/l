/// <reference path="../pb_data/types.d.ts" />

onRecordBeforeUpdateRequest((event) => {
  if (event.httpContext.get("admin")) return null; // ignore for admins

  if (event.record.originalCopy().getStringSlice("permissions").join(",") !== event.record.getStringSlice("permissions").join(","))
    throw new Error("You can't change your permissions!");
}, "users");
