import { createContext, useContext, useState, useEffect } from 'react';


interface UserContextType {
    user: any;
    token: string | null;
    login: (userData: any, userToken: string) => void;
    logout: () => void;
  }

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
  
    useEffect(() => {
      const localUser = localStorage.getItem('user');
      const localToken = localStorage.getItem('token');
      if (localUser && localToken) {
        setUser(JSON.parse(localUser));
        setToken(localToken);
      }
    }, []);
  
    const logout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
      window.location.href = '/login';
    };
  
    const login = (userData: any, userToken: string) => {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userToken);
      setUser(userData);
      setToken(userToken);
      window.location.href = '/dashboard';
    };
  
    return (
      <UserContext.Provider value={{ user, token, login, logout }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useCliente = () => {
    const context = useContext(UserContext);
    if (context === null) throw new Error("useCliente must be used within a UserProvider");
    return context;
  };
  