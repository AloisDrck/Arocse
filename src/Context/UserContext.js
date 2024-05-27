import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Vérifier si l'utilisateur est connecté en récupérant les infos utilisateur
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://arocseback.cluster-ig3.igpolytech.fr/api/user/current', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
