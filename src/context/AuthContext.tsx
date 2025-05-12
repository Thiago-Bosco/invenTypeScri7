
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  username: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users - em um sistema real, isso viria do backend
const MOCK_USERS = [
  {
    username: 'admin',
    password: 'admin123',
    name: 'Administrador',
  },
  {
    username: 'user',
    password: 'user123',
    name: 'Usuário',
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar se o usuário está autenticado ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simula uma chamada de API com um delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.username === username && u.password === password
        );

        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
