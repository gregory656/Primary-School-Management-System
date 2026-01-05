import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';

const StudentStaffManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<'choose' | 'manage-staff' | 'manage-students'>('choose');

  const handleManageStaff = () => {
    setCurrentView('manage-staff');
  };

  const handleManageStudents = () => {
    setCurrentView('manage-students');
  };

  const handleBack = () => {
    setCurrentView('choose');
  };

  if (currentView === 'choose') {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Student and Staff Management
        </Typography>
        <Typography variant="h6" gutterBottom>
          How would you like to manage your staff and students today?
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<PeopleIcon />}
                  onClick={handleManageStaff}
                >
                  Manage My Staff
                </Button>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  startIcon={<SchoolIcon />}
                  onClick={handleManageStudents}
                >
                  Manage My Students
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    );
  }

  if (currentView === 'manage-students') {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Students
        </Typography>
        <Button variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>
          Back
        </Button>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Button variant="contained" fullWidth>
                  Manage Students 1
                </Button>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Button variant="contained" fullWidth>
                  Results
                </Button>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Button variant="contained" fullWidth>
                  Fees
                </Button>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Button variant="contained" fullWidth>
                  Attendance
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    );
  }

  if (currentView === 'manage-staff') {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Staff
        </Typography>
        <Button variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>
          Back
        </Button>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Button variant="contained" fullWidth>
                  Manage by Subjects
                </Button>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Button variant="contained" fullWidth>
                  Class's Teachers
                </Button>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Button variant="contained" fullWidth>
                  Transferred
                </Button>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Button variant="contained" fullWidth>
                  Leave
                </Button>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Button variant="contained" fullWidth>
                  Attendance
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    );
  }

  return null;
};

export default StudentStaffManagement;
