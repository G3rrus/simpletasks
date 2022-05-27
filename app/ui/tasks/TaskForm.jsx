import React from 'react';
import {
  FormControl,
  Input,
  Button,
  FormErrorMessage,
  Box,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { ErrorStatus } from '../common/ErrorStatus';
import { insertTask } from '../../tasks/InsertTask';
import { useTranslation } from 'react-i18next';

export const TaskForm = () => {
  const { t, i18n } = useTranslation();
  const validationSchema = object({
    description: string('Enter task description').required(
      t('taskPage.desReq')
    ),
  });

  const onSubmit = (values, actions) => {
    const description = values.description.trim();
    insertTask.call({ description }, error => {
      if (error) {
        const errorMessage = error?.reason || t('main.error');
        actions.setStatus(errorMessage);
      } else {
        actions.resetForm();
      }
      actions.setSubmitting(false);
    });
  };

  const formik = useFormik({
    initialValues: { description: '' },
    initialStatus: null,
    validationSchema,
    onSubmit,
  });

  return (
    <Box>
      <ErrorStatus status={formik.status} />
      <form onSubmit={formik.handleSubmit}>
        <InputGroup size="md">
          <FormControl
            isInvalid={formik.errors.description && formik.touched.description}
          >
            <Input
              h="2.6rem"
              pr="6rem"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              borderColor={useColorModeValue('blue.800', 'blue.400')}
              placeholder={t('taskPage.newTaskDesc')}
              _placeholder={{
                color: 'gray.800',
            }}
              color={useColorModeValue('gray.800', 'gray.400')}
            />
            <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
          </FormControl>
          <InputRightElement width="6rem">
            <Button
              h="2.5rem"
              size="sm"
              type="submit"
              isLoading={formik.isSubmitting}
              colorScheme="blue"
            >
              {t('taskPage.addTask')}
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  );
};
