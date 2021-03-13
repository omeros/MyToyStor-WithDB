<template>
  <div class="home">
   Toy To Edit
          <div class="toy-edit  ">

        <div  class="baba-g">

                    <table>  
                        <div>
                            <th class = "edit-cell-title">ID </th>
                            <th class = "edit-cell-title">Created At </th>
                            <th class = "edit-cell-title">Name</th>
                            <th class = "edit-cell-title">Price</th>
                            <th class = "edit-cell-title">Type</th>
                            <th class = "edit-cell-title">Is In Stock</th>
                        </div> 
                    </table>
        </div>
        <div class="baba-g">
            <input class="edit-cell" type="text"  v-model = "toyToEdit._id">
            <input class="edit-cell" type="text" v-model= "toyToEdit.createdAt">
            <input class="edit-cell" type="text" v-model= "toyToEdit.name">
            <input class="edit-cell" type="text"  v-model= "toyToEdit.price">
            <input class="edit-cell" type="text"  v-model= "toyToEdit.type">
            <input class="edit-cell" type="text"  v-model= "inStockTest">
        </div>
        
       <!-- <a  href="/toy#/toy" @click="saveToy()"> save </a> -->
   <button class="save-todo-button" href="/"  @click.prevent="saveToy()">save</button>
    <router-link to="/toy">Go Back</router-link> 

          </div>



  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/cmps/HelloWorld.vue'

export default {
  name: 'toy-edit',

     data() {
        return {
            toyId : 'null',
            toyToEdit : {
                _id : 'willOveride',
                createdAt : 'willOveride',
                price :'willOveride',
                name : 'willOveride',
                type :'willOveride',
            },
         
        }
   },
   mounted(){
    this.toyId= this.$route.params.toyId;
    var myJSON = JSON.stringify(this.$store.getters.getToyById(this.toyId));
    this.toyToEdit = JSON.parse(myJSON);
    console.log('myJSON',myJSON)
    console.log('toysToEdit',this.toyToEdit)
    },
    methods: {

    
    saveToy(){
        console.log('saved in edit toy',this.toyToEdit)
        this.$store.dispatch({type: 'saveToy',   theToyToSave: this.toyToEdit}) 
       
    },
  
    

    },
     computed: {
        inStockTest (){

            if(this.toyToEdit.inStock){
                            return 'Yes'
            } else{
                    return  'No'
            }
         },
    },

    components: {
        
    }
}
</script>
