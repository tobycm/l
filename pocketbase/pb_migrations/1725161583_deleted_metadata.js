/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("e8kzyl7pxbtl3gi");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "e8kzyl7pxbtl3gi",
    "created": "2024-09-01 03:22:22.363Z",
    "updated": "2024-09-01 03:22:22.363Z",
    "name": "metadata",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qyhqg4yh",
        "name": "key",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "wxdgszyg",
        "name": "value",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
