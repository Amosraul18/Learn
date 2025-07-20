import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import {
  Class as ClassIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

const mockClasses = [
  {
    id: 1,
    name: 'Mathematics - Grade 10',
    subject: 'Mathematics',
    grade: '10th Grade',
    students: 28,
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    room: 'Room 204',
    nextClass: 'Today at 9:00 AM',
    assignments: 5,
    averageGrade: 87,
  },
  {
    id: 2,
    name: 'Advanced Mathematics - Grade 11',
    subject: 'Mathematics',
    grade: '11th Grade',
    students: 24,
    schedule: 'Tue, Thu - 10:30 AM',
    room: 'Room 205',
    nextClass: 'Tomorrow at 10:30 AM',
    assignments: 3,
    averageGrade: 91,
  },
];

export default function Classes() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        My Classes
      </Typography>

      <Grid container spacing={3}>
        {mockClasses.map((classItem) => (
          <Grid item xs={12} md={6} key={classItem.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <ClassIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                      {classItem.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {classItem.room} • {classItem.schedule}
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {classItem.students}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Students
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ fontWeight: 600, color: 'success.main' }}>
                        {classItem.averageGrade}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Avg Grade
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={`${classItem.assignments} Active Assignments`}
                    icon={<AssignmentIcon />}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={classItem.nextClass}
                    icon={<ScheduleIcon />}
                    size="small"
                    color="info"
                  />
                </Box>

                <Button variant="outlined" fullWidth>
                  Manage Class
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}