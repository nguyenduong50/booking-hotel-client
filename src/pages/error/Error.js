import React from 'react';
import classes from './Error.module.css';
import { useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError();
    let title = 'An error occurred!';
    let message = 'Something went wrong!';

    if(error.data.message){
        message = error.data.message;
    }

    return (
        <div className={classes['error-page']}>
            <h1>{title}</h1>
            <h4>{message}</h4>
        </div>
    );
};

export default Error;