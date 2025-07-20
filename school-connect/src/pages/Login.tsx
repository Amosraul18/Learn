import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  CircularProgress,
} from '@mui/material';
import { School as SchoolIcon, Person as PersonIcon, SupervisorAccount as TeacherIcon } from '@mui/icons-material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'parent' | 'teacher'>('parent');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate login process
    setTimeout(() => {
      if (email && password) {
        // In a real app, you would validate credentials here
        navigate('/');
      } else {
        setError('Please enter both email and password');
      }
      setLoading(false);
    }, 1000);
  };

  const handleRoleChange = (
    event: React.MouseEvent<HTMLElement>,
    newRole: 'parent' | 'teacher' | null,
  ) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
            <Typography component="h1" variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
              SchoolConnect
            </Typography>
          </Box>
          
          <Typography component="h2" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            Welcome Back
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, textAlign: 'center', color: 'text.secondary' }}>
              I am a:
            </Typography>
            <ToggleButtonGroup
              value={role}
              exclusive
              onChange={handleRoleChange}
              aria-label="user role"
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ToggleButton value="parent" aria-label="parent">
                <PersonIcon sx={{ mr: 1 }} />
                Parent
              </ToggleButton>
              <ToggleButton value="teacher" aria-label="teacher">
                <TeacherIcon sx={{ mr: 1 }} />
                Teacher
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Demo Credentials:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: demo@school.com | Password: demo123
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}