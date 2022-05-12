<template>
  <!-- Utilizo v-model con input de tipo number, no puedo colocar el value en el tag -->
  <div id="fieldAditional" class="border border-2">
    <div class="d-flex mb-3 justify-content-center flex-wrap">
      <label class="me-2" for="page"> Numero de pàginas</label>
      <!-- <div class="d-flex justify-content-end"> -->
      <ElementalComp
        idElement="firstElement"
        nameElement="page"
        index="0"
        idModal="numPage"
        v-model="valuePageP"
        :flagSearch="numFlag"
      />
    </div>

    <div class="d-flex justify-content-center flex-wrap">
      <label class="me-2" for="idioma"> Numero de idiomas</label>
      <ElementalComp
        idElement="secondElement"
        nameElement="idioma"
        index="1"
        idModal="numLenguage"
        v-model="valueLenguageP"
        :flagSearch="numFlag"
      />
    </div>
  </div>
</template>

<script>
import ElementalComp from "@/components/ElementalComp";

export default {
  name: "PanelComponent",
  props: ["numFlag", "numPageValue", "numLenguageValue"],
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
  computed: {
    valuePageP: {
      get() {
        console.log("get:valuePageP");
        return this.numPageValue;
      },
      set(newValue) {
        console.log("set:valuePageP" + newValue);
        this.$emit("update:numPageValue", newValue);
      },
    },
    valueLenguageP: {
      get() {
        console.log("get:valueLenguageP");
        return this.numLenguageValue;
      },
      set(newValue) {
        console.log("set:valueLenguageP" + newValue);
        this.$emit("update:numLenguageValue", newValue);
      },
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
