import {useState} from 'react';
import type {FormEvent} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api, {mensajeError} from '../api';

export default function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ error, setError] = useState('');
    const [enviando, setEnviando] = useState(false);

    async function enviar(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        setError('');
        setEnviando(true);

        try{
            const {data} = await api.post('/auth/login',{
                email,
                password,
            });
            if(typeof data.token !== 'string' || !data.token){
                setError('La respuesta no contiene algun token');
                return;
            }

            localStorage.setItem('token', data.token);
            navigate('/games', {replace:true});
        }catch(error){
            setError(mensajeError(error));
        }finally{
            setEnviando(false);
        }
    }

    return(
        <form onSubmit={enviar} className="space-y-3">
            <h1 className = "text-2xl font-bold"> Iniciar sesión </h1>
            <label className="block">
                Correo 
                <input className="block border p-2"
                type = "email"
                required
                value = {email}
                onChange = {e => setEmail(e.target.value)}
                />
            </label>

            <label className="block">
                Contraseña 
                <input className="block border p-2"
                type = "password"
                required
                value = {password}
                onChange = {e => setPassword(e.target.value)}
                />
            </label>
            
            {error &&(
                <p role="alert" className="text-red-600">{error}</p>
            )}

            <button
            className = "border p-2 disabled:opacity-50"
            disabled={enviando}>{enviando ? 'Ingresando...' : 'Ingresar'}
            </button>

            <Link className="block undecline" to="/register"> Registrarme </Link>
        </form>
    );
}

