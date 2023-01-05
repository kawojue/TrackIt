import { ICoords } from '../source'
import {createContext, useState, useEffect} from 'react'

const Context: any = createContext({})

export const DataProvider:React.FC<{children: React.ReactElement}> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<any>({})
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [coords, setCoords] = useState<ICoords | null>(null)
    const [userIP, setUserIP] = useState<{ip:string}>({ip: ""})

    // const token:string = "d58a0d170c69f8"
    // const url:string = "https://ipinfo.io/json"
    // let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g

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
            const res = await fetch(`https://ipapi.co/json/`)
            const data = await res.json()
            setUserInfo(data)
        } catch {

        }
    }

    function showError(error:any):void {
        if (error.code) {
            setError("User denied permission to access location.")
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

    useEffect(() => {
        (async () => await getUserIP())();
        (async () => await getUserInfo())()
    }, [])

    useEffect(() => {
        getGeolocation()
        setTimeout(() => {
        }, 1500)
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