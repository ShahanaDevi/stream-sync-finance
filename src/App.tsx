import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import Chatbot from "@/components/Chatbot";
import Index from "./pages/Index";
import Stocks from "./pages/Stocks";
import News from "./pages/News";
import Currency from "./pages/Currency";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/news" element={<News />} />
            <Route path="/currency" element={<Currency />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </WishlistProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
