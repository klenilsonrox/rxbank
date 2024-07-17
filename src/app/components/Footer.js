import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-[#7A34C0] flex flex-col justify-end ">
      <footer className="max-w-lg w-full mx-auto p-6">

            <ul className="text-white flex w-full max-w-3xl justify-between mx-auto">
              <li><a href="/politica" className="hover:underline">Política</a></li>
              <li><a href="/contato" className="hover:underline">Contato</a></li>
              <li><a href="/termos" className="hover:underline">Termos</a></li>
              <li><a href="/inicio" className="hover:underline">Início</a></li>
              <li><a href="/sobre" className="hover:underline">Sobre</a></li>
            </ul>
  
        <div className="mt-6 flex justify-center space-x-4">
          <a href="https://www.linkedin.com/in/clenilson-brandao/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 text-2xl">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 text-2xl">
            <FaInstagram />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
