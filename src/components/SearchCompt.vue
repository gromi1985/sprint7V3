<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="id Presupuesto"
          aria-label="Search"
          v-model="value"
        />
        <button class="btn btn-outline-success" @click="cargaDataSearch">
          Search
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SearchCompt",
  props: ["modelValue"],
  // data() {
  //   return {
  //     idPresup: "",
  //   };
  // },
  computed: {
    value: {
      get() {
        console.log("UNOOOO");
        return this.modelValue;
      },
      set(value) {
        console.log("DOOOOOS");
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    cargaDataSearch() {
      console.log("cargaDataSearch:" + this.modelValue);
      this.$emit("newSearchRegSave", this.modelValue);
    },
  },
};
</script>
