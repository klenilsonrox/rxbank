// hooks/useContacts.js
import { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { getToken } from '../actions/getToken';

const useContacts = () => {
  const [socket, setSocket] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const client = new W3CWebSocket('wss://backendrxbank.vercel.app'); // URL do seu servidor WebSocket

    client.onopen = () => {
      console.log('Conectado ao servidor WebSocket');
    };

    client.onmessage = (message) => {
      console.log('Mensagem do servidor:', message);
      // Atualize os contatos aqui se necessário
      fetchContacts();
    };

    client.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };

    setSocket(client);

    return () => {
      client.close();
    };
  }, []);

  const fetchContacts = async () => {
    const token = await getToken()
    try {
      const response = await fetch('https://backendrxbank.vercel.app/api/mycontacts', {
        headers: {
          'Authorization': `Bearer ${token}`, // Adicione seu token JWT aqui se necessário
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar contatos');
      }

      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []); // Busca contatos ao montar o componente

  return { contacts };
};

export default useContacts;
