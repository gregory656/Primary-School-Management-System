import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/system/Grid';
import { useData } from '../../hooks/useData';

const DeputyAttendance: React.FC = () => {
  const { students, attendance } = useData();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Calculate attendance statistics
  const attendanceStats = students.map(student => {
    const studentAttendance = attendance.filter(a => a.studentId === student.id);
    const totalDays = studentAttendance.length;
    const presentDays = studentAttendance.filter(a => a.present).length;
    const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    let rating = 'Poor';
    if (percentage >= 95) rating = 'Excellent';
    else if (percentage >= 85) rating = 'Good';
    else if (percentage >= 75) rating = 'Average';

    return {
      ...student,
      totalDays,
      presentDays,
      percentage,
      rating,
    };
  });

  // Sort by attendance percentage (best first)
  const sortedStats = attendanceStats.sort((a, b) => b.percentage - a.percentage);

  const getRatingColor = (rating: string): 'success' | 'primary' | 'warning' | 'error' => {
    switch (rating) {
      case 'Excellent': return 'success';
      case 'Good': return 'primary';
      case 'Average': return 'warning';
      default: return 'error';
    }
  };

  const overallStats = {
    totalStudents: students.length,
    excellent: attendanceStats.filter(s => s.rating === 'Excellent').length,
    good: attendanceStats.filter(s => s.rating === 'Good').length,
    average: attendanceStats.filter(s => s.rating === 'Average').length,
    poor: attendanceStats.filter(s => s.rating === 'Poor').length,
    averagePercentage: Math.round(attendanceStats.reduce((sum, s) => sum + s.percentage, 0) / attendanceStats.length),
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3, lg: 4 } }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Attendance Overview
      </Typography>

      {/* Overall Statistics */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Total Students</Typography>
              <Typography variant="h4">{overallStats.totalStudents}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Excellent (≥95%)</Typography>
              <Typography variant="h4">{overallStats.excellent}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Average (75-84%)</Typography>
              <Typography variant="h4">{overallStats.average}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ bgcolor: 'error.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Poor (less than 75%)</Typography>
              <Typography variant="h4">{overallStats.poor}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Average Attendance */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>School Average Attendance</Typography>
          <Typography variant="h3" color="primary">
            {overallStats.averagePercentage}%
          </Typography>
        </CardContent>
      </Card>

      {/* Student Attendance Table */}
      <Typography variant="h5" gutterBottom>Student Attendance Rankings</Typography>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Grade</TableCell>
              {!isMobile && <TableCell>Present Days</TableCell>}
              {!isMobile && <TableCell>Total Days</TableCell>}
              <TableCell>Attendance %</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStats.map((student, index) => (
              <TableRow key={student.id} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                {!isMobile && <TableCell>{student.presentDays}</TableCell>}
                {!isMobile && <TableCell>{student.totalDays}</TableCell>}
                <TableCell>{student.percentage}%</TableCell>
                <TableCell>
                  <Chip
                    label={student.rating}
                    color={getRatingColor(student.rating)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DeputyAttendance;