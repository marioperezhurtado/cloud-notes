import { Routes, Route } from 'react-router-dom'
import { DbProvider } from './contexts/DbContext'

import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'

import './styles/general.scss'

const App = () => {
  return (
    <DbProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </DbProvider>
  )
}

export default App
