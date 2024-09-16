/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("csu49yjkp7qmofg")

  collection.listRule = "privacy = \"public\" || privacy = \"\" || @request.auth.id = owner.id || @request.data.slug = slug"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("csu49yjkp7qmofg")

  collection.listRule = "privacy = \"public\" || privacy = \"\" || @request.auth.id = owner.id"

  return dao.saveCollection(collection)
})
