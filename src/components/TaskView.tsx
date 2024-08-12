import { TaskType } from '@/types/types';
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Heading,
  IconButton,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

interface Props {
  task: TaskType;
}

const TaskView: React.FC<Props> = ({ task }: Props) => {
  const [isDetailActive, setIsDetailActive] = useState(false);

  return (
    <Card boxShadow={'lg'} _hover={{ color: 'blue.500' }}>
      <CardHeader pb={'0'}>
        <ButtonGroup>
          <IconButton
            icon={<EditIcon />}
            aria-label={'Edit'}
            colorScheme={'green'}
            variant={'outline'}
            isRound={true}
          >
            Edit
          </IconButton>
          <IconButton
            icon={<CheckIcon />}
            aria-label={'Done'}
            colorScheme={'blue'}
            variant={'outline'}
            isRound={true}
          >
            Done
          </IconButton>
          <IconButton
            icon={<DeleteIcon />}
            aria-label={'Delete'}
            colorScheme={'red'}
            variant={'outline'}
            isRound={true}
          >
            Del
          </IconButton>
        </ButtonGroup>
      </CardHeader>

      <CardBody
        pt={'0'}
        onClick={() => {
          setIsDetailActive(!isDetailActive);
        }}
        // onMouseEnter={() => setIsDetailActive(true)}
        // onMouseLeave={() => setIsDetailActive(false)}
      >
        {isDetailActive ? (
          <Heading size={'md'} wordBreak={'break-word'}>
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
        <Text>Due: {task.dueDate ? task.dueDate.toLocaleString() : '-'}</Text>
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

    // <Checkbox
    //   isChecked={isChecked}
    //   onChange={() => setIsChecked(!isChecked)}
    //   overflowWrap={'break-word'}
    //   whiteSpace={'normal'}
    // >
    //   {/* <Avatar bg={'teal.500'} size={'xs'} /> */}
    //   <Text
    //     as={isChecked ? 's' : 'span'}
    //     opacity={isChecked ? 0.5 : 1}
    //     fontSize={'xl'}
    //     mx={1}
    //   >
    //     [{task.title}]
    //   </Text>
    //   <Text
    //     as={isChecked ? 's' : 'span'}
    //     opacity={isChecked ? 0.5 : 1}
    //     fontSize={'xl'}
    //     mx={1}
    //   >
    //     {task.dueDate ? `(${task.dueDate.toLocaleString()})` : ''}
    //   </Text>
    //   <Text
    //     as={isChecked ? 's' : 'span'}
    //     opacity={isChecked ? 0.5 : 1}
    //     fontSize={'xl'}
    //     mx={1}
    //   >
    //     {task.description}
    //   </Text>
    // </Checkbox>
  );
};

export default TaskView;
