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
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  InputAdornment,
  Alert,
  Divider
} from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Star, 
  StarBorder,
  Filter, 
  AttachMoney,
  Favorite,
  FavoriteBorder,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material';
import Navigation from "@/components/Navigation";
import { useWishlist } from "@/contexts/WishlistContext";

const Currency = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const currencyData = [
    { 
      code: "USD", 
      name: "US Dollar", 
      rate: 1.0000, 
      change: 0.0000, 
      changePercent: 0.00, 
      symbol: "$",
      isBase: true 
    },
    { 
      code: "EUR", 
      name: "Euro", 
      rate: 0.9234, 
      change: +0.0023, 
      changePercent: +0.25, 
      symbol: "€" 
    },
    { 
      code: "GBP", 
      name: "British Pound", 
      rate: 0.7891, 
      change: -0.0012, 
      changePercent: -0.15, 
      symbol: "£" 
    },
    { 
      code: "JPY", 
      name: "Japanese Yen", 
      rate: 148.25, 
      change: +0.45, 
      changePercent: +0.30, 
      symbol: "¥" 
    },
    { 
      code: "CAD", 
      name: "Canadian Dollar", 
      rate: 1.3456, 
      change: -0.0034, 
      changePercent: -0.25, 
      symbol: "C$" 
    },
    { 
      code: "AUD", 
      name: "Australian Dollar", 
      rate: 1.5234, 
      change: +0.0078, 
      changePercent: +0.51, 
      symbol: "A$" 
    },
    { 
      code: "CHF", 
      name: "Swiss Franc", 
      rate: 0.8567, 
      change: -0.0012, 
      changePercent: -0.14, 
      symbol: "CHF" 
    },
    { 
      code: "CNY", 
      name: "Chinese Yuan", 
      rate: 7.2345, 
      change: +0.0234, 
      changePercent: +0.32, 
      symbol: "¥" 
    },
    { 
      code: "INR", 
      name: "Indian Rupee", 
      rate: 83.1234, 
      change: -0.2345, 
      changePercent: -0.28, 
      symbol: "₹" 
    },
    { 
      code: "BRL", 
      name: "Brazilian Real", 
      rate: 4.9234, 
      change: +0.0234, 
      changePercent: +0.48, 
      symbol: "R$" 
    }
  ];

  const liborRate = {
    rate: 5.33,
    change: +0.02,
    changePercent: +0.38,
    lastUpdate: "2024-01-15 15:30:00"
  };

  const filteredCurrencies = currencyData.filter(currency => 
    currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToWishlist = (currency) => {
    if (isInWishlist(currency.code)) {
      removeFromWishlist(currency.code);
    } else {
      addToWishlist('currency', currency);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navigation />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Currency Exchange
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time exchange rates and currency data
          </Typography>
        </Box>

        {/* LIBOR Rate Alert */}
        <Alert 
          severity="info" 
          sx={{ mb: 4 }}
          icon={<AttachMoney />}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                LIBOR Rate: {liborRate.rate}%
              </Typography>
              <Typography variant="body2">
                {liborRate.change >= 0 ? '+' : ''}{liborRate.change} ({liborRate.changePercent >= 0 ? '+' : ''}{liborRate.changePercent}%)
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Last updated: {liborRate.lastUpdate}
            </Typography>
          </Box>
        </Alert>

        {/* Search and Filter */}
        <Card sx={{ mb: 4 }} className="card-elevated">
          <CardContent sx={{ pt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
              <TextField
                fullWidth
                placeholder="Search currencies by code or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="outlined" startIcon={<Filter />}>
                Filter
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Exchange Rates Table */}
        <Card className="card-elevated">
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, pb: 2 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                Exchange Rates (USD Base)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rates are updated in real-time
              </Typography>
            </Box>
            <Divider />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'background.default' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Currency</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Code</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Rate</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Change</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Change %</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCurrencies.map((currency) => (
                    <TableRow 
                      key={currency.code}
                      sx={{ 
                        '&:hover': { bgcolor: 'action.hover' },
                        ...(currency.isBase && { bgcolor: 'primary.50' })
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {currency.symbol}
                          </Typography>
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {currency.name}
                            </Typography>
                            {currency.isBase && (
                              <Chip 
                                label="Base" 
                                size="small" 
                                color="primary" 
                                variant="outlined"
                              />
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {currency.code}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {currency.rate.toFixed(4)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {currency.change !== 0 && (
                            currency.change > 0 ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />
                          )}
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontWeight: 'bold',
                              color: currency.change > 0 ? 'success.main' : currency.change < 0 ? 'error.main' : 'text.primary'
                            }}
                          >
                            {currency.change > 0 ? '+' : ''}{currency.change.toFixed(4)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={currency.changePercent > 0 ? <TrendingUp /> : <TrendingDown />}
                          label={`${currency.changePercent > 0 ? '+' : ''}${currency.changePercent.toFixed(2)}%`}
                          color={currency.changePercent > 0 ? "success" : currency.changePercent < 0 ? "error" : "default"}
                          size="small"
                          variant={currency.changePercent === 0 ? "outlined" : "filled"}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          onClick={() => handleAddToWishlist(currency)}
                          color={isInWishlist(currency.code) ? "error" : "default"}
                          sx={{ 
                            '&:hover': { 
                              transform: 'scale(1.1)',
                              transition: 'transform 0.2s ease'
                            }
                          }}
                        >
                          {isInWishlist(currency.code) ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Currency Cards for Mobile */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 4 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
            Mobile View
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 2 
          }}>
            {filteredCurrencies.map((currency) => (
              <Card key={currency.code} className="card-elevated">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                        {currency.symbol} {currency.code}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {currency.name}
                      </Typography>
                    </Box>
                    <IconButton 
                      onClick={() => handleAddToWishlist(currency)}
                      color={isInWishlist(currency.code) ? "error" : "default"}
                      size="small"
                    >
                      {isInWishlist(currency.code) ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                  </Box>
                  <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {currency.rate.toFixed(4)}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      icon={currency.changePercent > 0 ? <TrendingUp /> : <TrendingDown />}
                      label={`${currency.changePercent > 0 ? '+' : ''}${currency.changePercent.toFixed(2)}%`}
                      color={currency.changePercent > 0 ? "success" : currency.changePercent < 0 ? "error" : "default"}
                      size="small"
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: currency.change > 0 ? 'success.main' : currency.change < 0 ? 'error.main' : 'text.primary'
                      }}
                    >
                      {currency.change > 0 ? '+' : ''}{currency.change.toFixed(4)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Currency;
