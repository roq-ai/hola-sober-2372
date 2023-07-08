import * as yup from 'yup';

export const meetingValidationSchema = yup.object().shape({
  name: yup.string().required(),
  date: yup.date().required(),
  organization_id: yup.string().nullable(),
});
