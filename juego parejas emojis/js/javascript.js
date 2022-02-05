//array con nuestro contenido
let grupoTarjetas = ["🦄", "🍦", "🌈", "👽", "👾", "🤖", "👹", "👺"];
//duplicamos el array para tener doble de cada dibujo
let totalTarjetas = grupoTarjetas.concat(grupoTarjetas);

//funcion para ordenarlas aleatoriamente
function barajaTarjetas() {
  let resultado;
  resultado = totalTarjetas.sort(function () {
    return 0.5 - Math.random();
  });
  return resultado;
}

//funcion para repartir los dibujos en cada card sobre la "mesa"
function reparte() {
  let mesa = document.querySelector("#mesa"); //capturamos mesa
  let tarjetasBarajadas = barajaTarjetas(); //seleccionamos el array que vamos a repartir, en este caso dibujos aleatorios.
  //pintsmod una card por cada elemento del array
  tarjetasBarajadas.forEach(function (elemento) {
    let tarjeta = document.createElement("div");
    tarjeta.innerHTML =
      "<div class='tarjeta' data-valor= " +
      elemento +
      ">" +
      "<div class='tarjeta__contenido'>" +
      elemento +
      "</div>" +
      "</div>";

    mesa.appendChild(tarjeta);
  });
}
reparte();
//agregamos un evento click a cada card que tienen diferentes funciones
function descubrir() {
  let descubiertas;
  let totalDescubiertas = document.querySelectorAll(
    ".descubierta:not(.acertada)"
  );
  //condicion si se clickan en dos cartas, ya no te deja clickar mas
  if (totalDescubiertas.length > 1) {
    return;
  }
  this.classList.add("descubierta");
  //cuando tienes 2 cards descubiertas compara sus valores
  descubiertas = document.querySelectorAll(".descubierta:not(.acertada)");
  if (descubiertas.length < 2) {
    return;
  }
  comparar(descubiertas);
}

function comparar(tarjetasAComparar) {
  if (
    tarjetasAComparar[0].dataset.valor === tarjetasAComparar[1].dataset.valor
  ) {
    acierto(tarjetasAComparar);
  } else {
    error(tarjetasAComparar);
  }
}

function acierto(tarjetas) {
  tarjetas.forEach(function (elemento) {
    elemento.classList.add("acertada");
  });
}

function error(tarjetas) {
  tarjetas.forEach(function (elemento) {
    elemento.classList.remove("descubierta");
  });
}

document.querySelectorAll(".tarjeta").forEach(function (elemento) {
  elemento.addEventListener("click", descubrir);
});
