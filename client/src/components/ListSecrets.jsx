import { useEffect, useState } from "react"
import "./ListSecrets.scss"
const API = import.meta.env.VITE_API_URL;

const ListSecrets = () => {

    const [secrets, setSecrets] = useState([])

    const getSecrets = async () => {
        try {
            const res = await fetch(`${API}/load`)
            const jsonData = await res.json()

            setSecrets(jsonData)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getSecrets()
    }, [])

    return(
        <div className="ListSecrets">
            {secrets.map(secret => {
        let className = '';
        const timestamp = secret.created_at.slice(-7, -5);
        console.log(timestamp);

        if (timestamp % 5 === 0) {
            className = 'xl';
        } else if (timestamp % 3 === 0) {
            className = 'l';
        } else if (timestamp % 2 === 0) {
            className = 's';
        }

        return (
        <div key={secret.secret_id} className={`Secret ${className}`}>
        {secret.text}
        </div>
        );
    })}
        </div>
    )
    
}

export default ListSecrets