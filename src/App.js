import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from "./Component/Navbar";
import Home from './Component/Home';
import Login from './Component/Login';
import Register from './Component/Register';
import Addbook from './Component/Addbook';
import UpdatePass from './Component/Updatepass';
import Editbook from './Component/Editbook';
import Readbook from './Component/Readbook';
import Protected from './Component/Protected';
import Protect from './Component/Ptrotect';
import Protectedup from './Component/Protectedup';
import Dashboard from './Component/Dashboard';
import Protector from './Component/Protector';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Protector Component={Home}/>}/>
      <Route path="/login" element={<Protector Component={Login}/>} />
      <Route path="/register" element={<Protect Component={Register}/>}/>
      <Route path='/dashboard' element={<Protected Component={Dashboard} />} />
      <Route path="/addbook" element={<Protectedup Component={Addbook}/>}/>
      <Route path="updatepass" element={<Protectedup Component={UpdatePass}/>}/>
      <Route path='/edit/:id' element={<Editbook/>}/>
      <Route path='/readbook/:id' element={<Protectedup Component={Readbook}/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
