import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { Cadastrar } from '../actions/Cadastrar';

const Cadastro = ({isOpen,func,id,func2}) => {
const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [confirmPass,setConfirmPass]=useState("")
const [loading,setLoading]=useState(false)
const [erro,setErro]=useState("")
const erroRef= useRef()


async function cadastro(e){
  e.preventDefault()
  clearTimeout(erroRef.current)

  if(!name.trim()){
    setErro("o nome é obrigatório")
    erroRef.current = setTimeout(()=>{
      setErro("")
    },1000)
    return
  }

  if(!email.trim()){
    setErro("o email é obrigatório")
    erroRef.current = setTimeout(()=>{
      setErro("")
    },1000)
    return
  }



  if(!password.trim()){
    setErro("o email é obrigatório")
    erroRef.current = setTimeout(()=>{
      setErro("")
    },1000)
    return
  }

  if(password.trim() !== confirmPass.trim()){
    setErro("as senhas devem ser iguais")
    erroRef.current = setTimeout(()=>{
      setErro("")
    },1000)
    return
  }
setLoading(true)
  const response = await Cadastrar(name,email,password)
  setLoading(false)
  if(response==="dados inválidos"){
    setErro("Já existe um usuário cadastrado com esse email")
    erroRef.current = setTimeout(()=>{
      setErro("")
    },1000)
    return
  }else{
     window.location.href="/conta"
  }

 
  
}




  return (
    <>
    {isOpen && <div className="fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm flex items-center justify-center z-30 p-4" id={id} onClick={func}>
      <form className='w-full max-w-md bg-white flex flex-col rounded-md shadow-lg p-6 ' div data-aos="fade-down">
        {erro && <p className='text-center text-red-600 font-bold'>{erro}</p> }
        <img src="./images/logoroxo.png" alt="logo" className='mx-auto pb-6'/>
        <div className='flex flex-col text-gray-600 flex-1'>
    <label htmlFor="name" className='font-bold'>Nome completo</label>
    <input type="text" className='bg-gray-200 mt-1 py-3 rounded-md outline-none pl-4' value={name} onChange={({target})=>setName(target.value)} placeholder='Digite seu nome'/>
        </div>
        <div className='flex flex-col text-gray-600 flex-1 mt-4'>
    <label htmlFor="email" className='font-bold'>Email</label>
    <input type="email" className='bg-gray-200 mt-1 py-3 rounded-md outline-none pl-4' placeholder='Digite seu e-mail' value={email} onChange={({target})=>setEmail(target.value)}/>
        </div>
        <div className='flex flex-col text-gray-600 mt-4'>
        <label htmlFor="password" className='font-bold'>Senha</label>
        <input type="password" className='bg-gray-200 mt-1 py-3 rounded-md outline-none pl-4' placeholder='*********' value={password} onChange={({target})=>setPassword(target.value)}/>
        </div>
        <div className='flex flex-col text-gray-600 mt-4'>
        <label htmlFor="password" className='font-bold'>Confirmar senha</label>
        <input type="password" className='bg-gray-200 mt-1 py-3 rounded-md outline-none pl-4' placeholder='*********' value={confirmPass} onChange={({target})=>setConfirmPass(target.value)}/>
        </div>
        <button className='mt-6 button py-3 rounded-md text-white font-bold max-w-[140px]' disabled={loading} onClick={cadastro}>{loading ? <span className='block w-6 h-6 border-2 mx-auto rounded-full animate-spin border-r-transparent'></span>:<span>cadastrar</span>}</button>
        <div className='mt-4 flex gap-4'>
            <p className='text-violet-950'>Já possui uma conta?</p>
            <button className='text-[#AA88FF] font-bold hover:underline' onClick={func2}>Entrar</button>
        </div>
      </form>
    </div>}
    </>
  );
};

export default Cadastro;