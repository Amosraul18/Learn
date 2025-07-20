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
  LinearProgress,
} from '@mui/material';

const mockGrades = [
  {
    subject: 'Mathematics',
    assignments: [
      { name: 'Quiz 1', grade: 'A', points: '95/100', date: '2024-01-10' },
      { name: 'Homework 1', grade: 'A-', points: '88/100', date: '2024-01-08' },
      { name: 'Test 1', grade: 'A', points: '92/100', date: '2024-01-15' },
    ],
    average: 92,
    letterGrade: 'A-',
  },
  {
    subject: 'English',
    assignments: [
      { name: 'Essay 1', grade: 'B+', points: '85/100', date: '2024-01-12' },
      { name: 'Reading Quiz', grade: 'A', points: '95/100', date: '2024-01-09' },
      { name: 'Presentation', grade: 'A-', points: '90/100', date: '2024-01-14' },
    ],
    average: 90,
    letterGrade: 'A-',
  },
  {
    subject: 'Science',
    assignments: [
      { name: 'Lab Report 1', grade: 'A', points: '94/100', date: '2024-01-11' },
      { name: 'Quiz 1', grade: 'B+', points: '87/100', date: '2024-01-07' },
      { name: 'Project', grade: 'A-', points: '91/100', date: '2024-01-16' },
    ],
    average: 91,
    letterGrade: 'A-',
  },
];

export default function Grades() {
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'success';
    if (grade.startsWith('B')) return 'info';
    if (grade.startsWith('C')) return 'warning';
    return 'error';
  };

  const overallAverage = Math.round(
    mockGrades.reduce((sum, subject) => sum + subject.average, 0) / mockGrades.length
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Grades
      </Typography>

      {/* Overall Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
                {overallAverage}%
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Overall Average
              </Typography>
              <Chip
                label="A-"
                color="success"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Subject Progress
              </Typography>
              {mockGrades.map((subject, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {subject.subject}
                    </Typography>
                    <Chip
                      label={`${subject.average}% (${subject.letterGrade})`}
                      color={getGradeColor(subject.letterGrade) as any}
                      size="small"
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={subject.average}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Grades by Subject */}
      <Grid container spacing={3}>
        {mockGrades.map((subject, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    {subject.subject}
                  </Typography>
                  <Chip
                    label={`Average: ${subject.average}% (${subject.letterGrade})`}
                    color={getGradeColor(subject.letterGrade) as any}
                  />
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Assignment</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Grade</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Points</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subject.assignments.map((assignment, assignmentIndex) => (
                        <TableRow key={assignmentIndex}>
                          <TableCell>{assignment.name}</TableCell>
                          <TableCell>
                            <Chip
                              label={assignment.grade}
                              color={getGradeColor(assignment.grade) as any}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{assignment.points}</TableCell>
                          <TableCell>{assignment.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}