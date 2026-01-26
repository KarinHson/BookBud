import './Login.scss';
import { Book, User, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

export const Login = () => {

    const { login } = useAuth()
    const navigate = useNavigate()
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
          const user = await authService.login(username, password);
          login(user)
          navigate('/active-book', { replace: true });
        } catch (err: any) {
          setError(err.message || 'Something went wrong, please try again');
        }
    };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-header">
          <div className="login-logo">
            <Book />
          </div>
          <h1>Welcome to BookBud!</h1>
          <p>Here to make book clubbing more fun!</p>
        </div>

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

        <footer className="login-footer">
          <p>Happy reading! <Sparkles className="sparkle-icon" /></p>
        </footer>

      </div>
    </div>
  );
};
