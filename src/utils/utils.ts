export function imageData2Blob (imageData: ImageData) {
  const [w, h] = [imageData.width, imageData.height]
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx?.putImageData(imageData, 0, 0)
  return new Promise((resolve) => {
    const type = 'image/png'
    let quality: number | undefined
    canvas.toBlob(resolve, 'image/png', quality)
  })
}