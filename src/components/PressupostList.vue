<template>
  <div class="w-100">
    <div
      class="d-flex w-100 justify-content-around border-top border-3 align-items-center py-2"
      v-for="(item, index) in regSave"
      :key="index"
    >
      <p class="mb-0">{{ item.idPresup }}</p>
      <p class="mb-0">{{ item.idClient }}</p>
    </div>
    <p>Total Registros : {{ regSave.length }}</p>
  </div>
</template>

<script>
export default {
  name: "PressupostList",
  props: ["regSave"],
  data() {
    return {
      dataStorage: "",
      totalItemsRead: 0,
      regSaveCpy: "",
    };
  },
  mounted() {
    console.log("estamos montando PressupostList...");
    if (typeof Storage !== "undefined") {
      this.regSaveCpy = JSON.parse(localStorage.getItem("listaPresupuesto"));
      if (this.regSaveCpy != null) {
        console.log("Se lanza evento newUpdateRegSave");
        this.$emit("newUpdateRegSave", this.regSaveCpy);
      }
    }
  },
};
</script>
