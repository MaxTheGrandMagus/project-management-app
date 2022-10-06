import * as Yup from 'yup';

export const signInValidationSchema = Yup.object().shape({
  login: Yup.string()
    .required('Login is required')
    .min(3, 'Login must be at least 3 characters')
    .max(64, 'Login must not exceed 64 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password must not exceed 128 characters'),
});
