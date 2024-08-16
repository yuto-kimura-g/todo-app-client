import { NewTaskType } from '@/types/types';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';

const API_URL: string = process.env.API_URL || 'http://localhost:8080/tasks';

interface Props {
  isOpenCreateTaskModal: boolean;
  onCloseCreateTaskModal: () => void;
}

const CreateTask: React.FC<Props> = ({
  isOpenCreateTaskModal,
  onCloseCreateTaskModal,
}: Props) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(new Date(event.target.value));
  };

  const handleSubmit = () => {
    if (!title) {
      alert('Title is required');
      return;
    }
    const newTask: NewTaskType = {
      title: title,
      description: description,
      dueDate: dueDate,
      isDone: false,
    };

    // request to API server
    axios.post(API_URL, newTask);

    // 入力フォームをクリア
    setTitle('');
    setDescription(null);
    setDueDate(null);

    // TODO: 表示するタスク一覧を更新

    // モーダルを閉じる
    onCloseCreateTaskModal();
  };

  return (
    <Modal isOpen={isOpenCreateTaskModal} onClose={onCloseCreateTaskModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={'3'} width={'90%'} mx={'auto'}>
            <Input
              value={title}
              placeholder={'Title'}
              // variant={'filled'}
              onChange={handleTitleChange}
            />
            <Input
              value={description || ''}
              placeholder={'Description'}
              // variant={'filled'}
              onChange={handleDescriptionChange}
            />
            <Input
              value={dueDate ? dueDate.toISOString().slice(0, 16) : ''}
              type={'datetime-local'}
              onChange={handleDueDateChange}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            color={'green'}
            variant={'outline'}
            borderWidth={3}
            fontSize={'lg'}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTask;
