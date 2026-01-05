import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventNoteIcon from '@mui/icons-material/EventNote';

interface ClassTeacherSidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const ClassTeacherSidebar: React.FC<ClassTeacherSidebarProps> = ({ onNavigate, currentPage }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, page: 'dashboard' },
    { text: 'My Class', icon: <PeopleIcon />, page: 'myclass' },
    { text: 'Attendance', icon: <EventNoteIcon />, page: 'attendance' },
    { text: 'Results', icon: <AssessmentIcon />, page: 'results' },
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.page} disablePadding>
          <ListItemButton
            selected={currentPage === item.page}
            onClick={() => onNavigate(item.page)}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ClassTeacherSidebar;
