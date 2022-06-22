import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export default function Readbook(props) {
    const { id } = useParams();
    const [read, setBook] = useState('');
    const navigate=useNavigate();
    useEffect(() => {
        const ldata = JSON.parse(localStorage.getItem('logintoken'));
        if (ldata != null) {
            const token = ldata.data.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const url2 = 'http://127.0.0.1:8000/api/readbooks/' + id;
            axios.get(url2, config).then((res) => {
                console.log(res.data.book);
                setBook(res.data.book);
            })
        }

    }, [])

    const edit=(e)=>{
        console.log(e);
        navigate(`/edit/${e}`);
    }


    return (
        <section className="bg-sky-200">
        <div className="container py-5">
          <div className="row d-flex align-items-center justify-content-center h-100 box-border border-black border-2 rounded-lg">
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 font-bold text-4xl">
              <h1>{read.title}</h1> 
            </div>
            <hr/><br/><br/>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 font-bold text-2xl">
              <h3>Book Id:-{read.id}</h3> 
            </div>
            <hr/><br/><br/>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 font-bold text-2xl">
              <h3>Description:-{read.description}</h3> 
            </div>
            <hr/><br/><br/>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 font-bold text-2xl">
              <h3>Book Content:-{read.content}</h3> 
            </div>
            <hr/><br/><br/>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 font-bold text-2xl">
              <h3>Book Author Name:-{read.created_by}</h3> 
            </div>
            <hr/><br/><br/>
            <div>
            <button className='bg-violet-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2' onClick={(e)=>edit(read.id)}>Edit</button>
            <button className='bg-violet-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'>Delete</button>

            </div>
          </div>
        </div>
      </section>
    )
}
