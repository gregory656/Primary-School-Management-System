import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';

interface SubjectTeacherSidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const SubjectTeacherSidebar: React.FC<SubjectTeacherSidebarProps> = ({ onNavigate, currentPage }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, page: 'dashboard' },
    { text: 'My Subjects', icon: <MenuBookIcon />, page: 'subjects' },
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

export default SubjectTeacherSidebar;
