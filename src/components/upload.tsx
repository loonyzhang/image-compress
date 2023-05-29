'use client';

import { useContext } from "react";
import { TasksDispatchContext } from "@/store/task";
import { useDropzone } from "react-dropzone";

export function Upload () {
  const dispatch = useContext(TasksDispatchContext)
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    onDrop: files => {
      dispatch({
        type: 'add',
        data: files.map((file) => ({
          name: file.name,
          originalSize: file.size,
          blob: file,
          isCompress: false
        }))
      })
    }
  })

  return (
    <div className="relative w-80 mx-auto rounded border-4 border-dashed flex flex-col justify-center items-center py-10 bg-gray-50 cursor-pointer" {...getRootProps()}>
      <div>
        <input {...getInputProps()} />
        <p>拖动或点击上传多个文件</p>
      </div>
    </div>
  )
}