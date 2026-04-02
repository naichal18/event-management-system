import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

const DEFAULT_USER = {
  name: 'Spark User',
  email: 'user@harmoni.com',
  phone: '',
  gender: '',
  avatar: 'https://i.pravatar.cc/150?u=spark',
  password: 'user123',
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('harmoni_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const updateUser = (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('harmoni_user', JSON.stringify(updated));
      return updated;
    });
  };

  const changePassword = (currentPassword, newPassword) => {
    if (user.password !== currentPassword) {
      return { success: false, message: 'Current password is incorrect.' };
    }
    if (newPassword.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters.' };
    }
    updateUser({ password: newPassword });
    return { success: true, message: 'Password changed successfully!' };
  };

  const resetUser = () => {
    localStorage.removeItem('harmoni_user');
    setUser(DEFAULT_USER);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, changePassword, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};
