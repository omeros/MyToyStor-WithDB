const ToyService = require('./toys.service')
const logger = require('../../services/logger.service')

async function getToy(req, res) {
    try {
        const user = await ToyService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

async function getToys(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
            minBalance: +req.query?.minBalance || 0
        }
        const users = await ToyService.query(filterBy)
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}

async function addToy(req, res) {
    try {
        var review = req.body
        review.byUserId = req.session.user._id
        review = await reviewService.add(review)
        review.byUser = req.session.user
        review.aboutUser = await userService.getById(review.aboutUserId)
        res.send(review)

    } catch (err) {
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}
async function deleteToy(req, res) {
    try {
        await ToyService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(500).send({ err: 'Failed to delete user' })
    }
}

async function updateToy(req, res) {
    try {
        const user = req.body
        const savedUser = await ToyService.update(user)
        res.send(savedUser)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

module.exports = {
    getToy,
    getToys,
    addToy,
    deleteToy,
    updateToy
}