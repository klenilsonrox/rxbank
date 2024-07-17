'use client'
import React, { useEffect, useRef, useState } from 'react';
import { baseUrl } from '../baseUrl';
import { getToken } from '../actions/getToken';
import { getInfosFetch } from '../functions/getInfosFetch';
import Input from './Input';


const Deposito = ({ func, isOpen, id }) => {
  const [toEmail, setToEmail] = useState("");
  const [amount, setAmount] = useState("500");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const erroRef = useRef();
  const [user,setUser] = useState("")
  const sucessRef = useRef();
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("Crie sua conta e ganhe R$ 5000,00 ao fazer o seu cadastro link >> https://rxbank.vercel.app/");

  const handleAmountChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9.]/g, "");
    setAmount(value);
  };

  async function buscarUser() {
    const { dataUser } = await getInfosFetch();
    setUser(dataUser)
  }

  useEffect(() => {
    buscarUser();
  }, []);

  const sendWhatsAppMessage = (whatsapp, message) => {
    const whatsappLink = `https://wa.me/+55${whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  async function transferir(e) {
    e.preventDefault();
    clearTimeout(erroRef.current);
    clearTimeout(sucessRef.current);

    if (amount.trim() === "") {
      setError("Digite o email do seu amigo");
      erroRef.current = setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      const token = await getToken();
      const amountNumber = parseFloat(amount);
     
      if(token){
        const response = await fetch(`${baseUrl}/api/account/deposit`, {
          method: "POST",
          next: {
            revalidate: 1
          },
          headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        setToEmail("");
        setAmount("");
        if (data) {
          setSuccess("Depósito realizado com sucesso!");
          sendWhatsAppMessage(whatsapp, message); 
          setTimeout(() => {
            setSuccess("");
          }, 10);
  
          setTimeout(() => {
            window.location.href="/conta"
          }, 500);
        }
  
        if (data.error) {
          setError(data.error);
          erroRef.current = setTimeout(() => {
            setError("");
          }, 2000);
        }
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Formata o valor para exibição
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount ? parseFloat(amount) : 0);

  return (
    <>
      <div className="fixed h-screen flex inset-0 backdrop-blur-sm bg-black bg-opacity-70 items-center p-4" onClick={func} id={id}>
        <div className="p-4 max-w-sm w-full bg-[#282A2D] rounded-md shadow-md mx-auto animaModal" onClick={(e) => e.stopPropagation()}>
          {success && <p className='text-green-600 font-bold text-center'>{success}</p>}
          {error && <p className='text-red-600 font-bold text-center'>{error}</p>}
          <h1 className='text-center text-xl font-bold text-gray-300'>Indique um amigo</h1>
          <p className='text-center mt-4 text-gray-300'>Indique um amigo e ganhe R$ 500,00 para cada amigo indicado :D</p>
          <div className='flex flex-col mt-4'>
            <Input value={whatsapp} onChange={({target})=>setWhatsapp(target.value)} placeholder="numero com ddd sem espaços" />
          </div>
          <button
            className='bg-[#7228BC] transition-all hover:bg-[#7228bcee] mt-4 w-full py-3 rounded-md px-6 text-blue-50 mb-6 button max-w-[150px]'
            disabled={loading}
            onClick={transferir}
          >
            {loading && <span className='block w-6 h-6 border-2 mx-auto rounded-full animate-spin border-r-transparent'></span>}
            {!loading && <span>Indicar</span>}
          </button>
          
        </div>
      </div>
    </>
  );
};

export default Deposito;
