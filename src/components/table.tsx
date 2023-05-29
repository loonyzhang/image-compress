import { type MouseEvent, useContext, useRef } from "react";
import { TasksContext, type TaskType } from "@/store/task";

export function XTable () {
  const tasks = useContext(TasksContext)

  const revoker = useRef('')

  const handleDownload = (task: TaskType) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (revoker.current) {
      URL.revokeObjectURL(revoker.current)
      revoker.current = ''
    }
    const url = URL.createObjectURL(task.blob)
    window.open(url, 'preview')
    revoker.current = url
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>名称</th>
            <th>原始大小</th>
            <th>预览大小</th>
            <th>压缩率</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {
            tasks.length > 0 ?
            tasks.map((task, index) => (
              <tr key={task.name}>
                <th>{ index+1 }</th>
                <td>{ task.name }</td>
                <td>{ (task.originalSize / 1024).toFixed(2) }KB</td>
                <td>{ task.previewSize ? `${(task.previewSize / 1024).toFixed(2)}KB` : '-' }</td>
                <td>{ task.previewSize ? `${((task.originalSize - task.previewSize) / task.originalSize * 100).toFixed(2)}%` : '-' }</td>
                <td>
                  {task.isCompress ? <a className="link" onClick={handleDownload(task)}>下载</a> : '-'}
                </td>
              </tr>
            ))
            :
            <tr>
              <td colSpan={6}>暂无数据</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}