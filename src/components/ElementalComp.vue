<template>
  <div class="d-flex">
    <button class="bg-warning border-0" @click="valueField++">+</button>
    <input
      class="ps-2 border-0"
      :id="idElement"
      type="text"
      v-model="valueField"
      :index="index"
      size="5"
    />
    <button class="bg-warning border-0" @click="valueField--">-</button>
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
  props: ["idElement", "index", "idModal", "modelValue"],
  data() {
    return {
      fieldsPanel: 0,
    };
  },
  methods: {
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
    valueField: {
      get() {
        console.log("get:valueField()");
        return this.modelValue;
      },
      // Si el numero es negativo, seteo el nuevo valor como 0
      set(newValue) {
        console.log("set:valueField()");

        if (newValue < 0) newValue = 0;
        this.$emit("update:modelValue", newValue);
      },
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
