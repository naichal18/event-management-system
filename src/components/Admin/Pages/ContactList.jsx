import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';

const ContactList = () => {
  const { t } = useTranslation();
  const { contacts, fetchContacts } = useOutletContext();

  useEffect(() => {
    console.log("ContactList page mounted. Re-fetching messages...");
    fetchContacts();
  }, []); // MANDATORY DEBUG STEP 7 - FETCH ON MOUNT

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="glass-panel" style={{ padding: '25px' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{t('contact_list.title')} ({contacts.length})</h3>
        <button className="gradient-btn" onClick={fetchContacts} style={{ padding: '8px 16px', fontSize: '13px' }}>
          ↻ {t('contact_list.refresh')}
        </button>
      </div>
      
      <div className="glass-table-container">
        <table className="glass-table">
          <thead>
            <tr>
              <th>{t('contact_list.table.no')}</th>
              <th>{t('contact_list.table.name')}</th>
              <th>{t('contact_list.table.email')}</th>
              <th>{t('contact_list.table.phone')}</th>
              <th>{t('contact_list.table.message')}</th>
              <th>{t('contact_list.table.timestamp')}</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id}>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td style={{ maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {contact.message}
                </td>
                <td style={{ fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                  {formatDate(contact.createdAt)}
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>{t('contact_list.no_messages')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
