import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider =({ children }) => {
    const [userData, setUserData] = useState(localStorage.getItem('authToken') ? localStorage.getItem('authToken'):null);
    return(
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)