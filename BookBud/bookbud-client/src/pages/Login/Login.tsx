import './Login.scss';
import { Book, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const { login } = useAuth()
    const navigate = useNavigate()
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        //mocked users for now
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: username, password }),
    })
     if (!response.ok) {
      // 401 eller 400 → visa fel
      const errorData = await response.json();
      setError(errorData.message || 'Login failed');
      return;
    }

    const user = await response.json(); // user-object från backend
    login(user); // spara i AuthContext

    navigate('/active-book', { replace: true });
    
        } catch(err) {
            setError('Something went wrong, please try again')
        }
    };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Logo & welcome */}
        <div className="login-header">
          <div className="login-logo">
            <Book />
          </div>
          <h1>Welcome to BookBud!</h1>
          <p>Here to make book clubbing more fun!</p>
        </div>

        {/* Login card */}
        <div className="login-card">
          <h2>Sign In</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-with-icon">
                <User />
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit">Log In</button>
            {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
          </form>

          <p className="login-tip">
            Tip: Use "Emma G" as username & password to access regular features. Use "Karin H" as username & password to access admin features
          </p>
        </div>

        {/* Footer */}
        <footer className="login-footer">
          <p>Happy reading! ✨</p>
        </footer>

      </div>
    </div>
  );
};
