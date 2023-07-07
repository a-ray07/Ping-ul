import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Z])(?=.*[@])(?=.*[0-9])/,
            'Password must contain at least one uppercase letter, one "@" symbol, and one number'
        )
        .required('Required'),
    contactNumber: Yup.string().matches(/^[0-9]+$/, 'Invalid contact number').required('Required'),
});

const useSignupFormik = (handleSignUp) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            gender: '',
            email: '',
            password: '',
            contactNumber: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSignUp(values);
        },
    });

    return formik;
};

export default useSignupFormik;
