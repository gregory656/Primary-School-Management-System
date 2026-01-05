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
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MessageIcon from '@mui/icons-material/Message';
import GavelIcon from '@mui/icons-material/Gavel';

interface HeadSidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const HeadSidebar: React.FC<HeadSidebarProps> = ({ onNavigate, currentPage }) => {
  const menuItems = [
    { text: '1. Dashboard Overview', icon: <DashboardIcon />, page: 'dashboard' },
    { text: '2. Student and Staff Management', icon: <PeopleIcon />, page: 'student-staff' },
    { text: '3. Class and Subject Setup', icon: <SchoolIcon />, page: 'class-subject' },
    { text: '4. Academic Year and Term Setup', icon: <CalendarTodayIcon />, page: 'academic-setup' },
    { text: '5. Timetable Approval', icon: <ScheduleIcon />, page: 'timetable-approval' },
    { text: '6. Fee Structure Setup', icon: <AttachMoneyIcon />, page: 'fee-structure' },
    { text: '7. Reports Approval', icon: <AssessmentIcon />, page: 'reports-approval' },
    { text: '8. Communication Oversight', icon: <MessageIcon />, page: 'communication' },
    { text: '9. Discipline Management', icon: <GavelIcon />, page: 'discipline' },
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

export default HeadSidebar;
