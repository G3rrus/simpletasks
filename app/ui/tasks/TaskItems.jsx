import {
  Box,
  Button,
  HStack,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { TaskItem } from './TaskItem';
import { toggleTaskDone } from '../../tasks/ToggleTaskDone';
import { removeTask } from '../../tasks/RemoveTask';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const TaskItems = ({
  tasks,
  pendingCount,
  hideDone,
  setHideDone,
  isLoading,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <Box
      mt={8}
      py={{ base: 2 }}
      px={{ base: 4 }}
      pb={{ base: 4 }}
      border={1}
      borderStyle="solid"
      borderRadius="md"
      borderColor={useColorModeValue('blue.800', 'blue.400')}
    >
        <HStack mt={2}>
          <Box w="70%">
            <Text
              as="span"
              color="gray.800"
              fontSize="xs"
            >
              {t('tsksPen.mp1')} {tasks.length} {tasks.length === 1 ? t('tsksPen.mp2') : t('tsksPen.mp3')}
              {t('tsksPen.mp4')} {pendingCount || 0} {t('tsksPen.mp5')}
            </Text>
          </Box>
          <Stack w="30%" justify="flex-end" direction="row">
            <Button
              colorScheme="teal"
              size="xs"
              onClick={() => setHideDone(!hideDone)}
            >
              {hideDone ? t('taskPage.show') : t('taskPage.pending')}
            </Button>
          </Stack>
        </HStack>
        {isLoading() ? (
          <Spinner />
        ) : (
          <>
            {tasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                onMarkAsDone={taskId => toggleTaskDone.call({ taskId })}
                onDelete={taskId => removeTask.call({ taskId })}
              />
            ))}
          </>
        )}
    </Box>
    );
};
