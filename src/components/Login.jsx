import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

    fetch('https://3.86.24.98/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMensaje(data.error);
        } else {
          setMensaje('¡Inicio de sesión exitoso!');
          localStorage.setItem('access_token', data.access_token);
          navigate('/usuarios');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMensaje('Hubo un problema con el inicio de sesión.');
      });
  };

  return (
    <div className="login-container">
      {/* Imagen de presentación */}
      <img src="/presentacion.jpg" alt="Presentación" className="login-image" />

      <h2>Inicio de Sesión</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;