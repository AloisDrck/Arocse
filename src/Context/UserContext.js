// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await axios.get('/api/user/current', { withCredentials: true });
//                 setUser(response.data);
//             } catch (error) {
//                 console.error("Erreur lors de la récupération de l'utilisateur:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUser();
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, setUser, loading }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUser = () => useContext(UserContext);
