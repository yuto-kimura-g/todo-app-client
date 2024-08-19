'use client';

import { TasksContext, TasksDispatchContext } from '@/components/Providers';
import TaskView from '@/components/TaskView';
import * as api from '@/utils/apiClient';
import { Text, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';

const TaskList: React.FC = () => {
  const tasks = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);

  // クライアント側のデータ(tasks)の初期化
  // - ここでやるのが正解なのか（page.tsxの方が良い？）
  // - useEffect使うのが良いのか（コンポーネントの外に出したほうが良い？）
  // よく分からん
  useEffect(() => {
    api.getTasks().then((fetchedTasks) => {
      dispatch({
        type: 'Initialize',
        payload: { fetchedTasks },
      });
    });
  }, []);

  return (
    <>
      <VStack spacing={3} width={'90%'} mx={'auto'} alignItems={'left'}>
        {tasks.length ? (
          tasks.map((task) => {
            // keyを指定しないと
            // Warning: Each child in a list should have a unique "key" prop.
            // で怒られる
            return <TaskView key={task.id} task={task} />;
          })
        ) : (
          <Text>Task is empty. You are free ; )</Text>
        )}
      </VStack>
    </>
  );
};

export default TaskList;
