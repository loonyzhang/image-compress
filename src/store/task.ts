import { Dispatch, createContext } from "react";

export interface TaskType {
  name: string;
  originalSize: number
  previewSize?: number
  compressRate?: number
  blob: Blob
  isCompress: boolean
}

export const TasksContext = createContext<TaskType[]>([])
export const TasksDispatchContext = createContext<Dispatch<{
  type: string;
  data: TaskType | TaskType[];
}>>(null as any)