<template>
  <!-- Utilizo v-model con input de tipo number, no puedo colocar el value en el tag -->
  <div id="fieldAditional" class="border border-2">
    <div class="d-flex mb-3 justify-content-center flex-wrap">
      <label class="me-2" for="page"> Numero de pàginas</label>
      <!-- <div class="d-flex justify-content-end"> -->
      <ElementalComp
        idElement="firstElement"
        nameElement="page"
        @newChange="addCantidad"
        index="0"
        idModal="numPage"
      />
      <!-- </div> -->
    </div>

    <div class="d-flex justify-content-center flex-wrap">
      <label class="me-2" for="idioma"> Numero de idiomas</label>
      <ElementalComp
        idElement="secondElement"
        nameElement="idioma"
        @newChange="addCantidad"
        index="1"
        idModal="numLenguaje"
      />
    </div>
  </div>
</template>

<script>
import ElementalComp from "@/components/ElementalComp";

export default {
  name: "PanelComponent",
  components: {
    ElementalComp,
  },
  data() {
    return {
      totalPartial: 1,
      fieldsPanel: [],
      count: 0,
    };
  },
  methods: {
    addCantidad(value, index) {
      this.fieldsPanel[index] = value;
      this.totalPartial = 1;
      if (this.fieldsPanel.length === 2) {
        for (let value of this.fieldsPanel) {
          if (value === "") value = 0;
          this.totalPartial *= parseInt(value);
        }
        this.totalPartial *= 30;
        this.$emit("totalAdd", this.totalPartial, this.fieldsPanel);
      }
    },
  },
};
</script>

<style scoped>
#fieldAditional {
  width: 80%;
  margin-left: 10%;
  margin-top: 5%;
  border-radius: 10px;
  padding: 5%;
  margin-bottom: 5%;
  position: relative;
}

@media (max-width: 576) {
  label {
    font-size: 0.8rem;
  }
}
@media (min-width: 452px) {
  .mar-pad {
    padding: 1%;
    margin: 1%;
  }
}
</style>
