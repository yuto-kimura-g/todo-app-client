'use client';

import { getTasks } from '@/api/client';
import CreateTask from '@/components/CreateTask';
import Loading from '@/components/Loading';
const TaskList = React.lazy(() => import('@/components/TaskList'));
// import TaskList from '@/components/TaskList';
import { TaskType } from '@/types/types';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import React, { Suspense, useEffect, useState } from 'react';

const Index: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    getTasks().then((_tasks) => {
      setTasks(_tasks);
    });
  }, []);

  const {
    isOpen: isOpenCreateTaskModal,
    onOpen: onOpenCreateTaskModal,
    onClose: onCloseCreateTaskModal,
  } = useDisclosure();

  const boxMt = useBreakpointValue({ base: '10%', xl: '5%' });
  const boxMb = useBreakpointValue({ base: '30%', xl: '10%' });
  const boxMinHeight = `calc(100vh - ${boxMt} - ${boxMb})`;

  return (
    <Suspense fallback={<Loading />}>
      <Box
        minHeight={boxMinHeight}
        mt={boxMt}
        mb={boxMb}
        // レスポンシブ対応が簡単にできる．最近の技術はすごいねぇ...
        width={{
          base: '80%', // スマホサイズ
          md: '60%', // タブレットサイズ
          xl: '40%', // PCサイズ
        }}
        mx={'auto'}
      >
        <Heading size={'lg'} textAlign={'center'} mb={'10'}>
          TODO App Web Client
        </Heading>
        <CreateTask
          isOpenCreateTaskModal={isOpenCreateTaskModal}
          onCloseCreateTaskModal={onCloseCreateTaskModal}
        />
        <HStack spacing={5} ml={'5%'}>
          <Button
            color={'green'}
            variant={'outline'}
            borderWidth={3}
            onClick={onOpenCreateTaskModal}
          >
            Add Task
          </Button>
          {tasks && <Text>Stat: {tasks.length} tasks</Text>}
        </HStack>
        <Divider
          my={'10'}
          borderColor={'gray.200'}
          borderWidth={'3px'}
          borderRadius={'50'}
        />
        <TaskList tasks={tasks} />
      </Box>
    </Suspense>
  );
};

export default Index;
