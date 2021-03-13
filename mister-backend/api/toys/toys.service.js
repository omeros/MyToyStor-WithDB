const gToys = require('../../data/toy.json')

module.exports = {
    query,
    save,
    getById,
    remove,

   
}

   

function query() {
    return Promise.resolve(gToys);
}

function getById(toyId){{
    const toy = gToys.find(toy => toy._id === toyId)
    return Promise.resolve(toy);
}}

// save toy to the file
function save(toy) {
    if (toy._id) {
        console.log('saving toy with id :',toy)
        const idx = gToys.findIndex(c => c._id === toy._id)

        if (idx < 0)  return Promise.resolve //return Promise.reject('No such toy', toy._id)
        console.log('this toy have a new id :',toy)
        gToys.splice(idx, 1, toy)
    } else {
        console.log('this toy have have not have an id :',toy)
        toy._id = _makeId()
        gToys.unshift(toy)
    }
    return _saveToysToFile()
        .then(() =>{
            console.log('after saving :',toy)
         toy})


}


function remove(myToyId){
    const idx = gToys.findIndex(toy => toy._id === myToyId)
    console.log('removind toy with _id :',idx)
    gToys.splice(idx, 1)
    return _saveToysToFile();
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        const fs = require('fs')
        fs.writeFile('data/toy.json', JSON.stringify(gToys, null, 2), (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}