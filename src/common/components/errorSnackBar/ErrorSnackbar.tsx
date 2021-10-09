import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../../app/store';
import { useEffect } from 'react';

export function SimpleSnackbar() {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const errorMessage = useSelector<AppRootStateType, string | null>((state) => state.login.errorText);

    useEffect(() => {
        if (errorMessage) {
            setMessage(errorMessage);
            setOpen(true);
        }
    }, [errorMessage]);

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setMessage('');
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="secondary" onClick={handleClose}>
                <CloseIcon fontSize="large" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar open={open} onClose={handleClose} message={message} action={action} />
        </div>
    );
}
