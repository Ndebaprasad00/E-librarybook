import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';



export default
 function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  function logUser(e) {
    e.preventDefault();
    if (email && password) {
      apiReq();
    } else {
      alert('please fill the login credentials');
    }
  }
  const apiReq = async () => {
    const url = 'http://127.0.0.1:8000/api/login';
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    await axios.post(url, formData).then((resp) => {
      const token = resp;
      // console.log(token.status);

      localStorage.setItem('logintoken', JSON.stringify(token));
      localStorage.setItem('login', true);
      logcheck();
    })
  }

  const logcheck =async() => {
    const ldata = JSON.parse(localStorage.getItem('logintoken'));
    console.log(ldata.status);
    if (ldata.status !== 200){
      alert('Worng Matching');
    }
    if (ldata.starus === 200) {
     navigate('/');
    }
  }
  
  return (
    <section class="vh-100 bg-sky-200">
  <div class="container py-5 h-100">
    <div class="row d-flex align-items-center justify-content-center h-100">
      <div class="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="img-fluid" alt="Phone image"/>
      </div>
      <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>
          {/* <!-- Email input --> */}
          <div class="form-outline mb-4">
            <input type="email" id="form1Example13" class="form-control form-control-lg" onChange={(e)=>setEmail(e.target.value)}/>
            <label class="form-label" for="form1Example13">Email address</label>
          </div>

          {/* <!-- Password input --> */}
          <div class="form-outline mb-4">
            <input type="password" id="form1Example23" class="form-control form-control-lg" onChange={(e)=>setPassword(e.target.value)} />
            <label class="form-label" for="form1Example23">Password</label>
          </div>

          <div class="d-flex justify-content-around align-items-center mb-4">
            {/* <!-- Checkbox --> */}
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="form1Example3"/>
              <label class="form-check-label" for="form1Example3"> Remember me </label>
            </div>
            <a href="Updatepass">Forgot password?</a>
          </div>

          {/* <!-- Submit button --> */}
          <button type="submit" class="btn btn-primary btn-lg btn-block ml-44" onClick={logUser}>Sign in</button>
          <hr/><br/>
          <p class="mb-5 pb-lg-2">Don't have an account? <a href="Register">Register here</a></p>
          
        </form>
      </div>
    </div>
  </div>
</section>
  )
}
