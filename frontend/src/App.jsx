import './App.css'
import { AuthProvider } from './context/AuthContext'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AdminPage from './pages/AdminPage'
import TaskPage from './pages/TaskPage'

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<TaskPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
