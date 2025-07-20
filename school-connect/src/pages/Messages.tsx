import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
} from '@mui/material';
import {
  Message as MessageIcon,
  Add as AddIcon,
  Send as SendIcon,
} from '@mui/icons-material';

const mockMessages = [
  {
    id: 1,
    sender: 'Mrs. Sarah Johnson',
    role: 'Teacher',
    subject: 'Field Trip Permission',
    preview: 'Please sign the permission slip for next week\'s science museum visit...',
    time: '2 hours ago',
    unread: true,
    avatar: '/api/placeholder/40/40',
  },
  {
    id: 2,
    sender: 'Mr. David Chen',
    role: 'Teacher',
    subject: 'Math Assignment Update',
    preview: 'I wanted to let you know that Emma did excellent work on her algebra...',
    time: '1 day ago',
    unread: false,
    avatar: '/api/placeholder/40/40',
  },
  {
    id: 3,
    sender: 'School Administration',
    role: 'Admin',
    subject: 'Parent-Teacher Conference',
    preview: 'Reminder: Parent-teacher conferences are scheduled for next week...',
    time: '2 days ago',
    unread: true,
    avatar: '/api/placeholder/40/40',
  },
];

export default function Messages() {
  const [composeOpen, setComposeOpen] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleComposeOpen = () => {
    setComposeOpen(true);
  };

  const handleComposeClose = () => {
    setComposeOpen(false);
    setRecipient('');
    setSubject('');
    setMessage('');
  };

  const handleSendMessage = () => {
    // Handle sending message logic here
    console.log('Sending message:', { recipient, subject, message });
    handleComposeClose();
  };

  const unreadCount = mockMessages.filter(msg => msg.unread).length;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Messages
          {unreadCount > 0 && (
            <Badge badgeContent={unreadCount} color="error" sx={{ ml: 2 }}>
              <MessageIcon />
            </Badge>
          )}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleComposeOpen}
        >
          Compose
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <List sx={{ width: '100%' }}>
                {mockMessages.map((msg, index) => (
                  <ListItem
                    key={msg.id}
                    alignItems="flex-start"
                    sx={{
                      backgroundColor: msg.unread ? 'action.hover' : 'transparent',
                      borderRadius: 1,
                      mb: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'action.selected',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={msg.avatar}>
                        {msg.sender.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography
                            component="span"
                            variant="subtitle1"
                            sx={{ fontWeight: msg.unread ? 600 : 400 }}
                          >
                            {msg.sender}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={msg.role}
                              size="small"
                              color={msg.role === 'Teacher' ? 'primary' : 'secondary'}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {msg.time}
                            </Typography>
                          </Box>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography
                            component="span"
                            variant="subtitle2"
                            sx={{ fontWeight: msg.unread ? 600 : 400, display: 'block', mt: 0.5 }}
                          >
                            {msg.subject}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: 'block', mt: 0.5 }}
                          >
                            {msg.preview}
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
      </Grid>

      {/* Compose Message Dialog */}
      <Dialog
        open={composeOpen}
        onClose={handleComposeClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Compose Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="To"
            fullWidth
            variant="outlined"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Subject"
            fullWidth
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Message"
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleComposeClose}>Cancel</Button>
          <Button
            onClick={handleSendMessage}
            variant="contained"
            startIcon={<SendIcon />}
            disabled={!recipient || !subject || !message}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}