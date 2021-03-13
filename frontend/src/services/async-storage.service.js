
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

//  return promis, get data from localStorage
function query(entityType, delay=1000) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    if(delay)
    {
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(entities)
            }, delay)
        })
      
    }
}
// get a single  data entety from localStorag , uSE query and filter the data to return a single entety
function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}


// add a new entety to the DataStorage
function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

// update an existing entety
function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

// remove from the DataStorage a single entity
function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            if (idx < 0) throw new Error(`Unknown Entity ${entityId}`)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

// save entity
function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}