const kernel_sobel_x = [
  [-1,  0,  1],
  [-2,  0,  2],
  [-1,  0,  1]
]

const kernel_sobel_y = [
  [-1, -2, -1],
  [ 0,  0,  0],
  [ 1,  2,  1]
]

const kernel_prewitt_x = [
  [-1,  0,  1],
  [-1,  0,  1],
  [-1,  0,  1]
]

const kernel_prewitt_y = [
  [-1, -1, -1],
  [ 0,  0,  0],
  [ 1,  1,  1]
]

const kernel_laplaciano = [
  [ 0, -1,  0],
  [-1,  4, -1],
  [ 0, -1,  0]
]

const kernel_laplaciano_hard = [
  [-1, -1, -1],
  [-1,  8, -1],
  [-1, -1, -1]
]

const kernel_blur = [
  [1/9, 1/9, 1/9],
  [1/9, 1/9, 1/9],
  [1/9, 1/9, 1/9]
]

const kernel_gaussiano = [
  [1/16, 2/16, 1/16],
  [2/16, 4/16, 2/16],
  [1/16, 2/16, 1/16]
]

const kernel_sharpen = [
  [ 0, -1,  0],
  [-1,  5, -1],
  [ 0, -1,  0]
]

const kernel_lineas_verticales = [
  [-1,  2, -1],
  [-1,  2, -1],
  [-1,  2, -1]
]

const kernel_lineas_horizontales = [
  [-1, -1, -1],
  [ 2,  2,  2],
  [-1, -1, -1]
]


export const kernels_3x3 = {
  '3x3_sobel_x': kernel_sobel_x,
  '3x3_sobel_y': kernel_sobel_y,
  '3x3_prewitt_x': kernel_prewitt_x,
  '3x3_prewitt_y': kernel_prewitt_y,
  '3x3_laplaciano': kernel_laplaciano,
  '3x3_laplaciano_hard': kernel_laplaciano_hard,
  '3x3_blur': kernel_blur,
  '3x3_gaussiano': kernel_gaussiano,
  '3x3_sharpen': kernel_sharpen,
  '3x3_lineas_verticales': kernel_lineas_verticales,
  '3x3_lineas_horizontales': kernel_lineas_horizontales,
}


const kernel_sobel_x_5x5 = [
  [-2, -1,  0,  1,  2],
  [-3, -2,  0,  2,  3],
  [-4, -3,  0,  3,  4],
  [-3, -2,  0,  2,  3],
  [-2, -1,  0,  1,  2]
]

const kernel_sobel_y_5x5 = [
  [-2, -3, -4, -3, -2],
  [-1, -2, -3, -2, -1],
  [ 0,  0,  0,  0,  0],
  [ 1,  2,  3,  2,  1],
  [ 2,  3,  4,  3,  2]
]

const kernel_laplaciano_5x5 = [
  [ 0,  0, -1,  0,  0],
  [ 0, -1, -2, -1,  0],
  [-1, -2, 16, -2, -1],
  [ 0, -1, -2, -1,  0],
  [ 0,  0, -1,  0,  0]
]

const kernel_blur_5x5 = [
  [1/25, 1/25, 1/25, 1/25, 1/25],
  [1/25, 1/25, 1/25, 1/25, 1/25],
  [1/25, 1/25, 1/25, 1/25, 1/25],
  [1/25, 1/25, 1/25, 1/25, 1/25],
  [1/25, 1/25, 1/25, 1/25, 1/25]
]

const kernel_gaussiano_5x5 = [
  [1/256,  4/256,  6/256,  4/256, 1/256],
  [4/256, 16/256, 24/256, 16/256, 4/256],
  [6/256, 24/256, 36/256, 24/256, 6/256],
  [4/256, 16/256, 24/256, 16/256, 4/256],
  [1/256,  4/256,  6/256,  4/256, 1/256]
]

const kernel_sharpen_5x5 = [
  [ 0,  0, -1,  0,  0],
  [ 0, -1, -2, -1,  0],
  [-1, -2, 16, -2, -1],
  [ 0, -1, -2, -1,  0],
  [ 0,  0, -1,  0,  0]
]

const kernel_lineas_verticales_5x5 = [
  [-1, -2,  0,  2,  1],
  [-1, -2,  0,  2,  1],
  [-1, -2,  0,  2,  1],
  [-1, -2,  0,  2,  1],
  [-1, -2,  0,  2,  1]
]

const kernel_lineas_horizontales_5x5 = [
  [-1, -1, -1, -1, -1],
  [-2, -2, -2, -2, -2],
  [ 0,  0,  0,  0,  0],
  [ 2,  2,  2,  2,  2],
  [ 1,  1,  1,  1,  1]
]

export const kernels_5x5 = {
  '5x5_sobel_x': kernel_sobel_x_5x5,
  '5x5_sobel_y': kernel_sobel_y_5x5,
  '5x5_laplaciano': kernel_laplaciano_5x5,
  '5x5_blur': kernel_blur_5x5,
  '5x5_gaussiano': kernel_gaussiano_5x5,
  '5x5_sharpen': kernel_sharpen_5x5,
  '5x5_lineas_verticales': kernel_lineas_verticales_5x5,
  '5x5_lineas_horizontales': kernel_lineas_horizontales_5x5,
}

export const kernels = {
  '3x3_sobel_x': kernel_sobel_x,
  '3x3_sobel_y': kernel_sobel_y,
  '3x3_prewitt_x': kernel_prewitt_x,
  '3x3_prewitt_y': kernel_prewitt_y,
  '3x3_laplaciano': kernel_laplaciano,
  '3x3_laplaciano_hard': kernel_laplaciano_hard,
  '3x3_blur': kernel_blur,
  '3x3_gaussiano': kernel_gaussiano,
  '3x3_sharpen': kernel_sharpen,
  '3x3_lineas_verticales': kernel_lineas_verticales,
  '3x3_lineas_horizontales': kernel_lineas_horizontales,
  '5x5_sobel_x': kernel_sobel_x_5x5,
  '5x5_sobel_y': kernel_sobel_y_5x5,
  '5x5_laplaciano': kernel_laplaciano_5x5,
  '5x5_blur': kernel_blur_5x5,
  '5x5_gaussiano': kernel_gaussiano_5x5,
  '5x5_sharpen': kernel_sharpen_5x5,
  '5x5_lineas_verticales': kernel_lineas_verticales_5x5,
  '5x5_lineas_horizontales': kernel_lineas_horizontales_5x5,
}