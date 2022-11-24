import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { DbProvider } from './contexts/DbContext'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import Home from './pages/Home/Home'
import MyNotes from './pages/MyNotes/MyNotes'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Profile from './pages/Profile/Profile'
import EmailNotVerified from './pages/EmailNotVerified/EmailNotVerified'
import PageNotFound from './pages/PageNotFound/PageNotFound'

import './styles/general.scss'
import './styles/form.scss'

const App = () => {
  return (
    <AuthProvider>
      <DbProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <MyNotes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/email-not-verified" element={<EmailNotVerified />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </DbProvider>
    </AuthProvider>
  )
}

export default App
