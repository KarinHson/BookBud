import { Book, Users, Archive, Settings } from 'lucide-react';
import './Header.scss';

interface HeaderProps {
  currentScreen: 'active-book' | 'admin-panel' | 'members-progress' | 'finished-books';
  onNavigate: (screen: 'active-book' | 'admin-panel' | 'members-progress' | 'finished-books') => void;
  isAdmin: boolean;
}

export const Header = ({ currentScreen, onNavigate, isAdmin }: HeaderProps) => {
  const navItems = [
    { id: 'active-book', label: 'Active Book', icon: Book },
    { id: 'members-progress', label: "Members' Progress", icon: Users },
    { id: 'finished-books', label: 'Finished Books', icon: Archive },
    ...(isAdmin ? [{ id: 'admin-panel', label: 'Admin Panel', icon: Settings }] : []),
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">
            <Book />
          </div>
          <span className="logo-text">BookBud</span>
        </div>

        {/* Navigation - Desktop */}
        <div className="nav-desktop">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                className={`nav-button ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.id as any)}
              >
                <Icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation - Mobile: only icons */}
        <div className="nav-mobile">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                className={`nav-button-mobile ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.id as any)}
                aria-label={item.label}
              >
                <Icon className="nav-icon-mobile" />
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
