import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Person as PersonIcon,
  School as SchoolIcon,
  Grade as GradeIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

// Mock student data
const mockStudents = [
  {
    id: 1,
    name: 'Emma Johnson',
    grade: '10th Grade',
    class: 'Class 10-A',
    average: 92,
    avatar: '/api/placeholder/60/60',
    subjects: [
      { name: 'Mathematics', grade: 'A', percentage: 95 },
      { name: 'English', grade: 'A-', percentage: 88 },
      { name: 'Science', grade: 'A', percentage: 94 },
      { name: 'History', grade: 'B+', percentage: 87 },
    ],
    recentActivities: [
      { type: 'assignment', title: 'Math Quiz', status: 'completed', date: '2024-01-15' },
      { type: 'grade', title: 'Science Test', status: 'graded', date: '2024-01-14' },
      { type: 'assignment', title: 'English Essay', status: 'pending', date: '2024-01-16' },
    ],
    attendance: {
      present: 142,
      absent: 3,
      late: 2,
      percentage: 96.7
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    grade: '10th Grade',
    class: 'Class 10-A',
    average: 85,
    avatar: '/api/placeholder/60/60',
    subjects: [
      { name: 'Mathematics', grade: 'B+', percentage: 87 },
      { name: 'English', grade: 'A-', percentage: 90 },
      { name: 'Science', grade: 'B', percentage: 82 },
      { name: 'History', grade: 'A', percentage: 91 },
    ],
    recentActivities: [
      { type: 'assignment', title: 'History Project', status: 'completed', date: '2024-01-15' },
      { type: 'assignment', title: 'Science Lab', status: 'pending', date: '2024-01-17' },
    ],
    attendance: {
      present: 138,
      absent: 6,
      late: 3,
      percentage: 93.9
    }
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`student-tabpanel-${index}`}
      aria-labelledby={`student-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Students() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleStudentClick = (student: any) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedStudent(null);
    setActiveTab(0);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'success';
    if (grade.startsWith('B')) return 'info';
    if (grade.startsWith('C')) return 'warning';
    return 'error';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'graded':
        return <GradeIcon color="info" />;
      case 'pending':
        return <WarningIcon color="warning" />;
      default:
        return <AssignmentIcon />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Students
      </Typography>

      <Grid container spacing={3}>
        {mockStudents.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student.id}>
            <Card 
              sx={{ 
                height: '100%', 
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
                transition: 'all 0.3s ease-in-out'
              }}
              onClick={() => handleStudentClick(student)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={student.avatar}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  >
                    {student.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                      {student.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {student.grade} • {student.class}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Overall Average
                  </Typography>
                  <Chip
                    label={`${student.average}%`}
                    color={student.average >= 90 ? 'success' : student.average >= 80 ? 'info' : 'warning'}
                    size="small"
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {student.subjects.slice(0, 3).map((subject, index) => (
                    <Chip
                      key={index}
                      label={`${subject.name}: ${subject.grade}`}
                      size="small"
                      color={getGradeColor(subject.grade) as any}
                      variant="outlined"
                    />
                  ))}
                  {student.subjects.length > 3 && (
                    <Chip
                      label={`+${student.subjects.length - 3} more`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<PersonIcon />}
                  onClick={() => handleStudentClick(student)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Student Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedStudent && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={selectedStudent.avatar}
                    sx={{ width: 50, height: 50 }}
                  >
                    {selectedStudent.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {selectedStudent.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedStudent.grade} • {selectedStudent.class}
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={handleCloseDialog}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="student details tabs"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab label="Grades" />
                <Tab label="Activities" />
                <Tab label="Attendance" />
              </Tabs>

              <TabPanel value={activeTab} index={0}>
                <Grid container spacing={2}>
                  {selectedStudent.subjects.map((subject: any, index: number) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" component="h4" gutterBottom>
                            {subject.name}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip
                              label={subject.grade}
                              color={getGradeColor(subject.grade) as any}
                            />
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                              {subject.percentage}%
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                <List>
                  {selectedStudent.recentActivities.map((activity: any, index: number) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        {getStatusIcon(activity.status)}
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.title}
                        secondary={`Status: ${activity.status} • Date: ${activity.date}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Attendance Summary
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">Present:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {selectedStudent.attendance.present} days
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">Absent:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {selectedStudent.attendance.absent} days
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">Late:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {selectedStudent.attendance.late} days
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Attendance Rate
                        </Typography>
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                          <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {selectedStudent.attendance.percentage}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Overall Attendance
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}