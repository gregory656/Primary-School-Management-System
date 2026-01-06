import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useData } from '../hooks/useData';

import type { ClassSubject } from '../types';

const ClassSubjectSetup: React.FC = () => {
  const { classes, subjects, teachers, classSubjects, setClassSubjects } = useData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ClassSubject | null>(null);
  const [formData, setFormData] = useState({
    classId: '',
    subjectId: '',
    teacherId: '',
  });

  const handleOpen = (item?: ClassSubject) => {
    if (item) {
      setEditing(item);
      setFormData({
        classId: item.classId.toString(),
        subjectId: item.subjectId.toString(),
        teacherId: item.teacherId?.toString() || '',
      });
    } else {
      setEditing(null);
      setFormData({ classId: '', subjectId: '', teacherId: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setFormData({ classId: '', subjectId: '', teacherId: '' });
  };

  const handleSubmit = () => {
    if (!formData.classId || !formData.subjectId || !formData.teacherId) return;

    const newItem: ClassSubject = {
      id: editing ? editing.id : Date.now(),
      classId: parseInt(formData.classId),
      subjectId: parseInt(formData.subjectId),
      teacherId: parseInt(formData.teacherId),
    };

    if (editing) {
      setClassSubjects(classSubjects.map((item: ClassSubject) => item.id === editing.id ? newItem : item));
    } else {
      setClassSubjects([...classSubjects, newItem]);
    }

    handleClose();
  };

  const handleDelete = (id: number) => {
    setClassSubjects(classSubjects.filter((item: ClassSubject) => item.id !== id));
  };

  const getClassName = (id: number) => classes.find(c => c.id === id)?.name || 'Unknown';
  const getSubjectName = (id: number) => subjects.find(s => s.id === id)?.name || 'Unknown';
  const getTeacherName = (id: number | undefined) => id ? teachers.find(t => t.id === id)?.name || 'Unknown' : 'Unassigned';

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Class-Subject Setup</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Assignment
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Class</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Teacher</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classSubjects.map((item: ClassSubject) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Chip label={getClassName(item.classId)} color="primary" />
                    </TableCell>
                    <TableCell>
                      <Chip label={getSubjectName(item.subjectId)} color="secondary" />
                    </TableCell>
                    <TableCell>{getTeacherName(item.teacherId)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(item)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'Edit Assignment' : 'Add New Assignment'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                value={formData.classId}
                label="Class"
                onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
              >
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id.toString()}>
                    {cls.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                value={formData.subjectId}
                label="Subject"
                onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id.toString()}>
                    {subject.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Teacher</InputLabel>
              <Select
                value={formData.teacherId}
                label="Teacher"
                onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id.toString()}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClassSubjectSetup;