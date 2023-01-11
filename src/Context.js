import { createContext, useContext, useState } from "react";


const InfoContext = createContext()

export const useInfoContext = () => useContext(InfoContext)

export const InfoProvider = ({children}) => {
    const [user , setUser] = useState(null)
    const [posts , setPosts] = useState([])
    const [show , setShow] = useState(false)
    const [token , setToken] = useState(localStorage.getItem('access_token') || null)

    const baseURL = `https://webstar-post-app.onrender.com/api/`

    const value = {
        user,
        setUser,
        show ,
        posts ,
        setPosts ,
        setShow ,
        token,
        setToken,
        baseURL
    }

    return(
        <InfoContext.Provider value={value}>
            <InfoContext.Consumer>
                {()=> children}
            </InfoContext.Consumer>
        </InfoContext.Provider>
    )

}
