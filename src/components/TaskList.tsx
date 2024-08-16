import { TaskType } from '@/types/types';
import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import TaskView from './TaskView';

interface Props {
  tasks: TaskType[];
}

const TaskList: React.FC<Props> = ({ tasks }: Props) => {
  return (
    <>
      <VStack spacing={3} width={'90%'} mx={'auto'} alignItems={'left'}>
        {tasks.length ? (
          tasks.map((task) => {
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
