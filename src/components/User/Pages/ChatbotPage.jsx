import React from 'react';
import Chatbot from '../Common/Chatbot';
import { useTranslation } from 'react-i18next';

const ChatbotPage = () => {
    const { t } = useTranslation();

    return (
        <div style={{ padding: '60px 40px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
                    {t('chatbot.title', 'AI Assistant')}
                </h2>
                <p style={{ color: '#94a3b8' }}>
                    {t('chatbot.subtitle', 'Get help with event planning, themes, and budgeting')}
                </p>
                <div style={{ height: '4px', width: '60px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', margin: '15px auto 0', borderRadius: '2px' }}></div>
            </div>

            <div style={{ width: '100%', maxWidth: '900px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Chatbot fullPage={true} />
            </div>
        </div>
    );
};

export default ChatbotPage;
