import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(64, 'Name must not exceed 64 characters')
    .matches(/^[a-zA-Z]+$/, 'Your name must contain only letters'),
  login: Yup.string()
    .required('Login is required')
    .min(3, 'Login must be at least 3 characters')
    .max(64, 'Login must not exceed 64 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password must not exceed 128 characters'),
});
