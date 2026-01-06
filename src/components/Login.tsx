import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';

interface LoginProps {
  onLogin: (userId: number, role: 'headteacher' | 'deputy' | 'classteacher' | 'subjectteacher' | 'student') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'headteacher' | 'deputy' | 'classteacher' | 'subjectteacher' | 'student'>('student');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== '1234') {
      setError('Incorrect password');
      return;
    }
    if (username && role) {
      // For simplicity, using username as userId (parse to number or use hash)
      const userId = username.length > 0 ? parseInt(username) || 1 : 1;
      onLogin(userId, role);
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
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)} label="Role">
              <MenuItem value="headteacher">Headteacher</MenuItem>
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