import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Details from './components/Details';
import MyDetails from './components/MyDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<MyDetails/>}/>
        <Route path='/update' element={<Details/>}/>
      </Routes>
    </div>
  );
}

export default App;
