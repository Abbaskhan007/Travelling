import React, {useState, useEffect, createContext} from 'react'
export const UserContext = createContext();

export const Store=({children}) =>{    
    const [initialState, setState] = useState({
        name: '',
        email: '',
        isAuth: false,
        _id: '',
        cart: [],
        cartDetail:[]
    });
    return (
            <UserContext.Provider value={[initialState,setState]}>
                {children}
            </UserContext.Provider>
    )
}

