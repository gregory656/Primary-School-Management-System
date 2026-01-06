import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DataProvider from './context/DataContext.tsx';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Teachers from './components/Teachers';
import StudentStaffManagement from './components/StudentStaffManagement';
import DeputyDashboard from './components/dashboards/DeputyDashboard';
import DeputyStudents from './components/dashboards/DeputyStudents';
import DeputyAttendance from './components/dashboards/DeputyAttendance';
import DeputyResults from './components/dashboards/DeputyResults';
import HeadteacherDashboard from './components/dashboards/HeadteacherDashboard';
import ClassTeacherDashboard from './components/dashboards/ClassTeacherDashboard';
import StudentDashboard from './components/dashboards/StudentDashboard';
import SubjectTeacherDashboard from './components/dashboards/SubjectTeacherDashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

type Role = 'headteacher' | 'deputy' | 'classteacher' | 'subjectteacher' | 'student';

interface User {
  id: number;
  name: string;
  role: Role;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (userId: number, role: Role) => {
    setUser({ id: userId, name: '', role });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case 'headteacher':
        return <HeadteacherDashboard currentPage={currentPage} />;
      case 'deputy':
        return <DeputyDashboard onNavigate={handleNavigate} />;
      case 'classteacher':
        return <ClassTeacherDashboard currentPage={currentPage} userId={user.id} />;
      case 'subjectteacher':
        return <SubjectTeacherDashboard onNavigate={handleNavigate} />;
      case 'student':
        return <StudentDashboard currentPage={currentPage} userId={user.id} />;
      default:
        return <Dashboard role={user.role} currentPage={currentPage} />;
    }
  };

  const renderPage = () => {
    if (!user) return null;

    switch (currentPage) {
      case 'dashboard':
        return renderDashboard();
      case 'student-staff':
        return <StudentStaffManagement />;
      case 'students':
        return user.role === 'deputy' ? <DeputyStudents /> : <Students />;
      case 'teachers':
        return <Teachers />;
      case 'attendance':
        return user.role === 'deputy' ? <DeputyAttendance /> : renderDashboard();
      case 'results':
        return user.role === 'deputy' ? <DeputyResults /> : renderDashboard();
      case 'fees':
        return renderDashboard();
      default:
        return renderDashboard();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <DataProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                user ? (
                  <Layout
                    role={user.role}
                    userId={user.id}
                    currentPage={currentPage}
                    onNavigate={handleNavigate}
                    onLogout={handleLogout}
                  >
                    {renderPage()}
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;