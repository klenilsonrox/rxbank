'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { MdOutlineAutorenew } from "react-icons/md";
import AOS from 'aos';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import { AiOutlineCustomerService } from "react-icons/ai";
import { LuPiggyBank } from "react-icons/lu";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";

const page = () => {
  const [modalLogin, setOpenModalLogin] = useState(false);
  const [openModalCadastro, setOpenModalCadastro] = useState(false);
  const [openLiIndex, setOpenLiIndex] = useState(null);

  useEffect(() => {
    AOS.init();
  }, []);

  function closeModalLogin(e) {
    if (e.target.id === "modalLogin") {
      setOpenModalLogin(false);
    }
  }

  function openModalLogin() {
    setOpenModalLogin(true);
  }

  function closeModalCadastro(e) {
    if (e.target.id === "modalCadastro") {
      setOpenModalCadastro(false);
    }
  }

  function openModalCadastrof(e) {
    e.preventDefault();
    setOpenModalCadastro(true);
    setOpenModalLogin(true);
  }

  function openModalLogin() {
    setOpenModalCadastro(false);
    setOpenModalLogin(true);
  }

  function handleLiClick(index) {
    setOpenLiIndex(index === openLiIndex ? null : index);
  }

  const faqItems = [
    {
      question: "O Que é o RxBank?",
      answer: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus aliquid veritatis mollitia quis eos in commodi. Perspiciatis odit animi possimus, quia distinctio, porro ex magni eveniet totam excepturi temporibus assumenda modi necessitatibus sint ad vel, libero ipsam consequatur suscipit tempora!",
    },
    {
      question: "Quais são os benefícios do RxBank?",
      answer: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus aliquid veritatis mollitia quis eos in commodi. Perspiciatis odit animi possimus, quia distinctio, porro ex magni eveniet totam excepturi temporibus assumenda modi necessitatibus sint ad vel, libero ipsam consequatur suscipit tempora!",
    },
    {
      question: "Preciso pagar algo para abrir uma conta?",
      answer: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus aliquid veritatis mollitia quis eos in commodi. Perspiciatis odit animi possimus, quia distinctio, porro ex magni eveniet totam excepturi temporibus assumenda modi necessitatibus sint ad vel, libero ipsam consequatur suscipit tempora!",
    },
    {
      question: "Consigo fazer compras em outra moeda, mesmo a conta sendo em dólar?",
      answer: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus aliquid veritatis mollitia quis eos in commodi. Perspiciatis odit animi possimus, quia distinctio, porro ex magni eveniet totam excepturi temporibus assumenda modi necessitatibus sint ad vel, libero ipsam consequatur suscipit tempora!",
    },
  ];

  return (
    <div className='bg-white min-h-[50%] overflow-x-hidden'>
      {modalLogin && <Login id="modalLogin" isOpen={modalLogin} func={closeModalLogin} func2={openModalCadastrof} />}
      {openModalCadastro && <Cadastro id="modalCadastro" isOpen={openModalCadastro} func={closeModalCadastro} func2={openModalLogin} />}
      <div className="p-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
        <div className='max-w-[900px] flex flex-col items-start' data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine">
          <h1 className='text-[25px] lg:text-[40px] font-bold leading-7 lg:leading-10'>Bem-vindo ao RxBank Impulsionando Seu <span className='text-[#7228BC]'>Sucesso Financeiro</span> </h1>
          <p className='text-violet-950 font-medium mt-4 lg:mt-8'>No RxBank, nossa missão é oferecer soluções bancárias completas que possibilitem a indivíduos e empresas alcançarem seus objetivos financeiros. Estamos dedicados a proporcionar serviços personalizados e inovadores, sempre colocando as necessidades de nossos clientes em primeiro lugar.</p>
          <div className='mt-8 bg-[#F7F8F7] h-[250px] p-4 rounded-md lg:flex items-start w-full lg:w-auto border-b border-l border-l-[#7228BC] border-b-[#7228BC]'>
            <div className='flex flex-col items-start'>
              <p className='text-xl leading-5 lg:leading-6'>comece a aproveitar <br /> agora</p>
              <button className='button py-2 px-6 rounded-md text-white mt-10' onClick={openModalLogin}>Criar conta</button>
            </div>
            <div className='relative'>
              <img src="./images/cartao.png" alt="" className='w-full max-w-[150px] relative bottom-[-40px] lg:top-10 top-[-60px] right-[-200px] lg:left-10' data-aos="fade-up"
                data-aos-duration="3000" />
            </div>
          </div>
        </div>
        <img src="./images/telefone.png" alt="telefone" className='w-full max-w-[300px] mt-6 lg:max-w-[300px]' data-aos="fade-up-left" />
      </div>
      <div className='w-full bg-[#F5F5F5] p-4'>
        <div className='max-w-7xl w-full mx-auto mt-6'>
          <h2 className='text-center text-[25px] lg:text-[40px] text-gray-700 leading-6'>Sua vida financeira em um único app</h2>
          <div className='my-10 grid lg:grid-cols-3 gap-8'>
            <div className='bg-white rounded-md overflow-hidden shadow-sm' data-aos="fade-down">
              <img src="./images/viagem.png" alt="" className='w-full' />
              <div className='p-4 flex flex-col gap-4'>
                <p className='text-2xl'>Viaje Pelo mundo</p>
                <p>Use o cartão <span className='font-medium'>físico ou virtual</span> em qualquer lugar do Mundo.</p>
                <Link href="/" className='font-bold text-[#0073B9]'>Quero viajar com a RxBank</Link>
              </div>
            </div>
            <div className='bg-white rounded-md overflow-hidden shadow-sm' data-aos="fade-up">
              <img src="./images/investimento.png" alt="" className='w-full' />
              <div className='p-4 flex flex-col gap-4'>
                <p className='text-2xl leading-6'>Invista no seu futuro no RxBank</p>
                <p>Aproveite as <span className='font-medium'>nossas taxas</span> e invista com segurança.</p>
                <Link href="/" className='font-bold text-[#0073B9]'>Quero investir com a RxBank</Link>
              </div>
            </div>
            <div className='bg-white rounded-md overflow-hidden shadow-sm' data-aos="fade-down">
              <img src="./images/tempo.png" alt="" className='w-full' />
              <div className='p-4 flex flex-col gap-4'>
                <p className='text-2xl'>Receba pagamentos agora</p>
                <p>Aproveite <span className='font-medium'>o melhor serviço com o melhor preço</span> e receba transferências agora.</p>
                <Link href="/" className='font-bold text-[#0073B9] flex items-center gap-4'>Quero receber pagamentos <span className='text-2xl'>→</span></Link>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white py-16 p-4 rounded-md'>
          <h2 className='text-center text-[25px] lg:text-[40px] text-gray-700 leading-6' data-aos="fade-down">Vantagens da sua conta RxBank</h2>
          <div className='bg-white mx-auto max-w-7xl mt-16 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6 justify-between'>
            <div className='flex flex-col items-start gap-4 mx-auto max-w-[400px] bg-[#F5F5F5] p-4 rounded-md text-gray-700' data-aos="fade-right">
              <p className='bg-[#7A34C0] p-2 rounded-md text-white'><CiHeart className='text-3xl' /></p>
              <p className='text-xl font-medium'>Facilidade</p>
              <p>Resolva tudo com rapidez, de forma totalmente digital e em poucos cliques.</p>
            </div>
            <div className='flex flex-col items-start gap-4 mx-auto max-w-[400px] bg-[#F5F5F5] p-4 rounded-md text-gray-700' data-aos="fade-right">
              <p className='bg-[#7A34C0] p-2 rounded-md text-white'><HiOutlineLockClosed className='text-3xl' /></p>
              <p className='text-xl font-medium'>Segurança</p>
              <p>Seus dados estão protegidos, pode confiar.</p>
            </div>
            <div className='flex flex-col items-start gap-4 mx-auto max-w-[400px] bg-[#F5F5F5] p-4 rounded-md text-gray-700' data-aos="fade-left">
              <p className='bg-[#7A34C0] p-2 rounded-md text-white'><LuPiggyBank className='text-3xl' /></p>
              <p className='text-xl font-medium'>CashBack</p>
              <p>Dinheiro de volta em suas compras, direto na conta</p>
            </div>
            <div className='flex flex-col items-start gap-4 mx-auto max-w-[400px] bg-[#F5F5F5] p-4 rounded-md text-gray-700' data-aos="fade-left">
              <p className='bg-[#7A34C0] p-2 rounded-md text-white'><MdOutlineAutorenew className='text-3xl' /></p>
              <p className='text-xl font-medium'>Meus cartões</p>
              <p>Você gerencia seu cartão físico e virtual  direto pelo app.</p>
            </div>
            <div className='flex flex-col items-start gap-4 mx-auto max-w-[400px] bg-[#F5F5F5] p-4 rounded-md text-gray-700' data-aos="fade-right">
              <p className='bg-[#7A34C0] p-2 rounded-md text-white'><AiOutlineCustomerService className='text-3xl' /></p>
              <p className='text-xl font-medium'>Atendimento</p>
              <p>Conte com nossa equipe 24 horas por dia.</p>
            </div>
            <div className='flex flex-col items-start gap-4 mx-auto max-w-[400px] bg-[#F5F5F5] p-4 rounded-md text-gray-700' data-aos="fade-left">
              <p className='bg-[#7A34C0] p-2 rounded-md text-white'><AiOutlineCustomerService className='text-3xl' /></p>
              <p className='text-xl font-medium'>Transferências</p>
              <p>Você faz PIX ou TED  ilimitadas e sem custos direto pelo app</p>
            </div>
          </div>
        </div>
        <div className=' mt-14 w-full mx-auto max-w-7xl ' data-aos="fade-right">
          <h2 className='text-center text-[25px] lg:text-[40px] text-gray-700 leading-6'>Perguntas Frequentes</h2>
          <ul className='mt-14 flex flex-col gap-4 list'>
            {faqItems.map((item, index) => (
              <li
                key={index}
                className={`border-b pb-4 overflow-hidden transition-all duration-300 ${openLiIndex === index ? 'max-h-[1000px]' : 'max-h-[50px]'}`}
                onClick={() => handleLiClick(index)}
              >
                <div className='flex justify-between items-center cursor-pointer'>
                  <p>{item.question}</p>
                  <IoIosArrowDown className={`transition-transform duration-300 ${openLiIndex === index ? 'rotate-180' : ''}`} />
                </div>
                <p className={`mt-4 ${openLiIndex === index ? 'block' : 'hidden'}`}>{item.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='w-full py-16'>
        <div className='max-w-7xl mx-auto p-4 flex flex-col lg:flex-row justify-between bg-[#F5F5F5] rounded-md' data-aos="fade-left">
          <div className='text-gray-600 max-w-[500px]'>
            <h3 className='text-xl lg:text-2xl text-[#7228BC]'>Prepare-se para experimentar um novo nível de serviços financeiros</h3>
            <p className='mt-8 text-base'>Nossa equipe está aqui para ajudar você a alcançar o sucesso financeiro que merece. Descubra as vantagens de ser cliente do RxBank e veja como podemos fazer a diferença na sua vida financeira. </p>
            <p className='mt-8 text-base'>Entre em contato conosco hoje mesmo e comece a transformar sua vida financeira.</p>
          </div>
          <div className='flex flex-col items-center lg:items-start gap-4 mt-8'>
            <button className='button w-full max-w-[300px] text-white rounded-md py-2 px-6'>Fale Conosco</button>
            <button className='w-full max-w-[300px] rounded-md text-[#7228BC]'>Saber mais</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
