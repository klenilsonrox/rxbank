'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Login from './Login';
import Cadastro from './Cadastro';
import { IoMdArrowDropdown } from "react-icons/io";

import { getInfosFetch } from '../functions/getInfosFetch';
import { baseUrl } from '../baseUrl';
import { getToken } from '../actions/getToken';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);
  const [user, setUser] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openModalLogin = () => {
    setModalLogin(true);
    setIsMenuOpen(false);
    setModalCadastro(false);
  };


  async function verifyUser() {
    const token = await getToken()
    const response = await fetch(`${baseUrl}/api/users/me` , {
      headers:{
        "authorization":`Bearer ${token}`
      }
    })
    if(response.status===401){
     setUser("")
    }
  }



  useEffect(() => {
   
    verifyUser()

  }, []); 

  const openModalCadastro = () => {
    setModalCadastro(true);
    setModalLogin(false);
    setIsMenuOpen(false);
  };

  const closeModalLogin = (e) => {
    if (e.target.id === "modalLogin") {
      setModalLogin(false);
    }
  };

  const closeModalCadastro = (e) => {
    if (e.target.id === "modalCadastro") {
      setModalCadastro(false);
    }
  };

  return (
    <div className={`${isMenuOpen ? "bg-white" : "bg-[#7228BC]"} py-4 z-10 relative`}>
      {modalLogin && <Login isOpen={modalLogin} func={closeModalLogin} id="modalLogin" func2={openModalCadastro} />}
      {modalCadastro && <Cadastro isOpen={modalCadastro} func={closeModalCadastro} id="modalCadastro" func2={openModalLogin} />}
      <div className="p-4 max-w-7xl mx-auto flex items-center justify-between lg:flex-row">
        <img src={`${isMenuOpen ? "../images/logoroxo.png" : "../images/logo.png"}`} alt="logo" className='w-[80px] lg:mr-4' />
        <button
          className="lg:hidden text-white z-20 relative top-2"
          onClick={toggleMenu}
        >
          <div className={`w-6 h-6 relative`}>
            <span
              className={`block absolute h-0.5 w-full bg-current transform transition duration-500 ${isMenuOpen ? "bg-violet-700" : "bg-[#7228BC]"} ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}
            ></span>
            <span
              className={`block absolute h-0.5 w-full bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}
            ></span>
            <span
              className={`block absolute h-0.5 w-full bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? "bg-violet-700" : "bg-[#7228BC]"} ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}
            ></span>
          </div>
        </button>
        <nav className={`fixed lg:top-0 right-0 w-full h-full bg-[#7228BC] flex flex-col items-center top-20  transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:relative lg:top-auto lg:right-auto lg:w-auto lg:h-auto lg:bg-transparent lg:translate-x-0 lg:flex-row lg:items-center`}>
          <ul className='flex flex-col lg:flex-row gap-2 lg:gap-4 text-white font-bold p-4 lg:p-0'>
            <li className='py-2'><Link onClick={closeMenu} href="/" className='hover:underline'>Início</Link></li>
            <li className='py-2'><Link onClick={closeMenu} href="/sobre" className='hover:underline'>Sobre</Link></li>
            <li className='py-2'><Link onClick={closeMenu} href="/seguranca" className='hover:underline'>Segurança</Link></li>
            {!user ? <li className='cursor-pointer py-2 hover:underline' onClick={openModalLogin}>Entrar</li> : <Link href="/conta" className='py-2 flex items-center gap-1'>Minha conta <IoMdArrowDropdown className='text-xl' /></Link>}
            {!user ? <li onClick={openModalCadastro} className='lg:bg-white py-2 rounded-full lg:border-2 cursor-pointer lg:text-[#7228BC] hover:bg-[#7228BC] lg:px-6 lg:hover:text-white transition-all lg:hover:border-2 hover:border-white'>Abrir conta</li> : <span></span>}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
