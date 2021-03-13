const ToyService = require('./toys.service')
const logger = require('../../services/logger.service')






async function getToys(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt
        }
        const toys = await ToyService.query(filterBy)
        console.log('toys return from the server befor sendint to front',toys)
        res.send(toys)
    } catch (err) {
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function getToy(req, res) {
    try {
        const toy = await ToyService.getById(req.params.id)
        res.send(toy)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

///************************** ok ********************** */
async function addToy(req, res) {
    try {
        console.log(' add new toy')//, req.body)


        var toy = req.body


        toy = await ToyService.add(toy)

        res.send(toy)

    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}
async function deleteToy(req, res) {
    try {
        await ToyService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}

async function updateToy(req, res) {
    try {
        console.log(' update a toy  in controller', req.body)
        const toy = req.body
        const savedToy = await ToyService.update(toy)
        res.send(savedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

module.exports = {
    getToy,
    getToys,
    addToy,
    deleteToy,
    updateToy
}