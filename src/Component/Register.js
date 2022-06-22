import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';



const Register = () => {

    const navigate = useNavigate();
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [path,setPath]= useState('');
    
    const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
    function regUser(e){
        e.preventDefault();
        if(name && email && password){
          let rUser = [name,email,password];
          console.log(rUser)
           apiRequest()
        //   console.log(path.name);
        }else{
          alert('please fill all the fild ');
        }
    
    }
      
      
        const apiRequest= async ()=>{
            const url = 'http://127.0.0.1:8000/api/register';
            const formData = new FormData();
            formData.append('name',name);
            formData.append('email',email);
            formData.append('password',password);
            formData.append('path',path);
            console.log("df",path.name);
            axios.post(url,formData,config).then((resp)=>{
                console.log("result",resp.data);
                navigate('/login');
            })
           }

  return (
    <>
    {/* <!-- Section: Design Block --> */}
<section class="text-center bg-sky-200">
  {/* <!-- Background image --> */}
  <div class="p-5 bg-image bg-[url('https://mdbootstrap.com/img/new/textures/full/171.jpg')]"></div>
  {/* <!-- Background image --> */}

  <div class="card mx-4 mx-md-5 shadow-5-strong bg-transparent">
    <div class="card-body py-5 px-md-5">

      <div class="row d-flex justify-content-center">
        <div class="col-lg-8">
          <h2 class="fw-bold mb-5">Sign up now</h2>
          <form>
            {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
            <div class="form-outline mb-4">
        <input type="text" id="registerName" class="form-control" onChange={(e)=>setName(e.target.value)}/>
        <label class="form-label" for="registerName">Name</label>
      </div>

            {/* <!-- Email input --> */}
            <div class="form-outline mb-4">
              <input type="email" id="form3Example3" class="form-control" onChange={(e)=>setEmail(e.target.value)}/>
              <label class="form-label" for="form3Example3">Email address</label>
            </div>

            {/* <!-- Password input --> */}
            <div class="form-outline mb-4">
              <input type="password" id="form3Example4" class="form-control" onChange={(e)=>setPassword(e.target.value)}/>
              <label class="form-label" for="form3Example4">Password</label>
            </div>
            {/* <!--Choose image file--!> */}
            <div class="input-group">
                <div class="custom-file">
                <input type="file" class="custom-file-input ml-56" id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01" onChange={(e)=>setPath(e.target.files[0])}/>
                </div>
                </div><br/>
            {/* <!-- Submit button --> */}
            <button type="submit" class="btn btn-primary btn-block mb-4" onClick={regUser}>
              Sign up
            </button>
            <hr/>
            <div class="text-center">
            <p>Have an Account? <a href="Login">Login here</a></p>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
{/* <!-- Section: Design Block --> */}
    </>
  )
}

export default Register
