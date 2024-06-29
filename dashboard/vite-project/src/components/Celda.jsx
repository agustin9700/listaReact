import { useState, useEffect } from 'react'
import axios from 'axios';

function Celda() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api');
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {data.map((item, i) => (
                <tr key={i} className="text-center">
                    <th className='fw-bold' scope="row">{item.id}</th>
                    <td className='fw-bold'>{item.nombre}</td>
                    <td className='fw-bold ' >{item.previarep}</td>
                    <td className='fw-bold '>{item.reputacion}</td>
                    <td className={item.diferencia > 45 ? 'text-success fw-bold' : item.diferencia < 45 ? 'text-danger fw-bold' : ''}>
                        {item.diferencia > 0 ? '+' : ''}{item.diferencia}
                    </td>
                </tr>
            ))}
        </>
    )
}

export default Celda