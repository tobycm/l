/// <reference path="../pb_data/types.d.ts" />

onRecordBeforeCreateRequest((event) => {
  event.record.set("permissions", ["create"]);
}, "users");
