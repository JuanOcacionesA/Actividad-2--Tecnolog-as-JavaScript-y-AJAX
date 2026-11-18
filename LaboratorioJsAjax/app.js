const boton = document.getElementById("comprobar");

boton.addEventListener("click", function () {
  const textoOriginal = document.getElementById("cadena").value;

  const texto = textoOriginal
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  if (texto === "") {
    document.getElementById("resultado").textContent =
      "Escribe una palabra o frase.";
    return;
  }

  const textoInvertido = texto.split("").reverse().join("");
  if (texto === textoInvertido) {
    document.getElementById("resultado").textContent =
      "Sí, es un palíndromo.";
  } else {
    document.getElementById("resultado").textContent =
      "No es un palíndromo.";
  }
});

const botonComparar = document.getElementById("comparar");
botonComparar.addEventListener("click", function () {
  const numero1 = Number(document.getElementById("numero1").value);
  const numero2 = Number(document.getElementById("numero2").value);
  const resultado = document.getElementById("resultadoMayor");

  if (numero1 > numero2) {
    resultado.textContent = "El número mayor es: " + numero1;
  } else if (numero2 > numero1) {
    resultado.textContent = "El número mayor es: " + numero2;
  } else {
    resultado.textContent = "Los dos números son iguales.";
  }
});

const botonVocales = document.getElementById("mostrarVocales");
botonVocales.addEventListener("click", function () {
  const frase = document.getElementById("fraseVocales").value;
  const resultado = document.getElementById("resultadoVocales");
  let vocalesEncontradas = "";

  for (let i = 0; i < frase.length; i++) {
    const letra = frase[i].toLowerCase();

    if ("aeiouáéíóúü".includes(letra)) {
      vocalesEncontradas += letra + " ";
    }
  }

  if (vocalesEncontradas === "") {
    resultado.textContent = "No se encontraron vocales.";
  } else {
    resultado.textContent = "Las vocales que aparecen son: " + vocalesEncontradas;
  }
});

const botonContarVocales = document.getElementById("contarVocales");
botonContarVocales.addEventListener("click", function () {
  const frase = document.getElementById("fraseConteo").value.toLowerCase();
  const resultado = document.getElementById("resultadoConteo");

  let cantidadA = 0;
  let cantidadE = 0;
  let cantidadI = 0;
  let cantidadO = 0;
  let cantidadU = 0;

  for (let i = 0; i < frase.length; i++) {
    const letra = frase[i];

    if (letra === "a" || letra === "á") {
      cantidadA++;
    } else if (letra === "e" || letra === "é") {
      cantidadE++;
    } else if (letra === "i" || letra === "í") {
      cantidadI++;
    } else if (letra === "o" || letra === "ó") {
      cantidadO++;
    } else if (letra === "u" || letra === "ú" || letra === "ü") {
      cantidadU++;
    }
  }

  resultado.textContent =
    "A: " + cantidadA +
    " | E: " + cantidadE +
    " | I: " + cantidadI +
    " | O: " + cantidadO +
    " | U: " + cantidadU;
});

const campoUrl = document.getElementById("url");
campoUrl.value = window.location.href;

const botonMostrar = document.getElementById("mostrarContenido");

botonMostrar.addEventListener("click", function () {
  const url = document.getElementById("url").value;
  const peticion = new XMLHttpRequest();

  peticion.onreadystatechange = function () {
    const estados = [
      "No iniciada",
      "Conexión establecida",
      "Cabeceras recibidas",
      "Cargando contenido",
      "Petición completada"
    ];

    document.getElementById("estado").textContent =
      estados[peticion.readyState];

    if (peticion.readyState === 2 || peticion.readyState === 4) {
      document.getElementById("codigoEstado").textContent =
        peticion.status + " " + peticion.statusText;

      document.getElementById("cabeceras").textContent =
        peticion.getAllResponseHeaders();
    }

    if (peticion.readyState === 4) {
      document.getElementById("contenido").textContent =
        peticion.responseText;
    }
  };

  peticion.onerror = function () {
    document.getElementById("estado").textContent =
      "Error de conexión o acceso bloqueado";

    document.getElementById("contenido").textContent =
      "No se pudo obtener la respuesta. Revisa la URL y la conexión.";
  };

  peticion.open("GET", url, true);
  peticion.send();
});