<template>
  <div class="border border-1 border-primary">
    <!-- newSearchRegSave Evento que me envia el componente SearchCompt-->
    <p v-show="errSearch">No existe elemento indicado</p>
    <SearchCompt @newSearchRegSave="cargaInfoData" v-model="modelInput" />
    <div class="grid-layout p-3">
      <!-- Utilizo v-model con input de tipo checkbox, puedo colocar el value en el tag -->
      <!-- <div></div> -->
      <div class="row justify-content-center align-items-center mx-0">
        <div class="block-items border border-2 px-2">
          <div id="infoPresp" class="d-flex justify-content-around">
            <div class="text-start me-3">
              <label for="idPres">id-Presupuesto</label>
              <input id="idPres" v-model="itemPresup.idPresup" />
            </div>
            <div class="text-start">
              <label for="idClient">id-Cliente</label>
              <input id="idClient" v-model="itemPresup.idClient" />
            </div>
          </div>

          <h1>Que quieres hacer ?</h1>
          <div id="v-model-multiple-checkboxes">
            <div class="d-flex justify-content-start align-items-baseline">
              <input
                type="checkbox"
                name="pagWeb"
                v-model="itemPresup.checkedNames[0].checked"
                v-bind:id="itemPresup.checkedNames[0].id"
              />
              <label class="ps-2 text-start" for="pagWeb">
                Una pàgina web (500€)</label
              ><br />
            </div>
            <!-- Con v-show controlo que se desplegue o no el componentes de paginas y lenguajes -->
            <PanelComponent
              v-show="itemPresup.checkedNames[0].checked"
              v-model:numPageValue="itemPresup.infoDataF.numPages"
              v-model:numLenguageValue="itemPresup.infoDataF.numLenguag"
            />
            <div class="d-flex justify-content-start align-items-baseline">
              <input
                type="checkbox"
                name="conSeo"
                v-model="itemPresup.checkedNames[1].checked"
                v-bind:id="itemPresup.checkedNames[1].id"
              />
              <label class="ps-2 text-start" for="conSeo">
                Una consultoria SEO(300€)</label
              ><br />
            </div>

            <div class="d-flex justify-content-start align-items-baseline">
              <input
                type="checkbox"
                name="camGads"
                v-model="itemPresup.checkedNames[2].checked"
                v-bind:id="itemPresup.checkedNames[2].id"
              />
              <label class="ps-2 text-start" for="conSeo"
                >Una campaña de Google Ads (200€)</label
              ><br />
            </div>
          </div>
          <p class="text-start">Importe: {{ totalSumA }}</p>
          <button>
            <router-link to="/bienvenida">Back</router-link>
          </button>
          <button @click="valideFieldPattern">Guardar</button>
          <button @click="clear">Clear</button>
        </div>
      </div>
      <div class="block-items">
        Ordenar Elementos
        <div class="button-sort">
          <!-- Orden alfabetico -->
          <button @click="seleccSort(0)">
            <i class="fa-solid fa-arrow-down-a-z"></i>
          </button>
          <!-- Orden Cronologico -->
          <button @click="seleccSort(1)">
            <i class="fa-regular fa-calendar-check"></i>
          </button>
          <!-- Orden por id -->
          <button @click="seleccSort(2)">
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
          <!-- Este componente no utiliza este totalItems, pero al estar cambiando me sirve para que recargue el componente cada vez que se agrega un item al localStorage 
          newUpdateRegSave: Este evento es para cuando monta este componente carga los elementos que se encuentren en el localstorage-->
          <PressupostList
            @newUpdateRegSave="cargaDataInitial"
            :regSave="dataSaved"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PanelComponent from "@/components/PanelCompt.vue";
import PressupostList from "@/components/PressupostList.vue";
import SearchCompt from "@/components/SearchCompt.vue";

export default {
  name: "HomeView",
  components: {
    PanelComponent,
    PressupostList,
    SearchCompt,
  },
  data() {
    return {
      modelInput: "",
      errSearch: false,
      // flagReset: false,
      // checkedNames: [
      //   { id: 0, checked: false, value: "500" },
      //   { id: 1, checked: false, value: "300" },
      //   { id: 2, checked: false, value: "200" },
      // ],
      // dataPanel: [0, 0],
      // initParam: false,
      // flagNum: false,
      // totalA: 0,
      // totalB: 0,
      // dataItems: [],
      dataSaved: [],
      dataSearch: [],
      itemPresup: {
        idPresup: "",
        idClient: "",
        checkedNames: [
          { id: 0, checked: false, value: "500" },
          { id: 1, checked: false, value: "300" },
          { id: 2, checked: false, value: "200" },
        ],
        infoDataF: {
          numPages: 0,
          numLenguag: 0,
        },
        fechaInsercion: "",
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
        console.log(this.itemPresup);
        // Recupero los datos guardados en el localstorage para agregar el nuevo item de presupuesto
        // Al nuevo item a insertar le agrego la fecha de insercion
        this.itemPresup.fechaInsercion = new Date();
        if (this.dataSaved != null) this.dataSaved.push(this.itemPresup);
        else {
          // Es el primer item de presupuesto de llega
          this.dataSaved = [this.itemPresup];
        }
        localStorage.setItem(
          "listaPresupuesto",
          JSON.stringify(this.dataSaved)
        );
        this.initElement();
      }
    },
    // Funcion que ordena los elementos del array que se tiene en el localstorage
    seleccSort(optionValue) {
      console.log("seleccSort" + optionValue);
      let dataSavedTmp = [...this.dataSaved];
      switch (optionValue) {
        //  Orden alfabetico
        case 0:
          console.log("Orden alfabetico");
          this.dataSaved = dataSavedTmp.sort((x, y) =>
            x.idClient.localeCompare(y.idClient)
          );
          break;
        // Orden Cronologico
        case 1:
          console.log("Orden Cronologico");
          this.dataSaved = dataSavedTmp.sort((x, y) =>
            x.fechaInsercion.localeCompare(y.fechaInsercion)
          );
          break;
        //Orden por id
        case 2:
          console.log("Orden por id");
          this.dataSaved = dataSavedTmp.sort((x, y) =>
            x.idPresup.localeCompare(y.idPresup)
          );
          break;
        default:
          break;
      }
    },
    // Una vez insertado el nuevo registro en el localstorage limpiamos la variable que se utiliza para la insercion de los datos en el arreglo.
    initElement() {
      console.log("initElement");
      // this.dataSaved = [];
      this.itemPresup = {
        idPresup: "",
        idClient: "",
        checkedNames: [
          { id: 0, checked: false, value: "500" },
          { id: 1, checked: false, value: "300" },
          { id: 2, checked: false, value: "200" },
        ],
        infoDataF: {
          numPages: 0,
          numLenguag: 0,
        },
      };
    },
    // Antes de guardar un nuevo registro valido los datos
    valideFieldPattern() {
      console.log("valideFieldPattern");
      var patron = /^[0-9A-Za-z]{1,6}$/;
      if (
        patron.test(this.itemPresup.idPresup) &&
        patron.test(this.itemPresup.idClient)
      ) {
        console.log("Entro por datItems");

        // let flagControl = false;
        // if (this.totalSum <= 0) flagControl = true;

        // if (!flagControl) {
        this.addLocalStorage();
        // Una vez agregado el nuevo registro al localstorage reseteamos todas todas las variables
        console.log("Estamos aqui");
        this.initElement();
        // }
      }
    },
    cargaDataInitial(value) {
      console.log("cargaDataInitial()");
      this.dataSaved = value;
      console.log(typeof this.dataSaved);
    },
    clear() {
      console.log("clear");
      this.modelInput = "";
      this.initElement();
    },
    cargaInfoData(value) {
      console.log("cargaInfoData:" + value);
      // this.initElement();
      if (typeof Storage !== "undefined") {
        var recoverDataLS = JSON.parse(
          localStorage.getItem("listaPresupuesto")
        );
        //Recupero del arreglo guardado el registro del idPresupuesto solicitado
        this.dataSearch = recoverDataLS.find((item) => item.idPresup === value);

        for (let element in this.dataSearch)
          console.log(this.dataSearch[element]);

        //Valido que exista el elemento buscado
        if (this.dataSearch != undefined) {
          console.log("dataSearch:" + typeof this.dataSearch);
          console.log(this.dataSearch);
          // for (let i = 0; i < this.dataSearch.checked.length; i++) {
          this.itemPresup.checkedNames = this.dataSearch.checkedNames;
          //   if (this.dataSearch.checked[i] == 0) {
          this.itemPresup.infoDataF.numPages =
            this.dataSearch.infoDataF.numPages;
          this.itemPresup.infoDataF.numLenguag =
            this.dataSearch.infoDataF.numLenguag;

          //     //De esta forma abro el bloque de numero de paginas y numero de Lenguages
          if (
            this.itemPresup.infoDataF.numPages > 0 &&
            this.itemPresup.infoDataF.numLenguag > 0
          )
            // this.flagNum = true;
            //     console.log("Entra por alla");
            //     console.log(this.dataPanel);
            //   }
            // }
            console.log("Estamos en los ITEMS");
          this.itemPresup.idPresup = this.dataSearch.idPresup;
          this.itemPresup.idClient = this.dataSearch.idClient;
          // console.log("this.flagNum:" + this.flagNum);
          console.log("Fin de CargaData");
        } else {
          console.log("Tiempo de error");
          this.errSearch = true;
          // Esto no puede ser porque el scope no seria correcto
          // setTimeout(function () {
          //   this.errSearch = false;
          // }, 1000);
          setTimeout(() => (this.errSearch = false), 2000);
        }
      }
    },
  },
  computed: {
    totalSumA() {
      let totalPartial = 0;
      console.log("newSum()");
      if (
        this.itemPresup.infoDataF.numPages > 0 &&
        this.itemPresup.infoDataF.numLenguag > 0 &&
        this.itemPresup.checkedNames[0].checked == true
      )
        totalPartial =
          this.itemPresup.infoDataF.numPages *
          this.itemPresup.infoDataF.numLenguag *
          30;

      for (let indexId in this.itemPresup.checkedNames) {
        if (this.itemPresup.checkedNames[indexId].checked == true)
          totalPartial += parseInt(this.itemPresup.checkedNames[indexId].value);
      }
      return totalPartial;
    },
  },
  // mounted() {
  //   this.initElement();
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
