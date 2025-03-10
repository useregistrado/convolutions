import {kernels_3x3, kernels_5x5, kernels} from "./kernels.js";

// Diccionario de traducciones
const translations = {
  "es": {
      "title": "Aprende y entiende cómo una red neuronal convolucional aplica filtros para detectar patrones en imágenes.",
      "subtitle1": "¿Qué es una convolución?",
      "parragraph1": "Una convolución en imágenes es una operación matemática utilizada en procesamiento de imágenes y redes neuronales convolucionales (CNN). Consiste en aplicar un filtro (o kernel) sobre una imagen para extraer características importantes como bordes, texturas o patrones específicos.",
      "subtitle2": "¿Cómo funciona la convolución en imágenes?",
      "step1": "Filtro (Kernel): Es una matriz pequeña (por ejemplo, 3x3 o 5x5) con valores numéricos.",
      "step2": "Multiplicación y suma: Se desliza el filtro sobre la imagen, multiplicando cada píxel por el valor correspondiente del filtro y sumando los resultados.",
      "step3": "Generación de una nueva imagen (mapa de características): Se obtiene una imagen transformada que resalta ciertos aspectos según el filtro utilizado.",
  },
  "en": {
      "title": "Learn and understand how a convolutional neural network applies filters to detect patterns in images.",
      "subtitle1": "What is a convolution?",
      "parragraph1": "A convolution in images is a mathematical operation used in image processing and convolutional neural networks (CNNs). It consists of applying a filter (or kernel) to an image to extract important features such as edges, textures, or specific patterns.",
      "subtitle2": "How does convolution work on images?",
      "step1": "Filter (Kernel): It is a small matrix (e.g., 3x3 or 5x5) with numerical values.",
      "step2": "Multiplication and summation: The filter slides over the image, multiplying each pixel by the corresponding filter value and summing the results.",
      "step3": "Generation of a new image (feature map): A transformed image is obtained that highlights certain aspects according to the filter used."
  }
};

// Función para actualizar el idioma en la página
function updateLanguage(lang) {
  document.querySelector("[data-key='title']").textContent = translations[lang]["title"];
  document.querySelector("[data-key='subtitle1']").textContent = translations[lang]["subtitle1"];
  document.querySelector("[data-key='parragraph1']").textContent = translations[lang]["parragraph1"];
  document.querySelector("[data-key='subtitle2']").textContent = translations[lang]["subtitle2"];
  document.querySelector("[data-key='step1']").textContent = translations[lang]["step1"];
  document.querySelector("[data-key='step2']").textContent = translations[lang]["step2"];
  document.querySelector("[data-key='step3']").textContent = translations[lang]["step3"];

  localStorage.setItem("selectedLanguage", lang); // Guardar la preferencia
}

// Función para detectar el idioma del navegador o usar el guardado
function detectLanguage() {
  const savedLang = localStorage.getItem("selectedLanguage");
  const userLang = savedLang || (navigator.language.startsWith("es") ? "es" : "en");

  document.getElementById("language").value = userLang;
  updateLanguage(userLang);
}

function loadSelect(kernels) {
  const select_kernel = document.getElementById('letter');
  select_kernel.innerHTML = ''

  const keys = Object.keys(kernels);
  keys.forEach(key => {
    const option = document.createElement('option'); // Nuevo un elemento <option>
    option.value = key;
    option.textContent = key.replace('3x3_', '').replace('5x5_', '').replace('_', ' ');
    select_kernel.appendChild(option);
  });
}

// Evento para cambiar el idioma manualmente
document.getElementById("language").addEventListener("change", function() {
  updateLanguage(this.value);
});

// Ejecutar detección de idioma al cargar la página
window.onload = detectLanguage;

// Selección de elementos
const imageUpload = document.getElementById("image-upload");
const imagePreview = document.getElementById("image-preview");

imageUpload.addEventListener("change", function(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const tempImg = new Image();
      tempImg.src = e.target.result;

      tempImg.onload = function() {
        getImageChannels(tempImg, function(channels) {
          if (channels === 3) {
            // SOLO si la imagen tiene 3 canales, la mostramos
            imagePreview.src = e.target.result;
            imagePreview.style.display = "block";
            console.log("Imagen válida: RGB (3 canales)");
          } else {
            // Si tiene más de 3 canales, mostrar alerta y no cargar la imagen
            alert("Solo se permiten imágenes con 3 canales (RGB).");
            imageUpload.value = ""; // Resetear input para evitar carga
            console.log("Imagen rechazada: No es RGB (3 canales)");
          }
        });
      };
    };

    reader.readAsDataURL(file);
  }
});



document.getElementById("kernel-size").addEventListener("change", function(event) {
  const size_kernel = event.target.value;
  if(size_kernel === '3x3') {
    loadSelect(kernels_3x3);
  }

  if(size_kernel === '5x5') {
    loadSelect(kernels_5x5);
  }
  getToRender()
});

document.getElementById("letter").addEventListener("change", function(event) {
  getToRender();
});

document.addEventListener("DOMContentLoaded", function() {
  loadSelect(kernels_3x3);
  getToRender();
});

function getToRender() {
  const selected_kernel = document.getElementById("letter").value;
  const kernel = kernels[selected_kernel]
  renderKernel(kernel)
  const result = document.getElementById('result')
  result.innerHTML = selected_kernel.replaceAll('_', ' ')
}

function renderKernel(kernel) {
  const size = kernel.length
  const kernelPreview = document.getElementById("kernel-preview");
  kernelPreview.innerHTML = "";
  kernelPreview.style.gridTemplateColumns = `repeat(${size}, 50px)`;
  kernelPreview.style.gridTemplateRows = `repeat(${size}, 50px)`;

  kernel.forEach(row => {
    row.forEach(value => {
      const span = document.createElement("span");
      span.textContent = value;
      kernelPreview.appendChild(span);
    });
  });
}

function getImageChannels(img, callback) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Ajustar el canvas al tamaño de la imagen
  canvas.width = img.width;
  canvas.height = img.height;

  // Dibujar la imagen en el canvas
  ctx.drawImage(img, 0, 0);

  // Obtener datos de un solo píxel para analizar los canales
  const imageData = ctx.getImageData(0, 0, 1, 1).data;

  // Determinar si tiene canal Alfa
  const hasAlpha = imageData[3] < 255; // Si A < 255, la imagen tiene 4 canales (RGBA)
  const channels = hasAlpha ? 4 : 3;

  callback(channels); // Enviar el número de canales a la función de callback
}


document.getElementById("action-button").addEventListener("click", function() {
  const img = document.getElementById("image-preview-generated");

  if (!img.src || img.style.display === "none") {
      alert("No hay imagen para descargar.");
      return;
  }

  const link = document.createElement("a");
  link.href = img.src; // Usa el src de la imagen generada
  link.download = "imagen_filtrada.png"; // Nombre del archivo descargado
  link.click(); // Simula el clic para descargar
});
