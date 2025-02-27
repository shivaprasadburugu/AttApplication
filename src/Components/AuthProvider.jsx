import React, { createContext, useContext, useState ,useEffect} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('isAuthenticated') === 'true'
  );
  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const login = () => {
    // Perform login logic here (e.g., validate credentials)
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Perform logout logic here
    setIsAuthenticated(false);
  };
  useEffect(() => {
    const handleBackButton = () => {
      // Debugger to check the current hash value
      debugger;
      console.log('Location : ', window.location.hash);
    
      // Get the hash value and trim any extra spaces
      const location1 = window.location.hash.trim(); 
      console.log('location1 : ', location1);
      
      // Use a strict comparison for the hash
      if (location1 === '' || location1 === '#/') {
        debugger;
        logout(); // Clear session and redirect
      }
    };
  
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);