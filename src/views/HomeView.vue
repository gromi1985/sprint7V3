<template>
  <div class="grid-layout p-3">
    <!-- Utilizo v-model con input de tipo checkbox, puedo colocar el value en el tag -->
    <!-- <div></div> -->
    <div class="row justify-content-center align-items-center mx-0">
      <div class="block-items border border-2 px-2">
        <div id="infoPresp" class="d-flex justify-content-around">
          <div class="text-start me-3">
            <label for="idPres">id-Presupuesto</label>
            <input id="idPres" v-model="dataItems[0]" />
          </div>
          <div class="text-start">
            <label for="idClient">id-Cliente</label>
            <input id="idClient" v-model="dataItems[1]" />
          </div>
        </div>

        <h1>Que quieres hacer ?</h1>
        <div id="v-model-multiple-checkboxes">
          <div class="d-flex justify-content-start align-items-baseline">
            <input
              type="checkbox"
              name="pagWeb"
              v-model="checkedNames[0].checked"
              v-bind:id="checkedNames[0].id"
              @change="sumaImportes(1)"
            />
            <label class="ps-2 text-start" for="pagWeb">
              Una pàgina web (500€)</label
            ><br />
          </div>
          <PanelComponent @totalAdd="newSum" v-if="flagNum" />

          <div class="d-flex justify-content-start align-items-baseline">
            <input
              type="checkbox"
              name="conSeo"
              v-model="checkedNames[1].checked"
              v-bind:id="checkedNames[1].id"
              @change="sumaImportes(0)"
            />
            <label class="ps-2 text-start" for="conSeo">
              Una consultoria SEO(300€)</label
            ><br />
          </div>

          <div class="d-flex justify-content-start align-items-baseline">
            <input
              type="checkbox"
              name="camGads"
              v-model="checkedNames[2].checked"
              v-bind:id="checkedNames[2].id"
              @change="sumaImportes(0)"
            />
            <label class="ps-2 text-start" for="conSeo"
              >Una campaña de Google Ads (200€)</label
            ><br />
          </div>
        </div>
        <p class="text-start">Importe: {{ totalSum }}</p>
        <button>
          <router-link to="/bienvenida">Back</router-link>
        </button>
        <button @click="valideFieldPattern">Guardar</button>
      </div>
    </div>
    <div class="block-items">
      Ordenar Elementos
      <div class="button-sort">
        <!-- Orden alfabetico -->
        <button @click="optionSort = 0">
          <i class="fa-solid fa-arrow-down-a-z"></i>
        </button>
        <!-- Orden Cronologico -->
        <button @click="optionSort = 1">
          <i class="fa-regular fa-calendar-check"></i>
        </button>
        <!-- Orden por id -->
        <button @click="optionSort = 2">
          <i class="fa-solid fa-align-justify"></i>
        </button>
      </div>
      <div class="d-flex flex-column align-items-center">
        <h4>Listado de Presupuestos</h4>
        <div
          class="d-flex w-100 justify-content-around border-top border-4 align-items-bottom py-2"
        >
          <h6 class="my-0">nº Prepuesto</h6>
          <h6 class="my-0">nº Cliente</h6>
        </div>
        <!-- Este componente no utiliza este totalItems, pero al estar cambiando me sirve para que recargue el componente cada vez que se agrega un item al localStorage -->
        <PressupostList
          @newUpdateRegSave="cargaDataInitial"
          :regSave="dataSaved"
          :sortItems="optionSort"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PanelComponent from "@/components/PanelCompt.vue";
import PressupostList from "@/components/PressupostList.vue";

export default {
  name: "HomeView",
  components: {
    PanelComponent,
    PressupostList,
  },
  data() {
    return {
      optionSort: 2,
      renderComponent: true,
      totalSum: 0,
      checkedNames: [
        { id: 0, checked: false, value: "500" },
        { id: 1, checked: false, value: "300" },
        { id: 2, checked: false, value: "200" },
      ],
      initParam: false,
      flagNum: false,
      totalA: 0,
      totalB: 0,
      dataItems: [],
      dataSaved: [],
      itemPresup: {
        idPresup: "0",
        idClient: "0",
        checked: [],
        infoDataF: {
          numPages: 0,
          numLenguag: 0,
        },
        fechaInsercion: "qq",
      },
    };
  },
  methods: {
    // Agregamos el nuevo registro al arreglo almacenado en el localstorage
    addLocalStorage() {
      console.log("addLocalStorage");
      if (typeof Storage !== "undefined") {
        this.dataSaved = JSON.parse(localStorage.getItem("listaPresupuesto"));
        console.log("Oido cocina");
        console.log(this.dataSaved);
        // Recupero los datos guardados en el localstorage para agregar el nuevo item de presupuesto
        if (this.dataSaved != null) this.dataSaved.push(this.itemPresup);
        else {
          // Es el primer item de presupuesto de llega
          this.dataSaved = [this.itemPresup];
        }
        localStorage.setItem(
          "listaPresupuesto",
          JSON.stringify(this.dataSaved)
        );
      }
      this.initElement();
    },
    // Una vez insertado el nuevo registro en el localstorage limpiamos la variable que se utiliza para la insercion de los datos en el arreglo.
    initElement() {
      console.log("initElement");
      this.itemPresup = {
        idPresup: "0",
        idClient: "0",
        checked: [],
        infoDataF: {
          numPages: 0,
          numLenguag: 0,
        },
      };
    },
    sumaImportes(option) {
      this.totalA = 0;
      if (option == "1") this.flagNum = !this.flagNum;
      if (!this.flagNum) this.totalB = 0;

      for (let indexId in this.checkedNames) {
        if (this.checkedNames[indexId].checked == true)
          this.totalA += parseInt(this.checkedNames[indexId].value);
      }
      this.totalSum = this.totalA + this.totalB;
    },
    newSum(totalPartial, fieldsPanel) {
      this.totalB = totalPartial;
      this.totalSum = totalPartial + this.totalA;
      this.itemPresup.infoDataF.numPages = fieldsPanel[0];
      this.itemPresup.infoDataF.numLenguag = fieldsPanel[1];
    },
    valideFieldPattern() {
      console.log("valideFieldPattern");
      if (this.dataItems.length == 2) {
        console.log("Entro por datItems");
        var patron = /^[0-9A-Za-z]{1,6}$/;

        let flagControl = false;
        for (let e of this.dataItems)
          if (!patron.test(e) || e == 0 || this.totalSum <= 0)
            flagControl = true;

        if (!flagControl) {
          console.log("Pasamos el filtro");
          console.log(typeof this.dataItems[0]);
          this.itemPresup.idPresup = this.dataItems[0];
          this.itemPresup.idClient = this.dataItems[1];

          console.log(this.itemPresup.idPresup);
          console.log(this.itemPresup.idClient);

          for (let indexId in this.checkedNames) {
            if (this.checkedNames[indexId].checked == true)
              this.itemPresup.checked.push(this.checkedNames[indexId].id);
          }
          this.addLocalStorage();
          // Una vez agregado el nuevo registro al localstorage reseteamos todas todas las variables
          console.log("Estamos aqui");
          this.totalSum = 0;
          this.dataItems = [];
          this.checkedNames = [
            { id: 0, checked: false, value: "500" },
            { id: 1, checked: false, value: "300" },
            { id: 2, checked: false, value: "200" },
          ];
          this.flagNum = false;
          this.initParam = true;
        }
      }
    },
    cargaDataInitial(value) {
      this.dataSaved = value;
    },
  },
  // mounted() {
  //   console.log("Entro por mounted");
  //   if (typeof Storage !== "undefined") {
  //     this.regSave = JSON.parse(localStorage.getItem("listaPresupuesto"));
  //     console.log(this.regSave);
  //   }
  // },
};
</script>
<style scoped>
button {
  width: 100px;
  text-decoration: none;
  color: black;
}
a {
  text-decoration: none;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 25rem), 0.4fr));
  grid-auto-rows: auto;
  column-gap: 2rem;
  justify-content: center;
}

.infoClient {
  width: auto;
}
h6 {
  width: 50%;
}
#infoPresp > div {
  width: calc(100% / 2);
  min-width: 110px;
  max-width: 150px;
}
#infoPresp > div > input {
  width: 100%;
}
.button-sort > button {
  width: auto;
  margin: 10px;
}

@media (max-width: 500px) {
  #infoPresp {
    flex-wrap: wrap;
    justify-content: flex-start !important;
  }
}
</style>
