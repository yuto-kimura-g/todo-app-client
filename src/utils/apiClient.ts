import { API_URL } from '@/config/env';
import { NewTaskType, TaskType } from '@/types/types';
import axios from 'axios';

const endpoint = (taskId: number): string => {
  return `${API_URL}/${taskId}`;
};

/**
 * タスク一覧を取得する
 * @returns {Promise<TaskType[]>} タスク一覧の配列
 */
export const getTasks = async (): Promise<TaskType[]> => {
  // try {
  //   const resp = await axios.get<TaskType[]>(API_URL);
  //   return resp.data;
  // } catch (error) {
  //   console.error(error);
  //   return [];
  // }
  // あえてエラーハンドリングしない
  // （next?の機能で画面上にエラーが表示される方が便利）
  const resp = await axios.get<TaskType[]>(API_URL);
  return resp.data;
};

/**
 * タスクを１つ追加する
 * @param {NewTaskType} newTask 追加するタスク
 * @returns {Promise<TaskType>} 追加したタスク
 */
export const createTask = async (newTask: NewTaskType): Promise<TaskType> => {
  const resp = await axios.post<TaskType>(API_URL, newTask);
  return resp.data;
};

/**
 * タスクを１つ更新する
 * @param {number} taskId 更新するタスクのID
 * @param {NewTaskType} newTask 更新後のタスク
 * @returns {Promise<TaskType>} 更新後のタスク
 */
export const updateTask = async (
  taskId: number,
  newTask: NewTaskType
): Promise<TaskType> => {
  const resp = await axios.put<TaskType>(endpoint(taskId), newTask);
  return resp.data;
};

/**
 * タスクを１つ削除する
 * @param {number} taskId 削除するタスクのID
 */
export const deleteTask = async (taskId: number): Promise<void> => {
  await axios.delete(endpoint(taskId));
};
