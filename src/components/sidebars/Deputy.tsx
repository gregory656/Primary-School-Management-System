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

interface DeputySidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const DeputySidebar: React.FC<DeputySidebarProps> = ({ onNavigate, currentPage }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, page: 'dashboard' },
    { text: 'Students', icon: <PeopleIcon />, page: 'students' },
    { text: 'Attendance', icon: <AssessmentIcon />, page: 'attendance' },
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

export default DeputySidebar;