import React from 'react';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from '../../redux/store';
import { Button } from '@mui/material';
import { logOutUser } from '../../redux/features/loginSlice';

const LogInOutButton = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isAuth);
    const dispatch = useAppDispatch();
    const onLogOutClick = () => {
        dispatch(logOutUser());
    };

    return (
        <>
            {isLoggedIn ? (
                <Button variant={'contained'} type={'submit'} onClick={onLogOutClick}>
                    Log out
                </Button>
            ) : null}
        </>
    );
};

export default LogInOutButton;
