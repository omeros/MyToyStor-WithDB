<template>
           
        <input class="" type="text" @input="setFilter" placeholder="Search the toy...." v-model="filterBy.name">
</template>

<script>
export default {
  data() {
        return {
            filterBy: {
                name: '',
            }
        }
    },
      methods:{
        setFilter(){
            this.$emit('filtered', this.filterBy)
        }
    },
}
</script>

<style>

</style>