import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { Inputs } from '../../components/form/types';
import s from '../../components/form/form.module.scss';
import { createUser } from '../../redux/features/loginSlice';
import { useAppDispatch } from '../../redux/store';

export function Register() {
    const dispatch = useAppDispatch();

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(
            createUser({
                email: data.email,
                password: data.password_repeat,
            }),
        );
    };

    return (
        <div className={s.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.text}>Email</div>
                <TextField
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Email is required',
                        },
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})$/,
                            message: 'Invalid email',
                        },
                    })}
                    color={'primary'}
                    label={'email'}
                    variant={'outlined'}
                    className={s.textField}
                    autoComplete={'off'}
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => <div className={s.error}>{message}</div>}
                />

                <div className={s.text}>Password</div>
                <TextField
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'Password is required',
                        },
                        minLength: {
                            value: 6,
                            message: 'Password should be at least 6 characters ',
                        },
                        maxLength: {
                            value: 12,
                            message: 'Password should be between 6 and 12 characters',
                        },
                    })}
                    color={'primary'}
                    label={'password'}
                    variant={'outlined'}
                    className={s.textField}
                    type="password"
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => <div className={s.error}>{message}</div>}
                />

                <div className={s.text}>Confirm password</div>
                <TextField
                    {...register('password_repeat', {
                        validate: (value) => value === watch('password') || "Passwords don't match.",
                    })}
                    color={'primary'}
                    label={'password'}
                    variant={'outlined'}
                    className={s.textField}
                    type="password"
                />
                <ErrorMessage
                    errors={errors}
                    name="password_repeat"
                    render={({ message }) => <div className={s.error}>{message}</div>}
                />

                <Button variant={'contained'} type={'submit'}>
                    Registration
                </Button>
            </form>
        </div>
    );
}