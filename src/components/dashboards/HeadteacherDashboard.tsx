import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { useData } from '../../hooks/useData';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import type { Result } from '../../types';

interface HeadteacherDashboardProps {
  currentPage: string;
}

const HeadteacherDashboard: React.FC<HeadteacherDashboardProps> = ({ currentPage }) => {
  const { students, teachers, classes, subjects, attendance, results, fees, updateResult } = useData();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);
  const [newScore, setNewScore] = useState('');

  const handleEditResult = (result: Result) => {
    setSelectedResult(result);
    setNewScore(result.score.toString());
    setEditDialogOpen(true);
  };

  const handleSaveResult = () => {
    if (selectedResult && newScore) {
      updateResult(selectedResult.id, { score: parseInt(newScore) });
      setEditDialogOpen(false);
      setSelectedResult(null);
      setNewScore('');
    }
  };

  // Calculate statistics
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalClasses = classes.length;
  const totalSubjects = subjects.length;
  const attendanceRate = attendance.length > 0 ? (attendance.filter(a => a.present).length / attendance.length * 100).toFixed(1) : 0;
  const feesCollected = fees.filter(f => f.paid).reduce((sum, f) => sum + f.amount, 0);
  const feesBalance = fees.reduce((sum, f) => sum + f.amount, 0) - feesCollected;

  if (currentPage !== 'dashboard') return null;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Headteacher Dashboard
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
                <Typography variant="h6">Total Teachers</Typography>
              </Box>
              <Typography variant="h3">{totalTeachers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Classes</Typography>
              </Box>
              <Typography variant="h3">{totalClasses}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Subjects</Typography>
              </Box>
              <Typography variant="h3">{totalSubjects}</Typography>
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
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Fees Collected</Typography>
              </Box>
              <Typography variant="h3">${feesCollected}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Fees Balance</Typography>
              </Box>
              <Typography variant="h3">${feesBalance}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Student Results Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Student Results - Update Scores
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Term</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => {
              const student = students.find(s => s.id === result.studentId);
              const subject = subjects.find(s => s.id === result.subjectId);
              return (
                <TableRow key={result.id}>
                  <TableCell>{student?.name || 'Unknown'}</TableCell>
                  <TableCell>{subject?.name || 'Unknown'}</TableCell>
                  <TableCell>{result.score}</TableCell>
                  <TableCell>{result.grade}</TableCell>
                  <TableCell>{result.term}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={() => handleEditResult(result)}>
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Result Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Update Student Result</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Score"
            type="number"
            fullWidth
            variant="standard"
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveResult}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HeadteacherDashboard;