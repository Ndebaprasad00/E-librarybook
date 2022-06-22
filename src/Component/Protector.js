import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Protector(props) {
  const navigate = useNavigate();
  const { Component } = props;
  useEffect(() => {
    const log = localStorage.getItem('logintoken');

    if (log == null) {
      navigate('/Login');
    }
    if (log != null) {
      let log = localStorage.getItem('login')
      if (log) {
        navigate('/');
      }
    }
  }, [navigate]);
  return (

    <>
      <Component />
    </>

  )
}