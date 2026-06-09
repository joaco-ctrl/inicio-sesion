import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

const Registro = () => {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState('usuario');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/registro', { email, contraseña, rol });
            navigate('/');
        } catch (error) {
            setError(error.message || 'Error en el registro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registro-container">
            <h2>Crear Cuenta</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                    <input
                    placeholder='email'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                    placeholder='contraseña'
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                    <select 
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                    >
                        <option value="usuario">Usuario</option>
                        <option value="admin">Admin</option>
                    </select>
                <button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrarse'}</button>
            </form>
            <p><Link to="/">¿Ya tienes cuenta? Inicia sesión aquí</Link></p>
        </div>
    );
};

export default Registro;
