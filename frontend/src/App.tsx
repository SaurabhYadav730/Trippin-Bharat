import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './main/context/AuthContext'
import LandingPage from './main/pages/LandingPage'
import DestinationPage from './main/pages/DestinationPage'
import LoginPage from './main/pages/LoginPage'
import SignupPage from './main/pages/SignupPage'
import BuildTripPage from './main/pages/BuildTripPage'
import YatraAdminApp from './admin/YatraAdminApp'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/destination" element={<DestinationPage />} />
        <Route path="/build-trip" element={<BuildTripPage />} />
        <Route path="/plan" element={<BuildTripPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<YatraAdminApp />} />
        <Route path="/admin/*" element={<YatraAdminApp />} />
      </Routes>
    </AuthProvider>
  )
}

