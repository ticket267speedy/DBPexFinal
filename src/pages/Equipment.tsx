import api, {mensajeError} from "../api"
import { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom'

type Item = {
    id: number,
    name: string,
    category: string,
    location: string,
    availableUnits: number,
    description: string,
    maxHours: number,
}


export default function Equipments(){
    const {id} = useParams();
    const [items, setItems] = useState<Item[]>([]);
    const [sala, setSala] = useState<sala | null>(null)
    const [error, setError] = useState('');

    useEffect (() => {
        setSala(null);
        setError('');
        api.get<Item>('/items/${id}')
        .then({data}) => setItems (data);
    })

    return(<section>

    </section>);

}
