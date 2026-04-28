import React, { useState } from 'react';

interface Props {
  onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (user === 'Admin' && pass === 'Admin') {
      onLogin();
    } else {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100vh', background: '#f0f2f5'
    }}>
      <div style={{
        background: 'white', padding: '2rem', borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)', width: '320px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#1a1a2e' }}>
          enContact
        </h2>
        <input
          placeholder="Usuário"
          value={user}
          onChange={e => setUser(e.target.value)}
          style={{ width: '100%', padding: '0.6rem', marginBottom: '0.8rem',
            border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={pass}
          onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          style={{ width: '100%', padding: '0.6rem', marginBottom: '0.8rem',
            border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
        {error && <p style={{ color: 'red', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{error}</p>}
        <button
          onClick={handleLogin}
          style={{ width: '100%', padding: '0.7rem', background: '#2E75B6',
            color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
            fontWeight: 'bold', fontSize: '1rem' }}
        >
          Entrar
        </button>
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#999', marginTop: '1rem' }}>
          Admin / Admin
        </p>
      </div>
    </div>
  );
};

export default Login;