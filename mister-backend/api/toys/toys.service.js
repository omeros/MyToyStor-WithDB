
const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}


//************ Ok *****************************/
async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('toy')
        // var toys = await collection.find(criteria).toArray()
        var toys = await collection.find({}).toArray()
        console.log(' after filter the collections returned from the DB',toys)
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}
/********************** ok ***************************/
async function getById(toyId) {
    try {
        console.log(' the id : ', toyId)
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })
       // delete toy.password

        // toy.givenReviews = await reviewService.query({ byToyId: ObjectId(toy._id) })
        // toy.givenReviews = toy.givenReviews.map(review => {
        //     delete review.byUser
        //     return review
        // })

        return toy
    } catch (err) {
        logger.error(`while finding user ${toyId}`, err)
        throw err
    }
}

/*********************** ok ****************** */
async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
        console.log(' toy removed :',toyId)
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}
/********************************ok **********************************/
async function update(toy) {
    try {
        // peek only updatable fields!
        const toyToSave = {
            _id  : ObjectId(toy._id),
            name : toy.name,
            price : toy.price,
            type : toy.type,
            createdAt :  toy.createdAt,
            inStock :  toy.inStock
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ '_id': toyToSave._id }, { $set: toyToSave })
        return toyToSave;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}
/********************************* ok ****************************** */
async function add(toy) {
    try {
        // peek only updatable fields!
        const toyToAdd = {
            _id  : toy._id,
            name : toy.name,
            price : toy.price,
            type : toy.type,
            createdAt :  toy.createdAt,
            inStock :  toy.inStock
        }
        delete toyToAdd._id 
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toyToAdd)
        return toyToAdd
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}


