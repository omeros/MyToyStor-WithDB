
const express = require('express')
const toyService = require('./toys.service')



// Express App Configuration:
// Tell express to serve static files from the public folder

//app.use(cookieParser());


// app.listen(port, () => console.log(`from toy Server ready at http:// 127.0.0.1: ${port}/   -  port ${port}!`))

const router = express.Router()

// return a List Of toys
router.get('/', (req, res) =>{
    toyService.query()
    .then(toys=>{
        console.log('toys returned by the server, in the server',toys)
        res.send(toys)
        
    })
    
})

// return a single toy by Id to the client
router.get('/:toyId', (req, res) => {
    const mytoyId = req.params.toyId
    console.log('request for toy with toyId',mytoyId)
    toyService.getById(mytoyId)
    .then(toy=>{
        res.send(toy)
    })
}) 

// Add  a toy -  (comming from  the save in the front's service)                  <===== not working !
router.post('/', (req, res) =>{
   console.log(' add new toy', req.body)
   
//    const _id  = req.body._id
   const name = req.body.name
   const price = req.body.price
   const type = req.body.type
   const createdAt = req.body.createdAt
   const inStock = req.body.inStock
   const toy = {name,price ,type,createdAt ,inStock }

    toyService.save(toy)
    .then((savedToy) => {
           res.json(savedToy)
           console.log("added toy")
        })
}) 
     // Update a toy                                    <===== not working !
router.put('/:toyId', (req, res) =>{
    //   console.log('  - update the  toy', req)
      console.log('  - update the  toy', req.body)

    // i can do a destraction here : 
    const _id  = req.body._id
    const name = req.body.name
    const price = req.body.price
    const type = req.body.type
    const createdAt = req.body.createdAt
    const inStock = req.body.inStock
    const toy = {_id,name,price ,type,createdAt ,inStock }
    console.log(' update a toy before saving in server ',toy)
    toyService.save(toy)
    .then((savedToy) => {
           res.json(savedToy)
        })
        
}) 

// remove toy by id
router.delete('/:toyId', (req, res) => {

    const mytoyId = req.params.toyId
    console.log('toyId was deleted',mytoyId)
    toyService.remove(mytoyId)
    .then(toy=>{
        res.send('toy deleted')
    })
}) 



module.exports = router
