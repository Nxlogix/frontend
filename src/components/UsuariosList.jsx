import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://3.86.24.98/usuarios/obtener', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMensaje(data.error);
        } else {
          setUsuarios(data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMensaje('Hubo un problema al obtener los usuarios.');
      });
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div className="usuarios-container">
      <img src="/usuarios.png" alt="Usuarios" className="usuarios-image" />
      <h2 className="usuarios-title">Lista de Usuarios</h2>

      <button onClick={handleLogout} className="logout-button">
        Cerrar Sesión
      </button>

      {mensaje && <p className="mensaje-error">{mensaje}</p>}

      {usuarios.length > 0 ? (
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mensaje-info">No hay usuarios disponibles.</p>
      )}
    </div>
  );
};

export default UsuariosList;