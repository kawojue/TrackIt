import { ICoords } from '../source'
import {createContext, useState, useEffect} from 'react'

const Context: any = createContext({})

export const DataProvider:React.FC<{children: React.ReactElement}> = ({ children }) => {
    const [error, setError] = useState<string| null>(null)
    const [coords, setCoords] = useState<ICoords>({longitude: 0, latitude: 0})

    function showError(error:any):void {
        switch(error.code) {
        case error.PERMISSION_DENIED:
            setError("User denied the request for Geolocation.")
        case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.")
        case error.TIMEOUT:
            setError("The request to get user location timed out.")
        case error.UNKNOWN_ERROR:
            setError("An unknown error occurred.")
        }
    }

    const getGeolocation = ():void => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(getPosition, showError)
        }
    }

    const getPosition = (position:any):void => {
        setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }

    useEffect(() => {
        getGeolocation()
    })
    
    


    return (
        <Context.Provider value={{
            coords, error
        }}>
            {children}
        </Context.Provider>
    )
}

export default Context