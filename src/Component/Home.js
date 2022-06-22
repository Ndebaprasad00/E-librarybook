import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Readbook from './Readbook';


const Home = () => {

  const [allbook, setAllbook] = useState([]);
  const navigate=useNavigate();
    useEffect(() => {
        showAllBook();
    }, [])
    const showAllBook = async () => {
        const ldata = JSON.parse(localStorage.getItem('logintoken'));
        if (ldata != null) {
            const token = ldata.data.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const url2 = await('http://127.0.0.1:8000/api/all-books');
            axios.get(url2, config).then((res) => {
              // console.log(res.data.book);
                setAllbook(res.data.book)
            })
        }
    }

    const read=(e)=>{
      // e.preventDefault();
      console.log(e);
      navigate(`/readbook/${e}`);
    }

    
    const deletebook = (e) => {
      console.log(e);
      const ldata = JSON.parse(localStorage.getItem('logintoken'));
      if (ldata != null) {
        const token2 = ldata.data.token;
        const config = {
          headers: { Authorization: `Bearer ${token2}` }
        };
        const url = 'http://127.0.0.1:8000/api/delete/' + e;
        axios.delete(url, config).then((res) => {
          console.log(res.data); 
          showAllBook();
        })
      }
    }

  return (
   <>
   {
   allbook.map((elem) => (
        <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {/* <!--Card 1--> */}
        <div class="rounded overflow-hidden shadow-lg">
          <img class="w-full"  src={`http://127.0.0.1:8000/Uploads/CoverImage/${elem.path}`} alt="cover-image" className='text-center'/>
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-center"><h1>{elem.title}</h1></div>
            <h5 class="text-gray-700 text-center mt-3">{elem.content}</h5>
          </div>
          <div class="px-6 pt-0 pb-2 ml-24">
            <button class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" onClick={(e)=>read(elem.id)}>View</button>
            <button class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" onClick={(e)=>deletebook(elem.id)}>Delete</button>
          </div>
        </div>
        </div>
          ))
   }
   </>
  )
}

export default Home
