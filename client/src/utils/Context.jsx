import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const ProveedorContexto = (props) => {

    const [usuarioAuth, setUsuarioAuth] = useState(null);
    const usrStorage = () => {
        const user = localStorage.getItem("user");
        if (!user) return false;
        setUsuarioAuth(JSON.parse(user));
    }
    useEffect(() => {
        usrStorage();
    }, [])

    return (
        <AuthContext.Provider value={[usuarioAuth, setUsuarioAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}