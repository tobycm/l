/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("csu49yjkp7qmofg")

  collection.createRule = "@request.auth.id != \"\" && @request.auth.permissions ?~ \"create\""
  collection.updateRule = "@request.auth.id != \"\" && (@request.auth.permissions ?~ \"update\" || @request.auth.id = owner.id)"
  collection.deleteRule = "@request.auth.id != \"\" && (@request.auth.permissions ?~ \"delete\" || @request.auth.id = owner.id)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("csu49yjkp7qmofg")

  collection.createRule = "@request.auth.id != \"\" && @request.auth.permissions ?= \"create\""
  collection.updateRule = "@request.auth.id != \"\" && (@request.auth.permissions ?= \"update\" || @request.auth.id = owner.id)"
  collection.deleteRule = "@request.auth.id != \"\" && (@request.auth.permissions ?= \"delete\" || @request.auth.id = owner.id)"

  return dao.saveCollection(collection)
})
