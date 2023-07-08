import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createSoberCounter } from 'apiSdk/sober-counters';
import { Error } from 'components/error';
import { soberCounterValidationSchema } from 'validationSchema/sober-counters';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { SoberCounterInterface } from 'interfaces/sober-counter';

function SoberCounterCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SoberCounterInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSoberCounter(values);
      resetForm();
      router.push('/sober-counters');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SoberCounterInterface>({
    initialValues: {
      days_sober: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: soberCounterValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Sober Counter
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="days_sober" mb="4" isInvalid={!!formik.errors?.days_sober}>
            <FormLabel>Days Sober</FormLabel>
            <NumberInput
              name="days_sober"
              value={formik.values?.days_sober}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('days_sober', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.days_sober && <FormErrorMessage>{formik.errors?.days_sober}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'sober_counter',
    operation: AccessOperationEnum.CREATE,
  }),
)(SoberCounterCreatePage);
