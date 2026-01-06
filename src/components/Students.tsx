import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useData } from '../hooks/useData';
import type { Student } from '../types';

const Students: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    deleteStudent(id);
  };

  const handleAdd = (student: Omit<Student, 'id'>) => {
    addStudent(student);
    setShowAddModal(false);
  };

  const handleEdit = (student: Omit<Student, 'id'>) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, student);
      setEditingStudent(null);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3, lg: 4 } }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Students
      </Typography>

      {/* Search and Add Button */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowAddModal(true)}
          sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
        >
          Add Student
        </Button>
      </Box>

      {/* Students List */}
      <TableContainer component={Paper} elevation={2}>
        {isMobile ? (
          // Mobile Cards
          <Box>
            {filteredStudents.map((student) => (
              <Card key={student.id} sx={{ mb: 1 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                      <Typography variant="h6">{student.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Grade: {student.grade}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Age: {student.age}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {student.email}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton
                        color="primary"
                        onClick={() => setEditingStudent(student)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(student.id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          // Desktop Table
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student, index) => (
                <TableRow key={student.id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => setEditingStudent(student)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(student.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Add/Edit Modal */}
      <StudentModal
        open={showAddModal || !!editingStudent}
        student={editingStudent}
        onSave={editingStudent ? handleEdit : handleAdd}
        onClose={() => {
          setShowAddModal(false);
          setEditingStudent(null);
        }}
      />
    </Box>
  );
};

interface StudentModalProps {
  open: boolean;
  student: Student | null;
  onSave: (student: Omit<Student, 'id'>) => void;
  onClose: () => void;
}

const StudentModal: React.FC<StudentModalProps> = ({ open, student, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    grade: student?.grade || '',
    age: student?.age?.toString() || '',
    email: student?.email || '',
  });

  React.useEffect(() => {
    if (open) {
      setFormData({
        name: student?.name || '',
        grade: student?.grade || '',
        age: student?.age?.toString() || '',
        email: student?.email || '',
      });
    }
  }, [open, student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentData = {
      ...formData,
      age: parseInt(formData.age),
      classId: student?.classId || 1,
      attendance: student?.attendance || 0,
      feesPaid: student?.feesPaid || false,
      gender: student?.gender || ('male' as 'male' | 'female'),
      emergencyContact: student?.emergencyContact || '',
      admissionDate: student?.admissionDate || new Date().toISOString().split('T')[0],
      expectedLeaveDate: student?.expectedLeaveDate || '',
      disciplineRecords: student?.disciplineRecords || [],
      gradeHistory: student?.gradeHistory || [],
    };
    onSave(studentData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{student ? 'Edit Student' : 'Add Student'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Grade"
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {student ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Students;