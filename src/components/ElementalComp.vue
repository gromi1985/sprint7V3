<template>
  <div class="d-flex">
    <button class="bg-warning border-0" @click="changeCantidad(0)">+</button>
    <input
      class="ps-2 border-0"
      :id="idElement"
      type="text"
      :name="nameElement"
      v-model="fieldsPanel"
      @change="changeCantidad(2)"
      :index="index"
      size="5"
    />
    <button class="bg-warning border-0" @click="changeCantidad(1)">-</button>

    <!-- Button trigger modal -->
    <button
      :id="idButtonModel"
      type="button"
      class="btn btn-secondary py-0 ms-2"
      data-bs-toggle="modal"
      :data-bs-target="idButton"
    >
      i
    </button>
    <div
      class="modal fade alignElement"
      :id="idModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog mgsBoxClass">
        <div class="modal-cCust modal-content p-3 border border-3 border-dark">
          <div class="modal-bCust modal-body fs-6 fst-italic p-0 text-center">
            <p class="mb-0" v-if="msgBox">
              En este componente debe indicar el numero de paginas que tendrá su
              sitio web
            </p>
            <p class="mb-0" v-else>
              En este componente debe indicar el numero de idiomas que tendrá su
              sitio web
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElementalComp",
  props: ["idElement", "nameElement", "index", "idModal"],
  data() {
    return {
      fieldsPanel: 0,
    };
  },
  methods: {
    changeCantidad(option) {
      switch (option) {
        case 0:
          ++this.fieldsPanel;
          break;
        case 1:
          if (this.fieldsPanel > 0) --this.fieldsPanel;
          break;
        case 2:
          if (!this.valideFieldPattern(this.fieldsPanel)) this.fieldsPanel = 0;
          break;
        default:
      }
      console.log("this.index:" + this.index);
      if (this.fieldsPanel >= 0)
        this.$emit("newChange", this.fieldsPanel, this.index);
    },
    valideFieldPattern(value) {
      var patron = /^[0-9]{1,6}$/;
      return patron.test(value);
    },
  },
  computed: {
    idButton() {
      return "#" + this.idModal;
    },
    msgBox() {
      if (this.index == "1") return false;
      else return true;
    },
    idButtonModel() {
      return "button-modal-" + this.index;
    },
  },
};
</script>

<style scoped>
.modal-bCust.modal-body > p,
.modal-bCust.modal-body,
.modal-cCust.modal-content {
  border-radius: 20px;
}
#button-modal-0,
#button-modal-1 {
  border-radius: 50% !important;
}
.mgsBoxClass {
  position: absolute;
  top: 40vh;
}
.show.alignElement {
  display: flex !important;
  justify-content: center;
}
div > button,
div > input {
  font-size: 0.8rem;
}
</style>
