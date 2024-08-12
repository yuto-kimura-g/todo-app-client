'use client';

import CreateTask from '@/components/CreateTask';
import TaskList from '@/components/TaskList';
import { TaskType } from '@/types/types';
import { Box, Divider, Heading, useBreakpointValue } from '@chakra-ui/react';
import React, { useState } from 'react';

const Index: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const boxMt = useBreakpointValue({ base: '10%', xl: '5%' });
  const boxMb = useBreakpointValue({ base: '30%', xl: '10%' });
  const boxMinHeight = `calc(100vh - ${boxMt} - ${boxMb})`;

  return (
    <Box
      minHeight={boxMinHeight}
      mt={boxMt}
      mb={boxMb}
      // minHeight={{
      //   base: 'calc(100vh - 40%)',
      //   xl: 'calc(100vh - 15%)',
      // }}
      // mt={{
      //   base: '10%',
      //   xl: '5%',
      // }}
      // mb={{
      //   base: '30%',
      //   xl: '10%',
      // }}
      // レスポンシブ対応が簡単にできる．最近の技術はすごいねぇ...
      width={{
        base: '80%', // スマホサイズ
        xl: '60%', // PCサイズ
      }}
      mx={'auto'}
    >
      <Heading size={'lg'} textAlign={'center'} mb={'10'}>
        TODO App
      </Heading>
      <CreateTask setTasks={setTasks} />
      <Divider
        my={'10'}
        borderColor={'gray.200'}
        borderWidth={'3px'}
        borderRadius={'50'}
      />
      <TaskList tasks={tasks} />
    </Box>
  );
};

export default Index;
