import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  School as SchoolIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

const mockProfile = {
  name: 'John Smith',
  email: 'john.smith@email.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, Anytown, ST 12345',
  role: 'Parent',
  avatar: '/api/placeholder/120/120',
  children: [
    { name: 'Emma Johnson', grade: '10th Grade', class: 'Class 10-A' },
    { name: 'Michael Johnson', grade: '8th Grade', class: 'Class 8-B' },
  ],
  notifications: {
    email: true,
    sms: false,
    push: true,
  },
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockProfile);
  const [editedProfile, setEditedProfile] = useState(mockProfile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile });
  };

  const handleSave = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setEditedProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value,
      },
    }));
  };

  const currentProfile = isEditing ? editedProfile : profile;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                  Personal Information
                </Typography>
                {!isEditing ? (
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                      size="small"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={handleCancel}
                      size="small"
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={currentProfile.avatar}
                  sx={{ width: 120, height: 120, mr: 3 }}
                >
                  {currentProfile.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {currentProfile.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {currentProfile.role}
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={currentProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'standard'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={currentProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'standard'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={currentProfile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'standard'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Role"
                    value={currentProfile.role}
                    disabled
                    variant={isEditing ? 'outlined' : 'standard'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={currentProfile.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'standard'}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Children Information (for parents) */}
          {currentProfile.role === 'Parent' && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Children
                </Typography>
                <List>
                  {currentProfile.children.map((child, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <SchoolIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={child.name}
                        secondary={`${child.grade} • ${child.class}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                Notification Settings
              </Typography>
              <List>
                <ListItem sx={{ px: 0 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentProfile.notifications.email}
                        onChange={(e) => handleNotificationChange('email', e.target.checked)}
                        disabled={!isEditing}
                      />
                    }
                    label="Email Notifications"
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentProfile.notifications.sms}
                        onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                        disabled={!isEditing}
                      />
                    }
                    label="SMS Notifications"
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentProfile.notifications.push}
                        onChange={(e) => handleNotificationChange('push', e.target.checked)}
                        disabled={!isEditing}
                      />
                    }
                    label="Push Notifications"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}