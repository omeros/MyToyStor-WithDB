import {storageService} from './async-storage.service.js'

const KEY = 'userPreferences'
var gUser =null;

_loadUserFromStorage();
//  {fullName: 'Baba G', fontcolor : "1d1b1b" , backgroundColor : "#b4d9bb'"};

export const userService = { 
    getUserPreferences,
    save,
}


function getUserPreferences(){
   // JSON.parse(JSON.stringify(payload.userPreferences))
    return JSON.parse(JSON.stringify( gUser))
}

function save(user){
    console.log('save in user service ',user)
   gUser.fullName  = user.fullName
   gUser.fontcolor  = user.fontcolor
   gUser.backgroundColor  = user.backgroundColor
   _saveUserToStorage()
   return Promise.resolve(gUser)
}


function _saveUserToStorage(){
    localStorage.setItem(KEY, JSON.stringify(gUser))
}
function _loadUserFromStorage(){
     gUser =   JSON.parse( localStorage.getItem(KEY))//, JSON.stringify(gUser)) )
    if (!gUser){
        gUser =  {fullName: 'Baba G', fontcolor : "1d1b1b" , backgroundColor : "#b4d9bb'" };
        _saveUserToStorage()
    }
   
}