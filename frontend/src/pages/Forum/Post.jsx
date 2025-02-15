import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Thread() {
    
    const [ loading, setLoading ] = useState(false)
    const [ postData, setPostData ] = useState({})
    const { id } = useParams();

    async function fetchPostData() {
        setLoading(true)
        const response = await fetch(`http://localhost:3000/krishi/forum/${id}`)
        const data = await response.json()

        if(data){
            setLoading(false)
            setThreadData(data)
        }
    }

    useEffect(() => {
        fetchPostData()
    })

    return (
        <div>
            <h1>
                {postData.title}
            </h1>
        </div>
    )
}