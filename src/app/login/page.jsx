'use client';
import { useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        console.log('isLoggedIn', isLoggedIn)
        if (isLoggedIn) {
            router.push('/home')
        }
    }, [router]);

    const initialValues = {
        email: '',
        password: '',
    };
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[\W_]/, 'Password must contain at least one special character'),
    });

    const handleSubmit = (values) => {
        console.log(values);
        localStorage.setItem('isLoggedIn', true)
        router.push('/home')
    };

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form>
                        <div className='mb-4'>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                            <Field name="email" type="email" className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300' />
                            <ErrorMessage name="email" component="div" className='text-red-600 text-sm mt-1' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
                            <Field name="password" type="password" className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300' />
                            <ErrorMessage name="password" component="div" className='text-red-600 text-sm mt-1' />
                        </div>
                        <button type="submit" className='w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'>
                            Login
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>

    )
}

export default Login