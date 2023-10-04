import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useDisclosure } from "@mantine/hooks";
import { PasswordInput, TextInput } from "@mantine/core";
import { hasLength, isEmail, matchesField, useForm } from "@mantine/form";
import { notifications } from '@mantine/notifications';

import FullLoader from "../Shared/FullLoader";
import { signup } from "../../redux/user/user.thunk";
import { PasswordInputWithMeter } from "./Components/PasswordInput";
import { selectUser, selectUserIsLoading, selectUserReducer } from "../../redux/user/user.select";
import { userReset } from "../../redux/user/userSlice";

function SignUp() {
    const [visible, { toggle }] = useDisclosure(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, message } = useSelector(selectUserReducer, shallowEqual);
    const user = useSelector(selectUser);
    const singUpIsLoading = useSelector(selectUserIsLoading);

    useEffect(() => {
        if (isError) {
            notifications.show({
                color: 'blue',
                message: `Something wrong in sign up ~  ${message}`,
                position: 'top-right'
            })
        }
        if (user?._id) {
            navigate("/calendar");
            notifications.show({
                color: 'blue',
                message: `Already logged in user : ${user.name}`,
                position: 'top-right'
            })
        }
        dispatch(userReset());
    }, [isError, user, message, dispatch, navigate]);


    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
        validate: {
            email: isEmail('Invalid email'),
            name: hasLength({ min: 2, max: 16 }, 'First Name must be 2-16 characters long'),
            confirmPassword: matchesField('password', 'Passwords are not the same'),
        },
    });

    const handleSubmit = async () => {
        const userData = { ...form.values };
        dispatch(signup(userData)).then(() => navigate("/"));
        form.reset();
    };

    return (
        <>
            {singUpIsLoading ? (
                <FullLoader />
            ) : (
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
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
                                <TextInput
                                    withAsterisk
                                    mt="md"
                                    label="Your Name"
                                    placeholder="Your Name"
                                    {...form.getInputProps('name')}
                                />
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
                                <div className="mt-2">
                                    <PasswordInput
                                        withAsterisk
                                        mt="md"
                                        label="Confirm Password"
                                        placeholder="Confirm Password"
                                        {...form.getInputProps('confirmPassword')}
                                    />
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already have account?{' '}
                            <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Log In</Link>
                        </p>
                    </div >
                </div >
            )}
        </>
    );
}

export default SignUp;
