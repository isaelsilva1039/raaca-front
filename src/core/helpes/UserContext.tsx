import { createContext, useContext, useState, useEffect } from 'react';


interface UserContextType {
    user: any;
    token: string | null;
    login: (userData: any, userToken: string, usetAvatar: any) => void;
    logout: () => void;
    avatar_user: string
  }

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [avatar_user, setAvatar_user] = useState<any>();

    
  
    useEffect(() => {
      const localUser = localStorage.getItem('user');
      const localToken = localStorage.getItem('token');
      const localAvatar = localStorage.getItem('avatar_user');
      
      if (localUser && localToken) {
        setUser(JSON.parse(localUser));
        setToken(localToken);
        setAvatar_user(localAvatar); 
      }
    }, []);
  
    const logout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('avatar_user');
      setUser(null);
      setToken(null);
      window.location.href = '/login';
    };
  
    const login = (userData: any, userToken: string, userAvatar: string) => {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userToken);
      localStorage.setItem('avatar_user', userAvatar); // Salva diretamente como string
      setUser(userData);
      setToken(userToken);
      setAvatar_user(userAvatar)
      window.location.href = '/dashboard';
    };
  
    return (
      <UserContext.Provider value={{ user, token, login, logout, avatar_user }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useCliente = () => {
    const context = useContext(UserContext);
    if (context === null) throw new Error("useCliente must be used within a UserProvider");
    return context;
  };
  