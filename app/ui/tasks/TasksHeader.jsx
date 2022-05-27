import { Box, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const TasksHeader = () => {
  const { t, i18n } = useTranslation();
  return (
    <Stack as={Box} textAlign="center" spacing={{ base: 8 }} py={{ base: 10 }}>
      <Heading fontWeight={600}>
        <Text as="span" bg={useColorModeValue('messenger.800', 'messenger.200')} bgClip="text">
          {t('main.Title')}
        </Text>
      </Heading>
    </Stack>
  );
};
