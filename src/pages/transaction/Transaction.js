import React from 'react';
import Header from '../../components/header/Header';
import TransactionList from '../../components/transactionList/TransactionList';

const Transaction = () => {
    return (
        <>
            <Header type="list" />
            <TransactionList />
        </>
    );
};

export default Transaction;