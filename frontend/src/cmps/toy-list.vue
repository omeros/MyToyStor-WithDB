

<template>
  <div class="toy-list">
                <!-- <toy-preview :toy="toy"   @remotoy=removeToy /> -->
                
            <div v-for="toy in toys" :key="toy._id"  >
                <toy-preview :toy="toy"  @remotoy=removeToy  />

            </div>
    toy list
  </div>
</template>

<script>
  import toyPreview from '@/cmps/toy-preview.vue'

export default {
     name: 'toy-list',
        props: ['toys'],
    methods: {
        removeToy(id){
            console.log('toy id delete from toy list,' ,id)
            this.$emit("remtoy", id);
        },
        addBug(){

        }
    },
       mounted (){
         console.log('toys in toy-list',this.toys)
      },

    components:{
    toyPreview,
    }
}
</script>
