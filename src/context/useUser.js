// Separate hook file to satisfy react-refresh/only-export-components rule
import { useContext } from 'react';
import { UserContext } from './UserContext';

export const useUser = () => useContext(UserContext);
