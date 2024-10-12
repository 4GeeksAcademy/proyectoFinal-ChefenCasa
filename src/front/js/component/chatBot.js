import React, { useEffect, useState } from "react";
import "../../styles/chatBot.css"
import { useNavigate } from "react-router-dom";


export const ChatBot = () => {
    // Estado para almacenar mensajes, iniciando con un saludo del bot
    const [messages, setMessages] = useState([]);

    // Estado para el input
    const [input, setInput] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const redirecting = ['vistaFavoritos', 'menuSemanal', 'vistaPrivada'];
    const navigate = useNavigate();

    const [userName, setUserName] = useState('')

    const [greeted, setGreeted] = useState(false); // Estado para controlar si se ha mostrado el saludo

    const captureKeyDown = (event) => {

        if (event.key === 'Enter') {
            handleSendMessage()
        }

    }

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            return "Good morning";
        } else if (currentHour >= 12 && currentHour < 18) {
            return "Good afternoon";
        } else {
            return "Good nigth";
        }
    }


    useEffect(() => {
        const storeUserName = localStorage.getItem('user_name');
        if (storeUserName) {
            setUserName(storeUserName);
        } if (isOpen && storeUserName && !greeted) {
            const greetingMessage = `${getGreeting()}, ${storeUserName}! How can I assist you today?`
            setMessages(prev => [...prev, { text: greetingMessage, sender: 'assistant' }]);
            setGreeted(true);

        }

    }, [isOpen, greeted]);

    // Interacción para enviar/recibir mensajes
    const handleSendMessage = async () => {
        const userMessage = { text: input, sender: "user" };

        // Agrega el mensaje del usuario a la lista de mensajes
        setMessages([...messages, userMessage]);
        setInput(''); // Vacía el input

        // Integración fetch para enviarle el mensaje al chat
        try {
            // Comprobamos si el input es válido para redirigir
            if (input !== '1' && input !== '2' && input !== '3') {
                // La dirección a la que haremos los pedidos
                const apiKeyOpenChat = process.env.REACT_APP_OPENIA_API_KEY
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": 'Bearer ' + apiKeyOpenChat
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo', // Módulo gratuito
                        messages: [
                            { role: 'system', content: 'You are a helpful assistant that always offers choices to the user.' },
                            { role: 'user', content: 'Hello, what can you do for me?' },
                            { role: 'assistant', content: 'I can assist you with the following options:\n1. Favourite recipes.\n2. Weekly menu.\n3. List of recipes to choose from.\nPlease choose an option by typing the number.' }
                        ],
                        max_tokens: 40
                    })
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                const botMessage = {
                    text: data.choices[0].message.content.trim(),
                    sender: 'assistant'
                };
                // Añade el mensaje del bot a la lista de mensajes
                setMessages(prev => [...prev, botMessage]);

            } else {
                // Maneja la redirección según la elección del usuario
                const botMessage = {
                    text: `Ok, I'm going to redirect you to ${redirecting[input - 1]}`,
                    sender: "assistant"
                };
                // Añade el mensaje del bot a la lista de mensajes
                setMessages(prev => [...prev, botMessage]);

                // Redirige después de 2 segundos
                setTimeout(() => {
                    navigate(`/${redirecting[input - 1]}`);
                }, 2000);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="chatbot-container">

            <button className="chat-toggle-button" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '' : (
                    <>
                        Chat <i className="fa-regular fa-comment"></i>
                    </>
                )}
            </button>

            {/* Modal del chat */}
            {isOpen && (
                <div className="chat-modal">
                    <div className="chat-header">
                        <h4>Welcome</h4>
                        <button onClick={() => setIsOpen(false)} className="close-button-chat">X</button>
                    </div>
                    <div className="chat-content">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={captureKeyDown}

                        />
                        <button className="boton-mensaje" onClick={handleSendMessage} >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};




