/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("csu49yjkp7qmofg")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "@request.auth.id != \"\" && @request.auth.permissions ?= \"create\""
  collection.updateRule = "owner.id = @request.auth.id || (@request.auth.id != \"\" && @request.auth.permissions ?= \"update\")"
  collection.deleteRule = "owner.id = @request.auth.id || (@request.auth.id != \"\" && @request.auth.permissions ?= \"delete\")"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("csu49yjkp7qmofg")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
