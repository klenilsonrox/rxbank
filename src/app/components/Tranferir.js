'use client'
import React, { useRef, useState } from 'react';
import { baseUrl } from '../baseUrl';
import { getToken } from '../actions/getToken';
import Input from './Input';
import Link from 'next/link';
import { voltar } from '../functions/voltar';


const Tranferir = ({ func, isOpen, id }) => {
  const [toEmail, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const erroRef = useRef();
  const sucessRef = useRef();

  const handleAmountChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9.]/g, "");
    setAmount(value);
  };

  async function transferir(e) {
    e.preventDefault();
    clearTimeout(erroRef.current);
    clearTimeout(sucessRef.current);

    if (amount.trim() === "") {
      setError("Informe o valor da transferência");
      erroRef.current = setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      const token = await getToken();
      const amountNumber = parseFloat(amount);
      setLoading(true);

      const response = await fetch(`${baseUrl}/api/account/transfer`, {
        method: "POST",
        headers: {
          "authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          toEmail: toEmail.toLowerCase(),
          amount: amountNumber
        })
      });
      const data = await response.json();

      setSuccess(data.message);
      setTimeout(() => {
        setSuccess("");
      }, 2000);

      if (data.message) {
        setTimeout(() => {
          setEmail("");
          setAmount("");
          window.location.href = "/conta";
        }, 1000);
      }

      if (data.error) {
        setError(data.error);
        erroRef.current = setTimeout(() => {
          setError("");
        }, 2000);
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
      {isOpen && (
        <div className="fixed h-screen flex inset-0 backdrop-blur-sm bg-black bg-opacity-70 items-center p-4" onClick={func} id={id}>
          <div className="px-4 max-w-sm w-full bg-[#282A2D] rounded-md shadow-md mx-auto animaModal" onClick={(e) => e.stopPropagation()}>
            {success && <p className='text-green-600 font-bold text-center'>{success}</p>}
            {error && <p className='text-red-600 font-bold text-center'>{error}</p>}
            <h1 className='text-center text-xl font-bold text-gray-400 my-6'>Transferência</h1>
            <Input placeholder="Digite o email chave" value={toEmail} setState={setEmail}/>
            <Input placeholder="Digite o valor" onChange={handleAmountChange}/>
           
            <div className='flex items-center gap-2 mb-8 w-full '>
            <button className='bg-[#7228BC] transition-all hover:bg-[#7228bcee] mt-4 w-full py-3 rounded-md text-blue-50 button max-w-[150px]' disabled={loading} onClick={transferir}>
              {loading && <span className='block w-6 h-6 border-2 mx-auto rounded-full animate-spin border-r-transparent'></span>}
              {!loading && <span>Transferir</span>}
              </button>
              <button className='flex px-6 py-3 mt-4 text-white' onClick={voltar}>← Voltar</button>
              <div>
              
              </div>
           
            </div>
  
          </div>
        </div>
      )}
    </>
  );
};

export default Tranferir;
