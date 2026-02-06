import { useState } from 'react';
import './StudentComponent.css';

export function StudentComponent({ student, onSelect }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    if (onSelect) {
      onSelect(student.id);
    }
  };

  return (
    <div className={`student-card ${selected ? 'selected' : ''}`}>
      <div className="card-content">
        <div className="student-header">
          <h3>{student.name}</h3>
          <span className={`status-badge ${selected ? 'active' : ''}`}>
            {selected ? '✓ Selected' : 'Selectable'}
          </span>
        </div>
        
        <div className="student-details">
          <p>
            <strong>Email:</strong>
            <a href={`mailto:${student.email}`}>{student.email}</a>
          </p>
          <p>
            <strong>School:</strong>
            <span>{student.school}</span>
          </p>
          <p>
            <strong>Course:</strong>
            <span>{student.course}</span>
          </p>
          <p>
            <strong>Year:</strong>
            <span>{student.year}</span>
          </p>
          <p>
            <strong>Phone:</strong>
            <a href={`tel:${student.phone}`}>{student.phone}</a>
          </p>
          <p>
            <strong>Portfolio:</strong>
            <a href={`https://${student.website}`} target="_blank" rel="noopener noreferrer">
              {student.website}
            </a>
          </p>
        </div>
      </div>
      
      <button onClick={handleClick} className="select-btn">
        {selected ? '✓ Deselect' : '+ Select'}
      </button>
    </div>
  );
}
