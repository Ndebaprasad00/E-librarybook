import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const Addbook = () => {

  const[title,setTitle]=useState();
  const[description,setDescription]=useState();
  const[path,setPath]=useState();
  const[content,setContent]=useState();
  const[created_by,setCreated_by]=useState();
  const navigate=useNavigate();

  const add=(e)=>{
    e.preventDefault();
    const api=()=>{
      const getdata=JSON.parse(localStorage.getItem('logintoken'));
      if (getdata != null) {
        const token = getdata.data.token;
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const url = "http://127.0.0.1:8000/api/create-book";
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('content',content);
        formData.append('created_by',created_by);
        formData.append('path',path);
        axios.post(url, formData, config,).then((resp) => {
          console.log(resp);
          navigate('/');
  
  
        })
      }
    }
    if(title && description && content && created_by){
      api()
    }else{
      alert('please fill all the field');
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
      <h1>Create Book</h1>
      <hr/><br/>
          <div className="form-outline mb-4">
              <input type="text" id="form1Example13" className="form-control form-control-lg"  onChange={(e)=>setTitle(e.target.value)}/>
              <label className="form-label" htmlFor="form1Example13">Enter Book Title</label>
            </div>
  
            <div className="form-outline mb-4">
              <input type="text" id="form1Example13" className="form-control form-control-lg" onChange={(e)=>setDescription(e.target.value)}/>
              <label className="form-label" htmlFor="form1Example13">Enter Book Description</label>
            </div>

                 <div className="custom-file">
                 <input type="file" className="form-control form-control-lg " id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"  onChange={(e)=>setPath(e.target.files)}/>
                </div><br/><br/>
              
            <div className="form-outline mb-4">
              <input type="text" id="form1Example13" className="form-control form-control-lg"  onChange={(e)=>setContent(e.target.value)}/>
              <label className="form-label" htmlFor="form1Example13">Enter Content</label>
            </div>
  
            {/* <!-- Email input --> */}
            <div className="form-outline mb-4">
              <input type="text" id="form1Example13" className="form-control form-control-lg"  onChange={(e)=>setCreated_by(e.target.value)}/>
              <label className="form-label" htmlFor="form1Example13">Enter Created By</label>
            </div>
  
            {/* <!-- Submit button --> */}
            <button type="submit" className="btn btn-primary btn-lg btn-block ml-44"
            onClick={add}>Create</button>
  
          </form>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Addbook
