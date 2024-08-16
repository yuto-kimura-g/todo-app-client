import { API_URL } from '@/config/env';
import { NewTaskType, TaskType } from '@/types/types';
import axios from 'axios';

const endpoint = (taskId: number): string => {
  return `${API_URL}/${taskId}`;
};

export const getTasks = async (): Promise<TaskType[]> => {
  try {
    const resp = await axios.get<TaskType[]>(API_URL);
    return resp.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createTask = async (newTask: NewTaskType): Promise<TaskType> => {
  const resp = await axios.post<TaskType>(API_URL, newTask);
  return resp.data;
};

export const updateTask = async (
  taskId: number,
  newTask: NewTaskType
): Promise<TaskType> => {
  const resp = await axios.put<TaskType>(endpoint(taskId), newTask);
  return resp.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await axios.delete(endpoint(taskId));
};
