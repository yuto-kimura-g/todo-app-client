'use client';

import { TaskType } from '@/types/types';
import { ChakraProvider } from '@chakra-ui/react';
import React, { createContext, useReducer } from 'react';

export const TasksContext = createContext<TaskType[]>([]);
export const TasksDispatchContext = createContext<React.Dispatch<ActionType>>(
  () => {}
);

// export const useTasks = (): StateType => {
//   return useContext(TasksContext);
// };
// export const useTasksDispatch = (): React.Dispatch<ActionType> => {
//   return useContext(TasksDispatchContext);
// };

type StateType = TaskType[];

type ActionType =
  | {
      type: 'Initialize';
      payload: { fetchedTasks: TaskType[] };
    }
  | {
      type: 'Create';
      payload: { createdTask: TaskType };
      // payload: { newTask: NewTaskType };
    }
  | {
      type: 'Update';
      payload: { taskId: number; updatedTask: TaskType };
      // payload: { taskId: number; newTask: NewTaskType };
    }
  | {
      type: 'Delete';
      payload: { taskId: number };
    };

const tasksReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'Initialize': {
      console.log('Initialize dispatch:', action);
      return action.payload.fetchedTasks;
    }
    case 'Create': {
      console.log('Create dispatch:', action);
      // 注意：ここでは非同期処理をやらない
      // 以下のようにstateだけを更新する
      return [action.payload.createdTask, ...state];
      // 以下のようにやると，reducerをasyncにする必要があるが，それは出来ない
      // なんか色々回避方法があるみたいだけど，asyncを外に出すのが一番綺麗だったのでそれを採用
      // api.createTask(action.payload.newTask).then((createdTask) => {
      //   return [createdTask, ...state];
      // });
    }
    case 'Update': {
      console.log('Update dispatch:', action);
      // これって毎回全部のデータを作り直している？
      return state.map((task) => {
        if (task.id === action.payload.updatedTask.id) {
          return action.payload.updatedTask;
        } else {
          return task;
        }
      });
    }
    case 'Delete': {
      console.log('Delete dispatch:', action);
      return state.filter((task) => {
        return task.id !== action.payload.taskId;
      });
    }
    default: {
      throw new Error(`Unknown action type: ${action}`);
    }
  }
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  const initialState: StateType = [];
  const [tasks, dispatch] = useReducer(tasksReducer, initialState);

  return (
    <ChakraProvider>
      <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
          {children}
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </ChakraProvider>
  );
};

export default Provider;
