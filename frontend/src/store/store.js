import Vue from 'vue'
import Vuex from 'vuex'

import { toysService } from '@/services/toys.service.js';
import { userStore } from '@/store/user.store.js';




Vue.use(Vuex)

export default new Vuex.Store({


  


// import { userService } from "../services/user.service.js";

//const options = {
    strict: true,
    state: {
        count: 0,
        filterBy: null,
        user: "",
        toys: [],
        //  userDetails : userService.getUserPreferences(),
       
    },
    getters: {
        countForDisplay(state) {
            return state.count.toLocaleString()
        },
    //   getUserDetails(state){
    //      return state.userDetails;
    //   },
       
        getToyById: (state) => (id) => {
            var  toyToEdit=null
            state.toys.find(toy => {
                if (toy._id === id){
                    toyToEdit= toy;
                }

            }) 
            return toyToEdit
          },

        getToysToShow(state) {
            console.log('gettoysToShow',state)
            if (!state.filterBy) return state.toys
            const searchStr = state.filterBy.toLowerCase()
            const toysToShow = state.toys.filter(toy => {
                return toy.name.toLowerCase().includes(searchStr)
            })
            return toysToShow
        },
    },


    mutations: {
        setToys(state,payload){
            console.log(' payload in setToys in store',payload.toys)
          state.toys = payload.toys;
        },

        filterByChanged(state,payload){
            console.log('filterByChanged is running',payload.strFilter.name)
            state.filterBy = payload.strFilter.name
            
        },
        incCount(state, payload) {
            console.log('Payload', payload);
            state.count += payload.val;
        },
        addTodo(state, payload) {
            console.log('add todo in store :', payload);
            state.toys.push(payload.toy);
        },
        updateTodo(state, payload){
            console.log(' after update toy in store',payload)
            const idx = state.toys.findIndex( p => p._id === payload.toy._id)
            state.toys.splice(idx,1,payload.toy)
        },
        removeToy(state, payload) {
            // toysService.remove(todoId)
            const idx = state.toys.findIndex( p => p._id === payload.toyId)
            state.toys.splice(idx, 1)
        },
   
        saveToy(state,payload){
        console.log('todo in stor to save',payload.theTodoToSave)
        //toysService.save(payload.theTodoToSave)
       // var newtoys =JSON.parse(JSON.stringify(state.toys));
         state.toys = payload.theTodoToSave;
        }
    },
    actions : {
  
        loadToys(context, payload)
        {
            console.log(' load toys from store')
            toysService.query()
            .then(toys=>{
                context.commit({type : 'setToys',  toys})
                console.log(' load toys from stoysServicetore',toys)
            })


        },
        saveToy(context,payload){
            //TODO : support EDIT
            console.log(' theToyToSave in action in store ',payload.theToyToSave)
            const type =(payload.theToyToSave._id)? 'updateTodo': 'addTodo';
            //console.log('add from stor from action',payload.product)
            toysService.save(payload.theToyToSave)
            .then(savedToy=>{
                console.log('saved toy  in after save service,type  :',savedToy,type)
           //  context.commit({type : 'savetoys' , todo : savedTodo})
              context.commit({type , toy : savedToy})
            })
        },
        removeToy(context,payload){
            toysService.remove(payload.toyId)
            .then(()=>{
                context.commit(payload)
            })
        },
    },
    modules :{
        userStore : userStore,
    },
//}



  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // modules: {
  // }


})
