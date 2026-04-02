import React from 'react';

import { useOutletContext } from 'react-router-dom';

const UserList = () => {
  const { users, setUsers } = useOutletContext();
  const toggleBlock = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, blocked: !u.blocked } : u));
  };

  return (
    <div className="glass-panel" style={{ padding: '25px' }}>
      <div className="page-header">
        <h3>User List</h3>
      </div>
      
      <div className="glass-table-container">
        <table className="glass-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td><img src={user.profile} alt={user.name} className="table-avatar" /></td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
                <td>
                  <button 
                    className={`gradient-btn ${user.blocked ? '' : 'gradient-btn-danger'}`}
                    onClick={() => toggleBlock(user.id)}
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    {user.blocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
