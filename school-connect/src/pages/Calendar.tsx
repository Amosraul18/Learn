import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Event as EventIcon,
  Assignment as AssignmentIcon,
  Meeting as MeetingIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

const mockEvents = [
  {
    id: 1,
    title: 'Parent-Teacher Conference',
    date: '2024-01-20',
    time: '3:00 PM',
    type: 'meeting',
    description: 'Individual meeting with Mrs. Johnson',
  },
  {
    id: 2,
    title: 'Science Fair',
    date: '2024-01-25',
    time: '10:00 AM',
    type: 'event',
    description: 'Annual school science fair presentation',
  },
  {
    id: 3,
    title: 'Math Assignment Due',
    date: '2024-01-18',
    time: '11:59 PM',
    type: 'assignment',
    description: 'Algebra Chapter 5 problems',
  },
  {
    id: 4,
    title: 'Field Trip - Science Museum',
    date: '2024-01-30',
    time: '9:00 AM',
    type: 'event',
    description: 'Educational field trip to the Natural History Museum',
  },
];

export default function Calendar() {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <MeetingIcon />;
      case 'assignment':
        return <AssignmentIcon />;
      case 'event':
        return <SchoolIcon />;
      default:
        return <EventIcon />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'primary';
      case 'assignment':
        return 'error';
      case 'event':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Calendar
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Events
              </Typography>
              <List>
                {mockEvents.map((event) => (
                  <ListItem key={event.id} sx={{ border: 1, borderColor: 'divider', borderRadius: 1, mb: 1 }}>
                    <ListItemIcon>
                      {getEventIcon(event.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {event.title}
                          </Typography>
                          <Chip
                            label={event.type}
                            size="small"
                            color={getEventColor(event.type) as any}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {event.date} at {event.time}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {event.description}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Stats
              </Typography>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  4
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upcoming Events
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 600, color: 'error.main' }}>
                  1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Assignments Due Soon
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 600, color: 'success.main' }}>
                  2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Scheduled Meetings
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}