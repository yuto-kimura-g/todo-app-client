import { TaskType } from '@/types/types';
import { CheckIcon, DeleteIcon, EditIcon, RepeatIcon } from '@chakra-ui/icons';
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
    <Card
      boxShadow={'lg'}
      _hover={{ color: 'blue.500' }}
      // opacity={task.isDone ? '0.5' : '1.0'}
    >
      <CardHeader pb={'0'}>
        <ButtonGroup>
          {task.isDone ? (
            <IconButton
              icon={<RepeatIcon />}
              aria-label={'Redo'}
              colorScheme={'orange'}
              variant={'outline'}
              isRound={true}
            />
          ) : (
            <IconButton
              icon={<CheckIcon />}
              aria-label={'Done'}
              colorScheme={'blue'}
              variant={'outline'}
              isRound={true}
            />
          )}
          <IconButton
            icon={<DeleteIcon />}
            aria-label={'Delete'}
            colorScheme={'red'}
            variant={'outline'}
            isRound={true}
          />
          {!task.isDone && (
            <IconButton
              icon={<EditIcon />}
              aria-label={'Edit'}
              colorScheme={'green'}
              variant={'outline'}
              isRound={true}
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
        // onMouseEnter={() => setIsDetailActive(true)}
        // onMouseLeave={() => setIsDetailActive(false)}
      >
        {isDetailActive ? (
          <Heading
            size={'xl'}
            wordBreak={'break-word'}
            // {...(task.isDone
            //   ? { as: 'del', style: { display: 'inline-block' } }
            //   : {})}
            // as={task.isDone ? 'del' : 'h2'}
            // as={task.isDone ? 'del' : 'span'}
            // {...(task.isDone ? { as: 'del' } : {})}
          >
            {/* {task.isDone ? <del>{task.title}</del> : task.title} */}
            {task.title}
          </Heading>
        ) : (
          <Heading
            size={'md'}
            // as={task.isDone ? 'del' : 'h2'}
            // display={'inline-block'}
            whiteSpace={'nowrap'}
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            // {...(task.isDone
            //   ? { as: 'del', style: { display: 'inline-block' } }
            //   : {})}
          >
            {/* {task.isDone ? <del>{task.title}</del> : task.title} */}
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
