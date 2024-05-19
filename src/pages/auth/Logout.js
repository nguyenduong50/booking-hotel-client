import { json, redirect } from "react-router-dom";

export async function action({request}){
    const data = await request.formData();
    const token = await data.get('token');
    const response = await fetch(
        'http://localhost:5000/api/auth/logout-customer',
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(token)
        }
    );

    if(!response.ok){
        throw json({message: 'Logout error'}, {status: 500});
    }

    const resData = await response.json();
    console.log(resData);
    
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('email');
    return redirect('/');
}