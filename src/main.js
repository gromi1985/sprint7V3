import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//fontawesome-svg-core: esta tiene la totalidad de la funcion que me permite importar svg(s) e imagenes a mi proyecto
//Esta sentencia es para agregar la funcionalidad de trabajar con fontawesome en mi proyecto .
//import { library } from "@fortawesome/fontawesome-svg-core";

//Esta sentencia importo los svg(s) de la clase faUserSecret
//import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

//Importo el componente FontAwesomeIcon con el cual voy a trabajar
//import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//Con esta sentencia agrego a mi proyecto los svg de esta clase.
//library.add(faUserSecret);

createApp(App).use(router).mount("#app");
//  .component("font-awesome-icon", FontAwesomeIcon)
