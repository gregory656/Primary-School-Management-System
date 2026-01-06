import React from 'react';
import {
  Box, Card, CardContent, Typography, Grid, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useData } from '../../hooks/useData';

const DeputyStudents: React.FC = () => {
  const { students, classes, results, attendance } = useData();

  // Calculate student statistics
  const studentsByGrade = students.reduce((acc, student) => {
    acc[student.grade] = (acc[student.grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalStudents = students.length;
  const totalClasses = classes.length;

  // Calculate average performance
  const averageScore = results.length > 0 ?
    (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(1) : '0';

  // Calculate attendance rate
  const attendanceRate = attendance.length > 0 ?
    ((attendance.filter(a => a.present).length / attendance.length) * 100).toFixed(1) : '0';

  // Get top performers
  const studentPerformance = students.map(student => {
    const studentResults = results.filter(r => r.studentId === student.id);
    const average = studentResults.length > 0 ?
      (studentResults.reduce((sum, r) => sum + r.score, 0) / studentResults.length) : 0;

    const studentAttendance = attendance.filter(a => a.studentId === student.id);
    const attendanceRate = studentAttendance.length > 0 ?
      (studentAttendance.filter(a => a.present).length / studentAttendance.length) * 100 : 0;

    return {
      ...student,
      averageScore: average,
      attendanceRate: attendanceRate
    };
  });

  const topPerformers = studentPerformance
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 10);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Student Overview
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Total Students</Typography>
              </Box>
              <Typography variant="h3">{totalStudents}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Total Classes</Typography>
              </Box>
              <Typography variant="h3">{totalClasses}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Average Score</Typography>
              </Box>
              <Typography variant="h3">{averageScore}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Attendance Rate</Typography>
              </Box>
              <Typography variant="h3">{attendanceRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Students by Grade */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Students by Grade
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Grade</TableCell>
              <TableCell>Number of Students</TableCell>
              <TableCell>Percentage of Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(studentsByGrade)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([grade, count]) => (
              <TableRow key={grade}>
                <TableCell>{grade}</TableCell>
                <TableCell>{count}</TableCell>
                <TableCell>{((count / totalStudents) * 100).toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Top Performers */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Top Performing Students
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Average Score</TableCell>
              <TableCell>Attendance Rate</TableCell>
              <TableCell>Performance Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topPerformers.map((student, index) => {
              let performanceLevel = 'Needs Attention';
              let chipColor: 'success' | 'warning' | 'error' = 'error';

              if (student.averageScore >= 90) {
                performanceLevel = 'Excellent';
                chipColor = 'success';
              } else if (student.averageScore >= 80) {
                performanceLevel = 'Good';
                chipColor = 'success';
              } else if (student.averageScore >= 70) {
                performanceLevel = 'Average';
                chipColor = 'warning';
              }

              return (
                <TableRow key={student.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.averageScore.toFixed(1)}</TableCell>
                  <TableCell>{student.attendanceRate.toFixed(1)}%</TableCell>
                  <TableCell>
                    <Chip label={performanceLevel} color={chipColor} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DeputyStudents;