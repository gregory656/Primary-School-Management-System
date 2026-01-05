import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import { useData } from '../../context/DataContext';

interface SubjectTeacherDashboardProps {
  onNavigate: (page: string) => void;
}

const SubjectTeacherDashboard: React.FC<SubjectTeacherDashboardProps> = ({ onNavigate }) => {
  const { subjects, results, students } = useData();

  // Assuming the teacher is assigned to subject with id 4 (History)
  const mySubject = subjects.find(s => s.id === 4);
  const myResults = results.filter(r => r.subjectId === 4);
  const studentsInSubject = students.filter(s => mySubject?.classIds.includes(s.classId));

  const stats = [
    { title: 'My Subject', value: mySubject?.name || 'N/A', color: 'primary.main', icon: <MenuBookIcon fontSize="large" /> },
    { title: 'Students Teaching', value: studentsInSubject.length, color: 'success.main', icon: <PeopleIcon fontSize="large" /> },
    { title: 'Average Score', value: `${Math.round(myResults.reduce((sum, r) => sum + r.score, 0) / myResults.length)}%`, color: 'secondary.main', icon: <AssessmentIcon fontSize="large" /> },
    { title: 'Classes', value: mySubject?.classIds.length || 0, color: 'info.main', icon: <MenuBookIcon fontSize="large" /> },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3, lg: 4 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
        Subject Teacher Dashboard
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card sx={{ bgcolor: stat.color, color: 'white', height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h6" component="h3">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="p" sx={{ mt: 1, fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => onNavigate('subjects')}
              sx={{ py: 2 }}
            >
              My Subjects
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => onNavigate('results')}
              sx={{ py: 2 }}
            >
              Grade Students
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => onNavigate('students')}
              sx={{ py: 2 }}
            >
              View Students
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SubjectTeacherDashboard;
