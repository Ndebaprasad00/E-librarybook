import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function UpdatePass() {
    const [newpass, setNewpass] = useState('');
    const navigate = useNavigate();

    const uppass = (e) => {
        e.preventDefault();
        if (newpass) {
            api();

        } else {
            alert('please enter the new pass');
        }
    }
    const api = () => {
        const ldata = JSON.parse(localStorage.getItem('logintoken'));
        if (ldata != null) {
            const token = ldata.data.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const formData = new FormData();
            formData.append('newpass', newpass);
            const url = 'http://127.0.0.1:8000/api/updatepass';
            axios.post(url, formData, config,).then((resp) => {
                console.log(resp);
                // setUser(resp.data.user);
                localStorage.removeItem('logintoken');
                localStorage.removeItem('login');
                navigate('/login');

            })
        }
    }
    const back = ()=>{
        navigate(-1);
    }

    return (
        
        <div class="container px-5 py-24 ml-10 flex flex-wrap items-center">
            <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                <h2 class="text-gray-900 text-lg font-medium title-font mb-3">Update profile Password</h2>
                <div class="relative mb-3">
                    <input type="text" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e)=>setNewpass(e.target.value)} />
                </div>
                <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={uppass} >Update Password</button>
                <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-3" onClick={back} >Cancel</button>
            </div>
        </div>
    )
}
