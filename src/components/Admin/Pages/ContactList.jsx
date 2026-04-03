import React from 'react';
import { useOutletContext } from 'react-router-dom';

const ContactList = () => {
  const { contacts, fetchContacts } = useOutletContext();

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
        <h3>Contact Messages ({contacts.length})</h3>
        <button className="gradient-btn" onClick={fetchContacts} style={{ padding: '8px 16px', fontSize: '13px' }}>
          ↻ Refresh
        </button>
      </div>
      
      <div className="glass-table-container">
        <table className="glass-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Timestamp</th>
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
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No messages yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
