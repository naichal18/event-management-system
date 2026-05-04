import React from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';

const UserList = () => {
  const { t } = useTranslation();
  const { users, fetchUsers } = useOutletContext();

  return (
    <div className="glass-panel" style={{ padding: '25px' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{t('user_list.title')} ({users.length})</h3>
        <button className="gradient-btn" onClick={fetchUsers} style={{ padding: '8px 16px', fontSize: '13px' }}>
          ↻ {t('user_list.refresh')}
        </button>
      </div>
      
      <div className="glass-table-container">
        <table className="glass-table">
          <thead>
            <tr>
              <th>{t('user_list.table.no')}</th>
              <th>{t('user_list.table.name')}</th>
              <th>{t('user_list.table.email')}</th>
              <th>{t('user_list.table.role')}</th>
              <th>{t('user_list.table.gender')}</th>
              <th>{t('user_list.table.phone')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span style={{
                    background: user.role === 'Admin' ? 'rgba(168,85,247,0.2)' : 'rgba(59,130,246,0.2)',
                    color: user.role === 'Admin' ? '#c084fc' : '#60a5fa',
                    padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600
                  }}>
                    {user.role === 'Admin' ? t('user_list.roles.admin') : t('user_list.roles.user')}
                  </span>
                </td>
                <td>{user.gender || '—'}</td>
                <td>{user.phone || '—'}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>{t('user_list.no_users')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
