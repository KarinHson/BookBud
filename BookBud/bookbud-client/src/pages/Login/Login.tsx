import './Login.scss';
import { Book, User } from 'lucide-react';

export const Login = () => {
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

          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-with-icon">
                <User />
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit">Log In</button>
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
