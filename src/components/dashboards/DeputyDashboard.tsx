import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useData } from '../../context/DataContext';

interface DeputyDashboardProps {
  onNavigate: (page: string) => void;
}

const DeputyDashboard: React.FC<DeputyDashboardProps> = ({ onNavigate }) => {
  const { students, attendance, results, fees } = useData();

  const stats = [
    { title: 'Total Students', value: students.length, color: 'primary.main', icon: <SchoolIcon fontSize="large" /> },
    { title: 'Today\'s Attendance', value: `${Math.round(attendance.filter(a => a.present).length / attendance.length * 100)}%`, color: 'success.main', icon: <AssessmentIcon fontSize="large" /> },
    { title: 'Outstanding Fees', value: `$${fees.filter(f => !f.paid).reduce((sum, f) => sum + f.amount, 0)}`, color: 'warning.main', icon: <AttachMoneyIcon fontSize="large" /> },
    { title: 'Average Score', value: `${Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)}%`, color: 'secondary.main', icon: <AssessmentIcon fontSize="large" /> },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3, lg: 4 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
        Deputy Dashboard
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
              onClick={() => onNavigate('students')}
              sx={{ py: 2 }}
            >
              View Students
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => onNavigate('attendance')}
              sx={{ py: 2 }}
            >
              Manage Attendance
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => onNavigate('results')}
              sx={{ py: 2 }}
            >
              View Results
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DeputyDashboard;
