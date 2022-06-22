import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Protected(props) {
  const navigate = useNavigate();
  const { Component } = props;
  useEffect(() => {
    const log = localStorage.getItem('logtoken');
    if(log == null){
        navigate('/login');
    }
    if (log != null) {
      let log = localStorage.getItem('login')
      if (!log) {
        navigate('/Dashboard');
      }
    }
  }, [navigate]);
  return (

    <>
      <Component />
    </>

  )
}