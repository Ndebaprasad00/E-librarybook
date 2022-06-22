import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Dashboard() {
    const navigate = useNavigate();
    const [users, setUser] = useState('');
    const [allcategory, setAllcatagory] = useState([]);
    const [allbook, setAllbook] = useState([]);




    const uppass = () => {
        console.log('pass update');
        navigate('/updatepass');
    }
    useEffect(() => {
        const ldata = JSON.parse(localStorage.getItem('logintoken'));
        if (ldata != null) {
            const token = ldata.data.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const url = 'http://127.0.0.1:8000/api/getuser';
            axios.get(url, config).then((resp) => {
                setUser(resp.data.user);
            })
        }
        
    }, [])
     

    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto flex flex-wrap flex-col">
                <img class="xl:w-1/4 lg:w-1/3 md:w-1/2 w-2/3 block mx-auto mb-5 object-cover object-center rounded-md" alt="hero" src={`http://127.0.0.1:8000/Uploads/Profile/${users.path}`} />
                <div class="flex flex-col text-center w-full">
                    <h1 class="text-xl font-medium title-font mb-2 text-gray-900">Welcome: {users.name}</h1>
                    <div>
                        <button class=" bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 transition duration-300 no-underline" onClick={uppass}>Update Password</button>
                    </div>
                </div>
            </div>
            <div class="container px-2 py-1 mx-auto">
                <div class="flex flex-wrap -m-4 text-center">
                    <div class="p-4 sm:w-1/4 w-1/2">
                        <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900"></h2>
                        <p class="leading-relaxed"></p>
                    </div>
                    <div class="p-4 sm:w-1/4 w-1/2">
                        <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900"></h2>
                        <p class="leading-relaxed"></p>
                    </div>
                </div>
            </div>
        </section>

    )
}
