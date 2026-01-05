import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface LoginProps {
  onLogin: (userId: number, role: 'headteacher' | 'deputy' | 'classteacher' | 'subjectteacher' | 'student') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState<'headteacher' | 'deputy' | 'classteacher' | 'subjectteacher' | 'student'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && role) {
      onLogin(parseInt(userId), role);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          School Management System
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom align="center" color="textSecondary">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="User ID"
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)} label="Role">
              <MenuItem value="headteacher">Head Teacher</MenuItem>
              <MenuItem value="deputy">Deputy</MenuItem>
              <MenuItem value="classteacher">Class Teacher</MenuItem>
              <MenuItem value="subjectteacher">Subject Teacher</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
