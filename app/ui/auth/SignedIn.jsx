import { Button, Flex, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { RoutePaths } from '../common/Routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SignedIn = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading
            fontSize="4xl"
            bg={useColorModeValue('messenger.800', 'messenger.200')}
            bgClip="text"
          >
            {t('signedIn.mssg')}
          </Heading>
          <Text fontSize="lg" color="white">
          {t('signedIn.promt')}
          </Text>
        </Stack>
        <Stack spacing={10}>
          <Button
            onClick={() => navigate(RoutePaths.TASKS)}
            bg="blue.400"
            color="white"
            _hover={{
              bg: 'blue.500',
            }}
          >
            {t('signedIn.redirButton')}
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
