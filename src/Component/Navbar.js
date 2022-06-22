import React from 'react';
import { Link,useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('logintoken');
        localStorage.removeItem('login');
        navigate('/login');
    }
    const data = localStorage.getItem('login');
    const back=()=>{
        navigate(-1);
    }

  return (
    <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">BookManagement</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="Register">Register </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/Login" onClick={logout}>Log Out </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/Dashboard">Dashboard </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="Addbook">AddBook </Link>
          </li>
          <li class="nav-item">
            <button class="nav-link" onClick={back}>Back </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
