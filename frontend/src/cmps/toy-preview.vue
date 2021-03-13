<template>
  <div class="toy-preview">
   
                         <ul>
                          <li   @click=" myFilter"  v-bind:class="{checked : isActive}">{{myToy}}</li>
                      </ul>
                
                      <button @click="removeToy(toy._id)">Delete </button>
                      <router-link class="edit-link" :to="'/toy-edit/'+toy._id">Edit  </router-link> 
                      <router-link class="details-link" :to="'/toy-details/'+toy._id"> Details  </router-link> 




  </div>
</template>

<script>

export default {
  name: 'toy-preview',
     props:['toy'],
             data() {
          return {
            isActive: false,
          }
      },
      mounted (){
         console.log('toy in preview',this.toy)
      },
          computed: {
      myToy(){
          return this.toy.name
      },
     },
     methods: {
  removeToy(id){
    console.log('toy id delete from toy preview,' ,id)
    this.$emit("remotoy", id);
},
   myFilter() {
  this.isActive = !this.isActive;
},
     },
    

  components: {
  }
}
</script>
