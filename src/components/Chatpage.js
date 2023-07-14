import React, { useContext, useEffect } from 'react';
import AuthState from '../auth/Authcontext';
import Navbar from './Navbar';
import Leftcom from './Leftcom';
import Middlecom from './Middlecom';
import Rightcom from './Rightcom';
import { validateToken } from '../Services/auth.services';

const Chatpage = () => {
    const { navigate } = useContext(AuthState)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            validateToken(token)
                .then((isValid) => {
                    if (isValid) {
                        console.log('Token valid')
                        navigate('/chatpage')
                    }
                    else {
                        console.log('Token not valid')
                        //navigate('/')
                    }
                })
                .catch((error) => {
                    console.error('Token validation error', error)
                })
        }
        else {
            console.log('Token not found')
            //navigate('/')
        }
    }, [navigate])

    return (
        <>
            <Navbar />
            <div className="container" >
                <div className="item1"><Leftcom /></div>
                <div className="item2"><Middlecom /></div>
                <div className="item3"><Rightcom /></div>
            </div>
        </>
    );
}

export default Chatpage;
