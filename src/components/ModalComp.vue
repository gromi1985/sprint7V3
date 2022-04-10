<template>
  <div>
    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-secondary py-0 ms-2">i</button> -->
    <a :href="idButton" class="btn btn-secondary py-0 ms-2">i</a>
    <div class="modal" :id="idModal">
      <a href="#" class="modal-bg"></a>
      <div class="modal-content">
        <a href="#" class="modal-exit">x</a>
        <h3 class="modal-title">RoberModal</h3>
        <p class="modal-text">
          En este componente debe indicar el numero de páginas que tendrá su
          sitio web
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComp",
  props: ["idModal"],
  computed: {
    idButton() {
      return "#" + this.idModal;
    },
  },
};
</script>

<style scoped>
.modal-dialog .modal-body > p,
.modal-dialog .modal-body,
.modal-dialog .modal-content {
  border-radius: 20px;
}
#button-modal {
  border-radius: 50% !important;
}

/* Modal container*/
.modal {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transition: all 0.7s;
  transition: all 0.7s;
}
/* Modal container gets target and it is shown and background modal too*/
.modal:target,
.modal:target .modal-bg {
  display: block;
  z-index: 100;
  opacity: 1;
  visibility: visible;
}
/* Background modal*/
.modal-bg:active,
.modal-bg:hover,
.modal-bg:visited,
.modal-bg:link {
  text-decoration: none;
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  -webkit-transition: all 0.7s;
  transition: all 0.7s;
  cursor: default;
}
/* Background modal overlaps to container*/
.modal:target .modal-bg {
  z-index: 200;
}
/* Modal content or body*/
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: white;
  width: 60%;
  height: auto;
  border-radius: 2rem;
  text-align: center;
  z-index: 300;
}
.modal-title {
  text-transform: uppercase;
  margin-top: 5vh;
  margin-right: 5vh;
  margin-left: 5vh;
  margin-bottom: 1.2rem;
}
.modal-text {
  margin-bottom: 5vh;
  margin-right: 5vh;
  margin-left: 5vh;
}
/* Modal is closed at lose target*/
.modal-exit:link,
.modal-exit:active,
.modal-exit:visited,
.modal-exit:hover {
  position: absolute;
  top: 5%;
  right: 5%;
  font-size: 1.7rem;
  text-decoration: none;
  color: #f92a2a;
}
</style>
