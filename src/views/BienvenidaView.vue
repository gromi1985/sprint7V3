<template>
  <div id="bienvida" class="container">
    <div>
      <h1>CALCULADORA DE PRESUPUESTO</h1>
      <p class="text-left">
        La calculadora mostrada le permitirá calcular el coste de 3 diferentes
        servicios individuales o en conjunto:
      </p>

      <ul>
        Servicios

        <li>
          Creación de WebSite: El coste será calculado en base al numero de
          idiomas.
        </li>
        <li>Consultoria SEO</li>
        <li>Campaña de Google Ads</li>
      </ul>
      <h4>FORMULAS EMPLEADAS</h4>
      <p>
        En el coste de creacion del website se aplica la siguiente formula:<span
          >numero de paginas * numero de idiomas * 30</span
        >
      </p>
      <p>
        Preu: valor dinámico, es la suma de los servicios mostrados, será
        mostrado segun las opciones escogidas.
      </p>
    </div>
    <button @click="toHome">CALCULADORA</button>
  </div>
</template>

<script>
export default {
  methods: {
    toHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
#bienvida {
  margin: 0 auto;
  border: 1px solid green;
  padding: 10%;
}
#bienvida li {
  list-style: none;
}

p,
li {
  text-align: start;
}
</style>
