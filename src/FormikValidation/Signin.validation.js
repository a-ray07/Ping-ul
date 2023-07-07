import { useFormik } from 'formik';
import * as Yup from 'yup';

export const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string()
        .required('Password is required')
        .matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{8,}$/,
            'Password must contain at least 8 characters, one uppercase letter, one digit, and one special character (@)'
        ),
});


