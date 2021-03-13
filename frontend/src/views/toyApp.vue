
<template>
  <div class="toy">
    <!-- <toy-list :toys="toysToShow" @remtodo=removeToy /> -->
    <toy-filter @filtered="setFilter" />
    <toy-list :toys="toysToShow" @remtoy="removeToy" />

    <!-- 
                         <h1>toys To DO</h1>   
            <todo-filter @filtered="setFilter" />
            <todo-list :toys="toysToShow" @remtodo=removeToy />-->

    <h3>Add a Toy</h3>
    <div class="baba-g">
      <table>
        <div>
          <th class="edit-cell-title">Name</th>
          <th class="edit-cell-title">Price</th>
          <th class="edit-cell-title">Type</th>
        </div>
      </table>
    </div>

    <div class="baba-g">
      <input class="edit-cell" type="text" v-model="productToEdit.name" />
      <input class="edit-cell" type="text" v-model="productToEdit.price" />
      <input class="edit-cell" type="text" v-model="productToEdit.type" />
    </div>
    <form class="add-todo" @submit.prevent="addToy">
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import toyList from "@/cmps/toy-list.vue";
import toyFilter from "@/cmps/toy-filter.vue";
import { toysService } from "@/services/toys.service.js";

export default {
  name: "toy-app",

  data() {
    return {
      productToEdit: {
        price: "willOveride",
        name: "willOveride",
        type: "willOveride",
      },
      toys: [],
      filterBy: null,
      productToEdit: toysService.getEmptyToy(),
    };
  },
  // creat toys when the first time when the App loads
  created() {
    console.log("Vue App was created!!!");
    this.$store.dispatch({ type: "loadToys" });
  },
  mounted() {
    this.toys = this.$store.state.toys;
  },
  computed: {
    toysToShow() {
      const toysToShow = this.$store.getters.getToysToShow;
      console.log("toys from toy App", toysToShow);
      return toysToShow;
    },
  },
  methods: {
    setFilter(filterBy) {
      console.log("set filter is running", filterBy);
      this.$store.commit({ type: "filterByChanged", strFilter: filterBy });
    },

    addToy() {
      console.log("Adding Toy...", this.productToEdit);
      this.$store.dispatch({
        type: "saveToy",
        theToyToSave: this.productToEdit,
      });
      this.productToEdit = toysService.getEmptyToy();
    },
    removeToy(toyId) {
      console.log("Removing...", toyId);
      this.$store.dispatch({ type: "removeToy", toyId });
      this.productToEdit = toysService.getEmptyToy();
    },
  },

  components: {
    toyList,
    toyFilter,
  },
};
</script>




