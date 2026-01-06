import React from 'react';
import {
  Box, Card, CardContent, Typography, Grid, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, LinearProgress
} from '@mui/material';
import { useData } from '../../hooks/useData';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

interface StudentDashboardProps {
  currentPage: string;
  userId: number;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ currentPage, userId }) => {
  const { students, results, fees } = useData();

  // Find the student data
  const student = students.find(s => s.id === userId);

  if (!student) {
    return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Student Dashboard
        </Typography>
        <Typography variant="body1">
          Student data not found.
        </Typography>
      </Box>
    );
  }

  // Get student's results and performance data
  const studentResults = results.filter(r => r.studentId === student.id);
  const averageScore = studentResults.length > 0 ?
    (studentResults.reduce((sum, r) => sum + r.score, 0) / studentResults.length) : 0;

  // Get fee information
  const studentFees = fees.filter(f => f.studentId === student.id);
  const totalFees = studentFees.reduce((sum, f) => sum + f.amount, 0);
  const paidFees = studentFees.filter(f => f.paid).reduce((sum, f) => sum + f.amount, 0);
  const balance = totalFees - paidFees;

  // Mock trend data (in a real app, this would be calculated from historical data)
  const scoreTrend = averageScore > 80 ? 'up' : averageScore > 60 ? 'stable' : 'down';

  if (currentPage !== 'dashboard' && currentPage !== 'scores' && currentPage !== 'reportcards' && currentPage !== 'fees') return null;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Student Dashboard - {student.name}
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Average Score</Typography>
              </Box>
              <Typography variant="h3">{averageScore.toFixed(1)}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUpIcon
                  sx={{
                    mr: 1,
                    color: scoreTrend === 'up' ? 'green' : scoreTrend === 'down' ? 'red' : 'orange'
                  }}
                />
                <Typography variant="body2" color="textSecondary">
                  {scoreTrend === 'up' ? 'Improving' : scoreTrend === 'down' ? 'Needs attention' : 'Stable'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Fees Paid</Typography>
              </Box>
              <Typography variant="h3">${paidFees}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Balance Due</Typography>
              </Box>
              <Typography variant="h3">${balance}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Grade</Typography>
              </Box>
              <Typography variant="h3">{student.grade}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* My Scores Section */}
      {(currentPage === 'dashboard' || currentPage === 'scores') && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            My Scores
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Term</TableCell>
                  <TableCell>Performance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.subjectId ? `Subject ${result.subjectId}` : 'Unknown'}</TableCell>
                    <TableCell>{result.score}</TableCell>
                    <TableCell>{result.grade}</TableCell>
                    <TableCell>{result.term}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LinearProgress
                          variant="determinate"
                          value={(result.score / 100) * 100}
                          sx={{ width: 100, mr: 2 }}
                        />
                        <Typography variant="body2">
                          {result.score >= 90 ? 'Excellent' :
                           result.score >= 80 ? 'Good' :
                           result.score >= 70 ? 'Satisfactory' : 'Needs Improvement'}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Report Cards Section */}
      {(currentPage === 'dashboard' || currentPage === 'reportcards') && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Report Cards
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Term</TableCell>
                  <TableCell>Average Score</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Comments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Term 1</TableCell>
                  <TableCell>{averageScore.toFixed(1)}</TableCell>
                  <TableCell>
                    {averageScore >= 90 ? 'A' :
                     averageScore >= 80 ? 'B' :
                     averageScore >= 70 ? 'C' : 'D'}
                  </TableCell>
                  <TableCell>
                    {averageScore >= 90 ? 'Outstanding performance. Keep it up!' :
                     averageScore >= 80 ? 'Good work. Room for improvement.' :
                     averageScore >= 70 ? 'Satisfactory. Needs more effort.' :
                     'Requires significant improvement and attention.'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Fees Section */}
      {(currentPage === 'dashboard' || currentPage === 'fees') && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Fee Details
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentFees.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell>School Fees</TableCell>
                    <TableCell>${fee.amount}</TableCell>
                    <TableCell>{fee.dueDate}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color: fee.paid ? 'green' : 'red',
                          fontWeight: 'bold'
                        }}
                      >
                        {fee.paid ? 'Paid' : 'Pending'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="h6">
              Total Paid: ${paidFees} | Balance Due: ${balance}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default StudentDashboard;