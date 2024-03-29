import * as yup from 'yup';

export const soberCounterValidationSchema = yup.object().shape({
  days_sober: yup.number().integer().required(),
  user_id: yup.string().nullable(),
});
