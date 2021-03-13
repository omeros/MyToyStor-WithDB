// NOTE: this is a synchronous service on purpose
// meant to simplify first intro to Vuex


import {utilService} from '@/services/util.service.js'
import axios from 'axios'
import {storageService} from '@/services/async-storage.service.js'
import {httpService} from './http.service'

 const TOY_URL = 'http://localhost:3030/api/toy/'

const KEY = 'productsDB';

export const toysService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
}



 _createToys()


 /*************************** Promise Return Function ************************************************************** */


// TODO: support paging and filtering and sorting
// function query() {
//     return axios.get(TOY_URL ).then(res => {
//         console.log('query in  front stoys.service', res.data)
//       return     res.data
//     })

//     // return storageService.query(KEY)
// }
function query(filterBy) {
 
    var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    return  httpService.get(`toy${queryStr}`)
    // return storageService.query(KEY)
}

function getById(id) {
    return axios.get(TOY_URL + id).then(res => {
        return     res.data
      })
//     return storageService.get(KEY,id)
// }
}

function save(toy) {
    if (toy._id) {
        return axios.put(TOY_URL + toy._id, toy)
        .then(res => res.data)
    } else {
        return axios.post(TOY_URL, toy)
        .then(res => res.data)
    }
    
    // const savedTodo = (toy._id) ? storageService.put(KEY,toy) : storageService.post(KEY,toy)
    // return savedTodo;
    
}

function remove(id) {
    return axios.delete(TOY_URL + id)
    .then(res => res.data)
//    return  storageService.remove(KEY,id)
}
/****************************************************************************************************** */


function getEmptyToy() {
 
    let ranDate = utilService.getRandomDate(new Date(2012,0,1), new Date())
    return {
        _id: '',
      
        createdAt : new Date(),
      
    }
}

function _createToys() {
    var products = JSON.parse(localStorage.getItem(KEY))
    if (!products || !products.length) {
        products = [
                _createToy('Talking Doll'),
                _createToy('card Game'),
                _createToy('pc game'),
            ]
            localStorage.setItem(KEY, JSON.stringify(products))
    }
    return products;
}

function _createToy(toyName) {
    let randomDate = utilService.getRandomDate(new Date(2012,0,1), new Date())
    return {
         _id : utilService.makeId(),
         name : toyName,
         price  : 123,
         type : "Funny",
         createdAt :  randomDate,
         inStock : true
    }
}




