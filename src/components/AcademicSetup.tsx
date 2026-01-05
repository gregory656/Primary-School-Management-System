import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useData } from '../context/DataContext';
import type { Term, ImportantDay } from '../types';

const AcademicSetup: React.FC = () => {
  const { academicYear, terms, importantDays, setAcademicYear, addTerm, updateTerm, deleteTerm, addImportantDay, updateImportantDay, deleteImportantDay } = useData();

  const [academicYearDialog, setAcademicYearDialog] = useState(false);
  const [termDialog, setTermDialog] = useState(false);
  const [importantDayDialog, setImportantDayDialog] = useState(false);

  const [editingTerm, setEditingTerm] = useState<Term | null>(null);
  const [editingImportantDay, setEditingImportantDay] = useState<ImportantDay | null>(null);

  const [academicYearForm, setAcademicYearForm] = useState({
    name: academicYear?.name || '',
    startDate: academicYear?.startDate || '',
    endDate: academicYear?.endDate || '',
  });

  const [termForm, setTermForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    academicYearId: academicYear?.id || 1,
  });

  const [importantDayForm, setImportantDayForm] = useState({
    name: '',
    date: '',
    type: 'holiday' as 'holiday' | 'event',
  });

  const handleSaveAcademicYear = () => {
    if (academicYearForm.name && academicYearForm.startDate && academicYearForm.endDate) {
      setAcademicYear({
        id: academicYear?.id || 1,
        name: academicYearForm.name,
        startDate: academicYearForm.startDate,
        endDate: academicYearForm.endDate,
      });
      setAcademicYearDialog(false);
    }
  };

  const handleSaveTerm = () => {
    if (termForm.name && termForm.startDate && termForm.endDate) {
      if (editingTerm) {
        updateTerm(editingTerm.id, termForm);
      } else {
        addTerm({ ...termForm, academicYearId: academicYear?.id || 1 });
      }
      setTermDialog(false);
      setTermForm({ name: '', startDate: '', endDate: '', academicYearId: academicYear?.id || 1 });
      setEditingTerm(null);
    }
  };

  const handleSaveImportantDay = () => {
    if (importantDayForm.name && importantDayForm.date) {
      if (editingImportantDay) {
        updateImportantDay(editingImportantDay.id, importantDayForm);
      } else {
        addImportantDay(importantDayForm);
      }
      setImportantDayDialog(false);
      setImportantDayForm({ name: '', date: '', type: 'holiday' });
      setEditingImportantDay(null);
    }
  };

  const handleEditTerm = (term: Term) => {
    setEditingTerm(term);
    setTermForm({
      name: term.name,
      startDate: term.startDate,
      endDate: term.endDate,
      academicYearId: term.academicYearId,
    });
    setTermDialog(true);
  };

  const handleEditImportantDay = (day: ImportantDay) => {
    setEditingImportantDay(day);
    setImportantDayForm({
      name: day.name,
      date: day.date,
      type: day.type,
    });
    setImportantDayDialog(true);
  };

  const handleDeleteTerm = (id: number) => {
    deleteTerm(id);
  };

  const handleDeleteImportantDay = (id: number) => {
    deleteImportantDay(id);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Academic Year and Term Setup
      </Typography>

      {/* Academic Year Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Academic Year</Typography>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setAcademicYearDialog(true)}
            >
              {academicYear ? 'Update' : 'Set'} Academic Year
            </Button>
          </Box>
          {academicYear ? (
            <Box>
              <Typography><strong>Name:</strong> {academicYear.name}</Typography>
              <Typography><strong>Start Date:</strong> {academicYear.startDate}</Typography>
              <Typography><strong>End Date:</strong> {academicYear.endDate}</Typography>
            </Box>
          ) : (
            <Typography color="text.secondary">No academic year set</Typography>
          )}
        </CardContent>
      </Card>

      {/* Terms Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Academic Terms</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setTermDialog(true)}
            >
              Add Term
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {terms.map((term) => (
                  <TableRow key={term.id}>
                    <TableCell>{term.name}</TableCell>
                    <TableCell>{term.startDate}</TableCell>
                    <TableCell>{term.endDate}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleEditTerm(term)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteTerm(term.id)}>
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

      {/* Important Days Card */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Important Days</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setImportantDayDialog(true)}
            >
              Add Important Day
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {importantDays.map((day) => (
                  <TableRow key={day.id}>
                    <TableCell>{day.name}</TableCell>
                    <TableCell>{day.date}</TableCell>
                    <TableCell>{day.type}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleEditImportantDay(day)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteImportantDay(day.id)}>
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

      {/* Academic Year Dialog */}
      <Dialog open={academicYearDialog} onClose={() => setAcademicYearDialog(false)}>
        <DialogTitle>{academicYear ? 'Update' : 'Set'} Academic Year</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Academic Year Name"
            fullWidth
            value={academicYearForm.name}
            onChange={(e) => setAcademicYearForm({ ...academicYearForm, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={academicYearForm.startDate}
            onChange={(e) => setAcademicYearForm({ ...academicYearForm, startDate: e.target.value })}
          />
          <TextField
            margin="dense"
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={academicYearForm.endDate}
            onChange={(e) => setAcademicYearForm({ ...academicYearForm, endDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAcademicYearDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveAcademicYear}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Term Dialog */}
      <Dialog open={termDialog} onClose={() => setTermDialog(false)}>
        <DialogTitle>{editingTerm ? 'Edit' : 'Add'} Term</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Term Name"
            fullWidth
            value={termForm.name}
            onChange={(e) => setTermForm({ ...termForm, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={termForm.startDate}
            onChange={(e) => setTermForm({ ...termForm, startDate: e.target.value })}
          />
          <TextField
            margin="dense"
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={termForm.endDate}
            onChange={(e) => setTermForm({ ...termForm, endDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTermDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveTerm}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Important Day Dialog */}
      <Dialog open={importantDayDialog} onClose={() => setImportantDayDialog(false)}>
        <DialogTitle>{editingImportantDay ? 'Edit' : 'Add'} Important Day</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={importantDayForm.name}
            onChange={(e) => setImportantDayForm({ ...importantDayForm, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={importantDayForm.date}
            onChange={(e) => setImportantDayForm({ ...importantDayForm, date: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              value={importantDayForm.type}
              onChange={(e) => setImportantDayForm({ ...importantDayForm, type: e.target.value as 'holiday' | 'event' })}
            >
              <MenuItem value="holiday">Holiday</MenuItem>
              <MenuItem value="event">Event</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImportantDayDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveImportantDay}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AcademicSetup;
