import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Button, TextField
} from '@mui/material';
import Grid from '@mui/system/Grid';
import { useData } from '../../hooks/useData';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import AssessmentIcon from '@mui/icons-material/Assessment';

interface ClassTeacherDashboardProps {
  currentPage: string;
  userId: number;
}

const ClassTeacherDashboard: React.FC<ClassTeacherDashboardProps> = ({ currentPage, userId }) => {
  const { students, classes, attendance, results, addAttendance, updateAttendance } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Find the teacher and their assigned class
  const assignedClass = classes.find(c => c.teacherId === userId);
  const classStudents = assignedClass ? students.filter(s => assignedClass.studentIds.includes(s.id)) : [];

  const handleMarkAttendance = (studentId: number, status: 'present' | 'absent' | 'excused') => {
    const existingAttendance = attendance.find(a =>
      a.studentId === studentId &&
      a.date === selectedDate &&
      assignedClass?.studentIds.includes(studentId)
    );

    if (existingAttendance) {
      updateAttendance(existingAttendance.id, { present: status === 'present' });
    } else {
      addAttendance({
        studentId,
        date: selectedDate,
        present: status === 'present'
      });
    }
  };

  const getAttendanceStatus = (studentId: number) => {
    const record = attendance.find(a =>
      a.studentId === studentId &&
      a.date === selectedDate &&
      assignedClass?.studentIds.includes(studentId)
    );
    return record ? (record.present ? 'present' : 'absent') : 'not_marked';
  };

  if (currentPage !== 'dashboard' && currentPage !== 'attendance') return null;

  if (!assignedClass) {
    return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Class Teacher Dashboard
        </Typography>
        <Typography variant="body1">
          No class assigned to you yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Class Teacher Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ClassIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">My Class</Typography>
              </Box>
              <Typography variant="h4">{assignedClass.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Total Students</Typography>
              </Box>
              <Typography variant="h4">{classStudents.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Class Average</Typography>
              </Box>
              <Typography variant="h4">
                {classStudents.length > 0 ?
                  (results.filter(r => classStudents.some(s => s.id === r.studentId))
                    .reduce((sum, r) => sum + r.score, 0) /
                  results.filter(r => classStudents.some(s => s.id === r.studentId)).length || 0).toFixed(1)
                  : '0'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Attendance Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Mark Attendance
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          sx={{ mr: 2 }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Attendance Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classStudents.map((student) => {
              const status = getAttendanceStatus(student.id);
              return (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: status === 'present' ? 'green' :
                               status === 'absent' ? 'red' : 'orange'
                      }}
                    >
                      {status === 'present' ? 'Present' :
                       status === 'absent' ? 'Absent' : 'Not Marked'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleMarkAttendance(student.id, 'present')}
                    >
                      Present
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleMarkAttendance(student.id, 'absent')}
                    >
                      Absent
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleMarkAttendance(student.id, 'excused')}
                    >
                      Excused
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Student Performance */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Student Performance
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Average Score</TableCell>
              <TableCell>Attendance Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classStudents.map((student) => {
              const studentResults = results.filter(r => r.studentId === student.id);
              const averageScore = studentResults.length > 0 ?
                (studentResults.reduce((sum, r) => sum + r.score, 0) / studentResults.length).toFixed(1) : '0';

              const studentAttendance = attendance.filter(a => a.studentId === student.id);
              const attendanceRate = studentAttendance.length > 0 ?
                ((studentAttendance.filter(a => a.present).length / studentAttendance.length) * 100).toFixed(1) : '0';

              return (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{averageScore}</TableCell>
                  <TableCell>{attendanceRate}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClassTeacherDashboard;