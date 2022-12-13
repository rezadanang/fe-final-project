import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import SignUp from './components/SignUp';
import FilterTicket from './components/filter/filterTicket';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/filter' element={<FilterTicket />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
