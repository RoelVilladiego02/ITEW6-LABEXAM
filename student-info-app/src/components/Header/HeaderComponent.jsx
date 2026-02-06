import { Link } from 'react-router-dom';
import './HeaderComponent.css';

export function HeaderComponent() {
  return (
    <header className="header">
      <h1>Student Info App</h1>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/students">Students</Link>
      </nav>
    </header>
  );
}
