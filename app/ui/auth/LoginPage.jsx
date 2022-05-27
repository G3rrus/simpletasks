import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ErrorStatus } from '../common/ErrorStatus';
import { Accounts } from 'meteor/accounts-base';
import { RoutePaths } from '../common/Routes';
import { useTracker } from 'meteor/react-meteor-data';
import { SignedIn } from './SignedIn';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';

/* eslint-disable import/no-default-export */
export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const userId = useTracker(() => Meteor.userId());
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const validationSchema = object({
    username: string('Enter your username').required(t('loginPage.needUser')),
    password: string('Enter your password').required(t('loginPage.needPwd')),
  });

  const handleError = (error, actions) => {
    if (error) {
      const errorMessage = error?.reason || t('main.error');
      actions.setStatus(errorMessage);
    }
    actions.setSubmitting(false);
    navigate(RoutePaths.TASKS);
  };

  const onSubmit = (values, actions) => {
    const { username, password } = values;
    if (isSignup) {
      Accounts.createUser({ username, password }, error => {
        handleError(error, actions);
      });
    } else {
      Meteor.loginWithPassword(username, password, error => {
        handleError(error, actions);
      });
    }
  };

  const formik = useFormik({
    initialValues: { username: 'fredmaia', password: 'abc123' },
    validationSchema,
    onSubmit,
  });

  if (userId) {
    return <SignedIn />;
  }
  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading
            fontSize="4xl"
            bg={useColorModeValue('messenger.800', 'messenger.200')}
            bgClip="text"
          >
            {t('loginPage.prompt')}
          </Heading>
          <Text fontSize="lg" color="white">
            {t('loginPage.mssg')}
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('blue.300', 'blue.700')}
          boxShadow="lg"
          p={8}
        >
          <ErrorStatus status={formik.status} />
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl
                isInvalid={formik.errors.username && formik.touched.username}
              >
                <Input
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder={t('loginPage.enterUserPrompt')}
                  borderColor={useColorModeValue('blue.800', 'blue.400')}
                />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.password && formik.touched.password}
              >
                <InputGroup size="md">
                  <Input
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('loginPage.enterPasswordPrompt')}
                    borderColor={useColorModeValue('blue.800', 'blue.400')}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      bg={useColorModeValue('blackAlpha.300', 'whiteAlpha.200')}
                      _hover={{
                        bg: `${useColorModeValue('blackAlpha.400', 'whiteAlpha.300')}`,
                      }}
                    >
                      {showPassword ? t('loginPage.hidePassword') : t('loginPage.showPassword')}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              {!isSignup && (
                <>
                  <Stack spacing={10}>
                    <Button
                      type="submit"
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: 'blue.500',
                      }}
                      isLoading={formik.isSubmitting}
                    >
                      {t('loginPage.signIn')}
                    </Button>
                  </Stack>
                  <Stack spacing={10}>
                    <Button onClick={() => setIsSignup(true)} variant="link" color="gray.200">
                    {t('loginPage.create')}
                    </Button>
                  </Stack>
                </>
              )}

              {isSignup && (
                <>
                  <Stack spacing={10}>
                    <Button
                      type="submit"
                      bg="green.500"
                      color="white"
                      _hover={{
                        bg: 'green.700',
                      }}
                      isLoading={formik.isSubmitting}
                    >
                      {t('loginPage.signUp')}
                    </Button>
                  </Stack>
                  <Stack spacing={10}>
                    <Button onClick={() => setIsSignup(false)} variant="link" color="gray.200">
                    {t('loginPage.signedUp')}
                    </Button>
                  </Stack>
                </>
              )}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
