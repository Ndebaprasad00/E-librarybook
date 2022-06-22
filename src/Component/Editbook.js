import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Editbook() {
  const params=useParams();
  const{id}=params;
  const[title,setTitle]=useState();
  const[description,setDescription]=useState();
  const[content,setContent]=useState();
  const navigate=useNavigate();

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  useEffect(() => {
    const ldata = JSON.parse(localStorage.getItem('logintoken'));
    if (ldata != null) {
        const token = ldata.data.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const url2 = 'http://127.0.0.1:8000/api/readbooks/' + id;
        axios.get(url2, config).then((res) => {
            console.log(res.data.book.title);
            setTitle(res.data.book.title);
            setContent(res.data.book.content);
            setDescription(res.data.book.description);
        })
    }

}, [])

  const editbook=(e)=>{
    e.preventDefault();
    if(title && description && content){
      api()
    }else{
      alert("Please fill all the field");
    }
  }
  const api = () => {
    const ldata = JSON.parse(localStorage.getItem('logintoken'));
    if (ldata != null) {
      const token = ldata.data.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = "http://127.0.0.1:8000/api/update"+'/' + id;
      const formData = {
        "title": title,
        "content":content,
        "description":description
      }
      axios.post(url, formData, config).then((resp) => {
        console.log(resp);
        navigate('/')

      })
    }
  }

  return (
<section className="bg-sky-200">
<div className="container py-5 h-100">
  <div className="row d-flex align-items-center justify-content-center h-100">
    <div className="col-md-8 col-lg-7 col-xl-6">
      <img src="https://bigbangram.com/theme/img/instagram-downloader/Group-2602-1.png"
        className="img-fluid" alt="Phone image"/>
    </div>
    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
      <form>
  <h1>Edit Book</h1>
  <hr/><br/>
      <div className="form-outline mb-4">
          <input type="text" id="form1Example13" className="form-control form-control-lg" defaultValue={title}  onChange={(e)=>setTitle(e.target.value)}/>
          <label className="form-label" htmlFor="form1Example13">Enter new Book Title</label>
        </div>

        <div className="form-outline mb-4">
          <input type="text" id="form1Example13" className="form-control form-control-lg" defaultValue={description} onChange={(e)=>setDescription(e.target.value)}/>
          <label className="form-label" htmlFor="form1Example13">Enter new Book Description</label>
        </div>
          
        <div className="form-outline mb-4">
          <input type="text" id="form1Example13" className="form-control form-control-lg" defaultValue={content} onChange={(e)=>setContent(e.target.value)}/>
          <label className="form-label" htmlFor="form1Example13">Enter new Content</label>
        </div>

        <div>
        {/* <!-- Submit button --> */}
        <button type="submit" className="btn btn-primary btn-lg btn-block ml-44 float-left"
        onClick={editbook}>Save changes</button>
        </div>
      </form>
    </div>
  </div>
</div>
</section>

  )
}
