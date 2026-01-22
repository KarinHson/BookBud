import { Book, Users, Archive, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.scss';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  isAdmin: boolean;
}

export const Header = ({ isAdmin }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { id: 'user-dashboard', label: 'Current Book', path: '/active-book', icon: Book },
    { id: 'members', label: "Members' Progress", path: '/members-progress', icon: Users },
    { id: 'finished', label: 'Finished Books', path: '/finished-books', icon: Archive },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin Panel', path: '/admin-panel', icon: Settings }] : []),
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo" onClick={() => navigate('/active-book')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">
            <Book />
          </div>
          <span className="logo-text">BookBud</span>
        </div>

        {/* Desktop navigation */}
        <div className="nav-desktop">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                className={`nav-button ${isActive ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile navigation: only icons */}
        <div className="nav-mobile">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                className={`nav-button-mobile ${isActive ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
                aria-label={item.label}
              >
                <item.icon className="nav-icon-mobile" />
              </button>
            );
          })}
        </div>
         {/* Log out */}
        <button
          className="logout-button"
          aria-label="Log out"
          title="Log out"
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          <LogOut />
          <span className="logout-text">Log out</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
