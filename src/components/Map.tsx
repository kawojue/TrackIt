import Context from "./Context"
import { useContext } from 'react'

const Map:React.FC = () => {
    const {coords, error}  = useContext<any>(Context)
    console.log(coords)
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
            </section>
        : <p>Loading...</p>}
        </>
    )
}

export default Map