import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();


  function handleRegister(event) {
    event.preventDefault();
    setLoading(true);

    const userRegister = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
   

    fetch('https://fn27.vimlc.uz/login', {
      method: "POST",
      headers:{
          'Content-type':'application/json'
      },
      body: JSON.stringify(userRegister),
    })
      .then((res) => res.json())
      .then(data => {
          if(data.accessToken){
               localStorage.setItem('token', data.accessToken)
               localStorage.setItem('user', JSON.stringify(data.user))
               console.log('hello');
               
                navigate('/')               
          }
        
      })
      .catch((err) => {
        console.error("Error:", err);
      })
      .finally(() => {
        setLoading(false);
           });
  }
  return (
    <div className="w-1/3 flex flex-col text-white text-sans text-lg mx-auto backdrop-opacity-10 backdrop-invert bg-black/30 p-5 rounded-lg gap-5 items-center">
      <h1 className="text-2xl font-bold">Login</h1>
      <form className="flex flex-col gap-1 w-full" ref={formRef}>
        <input className="px-2 py-1 bg-transparent border rounded-lg outline-transparent  " ref={emailRef} type="email" placeholder="Enter Email..." />
        <input className="px-2 py-1 bg-transparent border rounded-lg outline-transparent  " ref={passwordRef} type="password" placeholder="Enter Password..." />
        <button className="w-2/3 mt-5 mx-auto py-2 bg-green-600 rounded hover:bg-green-700 font-bold " disabled={loading} onClick={handleRegister}>
          {loading ? "loading" : "Login"}


        </button>

        <Link className="text-black text-lg mt-5 text-gray-400  hover:text-gray-200 w-2/5" to='/register'>Registerga o`tish</Link>
      </form>
    </div>
  );
}

export default Login;
