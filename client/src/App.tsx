import { Switch, Route, Router, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Product from "@/pages/product";
import Products from "@/pages/products";
import Catalogue from "@/pages/catalogue";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/product/:slug" component={Product} />
      <Route path="/catalogue" component={Catalogue} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isCataloguePage = location === "/catalogue";

  return (
    <QueryClientProvider client={queryClient}>
      <div className={isCataloguePage ? "min-h-screen" : "flex min-h-screen flex-col"}>
        {!isCataloguePage && <Header />}
        <main className={isCataloguePage ? "min-h-screen" : "flex-grow"}>
          <AppRoutes />
        </main>
        {!isCataloguePage && <Footer />}
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
