import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from '@mui/material';
import {
  CheckCircle as PresentIcon,
  Cancel as AbsentIcon,
  Schedule as LateIcon,
} from '@mui/icons-material';

const mockAttendance = [
  { date: '2024-01-15', status: 'present', notes: '' },
  { date: '2024-01-14', status: 'present', notes: '' },
  { date: '2024-01-13', status: 'late', notes: 'Arrived 10 minutes late' },
  { date: '2024-01-12', status: 'present', notes: '' },
  { date: '2024-01-11', status: 'absent', notes: 'Sick leave' },
  { date: '2024-01-10', status: 'present', notes: '' },
  { date: '2024-01-09', status: 'present', notes: '' },
  { date: '2024-01-08', status: 'present', notes: '' },
];

const attendanceStats = {
  totalDays: 147,
  presentDays: 142,
  absentDays: 3,
  lateDays: 2,
  attendanceRate: 96.6,
};

export default function Attendance() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <PresentIcon color="success" />;
      case 'absent':
        return <AbsentIcon color="error" />;
      case 'late':
        return <LateIcon color="warning" />;
      default:
        return <PresentIcon />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'success';
      case 'absent':
        return 'error';
      case 'late':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Attendance
      </Typography>

      {/* Attendance Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
                {attendanceStats.attendanceRate}%
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Attendance Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 600, color: 'success.main' }}>
                {attendanceStats.presentDays}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Present Days
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 600, color: 'error.main' }}>
                {attendanceStats.absentDays}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Absent Days
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 600, color: 'warning.main' }}>
                {attendanceStats.lateDays}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Late Days
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Attendance Records */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                Recent Attendance Records
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockAttendance.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getStatusIcon(record.status)}
                            <Chip
                              label={record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              color={getStatusColor(record.status) as any}
                              size="small"
                            />
                          </Box>
                        </TableCell>
                        <TableCell>{record.notes || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}