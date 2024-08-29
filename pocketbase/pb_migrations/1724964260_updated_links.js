/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("csu49yjkp7qmofg")

  collection.indexes = [
    "CREATE INDEX `idx_vSsYuHE` ON `links` (`slug`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("csu49yjkp7qmofg")

  collection.indexes = []

  return dao.saveCollection(collection)
})
