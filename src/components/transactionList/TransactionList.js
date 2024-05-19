import React, { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './TransactionList.module.css';
import httpRequest from '../../utils/axios';
import { convertDate } from '../../utils/convertDate';

const TransactionList = () => {
    const token = useRouteLoaderData('root');
    const [transactionList, setTransactionList] = useState([]);

    useEffect(() => {
        const fetchTransaction = async() => {
            try{
                const response = await httpRequest.post('get-transaction-by-user', {token});
                const data = await response.data;
                setTransactionList(data);
            }
            catch(error){
                console.log(error);
            }
        };

        fetchTransaction();
    }, [token]);

    return (
        <div className={classes['transaction']}>
            <div className={classes['transaction-title']}>
                <h3>Your Transactions</h3>
            </div>
            <div className={classes['transaction-list']}>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Hotel</th>
                            <th>Room</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Payment Method</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactionList.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{transaction.hotel.name}</td>
                                    <td>{transaction.room.toString()}</td>
                                    <td>{convertDate(transaction.dateStart)} - {convertDate(transaction.dateEnd)}</td>
                                    <td>${transaction.price}</td>
                                    <td>{transaction.payment}</td>
                                    <td>
                                        <span style={{
                                            backgroundColor: 'rgb(246,150,133)', 
                                            color: '#2e8332',
                                            padding: '6px 5px',
                                            borderRadius: '4px'
                                        }}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionList;