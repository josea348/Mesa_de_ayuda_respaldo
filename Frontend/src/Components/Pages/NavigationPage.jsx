import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NavigationTemplate from '../Template/NavigationTemplate'

import { useAuth } from '../../context/AuthContext';

export default function NavigationPage({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
      if (isAuthenticated) return navigate('/dashboard');
    }, [isAuthenticated]);
  
  return (
    <NavigationTemplate>
      {children}
    </NavigationTemplate>
  )
}
