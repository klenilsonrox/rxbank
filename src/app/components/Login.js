'use client'
import React, { useRef, useState } from 'react';
import { Logar } from '../actions/Logar';

const Login = ({isOpen,func,id,func2}) => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading]=useState(false)
  const [sucess,setSucess]=useState(false)
  const [error,setError]=useState(false)
  const errorRef=useRef()
  const sucessRef=useRef()


  async function login(e){
    clearTimeout(errorRef.current)
    clearTimeout(sucessRef.current)

    e.preventDefault()
  
   try{
    setLoading(true)
    const response = await Logar(email,password)

    if(response==="dados inválidos"){
      setError("Dados inválidos")
      errorRef.current = setTimeout(()=>{
        setError("")
      },2000)
      return
    }
    
    if(response){
      setSucess("Login efetuado com sucesso")
      errorRef.current = setTimeout(()=>{
        setSucess("")
        window.location.href="/conta"
      },2000)
    }

console.log(response)
    
   }catch(error){
    console.log(error)
   }finally{
    setLoading(false)
   }
    
  }



  return (
    <>
    {isOpen && <div className="fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm flex items-center justify-center z-30 p-4" id={id} onClick={func}>
      <form className='w-full max-w-md bg-white flex flex-col rounded-md shadow-lg p-6' div data-aos="fade-down">
        {error && <p className='text-center font-bold  text-red-600'>{error}</p> }
        {sucess && <p className='text-center font-bold  text-green-600'>{sucess}</p> }
        <img src="./images/logoroxo.png" alt="logo" className='mx-auto pb-6'/>
        <div className='flex flex-col text-gray-600 flex-1'>
    <label htmlFor="email" className='font-bold'>Email</label>
    <input type="email" className='bg-gray-200 mt-1 py-3 rounded-md outline-none pl-4' placeholder='Digite seu e-mail' value={email} onChange={({target})=>setEmail(target.value)}/>
        </div>
        <div className='flex flex-col text-gray-600 mt-4'>
        <label htmlFor="password" className='font-bold'>Senha</label>
        <input type="password" className='bg-gray-200 mt-1 py-3 rounded-md outline-none pl-4' placeholder='*********' value={password} onChange={({target})=>setPassword(target.value)}/>
        </div>
        <button className='mt-6 button py-3 rounded-md text-white font-bold max-w-[140px]' onClick={login}> {loading ? <span className='block w-6 h-6 border-2 mx-auto rounded-full animate-spin border-r-transparent'></span>: <span>Entrar</span> } </button>
        <div className='mt-4 flex items-start flex-col lg:flex-row lg:gap-4 flex-wrap'>
            <p className='text-violet-950'>Não possui uma conta?</p>
            <button  className='text-[#AA88FF] font-bold hover:underline' onClick={func2}>Cadastre-se</button>
        </div>
      </form>
    </div>}
    </>
  );
};

export default Login;