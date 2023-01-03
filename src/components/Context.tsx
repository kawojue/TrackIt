import React, {createContext} from 'react'

const Context: any = createContext({})

export const DataProvider:React.FC<{children: React.ReactElement}> = ({ children }) => {
    return (
        <Context.Provider value={{

        }}>
            {children}
        </Context.Provider>
    )
}

export default Context