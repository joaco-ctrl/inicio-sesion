import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', apellido: '' });
  const [searchId, setSearchId] = useState('');
  const [editId, setEditId] = useState(null);
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuarioActual(JSON.parse(usuarioGuardado));
    }
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await api.get('/usuarios');
      setUsuarios(data);
    } catch (error) {
      console.error('Error cargando usuarios', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchId.trim()) {
      fetchUsuarios();
      return;
    }

    try {
      const usuario = await api.get(`/usuarios/${searchId}`);
      setUsuarios([usuario]);
    } catch (error) {
      alert(error.message || 'No se pudo buscar el usuario');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/usuarios/${editId}`, formData);
        setEditId(null);
      } else {
        await api.post('/usuarios', formData);
      }

      setFormData({ nombre: '', apellido: '' });
      setSearchId('');
      fetchUsuarios();
    } catch (error) {
      alert(error.message || 'Error en el servidor');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Seguro que quieres eliminarlo?')) {
      await api.delete(`/usuarios/${id}`);
      fetchUsuarios();
    }
  };

  const startEdit = (u) => {
    setEditId(u.id);
    setFormData({ nombre: u.nombre, apellido: u.apellido });
  };

  const isAdmin = usuarioActual?.rol === 'admin';

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">Logout</Link>
      <h2>CRUD de Usuarios (MySQL)</h2>
      {usuarioActual && <p>Usuario: {usuarioActual.email} ({usuarioActual.rol})</p>}

      <form onSubmit={handleSearch}>
        <input
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">Buscar</button>
        <button type="button" onClick={fetchUsuarios}>Mostrar todos</button>
      </form>

      {isAdmin && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
          <input
            placeholder="Apellido"
            value={formData.apellido}
            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
            required
          />
          <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({ nombre: '', apellido: '' });
              }}
            >
              Cancelar
            </button>
          )}
        </form>
      )}

      <hr />

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            {isAdmin && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.apellido}</td>
              {isAdmin && (
                <td>
                  <button onClick={() => startEdit(u)}>Editar</button>
                  <button onClick={() => handleDelete(u.id)}>Eliminar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
