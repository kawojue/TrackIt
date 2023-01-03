import { ICoords } from '../source'
import {createContext, useState, useEffect} from 'react'

const Context: any = createContext({})

export const DataProvider:React.FC<{children: React.ReactElement}> = ({ children }) => {
    const [error, setError] = useState<string | null>(null)
    const [coords, setCoords] = useState<ICoords | null>(null)
    const [userIP, setUserIP] = useState<{ip: string}>({ip: ""})
    const [userInfo, setUserInfo] = useState<any>({})

    let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g

    const getUserIP = async ():Promise<void> => {
        try {
            const res = await fetch("https://api.ipify.org?format=json")
            const ip = await res.json()
            setUserIP(ip)
        } catch {
            setError("IP not found!")
        }
    }

    const getUserInfo = async ():Promise<void> => {
        try {
            const res = await fetch(`http://api.ipstack.com/${userIP}?access_key=3fa6a454f519adfa0d7e1ed5fb873e85`)
            const data = await res.json()
            setUserInfo(data)
        } catch {

        }
    }

    console.log(userInfo)

    

    function showError(error:any):void {
        switch(error.code) {
        case error.PERMISSION_DENIED:
            setError("User denied the request for Geolocation.")
            break
        case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.")
            break
        case error.TIMEOUT:
            setError("The request to get user location timed out.")
            break
        case error.UNKNOWN_ERROR:
            setError("An unknown error occurred.")
            break
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
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
        })
    }

    console.log(userIP)

    useEffect(() => {
        (async () => await getUserInfo())();
        (async () => await getUserIP())()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            getGeolocation()
        }, 1500)
        return () => navigator.geolocation.clearWatch(0)
    })
    


    return (
        <Context.Provider value={{
            coords, error, userInfo, userIP
        }}>
            {children}
        </Context.Provider>
    )
}

export default Context