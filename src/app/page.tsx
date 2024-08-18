'use client';

import BaseModal from '@/components/BaseModal';
import { TasksContext } from '@/components/Providers';
import { DefaultTask } from '@/types/types';
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
import React, { useContext } from 'react';
// const TaskList = React.lazy(() => import('@/components/TaskList'));
import TaskList from '@/components/TaskList';

const Index: React.FC = () => {
  const tasks = useContext(TasksContext);

  const {
    isOpen: isOpenCreateTaskModal,
    onOpen: onOpenCreateTaskModal,
    onClose: onCloseCreateTaskModal,
  } = useDisclosure();

  // レスポンシブ対応用
  // boxMinHeightを自動で決定するためにこんなことをしている
  const boxMt = useBreakpointValue({ base: '10%', xl: '5%' });
  const boxMb = useBreakpointValue({ base: '30%', xl: '10%' });
  const boxMinHeight = `calc(100vh - ${boxMt} - ${boxMb})`;

  return (
    <>
      <Box
        minHeight={boxMinHeight}
        mt={boxMt}
        mb={boxMb}
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

        <BaseModal
          isOpenModal={isOpenCreateTaskModal}
          onCloseModal={onCloseCreateTaskModal}
          modalType={'Create'}
          defaultTask={new DefaultTask()}
        />

        <HStack spacing={5} ml={'5%'}>
          <Button
            color={'green'}
            borderColor={'green'}
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

        <TaskList />
      </Box>
    </>
  );
};

export default Index;
