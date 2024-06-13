import React, { createContext, useEffect, useState } from 'react';

interface AuthContextValue {
  jwtToken: string | null;
  setJwtToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    
  const [jwtToken, setJwtTokenState] = useState<string | null>(null);

  useEffect(() => {
    console.log('JWT Token wurde geändert:', jwtToken);
    // Hier kannst du weitere Aktionen ausführen, wenn der Wert geändert wurde
  }, [jwtToken]);
  
  const setJwtToken = (token: string | null) => {
    setJwtTokenState(token);
  };

  const value = { jwtToken, setJwtToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;