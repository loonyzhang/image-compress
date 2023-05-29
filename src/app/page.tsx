'use client';

import { XTable } from "@/components/table";
import { Upload } from "@/components/upload";
import { useReducer } from "react";
import { TasksContext, TasksDispatchContext } from "@/store/task";
import { compress } from "@/utils/convert";

function tasksReducer (tasks: any[], action: {type: string, data: any}) {
  switch (action.type) {
    case 'add': {
      return [
        ...tasks,
        ...action.data
      ]
    }
    case 'transform': {
      return [
        ...action.data
      ]
    }
    default: {
        throw Error('Unknown action: ' + action.type);
      }
  }
}

export default function Home() {
  const [tasks, dispatch] = useReducer(tasksReducer, [])
  const handleCompress = async () => {
    const allTasks = tasks.map((task) => {
      return new Promise((resolve) => {
        if (task.isCompress) resolve(task)
        compress(task.blob).then(({ blob }) => {
          resolve({
            name: task.name,
            originalSize: task.originalSize,
            previewSize: blob.size,
            blob,
            isCompress: true
          })
        })
      })
    })
    const allRes = await Promise.all(allTasks)
    dispatch({
      type: 'transform',
      data: allRes
    })
  }
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <header>
          <div className="navbar bg-base-100">
            <a className="btn btn-ghost normal-case text-xl">在线图片压缩</a>
          </div>
        </header>
        <main className="flex-1 container mx-auto py-5 space-y-4">
          <Upload />
          <XTable />
          <div className="flex justify-center">
            <button className="btn btn-primary" onClick={handleCompress}>开始压缩</button>
          </div>
        </main>
        <footer className="footer footer-center p-4 text-base-content">
          <div>
            <p>Copyright © 2023</p>
          </div>
        </footer>
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )
}
