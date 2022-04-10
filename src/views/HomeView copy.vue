<template>
  <div class="grid-layout">
    <!-- Utilizo v-model con input de tipo checkbox, puedo colocar el value en el tag -->
    <div></div>
    <div class="home row justify-content-center align-items-center">
      <div class="col-11 col-sm-9 block-items border border-2">
        <div class="d-flex">
          <div>
            <label for="idPres">id Presupuesto</label>
            <input id="idPres" v-model="dataItems[0]" />
          </div>
          <div>
            <label for="idClient">id Cliente</label>
            <input id="idClient" v-model="dataItems[1]" />
          </div>
        </div>

        <h1>Que quieres hacer ?</h1>
        <div id="v-model-multiple-checkboxes">
          <div class="d-flex justify-content-start align-items-baseline">
            <input
              id="valor_0"
              type="checkbox"
              name="pagWeb"
              v-model="checkedNames.checked"
              v-bind:idItem="checkedNames.id"
              value="500"
              @change="sumaImportes(1)"
            />
            <label class="ps-2" for="pagWeb"> Una pàgina web (500€)</label
            ><br />
          </div>
          <PanelComponent @totalAdd="newSum" v-show="flagNum" />

          <div class="d-flex justify-content-start align-items-baseline">
            <input
              id="valor_1"
              type="checkbox"
              name="conSeo"
              v-model="checkedNames.checked"
              v-bind:idItem="checkedNames.id"
              value="300"
              @change="sumaImportes(0)"
            />
            <label class="ps-2" for="conSeo"> Una consultoria SEO(300€)</label
            ><br />
          </div>

          <div class="d-flex justify-content-start align-items-baseline">
            <input
              id="valor_2"
              type="checkbox"
              name="camGads"
              v-model="checkedNames.checked"
              v-bind:idItem="checkedNames.id"
              value="200"
              @change="sumaImportes(0)"
            />
            <label class="ps-2" for="conSeo"
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
    <div class="d-flex flex-column align-items-center">
      <h4>Listado de Presupuestos</h4>
      <div
        class="d-flex w-100 justify-content-around border-top border-4 align-items-bottom py-2"
      >
        <h6 class="my-0">nº Prepuesto</h6>
        <h6 class="my-0">nº Cliente</h6>
      </div>
    </div>
    <PressupostList />
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
      totalSum: 0,
      checkedNames: [{"id":1,
      "checked":true}],
      flagNum: false,
      totalA: 0,
      totalB: 0,
      dataItems: [],
      itemPresup: {
        idPresup: 0,
        idClient: 0,
        checked: [],
        infoDataF: {
          numPages: 0,
          numLenguag: 0,
        },
      },
    };
  },
  methods: {
    sumaImportes(option) {
      this.totalA = 0;
      if (option == "1") this.flagNum = !this.flagNum;
      if (!this.flagNum) this.totalB = 0;

      for (let value of this.checkedNames) {
        this.totalA += parseInt(value);
      }
      this.totalSum = this.totalA + this.totalB;
    },
    newSum(totalPartial, fieldsPanel) {
      console.log("newSum:" + totalPartial + "-" + this.totalA);
      console.log("fieldsPanel" + fieldsPanel);
      this.totalB = totalPartial;
      this.totalSum = totalPartial + this.totalA;
      this.itemPresup.infoDataF = [...fieldsPanel];
    },
    valideFieldPattern() {
      console.log("valideFieldPattern");
      //this.initItemPresup();
      if (this.dataItems.length == 2) {
        console.log("Entro por datItems");
        var patron = /^[0-9]{1,6}$/;

        let flagControl = false;
        for (let e of this.dataItems)
          if (!patron.test(e) || e == 0 || this.totalSum <= 0)
            flagControl = true;

        if (!flagControl) {
          console.log("Pasamos el filtro");
          this.itemPresup.idPresup = this.dataItems[0];
          this.itemPresup.idClient = this.dataItems[1];

          console.log(this.itemPresup.idPresup);
          console.log(this.itemPresup.idClient);
          let checkItems = document.querySelectorAll(
            "input[type=checkbox]:checked"
          );
          console.log(checkItems);
          for (let e of checkItems) {
            console.log("hh");
            console.log(e);
            this.itemPresup.checked.push(e.id);
          }
          console.log(this.itemPresup);
        }
      }
    },
  },
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
/* .home {
  height: 50vh;
} */

.grid-layout {
  display: grid;
  grid-template-columns: 20% 50% 29%;
  grid-template-rows: 90vh;
}
@media (min-width: 620px) {
  .block-items {
    width: 504px;
  }
}
</style>
