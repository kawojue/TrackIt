import Context from "./Context"
import { useContext } from 'react'

const Map:React.FC = () => {
    const {coords, error, userInfo, isLoading}  = useContext<any>(Context)

    if (isLoading) {
        return (
            <>
                Loading...
            </>
        )
    }

    if (error) {
        return (
            <>
                <h1>{error}</h1>
            </>
        )
    }
    
    return (
        <section>
            <p>
                Longitude: {coords.longitude}
            </p>
            <p>
                Latitude: {coords.latitude}
            </p>
            <p>
                Accuracy: less than {coords.accuracy.toFixed(3)} metres.
            </p>
            <p>
                User Info: {JSON.stringify(userInfo)}
            </p>
        </section>
    )
}

export default Map