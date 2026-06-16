import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import OSFrame from '../../components/phone/OSFrame';
import Login from '../../pages/Login/Login';
import Home from '../../pages/Home/Home';
import MailScreen from '../../pages/Mail/Mail';
import PasswordLab from '../../pages/PasswordLab/PasswordLab';
import Permissions from '../../pages/Permissions/Permissions';
import SettingsScreen from '../../pages/Settings/Settings';
import Leaderboard from '../../pages/Leaderboard/Leaderboard';
import AdminScreen from '../../pages/AdminScreen/AdminScreen';
import Profile from '../../pages/Profile/Profile';
import Store from '../../pages/Store/Store';


function ProtectedRoute({ children }) {
  const { username } = useApp();
  
  if (!username) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function PublicRoute({ children }) {
  const { username } = useApp();
  
  if (username) {
    return <Navigate to="/home" replace />;
  }
  
  return children;
}

function AdminRoute({ children }) {
  const { username } = useApp();
  
  if (username?.toLowerCase() !== 'admin') {
    return <Navigate to="/home" replace />;
  }
  
  return children;
}


export default function AppRouter() {
  return (
    <Router>
      <OSFrame>
        <Routes>
          {/* Welcome/Login Screen */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          {/* Main Home Screen */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          
          {/* Phishing Game Screen */}
          <Route 
            path="/mail" 
            element={
              <ProtectedRoute>
                <MailScreen />
              </ProtectedRoute>
            } 
          />
          
          {/* Password Lab Screen */}
          <Route 
            path="/passwords" 
            element={
              <ProtectedRoute>
                <PasswordLab />
              </ProtectedRoute>
            } 
          />
          
          {/* App Store Permissions Screen */}
          <Route 
            path="/permissions" 
            element={
              <ProtectedRoute>
                <Permissions />
              </ProtectedRoute>
            } 
          />
          
          {/* Settings Screen */}
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <SettingsScreen />
              </ProtectedRoute>
            } 
          />

          {/* Leaderboard Screen */}
          <Route 
            path="/leaderboard" 
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } 
          />

          {/* Admin Screen */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminScreen />
              </AdminRoute>
            } 
          />

          {/* Theme Store Screen */}
          <Route 
            path="/store" 
            element={
              <ProtectedRoute>
                <Store />
              </ProtectedRoute>
            } 
          />

          {/* User Profile Screen */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </OSFrame>
    </Router>
  );
}
