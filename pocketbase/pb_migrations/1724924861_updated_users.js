/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "@request.auth.id != \"\" && @request.auth.permissions ?= \"create\""
  collection.updateRule = "id = @request.auth.id || (@request.auth.id != \"\" && @request.auth.permissions ?= \"update\")"
  collection.deleteRule = "id = @request.auth.id || (@request.auth.id != \"\" && @request.auth.permissions ?= \"delete\")"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8lr7me4r",
    "name": "permissions",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 3,
      "values": [
        "create",
        "update",
        "delete"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = "id = @request.auth.id"
  collection.viewRule = "id = @request.auth.id"
  collection.createRule = ""
  collection.updateRule = "id = @request.auth.id"
  collection.deleteRule = "id = @request.auth.id"

  // remove
  collection.schema.removeField("8lr7me4r")

  return dao.saveCollection(collection)
})
