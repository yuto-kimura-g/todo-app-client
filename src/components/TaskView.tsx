'use client';

import BaseModal from '@/components/BaseModal';
import { TasksDispatchContext } from '@/components/Providers';
import { TaskType } from '@/types/types';
import * as api from '@/utils/apiClient';
import { CheckIcon, DeleteIcon, EditIcon, RepeatIcon } from '@chakra-ui/icons';
import {
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';

interface Props {
  task: TaskType;
}

const TaskView: React.FC<Props> = ({ task }: Props) => {
  const dispatch = useContext(TasksDispatchContext);

  const [isDetailActive, setIsDetailActive] = useState(false);

  const {
    isOpen: isOpenUpdateTaskModal,
    onOpen: onOpenUpdateTaskModal,
    onClose: onCloseUpdateTaskModal,
  } = useDisclosure();

  const statusHandler = async () => {
    const newTask = {
      // ...task で taskオブジェクトの全プロパティをコピー
      ...task,
      // 上書き
      isDone: !task.isDone,
    };
    await api.updateTask(task.id, newTask).then((updatedTask) => {
      dispatch({
        type: 'Update',
        payload: { taskId: task.id, updatedTask },
      });
    });
  };

  const deleteHandler = async () => {
    if (
      confirm(`Are you sure to delete ?\n${JSON.stringify(task, undefined, 2)}`)
    ) {
      await api.deleteTask(task.id).then(() => {
        dispatch({
          type: 'Delete',
          payload: { taskId: task.id },
        });
      });
    }
  };

  const editHandler = () => {
    onOpenUpdateTaskModal();
  };

  return (
    <>
      <BaseModal
        isOpenModal={isOpenUpdateTaskModal}
        onCloseModal={onCloseUpdateTaskModal}
        modalType={'Update'}
        defaultTask={task}
      />

      <Card boxShadow={'lg'} _hover={{ color: 'blue.500' }}>
        <CardHeader pb={'0'}>
          <ButtonGroup>
            {task.isDone ? (
              <IconButton
                icon={<RepeatIcon />}
                aria-label={'Redo'}
                colorScheme={'orange'}
                variant={'outline'}
                isRound={true}
                onClick={statusHandler}
              />
            ) : (
              <IconButton
                icon={<CheckIcon />}
                aria-label={'Done'}
                colorScheme={'blue'}
                variant={'outline'}
                isRound={true}
                onClick={statusHandler}
              />
            )}
            <IconButton
              icon={<DeleteIcon />}
              aria-label={'Delete'}
              colorScheme={'red'}
              variant={'outline'}
              isRound={true}
              onClick={deleteHandler}
            />
            {!task.isDone && (
              <IconButton
                icon={<EditIcon />}
                aria-label={'Edit'}
                colorScheme={'green'}
                variant={'outline'}
                isRound={true}
                onClick={editHandler}
              />
            )}
          </ButtonGroup>
        </CardHeader>

        <CardBody
          pt={'1'}
          opacity={task.isDone ? '0.5' : '1.0'}
          onClick={() => {
            setIsDetailActive(!isDetailActive);
          }}
        >
          {isDetailActive ? (
            <Heading size={'xl'} wordBreak={'break-word'}>
              {task.title}
            </Heading>
          ) : (
            <Heading
              size={'md'}
              whiteSpace={'nowrap'}
              overflow={'hidden'}
              textOverflow={'ellipsis'}
            >
              {task.title}
            </Heading>
          )}
          <Text>Due: {task.dueDate ? task.dueDate : '-'}</Text>
          {isDetailActive ? (
            <Text wordBreak={'break-word'}>{task.description}</Text>
          ) : (
            <Text
              whiteSpace={'nowrap'}
              overflow={'hidden'}
              textOverflow={'ellipsis'}
            >
              {task.description}
            </Text>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default TaskView;
