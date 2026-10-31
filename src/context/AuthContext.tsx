import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, RolePermission } from '../types/user';
import { authService, ROLE_PERMISSIONS } from '../services/authService';
import { initializeParikalpStore } from '../services/api';

interface AuthContextType {
  user: User;
  role: UserRole;
  permissions: RolePermission;
  switchRole: (role: UserRole) => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User>(() => {
    initializeParikalpStore();
    return authService.getCurrentUser();
  });

  const switchRole = (newRole: UserRole) => {
    const updatedUser = authService.switchRole(newRole);
    setUserState(updatedUser);
  };

  const setUser = (newUser: User) => {
    authService.setUser(newUser);
    setUserState(newUser);
  };

  const permissions = ROLE_PERMISSIONS[user.role];

  return (
    <AuthContext.Provider value={{ user, role: user.role, permissions, switchRole, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

