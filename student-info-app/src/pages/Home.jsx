import { Link } from 'react-router-dom';
import './Home.css';

export function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h2>Welcome to Student Info App</h2>
        <p className="subtitle">Explore student information with modern React patterns</p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">⚙️</div>
          <h3>Component Architecture</h3>
          <p>Built with reusable, well-structured React components</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💾</div>
          <h3>State Management</h3>
          <p>Efficient state handling with React hooks</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🧭</div>
          <h3>Client-Side Routing</h3>
          <p>Seamless navigation with React Router</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌐</div>
          <h3>API Integration</h3>
          <p>Real-time data fetching with error handling</p>
        </div>
      </div>

      <div className="cta-section">
        <h3>Ready to explore?</h3>
        <Link to="/students" className="cta-button">View Students</Link>
      </div>
    </div>
  );
}
