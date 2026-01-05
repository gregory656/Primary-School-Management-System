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
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useData } from '../context/DataContext';
import type { Teacher } from '../types';

const Teachers: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    deleteTeacher(id);
  };

  const handleAdd = (teacher: Omit<Teacher, 'id'>) => {
    addTeacher(teacher);
    setShowAddModal(false);
  };

  const handleEdit = (teacher: Omit<Teacher, 'id'>) => {
    if (editingTeacher) {
      updateTeacher(editingTeacher.id, teacher);
      setEditingTeacher(null);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3, lg: 4 } }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Teachers
      </Typography>

      {/* Search and Add Button */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search teachers..."
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
          Add Teacher
        </Button>
      </Box>

      {/* Teachers List */}
      <TableContainer component={Paper} elevation={2}>
        {isMobile ? (
          // Mobile Cards
          <Box>
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id} sx={{ mb: 1 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                      <Typography variant="h6">{teacher.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Subject: {teacher.subject}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Email: {teacher.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Phone: {teacher.phone}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton
                        color="primary"
                        onClick={() => setEditingTeacher(teacher)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(teacher.id)}
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
                <TableCell>Subject</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTeachers.map((teacher, index) => (
                <TableRow key={teacher.id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.phone}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => setEditingTeacher(teacher)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(teacher.id)}
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
      <TeacherModal
        open={showAddModal || !!editingTeacher}
        teacher={editingTeacher}
        onSave={editingTeacher ? handleEdit : handleAdd}
        onClose={() => {
          setShowAddModal(false);
          setEditingTeacher(null);
        }}
      />
    </Box>
  );
};

interface TeacherModalProps {
  open: boolean;
  teacher: Teacher | null;
  onSave: (teacher: Omit<Teacher, 'id'>) => void;
  onClose: () => void;
}

const TeacherModal: React.FC<TeacherModalProps> = ({ open, teacher, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: teacher?.name || '',
    subject: teacher?.subject || '',
    email: teacher?.email || '',
    phone: teacher?.phone || '',
    role: teacher?.role || 'classteacher' as Teacher['role'],
    age: teacher?.age?.toString() || '',
    gender: teacher?.gender || 'male' as Teacher['gender'],
    tscNo: teacher?.tscNo || '',
    subjectCombination: teacher?.subjectCombination || '',
  });

  React.useEffect(() => {
    if (open) {
      setFormData({
        name: teacher?.name || '',
        subject: teacher?.subject || '',
        email: teacher?.email || '',
        phone: teacher?.phone || '',
        role: teacher?.role || 'classteacher',
        age: teacher?.age?.toString() || '',
        gender: teacher?.gender || 'male',
        tscNo: teacher?.tscNo || '',
        subjectCombination: teacher?.subjectCombination || '',
      });
    }
  }, [open, teacher]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teacherData = {
      ...formData,
      age: parseInt(formData.age),
      classId: teacher?.classId,
    };
    onSave(teacherData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{teacher ? 'Edit Teacher' : 'Add Teacher'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
            >
              {teacher ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Teachers;
