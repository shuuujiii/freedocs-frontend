import React from 'react'
import axios from 'axios'
const SampleCRUD = () => {
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        axios.get('/test').then(res => {
            setData(res.data)
        }
        )
    }, [])

    return (
        data.map(d => <div key={d._id}>{d.name}</div>)
    )
}

export default SampleCRUD