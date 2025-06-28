import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  TextField, 
  Box, 
  Container, 
  Grid,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Tabs,
  Tab,
  IconButton
} from '@mui/material';
import { 
  People, 
  TrendingUp, 
  AttachMoney, 
  TrendingUp as TrendingUpIcon, 
  Settings, 
  Storage, 
  Security, 
  Notifications,
  BarChart,
  Visibility,
  PersonAdd,
  Edit,
  Delete
} from '@mui/icons-material';
import Navigation from "@/components/Navigation";

const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);

  const userStats = [
    { name: "Total Users", value: "2,847", change: "+12%", icon: People },
    { name: "Active Sessions", value: "1,234", change: "+5%", icon: TrendingUp },
    { name: "Revenue", value: "$45,231", change: "+18%", icon: AttachMoney },
    { name: "Growth Rate", value: "23.5%", change: "+2.1%", icon: TrendingUpIcon },
  ];

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active", joinDate: "2024-01-14" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Inactive", joinDate: "2024-01-13" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", status: "Active", joinDate: "2024-01-12" },
  ];

  const systemLogs = [
    { id: 1, timestamp: "2024-01-15 14:30", event: "User login", user: "john@example.com", status: "Success" },
    { id: 2, timestamp: "2024-01-15 14:25", event: "Database backup", user: "System", status: "Success" },
    { id: 3, timestamp: "2024-01-15 14:20", event: "API call", user: "jane@example.com", status: "Failed" },
    { id: 4, timestamp: "2024-01-15 14:15", event: "User registration", user: "alice@example.com", status: "Success" },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderStatsCards = () => (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {userStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Grid item xs={12} sm={6} md={3} key={stat.name}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {stat.name}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Chip label={stat.change} color="success" size="small" />
                  </Box>
                  <Icon sx={{ fontSize: 32, color: 'primary.main' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );

  const renderRecentActivity = () => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUp sx={{ mr: 1 }} />
          <Typography variant="h6" component="h2">
            Recent Activity
          </Typography>
        </Box>
        <Box sx={{ space: 2 }}>
          {systemLogs.slice(0, 5).map((log) => (
            <Box 
              key={log.id} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                p: 2, 
                mb: 1,
                borderRadius: 1,
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {log.event}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {log.user}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Chip 
                  label={log.status} 
                  color={log.status === 'Success' ? 'success' : 'error'}
                  size="small"
                />
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  {log.timestamp}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  const renderQuickActions = () => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <BarChart sx={{ mr: 1 }} />
          <Typography variant="h6" component="h2">
            Quick Actions
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button 
              variant="contained" 
              fullWidth 
              sx={{ height: 80, flexDirection: 'column', gap: 1 }}
            >
              <Storage />
              <Typography variant="body2">Backup</Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              variant="outlined" 
              fullWidth 
              sx={{ height: 80, flexDirection: 'column', gap: 1 }}
            >
              <Notifications />
              <Typography variant="body2">Alerts</Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              variant="outlined" 
              fullWidth 
              sx={{ height: 80, flexDirection: 'column', gap: 1 }}
            >
              <Visibility />
              <Typography variant="body2">Monitor</Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              variant="outlined" 
              fullWidth 
              sx={{ height: 80, flexDirection: 'column', gap: 1 }}
            >
              <Settings />
              <Typography variant="body2">Config</Typography>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderUserManagement = () => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <People sx={{ mr: 1 }} />
              <Typography variant="h6" component="h2">
                User Management
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Manage user accounts and permissions
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<PersonAdd />}>
            Add User
          </Button>
        </Box>
        
        <TextField 
          placeholder="Search users..." 
          size="small" 
          sx={{ mb: 3, maxWidth: 300 }}
        />
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status} 
                      color={user.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navigation />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your MarketNow application
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Overview" />
            <Tab label="Users" />
            <Tab label="System" />
            <Tab label="Settings" />
          </Tabs>

          {/* Overview Tab */}
          {activeTab === 0 && (
            <Box>
              {renderStatsCards()}
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  {renderRecentActivity()}
                </Grid>
                <Grid item xs={12} lg={6}>
                  {renderQuickActions()}
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Users Tab */}
          {activeTab === 1 && renderUserManagement()}

          {/* System Tab */}
          {activeTab === 2 && (
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                  System Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  System monitoring and maintenance features will be implemented here.
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === 3 && (
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                  Application Settings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Configuration and settings management will be implemented here.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Admin;
