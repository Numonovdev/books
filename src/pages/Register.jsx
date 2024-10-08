import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const ageRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();


  function handleRegister(event) {
    event.preventDefault();
    setLoading(true);

    const userRegister = {
      firstName: firstnameRef.current.value,
      lastName: lastnameRef.current.value,
      age: ageRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: repasswordRef.current.value,

     };


    fetch('https://fn27.vimlc.uz/register', {
      method: "POST",
      headers:{
          'Content-type':'application/json'
      },
      body: JSON.stringify(userRegister),
    })
      .then((res) => res.json())
      .then(data => {
          if(data.message === "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi"){
               formRef.current.reset();
               navigate('/login')
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
      <h1>Register</h1>
      <form className="flex flex-col gap-1 w-full" ref={formRef}>
        <input className="px-2 py-1 bg-transparent border rounded-lg outline-transparent" ref={firstnameRef} type="text" placeholder="Enter Firstname..." />
        <input className="px-2 py-1 bg-transparent border rounded-lg outline-transparent" ref={lastnameRef} type="text" placeholder="Enter Lastname..." />
        <input className="px-2 py-1 bg-transparent border rounded-lg outline-transparent" ref={ageRef} type="number" placeholder="Enter Age..." />
        <input className="px-2 py-1 bg-transparent border rounded-lg outline-transparent" ref={emailRef} type="email" placeholder="Enter Email..." />
        <input className="px-2 py-1 bg-transparent border rounded-lg outline-transparent" ref={passwordRef} type="password" placeholder="Enter Password..." />
        <input className="px-2 py-1 bg-transparent border rounded-lg outline-transparent" ref={repasswordRef} type="password" placeholder="Enter RePassword..." />
        <button className="w-2/3 mt-5 mx-auto py-2 bg-green-600 rounded hover:bg-green-700 font-bold" disabled={loading} onClick={handleRegister}>
          {loading ? "loading" : "Register"}


        </button>

        <Link to='/login'>loginga o`tish</Link>
      </form>
    </div>
  );
}

export default Register;