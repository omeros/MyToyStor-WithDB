<template>
  <div class="home">
     <h2>toy datails </h2>
          {{toy}}
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/cmps/HelloWorld.vue'

export default {
  name: 'toy-details',
     data() {
    return {
        toyId : 'null',
        toy: null,
    }    
},
  mounted(){
    this.toyId= this.$route.params.toyId;
        console.log(' toyID in toy details : ',this.toyId )
    // this.toyToEdit = this.$store.getters.getToyById(this.toyId)
    var myJSON = JSON.stringify(this.$store.getters.getToyById(this.toyId));
    this.toy = JSON.parse(myJSON);
    console.log(' toy in toy -details : ',this.toy )


    },
  components: {
    // HelloWorld
  }
}
</script>
