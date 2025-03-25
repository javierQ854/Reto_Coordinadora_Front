import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [componentName, setComponentName] = useState("ListaEnvios");

    const handleComponentChange = (name) => {
        setComponentName(name);
    };

    return (
        <NavigationContext.Provider value={{ componentName, handleComponentChange }}>
            {children}
        </NavigationContext.Provider>
    );
};

// Hook personalizado para usar el contexto en otros componentes
export const useNavigation = () => useContext(NavigationContext);
