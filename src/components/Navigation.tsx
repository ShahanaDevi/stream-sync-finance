import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  useTheme, 
  useMediaQuery,
  Typography,
  Container
} from '@mui/material';
import { 
  Home, 
  TrendingUp, 
  Newspaper, 
  AttachMoney, 
  Star, 
  Settings 
} from '@mui/icons-material';
import ThemeToggle from "@/components/ThemeToggle";

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/stocks', label: 'Stocks', icon: TrendingUp },
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/currency', label: 'Currency', icon: AttachMoney },
    { path: '/wishlist', label: 'Watchlist', icon: Star },
    { path: '/admin', label: 'Admin', icon: Settings },
  ];

  return (
    <AppBar position="sticky" elevation={0} sx={{ backdropFilter: 'blur(10px)' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 } }}>
          {/* Logo */}
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              textDecoration: 'none', 
              color: 'inherit', 
              fontWeight: 'bold',
              mr: 4,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            MarketNow
          </Typography>

          {/* Navigation Items */}
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              
              return (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  startIcon={<Icon />}
                  sx={{
                    color: isActive ? 'primary.main' : 'text.primary',
                    backgroundColor: isActive ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: isActive ? 600 : 400,
                    '&:hover': {
                      backgroundColor: isActive 
                        ? 'rgba(25, 118, 210, 0.12)' 
                        : 'rgba(0, 0, 0, 0.04)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease',
                    ...(isMobile && {
                      minWidth: 'auto',
                      px: 1,
                      '& .MuiButton-startIcon': {
                        margin: 0,
                      },
                      '& .MuiButton-label': {
                        display: 'none',
                      }
                    })
                  }}
                >
                  {!isMobile && item.label}
                </Button>
              );
            })}
          </Box>

          {/* Theme Toggle */}
          <ThemeToggle />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
