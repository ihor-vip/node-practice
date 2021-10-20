module.exports = {
    createItem: (schema, newItemData) => schema.create(newItemData),

    deleteItemById: (schema, itemId) => schema.deleteOne({_id: itemId}),

    deleteItem: (schema, filter) => schema.deleteOne(filter),

    findItemsByQuery: (schema, query) => schema.find(query),

    findItem: (schema, filter) => schema.findOne(filter),

    findItemAndJoin: (schema, filter, tableToJoin) => schema.findOne(filter).populate(tableToJoin),

    updateItemById: (schema, itemId, newItemData) => schema.updateOne({_id: itemId}, newItemData)
};
