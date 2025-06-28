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
  Tabs, 
  Tab, 
  IconButton,
  InputAdornment
} from '@mui/material';
import { 
  Public, 
  Search, 
  AccessTime, 
  TrendingUp, 
  Business, 
  FlashOn, 
  Star 
} from '@mui/icons-material';
import Navigation from "@/components/Navigation";
import { useWishlist } from "@/contexts/WishlistContext";

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const { addToWishlist, isInWishlist } = useWishlist();

  const newsData = [
    {
      id: 1,
      title: "Federal Reserve announces interest rate decision amid economic uncertainty",
      summary: "The Federal Reserve has decided to maintain current interest rates as inflation concerns persist...",
      category: "Economics",
      timestamp: "2 hours ago",
      source: "Financial Times",
      trending: true
    },
    {
      id: 2,
      title: "Tech stocks surge amid breakthrough in artificial intelligence sector",
      summary: "Major technology companies see significant gains following announcement of new AI capabilities...",
      category: "Technology",
      timestamp: "4 hours ago",
      source: "Tech Daily",
      trending: true
    },
    {
      id: 3,
      title: "Oil prices rise on supply chain concerns in Middle East",
      summary: "Crude oil futures climb higher as geopolitical tensions affect supply chains...",
      category: "Commodities",
      timestamp: "6 hours ago",
      source: "Energy News",
      trending: false
    },
    {
      id: 4,
      title: "Cryptocurrency market shows strong recovery after recent volatility",
      summary: "Bitcoin and other major cryptocurrencies rebound strongly following last week's decline...",
      category: "Crypto",
      timestamp: "8 hours ago",
      source: "Crypto Watch",
      trending: false
    },
    {
      id: 5,
      title: "Banking sector reports strong quarterly earnings",
      summary: "Major banks exceed analyst expectations with robust profit margins...",
      category: "Banking",
      timestamp: "1 day ago",
      source: "Banking Weekly",
      trending: false
    },
    {
      id: 6,
      title: "Renewable energy stocks gain momentum on new government policies",
      summary: "Clean energy companies see increased investor interest following policy announcements...",
      category: "Energy",
      timestamp: "1 day ago",
      source: "Green Finance",
      trending: false
    }
  ];

  const categories = ["All", "Technology", "Economics", "Banking", "Crypto", "Energy", "Commodities"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNews = newsData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const trendingNews = newsData.filter(article => article.trending);

  const handleAddToWishlist = (article, e) => {
    e.stopPropagation();
    addToWishlist('news', article);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Technology": return <FlashOn />;
      case "Banking": return <Business />;
      case "Economics": return <TrendingUp />;
      default: return <Public />;
    }
  };

  const renderNewsCard = (article) => (
    <Card key={article.id} sx={{ height: '100%', '&:hover': { boxShadow: 4 }, cursor: 'pointer' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Chip
            icon={getCategoryIcon(article.category)}
            label={article.category}
            variant="outlined"
            size="small"
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {article.trending && (
              <Chip
                icon={<TrendingUp />}
                label="Trending"
                color="error"
                size="small"
              />
            )}
            <IconButton 
              size="small"
              onClick={(e) => handleAddToWishlist(article, e)}
              color={isInWishlist(article.id.toString()) ? "primary" : "default"}
            >
              <Star sx={{ fill: isInWishlist(article.id.toString()) ? 'currentColor' : 'none' }} />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="h6" component="h3" sx={{ mb: 1, lineHeight: 1.3 }}>
          {article.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
          <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2">
            {article.timestamp} • {article.source}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {article.summary}
        </Typography>
        <Button variant="text" size="small" sx={{ px: 0 }}>
          Read more →
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navigation />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Market News
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Stay updated with the latest financial news and market insights
          </Typography>
        </Box>

        {/* Search and Categories */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ pt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Search news articles..."
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
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "contained" : "outlined"}
                  size="small"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* News Content */}
        <Box sx={{ mb: 4 }}>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="All News" />
            <Tab label="Trending" />
          </Tabs>

          {tabValue === 0 && (
            <Grid container spacing={3}>
              {filteredNews.map((article) => (
                <Grid item xs={12} lg={6} key={article.id}>
                  {renderNewsCard(article)}
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 1 && (
            <Box sx={{ space: 3 }}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'error.main' }}>
                    <TrendingUp sx={{ mr: 1 }} />
                    Trending News
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Most popular and trending financial news articles
                  </Typography>
                  <Grid container spacing={2}>
                    {trendingNews.map((article) => (
                      <Grid item xs={12} sm={6} key={article.id}>
                        {renderNewsCard(article)}
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default News;
