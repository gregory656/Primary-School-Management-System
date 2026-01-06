import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog,
  DialogTitle, DialogContent, DialogActions, LinearProgress
} from '@mui/material';
import Grid from '@mui/system/Grid';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useData } from '../../hooks/useData';
import type { Result } from '../../types';

interface SubjectTeacherDashboardProps {
  onNavigate: (page: string) => void;
}

const SubjectTeacherDashboard: React.FC<SubjectTeacherDashboardProps> = () => {
  const { subjects, results, students, teachers, updateResult } = useData();
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);
  const [newScore, setNewScore] = useState('');

  // Find the subject teacher (assuming teacher with role 'subjectteacher')
  const subjectTeacher = teachers.find(t => t.role === 'subjectteacher');
  const mySubjects = subjects.filter(s => s.teacherId === subjectTeacher?.id);

  const handleGradeStudent = (result: Result) => {
    setSelectedResult(result);
    setNewScore(result.score.toString());
    setGradeDialogOpen(true);
  };

  const handleSaveGrade = () => {
    if (selectedResult && newScore) {
      updateResult(selectedResult.id, { score: parseInt(newScore) });
      setGradeDialogOpen(false);
      setSelectedResult(null);
      setNewScore('');
    }
  };

  // Calculate statistics
  const totalStudents = mySubjects.reduce((sum, subject) => {
    const subjectStudents = students.filter(s => subject.classIds.includes(s.classId));
    return sum + subjectStudents.length;
  }, 0);

  const averageScore = results.filter(r => mySubjects.some(s => s.id === r.subjectId)).length > 0 ?
    (results.filter(r => mySubjects.some(s => s.id === r.subjectId))
      .reduce((sum, r) => sum + r.score, 0) /
    results.filter(r => mySubjects.some(s => s.id === r.subjectId)).length).toFixed(1) : '0';

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Subject Teacher Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MenuBookIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">My Subjects</Typography>
              </Box>
              <Typography variant="h3">{mySubjects.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Performance</Typography>
              </Box>
              <Typography variant="h3">
                {parseFloat(averageScore) >= 80 ? 'Excellent' :
                 parseFloat(averageScore) >= 70 ? 'Good' : 'Needs Attention'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Assigned Subjects */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        My Assigned Subjects
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject Name</TableCell>
              <TableCell>Classes</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Average Performance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mySubjects.map((subject) => {
              const subjectResults = results.filter(r => r.subjectId === subject.id);
              const subjectStudents = students.filter(s => subject.classIds.includes(s.classId));
              const subjectAverage = subjectResults.length > 0 ?
                (subjectResults.reduce((sum, r) => sum + r.score, 0) / subjectResults.length).toFixed(1) : '0';

              return (
                <TableRow key={subject.id}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.classIds.length}</TableCell>
                  <TableCell>{subjectStudents.length}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LinearProgress
                        variant="determinate"
                        value={parseFloat(subjectAverage)}
                        sx={{ width: 100, mr: 2 }}
                      />
                      {subjectAverage}%
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Student Grades */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Student Grades - Enter/Update Marks
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Current Score</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.filter(r => mySubjects.some(s => s.id === r.subjectId)).map((result) => {
              const student = students.find(s => s.id === result.studentId);
              const subject = subjects.find(s => s.id === result.subjectId);
              return (
                <TableRow key={result.id}>
                  <TableCell>{student?.name || 'Unknown'}</TableCell>
                  <TableCell>{subject?.name || 'Unknown'}</TableCell>
                  <TableCell>{result.score}</TableCell>
                  <TableCell>{result.grade}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={() => handleGradeStudent(result)}>
                      Update Grade
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Grade Dialog */}
      <Dialog open={gradeDialogOpen} onClose={() => setGradeDialogOpen(false)}>
        <DialogTitle>Update Student Grade</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Score (0-100)"
            type="number"
            fullWidth
            variant="standard"
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
            inputProps={{ min: 0, max: 100 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGradeDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveGrade}>Save Grade</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubjectTeacherDashboard;