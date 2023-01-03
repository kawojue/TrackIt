import Context from "./Context"
import { useContext } from 'react'

const Map:React.FC = () => {
    const {coords, error, userInfo, userIP}  = useContext<any>(Context)
    
    if (error) {
        return (
            <>
                <h1>{error}</h1>
            </>
        )
    }
    
    return (
        <>
        {coords ?
            <section>
                <p>
                    Longitude: {coords.longitude}
                </p>
                <p>
                    Latitude: {coords.latitude}
                </p>
                <p>
                    Accuracy: {coords.accuracy.toFixed(3)}
                </p>
                <p>
                    IP: {JSON.stringify(userIP)}
                </p>
                <p>
                    User Info: {JSON.stringify(userInfo)}
                </p>
            </section>
        : <p>Loading...</p>}
        </>
    )
}

export default Map