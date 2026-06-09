
import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', contraseña: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/login', formData);
      localStorage.setItem('usuario', JSON.stringify(response.usuario));
      localStorage.setItem('token', response.token);
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.error || error.message || 'Error en el login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Cargando...' : 'Login'}</button>
      </form>
      <p><Link to="/registro">¿No tienes cuenta? Regístrate aquí</Link></p>
    </div>
  );
};

export default Login;
