import {kernels} from "./kernels.js";

document.getElementById("calculate").addEventListener("click", function() {
  document.documentElement.style.cursor = "wait";
  const img = document.getElementById("image-preview");
    if (!img.src || img.style.display === "none") {
        alert("No hay imagen cargada.");
        document.documentElement.style.cursor = "default";
        return;
    }

    const selected_kernel = document.getElementById("letter").value;
    let kernel = kernels[selected_kernel]
    const scalar = document.getElementById("text-input").value;
    kernel = multiplyMatrixByScalar(kernel, scalar);

    const filteredCanvas = applyConvolution(img, kernel);
    const filteredImage = document.getElementById("image-preview-generated");
    filteredImage.src = filteredCanvas.toDataURL();
    filteredImage.style.display = "block";
    setTimeout(() => {
      document.documentElement.style.cursor = "default";
  }, 500);
});

function applyConvolution(img, kernel) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Ajustar tamaño del canvas al de la imagen
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  // Obtener datos de la imagen original
  const imageData = ctx.getImageData(0, 0, img.width, img.height);
  const pixels = imageData.data;

  // Crear un nuevo ImageData para la imagen filtrada
  const newImageData = ctx.createImageData(img.width, img.height);
  const newPixels = newImageData.data;

  const kernelSize = kernel.length; // Tamaño del kernel (ej: 3 o 5)
  const halfSize = Math.floor(kernelSize / 2); // Mitad del kernel

  // Recorrer cada píxel de la imagen (ignorando los bordes)
  for (let y = halfSize; y < img.height - halfSize; y++) {
      for (let x = halfSize; x < img.width - halfSize; x++) {
          let sumR = 0, sumG = 0, sumB = 0;

          // Aplicar el kernel sobre la ventana de píxeles
          for (let ky = 0; ky < kernelSize; ky++) {
              for (let kx = 0; kx < kernelSize; kx++) {
                  const pixelX = x + kx - halfSize;
                  const pixelY = y + ky - halfSize;
                  const pixelIndex = (pixelY * img.width + pixelX) * 4; // Multiplica por 4 (RGBA)

                  const weight = kernel[ky][kx]; // Valor del kernel
                  sumR += pixels[pixelIndex] * weight;
                  sumG += pixels[pixelIndex + 1] * weight;
                  sumB += pixels[pixelIndex + 2] * weight;
              }
          }

          // Clampear valores (asegurar que estén entre 0 y 255)
          const newIndex = (y * img.width + x) * 4;
          newPixels[newIndex] = Math.min(255, Math.max(0, sumR));
          newPixels[newIndex + 1] = Math.min(255, Math.max(0, sumG));
          newPixels[newIndex + 2] = Math.min(255, Math.max(0, sumB));
          newPixels[newIndex + 3] = 255; // Mantener el canal alfa en 255 (opaco)
      }
  }

  // Dibujar la imagen filtrada en el canvas
  ctx.putImageData(newImageData, 0, 0);

  return canvas; // Retorna el canvas con la imagen filtrada
}

function multiplyMatrixByScalar(matrix, scalar) {
  // Si el escalar es 1, devuelve la matriz sin cambios
  if (scalar === 1) {
      return matrix;
  }

  // Multiplicar cada elemento por el escalar y devolver la nueva matriz
  return matrix.map(row => row.map(value => value * scalar));
}
