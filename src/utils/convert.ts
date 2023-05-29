import * as jpg from "@jsquash/jpeg";
import * as png from "@jsquash/png";
import * as webp from "@jSquash/webp";
import init, { optimise } from "@jSquash/oxipng/codec/pkg/squoosh_oxipng";

export async function decode (file: File) {
  const buffer = await file.arrayBuffer()
  const type = file.type.replace('image/', '')
  switch (type) {
    case 'jpeg':
    case 'jpg':
      return await jpg.decode(buffer)
    case 'png':
      await init()
      const optBuff = await optimise(new Uint8Array(buffer), 3, false)
      return await png.decode(optBuff)
    case 'webp':
      return await webp.decode(buffer)
  }
}

export async function encode (outputType: string, imageData: ImageData) {
  switch (outputType) {
    case 'jpeg':
      return await jpg.encode(imageData);
    case 'png':
      return await png.encode(imageData);
    case 'webp':
      return await webp.encode(imageData);
    default:
      throw new Error(`Unknown output type: ${outputType}`);
  }
}

export async function compress(file: File) {
  const type = file.type.replace('image/', '')
  const imageData = await decode(file)
  const compressBuff = await encode(type, imageData!)
  const blob = new Blob([compressBuff], { type: `image/${type}` })
  return {
    name: file.name,
    blob
  }
}
