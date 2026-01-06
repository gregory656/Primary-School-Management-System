import React from 'react';
import {
  Box, Card, CardContent, Typography, Grid, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip, LinearProgress
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useData } from '../../hooks/useData';
import type { Subject, Result, Class, Student } from '../../types';

const DeputyResults: React.FC = () => {
  const { students, subjects, results, classes } = useData();

  // Calculate overall statistics
  const totalStudents = students.length;
  const totalSubjects = subjects.length;
  const totalResults = results.length;

  // Calculate average scores by subject
  const subjectPerformance = subjects.map((subject: Subject) => {
    const subjectResults = results.filter((r: Result) => r.subjectId === subject.id);
    const averageScore = subjectResults.length > 0 ?
      subjectResults.reduce((sum: number, r: Result) => sum + r.score, 0) / subjectResults.length : 0;

    return {
      ...subject,
      averageScore: averageScore,
      studentCount: subjectResults.length
    };
  });

  // Calculate class performance
  const classPerformance = classes.map((cls: Class) => {
    const classStudents = students.filter((s: Student) => cls.studentIds.includes(s.id));
    const classResults = results.filter((r: Result) =>
      classStudents.some((s: Student) => s.id === r.studentId)
    );
    const averageScore = classResults.length > 0 ?
      classResults.reduce((sum: number, r: Result) => sum + r.score, 0) / classResults.length : 0;

    return {
      ...cls,
      averageScore: averageScore,
      studentCount: classStudents.length
    };
  });

  // Get overall average
  const overallAverage = results.length > 0 ?
    (results.reduce((sum: number, r: Result) => sum + r.score, 0) / results.length).toFixed(1) : '0';

  // Get performance levels
  const excellentCount = results.filter((r: Result) => r.score >= 90).length;
  const goodCount = results.filter((r: Result) => r.score >= 80 && r.score < 90).length;
  const averageCount = results.filter((r: Result) => r.score >= 70 && r.score < 80).length;
  const poorCount = results.filter((r: Result) => r.score < 70).length;

  const needsAttentionText = 'Needs Attention (<70%)';

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Exam Results Overview
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Total Results</Typography>
              </Box>
              <Typography variant="h3">{totalResults}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Overall Average</Typography>
              </Box>
              <Typography variant="h3">{overallAverage}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Students Assessed</Typography>
              </Box>
              <Typography variant="h3">{totalStudents}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MenuBookIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Subjects</Typography>
              </Box>
              <Typography variant="h3">{totalSubjects}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Distribution */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Performance Distribution
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main">Excellent (90-100%)</Typography>
              <Typography variant="h4">{excellentCount}</Typography>
              <Typography variant="body2">
                {totalResults > 0 ? ((excellentCount / totalResults) * 100).toFixed(1) : 0}% of results
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary.main">Good (80-89%)</Typography>
              <Typography variant="h4">{goodCount}</Typography>
              <Typography variant="body2">
                {totalResults > 0 ? ((goodCount / totalResults) * 100).toFixed(1) : 0}% of results
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main">Average (70-79%)</Typography>
              <Typography variant="h4">{averageCount}</Typography>
              <Typography variant="body2">
                {totalResults > 0 ? ((averageCount / totalResults) * 100).toFixed(1) : 0}% of results
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="error.main">
                {needsAttentionText}
              </Typography>
              <Typography variant="h4">{poorCount}</Typography>
              <Typography variant="body2">
                {totalResults > 0 ? ((poorCount / totalResults) * 100).toFixed(1) : 0}% of results
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Subject Performance */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Subject Performance
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Students Assessed</TableCell>
              <TableCell>Average Score</TableCell>
              <TableCell>Performance Level</TableCell>
              <TableCell>Progress Bar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectPerformance.map((subject: Subject & { averageScore: number; studentCount: number }) => {
              let performanceLevel = 'Poor';
              let chipColor: 'success' | 'warning' | 'error' = 'error';

              if (subject.averageScore >= 85) {
                performanceLevel = 'Excellent';
                chipColor = 'success';
              } else if (subject.averageScore >= 75) {
                performanceLevel = 'Good';
                chipColor = 'success';
              } else if (subject.averageScore >= 65) {
                performanceLevel = 'Average';
                chipColor = 'warning';
              }

              return (
                <TableRow key={subject.id}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.studentCount}</TableCell>
                  <TableCell>{subject.averageScore.toFixed(1)}%</TableCell>
                  <TableCell>
                    <Chip label={performanceLevel} color={chipColor} size="small" />
                  </TableCell>
                  <TableCell>
                    <LinearProgress
                      variant="determinate"
                      value={subject.averageScore}
                      sx={{ width: 100 }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Class Performance */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Class Performance
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class Name</TableCell>
              <TableCell>Class Teacher</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Average Score</TableCell>
              <TableCell>Performance Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classPerformance.map((cls) => {
              let performanceLevel = 'Poor';
              let chipColor: 'success' | 'warning' | 'error' = 'error';

              if (cls.averageScore >= 85) {
                performanceLevel = 'Excellent';
                chipColor = 'success';
              } else if (cls.averageScore >= 75) {
                performanceLevel = 'Good';
                chipColor = 'success';
              } else if (cls.averageScore >= 65) {
                performanceLevel = 'Average';
                chipColor = 'warning';
              }

              return (
                <TableRow key={cls.id}>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>{cls.classRep || 'Not assigned'}</TableCell>
                  <TableCell>{cls.studentCount}</TableCell>
                  <TableCell>{cls.averageScore.toFixed(1)}%</TableCell>
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

export default DeputyResults;