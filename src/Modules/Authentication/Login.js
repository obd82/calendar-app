import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { login } from "../../redux/user/user.thunk";
import { useDisclosure } from '@mantine/hooks';
import { PasswordInputWithMeter } from './Components/PasswordInput';
import { notifications } from '@mantine/notifications';
import { selectUserIsLoading, selectUserReducer } from '../../redux/user/user.select';
import FullLoader from '../Shared/FullLoader';


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userIsLoading = useSelector(selectUserIsLoading);
    const { isError, message } = useSelector(selectUserReducer);
    const [visible, { toggle }] = useDisclosure(false);
    const form = useForm({
        initialValues: { email: '', password: '' },
        validate: { email: isEmail('Invalid email') },
    });
    useEffect(() => {
        if (userIsLoading) {
            navigate("/calendar");
        }
    }, []);
    useEffect(() => {
        if (isError) {
            notifications.show({
                color: 'red',
                message: `Login Failed ${message} `,
                position: 'top-right'
            })
        }
    }, [isError, message]);

    const handleSubmit = () => {
        const userData = {
            ...form.values
        };
        try {
            dispatch(login(userData));
        } catch (error) {
            notifications.show({
                color: 'blue',
                message: error,
                position: 'top-right'
            })
        };
        navigate("/calendar");
        form.reset()
    };

    return (
        <>
            {userIsLoading ? (
                <FullLoader />
            ) :
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log In</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" method="POST" onSubmit={form.onSubmit(handleSubmit)}>
                            <div>
                                <div className="mt-2">
                                    <TextInput
                                        withAsterisk
                                        mt="md"
                                        label="Email"
                                        placeholder="Your email"
                                        {...form.getInputProps('email')}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="mt-2">
                                    <PasswordInputWithMeter
                                        mt="md"
                                        withAsterisk
                                        label="Password"
                                        visible={visible}
                                        placeholder="Your password"
                                        onVisibilityChange={toggle}
                                        form={form}
                                        {...form.getInputProps('password')}
                                    />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</Link>
                        </p>
                    </div>
                </div>
            }
        </>
    );
}

export default Login;
