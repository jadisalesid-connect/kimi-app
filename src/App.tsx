import { Routes, Route, useLocation } from 'react-router';
import { AuthProvider } from '@/hooks/useAuth';
import FluidBackground from '@/components/FluidBackground';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DirectoryPage from '@/pages/DirectoryPage';

export default function App() {
  const location = useLocation();
  const isDirectory = location.pathname === '/directory';

  return (
    <AuthProvider>
      {/* WebGL Background - hidden on directory page */}
      {!isDirectory && <FluidBackground />}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
