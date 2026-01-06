import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface StudentSidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({ onNavigate, currentPage }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, page: 'dashboard' },
    { text: 'My Scores', icon: <AssessmentIcon />, page: 'scores' },
    { text: 'Report Cards', icon: <DescriptionIcon />, page: 'reportcards' },
    { text: 'Fees', icon: <AttachMoneyIcon />, page: 'fees' },
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

export default StudentSidebar;