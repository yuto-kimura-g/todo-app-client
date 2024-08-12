import { TaskType } from '@/types/types';
import { Button, Input, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

const CreateTask: React.FC<Props> = ({ setTasks }: Props) => {
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
    const newTask: TaskType = {
      // 現在時刻をidに設定する
      id: new Date().getTime().toString(),
      title: title,
      description: description,
      dueDate: dueDate,
      completed: false,
    };
    // 先頭に追加
    setTasks((tasks) => [newTask, ...tasks]);
    // 入力フォームをクリア
    setTitle('');
    setDescription(null);
    setDueDate(null);
  };

  return (
    <>
      {/* <Heading as={'h3'} mt={'10'} mb={'5'}>
        CreateTask components
      </Heading> */}
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
        <Button onClick={handleSubmit} fontSize={'lg'}>
          Add task
        </Button>
      </Stack>
    </>
  );
};

export default CreateTask;
