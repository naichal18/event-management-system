import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import './Account.css';

const Account = () => {
    const { t } = useTranslation();
    const { user, updateProfile } = useAuth();
    const { showToast } = useToast();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setGender(user.gender || '');
            setPhone(user.phone || '');
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        // Validation
        if (phone && !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
            showToast(t('account_page.phone_error'), 'error');
            return;
        }

        if (!gender) {
            showToast(t('account_page.gender_error'), 'error');
            return;
        }

        setLoading(true);
        const result = await updateProfile({ name, gender, phone });
        if (result.success) {
            showToast(t('account_page.success'), 'success');
        } else {
            showToast(result.message || 'Update failed', 'error');
        }
        setLoading(false);
    };

    return (
        <div className="account-container">
            <div className="account-box glass-card">
                <h2>{t('account_page.title')}</h2>
                
                <form onSubmit={handleUpdate} className="account-form">
                    <div className="form-group">
                        <label>{t('account_page.name_label')}</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            className="form-input" 
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('account_page.email_label')}</label>
                        <input 
                            type="email" 
                            value={email} 
                            disabled 
                            className="form-input disabled" 
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('account_page.gender_label')}</label>
                        <select 
                            value={gender} 
                            onChange={(e) => setGender(e.target.value)} 
                            className="form-input"
                        >
                            <option value="">{t('account_page.select_gender')}</option>
                            <option value="Male">{t('account_page.male')}</option>
                            <option value="Female">{t('account_page.female')}</option>
                            <option value="Other">{t('account_page.other')}</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>{t('account_page.phone_label')}</label>
                        <input 
                            type="text" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            placeholder={t('account_page.phone_placeholder')} 
                            className="form-input" 
                        />
                    </div>
                    <button type="submit" disabled={loading} className="update-button">
                        {loading ? t('account_page.updating') : t('account_page.update_btn')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Account;
