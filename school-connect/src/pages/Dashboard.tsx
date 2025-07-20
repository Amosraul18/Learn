import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Chip,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Event as EventIcon,
  Message as MessageIcon,
  Grade as GradeIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Announcement as AnnouncementIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

// Mock data - in a real app, this would come from an API
const mockData = {
  stats: [
    { title: 'Assignments Due', value: '3', icon: <AssignmentIcon />, color: '#ff9800' },
    { title: 'Upcoming Events', value: '5', icon: <EventIcon />, color: '#2196f3' },
    { title: 'Unread Messages', value: '7', icon: <MessageIcon />, color: '#4caf50' },
    { title: 'Grade Average', value: '87%', icon: <GradeIcon />, color: '#9c27b0' },
  ],
  recentActivities: [
    {
      id: 1,
      type: 'assignment',
      title: 'Math Homework Submitted',
      description: 'John submitted his algebra assignment',
      time: '2 hours ago',
      icon: <AssignmentIcon />,
      color: '#ff9800',
    },
    {
      id: 2,
      type: 'grade',
      title: 'Science Test Graded',
      description: 'Received grade: A- (92%)',
      time: '1 day ago',
      icon: <GradeIcon />,
      color: '#4caf50',
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message from Teacher',
      description: 'Mrs. Smith sent a message about tomorrow\'s field trip',
      time: '2 days ago',
      icon: <MessageIcon />,
      color: '#2196f3',
    },
    {
      id: 4,
      type: 'event',
      title: 'Parent-Teacher Conference',
      description: 'Scheduled for next Tuesday at 3:00 PM',
      time: '3 days ago',
      icon: <EventIcon />,
      color: '#9c27b0',
    },
  ],
  upcomingDeadlines: [
    { subject: 'Mathematics', assignment: 'Chapter 5 Problems', dueDate: 'Tomorrow', urgency: 'high' },
    { subject: 'English', assignment: 'Essay on Shakespeare', dueDate: 'Oct 25', urgency: 'medium' },
    { subject: 'Science', assignment: 'Lab Report', dueDate: 'Oct 28', urgency: 'low' },
  ],
  classProgress: [
    { subject: 'Mathematics', progress: 85, grade: 'A-' },
    { subject: 'English', progress: 92, grade: 'A' },
    { subject: 'Science', progress: 78, grade: 'B+' },
    { subject: 'History', progress: 88, grade: 'A-' },
  ],
};

export default function Dashboard() {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Welcome back, John!
      </Typography>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {mockData.stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: stat.color, mr: 2 }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                  Recent Activities
                </Typography>
                <IconButton size="small">
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
              <List sx={{ pt: 0 }}>
                {mockData.recentActivities.map((activity) => (
                  <ListItem key={activity.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: activity.color, width: 32, height: 32 }}>
                        {React.cloneElement(activity.icon, { fontSize: 'small' })}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.title}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {activity.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.time}
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

        {/* Upcoming Deadlines */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                  Upcoming Deadlines
                </Typography>
                <IconButton size="small">
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
              <List sx={{ pt: 0 }}>
                {mockData.upcomingDeadlines.map((deadline, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={deadline.assignment}
                      secondary={deadline.subject}
                    />
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip
                        label={deadline.dueDate}
                        color={getUrgencyColor(deadline.urgency) as any}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Class Progress */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
                Class Progress Overview
              </Typography>
              <Grid container spacing={3}>
                {mockData.classProgress.map((classItem, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {classItem.subject}
                        </Typography>
                        <Chip label={classItem.grade} size="small" color="primary" />
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={classItem.progress}
                        sx={{ height: 8, borderRadius: 4, mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {classItem.progress}% Complete
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<MessageIcon />}
                    sx={{ py: 1.5 }}
                  >
                    Send Message
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<EventIcon />}
                    sx={{ py: 1.5 }}
                  >
                    Schedule Meeting
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<AssignmentIcon />}
                    sx={{ py: 1.5 }}
                  >
                    View Assignments
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<GradeIcon />}
                    sx={{ py: 1.5 }}
                  >
                    Check Grades
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}