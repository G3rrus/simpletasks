import React, { memo } from 'react';
import { Box, Button, HStack, Stack, Checkbox, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const TaskItem = memo(({ task, onMarkAsDone, onDelete }) => {
    const { t, i18n } = useTranslation();
    return (
      <HStack mt={4}>
        <Box w="80%">
          <Checkbox
            colorScheme="green"
            isChecked={task.done}
            onChange={() => onMarkAsDone(task._id)}
          >
            {task.description}
          </Checkbox>
        </Box>
        <Stack w="20%" justify="flex-end" direction="row">
          <Button
            colorScheme={useColorModeValue('red.800', 'red.200')}
            bg="red.300"
            color="red.700"
            borderColor="red.300"
            variant="outline"
            size="xs"
            _hover={{
                bg: 'red.400',
            }}
            onClick={() => onDelete(task._id)}
          >
            {t('taskPage.remove')}
          </Button>
        </Stack>
      </HStack>
    );
  }
);
