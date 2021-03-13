import { userService } from  '@/services/user.service.js';





export const userStore = {
  
    state: {
        userDetails : userService.getUserPreferences(),
    },
    getters: {
       getUserDetails(state){
         return state.userDetails;
      },
    
    },
    mutations: {
  
        userTodo(state,payload){
           console.log(' update in stor in mutatione',payload.user)
           state.userDetails=payload.user
       
        },
  
    },
    actions : {
        userTodo(context, payload){
            console.log('in dispatch in stor : ',payload.userPreferences)
            const user = JSON.parse(JSON.stringify(payload.userPreferences))
            console.log('in dispatch in stor after JSON : ',user)

            userService.save(user)
            .then((user) => {
                context.commit({type : 'userTodo',  user})
            })            
        },
     
    }
}

