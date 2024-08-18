'use client';

import { TasksDispatchContext } from '@/components/Providers';
import { NewTaskType, TaskType } from '@/types/types';
import * as api from '@/utils/apiClient';
import { toLocalTimeString } from '@/utils/date';
import {
  Button,
  Modal as ChakraModal,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';

export type ModalType = 'Create' | 'Update';
const toViewType: Record<ModalType, string> = {
  // 処理はCRUDに合わせるけど，表示はAdd, Editの方が良さそうなので変換する
  Create: 'Add',
  Update: 'Edit',
};

interface Props {
  isOpenModal: boolean;
  onCloseModal: () => void;
  modalType: ModalType;
  defaultTask: TaskType;
}

/**
 * @param {boolean} isOpenModal `useDisclosure()`で作成したisOpen
 * @param {Function} onCloseModal `useDisclosure()`で作成したonClose
 * @param {ModalType} modalType `'Create' | 'Update'`
 * @param {TaskType} defaultTask デフォルト値．'Create'の時は`new DefaultTask()`する
 * @returns {React.FC<Props>}
 */
const BaseModal: React.FC<Props> = ({
  isOpenModal,
  onCloseModal,
  modalType,
  defaultTask,
}: Props) => {
  const dispatch = useContext(TasksDispatchContext);

  const [newTitle, setNewTitle] = useState<string>(defaultTask.title);
  const [newDescription, setNewDescription] = useState<string | null>(
    defaultTask.description
  );
  const [newDueDate, setNewDueDate] = useState<string | null>(
    defaultTask.dueDate
  );
  // isDoneはモーダルで変えない（ボタンで変える）

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // preventDefault(): デフォルトのイベントをキャンセル
    event.preventDefault();
    setNewTitle(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setNewDescription(event.target.value);
  };
  const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewDueDate(toLocalTimeString(new Date(event.target.value)));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!newTitle) {
      alert('Title is required');
      return;
    }
    const newTask: NewTaskType = {
      title: newTitle,
      description: newDescription,
      dueDate: newDueDate,
      isDone: defaultTask.isDone,
    };

    switch (modalType) {
      case 'Create': {
        await api.createTask(newTask).then((createdTask) => {
          dispatch({
            type: modalType,
            payload: { createdTask },
          });
        });
        // 入力フォームをクリア
        setNewTitle('');
        setNewDescription(null);
        setNewDueDate(null);
        break;
      }
      case 'Update': {
        await api.updateTask(defaultTask.id, newTask).then((updatedTask) => {
          dispatch({
            type: modalType,
            payload: { taskId: defaultTask.id, updatedTask },
          });
        });
        break;
      }
      default: {
        throw new Error(`Unknown modalType: ${modalType}`);
      }
    }

    // モーダルを閉じる
    onCloseModal();
  };

  return (
    <ChakraModal isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{toViewType[modalType]} Task</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={'3'} width={'90%'} mx={'auto'}>
            {/* isRequired: タイトル横に赤い*, isInvalid: 赤枠とErrorMessage */}
            <FormControl isRequired isInvalid={newTitle === ''}>
              <FormLabel>Title</FormLabel>
              {newTitle === '' && (
                <FormErrorMessage>Title is required</FormErrorMessage>
              )}
              <Input
                value={newTitle}
                placeholder={'Title'}
                onChange={handleTitleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={newDescription || ''}
                placeholder={'Description'}
                onChange={handleDescriptionChange}
                required={true}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Due Date</FormLabel>
              <Input
                value={newDueDate || ''}
                type={'datetime-local'}
                onChange={handleDueDateChange}
              />
            </FormControl>
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
            {toViewType[modalType]}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default BaseModal;
