import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Chatbot.css';

const Chatbot = ({ fullPage = false }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(fullPage);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your Harmoni Assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const useAI = true; // Toggle this to switch between fallback and AI mode

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (fullPage) setIsOpen(true);
    }, [fullPage]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const getBotResponse = (message) => {
        const msg = message.toLowerCase();
        
        if (msg.includes("create event") || msg.includes("make event")) {
            return "To create an event, navigate to the 'Create Event' page from the navbar. Fill in the title, type, location, and budget, then let our AI help you with the rest!";
        }
        
        if (msg.includes("budget") || msg.includes("cost") || msg.includes("price")) {
            return "Your event budget depends on the number of guests and the type of event. Our AI Event Planner can provide a detailed breakdown once you enter your total budget!";
        }
        
        if (msg.includes("theme") || msg.includes("ideas") || msg.includes("suggestion")) {
            return "Popular themes include 'Royal Gold & White' for weddings, 'Neon Glow' for birthdays, and 'Corporate Chic' for business events. I can suggest more if you tell me your event type!";
        }

        if (msg.includes("gallery") || msg.includes("photo")) {
            return "You can check out our past successful events in the Gallery section to get inspired!";
        }

        if (msg.includes("contact") || msg.includes("help") || msg.includes("support")) {
            return "You can reach our support team through the Contact page or email us at support@harmoni.com.";
        }

        return "I'm here to help with your event planning! You can ask me about creating events, budget tips, or theme suggestions.";
    };

    const getAIResponse = async (message) => {
        try {
            const res = await fetch("http://localhost:5001/api/chat/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            if (!res.ok) throw new Error("API call failed");
            
            const data = await res.json();
            return data.reply;
        } catch (error) {
            console.error("AI Error:", error);
            return null; // Signal failure to use fallback
        }
    };

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate thinking time
        setTimeout(async () => {
            let botText = null;
            if (useAI) {
                botText = await getAIResponse(input);
            }
            
            // Fallback if AI fails or is disabled
            if (!botText) {
                botText = getBotResponse(input);
            }

            const botMsg = { id: Date.now() + 1, text: botText, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 800);
    };

    const quickActions = [
        { label: "Create Event Help", query: "How to create an event?" },
        { label: "Budget Tips", query: "Budget suggestions?" },
        { label: "Theme Ideas", query: "Suggest some themes" }
    ];

    return (
        <div className={`chatbot-wrapper ${fullPage ? 'full-page' : ''}`}>
            {/* Floating Toggle Button - Only show if NOT full page */}
            {!fullPage && (
                <button 
                    className={`chatbot-toggle ${isOpen ? 'open' : ''}`} 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "✕" : "💬"}
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className={`chatbot-window ${fullPage ? 'full-page-window' : ''}`}>
                    <div className="chatbot-header">
                        <div className="bot-info">
                            <div className="bot-avatar">✨</div>
                            <div>
                                <h3>Harmoni Assistant</h3>
                                <p>Online | AI Ready</p>
                            </div>
                        </div>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                <div className="message-content">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot typing">
                                <div className="message-content">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    <div className="chatbot-quick-actions">
                        {quickActions.map((action, index) => (
                            <button 
                                key={index} 
                                onClick={() => {
                                    const tempInput = action.query;
                                    const userMsg = { id: Date.now(), text: tempInput, sender: 'user' };
                                    setMessages(prev => [...prev, userMsg]);
                                    setInput("");
                                    setIsTyping(true);
                                    setTimeout(async () => {
                                        let botText = null;
                                        if (useAI) {
                                            botText = await getAIResponse(tempInput);
                                        }
                                        if (!botText) {
                                            botText = getBotResponse(tempInput);
                                        }
                                        const botMsg = { id: Date.now() + 1, text: botText, sender: 'bot' };
                                        setMessages(prev => [...prev, botMsg]);
                                        setIsTyping(false);
                                    }, 800);
                                }}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>

                    <form className="chatbot-input" onSubmit={handleSend}>
                        <input 
                            type="text" 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button type="submit">➤</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
