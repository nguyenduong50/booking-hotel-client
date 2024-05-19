import React from 'react';
import {createBrowserRouter} from 'react-router-dom';

import RootLayout from '../pages/root/Root';
import HomePage from '../pages/home/Home';
import SearchPage from '../pages/search/Search';
import HotelPage from '../pages/hotel/Hotel';
import TransactionPage from '../pages/transaction/Transaction';
import AuthPage from '../pages/auth/Auth';
import ErrorPage from '../pages/error/Error';

import {action as authAction} from '../pages/auth/Auth';
import { tokenLoader, checkAuthLoader } from '../utils/auth';
import {action as logoutAction} from '../pages/auth/Logout';

const router = createBrowserRouter([
    {
        path: '/', 
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        id: 'root',
        loader: tokenLoader,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/hotels',
                element: <SearchPage />
            },
            {
                path: '/hotel/:id',
                element: <HotelPage />,
                loader: checkAuthLoader
            },
            {
                path: '/transaction',
                element: <TransactionPage />,
            },
            {
                path: '/auth',
                element: <AuthPage />,
                action: authAction
            },
            {
                path: '/logout',
                action: logoutAction
            }
        ]
    }

]);

export default router;