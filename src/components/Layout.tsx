import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useData } from '../context/DataContext';
import HeadSidebar from './sidebars/Head';
import DeputySidebar from './sidebars/Deputy';
import ClassTeacherSidebar from './sidebars/ClassTeacher';
import SubjectTeacherSidebar from './sidebars/SubjectTeacher';
import StudentSidebar from './sidebars/Student';

type Role = 'headteacher' | 'deputy' | 'classteacher' | 'subjectteacher' | 'student';

interface LayoutProps {
  role: Role;
  userId: number;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ role, userId, currentPage, onNavigate, onLogout, children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { users } = useData();
  const user = users.find(u => u.id === userId);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setDrawerOpen(false);
  };

  const getSidebarComponent = () => {
    switch (role) {
      case 'headteacher':
        return <HeadSidebar onNavigate={handleNavigate} currentPage={currentPage} />;
      case 'deputy':
        return <DeputySidebar onNavigate={handleNavigate} currentPage={currentPage} />;
      case 'classteacher':
        return <ClassTeacherSidebar onNavigate={handleNavigate} currentPage={currentPage} />;
      case 'subjectteacher':
        return <SubjectTeacherSidebar onNavigate={handleNavigate} currentPage={currentPage} />;
      case 'student':
        return <StudentSidebar onNavigate={handleNavigate} currentPage={currentPage} />;
      default:
        return null;
    }
  };

  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            School Management System
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.name} ({role})
          </Typography>
          <IconButton color="inherit" onClick={onLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        {getSidebarComponent()}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};



export default Layout;
