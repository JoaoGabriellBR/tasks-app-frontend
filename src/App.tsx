import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles/App.css';

function App() {
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleTaskCreated = () => {
    setRefreshCounter((prev) => prev + 1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Tasks App</h1>
      </header>

      <main className="app-main">
        <TaskForm onTaskCreated={handleTaskCreated} />
        <hr className="section-divider" />
        <TaskList refreshTrigger={refreshCounter} />
      </main>

      <footer className="app-footer">
        <p>built by João Gabriel</p>
      </footer>
    </div>
  );
}

export default App;
