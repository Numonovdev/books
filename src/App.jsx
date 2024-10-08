import { useEffect, useState } from 'react'
import { Routes,Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorPage from './pages/ErrorPage'
import Prodac from './pages/Prodac'

function App() {
  
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
    } else{
      if(!location.pathname.includes('register')){
        navigate('/login')
      }
    }
  },[navigate])

  function ProtectedRoute({isAuthenticated, children}){
    if(!isAuthenticated){
      navigate('/login')
    }

    return children;
  }

  function longOut(event){
    event.preventDefault();
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <>
      <Routes>
          <Route 
          path='/' 
          element={
            <ProtectedRoute isAuthenticated={!!token}>
      
    <header className='backdrop-sepia-0 bg-white/30 py-5 flex rounded-lg items-cente justify-between px-10'>
      <div className='flex items-center gap-2 font-bold text-blue-900 '><span className=' text-black px-3 rounded font-bold text-xl py-1 bg-white '>B</span><h1>Books</h1>
      </div>
      <button onClick={longOut} className='bg-red-600 px-2 rounded text-white hover:bg-red-700'>Long out</button>
    </header>
      
              <Home/>

            </ProtectedRoute>
          }>
            
          </Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/books/:id' element={<Prodac/>}></Route>
          <Route path='*' element={<ErrorPage/>}></Route>
        </Routes>


      
    </>
  )
}

export default App
