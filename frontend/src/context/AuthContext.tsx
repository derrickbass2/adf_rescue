import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";

interface AuthContextType {
  user: { role: string; organizationId: string } | null;
  login: (user: { role: string; organizationId: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ role: string; organizationId: string } | null>(null);

  const login = (user: { role: string; organizationId: string }) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};