import { useState, useEffect } from 'react';
import { StudentComponent } from '../components/Student/StudentComponent';
import { fetchUsers } from '../services/api';
import './Students.css';

export function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setStudents(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleClearSelection = () => {
    setSelectedStudents([]);
  };

  const getSelectedStudentDetails = () => {
    return students.filter(s => selectedStudents.includes(s.id));
  };

  const getFilteredStudents = () => {
    let filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'email') {
        return a.email.localeCompare(b.email);
      } else if (sortBy === 'company') {
        return a.company.name.localeCompare(b.company.name);
      }
      return 0;
    });
  };

  const handleExportSelected = () => {
    const selectedData = getSelectedStudentDetails();
    const csv = [
      ['Name', 'Email', 'Company', 'Phone', 'Website'],
      ...selectedData.map(s => [s.name, s.email, s.company.name, s.phone, s.website])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected-students.csv';
    a.click();
  };

  if (loading) {
    return <div className="page-content"><p className="loading">Loading students...</p></div>;
  }

  if (error) {
    return <div className="page-content"><p className="error">Error: {error}</p></div>;
  }

  const filteredStudents = getFilteredStudents();
  const selectedStudentDetails = getSelectedStudentDetails();

  return (
    <div className="students-page">
      <div className="page-content">
        <h2>Students Directory</h2>

        <div className="controls-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="sort-filter">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="company">Company</option>
            </select>
          </div>

          <div className="stats-display">
            <span className="stat-item">📊 Total: {filteredStudents.length}</span>
            <span className="stat-item selected">✓ Selected: {selectedStudents.length}</span>
          </div>
        </div>

        <div className="students-list">
          {filteredStudents.map((student) => (
            <StudentComponent
              key={student.id}
              student={student}
              onSelect={handleSelectStudent}
            />
          ))}
        </div>
      </div>

      {selectedStudents.length > 0 && (
        <div className="selected-panel">
          <div className="panel-header">
            <h3>Selected Students ({selectedStudents.length})</h3>
            <button className="close-panel" onClick={handleClearSelection}>✕</button>
          </div>

          <div className="selected-list">
            {selectedStudentDetails.map((student) => (
              <div key={student.id} className="selected-item">
                <div className="selected-info">
                  <p className="selected-name">{student.name}</p>
                  <p className="selected-email">{student.email}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleSelectStudent(student.id)}
                  title="Remove from selection"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="panel-actions">
            <button className="action-btn export-btn" onClick={handleExportSelected}>
              📥 Export to CSV
            </button>
            <button className="action-btn clear-btn" onClick={handleClearSelection}>
              🗑️ Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
