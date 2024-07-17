'use client'
import React, { useEffect, useRef, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { getInfosFetch } from '../functions/getInfosFetch';
import { FaEye } from "react-icons/fa";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { FaEyeSlash } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { FaMinus,FaPlus } from "react-icons/fa";
import { RiContactsBook2Fill } from "react-icons/ri";
import { RiContactsBookUploadFill } from "react-icons/ri";
import Tranferir from '../components/Tranferir';
import Deposito from '../components/Deposito';
import { getToken } from '../actions/getToken';
import logout from '../actions/logout';
import { voltar } from '../functions/voltar';
import { baseUrl } from '../baseUrl';


const Page = () => {
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState("");
  const [tipo, setTipo] = useState("password");
  const [modalTransfer, setOpenModalTransfer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalDeposito,setModalDeposito]=useState(false)
  const [menu,setOpenMenu]=useState(false)
  const [contacts,setContacts]=useState("")
  const [transacoesOpen,settransacoesOpen]=useState(true)
  const [contatosOpen,setContatosOpen]=useState(false)
  const [modalTransfEditContact,setModalTransferEdit]=useState(false)
  const [valor,setValor]=useState("")
  const [dados,setDados]=useState("")
  const[ toEmail,setToEmail]=useState("")
  const [error,setError]=useState("")
  const errorRef = useRef()
  const [sucess,setSucess]=useState(false)


  

  function openMenu(){
    setOpenMenu(menu=>!menu)
  }
  

  useEffect(()=>{
    AOS.init();
  },[])
  

  async function buscarUser() {
    try{
     setLoading(true)
    const { dataUser, dataAmount, dataTransactions,datContacts } = await getInfosFetch();

   if(dataUser){
    setUser(dataUser);
    setAmount(dataAmount);
    setContacts(datContacts)
    setLoading(false)
    
    // Ordenar as transações por data e horário antes de atualizar o estado
    const sortedTransactions = dataTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    setTransactions(sortedTransactions);
   } else{
    window.location.href="/"
   }
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false);
    }
  }


  

  function openModal(e) {
    setOpenModalTransfer(true);
  }

  function closeModal(e) {
    if (e.target.id === "modal") {
      setOpenModalTransfer(false);
    }
  }

  function closeModalDeposito(e) {
    if (e.target.id === "modalDeposito") {
      setModalDeposito(false);
    }
  }

  function mudarTypeInput() {
    tipo === "text" ? setTipo("password") : setTipo("text");
  }

  useEffect(() => {
    mudarTypeInput();
    buscarUser();
  }, []);

  // Formata o valor para exibição no formato BR
  const formattedBalance = amount
    ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      }).format(amount.balance)
    : "R$ 0,00";

  // Formata a data e a hora no padrão brasileiro
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };



  async function sair(){
    logout()
    window.location.href="/"
  }

  function inicio(){
     window.location.href="/"
  }



  function openTransacoes(){
    settransacoesOpen(true)
    setContatosOpen(false)
  }

  function openContatos(){

    setContatosOpen(true)
    settransacoesOpen(false)
  }

  function closeModalTransfContact(e){
    e.preventDefault()
    if(e.target.id==="modalTransfCont"){
      setModalTransferEdit(false)
    }
  }

  async function transferir2(){
    clearTimeout(errorRef.current)
  let amount = Number(valor)
if(valor.trim()===""){
 setError("preencha o valor da transferencia")
    errorRef.current = setTimeout(()=>{
      setError("")
    },2000)
    return
}


const token = await getToken()
setLoading(true)
try{

  if(token){
    const response =await fetch(`${baseUrl}/api/account/transfer` ,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        toEmail,amount
      })
    })


    
    if(response.status===400){
      setLoading(false)
      setError("Saldo insuficiente")
      errorRef.current = setTimeout(()=>{
        setError("")
      },2000)
    }

   
    
        if(response.status===200){
          setSucess("transferência realizada com sucesso")
    
        errorRef.current = setTimeout(()=>{
          setSucess("")
        },2000)
    
        setTimeout(()=>{
          window.location.href="/conta"
        },400)
        }
  }
}catch(error){
  console.log(error)
}finally{
  setLoading(false)
}

  }

  function abrirModalTranfeferir(contato){
    setModalTransferEdit(true)
    setDados(contato)
    setToEmail(contato.email)
  }



  return (
    <div className='min-h-screen'>
      <div className='headerAndFooter'>
        <div className=" max-w-3xl mx-auto shadow-sm text-white rounded-bl-xl rounded-br-xl lg:p-0 lg:py-4 p-4">
          <div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <span className='text-2xl font-bold border border-blue-500 w-8 h-8 flex items-center justify-center rounded-full'>{user && user.name[0].toUpperCase()}</span>
                {amount && <p className='font-medium'>olá, {user.name}</p>}
              </div>

              <div className='cursor-pointer relative'>
              <FaUserCircle className='text-3xl' onClick={openMenu}/>
              {menu && <div className='absolute bg-[#565657] p-2 right-0 rounded-md mt-1 w-[120px] text-gray-200'>
                <button onClick={inicio}>início</button>
                <button onClick={sair}>Sair da conta</button>
              </div>}
              </div>
              
            </div>

            {amount && (
              <div className='mt-3 flex flex-col'>
                <div className='flex gap-4 items-center'>
                <span className='text-white text-sm'>Saldo Atual</span>{tipo === "text" ? <FaEyeSlash onClick={mudarTypeInput} className='text-white text-xl' /> : <FaEye onClick={mudarTypeInput} className='text-white text-xl' />}
                </div>
                <p className='font-medium text-xl text-white'><input type={tipo} value={formattedBalance} className='outline-none bg-inherit' readOnly /></p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='flex p-4 gap-4 justify-center mx-auto max-w-3xl rounded-md mt-6 text-gray-300 lg:static absolute right-0 left-0 bottom-0'>
      <div className='flex items-center flex-col'>
          <div className='bg-[#282A2D] rounded-full shadow-sm border border-gray-500 p-3 cursor-pointer hover:bg-[#7228BC] hover:text-white'>
            <RiContactsBookUploadFill className='text-xl' onClick={openTransacoes}/>
          </div>
          <p className='text-sm text-gray-200'>Transações</p>
        </div>
        <div className='flex items-center flex-col'>
          <div className='bg-[#282A2D] rounded-full shadow-sm border border-gray-500 p-3 cursor-pointer hover:bg-[#7228BC] hover:text-white' onClick={() => setOpenModalTransfer(true)}>
            <FaPix className='text-xl' />
          </div>
          <p className='text-sm text-gray-300'>Pix</p>
        </div>
        <div className='flex items-center flex-col'>
          <div className='bg-[#282A2D] rounded-full shadow-sm border border-gray-500 p-3 cursor-pointer hover:bg-[#7228BC] hover:text-white' onClick={()=>setModalDeposito(true)}>
            <RiContactsBookUploadFill className='text-xl' />
          </div>
          <p className='text-sm text-gray-300'>Indicar</p>
        </div>

        <div className='flex items-center flex-col'>
          <div className='bg-[#282A2D] rounded-full shadow-sm border border-gray-500 p-3 cursor-pointer hover:bg-[#7228BC] hover:text-white' onClick={openContatos}>
            <RiContactsBook2Fill className='text-xl' />
          </div>
          <p className='text-sm text-gray-300'>Contatos</p>
        </div>
      </div>
      


      {modalTransfEditContact && <div className='fixed inset-0 bg-black z-30 flex items-center  justify-center p-4 bg-opacity-25 backdrop-blur-sm' onClick={closeModalTransfContact} id='modalTransfCont'>
        <div className='bg-[#282A2D] w-full max-w-md rounded-md text-gray-300'>
          {error && <p className='text-center text-red-600 font-bold mt-4'>{error}</p> }
          {sucess && <p className='text-center text-green-600 font-bold mt-4'>{sucess}</p> }
          <p className='text-center text-xl mt-8'>Fazendo transferência</p>
        <form className='p-4 max-w-sm w-full flex flex-col mt-6'>
          <input type="number" className='bg-[#51565c] rounded-md py-2 pl-4 outline-none' placeholder='digite o valor' value={valor} onChange={({target})=>setValor(target.value)}/>
        </form>
        <div className='px-4 pb-4 flex items-center gap-4 mb-6'>
          <button className='py-2 px-8 button rounded-md' onClick={transferir2} disabled={loading}> {loading ? <div className='w-6 h-6  rounded-full border-2 border-r-transparent animate-spin mx-[20px]'></div>: <span>Transferir</span> } </button>
          <button onClick={voltar}>← voltar</button>
        </div>
        </div>
      </div>}


      {/* <div className='inset-0 fixed flex items-center justify-center bg-black bg-opacity-5 backdrop-blur-sm '>
        <div className='w-6 h-6  rounded-full border-2 border-r-transparent animate-spin '></div>
      </div> */}

{contatosOpen && <div className='p-4 max-w-md w-full mx-auto' data-aos="fade-right">
      <div className='bg-[#282A2D] text-gray-300 relative rounded-md w-full max-w-3xl mx-auto p-4 mt-4 '>
        <h1 className='text-center text-2xl'>Seus Contatos</h1>
        {!contacts.length < 1 ? <div className='max-h-[280px] overflow-y-auto flex flex-col gap-2 mt-4'>
            {contacts && contacts.map(contact=> (
              <div key={contact._id} className='flex items-center gap-10 max-w-sm justify-between'>
                <p className='flex-1'>{contact.email}</p>
                <button className='text-violet-500 font-bold  ' onClick={()=>abrirModalTranfeferir(contact)}>Transferir</button>
              </div>
            ) )}
        </div> : <p className='text-center mt-4'>voce nao tem contatos</p> } 
      </div>
      </div>}


      
       {transacoesOpen && <div className='p-4 ' data-aos="fade-right">
      <div className='bg-[#282A2D] text-gray-300 relative rounded-md w-full max-w-sm mx-auto p-4 mt-4 '>
        <h1 className='text-center text-2xl'>Movimentações</h1>
        <div className='max-h-[280px] overflow-y-auto flex flex-col gap-2'>
            { transactions.length < 1 && <p className='text-center mt-2'>Você não tem transações</p> }
            { !transactions && <div className='mx-auto flex items-center justify-center mt-4'><div className='w-6 h-6  rounded-full border-2 border-r-transparent animate-spin mx-[20px]'></div></div> }
          {transactions && transactions.map(transaction => (
            <div className='border-b border-gray-500 pb-2 flex flex-col mt-4' key={transaction._id}>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                <p>transferencia {transaction.type==="transferencia" && user.name===transaction.from.name ? <span className='text-red-600 font-bold'>Enviada</span> : <span className='text-green-600 font-bold'>Recebida</span> }</p>
                 {user.name===transaction.from.name ?  (<span>{transaction.to.name}</span>):(<span>{transaction.from.name}</span>) }
                </div>
           <div className='flex items-center gap-2'>
            {transaction.type==="transferencia" && user.name===transaction.from.name ? <FaMinus className='text-red-600'/>:<FaPlus className='text-green-600'/> }
                <span >R$ {Number(transaction.amount).toFixed(2)}</span></div>
              </div>
              <p className='text-sm'>{formatDateTime(transaction.date)}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
      }

      {modalTransfer && <Tranferir func={closeModal} isOpen={modalTransfer} id="modal" />}
      {modalDeposito && <Deposito func={closeModalDeposito} isOpen={modalDeposito} id="modalDeposito"/>}
    </div>
  );
};

export default Page;
