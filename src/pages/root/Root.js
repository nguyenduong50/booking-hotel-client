import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { getTokenDuration } from '../../utils/auth';

const Root = () => {
    const token = useLoaderData();
    const submit = useSubmit();
  
    useEffect(() => {
      if(!token){
        return;
      }
  
      if(token === 'EXPIRED'){
        submit(null, {action: '/logout', method: 'post'});
        return;
      }
  
      const tokenDuration = getTokenDuration();
      //console.log(tokenDuration);
  
      setTimeout(() => {
        submit(null, {action: '/logout', method: 'post'});
      }, tokenDuration)
    }, [token, submit]);

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default Root;