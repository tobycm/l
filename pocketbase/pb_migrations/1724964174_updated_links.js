/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("csu49yjkp7qmofg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2hgeaa4u",
    "name": "slug",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "/^\\/[a-zA-Z0-9\\-._~]*$/"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("csu49yjkp7qmofg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2hgeaa4u",
    "name": "slug",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
