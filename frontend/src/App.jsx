import './App.css'
import { AuthProvider } from './context/AuthContext'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import UserPage from './pages/UserPage'

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/admin-home" element={<AdminPage />} />
            <Route path="/user-home" element={<UserPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
