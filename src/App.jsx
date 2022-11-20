import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { DbProvider } from './contexts/DbContext'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'

import Logout from './components/Logout/Logout'

import './styles/general.scss'
import './styles/form.scss'

const App = () => {
  return (
    <AuthProvider>
      <DbProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
        <Logout />
      </DbProvider>
    </AuthProvider>
  )
}

export default App
