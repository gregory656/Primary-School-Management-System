import React from 'react';
import { Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useData } from '../context/DataContext';
import ClassSubjectSetup from './ClassSubjectSetup';
import AcademicSetup from './AcademicSetup';

interface DashboardProps {
  role?: string;
  currentPage?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ role, currentPage }) => {
  const { students, teachers, classes } = useData();

  if (currentPage === 'academic-setup' && role === 'headteacher') {
    return <AcademicSetup />;
  }

  if (currentPage === 'class-subject') {
    return <ClassSubjectSetup />;
  }

  // Default dashboard content
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SchoolIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Total Classes</Typography>
            </Box>
            <Typography variant="h3">{classes.length}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Total Students</Typography>
            </Box>
            <Typography variant="h3">{students.length}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ClassIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Total Teachers</Typography>
            </Box>
            <Typography variant="h3">{teachers.length}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Recent Students Table */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Students
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.slice(0, 5).map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
